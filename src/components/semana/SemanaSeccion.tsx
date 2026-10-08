import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays } from 'lucide-react'
import type { Semana } from '../../content/tipos'
import { apartados, type ApartadoId } from './apartados'
import { Teoria } from './teoria/Teoria'
import { Practica } from './Practica'
import { Reflexion } from './Reflexion'
import { Revelar } from '../ui/Revelar'

export function SemanaSeccion({ semana, indice }: { semana: Semana; indice: string }) {
  const [activo, setActivo] = useState<ApartadoId>('teoria')
  const pestanas = useRef<(HTMLButtonElement | null)[]>([])
  const ancla = useRef<HTMLDivElement>(null)
  const base = semana.slug

  const ir = (id: ApartadoId, enfocar = false) => {
    setActivo(id)
    if (enfocar) pestanas.current[apartados.findIndex((a) => a.id === id)]?.focus()
    const top = ancla.current?.getBoundingClientRect().top ?? 0
    if (top < 0 || top > window.innerHeight * 0.6) ancla.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const teclado = (e: KeyboardEvent, i: number) => {
    const n = apartados.length
    const destino = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key]
    if (destino === undefined) return
    e.preventDefault()
    setActivo(apartados[destino].id)
    pestanas.current[destino]?.focus()
  }

  return (
    <section id={base} aria-labelledby={`titulo-${base}`} className="py-20 md:py-28">
      <div className="contenedor">
        <Revelar className="relative overflow-hidden rounded-[2rem] bg-petroleo-900 p-7 text-white sm:p-10 md:p-14">
          <div aria-hidden className="absolute -top-24 -right-24 size-80 rounded-full bg-petroleo-500/40 blur-2xl" />
          <div aria-hidden className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-lavanda-500/25 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow flex items-center gap-3 text-petroleo-100">
                <span className="font-display text-base tracking-normal text-coral-400 normal-case">{indice}</span>
                <span aria-hidden className="h-px w-8 bg-petroleo-300" />
                Semana {semana.numero}
              </p>
              <h2 id={`titulo-${base}`} className="mt-4 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">
                {semana.titulo}
              </h2>
            </div>
            <ul className="space-y-3 md:col-span-4">
              {semana.sesiones.map((s) => (
                <li key={s.tipo} className="flex items-start gap-3 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                  <CalendarDays className="mt-0.5 size-5 shrink-0 text-coral-400" aria-hidden />
                  <div>
                    <p className="text-xs tracking-wider text-petroleo-100 uppercase">Clase {s.tipo.toLowerCase()}</p>
                    <time dateTime={s.fechaISO} className="font-medium">{s.fecha}</time>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Revelar>

        <div ref={ancla} className="scroll-mt-24" />
        <div role="tablist" aria-label={`Apartados de la semana ${semana.numero}`} className="sticky top-[4.6rem] z-30 -mx-4 mt-6 bg-gradient-to-b from-crema via-crema/95 to-crema/0 px-4 pt-2 pb-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="relative mx-auto grid grid-cols-3 gap-1 rounded-[1.4rem] border border-linea bg-papel p-1.5 shadow-sm sm:rounded-full">
            {apartados.map((a, i) => {
              const sel = a.id === activo
              const Icono = a.icono
              return (
                <button
                  key={a.id}
                  ref={(el) => {
                    pestanas.current[i] = el
                  }}
                  role="tab"
                  id={`tab-${base}-${a.id}`}
                  aria-selected={sel}
                  aria-controls={`panel-${base}-${a.id}`}
                  tabIndex={sel ? 0 : -1}
                  onClick={() => ir(a.id)}
                  onKeyDown={(e) => teclado(e, i)}
                  className={`relative flex items-center justify-center rounded-2xl px-1 py-2 text-xs font-semibold transition-colors sm:rounded-full sm:px-3 sm:py-2.5 sm:text-sm ${sel ? 'text-white' : 'text-gris hover:text-tinta'}`}
                >
                  {sel && <motion.span layoutId={`pestana-${base}`} className={`absolute inset-0 -z-0 rounded-2xl sm:rounded-full ${a.acento.fondo}`} transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                    <span className={`hidden font-display text-xs sm:inline ${sel ? 'text-white/70' : 'text-gris/70'}`}>0{i + 1}</span>
                    <Icono className="size-4" aria-hidden />
                    {a.etiqueta}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activo}
            role="tabpanel"
            id={`panel-${base}-${activo}`}
            aria-labelledby={`tab-${base}-${activo}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 focus-visible:outline-none"
          >
            {activo === 'teoria' && <Teoria semana={semana} />}
            {activo === 'practica' && <Practica semana={semana} />}
            {activo === 'reflexion' && <Reflexion semana={semana} />}
          </motion.div>
        </AnimatePresence>

        <nav aria-label="Avanzar entre apartados" className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-linea pt-6">
          {(() => {
            const i = apartados.findIndex((a) => a.id === activo)
            const prev = apartados[i - 1]
            const next = apartados[i + 1]
            return (
              <>
                {prev ? (
                  <button type="button" onClick={() => ir(prev.id, true)} className="rounded-full px-4 py-2 text-sm font-medium text-gris hover:bg-papel hover:text-tinta">
                    ← {prev.etiqueta}
                  </button>
                ) : <span />}
                {next && (
                  <button type="button" onClick={() => ir(next.id, true)} className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white ${next.acento.fondo} hover:opacity-90`}>
                    Continuar: {next.etiqueta} →
                  </button>
                )}
              </>
            )
          })()}
        </nav>
      </div>
    </section>
  )
}

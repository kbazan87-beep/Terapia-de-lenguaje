import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, BookOpen, CalendarDays, MessageCircleHeart, Route, Wrench } from 'lucide-react'
import type { Evidencia, EvidenciaRecorrido, Semana } from '../../../content/tipos'
import { semanas } from '../../../content/semanas'

const tipos: Record<Evidencia['tipo'], string> = {
  imagen: 'Imagen',
  tabla: 'Tabla',
  ficha: 'Ficha',
  galeria: 'Materiales',
  video: 'Video',
  protocolo: 'Protocolo',
  ensayo: 'Ensayo',
  recorrido: 'Portafolio',
}

const iconos = [BookOpen, Wrench, MessageCircleHeart]

/** Evidencias de teoría (integradas en sus bloques) y de práctica de una semana, sin repetir. */
function evidenciasDe(s: Semana) {
  const teoria = s.teoria.bloques.flatMap((b) => (b.tipo === 'evidencia' ? [b.evidencia] : b.tipo === 'evidencias' ? b.evidencias : []))
  const vistas = new Set<string>()
  return [
    ...[...teoria, ...s.evidencias.teoria].map((e) => ({ e, apartado: 'Teoría' })),
    ...s.evidencias.practica.map((e) => ({ e, apartado: 'Práctica' })),
  ].filter(({ e }) => !vistas.has(e.id) && vistas.add(e.id))
}

/** Línea de tiempo de la evolución del portafolio, construida con la información ya publicada de cada semana. */
export function LineaRecorrido({ evidencia }: { evidencia: EvidenciaRecorrido }) {
  const lista = semanas.filter((s) => s.numero <= evidencia.hasta)
  const [sel, setSel] = useState(lista.length - 1)
  const botones = useRef<(HTMLButtonElement | null)[]>([])
  const s = lista[sel]
  const id = evidencia.id

  const teclado = (e: KeyboardEvent, i: number) => {
    const destino = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? lista.length - 1 : null
    if (destino === null) return
    e.preventDefault()
    const n = (destino + lista.length) % lista.length
    setSel(n)
    botones.current[n]?.focus()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {evidencia.organizacion.map((o, i) => {
          const Icono = iconos[i % iconos.length]
          return (
            <div key={o.titulo} className="tarjeta p-5">
              <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-salvia-700 uppercase">
                <Icono className="size-4" aria-hidden /> {o.titulo}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-tinta">{o.texto}</p>
            </div>
          )
        })}
      </div>

      <div className="tarjeta p-5 sm:p-7">
        <div role="tablist" aria-label="Semanas del portafolio" className="relative grid gap-1" style={{ gridTemplateColumns: `repeat(${lista.length}, minmax(0, 1fr))` }}>
          <span aria-hidden className="absolute top-[0.85rem] right-[8%] left-[8%] h-px bg-gradient-to-r from-coral-400 via-petroleo-300 to-lavanda-300" />
          {lista.map((x, i) => (
            <button
              key={x.slug}
              ref={(el) => {
                botones.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === sel}
              aria-controls={`${id}-panel`}
              tabIndex={i === sel ? 0 : -1}
              onClick={() => setSel(i)}
              onKeyDown={(e) => teclado(e, i)}
              className="group relative flex flex-col items-center gap-2 rounded-xl py-1 text-center"
            >
              <span className={`relative z-10 inline-flex size-7 items-center justify-center rounded-full text-xs font-bold transition ${i === sel ? 'bg-coral-500 text-white ring-6 ring-coral-50' : i < sel ? 'bg-petroleo-700 text-white' : 'border-2 border-petroleo-300 bg-papel text-petroleo-700'} group-hover:scale-110`}>
                {x.numero}
              </span>
              <span className={`text-xs sm:text-sm ${i === sel ? 'font-semibold text-petroleo-900' : 'text-gris'}`}>
                <span className="sm:hidden">S{x.numero}</span>
                <span className="hidden sm:inline">Semana {x.numero}</span>
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={s.slug}
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${sel}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6 grid gap-5 border-t border-linea pt-6 md:grid-cols-12"
          >
            <div className="md:col-span-5">
              <p className="eyebrow text-coral-700">Semana {s.numero}</p>
              <p className="mt-1 font-display text-xl leading-snug font-semibold text-petroleo-900">{s.titulo}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-gris">
                {s.sesiones.map((ses) => (
                  <li key={ses.tipo} className="flex items-center gap-2">
                    <CalendarDays className="size-4 shrink-0 text-salvia-700" aria-hidden />
                    <span>
                      <span className="font-medium text-tinta">{ses.tipo}:</span> <time dateTime={ses.fechaISO}>{ses.fecha}</time>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gris">
                <span className="font-medium text-tinta">Tema de la práctica:</span> {s.practica.titulo}
              </p>
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow text-gris">Evidencias de la semana</p>
              <ul className="mt-3 space-y-2">
                {evidenciasDe(s).map(({ e, apartado }) => (
                  <li key={e.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-petroleo-50 px-3 py-2 text-sm">
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-lavanda-700">{apartado}</span>
                    <span className="min-w-0 flex-1 font-medium text-petroleo-900">{e.id === id ? 'Este portafolio' : e.titulo}</span>
                    <span className="text-xs text-gris">{tipos[e.tipo]}</span>
                  </li>
                ))}
              </ul>
              {enlaceSemana(s, id)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <a href="#recorrido" className="group flex items-center justify-between gap-3 rounded-3xl bg-salvia-50 p-5 text-petroleo-900 hover:bg-salvia-100">
        <span className="flex items-center gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-salvia-700">
            <Route className="size-5" aria-hidden />
          </span>
          <span>
            <span className="block font-semibold">Mi recorrido académico</span>
            <span className="block text-sm text-gris">Ver todas las semanas del curso en la línea de tiempo general.</span>
          </span>
        </span>
        <ArrowRight className="size-5 shrink-0 transition group-hover:translate-x-1" aria-hidden />
      </a>
    </div>
  )
}

/** Enlace a la semana seleccionada (no se muestra para la semana en la que ya está el visitante). */
function enlaceSemana(s: Semana, id: string) {
  if (s.evidencias.practica.some((e) => e.id === id)) return null
  return (
    <a href={`#${s.slug}`} className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-petroleo-700 hover:text-coral-700">
      Ir a la semana {s.numero} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
    </a>
  )
}

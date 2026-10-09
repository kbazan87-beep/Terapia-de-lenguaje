import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BookOpen, ClipboardList, Info, UserRound, Users } from 'lucide-react'
import type { EvidenciaCaso } from '../../../content/tipos'

/**
 * Caso aplicado de clase. Separa los datos del caso (tal como se presentaron) de las preguntas
 * trabajadas en equipo y de lo que orienta la clase; no propone diagnósticos ni resultados.
 */
export function CasoAplicado({ evidencia }: { evidencia: EvidenciaCaso }) {
  const [sel, setSel] = useState(0)
  const botones = useRef<(HTMLButtonElement | null)[]>([])
  const n = evidencia.preguntas.length
  const actual = evidencia.preguntas[sel]
  const id = evidencia.id

  const teclado = (e: KeyboardEvent, i: number) => {
    const destino = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? i - 1 : null
    if (destino === null) return
    e.preventDefault()
    const k = (destino + n) % n
    setSel(k)
    botones.current[k]?.focus()
  }

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      {/* Datos del caso */}
      <article className="flex flex-col gap-5 rounded-3xl bg-petroleo-900 p-6 text-white sm:p-7 lg:col-span-5">
        <div className="flex items-center gap-4">
          <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <UserRound className="size-7" aria-hidden />
          </span>
          <div>
            <p className="eyebrow text-coral-100">Datos del caso</p>
            <p className="font-display text-2xl leading-tight">
              {evidencia.persona.nombre}, <span className="text-white/80">{evidencia.persona.edad}</span>
            </p>
          </div>
        </div>
        <p className="leading-relaxed text-white/85">{evidencia.persona.contexto}</p>
        <div className="space-y-4">
          {evidencia.datos.map((g) => (
            <div key={g.grupo}>
              <p className="text-xs font-bold tracking-wider text-white/60 uppercase">{g.grupo}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {g.items.map((d) => (
                  <li key={d} className="rounded-full bg-white/10 px-3 py-1.5 text-sm">{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-auto text-xs text-white/60">{evidencia.fuente}</p>
      </article>

      {/* Preguntas trabajadas */}
      <div className="tarjeta flex flex-col p-6 sm:p-7 lg:col-span-7">
        <p className="eyebrow flex items-center gap-2 text-lavanda-700">
          <ClipboardList className="size-4" aria-hidden /> Preguntas trabajadas en equipo
        </p>
        <div role="tablist" aria-label="Preguntas del caso" aria-orientation="vertical" className="mt-4 grid gap-2">
          {evidencia.preguntas.map((p, i) => (
            <button
              key={p.pregunta}
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
              className={`flex items-start gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${i === sel ? 'bg-lavanda-700 text-white' : 'bg-lavanda-50 text-petroleo-900 hover:bg-lavanda-100'}`}
            >
              <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-lavanda-700">{i + 1}</span>
              <span className="font-medium">{p.pregunta}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${sel}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 rounded-2xl border border-salvia-100 bg-salvia-50/60 p-4"
          >
            <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-salvia-700 uppercase">
              <BookOpen className="size-4" aria-hidden /> Lo que orienta la clase
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-tinta">
              {actual.orientacion.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            {actual.nota && <p className="mt-2 text-xs text-gris">{actual.nota}</p>}
          </motion.div>
        </AnimatePresence>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-gris">
          <Info className="mt-0.5 size-4 shrink-0 text-lavanda-700" aria-hidden /> {evidencia.pendiente}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-3xl bg-crema px-5 py-4 lg:col-span-12">
        <p className="flex items-center gap-2 text-sm font-semibold text-petroleo-900">
          <Users className="size-4 text-lavanda-700" aria-hidden /> {evidencia.integrantes.titulo}:
        </p>
        <ul className="flex flex-wrap gap-2">
          {evidencia.integrantes.nombres.map((nombre) => (
            <li key={nombre} className="rounded-full bg-white px-3 py-1 text-sm text-tinta">{nombre}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

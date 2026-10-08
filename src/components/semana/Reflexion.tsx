import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { Semana } from '../../content/tipos'
import { Revelar } from '../ui/Revelar'

// Cada etapa del modelo de Rolfe tiene su propio matiz dentro de la paleta.
const tonos = [
  { fondo: 'bg-salvia-50', numero: 'text-salvia-700', punto: 'bg-salvia-500', anillo: 'ring-salvia-100' },
  { fondo: 'bg-lavanda-50', numero: 'text-lavanda-700', punto: 'bg-lavanda-500', anillo: 'ring-lavanda-100' },
  { fondo: 'bg-coral-50', numero: 'text-coral-700', punto: 'bg-coral-500', anillo: 'ring-coral-100' },
]

export function Reflexion({ semana }: { semana: Semana }) {
  const r = semana.reflexion
  const [completa, setCompleta] = useState(false)
  const [visible, setVisible] = useState(0)
  const etapas = useRef<(HTMLElement | null)[]>([])
  const base = `${semana.slug}-reflexion`

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setVisible(Number((e.target as HTMLElement).dataset.indice))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    etapas.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <article className="relative overflow-clip rounded-[2rem] bg-[#fbf3ee] px-5 py-10 sm:px-10 md:py-14">
      <div aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full bg-coral-100/70 blur-3xl" />
      <div aria-hidden className="absolute -right-20 -bottom-28 size-80 rounded-full bg-lavanda-100/80 blur-3xl" />

      <div className="relative">
        <p className="eyebrow text-coral-700">Reflexión · Semana {semana.numero}</p>
        <Revelar>
          <blockquote className="mt-6 max-w-4xl">
            <span aria-hidden className="block font-display text-8xl leading-[0.5] text-coral-400">“</span>
            <p className="font-display text-3xl leading-[1.15] text-petroleo-900 italic sm:text-5xl">{r.destacada}</p>
          </blockquote>
        </Revelar>

        {/* Recorrido reflexivo: ¿Qué? → ¿Y qué? → ¿Ahora qué? */}
        <nav aria-label="Etapas de la reflexión" className="sticky top-[8.9rem] z-20 mt-12 sm:top-[8.6rem]">
          <ol className="grid grid-cols-3 gap-1 rounded-2xl bg-white/85 p-1.5 shadow-sm ring-1 ring-coral-100 backdrop-blur-md">
            {r.etapas.map((e, i) => (
              <li key={e.id} className="relative">
                <a
                  href={`#${base}-${e.id}`}
                  aria-current={visible === i ? 'step' : undefined}
                  className={`flex items-center justify-center gap-2 rounded-xl px-2 py-2 text-center text-sm font-semibold transition ${visible === i ? 'bg-petroleo-900 text-white' : visible > i ? 'text-petroleo-700' : 'text-gris hover:text-tinta'}`}
                >
                  <span className={`font-display text-xs ${visible === i ? 'text-coral-400' : ''}`}>0{i + 1}</span>
                  <span>{e.pregunta}</span>
                </a>
              </li>
            ))}
          </ol>
          <div aria-hidden className="mx-3 mt-1.5 h-1 overflow-hidden rounded-full bg-coral-100">
            <motion.div className="h-full rounded-full bg-coral-500" animate={{ width: `${((visible + 1) / r.etapas.length) * 100}%` }} transition={{ duration: 0.5 }} />
          </div>
        </nav>

        <ol className="relative mt-8 space-y-6">
          <span aria-hidden className="absolute top-6 bottom-6 left-[1.6rem] hidden w-px bg-gradient-to-b from-salvia-300 via-lavanda-300 to-coral-400 md:block" />
          {r.etapas.map((e, i) => {
            const t = tonos[i % tonos.length]
            return (
              <li
                key={e.id}
                id={`${base}-${e.id}`}
                data-indice={i}
                ref={(el) => {
                  etapas.current[i] = el
                }}
                className="relative scroll-mt-56 md:pl-16"
              >
                <span aria-hidden className={`absolute top-7 left-[1.15rem] hidden size-4 rounded-full ring-8 md:block ${t.punto} ${t.anillo}`} />
                <Revelar className={`grid gap-6 rounded-3xl p-6 sm:p-8 lg:grid-cols-12 ${t.fondo}`}>
                  <header className="lg:col-span-4">
                    <p className={`font-display text-sm ${t.numero}`}>Etapa 0{i + 1}</p>
                    <h4 className="mt-1 font-display text-4xl font-semibold text-petroleo-900">{e.pregunta}</h4>
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold tracking-wider text-petroleo-700 uppercase">
                      {e.accion}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gris">{e.proposito}</p>
                  </header>
                  <dl className="space-y-5 lg:col-span-8">
                    {e.respuestas.map((res) => (
                      <div key={res.pregunta} className="rounded-2xl bg-white/80 p-5">
                        <dt className="flex flex-wrap items-center gap-2 text-sm font-semibold text-petroleo-700">
                          {res.pregunta}
                          {res.origen && <span className="rounded-full bg-salvia-50 px-2 py-0.5 text-[0.7rem] font-semibold text-salvia-700">De mi práctica</span>}
                        </dt>
                        <dd className="mt-2 text-lg leading-relaxed text-tinta">
                          {res.texto ?? <span className="text-base text-coral-700 italic">Pendiente: no hay información documentada para responder esta pregunta.</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Revelar>
                {i < r.etapas.length - 1 && (
                  <div aria-hidden className="flex justify-center py-1 text-coral-400 md:hidden">
                    <ArrowRight className="size-5 rotate-90" />
                  </div>
                )}
              </li>
            )
          })}
        </ol>

        <div className="mt-10 flex flex-col gap-4 border-t border-coral-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gris">
            Estructura basada en el {r.modelo.nombre} {r.modelo.cita}. Las respuestas reorganizan mi reflexión original.
          </p>
          <button type="button" aria-expanded={completa} aria-controls={`${base}-original`} onClick={() => setCompleta((v) => !v)} className="shrink-0 rounded-full border border-coral-400 px-4 py-2 text-sm font-semibold text-coral-700 hover:bg-coral-50">
            {completa ? 'Ocultar texto original' : 'Leer la reflexión original'}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {completa && (
            <motion.div id={`${base}-original`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <p className="mt-5 max-w-3xl leading-relaxed text-tinta">{r.original}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  )
}

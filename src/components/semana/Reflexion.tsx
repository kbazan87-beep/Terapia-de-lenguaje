import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Semana } from '../../content/tipos'
import { Revelar } from '../ui/Revelar'

export function Reflexion({ semana }: { semana: Semana }) {
  const r = semana.reflexion
  const [completa, setCompleta] = useState(false)
  const partes = [
    { titulo: 'Qué aprendí', texto: r.aprendi },
    { titulo: 'Qué me sorprendió', texto: r.sorprendio },
    { titulo: 'Cómo aplicaría estos conocimientos', texto: r.aplicaria },
    { titulo: 'Qué necesito seguir aprendiendo', texto: r.pendiente },
  ]

  return (
    <article className="relative overflow-hidden rounded-[2rem] bg-[#fbf3ee] px-6 py-12 sm:px-12 md:py-16">
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

        <ol className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {partes.map((p, i) => (
            <Revelar as="li" key={p.titulo} retraso={i * 0.06} className="border-t border-coral-100 pt-5">
              <p className="flex items-baseline gap-3">
                <span className="font-display text-coral-700">0{i + 1}</span>
                <span className="text-sm font-bold tracking-wider text-petroleo-700 uppercase">{p.titulo}</span>
              </p>
              <p className="mt-3 text-lg leading-relaxed text-tinta">{p.texto}</p>
            </Revelar>
          ))}
        </ol>

        <div className="mt-12">
          <button type="button" aria-expanded={completa} aria-controls="reflexion-completa" onClick={() => setCompleta((v) => !v)} className="rounded-full border border-coral-400 px-4 py-2 text-sm font-semibold text-coral-700 hover:bg-coral-50">
            {completa ? 'Ocultar texto original' : 'Leer la reflexión original completa'}
          </button>
          <AnimatePresence initial={false}>
            {completa && (
              <motion.div id="reflexion-completa" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="mt-5 max-w-3xl leading-relaxed text-tinta">{r.original}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  )
}

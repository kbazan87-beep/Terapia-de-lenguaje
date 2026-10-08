import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { BloqueDe } from './tipos'

const colores = ['var(--color-petroleo-500)', 'var(--color-salvia-500)', 'var(--color-lavanda-500)', 'var(--color-coral-500)', 'var(--color-petroleo-700)']

/** Los principios se disponen alrededor de la RBC: cada uno es un punto que sostiene la estrategia. */
export function PrincipiosRadial({ bloque }: { bloque: BloqueDe<'principios'> }) {
  const [sel, setSel] = useState(0)
  const n = bloque.principios.length
  const pos = (i: number) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180)
    return { x: 50 + Math.cos(a) * 36, y: 50 + Math.sin(a) * 36 }
  }
  const actual = bloque.principios[sel]

  return (
    <div className="tarjeta grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-[22rem] lg:col-span-6">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
          <polygon
            points={bloque.principios.map((_, i) => `${pos(i).x},${pos(i).y}`).join(' ')}
            fill="var(--color-salvia-50)"
            stroke="var(--color-salvia-300)"
            strokeWidth="0.4"
          />
          {bloque.principios.map((_, i) => (
            <line key={i} x1="50" y1="50" x2={pos(i).x} y2={pos(i).y} stroke={i === sel ? colores[i] : 'var(--color-linea)'} strokeWidth={i === sel ? 0.9 : 0.4} />
          ))}
        </svg>
        <div className="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-petroleo-900 text-center font-display text-lg text-white shadow-lg sm:size-28">
          {bloque.centro}
        </div>
        {bloque.principios.map((p, i) => {
          const { x, y } = pos(i)
          const activo = i === sel
          return (
            <button
              key={p.titulo}
              type="button"
              aria-pressed={activo}
              onClick={() => setSel(i)}
              style={{ left: `${x}%`, top: `${y}%`, backgroundColor: activo ? colores[i] : undefined }}
              className={`absolute w-[7.6rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl px-1.5 py-2 text-center text-xs leading-tight font-semibold shadow-sm transition sm:w-32 sm:text-sm ${activo ? 'scale-105 text-white' : 'bg-white text-petroleo-900 ring-1 ring-linea hover:ring-petroleo-300'}`}
            >
              {p.titulo}
            </button>
          )
        })}
      </div>
      <div className="lg:col-span-6" aria-live="polite">
        <p className="eyebrow text-gris">Principio {sel + 1} de {n}</p>
        <AnimatePresence mode="wait">
          <motion.div key={sel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="mt-2 font-display text-3xl text-petroleo-900">{actual.titulo}</p>
            <p className="mt-3 text-lg leading-relaxed text-tinta">{actual.texto}</p>
          </motion.div>
        </AnimatePresence>
        <ol className="mt-6 space-y-1.5 border-t border-linea pt-4 text-sm">
          {bloque.principios.map((p, i) => (
            <li key={p.titulo} className={i === sel ? 'font-semibold text-petroleo-900' : 'text-gris'}>
              <span className="font-display text-coral-700">{i + 1}.</span> {p.titulo}: {p.texto}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-gris">Fuente: {bloque.fuente}</p>
      </div>
    </div>
  )
}

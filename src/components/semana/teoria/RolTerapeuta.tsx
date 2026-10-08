import { useState } from 'react'
import { motion } from 'motion/react'
import type { BloqueTeoria } from '../../../content/tipos'

type Props = { rol: Extract<BloqueTeoria, { tipo: 'rol' }>['rol'] }

export function RolTerapeuta({ rol }: Props) {
  const [sel, setSel] = useState(rol.funciones[0].id)
  const actual = rol.funciones.find((f) => f.id === sel)!
  const todos = rol.funciones.flatMap((f) => f.vinculos.map((v) => ({ v, f: f.id })))

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <div className="flex flex-col gap-2 lg:col-span-5" role="group" aria-label="Funciones del terapeuta de lenguaje en la comunidad">
        {rol.funciones.map((f, i) => {
          const activo = sel === f.id
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={activo}
              onClick={() => setSel(f.id)}
              className={`group flex items-start gap-4 rounded-2xl border p-4 text-left transition ${activo ? 'border-petroleo-700 bg-petroleo-700 text-white shadow-lg' : 'border-linea bg-papel hover:border-petroleo-300'}`}
            >
              <span className={`font-display text-sm ${activo ? 'text-coral-400' : 'text-coral-700'}`}>0{i + 1}</span>
              <span>
                <span className="block font-display text-lg font-semibold">{f.verbo}</span>
                <span className={`block text-sm leading-relaxed ${activo ? 'text-white/85' : 'text-gris'}`}>{f.descripcion}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="relative overflow-hidden rounded-[2rem] bg-salvia-50 p-6 sm:p-8 lg:col-span-7">
        <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
          <div className="relative flex size-36 items-center justify-center rounded-full bg-petroleo-900 p-5 text-white shadow-xl sm:size-44">
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-petroleo-500/20 [animation-duration:3s]" />
            <span className="relative font-display text-lg leading-tight sm:text-xl">Terapeuta de lenguaje</span>
          </div>
          <p className="mt-5 font-display text-lg leading-snug text-petroleo-900">{rol.lema}</p>
        </div>

        <ul className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Con quién y en qué se articula">
          {todos.map(({ v, f }) => {
            const activo = f === sel
            return (
              <motion.li
                key={v}
                layout
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 ${activo ? 'bg-coral-500 text-white shadow-md' : 'bg-white text-gris ring-1 ring-salvia-100'}`}
              >
                {v}
              </motion.li>
            )
          })}
        </ul>
        <p className="sr-only" aria-live="polite">
          {actual.verbo} {actual.descripcion} Vínculos: {actual.vinculos.join(', ')}.
        </p>

        <div className="mt-7 rounded-2xl bg-white/80 p-4 text-sm leading-relaxed text-tinta ring-1 ring-salvia-100">
          <span className="eyebrow mr-2 text-salvia-700">{rol.etiquetaEnfoque ?? 'Se enfoca en'}</span>
          {rol.enfoque}
        </div>
        <p className="mt-3 text-xs text-gris">Fuente: {rol.fuente}</p>
      </div>
    </div>
  )
}

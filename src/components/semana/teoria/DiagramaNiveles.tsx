import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import type { Semana } from '../../../content/tipos'

type Props = { niveles: Semana['teoria']['niveles'] }

// De arriba (más complejo) hacia abajo (comunidad).
const formas: Record<string, { ancho: string; color: string }> = {
  'nivel-2-3': { ancho: 'w-[58%]', color: 'bg-lavanda-100 text-lavanda-700 hover:bg-lavanda-300/60' },
  'nivel-1': { ancho: 'w-[80%]', color: 'bg-salvia-100 text-salvia-700 hover:bg-salvia-300/70' },
  comunidad: { ancho: 'w-full', color: 'bg-petroleo-50 text-petroleo-700 hover:bg-petroleo-100' },
}

export function DiagramaNiveles({ niveles }: Props) {
  const orden = [...niveles.items].reverse()
  const [sel, setSel] = useState('nivel-1')
  const actual = niveles.items.find((n) => n.id === sel)!

  return (
    <div className="tarjeta grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:items-center">
      <div className="flex gap-3 sm:gap-5 lg:col-span-7">
        <div aria-hidden className="flex w-14 shrink-0 flex-col items-center py-1 text-center text-[0.6rem] leading-tight font-semibold tracking-wider text-gris uppercase">
          <span>Más complejo</span>
          <span className="my-2 w-px flex-1 bg-gradient-to-b from-lavanda-300 to-petroleo-300" />
          <span>Más sencillo</span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-2" role="group" aria-label="Niveles de atención">
          {orden.map((n) => {
            const f = formas[n.id]
            const activo = sel === n.id
            return (
              <button
                key={n.id}
                type="button"
                aria-pressed={activo}
                onClick={() => setSel(n.id)}
                className={`${f.ancho} ${f.color} relative rounded-2xl px-4 py-4 text-left transition sm:py-5 ${activo ? 'ring-2 ring-coral-500 ring-offset-2 ring-offset-papel' : ''}`}
              >
                <span className="block text-xs font-bold tracking-widest uppercase">{n.etiqueta}</span>
                <span className="mt-1 block font-display text-base leading-tight text-tinta sm:text-lg">{n.titulo}</span>
              </button>
            )
          })}
        </div>

        <div className="hidden flex-col justify-center gap-6 text-xs font-medium text-gris sm:flex">
          <span className="flex items-center gap-1.5"><ArrowUp className="size-4 text-coral-700" aria-hidden /> Referencia</span>
          <span className="flex items-center gap-1.5"><ArrowDown className="size-4 text-salvia-700" aria-hidden /> Contrarreferencia</span>
        </div>
      </div>

      <div className="lg:col-span-5" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={actual.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}>
            <p className="eyebrow text-coral-700">{actual.etiqueta}</p>
            <p className="mt-2 font-display text-2xl text-petroleo-900">{actual.titulo}</p>
            <p className="mt-3 leading-relaxed text-tinta">{actual.descripcion}</p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-6 border-t border-linea pt-4 text-sm text-gris">
          Fuente: {niveles.cita}. La referencia y la contrarreferencia conectan los niveles, como señalo en mi práctica y reflexión.
        </p>
      </div>
    </div>
  )
}

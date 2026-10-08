import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import type { Concepto } from '../../../content/tipos'
import { Revelar } from '../../ui/Revelar'

const estilos = [
  'bg-petroleo-700 text-white',
  'bg-papel text-tinta border border-linea',
  'bg-salvia-50 text-tinta',
]

export function TarjetasConceptos({ conceptos }: { conceptos: Concepto[] }) {
  const [abierto, setAbierto] = useState<string | null>(null)

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {conceptos.map((c, i) => {
        const open = abierto === c.id
        const oscuro = i === 0
        return (
          <Revelar as="li" key={c.id} retraso={i * 0.08} className={`rounded-3xl p-6 transition-shadow hover:shadow-lg sm:p-7 ${estilos[i % estilos.length]}`}>
            <span className={`font-display text-sm ${oscuro ? 'text-coral-400' : 'text-coral-700'}`}>0{i + 1}</span>
            <h4 className={`mt-3 font-display text-xl leading-snug font-semibold ${oscuro ? 'text-white' : 'text-petroleo-900'}`}>{c.titulo}</h4>
            <p className={`mt-3 leading-relaxed ${oscuro ? 'text-white/85' : 'text-gris'}`}>{c.sintesis}</p>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div id={`concepto-${c.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                  <div className={`mt-4 border-t pt-4 leading-relaxed ${oscuro ? 'border-white/20 text-white' : 'border-linea text-tinta'}`}>
                    <p>{c.desarrollo}</p>
                    <p className={`mt-3 text-sm ${oscuro ? 'text-white/70' : 'text-gris'}`}>{c.cita}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`concepto-${c.id}`}
              onClick={() => setAbierto(open ? null : c.id)}
              className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${oscuro ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-petroleo-700 ring-1 ring-linea hover:ring-petroleo-300'}`}
            >
              <Plus className={`size-4 transition-transform ${open ? 'rotate-45' : ''}`} aria-hidden />
              {open ? 'Cerrar' : 'Leer definición completa'}
            </button>
          </Revelar>
        )
      })}
    </ul>
  )
}

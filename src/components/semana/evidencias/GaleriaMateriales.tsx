import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Expand, FileImage, Presentation, ScrollText } from 'lucide-react'
import type { EvidenciaGaleria, EvidenciaImagen } from '../../../content/tipos'
import { VisorImagen } from './VisorImagen'

const iconos = [FileImage, ScrollText, Presentation]

/** Materiales de difusión: se elige un material y se recorren sus páginas o caras, con visor ampliado. */
export function GaleriaMateriales({ evidencia }: { evidencia: EvidenciaGaleria }) {
  const [sel, setSel] = useState(0)
  const [pag, setPag] = useState(0)
  const [ampliada, setAmpliada] = useState<EvidenciaImagen | null>(null)
  const m = evidencia.materiales[sel]
  const p = m.paginas[pag]
  const total = m.paginas.length

  const elegir = (i: number) => {
    setSel(i)
    setPag(0)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Materiales elaborados">
        {evidencia.materiales.map((mat, i) => {
          const Icono = iconos[i % iconos.length]
          const activo = i === sel
          return (
            <button
              key={mat.id}
              type="button"
              aria-pressed={activo}
              onClick={() => elegir(i)}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${activo ? 'border-lavanda-700 bg-lavanda-700 text-white shadow-md' : 'border-linea bg-papel hover:border-lavanda-300'}`}
            >
              <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full ${activo ? 'bg-white/15' : 'bg-lavanda-50 text-lavanda-700'}`}>
                <Icono className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-semibold">{mat.nombre}</span>
                <span className={`block text-xs ${activo ? 'text-white/80' : 'text-gris'}`}>
                  {mat.formato} · {mat.paginas.length} {mat.paginas.length === 1 ? 'imagen' : 'imágenes'}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="tarjeta grid overflow-hidden lg:grid-cols-12">
        <div className="relative bg-crema lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.button
              key={`${m.id}-${pag}`}
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setAmpliada({ tipo: 'imagen', id: `${m.id}-${pag}`, titulo: `${m.nombre} · ${p.etiqueta}`, descripcion: m.descripcion, autoria: 'Elaboración propia', src: p.src, alt: p.alt })}
              className="group relative flex w-full items-center justify-center p-3 sm:p-5"
              aria-label={`Ampliar ${m.nombre}, ${p.etiqueta}`}
            >
              <img src={p.src} alt={p.alt} className="max-h-[70vh] w-auto max-w-full rounded-xl shadow-sm" loading="lazy" />
              <span className="absolute right-5 bottom-5 inline-flex items-center gap-2 rounded-full bg-petroleo-900/85 px-3 py-1.5 text-xs font-semibold text-white opacity-90 group-hover:opacity-100">
                <Expand className="size-3.5" aria-hidden /> Ampliar
              </span>
            </motion.button>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4 border-t border-linea p-6 lg:col-span-4 lg:border-t-0 lg:border-l">
          <div>
            <p className="eyebrow text-lavanda-700">{m.modalidad}</p>
            <p className="mt-1 font-display text-2xl text-petroleo-900">{m.nombre}</p>
            <p className="mt-2 text-sm leading-relaxed text-gris">{m.descripcion}</p>
          </div>
          {total > 1 && (
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-tinta" aria-live="polite">
                  {p.etiqueta} <span className="font-normal text-gris">({pag + 1} de {total})</span>
                </p>
                <div className="flex gap-1">
                  <button type="button" onClick={() => setPag((v) => (v - 1 + total) % total)} className="inline-flex size-9 items-center justify-center rounded-full ring-1 ring-linea hover:bg-lavanda-50" aria-label="Anterior">
                    <ChevronLeft className="size-4" aria-hidden />
                  </button>
                  <button type="button" onClick={() => setPag((v) => (v + 1) % total)} className="inline-flex size-9 items-center justify-center rounded-full ring-1 ring-linea hover:bg-lavanda-50" aria-label="Siguiente">
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                </div>
              </div>
              <ol className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-5 lg:grid-cols-4">
                {m.paginas.map((pg, i) => (
                  <li key={pg.src}>
                    <button
                      type="button"
                      aria-pressed={i === pag}
                      aria-label={pg.etiqueta}
                      onClick={() => setPag(i)}
                      className={`block w-full overflow-hidden rounded-lg ring-2 transition ${i === pag ? 'ring-lavanda-700' : 'ring-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={pg.src} alt="" className="aspect-video w-full object-cover" loading="lazy" />
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {evidencia.noIncluidos && evidencia.noIncluidos.length > 0 && (
            <p className="mt-auto rounded-2xl bg-crema p-3 text-xs leading-relaxed text-gris">
              También elaboré: {evidencia.noIncluidos.join(' y ')}. Sus archivos no se incluyeron en los documentos de esta semana.
            </p>
          )}
        </div>
      </div>

      {ampliada && <VisorImagen evidencia={ampliada} abierto cerrar={() => setAmpliada(null)} />}
    </div>
  )
}

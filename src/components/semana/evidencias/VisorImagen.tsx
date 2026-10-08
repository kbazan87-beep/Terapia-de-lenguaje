import { useEffect, useRef } from 'react'
import { Download, X } from 'lucide-react'
import type { EvidenciaImagen } from '../../../content/tipos'

type Props = { evidencia: EvidenciaImagen; abierto: boolean; cerrar: () => void }

/** Visor accesible basado en <dialog>: atrapa el foco y se cierra con Escape. */
export function VisorImagen({ evidencia, abierto, cerrar }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (abierto && !d.open) d.showModal()
    if (!abierto && d.open) d.close()
  }, [abierto])

  return (
    <dialog
      ref={ref}
      onClose={cerrar}
      onClick={(e) => e.target === ref.current && cerrar()}
      aria-labelledby={`visor-${evidencia.id}`}
      className="m-auto max-h-[94vh] w-[min(96vw,1200px)] max-w-none overflow-hidden rounded-3xl bg-papel p-0 text-tinta shadow-2xl backdrop:bg-petroleo-900/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-linea px-5 py-3">
        <div>
          <p id={`visor-${evidencia.id}`} className="font-semibold">{evidencia.titulo}</p>
          <p className="text-xs text-gris">{evidencia.autoria}</p>
        </div>
        <div className="flex items-center gap-1">
          {import.meta.env.MODE !== 'artifact' && <a href={evidencia.src} download="mapa-conceptual-semana-1.jpg" className="inline-flex size-10 items-center justify-center rounded-full hover:bg-salvia-50" aria-label="Descargar imagen">
            <Download className="size-5" aria-hidden />
          </a>}
          <button type="button" onClick={cerrar} className="inline-flex size-10 items-center justify-center rounded-full hover:bg-salvia-50" aria-label="Cerrar visor">
            <X className="size-5" aria-hidden />
          </button>
        </div>
      </div>
      <div className="max-h-[calc(94vh-4rem)] overflow-auto bg-white p-3">
        <img src={evidencia.src} alt={evidencia.alt} className="mx-auto h-auto w-full min-w-[640px] max-w-[1536px]" />
      </div>
    </dialog>
  )
}

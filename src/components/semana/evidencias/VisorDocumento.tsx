import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type Props = { titulo: string; subtitulo: string; paginas: { src: string; alt: string }[]; abierto: boolean; cerrar: () => void }

/** Visor de un documento de varias páginas (imágenes), basado en <dialog>: se cierra con Escape. */
export function VisorDocumento({ titulo, subtitulo, paginas, abierto, cerrar }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [pag, setPag] = useState(0)
  const n = paginas.length

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (abierto && !d.open) {
      setPag(0)
      d.showModal()
    }
    if (!abierto && d.open) d.close()
  }, [abierto])

  return (
    <dialog
      ref={ref}
      onClose={cerrar}
      onClick={(e) => e.target === ref.current && cerrar()}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') setPag((v) => Math.min(n - 1, v + 1))
        if (e.key === 'ArrowLeft') setPag((v) => Math.max(0, v - 1))
      }}
      aria-label={titulo}
      className="m-auto flex max-h-[94vh] w-[min(96vw,980px)] max-w-none flex-col overflow-hidden rounded-3xl bg-papel p-0 text-tinta shadow-2xl backdrop:bg-petroleo-900/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-linea px-5 py-3">
        <div className="min-w-0">
          <p className="truncate font-semibold">{titulo}</p>
          <p className="text-xs text-gris">
            {subtitulo} · página {pag + 1} de {n}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" disabled={pag === 0} onClick={() => setPag((v) => v - 1)} className="inline-flex size-10 items-center justify-center rounded-full hover:bg-salvia-50 disabled:opacity-30" aria-label="Página anterior">
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" disabled={pag === n - 1} onClick={() => setPag((v) => v + 1)} className="inline-flex size-10 items-center justify-center rounded-full hover:bg-salvia-50 disabled:opacity-30" aria-label="Página siguiente">
            <ChevronRight className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={cerrar} className="inline-flex size-10 items-center justify-center rounded-full hover:bg-salvia-50" aria-label="Cerrar">
            <X className="size-5" aria-hidden />
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-crema p-3 sm:p-5">
        {paginas[pag] && <img src={paginas[pag].src} alt={paginas[pag].alt} className="mx-auto h-auto w-full max-w-[820px] rounded-lg bg-white shadow-sm" />}
      </div>
      {n > 1 && (
        <ol className="flex gap-2 overflow-x-auto border-t border-linea px-5 py-3">
          {paginas.map((p, i) => (
            <li key={p.src} className="shrink-0">
              <button
                type="button"
                aria-pressed={i === pag}
                aria-label={`Página ${i + 1}`}
                onClick={() => setPag(i)}
                className={`block w-14 overflow-hidden rounded-md ring-2 transition ${i === pag ? 'ring-lavanda-700' : 'ring-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={p.src} alt="" className="aspect-[17/22] w-full object-cover object-top" loading="lazy" />
              </button>
            </li>
          ))}
        </ol>
      )}
    </dialog>
  )
}

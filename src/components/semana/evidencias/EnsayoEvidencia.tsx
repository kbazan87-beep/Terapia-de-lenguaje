import { useState } from 'react'
import { BookMarked, Eye, FileText } from 'lucide-react'
import type { EvidenciaEnsayo } from '../../../content/tipos'
import { VisorDocumento } from './VisorDocumento'
import { BotonDescarga } from './ExploradorProtocolo'

/** Ensayo individual: lectura del PDF por páginas, descarga directa y sus referencias. */
export function EnsayoEvidencia({ evidencia }: { evidencia: EvidenciaEnsayo }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-5 rounded-3xl bg-petroleo-700 p-6 text-white sm:p-7 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2 text-white/80">
            <FileText className="size-4" aria-hidden /> Ensayo en PDF · {evidencia.paginas.length} páginas
          </p>
          <p className="mt-2 font-display text-xl leading-snug">Elaboración individual</p>
          <p className="mt-1 text-sm text-white/75">Puedes leerlo aquí, página por página, o descargar el archivo.</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <button type="button" onClick={() => setAbierto(true)} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-petroleo-900 hover:bg-coral-50">
            <Eye className="size-4" aria-hidden /> Leer el ensayo
          </button>
          <BotonDescarga href={evidencia.archivo.href} nombre={evidencia.archivo.nombre} etiqueta="Descargar PDF" />
        </div>
      </div>

      <details className="tarjeta group p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-petroleo-900">
          <span className="flex items-center gap-2">
            <BookMarked className="size-4 text-lavanda-700" aria-hidden /> Referencias del ensayo ({evidencia.referencias.length})
          </span>
          <span aria-hidden className="text-gris transition group-open:rotate-45">+</span>
        </summary>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-relaxed break-words text-gris">
          {evidencia.referencias.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </details>

      {/* El visor se monta solo al abrirlo (su <dialog> usa display: flex). */}
      {abierto && <VisorDocumento titulo={evidencia.titulo} subtitulo="Ensayo individual" paginas={evidencia.paginas} abierto cerrar={() => setAbierto(false)} />}
    </div>
  )
}

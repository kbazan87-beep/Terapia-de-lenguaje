import { useState } from 'react'
import { Expand } from 'lucide-react'
import type { EvidenciaImagen } from '../../../content/tipos'
import { VisorImagen } from './VisorImagen'

export function TarjetaImagen({ evidencia }: { evidencia: EvidenciaImagen }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <figure className="tarjeta grid overflow-hidden lg:grid-cols-12">
      <button type="button" onClick={() => setAbierto(true)} className="group relative block w-full bg-white lg:col-span-8" aria-label={`Ampliar: ${evidencia.titulo}`}>
        <img src={evidencia.src} alt={evidencia.alt} className="h-auto w-full transition duration-500 group-hover:scale-[1.015]" loading="lazy" />
        <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-petroleo-900/85 px-4 py-2 text-sm font-semibold text-white opacity-90 transition group-hover:opacity-100">
          <Expand className="size-4" aria-hidden /> Ampliar
        </span>
      </button>
      <figcaption className="flex flex-col justify-center border-t border-linea p-6 lg:col-span-4 lg:border-t-0 lg:border-l">
        <p className="font-semibold text-tinta">{evidencia.titulo}</p>
        <p className="mt-1 text-sm text-gris">{evidencia.descripcion}</p>
        <p className="mt-2 text-xs font-semibold tracking-wide text-lavanda-700 uppercase">{evidencia.autoria}</p>
      </figcaption>
      <VisorImagen evidencia={evidencia} abierto={abierto} cerrar={() => setAbierto(false)} />
    </figure>
  )
}

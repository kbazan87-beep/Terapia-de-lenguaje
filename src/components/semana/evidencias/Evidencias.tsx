import { useState } from 'react'
import { Expand } from 'lucide-react'
import type { Evidencia, EvidenciaImagen, Semana } from '../../../content/tipos'
import { Revelar } from '../../ui/Revelar'
import { TablaEvidencia } from './TablaEvidencia'
import { VisorImagen } from './VisorImagen'

function TarjetaImagen({ evidencia }: { evidencia: EvidenciaImagen }) {
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

function Grupo({ titulo, etiqueta, fecha, evidencias }: { titulo: string; etiqueta: string; fecha?: string; evidencias: Evidencia[] }) {
  return (
    <section aria-labelledby={`ev-${etiqueta}`} className="space-y-6">
      <Revelar className="flex flex-wrap items-end justify-between gap-3 border-b border-lavanda-100 pb-4">
        <div>
          <p className="eyebrow text-lavanda-700">{etiqueta}{fecha ? ` · ${fecha}` : ''}</p>
          <h3 id={`ev-${etiqueta}`} className="mt-1 font-display text-2xl font-semibold text-petroleo-900 sm:text-3xl">{titulo}</h3>
        </div>
      </Revelar>
      {evidencias.map((e) => (
        <Revelar key={e.id}>
          {e.tipo === 'imagen' ? (
            <TarjetaImagen evidencia={e} />
          ) : (
            <div>
              <div className="mb-4">
                <h4 className="font-display text-xl font-semibold text-petroleo-900">{e.titulo}</h4>
                <p className="mt-1 max-w-3xl text-gris">{e.descripcion}</p>
              </div>
              <TablaEvidencia evidencia={e} />
            </div>
          )}
        </Revelar>
      ))}
    </section>
  )
}

export function Evidencias({ semana }: { semana: Semana }) {
  const [teoria, practica] = semana.sesiones
  return (
    <div className="space-y-16">
      <Revelar className="rounded-3xl bg-lavanda-50 p-6 sm:p-8">
        <p className="eyebrow text-lavanda-700">Evidencias</p>
        <p className="mt-2 font-display text-2xl text-petroleo-900 sm:text-3xl">Documentando mi aprendizaje</p>
        <p className="mt-2 max-w-3xl text-gris">Organizadas según su procedencia: lo elaborado para la clase teórica y el producto de la práctica.</p>
      </Revelar>
      <Grupo etiqueta="De la teoría" titulo="Evidencias de la clase teórica" fecha={teoria?.fecha} evidencias={semana.evidencias.teoria} />
      <Grupo etiqueta="De la práctica" titulo="Evidencia de la práctica" fecha={practica?.fecha} evidencias={semana.evidencias.practica} />
    </div>
  )
}

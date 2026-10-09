import { FolderOpen } from 'lucide-react'
import type { Evidencia } from '../../../content/tipos'
import { Revelar } from '../../ui/Revelar'
import { TablaEvidencia } from './TablaEvidencia'
import { TarjetaImagen } from './TarjetaImagen'
import { FichaTematica } from './FichaTematica'
import { GaleriaMateriales } from './GaleriaMateriales'
import { VideoEvidencia } from './VideoEvidencia'
import { ExploradorProtocolo } from './ExploradorProtocolo'
import { EnsayoEvidencia } from './EnsayoEvidencia'
import { LineaRecorrido } from './LineaRecorrido'
import { CasoAplicado } from './CasoAplicado'
import { ComparacionTamizaje } from './ComparacionTamizaje'
import { GuionDialogo } from './GuionDialogo'

/** Evidencias integradas en un apartado (Teoría o Práctica), con su etiqueta de procedencia. */
export function BloqueEvidencias({ evidencias, procedencia }: { evidencias: Evidencia[]; procedencia: string }) {
  return (
    <div className="space-y-10">
      {evidencias.map((e) => (
        <Revelar key={e.id}>
          {e.tipo === 'imagen' ? (
            <TarjetaImagen evidencia={e} />
          ) : (
            <div>
              <div className="mb-4">
                <p className="eyebrow flex items-center gap-2 text-lavanda-700">
                  <FolderOpen className="size-4" aria-hidden /> {procedencia}
                </p>
                <h4 className="mt-1 font-display text-xl font-semibold text-petroleo-900">{e.titulo}</h4>
                <p className="mt-1 max-w-3xl text-gris">{e.descripcion}</p>
              </div>
              {e.tipo === 'tabla' ? <TablaEvidencia evidencia={e} /> : e.tipo === 'ficha' ? <FichaTematica evidencia={e} /> : e.tipo === 'galeria' ? <GaleriaMateriales evidencia={e} /> : e.tipo === 'video' ? <VideoEvidencia evidencia={e} /> : e.tipo === 'protocolo' ? <ExploradorProtocolo evidencia={e} /> : e.tipo === 'ensayo' ? <EnsayoEvidencia evidencia={e} /> : e.tipo === 'caso' ? <CasoAplicado evidencia={e} /> : e.tipo === 'revision' ? <ComparacionTamizaje evidencia={e} /> : e.tipo === 'dialogo' ? <GuionDialogo evidencia={e} /> : <LineaRecorrido evidencia={e} />}
            </div>
          )}
        </Revelar>
      ))}
    </div>
  )
}

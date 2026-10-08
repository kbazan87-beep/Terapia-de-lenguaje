import type { ReactNode } from 'react'
import type { BloqueTeoria, Semana } from '../../../content/tipos'
import { Revelar } from '../../ui/Revelar'
import { TarjetasConceptos } from './TarjetasConceptos'
import { MapaConceptual } from './MapaConceptual'
import { RolTerapeuta } from './RolTerapeuta'
import { EvidenciaClase } from './bloques/EvidenciaClase'
import { OrigenRBC } from './bloques/OrigenRBC'
import { PrincipiosRadial } from './bloques/PrincipiosRadial'
import { MatrizRBC } from './bloques/MatrizRBC'
import { EjesIntervencion } from './bloques/EjesIntervencion'
import { ContextoPeru } from './bloques/ContextoPeru'

export function Bloque({ id, letra, titulo, descripcion, children }: { id: string; letra: string; titulo: string; descripcion?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="mt-16 scroll-mt-40 first:mt-0">
      <Revelar className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-display text-sm text-petroleo-500">{letra}.</span>
        <h3 id={`${id}-titulo`} className="font-display text-2xl font-semibold text-petroleo-900 sm:text-3xl">{titulo}</h3>
        {descripcion && <p className="w-full text-gris sm:w-auto sm:flex-1 sm:text-right">{descripcion}</p>}
      </Revelar>
      {children}
    </section>
  )
}

/** Cada tipo de bloque tiene su propio recurso visual. */
function Contenido({ bloque }: { bloque: BloqueTeoria }) {
  switch (bloque.tipo) {
    case 'conceptos':
      return <TarjetasConceptos conceptos={bloque.conceptos} />
    case 'mapa':
      return <MapaConceptual mapa={bloque.mapa} original={bloque.original} />
    case 'rol':
      return <RolTerapeuta rol={bloque.rol} />
    case 'evidencia':
      return <EvidenciaClase bloque={bloque} />
    case 'origen':
      return <OrigenRBC bloque={bloque} />
    case 'principios':
      return <PrincipiosRadial bloque={bloque} />
    case 'matriz':
      return <MatrizRBC bloque={bloque} />
    case 'ejes':
      return <EjesIntervencion bloque={bloque} />
    case 'contexto-peru':
      return <ContextoPeru bloque={bloque} />
  }
}

export function Teoria({ semana }: { semana: Semana }) {
  const t = semana.teoria
  const base = `${semana.slug}-teoria`

  return (
    <div>
      <Revelar className="mb-12 rounded-3xl bg-petroleo-50 p-6 sm:p-8">
        <p className="eyebrow text-petroleo-500">Teoría · {semana.sesiones[0].fecha}</p>
        <p className="mt-2 font-display text-2xl text-petroleo-900 sm:text-3xl">{t.titulo}</p>
        <p className="mt-1 text-gris">{t.introduccion}</p>
      </Revelar>

      {t.bloques.map((b, i) => (
        <Bloque key={b.id} id={`${base}-${b.id}`} letra={String.fromCharCode(65 + i)} titulo={b.titulo} descripcion={b.descripcion}>
          <Contenido bloque={b} />
        </Bloque>
      ))}
    </div>
  )
}

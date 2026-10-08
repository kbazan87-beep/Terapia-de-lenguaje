import type { ReactNode } from 'react'
import { FolderOpen } from 'lucide-react'
import type { Semana } from '../../../content/tipos'
import { Revelar } from '../../ui/Revelar'
import { BloqueEvidencias } from '../evidencias/BloqueEvidencias'
import { TarjetasConceptos } from './TarjetasConceptos'
import { MapaConceptual } from './MapaConceptual'
import { RolTerapeuta } from './RolTerapeuta'

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

export function Teoria({ semana }: { semana: Semana }) {
  const t = semana.teoria
  const base = `${semana.slug}-teoria`
  const original = semana.evidencias.teoria.find((e) => e.tipo === 'imagen')

  return (
    <div>
      <Revelar className="mb-12 flex flex-col gap-4 rounded-3xl bg-petroleo-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="eyebrow text-petroleo-500">Teoría · {semana.sesiones[0].fecha}</p>
          <p className="mt-2 font-display text-2xl text-petroleo-900 sm:text-3xl">{t.titulo}</p>
          <p className="mt-1 text-gris">{t.introduccion}</p>
        </div>
        <a href={`#${base}-evidencias`} className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-petroleo-300 bg-white px-4 py-2 text-sm font-semibold text-petroleo-700 hover:bg-petroleo-700 hover:text-white sm:self-auto">
          <FolderOpen className="size-4" aria-hidden /> Ir a las evidencias de la teoría
        </a>
      </Revelar>

      <Bloque id={`${base}-conceptos`} letra="A" titulo="Conceptos clave" descripcion="Abre cada tarjeta para leer la definición completa.">
        <TarjetasConceptos conceptos={t.conceptos} />
      </Bloque>

      <Bloque id={`${base}-mapa`} letra="B" titulo="Mapa conceptual interactivo" descripcion="De los conceptos básicos al rol del terapeuta de lenguaje.">
        <MapaConceptual mapa={t.mapa} original={original?.tipo === 'imagen' ? original : undefined} />
      </Bloque>

      <Bloque id={`${base}-rol`} letra="C" titulo="Rol del terapeuta de lenguaje" descripcion="Elige una función para ver con quién y en qué se articula.">
        <RolTerapeuta rol={t.rol} />
      </Bloque>

      <Bloque id={`${base}-evidencias`} letra="D" titulo="Evidencias de la clase teórica" descripcion="Trabajo elaborado para la clase del 19 de agosto.">
        <BloqueEvidencias evidencias={semana.evidencias.teoria} procedencia="Evidencia de teoría" />
      </Bloque>
    </div>
  )
}

import { Network } from 'lucide-react'
import type { Semana } from '../../../content/tipos'
import type { PropsApartado } from '../tiposComunes'
import { Revelar } from '../../ui/Revelar'
import { TarjetasConceptos } from './TarjetasConceptos'
import { DiagramaNiveles } from './DiagramaNiveles'
import { MapaConceptual } from './MapaConceptual'
import { RolTerapeuta } from './RolTerapeuta'

function Bloque({ letra, titulo, children, descripcion }: { letra: string; titulo: string; descripcion?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`teoria-${letra}`} className="mt-16 first:mt-0">
      <Revelar className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-display text-sm text-petroleo-500">{letra}.</span>
        <h3 id={`teoria-${letra}`} className="font-display text-2xl font-semibold text-petroleo-900 sm:text-3xl">{titulo}</h3>
        {descripcion && <p className="w-full text-gris sm:w-auto sm:flex-1 sm:text-right">{descripcion}</p>}
      </Revelar>
      {children}
    </section>
  )
}

export function Teoria({ semana, irA }: { semana: Semana } & PropsApartado) {
  const t = semana.teoria
  return (
    <div>
      <Revelar className="mb-12 flex flex-col gap-4 rounded-3xl bg-petroleo-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="eyebrow text-petroleo-500">Teoría · {semana.sesiones[0].fecha}</p>
          <p className="mt-2 font-display text-2xl text-petroleo-900 sm:text-3xl">{t.titulo}</p>
          <p className="mt-1 text-gris">{t.introduccion}</p>
        </div>
        <button type="button" onClick={() => irA('evidencias', true)} className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-petroleo-300 bg-white px-4 py-2 text-sm font-semibold text-petroleo-700 hover:bg-petroleo-700 hover:text-white sm:self-auto">
          <Network className="size-4" aria-hidden /> Ver evidencias de la teoría
        </button>
      </Revelar>

      <Bloque letra="A" titulo="Conceptos clave" descripcion="Abre cada tarjeta para leer la definición completa.">
        <TarjetasConceptos conceptos={t.conceptos} />
      </Bloque>

      <Bloque letra="B" titulo="Niveles de atención" descripcion={t.niveles.intro}>
        <DiagramaNiveles niveles={t.niveles} />
      </Bloque>

      <Bloque letra="C" titulo="Mapa conceptual interactivo" descripcion="Selecciona un concepto para leer su relación dentro del mapa.">
        <MapaConceptual mapa={t.mapa} original={semana.evidencias.teoria.find((e) => e.tipo === 'imagen')} />
      </Bloque>

      <Bloque letra="D" titulo="Rol del terapeuta de lenguaje" descripcion="Elige una función para ver con quién se articula.">
        <RolTerapeuta rol={t.rol} />
      </Bloque>
    </div>
  )
}

import type { ReactNode } from 'react'
import { Revelar } from './Revelar'

type Props = { indice: string; antetitulo: string; titulo: ReactNode; id: string; children?: ReactNode }

export function EncabezadoSeccion({ indice, antetitulo, titulo, id, children }: Props) {
  return (
    <Revelar className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className="eyebrow mb-4 flex items-center gap-3 text-petroleo-500">
          <span className="font-display text-base tracking-normal text-coral-700 normal-case">{indice}</span>
          <span aria-hidden className="h-px w-8 bg-petroleo-300" />
          {antetitulo}
        </p>
        <h2 id={id} className="font-display text-4xl leading-[1.05] font-semibold text-petroleo-900 sm:text-5xl">
          {titulo}
        </h2>
      </div>
      {children && <div className="text-lg leading-relaxed text-gris md:col-span-5">{children}</div>}
    </Revelar>
  )
}

import { ArrowRight, Lightbulb } from 'lucide-react'
import { Revelar } from '../../../ui/Revelar'
import type { BloqueDe } from './tipos'

const estilos = [
  { caja: 'bg-salvia-50 ring-salvia-100', titulo: 'text-salvia-700', punto: 'bg-salvia-500' },
  { caja: 'bg-petroleo-900 text-white ring-petroleo-900', titulo: 'text-coral-400', punto: 'bg-coral-400' },
]

/** Comparación breve en dos columnas, conectadas por la ruta de una a otra. */
export function Comparacion({ bloque }: { bloque: BloqueDe<'comparacion'> }) {
  const [a, b] = bloque.columnas
  const columna = (c: typeof a, i: number) => {
    const e = estilos[i]
    return (
      <Revelar retraso={i * 0.08} className={`rounded-3xl p-6 ring-1 sm:p-7 ${e.caja}`}>
        <p className={`text-sm font-bold tracking-widest uppercase ${e.titulo}`}>{c.titulo}</p>
        <p className={`mt-2 font-display text-2xl leading-snug ${i ? 'text-white' : 'text-petroleo-900'}`}>{c.pregunta}</p>
        <ul className="mt-5 space-y-2.5">
          {c.rasgos.map((r) => (
            <li key={r} className={`flex gap-3 text-sm leading-relaxed ${i ? 'text-white/90' : 'text-tinta'}`}>
              <span aria-hidden className={`mt-2 size-1.5 shrink-0 rounded-full ${e.punto}`} />
              {r}
            </li>
          ))}
        </ul>
      </Revelar>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative grid gap-4 md:grid-cols-2">
        {columna(a, 0)}
        <span aria-hidden className="absolute top-1/2 left-1/2 z-10 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-coral-500 text-white shadow-md md:flex">
          <ArrowRight className="size-5" />
        </span>
        {columna(b, 1)}
      </div>
      <Revelar className="grid gap-3 sm:grid-cols-2">
        <p className="flex gap-3 rounded-2xl bg-papel p-4 text-sm leading-relaxed text-tinta ring-1 ring-linea">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-coral-700" aria-hidden />
          <span>
            <span className="font-semibold">Analogía: </span>
            {bloque.analogia}
          </span>
        </p>
        <p className="rounded-2xl bg-coral-50 p-4 text-sm font-semibold leading-relaxed text-coral-700">{bloque.clave}</p>
      </Revelar>
      <p className="text-xs text-gris">Fuente: {bloque.fuente}</p>
    </div>
  )
}

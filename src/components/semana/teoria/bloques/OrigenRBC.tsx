import { Landmark } from 'lucide-react'
import { Revelar } from '../../../ui/Revelar'
import type { BloqueDe } from './tipos'

/** Concepto y origen de la RBC como recorrido, y su anclaje en el Perú. */
export function OrigenRBC({ bloque }: { bloque: BloqueDe<'origen'> }) {
  return (
    <div className="space-y-5">
      <Revelar className="rounded-3xl bg-salvia-50 p-6 sm:p-8">
        <p className="max-w-4xl font-display text-xl leading-snug text-petroleo-900 sm:text-2xl">{bloque.definicion}</p>
      </Revelar>

      <ol className="grid gap-3 md:grid-cols-4">
        {bloque.pasos.map((p, i) => (
          <Revelar as="li" key={p.titulo} retraso={i * 0.06} className="relative">
            <div className="tarjeta h-full p-5">
              <p className="text-xs font-bold tracking-widest text-coral-700 uppercase">{p.etiqueta}</p>
              <p className="mt-2 font-semibold text-petroleo-900">{p.titulo}</p>
              <p className="mt-2 text-sm leading-relaxed text-gris">{p.texto}</p>
            </div>
            {i < bloque.pasos.length - 1 && (
              <span aria-hidden className="absolute top-1/2 -right-3 z-10 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full bg-coral-500 text-xs text-white md:flex">
                →
              </span>
            )}
          </Revelar>
        ))}
      </ol>

      <Revelar className="grid gap-5 rounded-3xl border border-linea bg-papel p-6 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-2 text-petroleo-500">
            <Landmark className="size-4" aria-hidden /> La RBC en el Perú
          </p>
          <p className="mt-3 leading-relaxed text-tinta">{bloque.peru.marco}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Actores de la acción conjunta">
            {bloque.peru.actores.map((a) => (
              <li key={a} className="rounded-full bg-petroleo-50 px-3 py-1.5 text-sm font-medium text-petroleo-700">{a}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-coral-50 p-5 lg:col-span-5">
          <p className="eyebrow text-coral-700">Nuestro rol como terapeutas</p>
          <p className="mt-2 leading-relaxed text-tinta">{bloque.peru.rol}</p>
        </div>
      </Revelar>
      <p className="text-xs text-gris">Fuente: {bloque.fuente}</p>
    </div>
  )
}

import { MessagesSquare, GraduationCap, House, Handshake, type LucideIcon } from 'lucide-react'
import { Revelar } from '../../../ui/Revelar'
import type { BloqueDe } from './tipos'

const iconos: LucideIcon[] = [MessagesSquare, GraduationCap, House, Handshake]

/** Ejes de la RBC en Terapia de Lenguaje, con todas sus acciones visibles. */
export function EjesIntervencion({ bloque }: { bloque: BloqueDe<'ejes'> }) {
  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-2">
        {bloque.ejes.map((e, i) => {
          const Icono = iconos[i % iconos.length]
          return (
            <Revelar as="li" key={e.titulo} retraso={i * 0.05} className="group rounded-3xl border border-linea bg-papel p-6 transition hover:-translate-y-1 hover:border-petroleo-300 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-salvia-50 text-salvia-700 transition group-hover:bg-petroleo-700 group-hover:text-white">
                  <Icono className="size-5" aria-hidden />
                </span>
                <h4 className="font-display text-xl font-semibold text-petroleo-900">{e.titulo}</h4>
              </div>
              <ul className="mt-4 space-y-2">
                {e.acciones.map((a) => (
                  <li key={a} className="flex gap-2 text-sm leading-relaxed text-tinta">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-coral-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </Revelar>
          )
        })}
      </ul>
      <p className="mt-3 text-xs text-gris">Fuente: {bloque.fuente}</p>
    </div>
  )
}

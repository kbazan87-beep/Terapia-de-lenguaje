import { ArrowRight, CalendarDays } from 'lucide-react'
import type { Semana } from '../../content/tipos'
import { EncabezadoSeccion } from '../ui/EncabezadoSeccion'
import { Revelar } from '../ui/Revelar'

/** Línea de tiempo generada a partir del registro de semanas. */
export function Recorrido({ semanas }: { semanas: Semana[] }) {
  return (
    <section id="recorrido" aria-labelledby="titulo-recorrido" className="bg-papel py-20 md:py-28">
      <div className="contenedor">
        <EncabezadoSeccion id="titulo-recorrido" indice="02" antetitulo="Mi recorrido de aprendizaje" titulo="Semana a semana">
          Cada semana reúne teoría, práctica, evidencias y reflexión. Las siguientes se incorporarán a medida que avance el curso.
        </EncabezadoSeccion>

        <ol className="relative grid gap-5 md:grid-cols-3">
          <span aria-hidden className="absolute top-7 right-0 left-0 hidden h-px bg-gradient-to-r from-petroleo-300 via-lavanda-300 to-transparent md:block" />
          {semanas.map((s, i) => (
            <Revelar as="li" key={s.slug} retraso={i * 0.08} className="relative">
              <span aria-hidden className="relative z-10 mb-5 hidden size-3.5 rounded-full bg-coral-500 ring-8 ring-coral-50 md:mt-[1.35rem] md:block" />
              <a
                href={`#${s.slug}`}
                className="group tarjeta block p-6 transition hover:-translate-y-1 hover:border-petroleo-300 hover:shadow-lg"
              >
                <p className="eyebrow text-coral-700">Semana {s.numero}</p>
                <h3 className="mt-2 font-display text-xl leading-snug font-semibold text-petroleo-900">{s.titulo}</h3>
                <ul className="mt-4 space-y-1.5 text-sm text-gris">
                  {s.sesiones.map((ses) => (
                    <li key={ses.tipo} className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-salvia-700" aria-hidden />
                      <span>
                        <span className="font-medium text-tinta">{ses.tipo}:</span> <time dateTime={ses.fechaISO}>{ses.fecha}</time>
                      </span>
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-petroleo-700">
                  Recorrer la semana <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </a>
            </Revelar>
          ))}
          <Revelar as="li" retraso={0.15} className="relative md:col-span-1">
            <span aria-hidden className="relative z-10 mb-5 hidden size-3.5 rounded-full border-2 border-dashed border-petroleo-300 bg-crema md:mt-[1.35rem] md:block" />
            <div className="flex flex-col justify-center rounded-3xl border border-dashed border-petroleo-300 p-6 text-gris">
              <p className="eyebrow text-petroleo-500">Próximas semanas</p>
              <p className="mt-2 text-sm leading-relaxed">Se incorporarán cuando estén disponibles sus materiales.</p>
            </div>
          </Revelar>
        </ol>
      </div>
    </section>
  )
}

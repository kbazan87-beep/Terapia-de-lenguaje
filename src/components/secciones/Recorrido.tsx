import { ArrowRight, CalendarDays } from 'lucide-react'
import type { Semana } from '../../content/tipos'
import { perfil } from '../../content/perfil'
import { EncabezadoSeccion } from '../ui/EncabezadoSeccion'
import { Revelar } from '../ui/Revelar'

/** Línea de tiempo de las semanas del curso, generada a partir del registro de semanas. */
export function Recorrido({ semanas }: { semanas: Semana[] }) {
  const pasos = Array.from({ length: perfil.totalSemanas }, (_, i) => semanas.find((s) => s.numero === i + 1))
  const pendientes = pasos.map((s, i) => (s ? null : i + 1)).filter((n): n is number => n !== null)

  return (
    <section id="recorrido" aria-labelledby="titulo-recorrido" className="bg-papel py-20 md:py-28">
      <div className="contenedor">
        <EncabezadoSeccion id="titulo-recorrido" indice="02" antetitulo="Mi recorrido de aprendizaje" titulo="Semana a semana">
          Cada semana sigue una misma secuencia: comprendo la teoría, la aplico en la práctica y reflexiono sobre lo aprendido. Las siguientes se incorporarán a medida que avance el curso.
        </EncabezadoSeccion>

        <Revelar>
          <ol className="relative grid grid-cols-7 gap-1" aria-label={`${perfil.totalSemanas} semanas del curso`}>
            <span aria-hidden className="absolute top-[0.6rem] right-[7%] left-[7%] h-px bg-gradient-to-r from-coral-400 via-petroleo-300 to-lavanda-300" />
            {pasos.map((s, i) => (
              <li key={i} className="relative flex flex-col items-center text-center">
                {s ? (
                  <a href={`#${s.slug}`} className="group flex flex-col items-center gap-2">
                    <span className="relative z-10 size-5 rounded-full bg-coral-500 ring-6 ring-coral-50 transition group-hover:scale-110" />
                    <span className="text-xs font-semibold text-petroleo-900 sm:text-sm">
                      <span className="sm:hidden">S{s.numero}</span>
                      <span className="hidden sm:inline">Semana {s.numero}</span>
                    </span>
                  </a>
                ) : (
                  <div className="flex flex-col items-center gap-2" aria-label={`Semana ${i + 1}: próximamente`}>
                    <span className="relative z-10 size-5 rounded-full border-2 border-dashed border-petroleo-300 bg-papel" />
                    <span className="text-xs text-gris sm:text-sm">
                      <span className="sm:hidden">S{i + 1}</span>
                      <span className="hidden sm:inline">Semana {i + 1}</span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </Revelar>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {semanas.map((s, i) => (
            <Revelar key={s.slug} retraso={i * 0.08}>
              <a href={`#${s.slug}`} className="group tarjeta block p-6 transition hover:-translate-y-1 hover:border-petroleo-300 hover:shadow-lg">
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
          {pendientes.length > 0 && (
            <Revelar retraso={0.12} className={['md:col-span-3', 'md:col-span-2', 'md:col-span-1'][semanas.length % 3]}>
              <div className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-petroleo-300 p-6 text-gris">
                <p className="eyebrow text-petroleo-500">
                  {pendientes.length === 1 ? `Semana ${pendientes[0]}` : `Semanas ${pendientes[0]} a ${pendientes.at(-1)}`}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{pendientes.length === 1 ? 'Se incorporará cuando estén disponibles sus materiales.' : 'Se incorporarán cuando estén disponibles sus materiales.'}</p>
              </div>
            </Revelar>
          )}
        </div>
      </div>
    </section>
  )
}

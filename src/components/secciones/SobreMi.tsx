import { Home, School, Trees } from 'lucide-react'
import { perfil } from '../../content/perfil'
import { EncabezadoSeccion } from '../ui/EncabezadoSeccion'
import { Revelar } from '../ui/Revelar'
import retrato from '../../assets/retrato-kimberli.webp'

const iconos = [Home, School, Trees]

export function SobreMi() {
  return (
    <section id="sobre-mi" aria-labelledby="titulo-sobre-mi" className="py-20 md:py-28">
      <div className="contenedor">
        <EncabezadoSeccion id="titulo-sobre-mi" indice="01" antetitulo="Sobre mí" titulo={<>Una vocación que <em className="text-salvia-700">escucha</em></>}>
          Mi presentación, lo que me motiva y lo que quiero lograr en este curso.
        </EncabezadoSeccion>

        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          {/* Columna 1: retrato */}
          <Revelar className="md:col-span-5">
            <figure className="relative mx-auto max-w-md md:sticky md:top-28 md:max-w-none">
              <div aria-hidden className="absolute -inset-y-3 inset-x-2 -z-10 rotate-[-2deg] sm:-inset-3 rounded-[2.2rem] bg-lavanda-100" />
              <div className="overflow-hidden rounded-[2rem] bg-salvia-50 ring-1 ring-linea">
                <img src={retrato} alt={`Retrato de ${perfil.nombre} con uniforme azul`} width={900} height={1125} className="aspect-[4/5] h-auto w-full object-cover object-top" />
              </div>
              <figcaption className="absolute bottom-4 left-4 rounded-2xl bg-papel/90 px-4 py-2.5 shadow-md backdrop-blur-sm">
                <span className="block font-display text-base font-semibold text-petroleo-900">{perfil.nombreCorto}</span>
                <span className="block text-xs text-gris">Estudiante de {perfil.carrera}</span>
              </figcaption>
            </figure>
          </Revelar>

          {/* Columna 2: presentación personal */}
          <div className="flex flex-col gap-5 md:col-span-7">
            <Revelar retraso={0.05} className="tarjeta p-7 sm:p-9">
              <p className="font-display text-2xl leading-snug text-petroleo-900 sm:text-[1.6rem]">{perfil.sobreMi[0]}</p>
            </Revelar>
            <div className="grid gap-5 sm:grid-cols-2">
              <Revelar retraso={0.1} className="rounded-3xl bg-petroleo-700 p-7 text-white">
                <p className="eyebrow text-petroleo-100">Lo que descubrí</p>
                <p className="mt-3 leading-relaxed text-white/90">{perfil.sobreMi[1]}</p>
              </Revelar>
              <Revelar retraso={0.15} className="rounded-3xl bg-salvia-50 p-7">
                <p className="eyebrow text-salvia-700">Más allá del consultorio</p>
                <ul className="mt-4 space-y-3">
                  {perfil.ambitos.map((a, i) => {
                    const Icono = iconos[i]
                    return (
                      <li key={a} className="flex items-center gap-3 font-medium text-tinta">
                        <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-salvia-700 ring-1 ring-salvia-100">
                          <Icono className="size-4" aria-hidden />
                        </span>
                        En {a}
                      </li>
                    )
                  })}
                </ul>
              </Revelar>
            </div>
          </div>
        </div>

        <div className="mt-14" id="metas">
          <Revelar>
            <h3 className="font-display text-2xl font-semibold text-petroleo-900">Mis metas para el curso</h3>
          </Revelar>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {perfil.metas.map((meta, i) => (
              <Revelar as="li" key={meta} retraso={i * 0.08} className="group tarjeta relative overflow-hidden p-6 transition hover:-translate-y-1 hover:border-lavanda-300 hover:shadow-lg">
                <span className="font-display text-5xl text-lavanda-300 transition group-hover:text-lavanda-500">0{i + 1}</span>
                <p className="mt-4 leading-relaxed text-tinta">{meta}</p>
              </Revelar>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

import { ArrowRight, Compass, FileSpreadsheet, Lightbulb, MapPin, Route, Users } from 'lucide-react'
import type { EvidenciaTabla, Semana } from '../../content/tipos'
import { BloqueEvidencias } from './evidencias/BloqueEvidencias'
import { EsquemaConos } from './EsquemaConos'
import { Revelar } from '../ui/Revelar'

export function Practica({ semana }: { semana: Semana }) {
  const p = semana.practica
  const sesion = semana.sesiones.find((s) => s.tipo === 'Práctica')
  const directorio = `${semana.slug}-practica-directorio`
  const tablaDirectorio = semana.evidencias.practica.find((e): e is EvidenciaTabla => e.tipo === 'tabla' && e.columnaGrupo !== undefined)

  return (
    <div className="space-y-6">
      <Revelar className="flex flex-col gap-2 rounded-3xl bg-salvia-50 p-6 sm:p-8">
        <p className="eyebrow text-salvia-700">Práctica · {sesion?.fecha}</p>
        <p className="font-display text-2xl text-petroleo-900 sm:text-3xl">{p.titulo}</p>
        <p className="flex items-center gap-2 text-gris"><Users className="size-4" aria-hidden /> Modalidad: {p.modalidad}</p>
      </Revelar>

      <div className="grid gap-5 lg:grid-cols-12">
        {/* 1. Propósito */}
        <Revelar className="tarjeta p-7 lg:col-span-5">
          <Paso n={1} icono={<Compass className="size-5" aria-hidden />} titulo="Propósito" />
          <p className="mt-4 font-display text-xl leading-snug text-petroleo-900">{p.proposito}</p>
          <div aria-hidden className="mt-6 flex items-center gap-2 text-xs font-semibold text-salvia-700">
            <span className="rounded-full bg-salvia-50 px-3 py-1.5">Necesidad</span>
            <span>+</span>
            <span className="rounded-full bg-salvia-50 px-3 py-1.5"><MapPin className="mr-1 inline size-3" />Ubicación</span>
            <ArrowRight className="size-4" />
            <span className="rounded-full bg-salvia-700 px-3 py-1.5 text-white"><Route className="mr-1 inline size-3" />Derivación</span>
          </div>
        </Revelar>

        {/* 2. Actividad realizada */}
        <Revelar retraso={0.06} className="tarjeta p-7 lg:col-span-7">
          <Paso n={2} icono={<FileSpreadsheet className="size-5" aria-hidden />} titulo="¿Qué hice?" />
          <p className="mt-4 leading-relaxed text-tinta">{p.actividad}</p>
          <p className="eyebrow mt-6 text-gris">Tipos de servicio del directorio</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.categorias.map((c) => (
              <li key={c} className="rounded-full border border-salvia-100 bg-salvia-50/60 px-3 py-1.5 text-sm text-salvia-700">{c}</li>
            ))}
          </ul>
        </Revelar>

        {/* 3. Producto elaborado */}
        <Revelar retraso={0.1} className="flex flex-col justify-between gap-6 rounded-3xl bg-petroleo-700 p-7 text-white lg:col-span-4">
          <div>
            <Paso n={3} icono={<FileSpreadsheet className="size-5" aria-hidden />} titulo="Producto elaborado" claro />
            <p className="mt-4 font-display text-xl leading-snug">{p.producto}</p>
          </div>
          <a href={`#${directorio}`} className="group inline-flex items-center justify-between gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-petroleo-900 hover:bg-coral-50">
            Consultar el directorio <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
          </a>
        </Revelar>

        {/* 4. Aprendizaje y aplicación comunitaria */}
        <Revelar retraso={0.14} className="tarjeta p-7 lg:col-span-8">
          <Paso n={4} icono={<Lightbulb className="size-5" aria-hidden />} titulo="Aprendizaje y aplicación comunitaria (Aporte)" />
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {p.aprendizaje.map((t, i) => (
              <p key={i} className={`leading-relaxed ${i === 0 ? 'text-tinta' : 'border-l-2 border-salvia-300 pl-4 text-tinta'}`}>{t}</p>
            ))}
          </div>
        </Revelar>
      </div>

      <section id={directorio} aria-labelledby={`${directorio}-titulo`} className="scroll-mt-40 pt-10">
        <Revelar className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-linea pt-10">
          <h3 id={`${directorio}-titulo`} className="font-display text-2xl font-semibold text-petroleo-900 sm:text-3xl">Directorio de lugares de atención</h3>
          <p className="w-full text-gris sm:w-auto sm:flex-1 sm:text-right">Evidencia principal de la práctica. Busca por institución o distrito y filtra por cono.</p>
        </Revelar>
        {tablaDirectorio && (
          <Revelar className="mb-10">
            <EsquemaConos evidencia={tablaDirectorio} />
          </Revelar>
        )}
        <BloqueEvidencias evidencias={semana.evidencias.practica} procedencia="Evidencia de práctica" />
      </section>
    </div>
  )
}

function Paso({ n, icono, titulo, claro = false }: { n: number; icono: React.ReactNode; titulo: string; claro?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`inline-flex size-10 items-center justify-center rounded-full ${claro ? 'bg-white/15 text-white' : 'bg-salvia-50 text-salvia-700'}`}>{icono}</span>
      <h4 className={`text-sm font-bold tracking-wider uppercase ${claro ? 'text-white/85' : 'text-salvia-700'}`}>
        <span className="font-display normal-case">{n}.</span> {titulo}
      </h4>
    </div>
  )
}

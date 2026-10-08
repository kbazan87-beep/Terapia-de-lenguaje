import { motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { perfil } from '../../content/perfil'
import { LogoUPCH } from '../ui/Logo'
import { OndasComunidad } from './OndasComunidad'

const datos = [
  { etiqueta: 'Curso', valor: perfil.curso },
  { etiqueta: 'Código · Periodo', valor: `${perfil.codigo} · ${perfil.periodo}` },
  { etiqueta: 'Carrera', valor: perfil.carrera },
  { etiqueta: 'Docente', valor: perfil.docente },
]

export function Portada() {
  return (
    <section id="inicio" aria-labelledby="titulo-portada" className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-lavanda-100/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-salvia-100/80 blur-3xl" />

      <div className="contenedor relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 flex flex-wrap items-center gap-3">
            <LogoUPCH className="h-9 sm:h-10" />
            <span className="eyebrow text-gris">Portafolio académico personal</span>
          </motion.div>

          <motion.h1
            id="titulo-portada"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[2.6rem] leading-[1] font-semibold tracking-tight text-petroleo-900 sm:text-6xl lg:text-7xl"
          >
            Kimberli Zaleth
            <span className="block text-petroleo-500">Cardozo Casimiro</span>
          </motion.h1>

          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 max-w-xl border-l-2 border-coral-500 pl-5"
          >
            <p className="font-display text-xl leading-snug text-tinta italic sm:text-2xl">«{perfil.frase}»</p>
          </motion.blockquote>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.6 }} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#sobre-mi"
              className="group inline-flex items-center gap-3 rounded-full bg-petroleo-700 py-3 pr-3 pl-6 font-medium text-white transition hover:bg-petroleo-900"
            >
              Explorar mi portafolio
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-coral-500 transition group-hover:translate-y-0.5">
                <ArrowDown className="size-4" aria-hidden />
              </span>
            </a>
            <p className="text-sm text-gris">{perfil.universidad}</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="lg:col-span-5">
          <div className="tarjeta relative overflow-hidden p-6 sm:p-8">
            <p className="eyebrow text-petroleo-500">Cada voz cuenta</p>
            <p className="mt-2 font-display text-lg leading-snug text-petroleo-900">mi recorrido hacia una terapia de lenguaje más cercana a la comunidad</p>
            <OndasComunidad />
            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 border-t border-linea pt-5 sm:grid-cols-2">
              {datos.map((d) => (
                <div key={d.etiqueta}>
                  <dt className="eyebrow text-[0.65rem] text-gris">{d.etiqueta}</dt>
                  <dd className="mt-1 text-sm font-medium text-tinta">{d.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

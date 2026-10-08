import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Home, Megaphone, Network, Trees, Scale, type LucideIcon } from 'lucide-react'
import { Revelar } from '../../../ui/Revelar'
import type { BloqueDe } from './tipos'

const iconos: LucideIcon[] = [Trees, Home, Network, Megaphone]

/** Estrategias en el Perú, retos y marco normativo (CDPD, artículo 3, y Ley N.° 29973). */
export function ContextoPeru({ bloque }: { bloque: BloqueDe<'contexto-peru'> }) {
  const [letra, setLetra] = useState(bloque.normativa.principios[0].letra)
  const principio = bloque.normativa.principios.find((p) => p.letra === letra)!

  return (
    <div className="space-y-8">
      {/* Estrategias */}
      <div>
        <h4 className="eyebrow mb-3 text-salvia-700">Estrategias prácticas en el Perú</h4>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {bloque.estrategias.map((e, i) => {
            const Icono = iconos[i % iconos.length]
            return (
              <Revelar as="li" key={e.titulo} retraso={i * 0.05} className="group tarjeta p-5 transition hover:-translate-y-1 hover:border-salvia-300 hover:shadow-md">
                <Icono className="size-6 text-salvia-700 transition group-hover:scale-110" aria-hidden />
                <p className="mt-3 font-semibold text-petroleo-900">{e.titulo}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gris">{e.texto}</p>
              </Revelar>
            )
          })}
        </ul>
      </div>

      {/* Retos */}
      <Revelar className="rounded-3xl bg-petroleo-900 p-6 text-white sm:p-8">
        <h4 className="eyebrow text-petroleo-100">Retos y desafíos</h4>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {bloque.retos.map((r, i) => (
            <li key={r} className="flex items-start gap-4">
              <span className="font-display text-4xl leading-none text-coral-400">{i + 1}</span>
              <span className="pt-1 leading-relaxed text-white/90">{r}</span>
            </li>
          ))}
        </ol>
      </Revelar>

      {/* Marco normativo */}
      <Revelar className="tarjeta grid gap-6 p-6 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h4 className="eyebrow flex items-center gap-2 text-lavanda-700">
            <Scale className="size-4" aria-hidden /> Marco normativo
          </h4>
          <p className="mt-2 font-display text-xl leading-snug text-petroleo-900">{bloque.normativa.titulo}</p>
          <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Principios generales del artículo 3">
            {bloque.normativa.principios.map((p) => (
              <button
                key={p.letra}
                type="button"
                aria-pressed={p.letra === letra}
                onClick={() => setLetra(p.letra)}
                className={`size-10 rounded-full text-sm font-bold transition ${p.letra === letra ? 'bg-lavanda-700 text-white' : 'bg-lavanda-50 text-lavanda-700 hover:bg-lavanda-100'}`}
                aria-label={`Principio ${p.letra}`}
              >
                {p.letra}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-gris">{bloque.normativa.ley}</p>
        </div>
        <div className="lg:col-span-7" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p key={letra} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="rounded-2xl bg-lavanda-50 p-5 font-display text-xl leading-snug text-petroleo-900">
              <span className="text-lavanda-700">{principio.letra})</span> {principio.texto}
            </motion.p>
          </AnimatePresence>
          <ol className="mt-4 space-y-1 text-sm text-gris">
            {bloque.normativa.principios.map((p) => (
              <li key={p.letra} className={p.letra === letra ? 'font-semibold text-tinta' : ''}>
                {p.letra}) {p.texto}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-gris">{bloque.normativa.cita}</p>
        </div>
      </Revelar>

      <Revelar>
        <blockquote className="border-l-2 border-coral-500 pl-5 font-display text-2xl leading-snug text-petroleo-900 italic sm:text-3xl">«{bloque.cierre}»</blockquote>
      </Revelar>
    </div>
  )
}

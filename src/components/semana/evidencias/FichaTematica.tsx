import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, FileSpreadsheet, ListChecks, Puzzle, ScrollText } from 'lucide-react'
import type { EvidenciaFicha } from '../../../content/tipos'

/**
 * Ficha temática (definición, características y actividades) presentada para explorarla.
 * Los textos son los de la hoja original; también se puede consultar la hoja tal como fue registrada.
 */
export function FichaTematica({ evidencia }: { evidencia: EvidenciaFicha }) {
  const [sel, setSel] = useState(0)
  const [original, setOriginal] = useState(false)
  const n = evidencia.actividades.length
  const act = evidencia.actividades[sel]

  const detalle = (
    <AnimatePresence mode="wait">
      <motion.div key={sel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
        <p className="eyebrow text-salvia-700">
          Actividad {sel + 1} de {n}
        </p>
        <p className="mt-2 font-display text-2xl leading-snug text-petroleo-900">{act.titulo}</p>
        <p className="mt-3 leading-relaxed text-tinta">{act.descripcion}</p>
      </motion.div>
    </AnimatePresence>
  )

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Definición */}
        <section aria-labelledby={`${evidencia.id}-def`} className="rounded-3xl bg-petroleo-700 p-7 text-white lg:col-span-7">
          <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-white/80 uppercase">
            <ScrollText className="size-5" aria-hidden />
            <span id={`${evidencia.id}-def`}>
              <span className="font-display normal-case">1.</span> Definición
            </span>
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/95">{evidencia.definicion}</p>
        </section>

        {/* Características */}
        <section aria-labelledby={`${evidencia.id}-car`} className="tarjeta p-7 lg:col-span-5">
          <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-salvia-700 uppercase">
            <ListChecks className="size-5" aria-hidden />
            <span id={`${evidencia.id}-car`}>
              <span className="font-display normal-case">2.</span> Características
            </span>
          </p>
          <ul className="mt-4 space-y-2">
            {evidencia.rasgos.map((r) => (
              <li key={r} className="flex gap-3 rounded-2xl bg-salvia-50 px-4 py-3 text-sm font-medium text-petroleo-900">
                <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-coral-500" />
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-gris">{evidencia.caracteristicas}</p>
        </section>
      </div>

      {/* Actividades */}
      <section aria-labelledby={`${evidencia.id}-act`} className="tarjeta p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-lavanda-700 uppercase">
            <Puzzle className="size-5" aria-hidden />
            <span id={`${evidencia.id}-act`}>
              <span className="font-display normal-case">3.</span> Actividades ({n})
            </span>
          </p>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setSel((v) => (v - 1 + n) % n)} className="inline-flex size-9 items-center justify-center rounded-full ring-1 ring-linea hover:bg-lavanda-50" aria-label="Actividad anterior">
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={() => setSel((v) => (v + 1) % n)} className="inline-flex size-9 items-center justify-center rounded-full ring-1 ring-linea hover:bg-lavanda-50" aria-label="Actividad siguiente">
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
        <div aria-hidden className="mt-4 flex gap-1">
          {evidencia.actividades.map((_, i) => (
            <span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= sel ? 'bg-lavanda-500' : 'bg-lavanda-100'}`} />
          ))}
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-12">
          <ol className="grid gap-1.5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {evidencia.actividades.map((a, i) => {
              const activo = i === sel
              return (
                <li key={a.titulo}>
                  <button
                    type="button"
                    aria-pressed={activo}
                    onClick={() => setSel(i)}
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${activo ? 'bg-lavanda-700 text-white' : 'text-tinta hover:bg-lavanda-50'}`}
                  >
                    <span className={`font-display text-xs ${activo ? 'text-white/80' : 'text-lavanda-700'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-medium">{a.titulo}</span>
                  </button>
                </li>
              )
            })}
          </ol>
          <div className="rounded-2xl bg-lavanda-50 p-6 lg:sticky lg:top-44 lg:col-span-7 lg:self-start" aria-live="polite">
            {detalle}
          </div>
        </div>
      </section>

      <div>
        <button
          type="button"
          aria-expanded={original}
          aria-controls={`${evidencia.id}-original`}
          onClick={() => setOriginal((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-lavanda-300 bg-white px-4 py-2 text-sm font-semibold text-lavanda-700 hover:bg-lavanda-50"
        >
          <FileSpreadsheet className="size-4" aria-hidden /> {original ? 'Ocultar la hoja original' : `Ver la hoja «${evidencia.tema}» tal como está en el Excel`}
        </button>
        <AnimatePresence initial={false}>
          {original && (
            <motion.div id={`${evidencia.id}-original`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mt-4 max-h-[70vh] overflow-auto rounded-3xl border border-linea bg-white" tabIndex={0} role="region" aria-label={`Hoja ${evidencia.tema} original`}>
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="sticky top-0 bg-lavanda-50 text-xs text-lavanda-700">
                    <tr>
                      <th scope="col" className="w-20 px-3 py-2">Celda</th>
                      <th scope="col" className="px-3 py-2">Contenido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evidencia.celdas.map((c) => (
                      <tr key={c.ref} className="border-t border-linea align-top">
                        <th scope="row" className="px-3 py-2 font-mono text-xs text-gris">{c.ref}</th>
                        <td className="px-3 py-2 leading-relaxed text-tinta">{c.valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gris">Fuente: {evidencia.fuente}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

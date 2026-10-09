import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight, Clapperboard, MapPin, Users } from 'lucide-react'
import type { EvidenciaDialogo } from '../../../content/tipos'
import { BotonDescarga } from './ExploradorProtocolo'

const tonos = ['bg-petroleo-700', 'bg-lavanda-700', 'bg-salvia-700', 'bg-coral-700', 'bg-petroleo-500', 'bg-lavanda-500', 'bg-salvia-500', 'bg-petroleo-900']

/** Guion de diálogos por escenas: se recorre escena por escena o completo, con los textos tal como figuran en el Word. */
export function GuionDialogo({ evidencia }: { evidencia: EvidenciaDialogo }) {
  const opciones = [...evidencia.escenas.map((_, i) => `Escena ${i + 1}`), 'Guion completo']
  const [sel, setSel] = useState(0)
  const botones = useRef<(HTMLButtonElement | null)[]>([])
  const id = evidencia.id
  const n = opciones.length
  const completo = sel === n - 1
  const voces = [...new Set(evidencia.escenas.flatMap((e) => e.lineas.map((l) => l.voz)))]
  const tono = (voz: string) => tonos[voces.indexOf(voz) % tonos.length]
  const lineas = evidencia.escenas.reduce((a, e) => a + e.lineas.length, 0)
  const visibles = completo ? evidencia.escenas.map((e, i) => ({ e, i })) : [{ e: evidencia.escenas[sel], i: sel }]

  const teclado = (ev: KeyboardEvent, i: number) => {
    const destino = ev.key === 'ArrowRight' ? i + 1 : ev.key === 'ArrowLeft' ? i - 1 : null
    if (destino === null) return
    ev.preventDefault()
    const k = (destino + n) % n
    setSel(k)
    botones.current[k]?.focus()
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col justify-between gap-5 rounded-3xl bg-petroleo-900 p-6 text-white sm:p-7 lg:col-span-4">
          <div>
            <p className="eyebrow flex items-center gap-2 text-coral-100">
              <Clapperboard className="size-4" aria-hidden /> Planificación del video
            </p>
            <p className="mt-3 leading-relaxed text-white/85">{evidencia.introduccion}</p>
          </div>
          <dl className="grid grid-cols-3 gap-2 text-center">
            {[
              ['Escenas', evidencia.escenas.length],
              ['Líneas', lineas],
              ['Voces', voces.length],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-white/8 px-2 py-3 ring-1 ring-white/10">
                <dd className="font-display text-2xl">{v}</dd>
                <dt className="text-xs text-white/70">{k}</dt>
              </div>
            ))}
          </dl>
          <BotonDescarga href={evidencia.archivo.href} nombre={evidencia.archivo.nombre} etiqueta="Descargar guion de TikTok" />
        </div>

        <div className="tarjeta flex min-w-0 flex-col p-5 sm:p-6 lg:col-span-8">
          <div role="tablist" aria-label="Escenas del guion" className="flex gap-1.5 overflow-x-auto pb-1">
            {opciones.map((o, i) => (
              <button
                key={o}
                ref={(el) => {
                  botones.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={i === sel}
                aria-controls={`${id}-panel`}
                tabIndex={i === sel ? 0 : -1}
                onClick={() => setSel(i)}
                onKeyDown={(ev) => teclado(ev, i)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${i === sel ? 'bg-petroleo-700 text-white' : 'bg-petroleo-50 text-petroleo-900 hover:bg-petroleo-100'}`}
              >
                {o}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={sel}
              id={`${id}-panel`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${sel}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`mt-4 flex-1 space-y-5 ${completo ? 'max-h-[32rem] overflow-y-auto pr-1' : ''}`}
            >
              {visibles.map(({ e, i }) => (
                <div key={i}>
                  <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-salvia-700 uppercase">
                    <MapPin className="size-3.5" aria-hidden /> Escena {i + 1} · {e.lugar}
                  </p>
                  <ol className="mt-3 space-y-2.5">
                    {e.lineas.map((l, k) => (
                      <li key={k} className="flex items-start gap-3">
                        <span aria-hidden className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${tono(l.voz)}`}>
                          {l.voz[0]}
                        </span>
                        <p className="min-w-0 rounded-2xl rounded-tl-sm bg-crema px-4 py-2.5 text-sm leading-relaxed text-tinta">
                          <span className="font-semibold text-petroleo-900">{l.voz}:</span> {l.texto}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {!completo && (
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-linea pt-4 text-sm">
              <button type="button" disabled={sel === 0} onClick={() => setSel((v) => v - 1)} className="inline-flex items-center gap-1 font-semibold text-petroleo-700 disabled:opacity-30">
                <ChevronLeft className="size-4" aria-hidden /> Anterior
              </button>
              <span className="text-gris">
                Escena {sel + 1} de {evidencia.escenas.length}
              </span>
              <button type="button" onClick={() => setSel((v) => v + 1)} className="inline-flex items-center gap-1 font-semibold text-petroleo-700">
                {sel === evidencia.escenas.length - 1 ? 'Ver completo' : 'Siguiente'} <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          )}
        </div>
      </div>

      <a
        href={evidencia.relacionado.href}
        // Si el enlace ya es la dirección actual, el navegador no avisa del cambio: se fuerza para abrir la pestaña.
        onClick={() => location.hash === evidencia.relacionado.href && window.dispatchEvent(new HashChangeEvent('hashchange'))}
        className="group flex flex-col gap-2 rounded-3xl border border-linea bg-white/60 p-5 text-sm text-gris transition hover:border-petroleo-300 sm:flex-row sm:items-center sm:justify-between">
        <span>{evidencia.relacionado.texto}</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-petroleo-700 group-hover:text-coral-700">
          {evidencia.relacionado.boton} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
        </span>
      </a>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-3xl bg-crema px-5 py-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-petroleo-900">
          <Users className="size-4 text-lavanda-700" aria-hidden /> {evidencia.integrantes.titulo}:
        </p>
        <ul className="flex flex-wrap gap-2">
          {evidencia.integrantes.nombres.map((nombre) => (
            <li key={nombre} className="rounded-full bg-white px-3 py-1 text-sm text-tinta">{nombre}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Clapperboard, ChevronLeft, ChevronRight, Expand, FileImage, MonitorPlay, Presentation, ScrollText, Users, type LucideIcon } from 'lucide-react'
import type { EvidenciaGaleria, EvidenciaImagen, SegmentoGuion } from '../../../content/tipos'
import { VisorImagen } from './VisorImagen'

const iconos: Record<string, LucideIcon> = { infografia: FileImage, diptico: ScrollText, charla: Presentation, video: Clapperboard }
const segundos = (t: string) => {
  const [m, s] = t.split(':').map(Number)
  return m * 60 + s
}

/** Guion audiovisual: línea de tiempo por segmentos y lectura del parlamento. */
function VisorGuion({ guion }: { guion: SegmentoGuion[] }) {
  const [sel, setSel] = useState(0)
  const total = segundos(guion.at(-1)!.fin)
  const seg = guion[sel]
  const colores = ['bg-petroleo-500', 'bg-lavanda-500', 'bg-salvia-500', 'bg-coral-500', 'bg-petroleo-700']

  return (
    <div className="p-5 sm:p-7">
      <div className="flex" role="group" aria-label="Segmentos del guion">
        {guion.map((g, i) => {
          const ancho = ((segundos(g.fin) - segundos(g.inicio)) / total) * 100
          return (
            <button
              key={g.titulo}
              type="button"
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
              style={{ width: `${ancho}%` }}
              className="group min-w-0 px-0.5 text-left"
              aria-label={`${g.titulo}, de ${g.inicio} a ${g.fin}`}
            >
              <span className={`block h-2.5 rounded-full transition ${colores[i % colores.length]} ${i === sel ? '' : 'opacity-30 group-hover:opacity-60'}`} />
              <span className={`mt-2 hidden truncate text-[0.7rem] font-semibold tracking-wide uppercase sm:block ${i === sel ? 'text-tinta' : 'text-gris'}`}>{g.titulo}</span>
              <span className="hidden text-[0.7rem] text-gris tabular-nums sm:block">{g.inicio}</span>
            </button>
          )
        })}
      </div>
      <p className="mt-2 flex justify-between text-xs text-gris tabular-nums sm:hidden">
        <span>0:00</span>
        <span>{guion.at(-1)!.fin}</span>
      </p>

      <AnimatePresence mode="wait">
        <motion.article key={sel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className="mt-6" aria-live="polite">
          <header className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display text-2xl text-petroleo-900">{seg.titulo}</p>
            <p className="rounded-full bg-crema px-3 py-1 text-sm font-medium text-gris tabular-nums">
              {seg.inicio} – {seg.fin}
            </p>
          </header>
          {seg.voz && (
            <p className="mt-3 text-sm text-lavanda-700">
              <span className="font-bold tracking-wider uppercase">{seg.voz}</span>
              {seg.acotacion && <em className="ml-2 text-gris">({seg.acotacion})</em>}
            </p>
          )}
          <div className="mt-3 space-y-3 border-l-2 border-lavanda-300 pl-5">
            {seg.parrafos.map((t, i) =>
              t.endsWith(':') ? (
                <p key={i} className="pt-1 text-sm font-semibold text-petroleo-700">{t}</p>
              ) : (
                <p key={i} className="leading-relaxed text-tinta">{t}</p>
              ),
            )}
          </div>
          {seg.enPantalla && (
            <p className="mt-5 flex items-start gap-3 rounded-2xl bg-lavanda-50 p-4 text-sm text-tinta">
              <MonitorPlay className="mt-0.5 size-4 shrink-0 text-lavanda-700" aria-hidden />
              <span>
                <span className="font-semibold text-lavanda-700">En pantalla: </span>
                {seg.enPantalla}
              </span>
            </p>
          )}
        </motion.article>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between border-t border-linea pt-4">
        <button type="button" disabled={sel === 0} onClick={() => setSel((v) => v - 1)} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-gris hover:bg-crema disabled:opacity-40">
          <ChevronLeft className="size-4" aria-hidden /> Anterior
        </button>
        <span className="text-xs text-gris">
          Segmento {sel + 1} de {guion.length}
        </span>
        <button type="button" disabled={sel === guion.length - 1} onClick={() => setSel((v) => v + 1)} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-gris hover:bg-crema disabled:opacity-40">
          Siguiente <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}

/** Materiales de difusión: un kit con su público y un visor para recorrer cada material. */
export function GaleriaMateriales({ evidencia }: { evidencia: EvidenciaGaleria }) {
  const [sel, setSel] = useState(0)
  const [pag, setPag] = useState(0)
  const [ampliada, setAmpliada] = useState<EvidenciaImagen | null>(null)
  const m = evidencia.materiales[sel]
  const p = m.paginas[pag]
  const total = m.paginas.length

  const elegir = (i: number) => {
    setSel(i)
    setPag(0)
  }

  return (
    <div className="space-y-4">
      {/* Kit de difusión: cada material con su formato y su público */}
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" role="group" aria-label="Materiales elaborados">
        {evidencia.materiales.map((mat, i) => {
          const Icono = iconos[mat.id] ?? FileImage
          const activo = i === sel
          return (
            <button
              key={mat.id}
              type="button"
              aria-pressed={activo}
              onClick={() => elegir(i)}
              className={`flex flex-col gap-3 rounded-2xl border p-4 text-left transition ${activo ? 'border-lavanda-700 bg-lavanda-700 text-white shadow-md' : 'border-linea bg-papel hover:-translate-y-0.5 hover:border-lavanda-300'}`}
            >
              <span className="flex items-center gap-3">
                <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full ${activo ? 'bg-white/15' : 'bg-lavanda-50 text-lavanda-700'}`}>
                  <Icono className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">{mat.nombre}</span>
                  <span className={`block text-xs ${activo ? 'text-white/80' : 'text-gris'}`}>{mat.formato}</span>
                </span>
              </span>
              {mat.publico && (
                <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${activo ? 'bg-white/15 text-white' : 'bg-salvia-50 text-salvia-700'}`}>
                  <Users className="size-3.5" aria-hidden /> Para {mat.publico}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="tarjeta grid overflow-hidden lg:grid-cols-12">
        <div className="relative min-w-0 bg-crema lg:col-span-8">
          {m.guion ? (
            <div className="h-full bg-white">
              <VisorGuion guion={m.guion} />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.button
                key={`${m.id}-${pag}`}
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setAmpliada({ tipo: 'imagen', id: `${m.id}-${pag}`, titulo: `${m.nombre} · ${p.etiqueta}`, descripcion: m.descripcion, autoria: 'Elaboración propia', src: p.src, alt: p.alt })}
                className="group relative flex w-full items-center justify-center p-3 sm:p-5"
                aria-label={`Ampliar ${m.nombre}, ${p.etiqueta}`}
              >
                <img src={p.src} alt={p.alt} className="max-h-[70vh] w-auto max-w-full rounded-xl shadow-sm" loading="lazy" />
                <span className="absolute right-5 bottom-5 inline-flex items-center gap-2 rounded-full bg-petroleo-900/85 px-3 py-1.5 text-xs font-semibold text-white opacity-90 group-hover:opacity-100">
                  <Expand className="size-3.5" aria-hidden /> Ampliar
                </span>
              </motion.button>
            </AnimatePresence>
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-linea p-6 lg:col-span-4 lg:border-t-0 lg:border-l">
          <div>
            <p className="eyebrow text-lavanda-700">{m.modalidad}</p>
            <p className="mt-1 font-display text-2xl text-petroleo-900">{m.nombre}</p>
            <p className="mt-2 text-sm leading-relaxed text-gris">{m.descripcion}</p>
          </div>
          {total > 1 && (
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-tinta" aria-live="polite">
                  {p.etiqueta} <span className="font-normal text-gris">({pag + 1} de {total})</span>
                </p>
                <div className="flex gap-1">
                  <button type="button" onClick={() => setPag((v) => (v - 1 + total) % total)} className="inline-flex size-9 items-center justify-center rounded-full ring-1 ring-linea hover:bg-lavanda-50" aria-label="Anterior">
                    <ChevronLeft className="size-4" aria-hidden />
                  </button>
                  <button type="button" onClick={() => setPag((v) => (v + 1) % total)} className="inline-flex size-9 items-center justify-center rounded-full ring-1 ring-linea hover:bg-lavanda-50" aria-label="Siguiente">
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                </div>
              </div>
              <ol className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-5 lg:grid-cols-4">
                {m.paginas.map((pg, i) => (
                  <li key={pg.src}>
                    <button
                      type="button"
                      aria-pressed={i === pag}
                      aria-label={pg.etiqueta}
                      onClick={() => setPag(i)}
                      className={`block w-full overflow-hidden rounded-lg ring-2 transition ${i === pag ? 'ring-lavanda-700' : 'ring-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={pg.src} alt="" className="aspect-video w-full object-cover" loading="lazy" />
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {m.guion && (
            <ol className="space-y-1 text-sm">
              {m.guion.map((g) => (
                <li key={g.titulo} className="flex justify-between gap-3 text-gris">
                  <span>{g.titulo.charAt(0) + g.titulo.slice(1).toLowerCase()}</span>
                  <span className="tabular-nums">{g.inicio}–{g.fin}</span>
                </li>
              ))}
            </ol>
          )}
          {evidencia.noIncluidos && evidencia.noIncluidos.length > 0 && (
            <p className="mt-auto rounded-2xl bg-crema p-3 text-xs leading-relaxed text-gris">
              También elaboré {evidencia.noIncluidos.join(' y ')}. Su archivo no se incluyó en los documentos de esta semana.
            </p>
          )}
        </div>
      </div>

      {ampliada && <VisorImagen evidencia={ampliada} abierto cerrar={() => setAmpliada(null)} />}
    </div>
  )
}

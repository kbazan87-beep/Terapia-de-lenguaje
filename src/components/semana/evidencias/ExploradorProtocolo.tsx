import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BookMarked, Download, FileText, Info, Users } from 'lucide-react'
import type { EvidenciaImagen, EvidenciaProtocolo } from '../../../content/tipos'
import { VisorImagen } from './VisorImagen'

const colores: Record<string, { fondo: string; suave: string; texto: string }> = {
  R: { fondo: 'bg-petroleo-700', suave: 'bg-petroleo-50', texto: 'text-petroleo-700' },
  E: { fondo: 'bg-lavanda-700', suave: 'bg-lavanda-50', texto: 'text-lavanda-700' },
  S: { fondo: 'bg-salvia-700', suave: 'bg-salvia-50', texto: 'text-salvia-700' },
  I: { fondo: 'bg-coral-700', suave: 'bg-coral-50', texto: 'text-coral-700' },
  J: { fondo: 'bg-petroleo-900', suave: 'bg-crema', texto: 'text-petroleo-900' },
}
const color = (codigo: string) => colores[codigo[0]] ?? colores.J

type Descargas = { save: (r: { filename: string; data: Blob }) => Promise<unknown> }
type ClaudeVisor = { use?: (nombre: 'downloads') => Promise<Descargas | null> }

/** Contenido del archivo como Blob, también cuando viene incrustado como data: URI. */
async function comoBlob(href: string) {
  if (!href.startsWith('data:')) return (await fetch(href)).blob()
  const [cabecera, b64] = href.split(',')
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
  return new Blob([bytes], { type: cabecera.slice(5).split(';')[0] })
}

/**
 * Descarga directa del Word. En el visor de artefactos (donde los enlaces de descarga están bloqueados)
 * usa la capacidad «downloads», que pide confirmación al visitante; fuera de él, un enlace normal.
 */
function BotonDescarga({ href, nombre }: { href: string; nombre: string }) {
  const [estado, setEstado] = useState<string | null>(null)
  const clase = 'inline-flex items-center gap-2 rounded-full bg-lavanda-700 px-5 py-3 text-sm font-semibold text-white hover:bg-petroleo-900'
  if (import.meta.env.MODE !== 'artifact') {
    return (
      <a href={href} download={nombre} className={clase}>
        <Download className="size-4" aria-hidden /> Descargar ficha PICT-24
      </a>
    )
  }
  const descargar = async () => {
    setEstado(null)
    const descargas = await (window as unknown as { claude?: ClaudeVisor }).claude?.use?.('downloads')
    if (!descargas) return setEstado('La descarga no está disponible en esta vista.')
    try {
      await descargas.save({ filename: nombre, data: await comoBlob(href) })
      setEstado('Descarga iniciada.')
    } catch (e) {
      const codigo = (e as { code?: string }).code
      setEstado(codigo === 'declined' ? null : codigo === 'rate_limited' ? 'Ya hay una descarga pendiente de confirmar.' : 'No se pudo descargar el archivo en esta vista.')
    }
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button type="button" onClick={descargar} className={clase}>
        <Download className="size-4" aria-hidden /> Descargar ficha PICT-24
      </button>
      <span className="text-xs text-gris" aria-live="polite">{estado}</span>
    </span>
  )
}

/**
 * Explorador de una ficha de protocolo por rangos de edad.
 * Muestra los ítems tal como figuran en el documento; no registra respuestas ni calcula resultados.
 */
export function ExploradorProtocolo({ evidencia }: { evidencia: EvidenciaProtocolo }) {
  const [rango, setRango] = useState(0)
  const [area, setArea] = useState<string | null>(null)
  const [pagina, setPagina] = useState<EvidenciaImagen | null>(null)
  const pestanas = useRef<(HTMLButtonElement | null)[]>([])
  const n = evidencia.rangos.length
  const actual = evidencia.rangos[rango]
  const items = actual.items.filter((i) => !area || i.codigo.startsWith(area))
  const etiqueta = (r: string) => r.replace(/\s*MESES$/i, '')
  const id = evidencia.id

  const teclado = (e: KeyboardEvent, i: number) => {
    const destino = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key]
    if (destino === undefined) return
    e.preventDefault()
    setRango(destino)
    pestanas.current[destino]?.focus()
  }

  return (
    <div className="space-y-5">
      {/* 1. ¿Cómo elaboramos el PICT-24? */}
      <div className="rounded-3xl bg-petroleo-700 p-6 text-white sm:p-8">
        <p className="eyebrow text-petroleo-100">¿Cómo elaboramos el PICT-24?</p>
        <p className="mt-3 max-w-4xl text-lg leading-relaxed text-white/95">{evidencia.introduccion}</p>
      </div>

      {/* 2. Instrumentos de referencia */}
      <div className="rounded-3xl border border-linea bg-papel p-5 sm:p-6">
        <p className="eyebrow flex items-center gap-2 text-[0.68rem] text-petroleo-500">
          <BookMarked className="size-3.5" aria-hidden /> Instrumentos de referencia
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {evidencia.instrumentos.map((i) => (
            <li key={i.archivo} className="rounded-2xl bg-crema px-4 py-3 text-sm">
              <span className="block font-medium text-tinta">{i.nombre}</span>
              <span className="block text-xs text-gris">{i.archivo}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-gris">
          <Info className="mt-0.5 size-3.5 shrink-0 text-coral-700" aria-hidden />
          {evidencia.nota}
        </p>
      </div>

      {/* 3. Explorador por rangos de edad */}
      <div className="tarjeta overflow-hidden">
        <div className="border-b border-linea p-5 sm:p-7">
          <p className="eyebrow text-lavanda-700">{evidencia.subtitulo}</p>
          <p className="mt-1 text-sm text-gris">Selecciona un rango de edad para ver sus ítems y conductas.</p>

          {/* Línea de edad: ocho rangos de 0 a 24 meses */}
          <div role="tablist" aria-label="Rangos de edad" className="mt-6 grid grid-cols-4 gap-1.5 sm:grid-cols-8">
            {evidencia.rangos.map((r, i) => {
              const sel = i === rango
              return (
                <button
                  key={r.rango}
                  ref={(el) => {
                    pestanas.current[i] = el
                  }}
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={sel}
                  aria-controls={`${id}-panel`}
                  tabIndex={sel ? 0 : -1}
                  onClick={() => setRango(i)}
                  onKeyDown={(e) => teclado(e, i)}
                  className={`group relative rounded-2xl px-2 py-3 text-center transition ${sel ? 'bg-petroleo-900 text-white shadow-md' : 'bg-crema text-tinta hover:bg-petroleo-50'}`}
                >
                  <span className="block font-display text-lg leading-none tabular-nums">{etiqueta(r.rango)}</span>
                  <span className={`mt-1 block text-[0.65rem] tracking-widest uppercase ${sel ? 'text-white/70' : 'text-gris'}`}>meses</span>
                  <span aria-hidden className={`absolute inset-x-3 bottom-1.5 h-0.5 rounded-full ${sel ? 'bg-coral-400' : 'bg-transparent'}`} />
                </button>
              )
            })}
          </div>
          <div aria-hidden className="mt-2 hidden h-1 overflow-hidden rounded-full bg-crema sm:block">
            <motion.div className="h-full rounded-full bg-coral-500" animate={{ width: `${((rango + 1) / n) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>

        <div className="p-5 sm:p-7">
          {/* Filtro por letra de código */}
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtrar por área">
            <button type="button" aria-pressed={area === null} onClick={() => setArea(null)} className={`rounded-full px-3 py-1.5 text-sm transition ${area === null ? 'bg-tinta text-white' : 'bg-crema text-gris hover:text-tinta'}`}>
              Todas
            </button>
            {evidencia.areas.map((a) => {
              const c = colores[a.letra]
              const activo = area === a.letra
              return (
                <button
                  key={a.letra}
                  type="button"
                  aria-pressed={activo}
                  onClick={() => setArea(activo ? null : a.letra)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${activo ? `${c.fondo} text-white` : `${c.suave} ${c.texto} hover:opacity-80`}`}
                >
                  <span className="font-bold">{a.letra}</span>
                  {a.nombre && <span>{a.nombre}</span>}
                </button>
              )
            })}
          </div>

          <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${rango}`} className="mt-5">
            <p className="text-sm text-gris" aria-live="polite">
              <span className="font-semibold text-tinta">{actual.rango.toLowerCase()}</span> · {items.length} de {actual.items.length} ítems
            </p>
            <AnimatePresence mode="wait">
              <motion.ul key={`${rango}-${area}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className="mt-3 grid gap-3 md:grid-cols-2">
                {items.map((it) => {
                  const c = color(it.codigo)
                  return (
                    <li key={it.codigo} className={`group flex gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-md ${c.suave}`}>
                      <span className={`inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl px-2 font-display text-lg text-white ${c.fondo}`}>{it.codigo}</span>
                      <div className="min-w-0">
                        <p className="leading-snug font-medium text-petroleo-900">{it.conducta}</p>
                        {it.situacion && (
                          <p className="mt-2 text-sm text-gris">
                            <span className={`font-semibold ${c.texto}`}>Situación breve: </span>
                            {it.situacion}
                          </p>
                        )}
                      </div>
                    </li>
                  )
                })}
                {items.length === 0 && <li className="rounded-2xl border border-dashed border-linea p-5 text-sm text-gris md:col-span-2">Este rango no tiene ítems de esa área.</li>}
              </motion.ul>
            </AnimatePresence>
          </div>

          <details className="group mt-5 rounded-2xl bg-crema p-4 text-sm">
            <summary className="cursor-pointer font-semibold text-tinta">Cómo se registra cada ítem en la ficha</summary>
            <p className="mt-2 leading-relaxed text-gris">{evidencia.registro}</p>
          </details>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        {/* 4. Ficha original y descarga */}
        <div className="tarjeta p-5 sm:p-6 lg:col-span-8">
          <p className="flex items-center gap-2 font-semibold text-tinta">
            <FileText className="size-4 text-lavanda-700" aria-hidden /> Ficha original (Word)
          </p>
          <ol className="mt-4 grid grid-cols-4 gap-2">
            {evidencia.paginas.map((p, i) => (
              <li key={p.src}>
                <button
                  type="button"
                  onClick={() => setPagina({ tipo: 'imagen', id: `${id}-pag-${i}`, titulo: `${evidencia.titulo} · ${p.etiqueta}`, descripcion: '', autoria: 'Trabajo grupal', src: p.src, alt: p.alt })}
                  className="block w-full overflow-hidden rounded-xl bg-white ring-1 ring-linea transition hover:-translate-y-0.5 hover:ring-lavanda-300"
                  aria-label={`Ver ${p.etiqueta}`}
                >
                  <img src={p.src} alt="" className="aspect-[17/22] w-full object-cover object-top" loading="lazy" />
                  <span className="block py-1.5 text-center text-xs text-gris">{p.etiqueta}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <BotonDescarga href={evidencia.archivo.href} nombre={evidencia.archivo.descarga} />
            <span className="text-xs text-gris">{evidencia.archivo.nombre}</span>
          </div>
        </div>

        {/* 5. Integrantes */}
        <div className="rounded-3xl bg-lavanda-50 p-5 sm:p-6 lg:col-span-4">
          <p className="eyebrow flex items-center gap-2 text-[0.68rem] text-lavanda-700">
            <Users className="size-3.5" aria-hidden /> {evidencia.integrantes.titulo}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {evidencia.integrantes.nombres.map((nombre) => (
              <li key={nombre} className="rounded-full bg-white px-3 py-1.5 text-sm text-tinta">
                {nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {pagina && <VisorImagen evidencia={pagina} abierto cerrar={() => setPagina(null)} />}
    </div>
  )
}

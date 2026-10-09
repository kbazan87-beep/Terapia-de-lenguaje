import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ImageIcon, X } from 'lucide-react'
import type { BloqueTeoria, EvidenciaImagen, NodoMapa } from '../../../content/tipos'
import { VisorImagen } from '../evidencias/VisorImagen'

type Props = { mapa: Extract<BloqueTeoria, { tipo: 'mapa' }>['mapa']; original?: EvidenciaImagen }

/** Cadena de nodos desde la raíz hasta cada nodo, para leer la proposición completa. */
function rutas(raiz: NodoMapa, mapa = new Map<string, NodoMapa[]>(), camino: NodoMapa[] = []) {
  const actual = [...camino, raiz]
  mapa.set(raiz.id, actual)
  raiz.hijos?.forEach((h) => rutas(h, mapa, actual))
  return mapa
}

const contiene = (n: NodoMapa, id: string): boolean => n.id === id || !!n.hijos?.some((h) => contiene(h, id))

export function MapaConceptual({ mapa, original }: Props) {
  const indice = useMemo(() => {
    const m = rutas(mapa.raiz)
    rutas(mapa.sintesis, m)
    return m
  }, [mapa])
  const [sel, setSel] = useState<string | null>(null)
  const [verOriginal, setVerOriginal] = useState(false)
  const camino = sel ? indice.get(sel) ?? [] : []
  const enCamino = new Set(camino.map((n) => n.id))
  const actual = camino.at(-1)
  const alternar = (id: string) => setSel((v) => (v === id ? null : id))

  const estado = (n: NodoMapa) => {
    const activo = sel === n.id
    return {
      activo,
      clases: `${activo ? 'ring-2 ring-coral-500 ring-offset-2 ring-offset-crema' : enCamino.has(n.id) ? 'ring-1 ring-coral-400' : ''} ${sel && !enCamino.has(n.id) ? 'opacity-55' : ''}`,
    }
  }

  /** Nodo principal (raíz, rama o síntesis). */
  const nodo = (n: NodoMapa, variante: 'raiz' | 'rama' | 'hoja') => {
    const { activo, clases } = estado(n)
    const base = {
      raiz: 'bg-petroleo-900 text-white px-6 py-4 text-center',
      rama: 'bg-petroleo-700 text-white px-4 py-3',
      hoja: 'bg-papel text-tinta border border-linea px-4 py-3',
    }[variante]
    return (
      <button
        key={n.id}
        type="button"
        aria-pressed={activo}
        aria-controls="detalle-mapa"
        onClick={() => alternar(n.id)}
        className={`w-full rounded-2xl text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${base} ${clases}`}
      >
        <span className={`block leading-snug font-semibold ${variante === 'raiz' ? 'font-display text-xl sm:text-2xl' : variante === 'rama' ? 'font-display text-lg' : 'text-[0.95rem] text-petroleo-900'}`}>{n.titulo}</span>
        {n.resumen && <span className={`mt-1 block text-sm ${variante === 'hoja' ? 'text-gris' : 'text-white/75'}`}>{n.resumen}</span>}
      </button>
    )
  }

  /** Conceptos de tercer nivel: fichas compactas. */
  const ficha = (n: NodoMapa) => {
    const { activo, clases } = estado(n)
    return (
      <button
        key={n.id}
        type="button"
        aria-pressed={activo}
        aria-controls="detalle-mapa"
        onClick={() => alternar(n.id)}
        className={`min-w-0 rounded-xl px-3 py-2 text-left text-sm break-words hyphens-auto transition ${activo ? 'bg-coral-500 text-white' : 'bg-petroleo-50 text-petroleo-900 hover:bg-petroleo-100'} ${clases}`}
      >
        <span className="block font-medium">{n.titulo}</span>
        {n.resumen && <span className={`block text-xs ${activo ? 'text-white/85' : 'text-gris'}`}>{n.resumen}</span>}
      </button>
    )
  }

  const conector = (texto?: string) => (
    <div className="flex flex-col items-center py-1 text-xs font-medium text-gris italic" aria-hidden>
      <span className="h-2.5 w-px bg-petroleo-300" />
      <span>{texto}</span>
      <span className="h-2.5 w-px bg-petroleo-300" />
    </div>
  )

  const detalle = (raizRama: NodoMapa) =>
    actual && contiene(raizRama, actual.id) ? (
      <AnimatePresence mode="wait">
        <motion.div
          key={actual.id}
          id="detalle-mapa"
          role="region"
          aria-label={`Detalle: ${actual.titulo}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-3 rounded-2xl border border-coral-100 bg-white p-4 text-sm shadow-sm"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="leading-relaxed text-gris">
              {camino.map((n, i) => (
                <span key={n.id}>
                  {i > 0 && <em className="text-coral-700"> {n.relacion ?? '→'} </em>}
                  <span className={i === camino.length - 1 ? 'font-semibold text-petroleo-900' : ''}>{n.titulo}</span>
                </span>
              ))}
            </p>
            <button type="button" onClick={() => setSel(null)} className="-mt-1 -mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-gris hover:bg-crema" aria-label="Cerrar detalle">
              <X className="size-4" aria-hidden />
            </button>
          </div>
          {actual.detalle?.map((d) => <p key={d} className="mt-2 leading-relaxed text-tinta">{d}</p>)}
          {actual.lista && <ul className="mt-2 list-disc space-y-0.5 pl-5 text-tinta">{actual.lista.map((x) => <li key={x}>{x}</li>)}</ul>}
          {!actual.detalle && !actual.lista && actual.hijos && (
            <p className="mt-2 text-tinta">Incluye: {actual.hijos.map((h) => h.titulo).join(', ')}.</p>
          )}
          {actual.fuente && <p className="mt-3 text-xs text-gris">Fuente: {actual.fuente}</p>}
        </motion.div>
      </AnimatePresence>
    ) : null

  /** Rama completa: nodo, relación e hijos; los nietos se muestran como fichas. */
  const rama = (r: NodoMapa) => (
    <div key={r.id} className="flex min-w-0 flex-col rounded-3xl border border-dashed border-petroleo-100 bg-white/60 p-3">
      {ramasDistintas && conector(r.relacion)}
      {nodo(r, 'rama')}
      {r.compacto && r.hijos && (
        <>
          {conector(r.hijos[0].relacion)}
          <div className="grid grid-cols-2 gap-1.5 xl:grid-cols-1">{r.hijos.map(ficha)}</div>
        </>
      )}
      {!r.compacto && r.hijos?.map((h) => (
        <div key={h.id}>
          {conector(h.relacion)}
          {nodo(h, 'hoja')}
          {h.hijos && (
            <div className={`mt-2 grid grid-cols-2 gap-1.5 ${h.fichasEnColumna ? 'xl:grid-cols-1' : ''}`}>
              {h.hijos.map((n) =>
                n.hijos ? (
                  <div key={n.id} className="col-span-2">
                    {conector(n.relacion)}
                    {nodo(n, 'hoja')}
                    <div className="mt-2 grid gap-1.5">{n.hijos.map(ficha)}</div>
                  </div>
                ) : (
                  ficha(n)
                ),
              )}
            </div>
          )}
        </div>
      ))}
      {detalle(r)}
    </div>
  )

  const ramas = mapa.raiz.hijos ?? []
  // Si cada rama tiene su propio conector, se muestra sobre la rama y no en la raíz.
  const ramasDistintas = new Set(ramas.map((r) => r.relacion)).size > 1

  return (
    <div>
      <div className="mx-auto max-w-lg">
        {nodo(mapa.raiz, 'raiz')}
        {detalle({ ...mapa.raiz, hijos: [] })}
      </div>
      {conector(ramasDistintas ? undefined : ramas[0]?.relacion)}

      {/* Con dos ramas se usan dos columnas anchas; con más, hasta cuatro. */}
      <div className={`grid items-start gap-4 sm:grid-cols-2 ${ramas.length === 2 ? '' : 'xl:grid-cols-4'}`}>{ramas.map(rama)}</div>

      <div aria-hidden className="mx-auto mt-4 hidden h-6 w-3/4 rounded-b-3xl border-x border-b border-petroleo-300 xl:block" />
      <div aria-hidden className="mx-auto h-5 w-px bg-petroleo-300" />
      <div className="mx-auto max-w-xl">
        {nodo(mapa.sintesis, 'rama')}
        {detalle(mapa.sintesis)}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-3xl bg-petroleo-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gris">
          <span className="font-semibold text-petroleo-700">Cómo leerlo:</span> selecciona un concepto para ver su definición y la proposición que lo une al tema central. {mapa.nota}
        </p>
        {original && (
          <button type="button" onClick={() => setVerOriginal(true)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-petroleo-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-petroleo-900">
            <ImageIcon className="size-4" aria-hidden /> Ver mapa original
          </button>
        )}
      </div>

      {original && <VisorImagen evidencia={original} abierto={verOriginal} cerrar={() => setVerOriginal(false)} />}
    </div>
  )
}

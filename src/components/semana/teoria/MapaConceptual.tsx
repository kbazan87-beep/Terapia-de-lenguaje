import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ImageIcon, MousePointerClick } from 'lucide-react'
import type { Evidencia, NodoMapa, Semana } from '../../../content/tipos'
import { VisorImagen } from '../evidencias/VisorImagen'

type Props = { mapa: Semana['teoria']['mapa']; original?: Evidencia }

/** Construye la cadena de nodos desde la raíz hasta cada nodo. */
function rutas(raiz: NodoMapa, mapa = new Map<string, NodoMapa[]>(), camino: NodoMapa[] = []) {
  const actual = [...camino, raiz]
  mapa.set(raiz.id, actual)
  raiz.hijos?.forEach((h) => rutas(h, mapa, actual))
  return mapa
}

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

  const nodo = (n: NodoMapa, nivel: 'raiz' | 'rama' | 'hoja') => {
    const activo = sel === n.id
    const resaltado = enCamino.has(n.id)
    const atenuado = sel !== null && !resaltado
    const base =
      nivel === 'raiz'
        ? 'bg-petroleo-900 text-white px-6 py-4'
        : nivel === 'rama'
          ? 'bg-petroleo-700 text-white px-4 py-3'
          : 'bg-papel text-tinta border border-linea px-4 py-3'
    return (
      <button
        key={n.id}
        type="button"
        aria-pressed={activo}
        onClick={() => setSel(activo ? null : n.id)}
        className={`w-full rounded-2xl text-left transition duration-300 ${base} ${activo ? 'ring-2 ring-coral-500 ring-offset-2 ring-offset-crema' : resaltado ? 'ring-1 ring-coral-400' : ''} ${atenuado ? 'opacity-45' : 'hover:-translate-y-0.5 hover:shadow-md'}`}
      >
        {n.titulo && <span className={`block font-semibold leading-snug ${nivel === 'raiz' ? 'font-display text-xl sm:text-2xl text-center' : nivel === 'rama' ? 'font-display text-lg' : 'text-[0.95rem] text-petroleo-900'}`}>{n.titulo}</span>}
        {n.texto && <span className={`${n.titulo ? 'mt-1.5' : ''} block leading-relaxed ${n.titulo ? 'text-sm' : 'text-[0.95rem]'} ${nivel === 'hoja' ? (n.titulo ? 'text-gris' : 'text-tinta') : 'text-white/80'}`}>{n.texto}</span>}
        {n.lista && (
          <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm text-gris">
            {n.lista.map((x) => <li key={x}>{x}</li>)}
          </ul>
        )}
      </button>
    )
  }

  const conector = (texto?: string) => (
    <div className="flex flex-col items-center py-1.5 text-xs font-medium text-gris italic" aria-hidden>
      <span className="h-3 w-px bg-petroleo-300" />
      <span>{texto}</span>
      <span className="h-3 w-px bg-petroleo-300" />
    </div>
  )

  const ramas = mapa.raiz.hijos ?? []
  const anchoRama = (id: string) => (id === 'aps' ? 'lg:col-span-2' : 'lg:col-span-1')

  return (
    <div className="rounded-[2rem] bg-crema p-0 sm:p-2">
      <div className="mx-auto max-w-md">
        {nodo(mapa.raiz, 'raiz')}
      </div>
      {conector(ramas[0]?.relacion)}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {ramas.map((rama) => (
          <div key={rama.id} className={`rounded-3xl border border-dashed border-petroleo-100 bg-white/50 p-3 ${anchoRama(rama.id)}`}>
            {nodo(rama, 'rama')}
            {rama.hijos && conector(rama.hijos[0].relacion)}
            <div className={rama.id === 'conceptos-basicos' ? 'space-y-2' : ''}>
              {rama.hijos?.map((h) => (
                <div key={h.id}>
                  {nodo(h, 'hoja')}
                  {h.hijos && (
                    <>
                      {conector(h.hijos[0].relacion)}
                      <div className="grid gap-2 sm:grid-cols-2">
                        {h.hijos.map((c) => nodo(c, 'hoja'))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div aria-hidden className="mx-auto mt-4 hidden h-6 w-3/5 rounded-b-3xl border-x border-b border-petroleo-300 lg:block" />
      <div aria-hidden className="mx-auto h-5 w-px bg-petroleo-300" />
      <div className="mx-auto max-w-xl">
        {nodo(mapa.sintesis, 'rama')}
        {mapa.sintesis.hijos && (
          <>
            {conector(mapa.sintesis.hijos[0].relacion)}
            {nodo(mapa.sintesis.hijos[0], 'hoja')}
          </>
        )}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <div aria-live="polite" className="tarjeta p-5 lg:col-span-8">
          <p className="eyebrow mb-2 flex items-center gap-2 text-petroleo-500"><MousePointerClick className="size-4" aria-hidden />Lectura del mapa</p>
          <AnimatePresence mode="wait">
            <motion.p key={sel ?? 'vacio'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="leading-relaxed text-tinta">
              {camino.length > 0
                ? camino.map((n, i) => (
                    <span key={n.id}>
                      {i > 0 && <em className="text-coral-700"> {n.relacion} </em>}
                      <strong className="font-semibold text-petroleo-900">{n.titulo || `«${n.texto}»`}</strong>
                    </span>
                  ))
                : 'Selecciona cualquier concepto para leer la proposición que lo conecta con el tema central.'}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex flex-col justify-between gap-3 rounded-3xl bg-petroleo-50 p-5 lg:col-span-4">
          <p className="text-sm text-gris">{mapa.nota}</p>
          {original?.tipo === 'imagen' && (
            <button type="button" onClick={() => setVerOriginal(true)} className="inline-flex items-center justify-center gap-2 rounded-full bg-petroleo-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-petroleo-900">
              <ImageIcon className="size-4" aria-hidden /> Ver mapa original
            </button>
          )}
        </div>
      </div>

      {original?.tipo === 'imagen' && <VisorImagen evidencia={original} abierto={verOriginal} cerrar={() => setVerOriginal(false)} />}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useSeccionActiva } from '../../hooks/useSeccionActiva'

type ItemSemana = { id?: string; etiqueta: string; detalle: string }
export type EnlaceNav = { id: string; etiqueta: string } | { etiqueta: string; grupo: ItemSemana[] }

const esGrupo = (e: EnlaceNav): e is Extract<EnlaceNav, { grupo: ItemSemana[] }> => 'grupo' in e

export function Navegacion({ enlaces }: { enlaces: EnlaceNav[] }) {
  const [ids] = useState(() => enlaces.flatMap((e) => (esGrupo(e) ? e.grupo.flatMap((g) => (g.id ? [g.id] : [])) : [e.id])))
  const activa = useSeccionActiva(ids)
  const [abierto, setAbierto] = useState(false)
  const [desplegable, setDesplegable] = useState(false)
  const refDesplegable = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useEffect(() => {
    if (!abierto && !desplegable) return
    const tecla = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setAbierto(false)
      setDesplegable(false)
    }
    const fuera = (e: MouseEvent) => {
      if (refDesplegable.current && !refDesplegable.current.contains(e.target as Node)) setDesplegable(false)
    }
    window.addEventListener('keydown', tecla)
    document.addEventListener('mousedown', fuera)
    return () => {
      window.removeEventListener('keydown', tecla)
      document.removeEventListener('mousedown', fuera)
    }
  }, [abierto, desplegable])

  const cerrar = () => {
    setAbierto(false)
    setDesplegable(false)
  }

  const pastilla = (activo: boolean) =>
    `relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${activo ? 'text-white' : 'text-gris hover:text-petroleo-900'}`
  const fondoActivo = (activo: boolean) =>
    activo && <motion.span layoutId="nav-activa" className="absolute inset-0 -z-10 rounded-full bg-petroleo-700" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />

  /** Lista de semanas: enlaces para las disponibles y elementos inactivos para las próximas. */
  const listaSemanas = (grupo: ItemSemana[], movil: boolean) => (
    <ul className={movil ? 'grid grid-cols-1 gap-1' : 'max-h-[70vh] overflow-y-auto p-1.5'}>
      {grupo.map((g) => (
        <li key={g.etiqueta}>
          {g.id ? (
            <a
              href={`#${g.id}`}
              onClick={cerrar}
              aria-current={activa === g.id ? 'location' : undefined}
              className={`block rounded-xl px-3 py-2.5 ${activa === g.id ? 'bg-petroleo-700 text-white' : 'text-tinta hover:bg-salvia-50'}`}
            >
              <span className="block text-sm font-semibold">{g.etiqueta}</span>
              <span className={`block text-xs ${activa === g.id ? 'text-white/75' : 'text-gris'}`}>{g.detalle}</span>
            </a>
          ) : (
            <span aria-disabled="true" className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-gris/70">
              {g.etiqueta}
              <span className="rounded-full border border-dashed border-petroleo-300 px-2 py-0.5 text-[0.7rem]">{g.detalle}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      <a href="#contenido" className="sr-only rounded-full bg-petroleo-900 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3">
        Saltar al contenido
      </a>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[4.8rem] bg-gradient-to-b from-crema via-crema/85 to-crema/0" />
      <div className="contenedor relative pt-3">
        <nav aria-label="Secciones del portafolio" className="flex items-center justify-between gap-4 rounded-full border border-linea/80 bg-papel/85 py-2 pr-2 pl-5 shadow-[0_8px_30px_-12px_rgba(18,50,58,0.18)] backdrop-blur-md">
          <a href="#inicio" className="font-display text-lg font-semibold text-petroleo-900">
            Kimberli<span className="text-coral-500">.</span>
          </a>

          <div className="isolate hidden items-center gap-1 md:flex">
            {enlaces.map((e) => {
              if (!esGrupo(e)) {
                const activo = activa === e.id
                return (
                  <a key={e.id} href={`#${e.id}`} onClick={cerrar} aria-current={activo ? 'location' : undefined} className={pastilla(activo)}>
                    {fondoActivo(activo)}
                    {e.etiqueta}
                  </a>
                )
              }
              const activo = e.grupo.some((g) => g.id === activa)
              return (
                <div key={e.etiqueta} ref={refDesplegable} className="relative">
                  <button
                    type="button"
                    aria-expanded={desplegable}
                    aria-controls="menu-semanas"
                    onClick={() => setDesplegable((v) => !v)}
                    className={`${pastilla(activo)} inline-flex items-center gap-1`}
                  >
                    {fondoActivo(activo)}
                    {e.etiqueta}
                    <ChevronDown className={`size-4 transition-transform ${desplegable ? 'rotate-180' : ''}`} aria-hidden />
                  </button>
                  <AnimatePresence>
                    {desplegable && (
                      <motion.div
                        id="menu-semanas"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="tarjeta absolute top-full right-0 mt-3 w-80 shadow-xl"
                      >
                        <p className="eyebrow px-4 pt-3 text-[0.65rem] text-gris">{e.grupo.length} semanas del curso</p>
                        {listaSemanas(e.grupo, false)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-petroleo-900 hover:bg-salvia-50 md:hidden"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setAbierto((v) => !v)}
          >
            {abierto ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {abierto && (
          <div id="menu-movil" className="tarjeta mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto p-2 shadow-xl md:hidden">
            {enlaces.map((e) =>
              esGrupo(e) ? (
                <div key={e.etiqueta} className="my-1 rounded-2xl bg-crema p-2">
                  <p className="eyebrow px-2 pt-1 pb-2 text-[0.65rem] text-gris">{e.etiqueta}</p>
                  {listaSemanas(e.grupo, true)}
                </div>
              ) : (
                <a
                  key={e.id}
                  href={`#${e.id}`}
                  onClick={cerrar}
                  aria-current={activa === e.id ? 'location' : undefined}
                  className={`block rounded-2xl px-4 py-3 text-lg ${activa === e.id ? 'bg-petroleo-700 text-white' : 'text-tinta hover:bg-salvia-50'}`}
                >
                  {e.etiqueta}
                </a>
              ),
            )}
          </div>
        )}
      </div>
      <motion.div aria-hidden className="fixed top-0 left-0 h-[3px] w-full origin-left bg-coral-500" style={{ scaleX: progreso }} />
    </header>
  )
}

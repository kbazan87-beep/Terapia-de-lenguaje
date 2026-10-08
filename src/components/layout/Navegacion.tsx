import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useSeccionActiva } from '../../hooks/useSeccionActiva'

export type EnlaceNav = { id: string; etiqueta: string }

export function Navegacion({ enlaces }: { enlaces: EnlaceNav[] }) {
  const [ids] = useState(() => enlaces.map((e) => e.id))
  const activa = useSeccionActiva(ids)
  const [abierto, setAbierto] = useState(false)
  const { scrollYProgress } = useScroll()
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useEffect(() => {
    if (!abierto) return
    const cerrar = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', cerrar)
    return () => window.removeEventListener('keydown', cerrar)
  }, [abierto])

  const enlace = (e: EnlaceNav, movil = false) => {
    const esActiva = activa === e.id
    return (
      <a
        key={e.id}
        href={`#${e.id}`}
        onClick={() => setAbierto(false)}
        aria-current={esActiva ? 'location' : undefined}
        className={
          movil
            ? `block rounded-2xl px-4 py-3 text-lg ${esActiva ? 'bg-petroleo-700 text-white' : 'text-tinta hover:bg-salvia-50'}`
            : `relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${esActiva ? 'text-white' : 'text-gris hover:text-petroleo-900'}`
        }
      >
        {!movil && esActiva && (
          <motion.span layoutId="nav-activa" className="absolute inset-0 -z-10 rounded-full bg-petroleo-700" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
        )}
        {e.etiqueta}
      </a>
    )
  }

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
          <div className="isolate hidden items-center gap-1 md:flex">{enlaces.map((e) => enlace(e))}</div>
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
          <div id="menu-movil" className="tarjeta mt-2 p-2 shadow-xl md:hidden">
            {enlaces.map((e) => enlace(e, true))}
          </div>
        )}
      </div>
      <motion.div aria-hidden className="fixed top-0 left-0 h-[3px] w-full origin-left bg-coral-500" style={{ scaleX: progreso }} />
    </header>
  )
}

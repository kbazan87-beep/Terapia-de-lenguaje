import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BookOpen, BriefcaseBusiness, HeartPulse, Megaphone, Users, type LucideIcon } from 'lucide-react'
import type { BloqueDe } from './tipos'

// Un icono y un color por componente, en el orden de la matriz de la clase.
const estilos: { icono: LucideIcon; fondo: string; suave: string; texto: string }[] = [
  { icono: HeartPulse, fondo: 'bg-petroleo-700', suave: 'bg-petroleo-50', texto: 'text-petroleo-700' },
  { icono: BookOpen, fondo: 'bg-lavanda-700', suave: 'bg-lavanda-50', texto: 'text-lavanda-700' },
  { icono: BriefcaseBusiness, fondo: 'bg-salvia-700', suave: 'bg-salvia-50', texto: 'text-salvia-700' },
  { icono: Users, fondo: 'bg-coral-700', suave: 'bg-coral-50', texto: 'text-coral-700' },
  { icono: Megaphone, fondo: 'bg-petroleo-900', suave: 'bg-crema', texto: 'text-petroleo-900' },
]

/**
 * Matriz de la RBC: cinco componentes con cinco áreas cada uno.
 * Se puede enfocar un componente y marcar un área; la matriz completa siempre queda visible.
 */
export function MatrizRBC({ bloque }: { bloque: BloqueDe<'matriz'> }) {
  const [comp, setComp] = useState<number | null>(null)
  const [area, setArea] = useState<string | null>(null)
  const elegir = (i: number) => {
    setComp((v) => (v === i ? null : i))
    setArea(null)
  }
  const total = bloque.componentes.reduce((n, c) => n + c.areas.length, 0)

  return (
    <div className="tarjeta overflow-hidden">
      <div className="flex flex-col gap-2 border-b border-linea p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-sm text-gris">
          <span className="font-semibold text-petroleo-700">Lectura de referencia:</span> <em>{bloque.referencia}</em>
        </p>
        <p className="text-xs text-gris">
          {bloque.componentes.length} componentes · {total} áreas
        </p>
      </div>

      {/* Selector de componentes (también funciona como encabezado en pantallas grandes) */}
      <div className="grid grid-cols-5 gap-1.5 p-3 sm:gap-2 sm:p-5" role="group" aria-label="Componentes de la matriz">
        {bloque.componentes.map((c, i) => {
          const e = estilos[i]
          const Icono = e.icono
          const activo = comp === i
          const atenuado = comp !== null && !activo
          return (
            <button
              key={c.titulo}
              type="button"
              aria-pressed={activo}
              onClick={() => elegir(i)}
              className={`flex flex-col items-center gap-1.5 rounded-2xl px-1 py-3 text-white transition sm:flex-row sm:justify-center sm:gap-2 sm:rounded-full sm:px-3 ${e.fondo} ${atenuado ? 'opacity-35' : ''} ${activo ? 'ring-2 ring-coral-400 ring-offset-2 ring-offset-papel' : 'hover:opacity-90'}`}
            >
              <Icono className="size-4 shrink-0" aria-hidden />
              <span className="text-[0.62rem] font-bold tracking-wide uppercase sm:text-xs">{c.titulo}</span>
            </button>
          )
        })}
      </div>

      {/* Matriz completa: columnas en pantallas medianas y grandes */}
      <div className="hidden grid-cols-5 gap-2 px-5 pb-5 md:grid">
        {bloque.componentes.map((c, i) => {
          const e = estilos[i]
          const atenuado = comp !== null && comp !== i
          return (
            <ul key={c.titulo} className={`space-y-2 transition-opacity ${atenuado ? 'opacity-35' : ''}`} aria-label={`Áreas del componente ${c.titulo}`}>
              {c.areas.map((a) => {
                const clave = `${c.titulo}·${a}`
                const marcada = area === clave
                return (
                  <li key={a}>
                    <button
                      type="button"
                      aria-pressed={marcada}
                      onClick={() => {
                        setComp(i)
                        setArea(marcada ? null : clave)
                      }}
                      className={`flex min-h-16 w-full items-center justify-center rounded-xl px-2 py-3 text-center text-sm leading-snug transition ${marcada ? `${e.fondo} text-white shadow-md` : `${e.suave} text-tinta hover:-translate-y-0.5 hover:shadow-sm`}`}
                    >
                      {a}
                    </button>
                  </li>
                )
              })}
            </ul>
          )
        })}
      </div>

      {/* Vista móvil: el componente elegido (o el primero) con sus áreas */}
      <div className="px-3 pb-4 md:hidden">
        {(() => {
          const i = comp ?? 0
          const c = bloque.componentes[i]
          const e = estilos[i]
          return (
            <div className={`rounded-2xl p-4 ${e.suave}`}>
              <p className={`text-xs font-bold tracking-widest uppercase ${e.texto}`}>{c.titulo}</p>
              <ul className="mt-3 grid grid-cols-1 gap-2">
                {c.areas.map((a, k) => (
                  <li key={a} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 text-sm text-tinta">
                    <span className={`font-display text-xs ${e.texto}`}>{k + 1}</span>
                    {a}
                  </li>
                ))}
              </ul>
              {comp === null && <p className="mt-3 text-xs text-gris">Toca otro componente para ver sus áreas.</p>}
            </div>
          )
        })()}
      </div>

      <div className="border-t border-linea bg-crema/60 p-5 sm:p-6" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p key={`${comp}-${area}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm leading-relaxed text-tinta">
            {comp === null ? (
              bloque.nota
            ) : (
              <>
                <span className="font-semibold text-petroleo-900">Matriz de la RBC</span>
                <span className="text-coral-700"> → </span>
                <span className="font-semibold text-petroleo-900">{bloque.componentes[comp].titulo}</span>
                {area && (
                  <>
                    <span className="text-coral-700"> → </span>
                    <span className="font-semibold text-petroleo-900">{area.split('·')[1]}</span>
                  </>
                )}
                <span className="text-gris"> · áreas del componente: {bloque.componentes[comp].areas.join(', ')}.</span>
              </>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

import { MessageCircleQuestion } from 'lucide-react'
import { TarjetaImagen } from '../../evidencias/TarjetaImagen'
import type { BloqueDe } from './tipos'

/** Evidencia real de la clase teórica junto a la actividad con la que se vincula. */
export function EvidenciaClase({ bloque }: { bloque: BloqueDe<'evidencia'> }) {
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <div className="flex flex-col justify-between gap-6 rounded-3xl bg-petroleo-900 p-7 text-white lg:col-span-4">
        <MessageCircleQuestion className="size-8 text-coral-400" aria-hidden />
        <div>
          <p className="eyebrow text-petroleo-100">Recordamos</p>
          <p className="mt-3 font-display text-2xl leading-snug">{bloque.contexto.pregunta}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/80">{bloque.contexto.texto}</p>
        </div>
      </div>
      <div className="lg:col-span-8">
        <TarjetaImagen evidencia={bloque.evidencia} />
      </div>
    </div>
  )
}

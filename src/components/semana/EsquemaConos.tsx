import type { EvidenciaTabla } from '../../content/tipos'

const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

// Posición esquemática (no geográfica) de cada cono de Lima.
const zonas: Record<string, { etiqueta: string; x: number; y: number; color: string }> = {
  norte: { etiqueta: 'Norte', x: 160, y: 50, color: 'var(--color-petroleo-500)' },
  'lima centro': { etiqueta: 'Lima Centro', x: 82, y: 160, color: 'var(--color-lavanda-500)' },
  este: { etiqueta: 'Este', x: 250, y: 160, color: 'var(--color-salvia-500)' },
  sur: { etiqueta: 'Sur', x: 160, y: 262, color: 'var(--color-coral-500)' },
}

/** Infografía: cuántos registros del directorio corresponden a cada cono. Se calcula de la hoja, sin datos añadidos. */
export function EsquemaConos({ evidencia }: { evidencia: EvidenciaTabla }) {
  const col = evidencia.columnaGrupo ?? 0
  const conteo = new Map<string, number>()
  let sinCono = 0
  let mio = ''
  evidencia.filas.forEach((f) => {
    const v = f.celdas[col]?.trim()
    if (!v) return void sinCono++
    const k = normalizar(v)
    conteo.set(k, (conteo.get(k) ?? 0) + 1)
    if (f.destacada) mio = k
  })
  const max = Math.max(...conteo.values())

  return (
    <figure className="tarjeta grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
      <svg viewBox="0 0 320 330" className="mx-auto w-full max-w-sm lg:col-span-5" role="img" aria-label="Esquema de los conos de Lima con el número de registros del directorio en cada uno">
        <path d="M160 50 L82 160 L160 262 L250 160 Z M82 160 L250 160" fill="none" stroke="var(--color-linea)" strokeWidth="1.5" strokeDasharray="4 5" />
        {Object.entries(zonas).map(([k, z]) => {
          const n = conteo.get(k) ?? 0
          const r = 16 + (n / max) * 16
          const esMia = k === mio
          return (
            <g key={k}>
              <circle cx={z.x} cy={z.y} r={r + 8} fill={z.color} opacity="0.12" />
              <circle cx={z.x} cy={z.y} r={r} fill={z.color} stroke={esMia ? 'var(--color-tinta)' : 'none'} strokeWidth="2.5" />
              <text x={z.x} y={z.y + 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">{n}</text>
              <text x={z.x} y={z.y + r + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--color-tinta)">{z.etiqueta}</text>
            </g>
          )
        })}
      </svg>
      <figcaption className="lg:col-span-7">
        <p className="eyebrow text-salvia-700">El directorio en el territorio</p>
        <p className="mt-2 font-display text-2xl leading-snug text-petroleo-900">Registros por cono de Lima</p>
        <p className="mt-3 leading-relaxed text-gris">
          Cada círculo indica cuántos registros del directorio corresponden a ese cono. Mi aporte corresponde al cono {zonas[mio]?.etiqueta ?? '—'}, marcado con borde oscuro.
          {sinCono > 0 && ` ${sinCono} registro${sinCono > 1 ? 's' : ''} no indica${sinCono > 1 ? 'n' : ''} cono.`}
        </p>
        <p className="mt-3 text-xs text-gris">Esquema ilustrativo, no geográfico. Fuente: hoja «Lugares de atención».</p>
      </figcaption>
    </figure>
  )
}

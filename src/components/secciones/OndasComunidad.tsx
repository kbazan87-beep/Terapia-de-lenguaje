/**
 * Composición gráfica: una onda sonora que se convierte en una red de personas.
 * Decorativa (aria-hidden); la animación respeta «reducir movimiento».
 */
const barras = [10, 18, 30, 46, 62, 74, 58, 40, 66, 82, 70, 48, 34, 52, 72, 60, 38, 24, 14, 8]
const nodos = [
  { x: 262, y: 34, r: 7, c: 'var(--color-coral-500)' },
  { x: 300, y: 78, r: 5, c: 'var(--color-salvia-500)' },
  { x: 250, y: 112, r: 6, c: 'var(--color-lavanda-500)' },
  { x: 318, y: 138, r: 4.5, c: 'var(--color-petroleo-500)' },
  { x: 290, y: 168, r: 6, c: 'var(--color-salvia-500)' },
]
const enlaces: [number, number][] = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [0, 2]]

export function OndasComunidad() {
  return (
    <svg aria-hidden viewBox="0 0 340 200" className="my-6 h-auto w-full">
      <line x1="0" y1="100" x2="230" y2="100" stroke="var(--color-linea)" strokeWidth="1" />
      {barras.map((h, i) => (
        <rect
          key={i}
          className="barra-onda"
          style={{ animationDelay: `${i * 0.12}s`, transformBox: 'fill-box' }}
          x={6 + i * 11}
          y={100 - h / 2}
          width="5"
          height={h}
          rx="2.5"
          fill={i % 5 === 2 ? 'var(--color-coral-400)' : i % 2 ? 'var(--color-petroleo-300)' : 'var(--color-petroleo-500)'}
        />
      ))}
      <path d="M226 100 C 240 100, 244 60, 262 34 M226 100 C 236 104, 240 110, 250 112 M226 100 C 250 120, 270 160, 290 168" fill="none" stroke="var(--color-petroleo-300)" strokeWidth="1.2" strokeDasharray="3 4" />
      {enlaces.map(([a, b], i) => (
        <line key={i} x1={nodos[a].x} y1={nodos[a].y} x2={nodos[b].x} y2={nodos[b].y} stroke="var(--color-lavanda-300)" strokeWidth="1.2" />
      ))}
      {nodos.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 6} fill={n.c} opacity="0.14" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} />
        </g>
      ))}
    </svg>
  )
}

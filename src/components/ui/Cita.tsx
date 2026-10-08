import type { Fragmento } from '../../content/tipos'

export function TextoConFormato({ fragmentos }: { fragmentos: Fragmento[] }) {
  return (
    <>
      {fragmentos.map((f, i) => (f.cursiva ? <em key={i}>{f.texto}</em> : <span key={i}>{f.texto}</span>))}
    </>
  )
}

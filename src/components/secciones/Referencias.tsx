import type { Referencia, Semana } from '../../content/tipos'
import { TextoConFormato } from '../ui/Cita'
import { EncabezadoSeccion } from '../ui/EncabezadoSeccion'
import { Revelar } from '../ui/Revelar'

/** Reúne las referencias de todas las semanas, sin duplicados, en el orden de los documentos. */
export function Referencias({ semanas, indice }: { semanas: Semana[]; indice: string }) {
  const unicas = new Map<string, Referencia>()
  semanas.flatMap((s) => s.referencias).forEach((r) => !unicas.has(r.id) && unicas.set(r.id, r))
  const lista = [...unicas.values()]

  return (
    <section id="referencias" aria-labelledby="titulo-referencias" className="bg-papel py-20 md:py-28">
      <div className="contenedor">
        <EncabezadoSeccion id="titulo-referencias" indice={indice} antetitulo="Referencias" titulo="Fuentes consultadas">
          Referencias en formato APA 7, tal como figuran en mis documentos del curso.
        </EncabezadoSeccion>
        <ol className="divide-y divide-linea border-y border-linea">
          {lista.map((r, i) => (
            <Revelar as="li" key={r.id} retraso={i * 0.05} className="grid gap-2 py-6 sm:grid-cols-[4rem_1fr]">
              <span className="font-display text-coral-700">{String(i + 1).padStart(2, '0')}</span>
              <p className="pl-8 -indent-8 text-lg leading-relaxed text-tinta">
                <TextoConFormato fragmentos={r.fragmentos} />
              </p>
            </Revelar>
          ))}
        </ol>
      </div>
    </section>
  )
}

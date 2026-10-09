import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, BookMarked, Eye, FileText, Users } from 'lucide-react'
import type { EvidenciaRevision, ParRevision } from '../../../content/tipos'
import { VisorDocumento } from './VisorDocumento'
import { BotonDescarga } from './ExploradorProtocolo'

const textoOriginal = (o: NonNullable<ParRevision['original']>) => o.conducta + (o.situacion ? ` (${o.situacion})` : '')

/** Diferencia palabra por palabra (subsecuencia común más larga) entre dos textos breves. */
function diferencias(a: string, b: string) {
  const x = a.split(/\s+/)
  const y = b.split(/\s+/)
  const t = Array.from({ length: x.length + 1 }, () => new Array<number>(y.length + 1).fill(0))
  for (let i = x.length - 1; i >= 0; i--) for (let j = y.length - 1; j >= 0; j--) t[i][j] = x[i] === y[j] ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1])
  const antes: { p: string; cambia: boolean }[] = []
  const despues: { p: string; cambia: boolean }[] = []
  let i = 0
  let j = 0
  while (i < x.length || j < y.length) {
    if (i < x.length && j < y.length && x[i] === y[j]) {
      antes.push({ p: x[i++], cambia: false })
      despues.push({ p: y[j++], cambia: false })
    } else if (j < y.length && (i === x.length || t[i][j + 1] >= t[i + 1][j])) despues.push({ p: y[j++], cambia: true })
    else antes.push({ p: x[i++], cambia: true })
  }
  return { antes, despues }
}

function Resaltado({ partes, tipo }: { partes: { p: string; cambia: boolean }[]; tipo: 'antes' | 'despues' }) {
  return (
    <>
      {partes.map((w, k) => (
        <span key={k}>
          {k > 0 && ' '}
          {w.cambia ? (
            tipo === 'antes' ? (
              <del className="rounded bg-coral-50 px-0.5 text-coral-700 decoration-coral-400">{w.p}</del>
            ) : (
              <ins className="rounded bg-salvia-100 px-0.5 text-salvia-700 no-underline">{w.p}</ins>
            )
          ) : (
            w.p
          )}
        </span>
      ))}
    </>
  )
}

/** Comparación entre la propuesta inicial (semana 5) y la versión revisada (semana 7), con ejemplos de adaptaciones lingüísticas. */
export function ComparacionTamizaje({ evidencia }: { evidencia: EvidenciaRevision }) {
  const [documento, setDocumento] = useState<number | null>(null)
  const [verReferencia, setVerReferencia] = useState(false)
  const porCodigo = useMemo(() => new Map(evidencia.rangos.flatMap((r) => r.pares).filter((p) => p.original).map((p) => [p.original!.codigo, p])), [evidencia])

  return (
    <div className="space-y-8">
      {/* Semana 5 → Semana 7 */}
      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
        {evidencia.versiones.map((v, i) => (
          <div key={v.semana} className={`flex flex-col justify-between gap-4 rounded-3xl p-6 ${i === 0 ? 'tarjeta' : 'bg-petroleo-700 text-white'} ${i === 1 ? 'md:order-3' : ''}`}>
            <div>
              <p className={`eyebrow ${i === 0 ? 'text-coral-700' : 'text-coral-100'}`}>
                {v.semana} · {v.etapa}
              </p>
              <p className={`mt-1 flex items-center gap-2 font-display text-xl ${i === 0 ? 'text-petroleo-900' : ''}`}>
                <FileText className="size-5 shrink-0" aria-hidden /> {v.nombre}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setDocumento(i)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${i === 0 ? 'bg-petroleo-50 text-petroleo-900 hover:bg-petroleo-100' : 'bg-white text-petroleo-900 hover:bg-coral-50'}`}
              >
                <Eye className="size-4" aria-hidden /> Ver documento
              </button>
              {i === 1 && <BotonDescarga href={evidencia.archivo.href} nombre={evidencia.archivo.nombre} etiqueta="Descargar versión revisada" />}
            </div>
          </div>
        ))}
        <div aria-hidden className="flex items-center justify-center text-petroleo-300 md:order-2">
          <ArrowDown className="size-6 md:hidden" />
          <ArrowRight className="hidden size-6 md:block" />
        </div>
      </div>

      {/* Adaptaciones lingüísticas */}
      <div>
        <h5 className="eyebrow text-gris">Adaptaciones lingüísticas</h5>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {evidencia.adaptaciones.map((a) => (
            <div key={a.id} className="tarjeta p-5">
              <p className="font-semibold text-petroleo-900">{a.titulo}</p>
              <p className="mt-1 text-sm text-gris">{a.descripcion}</p>
              <ul className="mt-3 space-y-2">
                {a.ejemplos.map((codigo) => {
                  const p = porCodigo.get(codigo)
                  if (!p?.original || !p.revisado) return null
                  const d = diferencias(textoOriginal(p.original), p.revisado)
                  return (
                    <li key={codigo} className="rounded-xl bg-crema p-3 text-sm leading-relaxed">
                      <p className="text-gris">
                        <span className="mr-1.5 text-xs font-bold text-petroleo-700">{codigo}</span>
                        <Resaltado partes={d.antes} tipo="antes" />
                      </p>
                      <p className="mt-1 text-tinta">
                        <ArrowRight className="mr-1 inline size-3.5 text-petroleo-300" aria-label="ahora:" />
                        <Resaltado partes={d.despues} tipo="despues" />
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Referencia e integrantes */}
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="tarjeta flex flex-col justify-between gap-4 p-5 lg:col-span-5">
          <div>
            <p className="eyebrow flex items-center gap-2 text-lavanda-700">
              <BookMarked className="size-4" aria-hidden /> Instrumento de referencia
            </p>
            <p className="mt-1 font-semibold text-petroleo-900">{evidencia.referencia.nombre}</p>
          </div>
          <button type="button" onClick={() => setVerReferencia(true)} className="inline-flex items-center gap-2 self-start rounded-full bg-lavanda-50 px-4 py-2.5 text-sm font-semibold text-lavanda-700 hover:bg-lavanda-100">
            <Eye className="size-4" aria-hidden /> Ver cuestionario
          </button>
        </div>
        <div className="flex flex-col justify-center gap-3 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl bg-crema px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-petroleo-900">
              <Users className="size-4 text-lavanda-700" aria-hidden /> {evidencia.integrantes.titulo}:
            </p>
            <ul className="flex flex-wrap gap-2">
              {evidencia.integrantes.nombres.map((nombre) => (
                <li key={nombre} className="rounded-full bg-white px-3 py-1 text-sm text-tinta">{nombre}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Los visores se montan solo al abrirlos (su <dialog> usa display: flex). */}
      {documento !== null && (
        <VisorDocumento
          titulo={evidencia.versiones[documento].nombre}
          subtitulo={`${evidencia.versiones[documento].semana} · ${evidencia.versiones[documento].etapa}`}
          paginas={evidencia.versiones[documento].paginas}
          abierto
          cerrar={() => setDocumento(null)}
        />
      )}
      {verReferencia && <VisorDocumento titulo={evidencia.referencia.nombre} subtitulo={evidencia.referencia.archivo} paginas={evidencia.referencia.paginas} abierto cerrar={() => setVerReferencia(false)} />}
    </div>
  )
}

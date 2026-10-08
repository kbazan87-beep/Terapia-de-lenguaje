import { useId, useMemo, useState } from 'react'
import { Download, LayoutGrid, Search, Star, Table2 } from 'lucide-react'
import type { EvidenciaTabla } from '../../../content/tipos'

const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()
const SIN_GRUPO = 'Sin registro'

function Celda({ valor }: { valor: string | null }) {
  const v = valor?.trim()
  if (!v) return <span className="text-gris/60" aria-label="Sin dato">—</span>
  return <span className="whitespace-pre-line">{v}</span>
}

/**
 * Tabla de evidencia con búsqueda, filtros y dos vistas (tabla / tarjetas).
 * Los filtros solo ocultan filas: nunca se modifican los valores originales.
 */
export function TablaEvidencia({ evidencia }: { evidencia: EvidenciaTabla }) {
  const uid = useId()
  const { columnas, filas, columnaGrupo, columnaParticipante, columnaTitulo } = evidencia
  const [consulta, setConsulta] = useState('')
  const [grupo, setGrupo] = useState<string>('Todos')
  const [soloMia, setSoloMia] = useState(false)
  const [columna, setColumna] = useState<number | 'todas'>('todas')
  const [vista, setVista] = useState<'tabla' | 'tarjetas'>(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches ? 'tabla' : 'tarjetas',
  )

  const grupoDe = (i: number) => {
    if (columnaGrupo === undefined) return ''
    const v = filas[i].celdas[columnaGrupo]?.trim() || filas[i].grupoFiltro
    return v ? normalizar(v) : normalizar(SIN_GRUPO)
  }

  const grupos = useMemo(() => {
    if (columnaGrupo === undefined) return []
    const etiquetas = new Map<string, string>()
    filas.forEach((f, i) => {
      const clave = grupoDe(i)
      const etiqueta = (f.celdas[columnaGrupo]?.trim() || f.grupoFiltro || SIN_GRUPO).replace(/\b\p{L}/gu, (l) => l.toUpperCase())
      if (!etiquetas.has(clave)) etiquetas.set(clave, etiqueta)
    })
    return [...etiquetas.entries()].map(([clave, etiqueta]) => ({ clave, etiqueta, total: filas.filter((_, i) => grupoDe(i) === clave).length }))
  }, [filas, columnaGrupo])

  const principales = columnas.map((c, i) => ({ ...c, i })).filter((c) => !c.secundaria)
  const seleccionables = principales.filter((c) => c.i !== columnaParticipante && c.i !== columnaGrupo)
  const visibles = columna === 'todas' ? columnas.map((c, i) => ({ ...c, i })) : principales.filter((c) => c.i === columnaGrupo || c.i === columna || c.i === columnaParticipante)

  const q = normalizar(consulta)
  const resultado = filas
    .map((f, i) => ({ f, i }))
    .filter(({ f, i }) => (!soloMia || f.destacada) && (grupo === 'Todos' || grupoDe(i) === grupo))
    .filter(({ f }) => !q || f.celdas.some((c) => c && normalizar(c).includes(q)))

  const notas = resultado.filter(({ f }) => f.nota)

  return (
    <div>
      {/* Controles */}
      <div className="flex flex-col gap-3 rounded-3xl border border-linea bg-papel p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Buscar en {evidencia.titulo}</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gris" aria-hidden />
            <input
              type="search"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Buscar institución, distrito, prueba o participante…"
              className="w-full rounded-full border border-linea bg-white py-2.5 pr-4 pl-11 text-sm outline-none placeholder:text-gris/70 focus:border-lavanda-500 focus:ring-2 focus:ring-lavanda-100"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-pressed={soloMia}
              onClick={() => setSoloMia((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${soloMia ? 'bg-coral-500 text-white' : 'bg-coral-50 text-coral-700 hover:bg-coral-100'}`}
            >
              <Star className="size-4" aria-hidden /> Solo mi aporte
            </button>
            <div className="inline-flex rounded-full bg-crema p-1 ring-1 ring-linea" role="group" aria-label="Tipo de vista">
              {(['tabla', 'tarjetas'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={vista === v}
                  onClick={() => setVista(v)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${vista === v ? 'bg-white text-tinta shadow-sm' : 'text-gris'}`}
                >
                  {v === 'tabla' ? <Table2 className="size-4" aria-hidden /> : <LayoutGrid className="size-4" aria-hidden />}
                  {v === 'tabla' ? 'Tabla' : 'Tarjetas'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {grupos.length > 0 && (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Filtrar por ${columnas[columnaGrupo!].etiqueta.replace(':', '').toLowerCase()}`}>
              {[{ clave: 'Todos', etiqueta: 'Todos', total: filas.length }, ...grupos].map((g) => (
                <button
                  key={g.clave}
                  type="button"
                  aria-pressed={grupo === g.clave}
                  onClick={() => setGrupo(g.clave)}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${grupo === g.clave ? 'bg-lavanda-700 text-white' : 'bg-lavanda-50 text-lavanda-700 hover:bg-lavanda-100'}`}
                >
                  {g.etiqueta} <span className="opacity-70">({g.total})</span>
                </button>
              ))}
            </div>
          )}
          {seleccionables.length > 3 && (
            <label className="flex items-center gap-2 text-sm text-gris">
              <span className="shrink-0">Mostrar:</span>
              <select
                value={columna}
                onChange={(e) => setColumna(e.target.value === 'todas' ? 'todas' : Number(e.target.value))}
                className="w-full min-w-0 rounded-full border border-linea bg-white px-3 py-2 text-sm text-tinta lg:w-72"
              >
                <option value="todas">Todas las columnas</option>
                {seleccionables.map((c) => (
                  <option key={c.i} value={c.i}>{c.etiqueta}</option>
                ))}
              </select>
            </label>
          )}
        </div>
        <p className="text-xs text-gris" aria-live="polite">
          Mostrando {resultado.length} de {filas.length} filas · Fuente: {evidencia.fuente}
        </p>
      </div>

      {/* Resultados */}
      {resultado.length === 0 ? (
        <p className="mt-6 rounded-3xl border border-dashed border-linea p-8 text-center text-gris">No hay filas que coincidan con la búsqueda.</p>
      ) : vista === 'tabla' ? (
        <div className="mt-4 max-h-[75vh] overflow-auto rounded-3xl border border-linea bg-white" tabIndex={0} role="region" aria-labelledby={`${uid}-cap`}>
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
            <caption id={`${uid}-cap`} className="sr-only">{evidencia.titulo}</caption>
            <thead className="sticky top-0 z-10 bg-lavanda-50 align-bottom text-xs text-lavanda-700 shadow-[0_1px_0_var(--color-linea)]">
              <tr>
                {visibles.map((c) => (
                  <th key={c.i} scope="col" className={`px-3 py-3 font-semibold ${c.secundaria ? 'text-gris' : ''}`}>
                    <span className="block min-w-[7rem]">{c.etiqueta}</span>
                    {c.nota && <span className="mt-1 block font-normal text-gris">{c.nota}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultado.map(({ f, i }) => (
                <tr key={i} className={`border-t border-linea align-top ${f.destacada ? 'bg-coral-50 shadow-[inset_4px_0_0_var(--color-coral-500)]' : 'hover:bg-crema'}`}>
                  {visibles.map((c) => {
                    const Tag = c.i === columnaParticipante ? 'th' : 'td'
                    return (
                      <Tag key={c.i} scope={Tag === 'th' ? 'row' : undefined} className={`px-3 py-3 leading-relaxed ${Tag === 'th' ? 'font-semibold text-tinta' : 'text-tinta'} ${c.secundaria ? 'text-gris' : ''}`}>
                        <Celda valor={f.celdas[c.i]} />
                        {Tag === 'th' && f.destacada && <span className="mt-1 block w-fit rounded-full bg-coral-500 px-2 py-0.5 text-[0.7rem] font-semibold text-white">Mi aporte</span>}
                        {c.i === columnaGrupo && f.nota && !f.celdas[c.i]?.trim() && <sup className="ml-0.5 text-coral-700">*</sup>}
                      </Tag>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {resultado.map(({ f, i }) => (
            <li key={i} className={`rounded-3xl border p-5 ${f.destacada ? 'border-coral-400 bg-coral-50 ring-2 ring-coral-100' : 'border-linea bg-papel'}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display text-lg font-semibold text-petroleo-900"><Celda valor={f.celdas[columnaTitulo]} /></p>
                  {columnaGrupo !== undefined && (
                    <p className="text-sm text-gris">
                      {columnas[columnaGrupo].etiqueta.replace(/\s*:\s*$/, '')}: <Celda valor={f.celdas[columnaGrupo]} />
                      {f.nota && !f.celdas[columnaGrupo]?.trim() && <sup className="ml-0.5 text-coral-700">*</sup>}
                    </p>
                  )}
                </div>
                {f.destacada && <span className="rounded-full bg-coral-500 px-2.5 py-1 text-xs font-semibold text-white">Mi aporte</span>}
              </div>
              <dl className="mt-4 space-y-3">
                {visibles
                  .filter((c) => c.i !== columnaTitulo && c.i !== columnaGrupo && !c.secundaria)
                  .map((c) => (
                    <div key={c.i}>
                      <dt className="text-xs font-semibold tracking-wide text-lavanda-700 uppercase">{c.etiqueta}</dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-tinta"><Celda valor={f.celdas[c.i]} /></dd>
                    </div>
                  ))}
              </dl>
              {columna === 'todas' && columnas.some((c, ci) => c.secundaria && f.celdas[ci]?.trim()) && (
                <p className="mt-4 border-t border-linea pt-3 text-xs text-gris">
                  {columnas.map((c, ci) => (c.secundaria && f.celdas[ci]?.trim() ? `${c.etiqueta}: ${f.celdas[ci]!.trim()}` : null)).filter(Boolean).join(' · ')}
                </p>
              )}
              {f.nota && <p className="mt-3 text-xs text-coral-700">* {f.nota}</p>}
            </li>
          ))}
        </ul>
      )}

      {vista === 'tabla' && notas.length > 0 && (
        <p className="mt-3 text-xs text-coral-700">* {notas[0].f.nota}</p>
      )}

      {evidencia.archivo && (
        <a href={evidencia.archivo.href} download={evidencia.archivo.nombre} className="mt-4 inline-flex items-center gap-2 rounded-full border border-lavanda-300 bg-white px-4 py-2 text-sm font-semibold text-lavanda-700 hover:bg-lavanda-50">
          <Download className="size-4" aria-hidden /> Descargar Excel ({evidencia.archivo.nombre})
        </a>
      )}
    </div>
  )
}

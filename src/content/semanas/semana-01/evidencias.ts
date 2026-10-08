import type { ColumnaTabla, Evidencia, FilaTabla } from '../../tipos'
import lugares from './lugares.json'
import instrumentos from './instrumentos.json'
import mapaOriginal from '../../../assets/mapa-conceptual-semana-1-original.jpg'
import excel from '../../../assets/evidencias-semana-1.xlsx?url'

type Celdas = (string | null)[]

const PARTICIPANTE = 'Kimberli Cardozo'
const esMia = (v: string | null) => v?.trim() === PARTICIPANTE
// En la versión publicada como artefacto las descargas están bloqueadas por el visor.
const archivo = import.meta.env.MODE === 'artifact' ? undefined : { href: excel, nombre: 'Evidencias_semana_1.xlsx' }

const letra = (i: number) => String.fromCharCode(65 + i)
const sinEncabezado = (i: number) => `Columna ${letra(i)} (sin encabezado)`
const ancho = (filas: Celdas[]) => Math.max(...filas.map((f) => f.length))
const completar = (f: Celdas, n: number): Celdas => [...f, ...Array(Math.max(0, n - f.length)).fill(null)]

/* ── Hoja «Lugares de atención» ─────────────────────────────────────────────
   Fila 1: indicaciones sobre los encabezados. Fila 2: categorías. Desde la fila 3: registros. */
const [notasLugares, encabezadosLugares, ...registrosLugares] = lugares as Celdas[]
const anchoLugares = ancho(lugares as Celdas[])

const columnasLugares: ColumnaTabla[] = completar(encabezadosLugares, anchoLugares).map((etiqueta, i) => ({
  etiqueta: etiqueta?.trim() || sinEncabezado(i),
  nota: notasLugares[i]?.trim() || undefined,
  secundaria: i >= 12,
}))

const filasLugares: FilaTabla[] = registrosLugares.map((celdas) => {
  const fila: FilaTabla = { celdas: completar(celdas, anchoLugares) }
  if (esMia(celdas[11])) {
    fila.destacada = true
    fila.nota = 'La celda «Cono» está vacía en el original; el archivo actualizado identifica este aporte como zona Sur.'
    fila.grupoFiltro = 'Sur'
  }
  return fila
})

/* ── Hoja «Instrumentos» ─────────────────────────────────────────────────── */
const [encabezadosInstrumentos, ...registrosInstrumentos] = instrumentos as Celdas[]
const anchoInstrumentos = ancho(instrumentos as Celdas[])

const columnasInstrumentos: ColumnaTabla[] = completar(encabezadosInstrumentos, anchoInstrumentos).map((etiqueta, i) => ({
  etiqueta: etiqueta?.trim().replace(/\s{2,}/g, ' · ') || sinEncabezado(i),
  secundaria: i >= 9,
}))

const filasInstrumentos: FilaTabla[] = registrosInstrumentos.map((celdas) => ({
  celdas: completar(celdas, anchoInstrumentos),
  destacada: esMia(celdas[8]),
}))

export const evidenciasSemana01: { teoria: Evidencia[]; practica: Evidencia[] } = {
  teoria: [
    {
      tipo: 'imagen',
      id: 'mapa-original',
      titulo: 'Mapa conceptual de la clase teórica',
      descripcion: 'Síntesis visual de la clase 1: conceptos básicos, APS, sistema y niveles de atención, discapacidad en la comunidad y rol del terapeuta de lenguaje.',
      autoria: 'Elaboración propia',
      src: mapaOriginal,
      alt: 'Mapa conceptual «Terapia de Lenguaje en Atención Comunitaria», que se sustenta en conceptos básicos, Atención Primaria de Salud, sistema y niveles de atención y la discapacidad en la comunidad, y que converge en el rol del terapeuta de lenguaje en la APS.',
    },
    {
      tipo: 'tabla',
      id: 'instrumentos',
      titulo: 'Hoja «Instrumentos»',
      descripcion: 'Registro colectivo de instrumentos de evaluación vinculado a la clase teórica. Mi aporte corresponde al Test de Boston.',
      fuente: 'Excel de evidencias de la semana 1, pestaña «Instrumentos».',
      columnas: columnasInstrumentos,
      filas: filasInstrumentos,
      columnaTitulo: 0,
      columnaParticipante: 8,
      archivo,
    },
  ],
  practica: [
    {
      tipo: 'tabla',
      id: 'lugares',
      titulo: 'Hoja «Lugares de atención»',
      descripcion: 'Directorio colectivo de lugares de derivación por cono de Lima. Se conservan todas las filas y los nombres de las participantes, con su autorización.',
      fuente: 'Excel de evidencias de la semana 1 (versión actualizada, sin sombreados rojos), pestaña «Lugares de atención».',
      columnas: columnasLugares,
      filas: filasLugares,
      columnaTitulo: 11,
      columnaParticipante: 11,
      columnaGrupo: 0,
      archivo,
    },
  ],
}

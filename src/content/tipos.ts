/**
 * Modelo de datos del portafolio.
 * Cada semana se describe con la misma estructura, de modo que una semana nueva
 * solo requiere un archivo de contenido en `semanas/` y su registro en `semanas/index.ts`.
 */

/** Fragmento de texto; `cursiva` reproduce el formato del documento original (p. ej., APA 7). */
export type Fragmento = { texto: string; cursiva?: boolean }

export type Referencia = { id: string; fragmentos: Fragmento[] }

export type Concepto = {
  id: string
  titulo: string
  sintesis: string
  /** Texto completo, tal como figura en la ficha de teoría. */
  desarrollo: string
  cita: string
}

export type NivelAtencion = {
  id: string
  etiqueta: string
  titulo: string
  descripcion: string
}

/** Nodo del mapa conceptual. `relacion` es el conector que lo une con su nodo padre. */
export type NodoMapa = {
  id: string
  titulo: string
  texto?: string
  lista?: string[]
  relacion?: string
  hijos?: NodoMapa[]
}

export type FuncionRol = {
  id: string
  verbo: string
  descripcion: string
  /** Actores o ámbitos con los que se vincula esta función. */
  vinculos: string[]
}

export type ColumnaTabla = {
  etiqueta: string
  /** Indicación que acompañaba al encabezado en el archivo original. */
  nota?: string
  /** Columna visible solo en la vista de detalle (p. ej., columnas sin encabezado). */
  secundaria?: boolean
}

export type FilaTabla = {
  /** Valores tal como se extrajeron del Excel; no se alteran. */
  celdas: (string | null)[]
  destacada?: boolean
  /** Aclaración editorial mostrada junto a la fila (no modifica las celdas). */
  nota?: string
  /** Valor usado solo para el filtro por grupo cuando la celda está vacía. */
  grupoFiltro?: string
}

export type EvidenciaImagen = {
  tipo: 'imagen'
  id: string
  titulo: string
  descripcion: string
  autoria: string
  src: string
  alt: string
}

export type EvidenciaTabla = {
  tipo: 'tabla'
  id: string
  titulo: string
  descripcion: string
  fuente: string
  columnas: ColumnaTabla[]
  filas: FilaTabla[]
  /** Columna que identifica a cada fila en la vista de tarjetas. */
  columnaTitulo: number
  /** Columna que identifica a la participante. */
  columnaParticipante: number
  /** Columna usada para los filtros rápidos (p. ej., cono de Lima). */
  columnaGrupo?: number
  /** Archivo descargable (Excel limpio, sin sombreados rojos). */
  archivo?: { href: string; nombre: string }
}

export type Evidencia = EvidenciaImagen | EvidenciaTabla

export type Semana = {
  numero: number
  slug: string
  titulo: string
  sesiones: { tipo: 'Teoría' | 'Práctica'; fecha: string; fechaISO: string }[]
  teoria: {
    titulo: string
    introduccion: string
    conceptos: Concepto[]
    niveles: { intro: string; items: NivelAtencion[]; cita: string }
    mapa: { raiz: NodoMapa; sintesis: NodoMapa; nota: string }
    rol: { lema: string; enfoque: string; funciones: FuncionRol[] }
  }
  practica: {
    titulo: string
    proposito: string
    actividad: string
    categorias: string[]
    modalidad: string
    producto: string
    aprendizaje: string[]
  }
  reflexion: {
    original: string
    aprendi: string
    sorprendio: string
    aplicaria: string
    pendiente: string
    destacada: string
  }
  evidencias: { teoria: Evidencia[]; practica: Evidencia[] }
  referencias: Referencia[]
}

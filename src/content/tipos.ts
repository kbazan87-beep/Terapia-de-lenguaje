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

/**
 * Nodo del mapa conceptual. `relacion` es el conector que lo une con su nodo padre.
 * El nodo muestra solo `titulo` y `resumen`; `detalle` se lee al seleccionarlo.
 */
export type NodoMapa = {
  id: string
  titulo: string
  resumen?: string
  detalle?: string[]
  lista?: string[]
  fuente?: string
  relacion?: string
  /** En una rama: muestra sus hijos directamente como fichas compactas. */
  compacto?: boolean
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

/** Ficha temática elaborada en Excel (definición, características y actividades). */
export type EvidenciaFicha = {
  tipo: 'ficha'
  id: string
  titulo: string
  tema: string
  descripcion: string
  fuente: string
  definicion: string
  caracteristicas: string
  /** Rasgos enumerados en el texto de características (mismas palabras del original). */
  rasgos: string[]
  actividades: { titulo: string; descripcion: string }[]
  /** Celdas originales de la hoja, para consultar la evidencia tal como fue registrada. */
  celdas: { ref: string; valor: string }[]
}

export type Evidencia = EvidenciaImagen | EvidenciaTabla | EvidenciaFicha

/** Bloques de contenido teórico. Cada semana combina los que necesita su tema. */
export type BloqueTeoria = { id: string; titulo: string; descripcion?: string } & (
  | { tipo: 'conceptos'; conceptos: Concepto[] }
  | { tipo: 'mapa'; mapa: { raiz: NodoMapa; sintesis: NodoMapa; nota: string }; original?: EvidenciaImagen }
  | { tipo: 'rol'; rol: { lema: string; enfoque: string; etiquetaEnfoque?: string; fuente: string; funciones: FuncionRol[] } }
  | { tipo: 'evidencia'; evidencia: EvidenciaImagen; contexto: { pregunta: string; texto: string } }
  | { tipo: 'evidencias'; evidencias: Evidencia[]; procedencia: string }
)

export type EtapaReflexion = {
  id: string
  pregunta: string
  accion: string
  proposito: string
  respuestas: {
    pregunta: string
    /** Fragmentos de mi reflexión o de mi práctica; `null` si no hay información documentada. */
    texto: string | null
    /** Indica cuando el texto proviene de la ficha de práctica y no de la reflexión. */
    origen?: 'práctica'
  }[]
}

export type Semana = {
  numero: number
  slug: string
  titulo: string
  sesiones: { tipo: 'Teoría' | 'Práctica'; fecha: string; fechaISO: string }[]
  teoria: {
    titulo: string
    introduccion: string
    bloques: BloqueTeoria[]
  }
  practica: {
    titulo: string
    proposito: string
    actividad: string
    etiquetaCategorias: string
    categorias: string[]
    modalidad: string
    producto: string
    aprendizaje: string[]
    evidencia: { titulo: string; descripcion: string; boton: string }
  }
  reflexion: {
    modelo: { nombre: string; cita: string }
    destacada: string
    /** Texto original de la reflexión, sin cambios. */
    original: string
    etapas: EtapaReflexion[]
  }
  evidencias: { teoria: Evidencia[]; practica: Evidencia[] }
  referencias: Referencia[]
}

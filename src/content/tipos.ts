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
  /** Muestra las fichas hijas en una sola columna en pantallas anchas (para títulos largos). */
  fichasEnColumna?: boolean
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

export type SegmentoGuion = {
  titulo: string
  inicio: string
  fin: string
  voz: string | null
  acotacion: string | null
  parrafos: string[]
  enPantalla: string | null
}

/** Conjunto de materiales elaborados (infografía, díptico, presentación…), cada uno con sus imágenes. */
export type EvidenciaGaleria = {
  tipo: 'galeria'
  id: string
  titulo: string
  descripcion: string
  materiales: {
    id: string
    nombre: string
    formato: string
    modalidad: string
    descripcion: string
    /** Destinatarios previstos para el material, según la ficha de práctica. */
    publico?: string
    /** Cada imagen es una página o cara del material original. */
    paginas: { src: string; alt: string; etiqueta: string }[]
    /** Guion por segmentos (para materiales audiovisuales). */
    guion?: SegmentoGuion[]
  }[]
  /** Materiales mencionados en la actividad cuyo archivo no se incluyó en los documentos. */
  noIncluidos?: string[]
}

/** Video de un trabajo (por ejemplo, grupal), con sus integrantes tal como figuran en el documento. */
export type EvidenciaVideo = {
  tipo: 'video'
  id: string
  titulo: string
  descripcion: string
  /** Ruta de la copia optimizada para la web (el original se conserva en el repositorio). */
  src: string
  poster: string
  formato: string
  integrantes?: { titulo: string; nombres: string[] }
  /** Enlace a materiales relacionados de otra semana. */
  relacionado?: { titulo: string; texto: string; href: string; boton: string; items: string[] }
}

/** Ficha de un protocolo organizada por rangos de edad (sin puntajes ni cálculos). */
export type EvidenciaProtocolo = {
  tipo: 'protocolo'
  id: string
  titulo: string
  subtitulo: string
  descripcion: string
  /** Cómo se elaboró la ficha (texto de la estudiante). */
  introduccion: string
  /** Materiales consultados para elaborarla; solo se muestran sus nombres. */
  instrumentos: { nombre: string; archivo: string; paginas: { src: string; alt: string }[] }[]
  /** Aviso breve de uso no clínico. */
  nota: string
  rangos: { rango: string; items: { codigo: string; conducta: string; situacion: string | null }[] }[]
  /** Áreas que la ficha usa en su resumen, con la letra de código a la que corresponden. */
  areas: { letra: string; nombre: string | null }[]
  /** Textos de la ficha sobre cómo se registra cada ítem (se muestran tal cual, sin simular su uso). */
  registro: string
  integrantes: { titulo: string; nombres: string[] }
  paginas: { src: string; alt: string; etiqueta: string }[]
  /** Copia del Word incluida en la landing para descargarla directamente. */
  /** `descarga`: nombre de archivo seguro para todos los navegadores (sin tildes). */
  archivo: { href: string; nombre: string; descarga: string }
}

/** Ensayo individual: visor de páginas, descarga directa del PDF y sus referencias. */
export type EvidenciaEnsayo = {
  tipo: 'ensayo'
  id: string
  titulo: string
  descripcion: string
  referencias: string[]
  paginas: { src: string; alt: string }[]
  archivo: { href: string; nombre: string }
}

/** Evolución del portafolio: se genera a partir del registro de semanas ya publicadas. */
export type EvidenciaRecorrido = {
  tipo: 'recorrido'
  id: string
  titulo: string
  descripcion: string
  /** Semanas que se muestran (de la 1 a `hasta`). */
  hasta: number
  /** Cómo organicé cada semana del portafolio. */
  organizacion: { titulo: string; texto: string }[]
}

export type Evidencia = EvidenciaImagen | EvidenciaTabla | EvidenciaFicha | EvidenciaGaleria | EvidenciaVideo | EvidenciaProtocolo | EvidenciaEnsayo | EvidenciaRecorrido

/** Bloques de contenido teórico. Cada semana combina los que necesita su tema. */
export type BloqueTeoria = { id: string; titulo: string; descripcion?: string } & (
  | { tipo: 'conceptos'; conceptos: Concepto[] }
  | { tipo: 'mapa'; mapa: { raiz: NodoMapa; sintesis: NodoMapa; nota: string }; original?: EvidenciaImagen }
  | { tipo: 'rol'; rol: { lema: string; enfoque: string; etiquetaEnfoque?: string; fuente: string; funciones: FuncionRol[] } }
  | { tipo: 'evidencia'; evidencia: EvidenciaImagen; contexto: { pregunta: string; texto: string } }
  | { tipo: 'evidencias'; evidencias: Evidencia[]; procedencia: string }
  | {
      tipo: 'comparacion'
      columnas: { titulo: string; pregunta: string; rasgos: string[] }[]
      analogia: string
      clave: string
      fuente: string
    }
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

/**
 * Autoevaluación y coevaluación del portafolio.
 * La rúbrica se transcribe tal como figura en «Rúbrica de evaluación» (pautas del curso, Parte 1).
 * Los puntajes de la autoevaluación los asignó la estudiante; la coevaluación queda pendiente
 * hasta contar con las respuestas de su par.
 */

export type NivelRubrica = 0 | 1 | 2 | 3 | 4

export type CriterioRubrica = {
  id: string
  nombre: string
  /** Descripción de cada nivel de desempeño (4 = Destacado … 1 = Inicio). */
  niveles: Record<1 | 2 | 3 | 4, string>
}

export const rubrica = {
  titulo: 'Rúbrica de evaluación — Parte 1',
  escala: 'Escala vigesimal: cinco criterios de 0 a 4 puntos (total 20). «No presenta» equivale a 0.',
  maximo: 4,
  nombresNiveles: { 4: 'Destacado', 3: 'Logrado', 2: 'En proceso', 1: 'Inicio', 0: 'No presenta' } as Record<NivelRubrica, string>,
  criterios: [
    {
      id: 'estructura',
      nombre: 'Estructura y navegación',
      niveles: {
        4: 'Las 7 secciones completas; navegación clara e intuitiva; diseño legible y coherente.',
        3: 'Las 7 secciones presentes; navegación clara con detalles menores de diseño.',
        2: 'Faltan 1–2 secciones o la navegación es confusa.',
        1: 'Faltan 3 o más secciones; el sitio es difícil de recorrer.',
      },
    },
    {
      id: 'teoria',
      nombre: 'Evidencias de teoría',
      niveles: {
        4: 'Una ficha completa por clase con síntesis visual propia, conceptos citados y conexión con el rol.',
        3: 'Todas las fichas presentes; algún elemento incompleto.',
        2: 'Faltan fichas o las síntesis copian las diapositivas.',
        1: 'Evidencias teóricas mínimas o sin elaboración propia.',
      },
    },
    {
      id: 'practica',
      nombre: 'Evidencias de práctica',
      niveles: {
        4: 'Todas las actividades con sus 4 datos y el producto visible.',
        3: 'Todas las actividades presentes; algún dato incompleto.',
        2: 'Faltan actividades o los productos no se visualizan.',
        1: 'Evidencias prácticas mínimas o sin descripción.',
      },
    },
    {
      id: 'reflexion',
      nombre: 'Reflexión',
      niveles: {
        4: 'Una reflexión semanal que aplica los tres pasos con análisis profundo y vínculo claro con la comunidad.',
        3: 'Aplica los tres pasos; el análisis es correcto pero general.',
        2: 'Reflexiones descriptivas; falta análisis o proyección.',
        1: 'Reflexiones ausentes o limitadas a resumir la clase.',
      },
    },
    {
      id: 'etica',
      nombre: 'Ética, referencias y puntualidad',
      niveles: {
        4: 'Cumple todas las normas éticas; APA 7 correcto; entrega a tiempo.',
        3: 'Normas éticas cumplidas; errores menores de APA 7.',
        2: 'Errores frecuentes de citación o entrega tardía.',
        1: 'Incumple normas de consentimiento o anonimización*.',
      },
    },
  ] as CriterioRubrica[],
  /** La nota del asterisco no figura en el documento compartido. */
  notaAsterisco: 'La nota a la que remite el asterisco no figura en la parte de la rúbrica compartida.',
}

export const autoevaluacion = {
  /** Puntajes asignados por la estudiante (0 a 4). `null` = pendiente. */
  puntajes: { estructura: 4, teoria: 4, practica: 4, reflexion: 4, etica: 4 } as Record<string, NivelRubrica | null>,
  justificaciones: {
    estructura:
      'Mi portafolio tiene las siete secciones que pide la pauta: Inicio, Sobre mí, Teoría, Práctica, Reflexiones, Autoevaluación y Referencias. Cada semana sigue el mismo orden y se puede llegar a cualquiera desde el menú o desde «Mi recorrido académico». Lo que mejoraré es revisar que todo se vea bien en el celular cada vez que agregue algo nuevo.',
    teoria:
      'En las siete clases hice un mapa conceptual propio, con conceptos clave citados y la conexión con el rol del terapeuta de lenguaje, y lo acompañé con evidencias de clase como el Kahoot, los Padlet, la infografía sobre el TEA o el caso de Mateo. Lo que mejoraré es reunir a tiempo todas mis evidencias; por ejemplo, la captura del Padlet de la semana 7 no quedó entre mis materiales.',
    practica:
      'Cada práctica tiene lo que hice, con quién, el producto y mi aporte, y los productos se pueden ver o descargar en la misma página: el directorio de lugares, la guía del TDL, los materiales de difusión, el video, el PICT-24 y su versión revisada. Lo que mejoraré es probar estos materiales con familias y promotores, para saber si de verdad se entienden.',
    reflexion:
      'Cada semana escribí mi reflexión con el modelo de Rolfe (¿Qué?, ¿Y qué?, ¿Ahora qué?) y traté de llevarla a lo que haría con una familia, una escuela o una comunidad, como Cuna Más o los agentes comunitarios. Siento que en algunas semanas me quedé más en describir que en analizar, así que quiero profundizar más en el «¿Y qué?».',
    etica:
      'No incluí datos de pacientes ni rostros de menores, y los nombres y el video de mis compañeras aparecen con su autorización. Las referencias están en APA 7 y entrego el portafolio antes del plazo, el 10 de octubre de 2026 a las 8 p. m. Lo que mejoraré es revisar con más cuidado mis citas y la redacción, algo que ya noté en semanas anteriores.',
  } as Record<string, string | null>,
  reflexionFinal: {
    fortalezas:
      'Lo que más valoro de mi portafolio es que muestra un proceso: empecé conociendo la red de instituciones y terminé revisando con mi grupo el protocolo de tamizaje que habíamos creado. Aprendí a explicar la teoría con mis propias palabras y a conectarla con lo que haría en una comunidad real.',
    mejoras:
      'Me falta practicar cómo registrar e interpretar los resultados con el PICT-24 y el CSBS, adaptar mejor el lenguaje al contexto de cada familia y planificar primero el mensaje y las fuentes antes de diseñar un material.',
  } as { fortalezas: string | null; mejoras: string | null },
}

export const coevaluacion = {
  descripcion: 'Mi par revisa mi portafolio con los mismos criterios y registra su puntaje y sus comentarios.',
  /** Datos de la coevaluación; todo queda pendiente hasta contar con las respuestas de mi par. */
  evaluador: null as string | null,
  puntajes: { estructura: null, teoria: null, practica: null, reflexion: null, etica: null } as Record<string, NivelRubrica | null>,
  comentarios: { estructura: null, teoria: null, practica: null, reflexion: null, etica: null } as Record<string, string | null>,
  comentarioGeneral: null as string | null,
}

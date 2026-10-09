import type { EvidenciaEnsayo, EvidenciaImagen, EvidenciaRecorrido, Semana } from '../../tipos'

/**
 * Semana 6 — contenido tomado de «Portafolio semana 6» (Word), las presentaciones de clase
 * «¿Cómo elaborar una infografía sobre trastornos de la comunicación?» y «Ensayo breve: la terapia
 * de lenguaje en atención comunitaria», la infografía «Comunicación en el TEA» y el ensayo individual (PDF).
 */

const PPT_INF = 'Presentación de clase «¿Cómo elaborar una infografía sobre trastornos de la comunicación?», semana 6'
const PPT_ENS = 'Presentación de clase «Ensayo breve: la terapia de lenguaje en atención comunitaria», semana 6'
// Archivos servidos aparte (public/media/semana-6) para no recargar la página.
const MEDIA = `${import.meta.env.BASE_URL}media/semana-6`

const infografia: EvidenciaImagen = {
  tipo: 'imagen',
  id: 'infografia-tea',
  titulo: 'Infografía «Comunicación en el TEA»',
  descripcion: 'Taller de infografía: el tema que nos tocó fue la comunicación en el TEA. Selecciona la imagen para ampliarla.',
  autoria: 'Elaborada en dupla con Alessandra Padilla',
  src: `${MEDIA}/infografia-tea.png`,
  alt: 'Infografía «Comunicación en el TEA. Cada persona se comunica de una manera única». Incluye las secciones ¿Qué es? (comunicación verbal, no verbal y con apoyo), Características frecuentes, Señales de alerta, Ejemplos de instrucciones simples, ¿Cómo podemos apoyar?, ¿Por qué es importante? y el mensaje final «La comunicación no es solo hablar. También es escuchar, observar y comprender», con sus fuentes al pie.',
}

const ensayo: EvidenciaEnsayo = {
  tipo: 'ensayo',
  id: 'ensayo-rbc',
  titulo: 'La comunidad como espacio terapéutico: por qué la RBC puede mejorar la atención de la comunicación en el Perú',
  descripcion: 'Ensayo breve individual, en PDF.',
  referencias: [
    'Law, J., Reilly, S. y Snow, P. C. (2013). Child speech, language and communication need re-examined in a public health context: A new direction for the speech and language therapy profession. International Journal of Language & Communication Disorders, 48(5), 486–496. https://doi.org/10.1111/1460-6984.12027',
    'Ley N.° 29973. Ley General de la Persona con Discapacidad. (2012). Diario Oficial El Peruano.',
    'Organización Mundial de la Salud y Banco Mundial. (2011). Informe mundial sobre la discapacidad. OMS.',
    'Organización Mundial de la Salud, UNESCO, Organización Internacional del Trabajo y Consorcio Internacional de Discapacidad y Desarrollo. (2012). Guías para la RBC: Folleto complementario. OMS.',
    'Torres Arias, K. L. y Villalonga Aragón, L. (2020). Análisis de los factores que limitan y/o contribuyen en la implementación del Servicio de Atención Integral de Personas con Discapacidad (SAIPD) en el distrito de Puente Piedra, 2017 [Tesis de maestría, Pontificia Universidad Católica del Perú]. Repositorio de Tesis PUCP. http://hdl.handle.net/20.500.12404/15692',
    'Wylie, K., McAllister, L., Davidson, B. y Marshall, J. (2013). Changing practice: Implications of the World Report on Disability for responding to communication disability in under-served populations. International Journal of Speech-Language Pathology, 15(1), 1–13. https://doi.org/10.3109/17549507.2012.745164',
  ],
  paginas: [1, 2, 3].map((n) => ({ src: `${MEDIA}/ensayo/pagina-${n}.jpg`, alt: `Ensayo «La comunidad como espacio terapéutico», página ${n} de 3.` })),
  archivo: { href: `${MEDIA}/ensayo-cardozo.pdf`, nombre: 'Ensayo_Cardozo.pdf' },
}

// «Evolución de mi portafolio»: oculta por ahora; se retomará al incorporar la semana 7.
export const evolucionPortafolio: EvidenciaRecorrido = {
  tipo: 'recorrido',
  id: 'evolucion-portafolio',
  titulo: 'De la semana 1 a la semana 6',
  descripcion: 'Selecciona una semana para ver qué trabajé y qué evidencias reuní.',
  hasta: 6,
  organizacion: [
    { titulo: 'Teoría', texto: 'Conceptos clave, mapa conceptual y evidencias de la clase.' },
    { titulo: 'Práctica', texto: 'Propósito, qué hice, producto, aporte y la evidencia del trabajo.' },
    { titulo: 'Reflexión', texto: 'Mi reflexión con el modelo ¿Qué? – ¿Y qué? – ¿Ahora qué?' },
  ],
}

export const semana06: Semana = {
  numero: 6,
  slug: 'semana-6',
  titulo: 'Infografías y ensayo argumentativo breve',
  sesiones: [
    { tipo: 'Teoría', fecha: 'Miércoles 23 de septiembre de 2026', fechaISO: '2026-09-23' },
    { tipo: 'Práctica', fecha: 'Sábado 26 de septiembre de 2026', fechaISO: '2026-09-26' },
  ],

  teoria: {
    titulo: 'Comunicar con claridad y argumentar con evidencia',
    introduccion: 'Clase 6 · Infografía y ensayo breve',
    bloques: [
      {
        id: 'inicio',
        tipo: 'evidencias',
        titulo: 'EVIDENCIA',
        descripcion: 'Taller de infografía (en dupla) y ensayo breve (individual).',
        evidencias: [infografia, ensayo],
        procedencia: 'Evidencia de teoría',
      },
      {
        id: 'conceptos',
        tipo: 'conceptos',
        titulo: 'Conceptos clave',
        descripcion: 'Abre cada tarjeta para leer la definición completa.',
        conceptos: [
          {
            id: 'infografia',
            titulo: 'Infografía en la promoción de la salud comunicativa',
            sintesis: 'Un tema, un público, un mensaje, una acción concreta.',
            desarrollo:
              'Es una representación visual que combina texto breve, imágenes, íconos y datos para explicar un tema de forma rápida. Se planifica en seis pasos (público y propósito, mensaje clave, fuentes confiables, estructura y boceto, diseño visual, validación y difusión) y sigue una regla de oro: un tema, un público, un mensaje, una acción concreta.',
            cita: '(UPCH, 2026)',
          },
          {
            id: 'lenguaje-claro',
            titulo: 'Lenguaje claro y centrado en la persona',
            sintesis: 'Sin tecnicismos ni etiquetas estigmatizantes, y con accesibilidad.',
            desarrollo:
              'Se escribe sin tecnicismos ni etiquetas estigmatizantes (por ejemplo, «persona con afasia» y no «el afásico») y con accesibilidad: frases cortas, pictogramas, alto contraste y versión en quechua si el público lo requiere.',
            cita: '(UPCH, 2026)',
          },
          {
            id: 'ensayo',
            titulo: 'Ensayo argumentativo breve',
            sintesis: 'Una tesis, dos argumentos con evidencia, una objeción y una propuesta.',
            desarrollo:
              'Responde una pregunta con una tesis (postura + porque + dos argumentos), la sostiene con dos argumentos según el modelo IECE (idea, evidencia, comentario, enlace), responde una objeción y cierra con una propuesta concreta para la comunidad.',
            cita: '(UPCH, 2026)',
          },
        ],
      },
      {
        id: 'mapa',
        tipo: 'mapa',
        titulo: 'Mapa conceptual interactivo',
        descripcion: 'Dos herramientas para comunicar en la comunidad: la infografía y el ensayo argumentativo.',
        mapa: {
          nota: 'Elaboración propia a partir de las dos presentaciones de la clase de la semana 6.',
          raiz: {
            id: 'raiz',
            titulo: 'Comunicar en la comunidad',
            resumen: 'Infografías y ensayo argumentativo breve',
            detalle: ['La infografía comunica información clara, confiable y accesible a un público concreto; el ensayo sostiene una postura con evidencia.'],
            fuente: `${PPT_INF}; ${PPT_ENS}`,
            hijos: [
              {
                id: 'infografias',
                titulo: 'Infografías',
                resumen: 'Información clara, confiable y accesible',
                relacion: 'se informa con',
                detalle: ['Representación visual que combina texto breve, imágenes, íconos y datos para explicar un tema de forma rápida y comprensible.'],
                fuente: PPT_INF,
                hijos: [
                  {
                    id: 'proposito',
                    titulo: 'Propósito',
                    resumen: 'Acercar el conocimiento a quienes conviven con la persona',
                    relacion: 'tiene un',
                    detalle: ['Una buena infografía se entiende en menos de un minuto y deja al lector con una idea clara de qué hacer.'],
                    lista: ['Promoción', 'Detección temprana', 'Participación (enfoque RBC)', 'Inclusión'],
                    fuente: PPT_INF,
                  },
                  {
                    id: 'seis-pasos',
                    titulo: 'Planificación en seis pasos',
                    resumen: 'El diseño es el paso 5, no el 1',
                    relacion: 'se planifica en',
                    detalle: ['Antes de abrir Canva, se planifica.', 'Regla de oro: un tema · un público · un mensaje · una acción concreta.'],
                    fuente: PPT_INF,
                    hijos: [
                      { id: 'paso-1', titulo: '1. Público y propósito', detalle: ['El mismo tema se comunica distinto según quién lo lee.'], fuente: PPT_INF },
                      { id: 'paso-2', titulo: '2. Mensaje clave', detalle: ['Si no puedes decirlo en una oración, todavía no está listo.'], fuente: PPT_INF },
                      { id: 'paso-3', titulo: '3. Fuentes confiables', detalle: ['Una infografía de salud es tan buena como la evidencia que la respalda.'], fuente: PPT_INF },
                      { id: 'paso-4', titulo: '4. Estructura y boceto', detalle: ['De arriba hacia abajo: título gancho, dato clave, cuerpo, llamado a la acción, fuentes y créditos.'], fuente: PPT_INF },
                      { id: 'paso-5', titulo: '5. Diseño visual', detalle: ['Menos es más: el diseño está al servicio del mensaje.'], fuente: PPT_INF },
                      { id: 'paso-6', titulo: '6. Validación y difusión', detalle: ['Se valida antes de difundir.'], fuente: PPT_INF },
                    ],
                  },
                  {
                    id: 'lenguaje',
                    titulo: 'Lenguaje claro',
                    resumen: 'Respetuoso y centrado en la persona',
                    relacion: 'se redacta con',
                    detalle: ['«La persona con afasia» en lugar de «el niño afásico»; «tiene una pérdida auditiva» en lugar de «padece de sordera»; «ante una duda, consulta a un terapeuta de lenguaje» en lugar de «es normal, ya hablará solo».'],
                    fuente: PPT_INF,
                  },
                  {
                    id: 'accesibilidad',
                    titulo: 'Accesibilidad',
                    resumen: 'Para que todo el público pueda leerla',
                    relacion: 'considera la',
                    lista: ['Frases cortas y en voz activa', 'Pictogramas (p. ej., ARASAAC) para lectura fácil', 'Alto contraste entre texto y fondo', 'Versión en quechua u otra lengua si el público lo requiere', 'Imágenes diversas y sin estereotipos'],
                    fuente: PPT_INF,
                  },
                  {
                    id: 'validacion',
                    titulo: 'Validación',
                    resumen: 'Prueba con 3 personas',
                    relacion: 'antes de difundir, pasa por la',
                    detalle: ['Muéstrala a personas del público objetivo y pregunta: ¿Qué entendiste? ¿Qué harías después de leerla? Si no responden lo que esperabas, ajusta el mensaje.'],
                    fuente: PPT_INF,
                  },
                ],
              },
              {
                id: 'ensayo',
                titulo: 'Ensayo argumentativo',
                resumen: 'Una postura clara, sostenida con evidencia',
                relacion: 'se argumenta con el',
                detalle: ['Responde una pregunta con una tesis, dos argumentos basados en evidencia, una objeción y una propuesta para la comunidad, en cinco párrafos.'],
                fuente: PPT_ENS,
                hijos: [
                  {
                    id: 'tesis',
                    titulo: 'Tesis',
                    resumen: 'Mi postura + porque + argumento 1 + y + argumento 2',
                    relacion: 'parte de una',
                    detalle: ['Una oración que responde la pregunta y anuncia los dos argumentos. Va al final de la introducción.'],
                    fuente: PPT_ENS,
                  },
                  {
                    id: 'argumentos',
                    titulo: 'Argumentos con evidencia',
                    resumen: 'Modelo IECE',
                    relacion: 'se sostiene con',
                    detalle: ['Cada argumento ocupa un párrafo y cita al menos una fuente.'],
                    fuente: PPT_ENS,
                    hijos: [
                      { id: 'iece-i', titulo: 'Idea', detalle: ['Afirma tu argumento.'], fuente: PPT_ENS },
                      { id: 'iece-e', titulo: 'Evidencia', detalle: ['Cita una fuente.'], fuente: PPT_ENS },
                      { id: 'iece-c', titulo: 'Comentario', detalle: ['Explica con tus palabras.'], fuente: PPT_ENS },
                      { id: 'iece-e2', titulo: 'Enlace', detalle: ['Conecta con tu tesis.'], fuente: PPT_ENS },
                    ],
                  },
                  {
                    id: 'contraargumento',
                    titulo: 'Contraargumento',
                    resumen: '«Podría objetarse que…» / «Sin embargo…»',
                    relacion: 'responde un',
                    detalle: ['Presenta una objeción y la responde con razones.'],
                    fuente: PPT_ENS,
                  },
                  {
                    id: 'propuesta',
                    titulo: 'Propuesta comunitaria',
                    resumen: 'Concreta, viable y local',
                    relacion: 'cierra con una',
                    detalle: ['La conclusión retoma la tesis con otras palabras, sintetiza los dos argumentos y cierra con una propuesta concreta y viable.'],
                    fuente: PPT_ENS,
                  },
                ],
              },
            ],
          },
          sintesis: {
            id: 'sintesis',
            titulo: 'Conexión con el rol',
            resumen: 'Comunicar con información clara y confiable, y sostener una postura con evidencia',
            detalle: [
              'El terapeuta de lenguaje comunica en la comunidad con información clara y confiable, como una infografía dirigida a un público concreto (familias, docentes o agentes), con una sola acción y fuentes verificadas. También sabe sostener una postura con evidencia, por ejemplo al argumentar por qué ampliar su rol hacia la comunidad.',
            ],
            fuente: 'Ficha de teoría de la semana 6.',
          },
        },
      },
    ],
  },

  practica: {
    titulo: 'Mi aprendizaje, mi evidencia, mi voz profesional',
    proposito: 'Construir un portafolio que cuente cómo voy formándome como terapeuta de lenguaje en la comunidad, y no una simple colección de tareas.',
    actividad:
      'En esta sesión recibí las pautas del portafolio digital del curso e inicié su creación. Identifiqué las siete secciones obligatorias y su propósito. Creé mi portafolio como una página web y empecé a organizar en ella las evidencias de teoría y de práctica de las clases desarrolladas, además de preparar mi primera reflexión con el modelo ¿Qué? – ¿Y qué? – ¿Ahora qué?',
    etiquetaCategorias: 'Secciones obligatorias del portafolio',
    categorias: ['Inicio', 'Sobre mí', 'Teoría', 'Práctica', 'Reflexiones', 'Autoevaluación', 'Referencias'],
    modalidad: 'Individual.',
    producto: 'Sitio web donde se está presentando todo el portafolio.',
    aprendizaje: [
      'Aprendí que un portafolio vale por la reflexión que acompaña a cada evidencia. Ordenar mis trabajos me hizo ver cuánto he avanzado, desde conocer la red de instituciones hasta elaborar materiales de difusión y adaptar protocolos de tamizaje. También entendí que escribir qué aprendí, por qué importa y cómo lo aplicaría me ayuda a conectar la teoría con la práctica.',
      'En un contexto comunitario real usaría esta forma de registrar mi trabajo para ver el progreso de un programa, mostrar a una comunidad o a un equipo lo que se hizo y mejorar mis acciones con base en lo aprendido. Todo cuidando la ética: sin datos identificables y sin rostros de menores.',
    ],
    evidencia: {
      titulo: 'Evolución de mi portafolio',
      descripcion: 'Evidencia de la práctica: este mismo portafolio, organizado semana a semana.',
      boton: 'Ver la evolución del portafolio',
    },
  },

  reflexion: {
    modelo: { nombre: 'Modelo reflexivo de Rolfe, Freshwater y Jasper', cita: '(Rolfe et al., 2001)' },
    destacada: 'La comunicación en salud debe ser clara y confiable, y no solo atractiva.',
    original:
      'Esta semana trabajamos el ensayo breve, la elaboración de infografías y las pautas del portafolio, y empecé a crear mi sitio. Lo que más me sirvió fue la idea de que una infografía se planifica antes de diseñar, con un solo tema, un público, un mensaje y una acción. Reconozco que en mis materiales anteriores empecé por el diseño. Esto importa porque la comunicación en salud debe ser clara y confiable, y no solo atractiva. Organizar el portafolio me tomó más tiempo del que pensaba, pero me ayudó a ver todo lo que ya había hecho. De ahora en adelante, planificaré primero el mensaje y las fuentes, y revisaré mejor la redacción y las citas.',
    etapas: [
      {
        id: 'que',
        pregunta: '¿Qué?',
        accion: 'Describir',
        proposito: 'Presento qué aprendí y qué actividades realicé.',
        respuestas: [
          {
            pregunta: '¿Qué actividades realicé esta semana?',
            texto: 'Esta semana trabajamos el ensayo breve, la elaboración de infografías y las pautas del portafolio, y empecé a crear mi sitio.',
          },
          {
            pregunta: '¿Qué aprendí?',
            texto:
              'Lo que más me sirvió fue la idea de que una infografía se planifica antes de diseñar, con un solo tema, un público, un mensaje y una acción. Reconozco que en mis materiales anteriores empecé por el diseño.',
          },
        ],
      },
      {
        id: 'y-que',
        pregunta: '¿Y qué?',
        accion: 'Analizar',
        proposito: 'Explico por qué es importante planificar la comunicación y documentar mis aprendizajes.',
        respuestas: [
          {
            pregunta: '¿Por qué es importante planificar la comunicación?',
            texto: 'Esto importa porque la comunicación en salud debe ser clara y confiable, y no solo atractiva.',
          },
          {
            pregunta: '¿Por qué es importante documentar mis aprendizajes?',
            texto: 'Organizar el portafolio me tomó más tiempo del que pensaba, pero me ayudó a ver todo lo que ya había hecho.',
          },
          {
            pregunta: '¿Qué significa para mi formación como futura terapeuta de lenguaje?',
            texto: 'Entendí que escribir qué aprendí, por qué importa y cómo lo aplicaría me ayuda a conectar la teoría con la práctica.',
            origen: 'práctica',
          },
        ],
      },
      {
        id: 'ahora-que',
        pregunta: '¿Ahora qué?',
        accion: 'Proyectar',
        proposito: 'Planteo cómo aplicaré lo aprendido y qué necesito mejorar.',
        respuestas: [
          {
            pregunta: '¿Cómo aplicaré lo aprendido?',
            texto:
              'En un contexto comunitario real usaría esta forma de registrar mi trabajo para ver el progreso de un programa, mostrar a una comunidad o a un equipo lo que se hizo y mejorar mis acciones con base en lo aprendido.',
            origen: 'práctica',
          },
          {
            pregunta: '¿Qué necesito mejorar?',
            texto: 'De ahora en adelante, planificaré primero el mensaje y las fuentes, y revisaré mejor la redacción y las citas.',
          },
        ],
      },
    ],
  },

  evidencias: { teoria: [], practica: [] },

  referencias: [
    {
      id: 'upch-2026-infografia',
      fragmentos: [
        { texto: 'Universidad Peruana Cayetano Heredia. (2026). ' },
        { texto: '¿Cómo elaborar una infografía sobre trastornos de la comunicación?', cursiva: true },
        { texto: ' [Diapositivas]. Terapia de Lenguaje en Atención Comunitaria (T0351), semana 6.' },
      ],
    },
    {
      id: 'upch-2026-ensayo',
      fragmentos: [
        { texto: 'Universidad Peruana Cayetano Heredia. (2026). ' },
        { texto: 'Ensayo breve: la terapia de lenguaje en atención comunitaria', cursiva: true },
        { texto: ' [Diapositivas]. Terapia de Lenguaje en Atención Comunitaria (T0351), semana 6.' },
      ],
    },
    {
      id: 'rolfe-2001',
      fragmentos: [
        { texto: 'Rolfe, G., Freshwater, D. y Jasper, M. (2001). ' },
        { texto: "Critical reflection for nursing and the helping professions: A user's guide", cursiva: true },
        { texto: '. Palgrave.' },
      ],
    },
  ],
}

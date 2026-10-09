import type { EvidenciaImagen, EvidenciaVideo, Semana } from '../../tipos'
import padlet from '../../../assets/semana-4/padlet-recordamos-s3.jpg'
import portadaVideo from '../../../assets/semana-4/tiktok-portada.jpg'

/**
 * Semana 4 — contenido tomado de «Portafolio semana 4» (Word, versión actualizada),
 * «CLASE SEMANA 4» (presentación de clase) y el video grupal de TikTok sobre el TDL.
 */

const PPT = 'Presentación de clase, semana 4'

const evidenciaPadlet: EvidenciaImagen = {
  tipo: 'imagen',
  id: 'padlet-recordamos',
  titulo: 'Padlet «Recordamos S3»',
  descripcion: 'Muro colaborativo de inicio de clase con cinco preguntas para recordar la sesión anterior.',
  autoria: 'Captura de la clase teórica',
  src: padlet,
  alt: 'Padlet «Recordamos S3» con cinco preguntas: por qué conocer la cultura y la lengua antes de intervenir, cómo diferenciar una diferencia lingüística de un trastorno, qué acciones harían una propuesta respetuosa y sostenible, cómo adaptar una actividad sin materiales especializados y qué actores podrían colaborar en un programa de RBC.',
}

const videoTikTok: EvidenciaVideo = {
  tipo: 'video',
  id: 'tiktok-tdl',
  titulo: 'Video de TikTok sobre el TDL',
  descripcion: 'Video grupal presentado en la sesión de avance, elaborado a partir de mi guion de TikTok de la semana anterior.',
  src: `${import.meta.env.BASE_URL}media/tiktok-tdl-semana-4.mp4`,
  poster: portadaVideo,
  formato: 'Video vertical · 1 min 20 s · copia optimizada para la web (el archivo original se conserva en el repositorio).',
  integrantes: {
    titulo: 'Integrantes del trabajo grupal',
    nombres: ['Ximena Abanto', 'Arantza Gamarra', 'Daniela Yupanqui', 'Claudia de la Cruz', 'Alessandra Padilla'],
  },
  relacionado: {
    titulo: 'Continuación de la práctica 3',
    texto: 'De forma individual presenté el avance de los materiales que inicié en la práctica de la semana 3:',
    href: '#semana-3',
    boton: 'Ver los materiales en la semana 3',
    items: ['Infografía', 'Díptico', 'Charla en PPT', 'Guion del video de 4 minutos'],
  },
}

export const semana04: Semana = {
  numero: 4,
  slug: 'semana-4',
  titulo: 'Tipos de programas de atención comunitaria',
  sesiones: [
    { tipo: 'Teoría', fecha: 'Miércoles 9 de septiembre de 2026', fechaISO: '2026-09-09' },
    { tipo: 'Práctica', fecha: 'Sábado 12 de septiembre de 2026', fechaISO: '2026-09-12' },
  ],

  teoria: {
    titulo: 'Del diseño a la evaluación de un programa',
    introduccion: 'Clase 4 · Tipos de programas de atención comunitaria',
    bloques: [
      {
        id: 'inicio',
        tipo: 'evidencia',
        titulo: 'EVIDENCIA',
        descripcion: 'Padlet de recuerdo al inicio de la clase teórica.',
        evidencia: evidenciaPadlet,
        contexto: {
          pregunta: 'En la sesión anterior vimos cómo difundir un servicio comunitario. ¿Qué recordamos?',
          texto: 'Padlet de recuerdo: compartimos nuestras respuestas en el muro colaborativo del curso.',
        },
      },
      {
        id: 'conceptos',
        tipo: 'conceptos',
        titulo: 'Conceptos clave',
        descripcion: 'Abre cada tarjeta para leer la definición completa.',
        conceptos: [
          {
            id: 'programa',
            titulo: 'Programa de intervención',
            sintesis: 'Un conjunto de acciones y recursos planificados para lograr objetivos claros; es sistemático y planificado.',
            desarrollo:
              'Es un conjunto de acciones y recursos planificados para lograr objetivos claros. Es sistemático, porque tiene estructura y lógica, y planificado, porque responde a objetivos definidos de antemano. Se elabora en seis pasos: evaluación de necesidades, programación, línea base, ejecución, evaluación y toma de decisiones.',
            cita: '(Fernández-Ballesteros, 1996; Fink, 1993)',
          },
          {
            id: 'objetivo',
            titulo: 'Objetivo operativo',
            sintesis: 'Un objetivo observable y evaluable, con tres partes: conducta, condiciones y criterio.',
            desarrollo:
              'Es un objetivo observable y evaluable. Tiene tres partes: conducta (qué hará la persona), condiciones (cómo, cuándo y dónde) y criterio (con qué nivel de logro). Se redacta con un solo verbo de acción y apunta al producto final, no al proceso.',
            cita: '(Fernández-Ballesteros, 1996)',
          },
          {
            id: 'tipos',
            titulo: 'Tipos de programas de atención comunitaria',
            sintesis: 'Se clasifican según su función, la población y el nivel de atención comunitaria.',
            desarrollo:
              'Se clasifican según su función (crear un repertorio nuevo o modificar una conducta existente), según la población (leve o severa, individual o grupal) y según el nivel de atención comunitaria (promoción y prevención, detección temprana, capacitación de agentes y apoyo familiar). En el Perú existen programas sociales, de salud pública, educativos, de desarrollo rural y de atención a grupos vulnerables.',
            cita: 'Ficha de teoría, semana 4',
          },
        ],
      },
      {
        id: 'mapa',
        tipo: 'mapa',
        titulo: 'Mapa conceptual interactivo',
        descripcion: 'Síntesis de la clase: cómo se diseña, mide y clasifica un programa.',
        mapa: {
          nota: 'Elaboración propia a partir de la presentación de la clase de la semana 4.',
          raiz: {
            id: 'programa',
            titulo: 'Programa de intervención',
            resumen: 'Acciones planificadas para lograr objetivos',
            detalle: [
              'Un programa —sinónimo de intervención— es un conjunto de acciones planificadas y recursos dirigidos al logro de objetivos claramente establecidos, para mejorar la salud, el conocimiento, las actitudes u otras áreas del desarrollo de una persona o comunidad.',
            ],
            fuente: `${PPT} (Fernández-Ballesteros, 1996; Fink, 1993)`,
            hijos: [
              {
                id: 'fundamentos',
                titulo: 'Fundamentos',
                resumen: 'Características, estructura y elementos',
                relacion: 'se sustenta en',
                fuente: PPT,
                hijos: [
                  {
                    id: 'caracteristicas',
                    fichasEnColumna: true,
                    titulo: 'Características',
                    relacion: 'es',
                    resumen: 'Sistemático y planificado',
                    fuente: PPT,
                    hijos: [
                      { id: 'sistematico', titulo: 'Sistemático', detalle: ['Sigue una estructura y una lógica interna.'], fuente: PPT },
                      { id: 'planificado', titulo: 'Planificado', detalle: ['Responde a objetivos definidos de antemano, no a la improvisación.'], fuente: PPT },
                    ],
                  },
                  {
                    id: 'estructura',
                    titulo: 'Estructura',
                    relacion: 'tiene una',
                    resumen: 'Cuatro bloques',
                    lista: ['Problema focal y marco teórico', 'Objetivos y población objetivo', 'Acciones y temporalización', 'Recursos y resultados'],
                    fuente: PPT,
                  },
                  {
                    id: 'elementos',
                    fichasEnColumna: true,
                    titulo: 'Elementos',
                    relacion: 'se compone de',
                    resumen: 'Acciones, estructura y temporalización',
                    fuente: PPT,
                    hijos: [
                      { id: 'acciones', titulo: 'Acciones', resumen: 'Parte dinámica', detalle: ['Aquello que debe realizarse para el logro de los objetivos planteados.'], fuente: PPT },
                      { id: 'estructura-elem', titulo: 'Estructura', resumen: 'Parte estática', detalle: ['Los recursos materiales y humanos que deben existir para llevar a cabo el programa.'], fuente: PPT },
                      { id: 'temporalizacion', titulo: 'Temporalización', resumen: 'Secuencias', detalle: ['Secuencias temporales establecidas para los sucesivos pasos de la aplicación del programa.'], fuente: PPT },
                    ],
                  },
                ],
              },
              {
                id: 'secuencia',
                titulo: 'Secuencia de elaboración',
                resumen: 'Seis pasos',
                relacion: 'se elabora en',
                compacto: true,
                fuente: PPT,
                hijos: [
                  { relacion: 'paso', id: 'p1', titulo: '1. Evaluación de necesidades', detalle: ['Se identifica el problema y su magnitud.'], fuente: PPT },
                  { relacion: 'paso', id: 'p2', titulo: '2. Programación', detalle: ['Se definen objetivos, estrategias y el análisis de tareas.'], fuente: PPT },
                  { relacion: 'paso', id: 'p3', titulo: '3. Línea base', detalle: ['Se mide el punto de partida, antes de intervenir.'], fuente: PPT },
                  { relacion: 'paso', id: 'p4', titulo: '4. Ejecución', detalle: ['Se pone en marcha el programa planificado.'], fuente: PPT },
                  { relacion: 'paso', id: 'p5', titulo: '5. Evaluación', detalle: ['Se mide si se lograron los objetivos propuestos.'], fuente: PPT },
                  {
                    relacion: 'paso',
                    id: 'p6',
                    titulo: '6. Toma de decisiones',
                    detalle: ['Se continúa, ajusta o corrige el programa. Si el objetivo no se logra, se realiza un diagnóstico de causas, se corrige el programa y se vuelve a la etapa de programación.'],
                    fuente: PPT,
                  },
                ],
              },
              {
                id: 'medicion',
                titulo: 'Objetivos y medición',
                resumen: 'Qué lograr y cómo saberlo',
                relacion: 'se mide con',
                fuente: PPT,
                hijos: [
                  {
                    id: 'objetivo-operativo',
                    titulo: 'Objetivo operativo',
                    relacion: 'parte de un',
                    resumen: 'Evaluable y observable',
                    detalle: ['Se refiere al producto final, no al proceso. Un objetivo, una sola conducta: se redacta con un solo verbo de acción.', 'Ejemplo: «Nombrar por lo menos 8 de 10 animales al observarlos en material gráfico».'],
                    fuente: PPT,
                    hijos: [
                      { id: 'conducta', titulo: 'Conducta', resumen: '¿Hacer qué?', detalle: ['Un verbo de acción, una taxonomía y un complemento que precise la conducta esperada.'], fuente: PPT },
                      { id: 'condiciones', titulo: 'Condiciones', resumen: '¿Bajo qué condiciones?', detalle: ['¿Cómo, cuándo y dónde se espera que ocurra la conducta?'], fuente: PPT },
                      { id: 'criterio', titulo: 'Criterio', resumen: '¿Cuán bien?', detalle: ['¿Con qué nivel de ejecución, porcentaje o número de aciertos se considera logrado?'], fuente: PPT },
                    ],
                  },
                  {
                    id: 'analisis-tareas',
                    titulo: 'Análisis de tareas',
                    relacion: 'se descompone en',
                    resumen: 'De lo simple a lo complejo',
                    detalle: ['De la especificación de la tarea y sus habilidades a la conducta final esperada.'],
                    lista: ['Integridad y secuencialidad de los pasos', 'Especificación y funcionalidad de cada tarea', 'Orden jerárquico, de lo simple a lo complejo'],
                    fuente: PPT,
                  },
                  {
                    id: 'linea-base',
                    titulo: 'Línea base',
                    relacion: 'se compara con la',
                    resumen: 'Medición previa a la intervención',
                    detalle: ['Es la medición de la presencia de una habilidad, previa a la intervención, en condiciones naturales, con un registro acorde al objetivo que se va a trabajar.'],
                    fuente: PPT,
                  },
                ],
              },
              {
                id: 'tipos',
                titulo: 'Tipos de programas',
                resumen: 'Función, población y nivel de atención',
                relacion: 'se clasifica en',
                fuente: PPT,
                hijos: [
                  {
                    id: 'funcion',
                    titulo: 'Según su función',
                    relacion: 'según',
                    resumen: 'Establecer o modificar',
                    fuente: PPT,
                    hijos: [
                      { id: 'establecen', titulo: 'Establecen', resumen: 'Un repertorio inexistente', lista: ['Repertorio básico, conducta verbal o cuidado personal', 'Programas académicos'], fuente: PPT },
                      { id: 'modifican', titulo: 'Modifican', resumen: 'Una conducta existente', lista: ['Incrementar una conducta social o ponerla bajo control', 'Eliminar conductas problemáticas'], fuente: PPT },
                    ],
                  },
                  {
                    id: 'poblacion',
                    titulo: 'Según la población',
                    relacion: 'según',
                    resumen: 'Tipo y organización',
                    lista: ['Trastornos leves o severos', 'Individual o grupal (por edad o por tipo de trastorno)'],
                    fuente: PPT,
                  },
                  {
                    id: 'nivel',
                    fichasEnColumna: true,
                    titulo: 'Según el nivel de atención comunitaria',
                    relacion: 'según',
                    resumen: 'Cuatro tipos',
                    fuente: PPT,
                    hijos: [
                      { id: 'n-promocion', titulo: 'Promoción y prevención', detalle: ['Dirigidos a toda la comunidad para fomentar el desarrollo comunicativo y prevenir trastornos, en el marco de la APS.'], fuente: PPT },
                      { id: 'n-deteccion', titulo: 'Detección e intervención temprana', detalle: ['Tamizaje y estimulación dirigidos a población en riesgo, identificada mediante la difusión y el CRED.'], fuente: PPT },
                      { id: 'n-capacitacion', titulo: 'Capacitación a agentes comunitarios', detalle: ['Formación a docentes, promotores de salud y familias, como los revisados en la RBC.'], fuente: PPT },
                      { id: 'n-apoyo', titulo: 'Apoyo y seguimiento familiar', detalle: ['Programas domiciliarios o de visita, orientados a sostener la intervención en el entorno natural del niño.'], fuente: PPT },
                    ],
                  },
                ],
              },
            ],
          },
          sintesis: {
            id: 'logro',
            titulo: 'Lo que el niño logra',
            resumen: 'Graduar, evaluar y decidir con datos',
            detalle: [
              'Un programa no se mide por lo que se hace, sino por lo que el niño logra hacer gracias a él.',
              'Por eso se gradúa la dificultad (de lo sencillo a lo complejo) y se evalúa para decidir si el programa continúa, se ajusta o se corrige.',
            ],
            fuente: PPT,
          },
        },
      },
      {
        id: 'rol',
        tipo: 'rol',
        titulo: 'Rol del terapeuta de lenguaje',
        descripcion: 'Elige una acción para ver en qué se apoya.',
        rol: {
          lema: 'En la comunidad, el terapeuta de lenguaje no improvisa.',
          etiquetaEnfoque: 'Conexión con el rol',
          enfoque:
            'En la comunidad, el terapeuta de lenguaje no improvisa. Diseña programas con objetivos medibles (por ejemplo, «nombrar 8 de 10 animales en material gráfico»), mide una línea base antes de intervenir y decide con datos si el programa funciona. Elige el tipo de programa según la población y el nivel de atención (promoción, detección, capacitación de agentes o apoyo familiar) y gradúa la dificultad de las actividades de lo simple a lo complejo.',
          fuente: 'Ficha de teoría de la semana 4.',
          funciones: [
            { id: 'disena', verbo: 'Diseña', descripcion: 'programas con objetivos medibles.', vinculos: ['Objetivos medibles'] },
            { id: 'mide', verbo: 'Mide', descripcion: 'una línea base antes de intervenir.', vinculos: ['Línea base'] },
            { id: 'decide', verbo: 'Decide con datos', descripcion: 'si el programa funciona.', vinculos: ['Datos'] },
            {
              id: 'elige',
              verbo: 'Elige el tipo de programa',
              descripcion: 'según la población y el nivel de atención.',
              vinculos: ['Población', 'Promoción', 'Detección', 'Capacitación de agentes', 'Apoyo familiar'],
            },
            { id: 'gradua', verbo: 'Gradúa', descripcion: 'la dificultad de las actividades de lo simple a lo complejo.', vinculos: ['De lo simple a lo complejo'] },
          ],
        },
      },
    ],
  },

  practica: {
    titulo: 'Avance',
    proposito: 'Revisar lo que llevaba hecho, recibir observaciones y ajustar los materiales para que la información sobre el TDL fuera clara, correcta y útil para las familias.',
    actividad:
      'En esta sesión presenté el avance de los trabajos que inicié en la Práctica 3, todos sobre el trastorno del desarrollo del lenguaje (TDL). De forma individual presenté mi infografía, mi díptico, la charla en PPT y el guion del video de 4 minutos. Con mi grupo presenté también el video de tik tok a base de mi guion de TikTok que se hizo la semana pasada.',
    etiquetaCategorias: 'Avance presentado',
    categorias: ['Infografía', 'Díptico', 'Charla en PPT', 'Guion del video de 4 minutos', 'Video de TikTok (grupal)'],
    modalidad: 'El video de TikTok fue grupal. La infografía, el díptico, el guion del video y la PPT fueron individuales.',
    producto: 'Archivos externos.',
    aprendizaje: [
      'Aprendí que un material de difusión mejora mucho cuando se revisa y se corrige antes de la versión final. Presentar un avance me permitió ver qué partes eran confusas, cuáles tenían demasiado texto y qué mensajes debía simplificar. También me di cuenta de que un mismo tema, como el TDL, se comunica distinto según el formato y el público.',
      'El díptico y la infografía sirven para que la familia lo lea con calma, la charla para docentes o promotores y el TikTok para llegar rápido y con una sola idea. En un contexto comunitario real validaría mis materiales con algunas personas del público, por ejemplo madres, padres o docentes, antes de difundirlos, para comprobar que entienden el mensaje y saben qué hacer después.',
    ],
    evidencia: {
      titulo: 'El avance en video',
      descripcion: 'Evidencia de la práctica: video grupal de TikTok y continuidad con los materiales de la semana 3.',
      boton: 'Ver el video',
    },
  },

  reflexion: {
    modelo: { nombre: 'Modelo reflexivo de Rolfe, Freshwater y Jasper', cita: '(Rolfe et al., 2001)' },
    destacada: 'Sin objetivos medibles, no hay manera de saber si un programa funciona.',
    original:
      'Esta semana vimos qué es un programa de intervención, cómo se estructura, cómo se plantean objetivos operativos, qué es la línea base y cuáles son los tipos de programas según su función, su población y el nivel de atención comunitaria. También presenté el avance de mis materiales sobre el TDL. Me costó entender que un objetivo bien redactado debe ser observable y tener un criterio de logro, porque yo solía plantearlos de forma más general. Esto importa porque, sin objetivos medibles, no hay manera de saber si un programa funciona, y la línea base permite comparar el antes y el después. Si trabajara con un programa, buscaría que el material pueda ser usado por esos agentes y no solo por un terapeuta. Necesito investigar mejor qué hace cada tipo de programa y cómo podría articularse un terapeuta de lenguaje con ellos.',
    etapas: [
      {
        id: 'que',
        pregunta: '¿Qué?',
        accion: 'Describir',
        proposito: 'Presento los hechos y aprendizajes principales de la semana.',
        respuestas: [
          {
            pregunta: '¿Qué hicimos o aprendimos esta semana?',
            texto:
              'Esta semana vimos qué es un programa de intervención, cómo se estructura, cómo se plantean objetivos operativos, qué es la línea base y cuáles son los tipos de programas según su función, su población y el nivel de atención comunitaria. También presenté el avance de mis materiales sobre el TDL.',
          },
          {
            pregunta: '¿Qué me llamó la atención o me sorprendió?',
            texto: 'Me costó entender que un objetivo bien redactado debe ser observable y tener un criterio de logro, porque yo solía plantearlos de forma más general.',
          },
        ],
      },
      {
        id: 'y-que',
        pregunta: '¿Y qué?',
        accion: 'Analizar',
        proposito: 'Explico por qué lo aprendido es relevante para la atención comunitaria y para mi formación.',
        respuestas: [
          {
            pregunta: '¿Por qué es importante para la atención comunitaria?',
            texto: 'Esto importa porque, sin objetivos medibles, no hay manera de saber si un programa funciona, y la línea base permite comparar el antes y el después.',
          },
          {
            pregunta: '¿Cómo se relaciona con la teoría o con lo que ya sabía?',
            texto: 'Aprendí que un material de difusión mejora mucho cuando se revisa y se corrige antes de la versión final.',
            origen: 'práctica',
          },
          {
            pregunta: '¿Qué significa para mi formación como futura terapeuta de lenguaje?',
            texto: 'Me di cuenta de que un mismo tema, como el TDL, se comunica distinto según el formato y el público.',
            origen: 'práctica',
          },
        ],
      },
      {
        id: 'ahora-que',
        pregunta: '¿Ahora qué?',
        accion: 'Proyectar',
        proposito: 'Planteo cómo llevar lo aprendido a situaciones profesionales y cuáles son mis siguientes retos.',
        respuestas: [
          {
            pregunta: '¿Cómo lo aplicaría con una familia, una escuela o una comunidad?',
            texto: 'Si trabajara con un programa, buscaría que el material pueda ser usado por esos agentes y no solo por un terapeuta.',
          },
          {
            pregunta: '¿Y en un contexto comunitario real?',
            texto:
              'Validaría mis materiales con algunas personas del público, por ejemplo madres, padres o docentes, antes de difundirlos, para comprobar que entienden el mensaje y saben qué hacer después.',
            origen: 'práctica',
          },
          {
            pregunta: '¿Qué necesito reforzar o seguir aprendiendo?',
            texto: 'Necesito investigar mejor qué hace cada tipo de programa y cómo podría articularse un terapeuta de lenguaje con ellos.',
          },
        ],
      },
    ],
  },

  evidencias: { teoria: [evidenciaPadlet], practica: [videoTikTok] },

  referencias: [
    {
      id: 'fernandez-ballesteros-1996',
      fragmentos: [
        { texto: 'Fernández-Ballesteros, R. (1996). ' },
        { texto: 'Evaluación de programas: Una guía práctica en ámbitos sociales, educativos y de salud', cursiva: true },
        { texto: '. Síntesis.' },
      ],
    },
    {
      id: 'fink-1993',
      fragmentos: [{ texto: 'Fink, A. (1993). ' }, { texto: 'Evaluation fundamentals: Guiding health programs, research, and policy', cursiva: true }, { texto: '. Sage.' }],
    },
    {
      id: 'oms-2010',
      fragmentos: [
        { texto: 'Organización Mundial de la Salud, Organización Internacional del Trabajo, UNESCO e International Disability and Development Consortium. (2010). ' },
        { texto: 'Rehabilitación basada en la comunidad: Guías para la RBC', cursiva: true },
        { texto: '. OMS' },
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

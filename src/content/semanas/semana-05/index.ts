import type { EvidenciaImagen, EvidenciaProtocolo, Semana } from '../../tipos'
import pict24 from './pict24.json'
import salaZoom from '../../../assets/semana-5/sala-zoom-reto.jpg'
import pagina1 from '../../../assets/semana-5/pict24/pagina-1.jpg'
import pagina2 from '../../../assets/semana-5/pict24/pagina-2.jpg'
import pagina3 from '../../../assets/semana-5/pict24/pagina-3.jpg'
import pagina4 from '../../../assets/semana-5/pict24/pagina-4.jpg'
import wordPict24 from '../../../assets/semana-5/pict24-peru.docx?url'

/**
 * Semana 5 — contenido tomado de «Portafolio semana 5» (Word), «CLASE SEMANA 5» y
 * «CLASE SEMANA 5 _ TAMIZAJES» (presentaciones de clase) y la ficha PICT-24 | Perú (Word).
 */

const PPT_RBC = 'Presentación de clase «Evaluación sobre Rehabilitación Basada en la Comunidad», semana 5'
const PPT_TAM = 'Presentación de clase «Tamizajes en el área de lenguaje», semana 5'
// Páginas de los instrumentos de referencia, servidas como archivos aparte (public/media/referencias).
const PAGINAS_REFERENCIA: Record<string, number> = { reel: 7, 'csbs-cuestionario': 1, 'csbs-puntajes': 4, intenciones: 2 }
const paginasDe = (carpeta: string, nombre: string) =>
  Array.from({ length: PAGINAS_REFERENCIA[carpeta] }, (_, i) => ({
    src: `${import.meta.env.BASE_URL}media/referencias/${carpeta}/pagina-${i + 1}.jpg`,
    alt: `${nombre}, página ${i + 1}.`,
  }))

const NOMBRE_WORD = 'Evidencia práctica PICT24 - Abanto, Gamarra, De la cruz y Cardozo.docx'

const evidenciaSala: EvidenciaImagen = {
  tipo: 'imagen',
  id: 'sala-zoom',
  titulo: 'Sala de Zoom del reto',
  descripcion: 'Sala 1 del reto en grupos, en la que participé con Arantza Gamarra y Ximena Abanto.',
  autoria: 'Captura de la clase teórica',
  src: salaZoom,
  alt: 'Lista de la Sala 1 de Zoom con tres participantes: Arantza Gamarra, Kimberli Zaleth Cardozo Casimiro y Ximena Abanto.',
}

const fichaPict24: EvidenciaProtocolo = {
  tipo: 'protocolo',
  id: 'pict24',
  titulo: 'PICT-24 | Perú',
  subtitulo: 'Comunicación temprana · 0–24 meses',
  descripcion: 'Ficha rápida de aplicación · comunicación temprana de 0 a 24 meses.',
  introduccion:
    'Como parte de la práctica, elaboramos grupalmente el PICT-24 | Perú, una propuesta académica de exploración de la comunicación temprana de 0 a 24 meses. Para su elaboración tomamos como referencia la escala R.E.E.L., el cuestionario CSBS-DP, sus criterios de puntuación y el Cuestionario de intenciones comunicativas. A partir de estos materiales seleccionamos y organizamos conductas comunicativas por rangos de edad.',
  instrumentos: [
    { nombre: 'Escala para la aparición del lenguaje receptivo y expresivo (R.E.E.L.)', archivo: 'Escala REEL OFICIAL', paginas: paginasDe('reel', 'Escala R.E.E.L.') },
    { nombre: 'CSBS-DP: Cuestionario del bebé y niño pequeño', archivo: 'CSBS-DP CUESTIONARIO', paginas: paginasDe('csbs-cuestionario', 'CSBS-DP Cuestionario') },
    { nombre: 'CSBS-DP: criterios de puntuación del Cuestionario del bebé y niño pequeño', archivo: 'CSBS-DP Puntajes', paginas: paginasDe('csbs-puntajes', 'CSBS-DP Puntajes') },
    {
      nombre: 'Cuestionario para padres sobre utilización de funciones e intenciones comunicativas',
      archivo: 'Cuestionario de intenciones comunicativas',
      paginas: paginasDe('intenciones', 'Cuestionario de intenciones comunicativas'),
    },
  ],
  nota: 'El PICT-24 es una propuesta académica no estandarizada, sin puntos de corte validados en población peruana; no debe utilizarse como instrumento clínico validado.',
  rangos: pict24.rangos,
  areas: [
    { letra: 'R', nombre: 'Receptivo' },
    { letra: 'E', nombre: 'Expresivo' },
    { letra: 'S', nombre: 'Social/pragmático' },
    { letra: 'I', nombre: 'Interacción' },
    { letra: 'J', nombre: 'Juego' },
  ],
  registro: pict24.parrafos.find((p) => p.startsWith('Marque UNA opción')) ?? '',
  integrantes: {
    titulo: 'Integrantes del trabajo grupal',
    nombres: ['Kimberli Zaleth Cardozo Casimiro', 'Ximena Abanto', 'Arantza Gamarra', 'Claudia de la Cruz'],
  },
  paginas: [pagina1, pagina2, pagina3, pagina4].map((src, i) => ({
    src,
    etiqueta: `Página ${i + 1}`,
    alt: `Página ${i + 1} de la ficha PICT-24 | Perú, con sus tablas de ítems por rango de edad.`,
  })),
  archivo: { href: wordPict24, nombre: NOMBRE_WORD, descarga: NOMBRE_WORD.normalize('NFD').replace(/[\u0300-\u036f]/g, '') },
}

export const semana05: Semana = {
  numero: 5,
  slug: 'semana-5',
  titulo: 'Tamizajes en lenguaje y evaluación de la RBC',
  sesiones: [
    { tipo: 'Teoría', fecha: 'Miércoles 16 de septiembre de 2026', fechaISO: '2026-09-16' },
    { tipo: 'Práctica', fecha: 'Sábado 19 de septiembre de 2026', fechaISO: '2026-09-19' },
  ],

  teoria: {
    titulo: 'Detectar a tiempo y evaluar para mejorar',
    introduccion: 'Clase 5 · Tamizajes en lenguaje y evaluación de la RBC',
    bloques: [
      {
        id: 'inicio',
        tipo: 'evidencia',
        titulo: 'EVIDENCIA',
        descripcion: 'Reto en salas de Zoom durante la clase teórica.',
        evidencia: evidenciaSala,
        contexto: {
          pregunta: 'En sus grupos propongan un programa para una zona desfavorecida, ya sea de la costa, sierra o selva.',
          texto: 'Reto en salas de Zoom: proponer un programa indicando tema, lugar y por qué. Se presentó de manera oral en el mismo Zoom.',
        },
      },
      {
        id: 'conceptos',
        tipo: 'conceptos',
        titulo: 'Conceptos clave',
        descripcion: 'Abre cada tarjeta para leer la definición completa.',
        conceptos: [
          {
            id: 'tamizaje-diagnostico',
            titulo: 'Tamizaje vs. diagnóstico',
            sintesis: 'El tamizaje responde quién necesita una evaluación completa; el diagnóstico da un perfil y un plan.',
            desarrollo:
              'El tamizaje es breve, lo puede aplicar personal capacitado y responde quién necesita una evaluación completa (resultado: «pasa» o «riesgo»). El diagnóstico es extenso, lo hace el terapeuta de lenguaje y da un perfil y un plan de intervención. Un tamizaje nunca se reporta como diagnóstico.',
            cita: 'Ficha de teoría, semana 5',
          },
          {
            id: 'validez',
            titulo: 'Validez de un tamizaje: sensibilidad, especificidad y adaptación',
            sintesis: 'En tamizaje suele priorizarse la sensibilidad; al acortar un protocolo hay que revalidarlo.',
            desarrollo:
              'La sensibilidad es la proporción de niños con dificultad que el tamizaje identifica, y la especificidad la de niños sin dificultad que deja pasar. En tamizaje suele priorizarse la sensibilidad. Al acortar un protocolo se crea un instrumento nuevo: hay que revalidarlo con piloto y puntos de corte propios, y adaptarlo a la cultura y lengua locales.',
            cita: 'Ficha de teoría, semana 5',
          },
          {
            id: 'evaluacion-rbc',
            titulo: 'Evaluación de la RBC',
            sintesis: 'Un proceso sistemático de ocho pasos para medir si un programa mejora la calidad de vida.',
            desarrollo:
              'Es un proceso sistemático para medir la efectividad, eficiencia y relevancia de un programa y si mejora la calidad de vida de las personas con discapacidad y sus familias. Sigue ocho pasos, desde definir objetivos hasta la retroalimentación y los ajustes, con participación de la comunidad.',
            cita: '(OMS et al., 2010)',
          },
        ],
      },
      {
        id: 'mapa',
        tipo: 'mapa',
        titulo: 'Mapa conceptual interactivo',
        descripcion: 'Cómo se conectan el tamizaje del lenguaje y la evaluación de la RBC.',
        mapa: {
          nota: 'Elaboración propia a partir de las dos presentaciones de la clase de la semana 5.',
          raiz: {
            id: 'raiz',
            titulo: 'Detectar y evaluar en la comunidad',
            resumen: 'Tamizaje del lenguaje y evaluación de la RBC',
            detalle: [
              'El tamizaje identifica a tiempo quién necesita una evaluación completa; la evaluación de la RBC verifica si el programa mejora la calidad de vida y cómo ajustarlo.',
            ],
            fuente: `${PPT_TAM}; ${PPT_RBC}`,
            hijos: [
              {
                id: 'tamizaje',
                titulo: 'Tamizaje del lenguaje',
                resumen: '¿Quién necesita una evaluación?',
                relacion: 'se detecta con el',
                fuente: PPT_TAM,
                hijos: [
                  {
                    id: 'por-que-tamizar',
                    titulo: 'Por qué detectar a tiempo',
                    relacion: 'importa porque',
                    resumen: 'Tiempo, visibilidad y equidad',
                    fuente: PPT_TAM,
                    fichasEnColumna: true,
                    hijos: [
                      { id: 'tiempo', titulo: 'El tiempo importa', detalle: ['El lenguaje se desarrolla en una ventana crítica. Lo que no se detecta a los 2 o 3 años suele aparecer después como dificultades de lectoescritura, de aprendizaje o de conducta.'], fuente: PPT_TAM },
                      { id: 'visibles', titulo: 'Poco visibles', detalle: ['Un niño con dificultades puede pasar años sin ser identificado: «ya hablará», «se porta bien», o se confunde con timidez o bajo rendimiento.'], fuente: PPT_TAM },
                      { id: 'equidad', titulo: 'Una cuestión de equidad', detalle: ['En contextos comunitarios hay pocos especialistas y largas listas de espera. El tamizaje permite priorizar quién necesita atención primero.'], fuente: PPT_TAM },
                    ],
                  },
                  {
                    id: 'condiciones',
                    titulo: 'Condiciones de un buen tamizaje',
                    relacion: 'requiere',
                    resumen: 'Seis condiciones',
                    detalle: ['Tamizar sin saber a dónde derivar puede generar más daño que beneficio.'],
                    lista: ['Breve y sencillo', 'Sensible: detecta a los niños que sí tienen dificultad', 'Específico: evita derivar de más', 'Adaptado al contexto', 'Con criterios propios (puntos de corte comprobados)', 'Con ruta de derivación'],
                    fuente: PPT_TAM,
                  },
                  {
                    id: 'adaptar',
                    titulo: 'Adaptar un protocolo',
                    relacion: 'al acortarse, es',
                    resumen: 'Un instrumento nuevo',
                    detalle: [
                      'Al acortar un protocolo, deja de ser ese instrumento y pasa a ser uno nuevo. No se pueden usar los puntajes ni los baremos del test original con la versión reducida.',
                      'Sin validación, la versión corta no es un tamizaje confiable: es solo un test recortado.',
                    ],
                    lista: ['Piloto', 'Criterio de referencia', 'Puntos de corte propios', 'Confiabilidad', 'Documentar'],
                    fuente: PPT_TAM,
                  },
                ],
              },
              {
                id: 'ruta',
                titulo: 'Ruta del tamizaje en la comunidad',
                resumen: 'De los actores a la intervención',
                relacion: 'se organiza en la',
                compacto: true,
                fuente: PPT_TAM,
                hijos: [
                  { relacion: 'paso', id: 'r-actores', titulo: '1. Actores comunitarios', detalle: ['Docentes, promotores y personal de atención primaria.'], fuente: PPT_TAM },
                  { relacion: 'paso', id: 'r-tamizaje', titulo: '2. Tamizaje', detalle: ['Prueba breve, aplicada por personal capacitado. Se reporta como «pasa» o «riesgo», nunca como diagnóstico.'], fuente: PPT_TAM },
                  { relacion: 'paso', id: 'r-derivacion', titulo: '3. Derivación', detalle: ['Ruta clara hacia el servicio.'], fuente: PPT_TAM },
                  { relacion: 'paso', id: 'r-evaluacion', titulo: '4. Evaluación completa', detalle: ['El terapeuta confirma o descarta.'], fuente: PPT_TAM },
                  { relacion: 'paso', id: 'r-intervencion', titulo: '5. Intervención', detalle: ['Oportuna y con la familia.'], fuente: PPT_TAM },
                ],
              },
              {
                id: 'evaluacion',
                titulo: 'Evaluación de la RBC',
                resumen: '¿El programa mejora la calidad de vida?',
                relacion: 'se evalúa con la',
                fuente: PPT_RBC,
                hijos: [
                  {
                    id: 'por-que-evaluar',
                    titulo: 'Por qué evaluar',
                    relacion: 'sirve para',
                    resumen: 'Verificar, ajustar y rendir cuentas',
                    lista: ['Verificar si mejora la calidad de vida', 'Ajustar las estrategias a partir de evidencia', 'Rendir cuentas a la comunidad, las instituciones y los financiadores'],
                    fuente: PPT_RBC,
                  },
                  {
                    id: 'ocho-pasos',
                    titulo: 'Ruta de 8 pasos',
                    relacion: 'sigue una',
                    resumen: 'Preparar, analizar y mejorar',
                    detalle: ['La evaluación de la RBC debe ser un proceso continuo, que permita la adaptación y mejora del programa.'],
                    lista: ['Objetivos y metas', 'Selección de indicadores', 'Recopilación de datos', 'Análisis de datos', 'Evaluación de la implementación', 'Participación comunitaria', 'Redacción del informe', 'Retroalimentación y ajustes'],
                    fuente: PPT_RBC,
                  },
                  {
                    id: 'metodologias',
                    titulo: 'Metodologías',
                    relacion: 'combina',
                    resumen: 'Cuantitativa y cualitativa',
                    fuente: PPT_RBC,
                    fichasEnColumna: true,
                    hijos: [
                      { id: 'cuanti', titulo: 'Cuantitativa', lista: ['Cuestionarios y escalas estandarizadas', 'Registros de frecuencia y progreso', 'Comparación de resultados antes/después'], fuente: PPT_RBC },
                      { id: 'cuali', titulo: 'Cualitativa', lista: ['Observación de la conducta comunicativa en diferentes entornos', 'Entrevistas a familiares y cuidadores', 'Grupos focales con la comunidad'], fuente: PPT_RBC },
                    ],
                  },
                ],
              },
              {
                id: 'indicadores',
                titulo: 'Indicadores en audición, voz y lenguaje',
                resumen: 'Para evaluar la RBC en nuestro campo',
                relacion: 'se mide con',
                compacto: true,
                fuente: PPT_RBC,
                hijos: [
                  { relacion: 'mide', id: 'i-comunicacion', titulo: 'Comunicación funcional', detalle: ['Mejora en la capacidad de comunicación funcional de la persona en su vida diaria.'], fuente: PPT_RBC },
                  { relacion: 'mide', id: 'i-participacion', titulo: 'Participación', detalle: ['Participación en actividades familiares y comunitarias.'], fuente: PPT_RBC },
                  { relacion: 'mide', id: 'i-accesibilidad', titulo: 'Accesibilidad', detalle: ['Accesibilidad a servicios de rehabilitación.'], fuente: PPT_RBC },
                ],
              },
            ],
          },
          sintesis: {
            id: 'sintesis',
            titulo: 'Que ningún niño pase desapercibido',
            resumen: 'Detectar, derivar, evaluar y mejorar',
            detalle: [
              '«El tamizaje no busca etiquetar niños, busca que ningún niño con dificultades pase desapercibido».',
              'La evaluación de la RBC debe ser un proceso continuo, que garantice que el programa responda a las necesidades de la comunidad.',
            ],
            fuente: `${PPT_TAM}; ${PPT_RBC}`,
          },
        },
      },
      {
        id: 'tamizaje-vs-diagnostico',
        tipo: 'comparacion',
        titulo: 'Tamizaje y diagnóstico',
        descripcion: 'Dos momentos distintos de una misma ruta.',
        columnas: [
          {
            titulo: 'Tamizaje',
            pregunta: '¿Quién necesita una evaluación?',
            rasgos: ['Breve y sencillo', 'Puede aplicarlo personal capacitado', 'Resultado: pasa o riesgo', 'Se aplica a poblaciones amplias'],
          },
          {
            titulo: 'Diagnóstico',
            pregunta: '¿Qué tiene y cómo lo abordamos?',
            rasgos: ['Extenso y detallado', 'Lo realiza el terapeuta de lenguaje', 'Resultado: perfil, diagnóstico y plan de intervención', 'Se aplica a quien presenta señales de alerta'],
          },
        ],
        analogia: 'el control de peso y talla en el centro de salud no diagnostica, pero alerta cuándo mirar más de cerca.',
        clave: 'Un tamizaje nunca se reporta como diagnóstico.',
        fuente: PPT_TAM,
      },
      {
        id: 'rol',
        tipo: 'rol',
        titulo: 'Rol del terapeuta de lenguaje',
        descripcion: 'Elige una acción para ver en qué se apoya.',
        rol: {
          lema: 'En el primer nivel de atención, el terapeuta de lenguaje diseña el tamizaje y recibe las derivaciones.',
          etiquetaEnfoque: 'Conexión con el rol',
          enfoque:
            'En el primer nivel de atención, el terapeuta de lenguaje diseña el tamizaje, capacita a docentes y promotores para aplicarlo y recibe las derivaciones, con una ruta de derivación clara antes de tamizar. También evalúa los protocolos comunitarios con indicadores sencillos y con la voz de la comunidad, para ajustarlos con evidencia.',
          fuente: 'Ficha de teoría de la semana 5.',
          funciones: [
            { id: 'disena', verbo: 'Diseña', descripcion: 'el tamizaje.', vinculos: ['Tamizaje'] },
            { id: 'capacita', verbo: 'Capacita', descripcion: 'a docentes y promotores para aplicarlo.', vinculos: ['Docentes', 'Promotores'] },
            { id: 'recibe', verbo: 'Recibe las derivaciones', descripcion: 'con una ruta de derivación clara antes de tamizar.', vinculos: ['Ruta de derivación'] },
            { id: 'evalua', verbo: 'Evalúa los protocolos', descripcion: 'comunitarios con indicadores sencillos y con la voz de la comunidad.', vinculos: ['Indicadores sencillos', 'Voz de la comunidad', 'Evidencia'] },
          ],
        },
      },
    ],
  },

  practica: {
    titulo: 'Elaboración grupal del PICT-24 | Perú',
    proposito:
      'Contar con una herramienta más completa y práctica, que reúna aspectos de la comunicación temprana, de la comprensión y de la expresión, y que se pueda aplicar con facilidad en la comunidad.',
    actividad:
      'En esta práctica adapté protocolos de tamizaje del lenguaje para usarlos en la atención comunitaria. A mi grupo le correspondió el CSBS (Communication and Symbolic Behavior Scales). Lo unimos con otros dos instrumentos, el Cuestionario de intenciones comunicativas y la Escala para la aparición del lenguaje receptivo y expresivo (R.E.E.L.), y con los tres creamos un protocolo general.',
    etiquetaCategorias: 'Instrumentos integrados',
    categorias: ['CSBS (Communication and Symbolic Behavior Scales)', 'Cuestionario de intenciones comunicativas', 'Escala R.E.E.L.'],
    modalidad: 'Grupal.',
    producto: 'Ficha PICT-24 | Perú (archivo Word).',
    aprendizaje: [
      'Aprendí que un tamizaje no es una evaluación completa, sino una herramienta breve que ayuda a detectar a tiempo a quienes necesitan una evaluación más detallada. También vi que cada instrumento mira una parte distinta de la comunicación, por lo que combinarlos permite una visión más integral. Al adaptarlos tuve que decidir qué incluir y cómo simplificarlo, para que lo puedan aplicar promotores, docentes o personal de salud.',
      'En un contexto comunitario real usaría este protocolo en controles de crecimiento y desarrollo, en PRONOEI o en servicios como Cuna Más. Tendría en cuenta el contexto cultural y lingüístico de la familia, y derivaría a evaluación especializada cuando los resultados lo indiquen.',
    ],
    evidencia: {
      titulo: 'Explorador PICT-24 | Perú',
      descripcion: 'Evidencia de la práctica: los ocho rangos de edad de la ficha, con sus ítems y conductas.',
      boton: 'Explorar el PICT-24',
    },
  },

  reflexion: {
    modelo: { nombre: 'Modelo reflexivo de Rolfe, Freshwater y Jasper', cita: '(Rolfe et al., 2001)' },
    destacada: 'Tanto el tamizaje como la evaluación sirven para decidir y mejorar.',
    original:
      'Esta semana vimos programas comunitarios del Perú, como Cuna Más, Juntos, Pensión 65 y Qali Warma, el papel de los agentes comunitarios y los ocho pasos para evaluar un programa de RBC. En grupo adaptamos el CSBS junto con otros dos instrumentos para crear un protocolo de tamizaje. Me sorprendió que ya existan tantos programas con los que un terapeuta de lenguaje podría articularse, y que evaluar la RBC no sea solo medir resultados, sino también incluir a la comunidad y usar indicadores como la comunicación funcional, la participación y la accesibilidad. Al unir los instrumentos me costó decidir qué conservar para que el protocolo no quedara demasiado largo. Esto importa porque tanto el tamizaje como la evaluación sirven para decidir y mejorar. Con una comunidad, aprovecharía programas como Cuna Más para aplicar el tamizaje y capacitaría a los agentes comunitarios para que lo sostengan. Me falta práctica en interpretar los resultados y en adaptar el lenguaje al contexto de cada familia.',
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
              'Esta semana vimos programas comunitarios del Perú, como Cuna Más, Juntos, Pensión 65 y Qali Warma, el papel de los agentes comunitarios y los ocho pasos para evaluar un programa de RBC. En grupo adaptamos el CSBS junto con otros dos instrumentos para crear un protocolo de tamizaje.',
          },
          {
            pregunta: '¿Qué me llamó la atención o me sorprendió?',
            texto:
              'Me sorprendió que ya existan tantos programas con los que un terapeuta de lenguaje podría articularse, y que evaluar la RBC no sea solo medir resultados, sino también incluir a la comunidad y usar indicadores como la comunicación funcional, la participación y la accesibilidad. Al unir los instrumentos me costó decidir qué conservar para que el protocolo no quedara demasiado largo.',
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
            texto: 'Esto importa porque tanto el tamizaje como la evaluación sirven para decidir y mejorar.',
          },
          {
            pregunta: '¿Cómo se relaciona con la teoría o con lo que ya sabía?',
            texto: 'Aprendí que un tamizaje no es una evaluación completa, sino una herramienta breve que ayuda a detectar a tiempo a quienes necesitan una evaluación más detallada.',
            origen: 'práctica',
          },
          {
            pregunta: '¿Qué significa para mi formación como futura terapeuta de lenguaje?',
            texto: 'Vi que cada instrumento mira una parte distinta de la comunicación, por lo que combinarlos permite una visión más integral.',
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
            texto: 'Con una comunidad, aprovecharía programas como Cuna Más para aplicar el tamizaje y capacitaría a los agentes comunitarios para que lo sostengan.',
          },
          {
            pregunta: '¿Y en un contexto comunitario real?',
            texto:
              'Usaría este protocolo en controles de crecimiento y desarrollo, en PRONOEI o en servicios como Cuna Más. Tendría en cuenta el contexto cultural y lingüístico de la familia, y derivaría a evaluación especializada cuando los resultados lo indiquen.',
            origen: 'práctica',
          },
          {
            pregunta: '¿Qué necesito reforzar o seguir aprendiendo?',
            texto: 'Me falta práctica en interpretar los resultados y en adaptar el lenguaje al contexto de cada familia.',
          },
        ],
      },
    ],
  },

  evidencias: { teoria: [evidenciaSala], practica: [fichaPict24] },

  referencias: [
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

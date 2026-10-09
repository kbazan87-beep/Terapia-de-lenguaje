import type { EvidenciaDialogo, EvidenciaGaleria, EvidenciaImagen, SegmentoGuion, Semana } from '../../tipos'
import guionVideo from './guion-video.json'
import guionTiktok from './guion-tiktok.json'
import wordGuionTiktok from '../../../assets/semana-3/guion-tiktok.docx?url'
import padlet from '../../../assets/semana-3/padlet-a-la-practica.jpg'
import infografia from '../../../assets/semana-3/infografia-tdl.jpg'
import dipticoExterior from '../../../assets/semana-3/diptico-exterior.jpg'
import dipticoInterior from '../../../assets/semana-3/diptico-interior.jpg'

/**
 * Semana 3 — contenido tomado de «Portafolio semana 3» (Word), «Clase Semana 3» (presentación de clase)
 * y las evidencias de la práctica (infografía, díptico y charla en PPT sobre el TDL).
 */

const PPT = 'Presentación de clase, semana 3'

// Diapositivas de la charla «Guía educativa del TDL», en su orden original.
const diapositivas = Object.entries(import.meta.glob('../../../assets/semana-3/charla/*.jpg', { eager: true, import: 'default' }) as Record<string, string>)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src)

const titulosCharla = [
  'Portada',
  '¿Qué es el TDL?',
  'Prevalencia y causas',
  'Lenguaje expresivo: dificultades gramaticales',
  'Olvido de palabras: anomia',
  'Articulación de palabras largas',
  'Lenguaje comprensivo: ayudas visuales y contexto',
  'Literalidad',
  'Atención, memoria y emociones',
  'Apoyos visuales en el día a día',
  'Juegos para fomentar el vocabulario',
  'Formas positivas de corregir el lenguaje',
  'Resumen y claves para apoyar al niño con TDL',
  'Cierre',
]

const evidenciaPadlet: EvidenciaImagen = {
  tipo: 'imagen',
  id: 'padlet',
  titulo: 'Padlet «A la práctica»',
  descripcion: 'Tablero de la clase con los cuatro grupos por lengua (quechua, aimara, jaqaru y arawak), cada uno con 10 palabras funcionales. Yo participé en el grupo de quechua.',
  autoria: 'Captura de la clase teórica',
  src: padlet,
  alt: 'Tablero de Padlet con cuatro columnas: Grupo 1 Quechua, Grupo 2 Aymara, Grupo 3 Jaqaru y Grupo 4 Arawak, con las integrantes de cada grupo y listas de palabras funcionales con su traducción al castellano.',
}

const materiales: EvidenciaGaleria = {
  tipo: 'galeria',
  id: 'materiales-tdl',
  titulo: 'Materiales de difusión sobre el TDL',
  descripcion: 'Materiales que elaboré para familias, docentes y comunidad a partir de la información reunida en la práctica anterior.',
  materiales: [
    {
      id: 'infografia',
      nombre: 'Infografía',
      formato: 'Imagen',
      modalidad: 'Individual',
      publico: 'las familias',
      descripcion: '«Trastorno del Desarrollo del Lenguaje (TDL): comprenderlo también es incluirlo». Tres bloques: ¿qué es el TDL?, ¿cómo reconocemos a un niño con TDL? y ¿cómo podemos ayudar en casa y en la escuela?',
      paginas: [
        {
          src: infografia,
          etiqueta: 'Infografía completa',
          alt: 'Infografía «Trastorno del Desarrollo del Lenguaje (TDL). Comprenderlo también es incluirlo», con tres secciones: qué es el TDL; cómo reconocerlo en el habla, el vocabulario y la gramática, la comunicación social y otros datos; y cómo ayudar en la comunicación diaria, en casa y en la escuela.',
        },
      ],
    },
    {
      id: 'diptico',
      nombre: 'Díptico',
      formato: 'Impreso, 2 caras',
      modalidad: 'Individual',
      publico: 'las familias',
      descripcion: 'Díptico para familias con el lema «Comprenderlo también es incluirlo». El interior explica qué es el TDL, cómo reconocerlo y cómo ayudar, con ejemplos para cada recomendación.',
      paginas: [
        {
          src: dipticoExterior,
          etiqueta: 'Cara exterior',
          alt: 'Cara exterior del díptico: a la derecha la portada «Trastorno del Desarrollo del Lenguaje (TDL). Comprenderlo también es incluirlo» con un niño ilustrado; a la izquierda los mensajes «El TDL no define su potencial» y «Familia + Escuela + Profesionales = Más inclusión».',
        },
        {
          src: dipticoInterior,
          etiqueta: 'Cara interior',
          alt: 'Cara interior del díptico con tres secciones: qué es el TDL, cómo reconocer a un niño con TDL con ejemplos, y cómo ayudar en la comunicación diaria, en casa y en la escuela, con ejemplos de frases.',
        },
      ],
    },
    {
      id: 'charla',
      nombre: 'Charla en PPT',
      formato: `Presentación, ${diapositivas.length} diapositivas`,
      modalidad: 'Individual',
      publico: 'docentes y promotores',
      descripcion: '«Guía educativa: Trastorno del Desarrollo del Lenguaje (TDL). Definición, características y actividades», dirigida a docentes y promotores.',
      paginas: diapositivas.map((src, i) => ({
        src,
        etiqueta: `Diapositiva ${i + 1}: ${titulosCharla[i] ?? ''}`.replace(/: $/, ''),
        alt: `Diapositiva ${i + 1} de la guía educativa sobre el TDL${titulosCharla[i] ? `: ${titulosCharla[i]}` : ''}.`,
      })),
    },
    {
      id: 'video',
      nombre: 'Guion de video',
      formato: 'Video de 4 minutos, 5 segmentos',
      modalidad: 'Individual',
      publico: 'las redes',
      descripcion: '«¿Qué es el TDL?»: guion para un video en el que presento qué es el TDL, cómo reconocerlo y cómo podemos ayudar en casa y en la escuela.',
      paginas: [],
      guion: guionVideo as SegmentoGuion[],
    },
  ],
}

const guionGrupal: EvidenciaDialogo = {
  tipo: 'dialogo',
  id: 'guion-tiktok',
  titulo: 'Guion grupal de TikTok — Trastorno del Desarrollo del Lenguaje (TDL)',
  descripcion: 'Evidencia de la planificación del video educativo que elaboramos en grupo.',
  introduccion:
    'Con este video quisimos que las familias y la comunidad reconozcan algunas señales del TDL y sepan que, si las dificultades persisten, pueden consultar a un terapeuta de lenguaje. El guion empieza con preguntas a los padres, explica qué es el TDL y cierra con un llamado a la acción.',
  escenas: guionTiktok,
  integrantes: {
    titulo: 'Integrantes del trabajo grupal',
    nombres: ['Kimberli Zaleth Cardozo Casimiro', 'Mayra Ayala', 'Ximena Abanto', 'Claudia de la Cruz', 'Alessandra Padilla', 'Daniela Yupanqui', 'Arantza Gamarra', 'Ana Purca'],
  },
  relacionado: {
    texto: 'Este guion fue la base del video de difusión comunitaria presentado en la práctica de la semana 4.',
    href: '#semana-4-practica-evidencia',
    boton: 'Ver el video en la semana 4',
  },
  archivo: { href: wordGuionTiktok, nombre: 'Evidencia practica semana 3 - Guion TikTok.docx' },
}

export const semana03: Semana = {
  numero: 3,
  slug: 'semana-3',
  titulo: 'RBC: de los principios a la práctica',
  sesiones: [
    { tipo: 'Teoría', fecha: 'Miércoles 2 de septiembre de 2026', fechaISO: '2026-09-02' },
    { tipo: 'Práctica', fecha: 'Sábado 5 de septiembre de 2026', fechaISO: '2026-09-05' },
  ],

  teoria: {
    titulo: 'Una práctica situada y culturalmente pertinente',
    introduccion: 'Clase 3 · Rehabilitación Basada en la Comunidad: de los principios a la práctica',
    bloques: [
      {
        id: 'inicio',
        tipo: 'evidencia',
        titulo: 'EVIDENCIA',
        descripcion: 'Actividad «A la práctica» de la clase teórica.',
        evidencia: evidenciaPadlet,
        contexto: {
          pregunta: '¿Qué aspectos prácticos garantizan que la Terapia de Lenguaje en RBC sea efectiva y culturalmente pertinente?',
          texto: 'La actividad fue «A la práctica» en Padlet: grupos por lengua (quechua, aimara, jaqaru y arawak), cada uno con 10 palabras funcionales.',
        },
      },
      {
        id: 'conceptos',
        tipo: 'conceptos',
        titulo: 'Conceptos clave',
        descripcion: 'Abre cada tarjeta para leer la definición completa.',
        conceptos: [
          {
            id: 'pertinencia',
            titulo: 'Pertinencia cultural y lingüística',
            sintesis: 'Adaptar la evaluación y la intervención a la lengua, las costumbres y los referentes de la comunidad.',
            desarrollo:
              'Es adaptar la evaluación y la intervención a la lengua, las costumbres y los referentes de la comunidad. Una diferencia lingüística, como hablar quechua en casa, no es un trastorno, y por eso se evalúa en la lengua materna siempre que sea posible.',
            cita: '(OMS et al., 2010)',
          },
          {
            id: 'contexto',
            titulo: 'Contexto comunitario (diagnóstico situado)',
            sintesis: 'Conocer actores, recursos, rutinas y festividades del territorio antes de diseñar cualquier intervención.',
            desarrollo:
              'Es conocer actores, recursos, rutinas y festividades del territorio antes de diseñar cualquier intervención. El mapeo comunitario es el primer paso, no un trámite.',
            cita: '(OMS et al., 2010)',
          },
          {
            id: 'colaboracion',
            titulo: 'Colaboración interdisciplinaria e intersectorial',
            sintesis: 'El terapeuta es una pieza de un equipo ampliado: los resultados sostenibles se logran en red.',
            desarrollo:
              'El terapeuta es una pieza de un equipo ampliado (salud, educación, protección social) y los resultados sostenibles se logran en red.',
            cita: '(OMS et al., 2010)',
          },
        ],
      },
      {
        id: 'mapa',
        tipo: 'mapa',
        titulo: 'Mapa conceptual interactivo',
        descripcion: 'Los nueve aspectos de la clase, ordenados en el flujo de intervención comunitaria.',
        mapa: {
          nota: 'Elaboración propia a partir de la presentación de la clase de la semana 3, que organiza los nueve aspectos en un flujo de cuatro pasos.',
          raiz: {
            id: 'raiz',
            titulo: 'Terapia de Lenguaje en RBC',
            resumen: 'Efectiva y culturalmente pertinente',
            detalle: [
              '¿Qué aspectos prácticos garantizan que la Terapia de Lenguaje en RBC sea efectiva y culturalmente pertinente?',
              'La clase reconoce nueve aspectos clave —culturales, comunitarios, interdisciplinarios y éticos— y los organiza en un flujo de cuatro pasos para la intervención comunitaria.',
            ],
            fuente: PPT,
            hijos: [
              {
                id: 'paso-1',
                titulo: '1. Conocer el contexto',
                resumen: 'Antes de intervenir',
                relacion: 'se lleva a la práctica en',
                compacto: true,
                fuente: PPT,
                hijos: [
                  {
                    id: 'diversidad',
                    titulo: 'Diversidad cultural y lingüística',
                    relacion: 'integra',
                    detalle: ['Perú posee más de 48 lenguas originarias. Una diferencia lingüística no es un trastorno: la evaluación debe hacerse en la lengua materna siempre que sea posible.'],
                    lista: ['Evaluación pertinente', 'Materiales adaptados', 'Alianzas locales'],
                    fuente: PPT,
                  },
                  {
                    id: 'contexto-comunitario',
                    titulo: 'Contexto comunitario',
                    relacion: 'integra',
                    detalle: ['Ninguna intervención funciona si se diseña de espaldas al territorio: el mapeo comunitario es el primer paso, no un trámite opcional.'],
                    lista: ['Actores clave', 'Recursos del territorio', 'Diagnóstico situado'],
                    fuente: PPT,
                  },
                ],
              },
              {
                id: 'paso-2',
                titulo: '2. Planificar con pertinencia',
                resumen: 'Adaptar al territorio',
                relacion: 'se lleva a la práctica en',
                compacto: true,
                fuente: PPT,
                hijos: [
                  {
                    id: 'preventivo',
                    titulo: 'Enfoque preventivo y educativo',
                    relacion: 'integra',
                    detalle: ['Detectar a tiempo cuesta menos —en recursos y en desarrollo perdido— que intervenir cuando la dificultad ya está instalada.'],
                    lista: ['Estimulación temprana', 'Sensibilización', 'Materiales educativos'],
                    fuente: PPT,
                  },
                  {
                    id: 'adaptacion',
                    titulo: 'Adaptación de estrategias terapéuticas',
                    relacion: 'integra',
                    detalle: ['La técnica correcta es la que la familia puede sostener en casa, con lo que tiene a su alcance.'],
                    lista: ['Recursos locales', 'Flexibilidad horaria', 'SAAC pertinentes'],
                    fuente: PPT,
                  },
                  {
                    id: 'acceso',
                    titulo: 'Acceso y equidad',
                    relacion: 'integra',
                    detalle: ['El acceso equitativo exige atacar las tres barreras a la vez: resolver solo una no basta para llegar a todos.'],
                    lista: ['Barrera económica', 'Barrera geográfica', 'Barrera cultural'],
                    fuente: PPT,
                  },
                ],
              },
              {
                id: 'paso-3',
                titulo: '3. Intervenir en equipo',
                resumen: 'En red y con confianza',
                relacion: 'se lleva a la práctica en',
                compacto: true,
                fuente: PPT,
                hijos: [
                  {
                    id: 'colaboracion-inter',
                    titulo: 'Colaboración interdisciplinaria',
                    relacion: 'integra',
                    detalle: ['El terapeuta de lenguaje es una pieza del equipo, no una isla: los mejores resultados se sostienen en red.'],
                    lista: ['Equipo ampliado', 'Comunicación fluida', 'Redes intersectoriales (MINSA, MINEDU, MIDIS)'],
                    fuente: PPT,
                  },
                  {
                    id: 'sensibilidad',
                    titulo: 'Sensibilidad y respeto por la comunidad',
                    relacion: 'integra',
                    detalle: ['La confianza se gana escuchando primero: sin ella, ninguna estrategia terapéutica, por buena que sea, llega a sostenerse.'],
                    lista: ['Escuchar primero', 'Involucrar líderes', 'Sin imposiciones'],
                    fuente: PPT,
                  },
                ],
              },
              {
                id: 'paso-4',
                titulo: '4. Evaluar y mejorar',
                resumen: 'Medir y seguir aprendiendo',
                relacion: 'se lleva a la práctica en',
                compacto: true,
                fuente: PPT,
                hijos: [
                  {
                    id: 'monitoreo',
                    titulo: 'Evaluación y monitoreo continuo',
                    relacion: 'integra',
                    detalle: ['Lo que no se mide no se puede mejorar, y lo que se mide debe tener sentido para la comunidad, no solo para el terapeuta.'],
                    lista: ['Indicadores pertinentes', 'Registro participativo', 'Ajuste continuo'],
                    fuente: PPT,
                  },
                  {
                    id: 'capacitacion',
                    titulo: 'Capacitación continua',
                    relacion: 'integra',
                    detalle: ['El contexto comunitario cambia: el terapeuta que deja de aprender, deja de ser pertinente.'],
                    lista: ['Formación continua', 'Supervisión entre pares', 'Aprender de la comunidad'],
                    fuente: PPT,
                  },
                ],
              },
            ],
          },
          sintesis: {
            id: 'construir',
            titulo: 'Construir junto a la comunidad',
            resumen: 'No imponer soluciones',
            detalle: ['Una Terapia de Lenguaje verdaderamente comunitaria no impone soluciones: las construye junto a la comunidad.'],
            fuente: PPT,
          },
        },
      },
      {
        id: 'rol',
        tipo: 'rol',
        titulo: 'Rol del terapeuta de lenguaje',
        descripcion: 'Elige una acción para ver con quién y en qué se articula.',
        rol: {
          lema: 'En la comunidad, el terapeuta de lenguaje no llega con soluciones hechas.',
          etiquetaEnfoque: 'Conexión con el rol',
          enfoque:
            'En la comunidad, el terapeuta de lenguaje no llega con soluciones hechas: primero escucha y mapea el territorio, adapta evaluación y materiales a la lengua y rutinas de las familias, y trabaja con promotores, docentes y salud. Así sus estrategias son las que la familia puede sostener en casa, y la intervención se ajusta con datos que tengan sentido para la comunidad.',
          fuente: 'Ficha de teoría de la semana 3.',
          funciones: [
            { id: 'escucha', verbo: 'Escucha y mapea', descripcion: 'el territorio antes de intervenir.', vinculos: ['Territorio'] },
            { id: 'adapta', verbo: 'Adapta', descripcion: 'evaluación y materiales a la lengua y rutinas de las familias.', vinculos: ['Evaluación', 'Materiales', 'Lengua de las familias', 'Rutinas de las familias'] },
            { id: 'trabaja', verbo: 'Trabaja en red', descripcion: 'con promotores, docentes y salud.', vinculos: ['Promotores', 'Docentes', 'Salud'] },
          ],
        },
      },
    ],
  },

  practica: {
    titulo: 'Difusión',
    proposito: 'Convertir información técnica en mensajes claros, breves y accesibles para familias y comunidad.',
    actividad:
      'Con la información reunida en las prácticas anteriores, elaboré materiales de difusión para la comunidad: una infografía, un díptico, una charla en PPT y el guion de un video de 4 minutos. Además, mi grupo preparó el guion de un TikTok sobre el trastorno del desarrollo del lenguaje (TDL), que nos tocó como tema. Para el guion seguimos el esquema de cuatro partes: un gancho inicial, el desarrollo con la información clave, el mensaje central y un cierre con llamado a la acción.',
    etiquetaCategorias: 'Materiales elaborados',
    categorias: ['Infografía', 'Díptico', 'Charla en PPT', 'Guion de video (4 minutos)', 'Guion de TikTok (grupal)'],
    modalidad: 'El guion del TikTok fue grupal. La infografía, el díptico, el guion del video y la PPT fueron individuales.',
    producto: 'Archivos externos.',
    aprendizaje: [
      'Aprendí que difundir no es copiar información técnica, sino traducirla a un lenguaje sencillo y centrarla en una sola idea para un público concreto. El guion de TikTok me mostró que en pocos segundos hay que captar la atención, decir lo esencial y dejar claro qué hacer después, como acudir a un centro de salud.',
      'En un contexto comunitario real usaría estos materiales en el centro de salud, la escuela o el PRONOEI. Los dípticos y las infografías irían a las familias, la charla a docentes y promotores, y el video a las redes. Antes de difundir revisaría que el lenguaje sea respetuoso, que lleve subtítulos y que cite fuentes confiables, y que no muestre rostros de niñas, niños ni de pacientes sin consentimiento.',
    ],
    evidencia: {
      titulo: 'Del conocimiento técnico a la comunidad',
      descripcion: 'Evidencia de la práctica: infografía, díptico, charla en PPT y guion de video, cada uno pensado para un público.',
      boton: 'Ver los materiales',
    },
  },

  reflexion: {
    modelo: { nombre: 'Modelo reflexivo de Rolfe, Freshwater y Jasper', cita: '(Rolfe et al., 2001)' },
    destacada: 'Un material que la familia no entiende no cumple su función de informar.',
    original:
      'Esta semana pasamos de recopilar información a elaborar materiales para la comunidad: una infografía, un díptico, una charla en PPT y el guion de un video, todos sobre el TDL, además del guion de un TikTok en grupo. Lo que más me costó fue resumir el TDL en lenguaje sencillo sin perder lo importante, porque la información que tenía era bastante técnica. Esto es relevante porque un material que la familia no entiende no cumple su función de informar. En una comunidad real, probaría el material con padres o docentes antes de difundirlo. Tengo que mejorar en reducir el texto y en dejar claro qué debe hacer la persona después de leer.',
    etapas: [
      {
        id: 'que',
        pregunta: '¿Qué?',
        accion: 'Describir',
        proposito: 'Presento los hechos y aprendizajes principales de la semana.',
        respuestas: [
          {
            pregunta: '¿Qué hicimos o aprendimos esta semana?',
            texto: 'Esta semana pasamos de recopilar información a elaborar materiales para la comunidad: una infografía, un díptico, una charla en PPT y el guion de un video, todos sobre el TDL, además del guion de un TikTok en grupo.',
          },
          {
            pregunta: '¿Qué me llamó la atención o me sorprendió?',
            texto: 'Lo que más me costó fue resumir el TDL en lenguaje sencillo sin perder lo importante, porque la información que tenía era bastante técnica.',
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
            texto: 'Esto es relevante porque un material que la familia no entiende no cumple su función de informar.',
          },
          {
            pregunta: '¿Cómo se relaciona con la teoría o con lo que ya sabía?',
            texto: 'Aprendí que difundir no es copiar información técnica, sino traducirla a un lenguaje sencillo y centrarla en una sola idea para un público concreto.',
            origen: 'práctica',
          },
          {
            pregunta: '¿Qué significa para mi formación como futura terapeuta de lenguaje?',
            texto: 'El guion de TikTok me mostró que en pocos segundos hay que captar la atención, decir lo esencial y dejar claro qué hacer después, como acudir a un centro de salud.',
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
            texto: 'En una comunidad real, probaría el material con padres o docentes antes de difundirlo.',
          },
          {
            pregunta: '¿Y en un contexto comunitario real?',
            texto: 'Usaría estos materiales en el centro de salud, la escuela o el PRONOEI. Los dípticos y las infografías irían a las familias, la charla a docentes y promotores, y el video a las redes.',
            origen: 'práctica',
          },
          {
            pregunta: '¿Qué necesito reforzar o seguir aprendiendo?',
            texto: 'Tengo que mejorar en reducir el texto y en dejar claro qué debe hacer la persona después de leer.',
          },
        ],
      },
    ],
  },

  evidencias: { teoria: [evidenciaPadlet], practica: [materiales, guionGrupal] },

  referencias: [
    {
      id: 'oms-2010',
      fragmentos: [
        { texto: 'Organización Mundial de la Salud, Organización Internacional del Trabajo, UNESCO e International Disability and Development Consortium. (2010). ' },
        { texto: 'Rehabilitación basada en la comunidad: Guías para la RBC', cursiva: true },
        { texto: '. OMS.' },
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

import type { EvidenciaCaso, EvidenciaRevision, ParRevision, Semana } from '../../tipos'
import comparacion from './tamizaje-revisado.json'
import pict1 from '../../../assets/semana-5/pict24/pagina-1.jpg'
import pict2 from '../../../assets/semana-5/pict24/pagina-2.jpg'
import pict3 from '../../../assets/semana-5/pict24/pagina-3.jpg'
import pict4 from '../../../assets/semana-5/pict24/pagina-4.jpg'
import wordRevisado from '../../../assets/semana-7/tamizaje-revisado.docx?url'

/**
 * Semana 7 — contenido tomado de «Portafolio semana 7» (Word), la presentación «CLASE SEMANA 7»,
 * el protocolo revisado («Evidencia de practica corregida Tamizaje - CSBS», Word) y el cuestionario
 * CSBS-DP (PDF). La comparación con el PICT-24 de la semana 5 se genera con
 * `scripts/comparar_tamizaje.py`, sin alterar los textos de ninguno de los dos documentos.
 */

const PPT = 'Presentación de clase «Atención primaria: el terapeuta de lenguaje en el primer nivel de atención», semana 7'
// Archivos servidos aparte (public/media/semana-7) para no recargar la página.
const MEDIA = `${import.meta.env.BASE_URL}media/semana-7`
const INTEGRANTES = { titulo: 'Integrantes del trabajo grupal', nombres: ['Kimberli Zaleth Cardozo Casimiro', 'Ximena Abanto', 'Arantza Gamarra', 'Claudia de la Cruz'] }

const casoMateo: EvidenciaCaso = {
  tipo: 'caso',
  id: 'caso-mateo',
  titulo: 'Caso aplicado: Mateo (2 años y 6 meses)',
  descripcion: 'Actividad en equipos en Padlet: analizar el caso y responder cinco preguntas.',
  persona: { nombre: 'Mateo', edad: '2 años y 6 meses', contexto: 'Asiste a un servicio de Cuna Más en un asentamiento humano de Lima Norte.' },
  datos: [
    { grupo: 'Lo que comenta su madre', items: ['«Dice muy pocas palabras»', 'A veces no voltea cuando lo llaman'] },
    { grupo: 'Contexto familiar', items: ['En casa se habla quechua y castellano'] },
    { grupo: 'Salud', items: ['Controles CRED incompletos', 'Sin registro de tamizaje auditivo'] },
  ],
  preguntas: [
    {
      pregunta: '¿Qué señales de alerta identifican?',
      orientacion: [
        '12 meses: no balbucea, no usa gestos (señalar, decir adiós), no responde a su nombre.',
        '16–18 meses: no dice palabras sueltas, no comprende órdenes simples con gesto.',
        '24 meses: no combina dos palabras de forma espontánea; su habla es poco comprensible para la familia.',
        'A cualquier edad: pérdida de habilidades ya adquiridas; no reacciona a sonidos o voces.',
      ],
      nota: 'Referencial. Contrastar con la NTS N.° 137-MINSA/2017 (Control de Crecimiento y Desarrollo) y la bibliografía del curso antes de su uso formal.',
    },
    {
      pregunta: '¿Qué acciones de detección realizarían y dónde?',
      orientacion: [
        'Observación, tamizajes o pruebas breves para identificar señales de alerta en comunicación y audición, y decidir si derivar a evaluación o intervenir tempranamente.',
        'Dónde: I.E. y PRONOEI, Cuna Más, control CRED, campañas comunitarias y centros del adulto mayor.',
      ],
    },
    {
      pregunta: '¿Cómo harían una evaluación culturalmente pertinente?',
      orientacion: [
        'Evaluación contextualizada, funcional y culturalmente pertinente: entrevistas a padres y docentes, y observación del niño en actividades naturales.',
        'En familias bilingües (p. ej. quechua–castellano) se evalúa en ambas lenguas; el bilingüismo no es un trastorno.',
      ],
    },
    {
      pregunta: '¿A quién derivarían y con quién se articularían?',
      orientacion: [
        'Referencia a los niveles II y III cuando se requiere evaluación o tratamiento especializado (audiología, ORL, neuropediatría, cirugía de fisura), con contrarreferencia para la continuidad.',
        'Articulación con enfermería (control CRED), pediatría, psicología, docentes y trabajo social.',
      ],
    },
    {
      pregunta: '¿Qué estrategias propondrían a la familia y a la Cuna?',
      orientacion: ['Padres y cuidadores definen metas y aplican estrategias en rutinas diarias (comida, baño, juego).', 'Talleres de lectura compartida y juego con familias; la familia como co-terapeuta.'],
    },
  ],
  fuente: 'Caso presentado en la clase de la semana 7.',
  pendiente:
    'Las respuestas del equipo se registraron en el Padlet de la clase. Su captura no está entre los materiales del portafolio, por eso aquí se muestran solo las preguntas y lo que orienta la clase.',
  integrantes: INTEGRANTES,
}

const revision: EvidenciaRevision = {
  tipo: 'revision',
  id: 'revision-tamizaje',
  titulo: 'Semana 5: propuesta inicial → Semana 7: revisión y mejora',
  descripcion: 'Las dos versiones del protocolo y ejemplos de las adaptaciones lingüísticas que realizamos.',
  versiones: [
    {
      semana: 'Semana 5',
      etapa: 'Propuesta inicial',
      nombre: 'PICT-24 | Perú',
      paginas: [pict1, pict2, pict3, pict4].map((src, i) => ({ src, alt: `Página ${i + 1} de la ficha PICT-24 | Perú (semana 5).` })),
    },
    {
      semana: 'Semana 7',
      etapa: 'Revisión y mejora',
      nombre: 'Tamizaje · versión revisada',
      paginas: [1, 2, 3].map((n) => ({ src: `${MEDIA}/revisado/pagina-${n}.jpg`, alt: `Página ${n} de la versión revisada del tamizaje (semana 7).` })),
    },
  ],
  adaptaciones: [
    {
      id: 'cotidianas',
      titulo: 'Palabras más cotidianas',
      descripcion: 'Términos técnicos reemplazados por expresiones más fáciles de entender.',
      ejemplos: ['E3', 'J2', 'R10'],
    },
    {
      id: 'ejemplos',
      titulo: 'Ejemplos concretos',
      descripcion: 'Conductas acompañadas de ejemplos de la vida diaria.',
      ejemplos: ['E6', 'E7', 'R5'],
    },
    {
      id: 'directas',
      titulo: 'Conductas descritas de forma más directa',
      descripcion: 'Se retiraron matices como «de manera intencional» o «intencionalmente».',
      ejemplos: ['I2', 'I3'],
    },
    {
      id: 'indicaciones',
      titulo: 'Indicaciones para quien aplica',
      descripcion: 'Varias situaciones de aplicación se acortaron o ya no figuran.',
      ejemplos: ['R3', 'I1'],
    },
  ],
  rangos: comparacion.rangos as { rango: string; pares: ParRevision[] }[],
  referencia: {
    nombre: 'CSBS DP Cuestionario del bebé y niño pequeño',
    archivo: 'EVIDENCIA DE PRACTICA CSBS-DP CUESTIONARIO',
    paginas: [{ src: `${MEDIA}/csbs-dp/pagina-1.jpg`, alt: 'CSBS DP Cuestionario del bebé y niño pequeño, en blanco, con 24 preguntas agrupadas en siete áreas.' }],
  },
  integrantes: INTEGRANTES,
  archivo: { href: wordRevisado, nombre: 'Evidencia de practica corregida Tamizaje - CSBS.docx' },
}

export const semana07: Semana = {
  numero: 7,
  slug: 'semana-7',
  titulo: 'Atención primaria: el terapeuta de lenguaje en el primer nivel de atención',
  sesiones: [
    { tipo: 'Teoría', fecha: 'Miércoles 30 de septiembre de 2026', fechaISO: '2026-09-30' },
    { tipo: 'Práctica', fecha: 'Sábado 3 de octubre de 2026', fechaISO: '2026-10-03' },
  ],

  teoria: {
    titulo: 'Promover, prevenir y detectar a tiempo',
    introduccion: 'Clase 7 · Atención primaria: el terapeuta de lenguaje en el primer nivel de atención',
    bloques: [
      {
        id: 'inicio',
        tipo: 'evidencias',
        titulo: 'EVIDENCIA',
        descripcion: 'Caso aplicado trabajado en equipos durante la clase teórica.',
        evidencias: [casoMateo],
        procedencia: 'Evidencia de teoría',
      },
      {
        id: 'conceptos',
        tipo: 'conceptos',
        titulo: 'Conceptos clave',
        descripcion: 'Abre cada tarjeta para leer la definición completa.',
        conceptos: [
          {
            id: 'atencion-primaria',
            titulo: 'Atención primaria desde la terapia de lenguaje comunitaria',
            sintesis: 'Llevar el servicio a donde las personas viven, aprenden y se desarrollan.',
            desarrollo:
              'Es el primer nivel de contacto de la persona, la familia y la comunidad con los servicios de salud y educación. Implica llevar el servicio del terapeuta a donde las personas viven, aprenden y se desarrollan, con participación de la familia. La APS es una estrategia, y el primer nivel de atención (establecimientos I-1 a I-4 del MINSA y escenarios comunitarios) es el espacio donde se concreta.',
            cita: '(OMS, 1978; OMS y UNICEF, 2018)',
          },
          {
            id: 'ruta',
            titulo: 'Ruta de atención del primer nivel',
            sintesis: 'Seis acciones articuladas que no siguen un orden lineal.',
            desarrollo:
              'Es un continuo articulado de seis acciones: promoción, prevención, detección temprana, evaluación, intervención y seguimiento. No es lineal, porque lo aprendido en el seguimiento retroalimenta la promoción y la prevención en la misma comunidad.',
            cita: 'Ficha de teoría, semana 7',
          },
          {
            id: 'prevencion',
            titulo: 'Niveles de prevención en comunicación',
            sintesis: 'Primaria, secundaria y terciaria; en la AP comunitaria predominan las dos primeras.',
            desarrollo:
              'La primaria evita que aparezca el trastorno (educación a familias, lectura compartida, cuidado auditivo), la secundaria detecta y actúa precozmente (tamizaje, control CRED, alertas en el aula) y la terciaria reduce secuelas y favorece la participación (rehabilitación en la comunidad, comunicación aumentativa, inclusión). En la AP comunitaria predominan la primaria y la secundaria.',
            cita: '(Leavell y Clark, 1965)',
          },
        ],
      },
      {
        id: 'mapa',
        tipo: 'mapa',
        titulo: 'Mapa conceptual interactivo',
        descripcion: 'La atención primaria, los niveles de prevención y la ruta de atención del terapeuta de lenguaje.',
        mapa: {
          nota: 'Elaboración propia a partir de la presentación de la clase de la semana 7.',
          raiz: {
            id: 'raiz',
            titulo: 'El terapeuta de lenguaje en el primer nivel de atención',
            resumen: 'Atención primaria en la práctica',
            detalle: ['La AP acerca al terapeuta de lenguaje a donde las personas viven, aprenden y se desarrollan. Promover, prevenir y detectar a tiempo evita que las dificultades se cronifiquen.'],
            fuente: PPT,
            hijos: [
              {
                id: 'ap',
                titulo: 'Atención primaria',
                resumen: 'Primer contacto con los servicios de salud y educación',
                relacion: 'se basa en la',
                detalle: ['Primer nivel de contacto entre la persona, la familia y la comunidad con los servicios de salud y educación.'],
                fuente: PPT,
                hijos: [
                  {
                    id: 'aps-nivel',
                    titulo: 'APS y primer nivel',
                    resumen: 'Una estrategia y el espacio donde se concreta',
                    relacion: 'distingue',
                    detalle: ['La APS es una estrategia (Alma-Ata, 1978; Astaná, 2018); el primer nivel de atención es el espacio donde se concreta: establecimientos I-1 a I-4 del MINSA y los escenarios comunitarios.'],
                    fuente: PPT,
                  },
                  {
                    id: 'objetivos',
                    titulo: 'Objetivos',
                    resumen: 'Desarrollo comunicativo funcional y equitativo',
                    relacion: 'busca',
                    detalle: ['Garantizar el desarrollo comunicativo funcional y equitativo de la población, fortaleciendo las competencias lingüísticas y sociales desde edades tempranas.'],
                    lista: ['Prevenir y promover', 'Reducir brechas de acceso', 'Empoderar aliados: agentes comunitarios, docentes y familias'],
                    fuente: PPT,
                  },
                  {
                    id: 'caracteristicas',
                    titulo: 'Características',
                    resumen: 'Seis rasgos en el trabajo comunitario',
                    relacion: 'se caracteriza por ser',
                    fuente: PPT,
                    hijos: [
                      { id: 'accesible', titulo: 'Accesible', detalle: ['Tamizajes en la I.E. inicial, el PRONOEI o el local comunal, no solo en el consultorio.'], fuente: PPT },
                      { id: 'integral', titulo: 'Integral', detalle: ['Al valorar la comunicación, considerar audición, alimentación, sueño, vínculo y contexto familiar.'], fuente: PPT },
                      { id: 'participativa', titulo: 'Participativa', detalle: ['Padres y cuidadores definen metas y aplican estrategias en rutinas diarias (comida, baño, juego).'], fuente: PPT },
                      { id: 'interdisciplinaria', titulo: 'Interdisciplinaria', detalle: ['Coordinación con enfermería (control CRED), pediatría, psicología, docentes y trabajo social.'], fuente: PPT },
                      { id: 'preventiva', titulo: 'Preventiva y promotora', detalle: ['Talleres de lectura compartida y juego con familias antes de que aparezcan dificultades.'], fuente: PPT },
                      { id: 'sostenible', titulo: 'Sostenible', detalle: ['Formación de promotores y agentes comunitarios que continúan las acciones en el tiempo.'], fuente: PPT },
                    ],
                  },
                ],
              },
              {
                id: 'niveles',
                titulo: 'Niveles de prevención',
                resumen: 'En la AP predominan la primaria y la secundaria',
                relacion: 'actúa en tres',
                detalle: ['Adaptado de Leavell y Clark (1965). En la AP comunitaria predominan las acciones de nivel primario y secundario.'],
                fuente: PPT,
                hijos: [
                  {
                    id: 'primaria',
                    titulo: 'Primaria',
                    resumen: 'Evitar que aparezca el trastorno',
                    relacion: 'incluye la',
                    lista: ['Educación a gestantes y familias sobre estimulación del lenguaje', 'Lectura compartida y juego en rutinas', 'Cuidado auditivo: ruido, otitis, vacunación'],
                    fuente: PPT,
                  },
                  {
                    id: 'secundaria',
                    titulo: 'Secundaria',
                    resumen: 'Detectar y actuar precozmente',
                    relacion: 'incluye la',
                    lista: ['Tamizaje auditivo neonatal', 'Vigilancia del desarrollo en el control CRED', 'Señales de alerta identificadas en el aula'],
                    fuente: PPT,
                  },
                  {
                    id: 'terciaria',
                    titulo: 'Terciaria',
                    resumen: 'Reducir secuelas y favorecer la participación',
                    relacion: 'incluye la',
                    lista: ['Intervención y rehabilitación en la comunidad (RBC)', 'Sistemas aumentativos y alternativos de comunicación', 'Apoyo a la inclusión escolar y social'],
                    fuente: PPT,
                  },
                ],
              },
              {
                id: 'ruta-atencion',
                titulo: 'Ruta de atención',
                resumen: 'Seis acciones articuladas',
                relacion: 'se organiza en una',
                detalle: ['No es una ruta lineal: lo aprendido en el seguimiento retroalimenta las acciones de promoción y prevención en la misma comunidad.'],
                fuente: PPT,
                hijos: [
                  {
                    id: 'acciones',
                    titulo: 'Las seis acciones',
                    resumen: 'De la promoción al seguimiento',
                    relacion: 'reúne',
                    fuente: PPT,
                    hijos: [
                      { id: 'promocion', titulo: '1. Promoción', detalle: ['Fomentar entornos que favorecen la comunicación: charlas, talleres y capacitación a familias, docentes y agentes comunitarios.'], fuente: PPT },
                      { id: 'prevencion-paso', titulo: '2. Prevención', detalle: ['Reducir factores de riesgo.'], fuente: PPT },
                      { id: 'deteccion', titulo: '3. Detección temprana', detalle: ['Identificar señales de alerta mediante observación, tamizajes o pruebas breves, en la I.E., el PRONOEI, Cuna Más, el control CRED o campañas comunitarias.'], fuente: PPT },
                      { id: 'evaluacion', titulo: '4. Evaluación', detalle: ['Precisar fortalezas y necesidades de forma contextualizada, funcional y culturalmente pertinente.'], fuente: PPT },
                      { id: 'intervencion', titulo: '5. Intervención', detalle: ['Plan funcional con la familia, con estrategias lúdicas, recursos locales y la familia como co-terapeuta.'], fuente: PPT },
                      { id: 'seguimiento', titulo: '6. Seguimiento', detalle: ['Monitorear, referir y sostener logros.'], fuente: PPT },
                    ],
                  },
                  {
                    id: 'referencia',
                    titulo: 'Referencia y contrarreferencia',
                    resumen: 'Articulación con los niveles II y III',
                    relacion: 'se conecta mediante',
                    detalle: [
                      'Referencia cuando se requiere evaluación o tratamiento especializado; contrarreferencia como retorno con indicaciones para la continuidad.',
                      'El terapeuta de lenguaje en el primer nivel registra, deriva oportunamente, coordina con la red y sostiene la intervención en la comunidad.',
                    ],
                    fuente: PPT,
                  },
                ],
              },
            ],
          },
          sintesis: {
            id: 'sintesis',
            titulo: 'Conexión con el rol',
            resumen: 'Promueve, previene, detecta, evalúa, interviene y da seguimiento',
            detalle: [
              'El terapeuta de lenguaje en el primer nivel promueve, previene, detecta, evalúa, interviene y da seguimiento junto con la familia, la escuela y el equipo de salud. Tamiza en espacios como Cuna Más, PRONOEI o el control CRED, evalúa respetando la lengua y la cultura de la familia, y deriva y recibe el retorno de los hospitales. Así evita que las dificultades se cronifiquen.',
            ],
            fuente: 'Ficha de teoría de la semana 7.',
          },
        },
      },
    ],
  },

  practica: {
    titulo: 'Revisión y adaptación del protocolo de tamizaje',
    proposito: 'Pulir el protocolo y dejarlo en una versión más precisa, para que pueda aplicarse en la comunidad.',
    actividad:
      'En esta sesión revisé, junto con mi grupo, el protocolo de tamizaje que habíamos creado en la Práctica 5 a partir del CSBS, el Cuestionario de intenciones comunicativas y la Escala R.E.E.L. Según las pautas de la clase, la revisión incluía las adaptaciones lingüísticas del protocolo, es decir, comprobar que las preguntas y las instrucciones estuvieran redactadas de forma clara y comprensible para quienes las aplican y para las familias.',
    etiquetaCategorias: 'Qué revisamos',
    categorias: ['Redacción de las preguntas', 'Instrucciones', 'Comprensión para quienes aplican', 'Comprensión para las familias'],
    modalidad: 'Grupal, con Ximena Abanto, Arantza Gamarra y Claudia de la Cruz.',
    producto: 'Archivo de la versión revisada del protocolo.',
    aprendizaje: [
      'Aprendí que un protocolo no queda terminado en la primera versión. Revisarlo permite detectar frases confusas, términos demasiado técnicos o preguntas que se pueden entender de más de una forma. También vi que adaptar un instrumento no es solo traducirlo, sino ajustarlo al lenguaje y al contexto de las personas que lo van a usar.',
      'En un contexto comunitario real probaría el protocolo con algunas familias y con promotores o docentes, para comprobar que se entiende y que sirve para detectar a tiempo. Con lo que observe lo seguiría mejorando y derivaría a evaluación especializada cuando el tamizaje lo indique.',
    ],
    evidencia: {
      titulo: 'Evolución del protocolo de tamizaje',
      descripcion: 'Evidencia de la práctica: del PICT-24 de la semana 5 a su versión revisada.',
      boton: 'Ver la comparación',
    },
  },

  reflexion: {
    modelo: { nombre: 'Modelo reflexivo de Rolfe, Freshwater y Jasper', cita: '(Rolfe et al., 2001)' },
    destacada: 'El trabajo comunitario funciona cuando cada acción conduce a la siguiente.',
    original:
      'Esta semana vimos la atención primaria en la práctica del terapeuta de lenguaje, con una ruta que va de la promoción a la prevención, la detección temprana, la evaluación, la intervención y el seguimiento, y revisamos el protocolo de tamizaje que hicimos en grupo. Entendí que el tamizaje y los materiales de difusión que trabajé son partes de una misma ruta y no actividades sueltas. Eso importa porque el trabajo comunitario funciona cuando cada acción conduce a la siguiente, incluida la derivación a otros niveles. Con una familia o una escuela, aplicaría esta ruta empezando por la promoción y por la detección de señales de alerta. Me falta practicar cómo registrar la información utilizando PICT24 que creamos, y el CSBS como base adicional para tener mayores respuestas y resultados.',
    etapas: [
      {
        id: 'que',
        pregunta: '¿Qué?',
        accion: 'Describir',
        proposito: 'Presento qué aprendí y qué actividades realizamos.',
        respuestas: [
          {
            pregunta: '¿Qué actividades realizamos?',
            texto:
              'Esta semana vimos la atención primaria en la práctica del terapeuta de lenguaje, con una ruta que va de la promoción a la prevención, la detección temprana, la evaluación, la intervención y el seguimiento, y revisamos el protocolo de tamizaje que hicimos en grupo.',
          },
          {
            pregunta: '¿Qué aprendí?',
            texto: 'Aprendí que un protocolo no queda terminado en la primera versión.',
            origen: 'práctica',
          },
        ],
      },
      {
        id: 'y-que',
        pregunta: '¿Y qué?',
        accion: 'Analizar',
        proposito: 'Explico cómo comprendí la relación entre atención primaria, tamizaje y derivación.',
        respuestas: [
          {
            pregunta: '¿Cómo se relacionan la atención primaria, el tamizaje y la derivación?',
            texto:
              'Entendí que el tamizaje y los materiales de difusión que trabajé son partes de una misma ruta y no actividades sueltas. Eso importa porque el trabajo comunitario funciona cuando cada acción conduce a la siguiente, incluida la derivación a otros niveles.',
          },
          {
            pregunta: '¿Qué significa para mi formación como futura terapeuta de lenguaje?',
            texto: 'Vi que adaptar un instrumento no es solo traducirlo, sino ajustarlo al lenguaje y al contexto de las personas que lo van a usar.',
            origen: 'práctica',
          },
        ],
      },
      {
        id: 'ahora-que',
        pregunta: '¿Ahora qué?',
        accion: 'Proyectar',
        proposito: 'Planteo cómo lo aplicaría y qué necesito seguir reforzando.',
        respuestas: [
          {
            pregunta: '¿Cómo lo aplicaría con una familia o una escuela?',
            texto: 'Con una familia o una escuela, aplicaría esta ruta empezando por la promoción y por la detección de señales de alerta.',
          },
          {
            pregunta: '¿Y en un contexto comunitario real?',
            texto:
              'Probaría el protocolo con algunas familias y con promotores o docentes, para comprobar que se entiende y que sirve para detectar a tiempo. Con lo que observe lo seguiría mejorando y derivaría a evaluación especializada cuando el tamizaje lo indique.',
            origen: 'práctica',
          },
          {
            pregunta: '¿Qué necesito seguir reforzando?',
            texto: 'Me falta practicar cómo registrar la información utilizando PICT24 que creamos, y el CSBS como base adicional para tener mayores respuestas y resultados.',
          },
        ],
      },
    ],
  },

  evidencias: { teoria: [], practica: [revision] },

  referencias: [
    {
      id: 'leavell-1965',
      fragmentos: [{ texto: 'Leavell, H. R. y Clark, E. G. (1965). ' }, { texto: 'Preventive medicine for the doctor in his community', cursiva: true }, { texto: ' (3.ª ed.). McGraw-Hill.' }],
    },
    {
      id: 'minsa-2017-cred',
      fragmentos: [
        { texto: 'Ministerio de Salud del Perú. (2017). ' },
        { texto: 'NTS N.° 137-MINSA/2017/DGIESP. Norma técnica de salud para el control del crecimiento y desarrollo de la niña y el niño menores de cinco años', cursiva: true },
        { texto: '. MINSA.' },
      ],
    },
    {
      id: 'oms-1978',
      fragmentos: [{ texto: 'Organización Mundial de la Salud. (1978). ' }, { texto: 'Declaración de Alma-Ata', cursiva: true }, { texto: '. Conferencia Internacional sobre Atención Primaria de Salud.' }],
    },
    {
      id: 'oms-unicef-2018',
      fragmentos: [{ texto: 'Organización Mundial de la Salud y UNICEF. (2018). ' }, { texto: 'Declaración de Astaná. Conferencia Mundial sobre Atención Primaria de Salud', cursiva: true }, { texto: '.' }],
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

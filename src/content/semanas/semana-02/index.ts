import type { EvidenciaFicha, EvidenciaImagen, Semana } from '../../tipos'
import tdl from './tdl.json'
import kahoot from '../../../assets/kahoot-semana-2.jpg'

/**
 * Semana 2 — contenido tomado de «Portafolio semana 2» (Word), «CLASE SEMANA 2» (presentación de clase)
 * y la hoja «TDL» de «Evidencia practicas semana 2» (Excel).
 */

const PPT = 'Presentación de clase, semana 2'

const evidenciaKahoot: EvidenciaImagen = {
  tipo: 'imagen',
  id: 'kahoot',
  titulo: 'Kahoot de inicio de clase',
  descripcion: 'Primera pregunta del Kahoot con el que empezó la clase: «¿En qué declaración internacional se definió la Atención Primaria de Salud (APS)?».',
  autoria: 'Captura de la clase teórica',
  src: kahoot,
  alt: 'Pantalla de Kahoot con la pregunta «¿En qué declaración internacional se definió la Atención Primaria de Salud (APS)?» y cuatro opciones: Declaración de Alma-Ata (1978), Carta de Ottawa (1986), Declaración de Yakarta (1997) y Carta de Bangkok (2005).',
}

const fichaTDL: EvidenciaFicha = {
  tipo: 'ficha',
  id: 'ficha-tdl',
  titulo: 'Hoja «TDL»',
  tema: tdl.hoja,
  descripcion: 'Mi trabajo individual sobre el trastorno del desarrollo del lenguaje: definición, características y actividades.',
  fuente: 'Excel «Evidencia practicas semana 2», hoja «TDL».',
  definicion: tdl.definicion,
  caracteristicas: tdl.caracteristicas,
  rasgos: ['Retraso en la adquisición del habla', 'Limitado conocimiento léxico-semántico', 'Fallas constantes en la concordancia de género, número y/o tiempos verbales al construir sus oraciones'],
  actividades: tdl.actividades,
  celdas: tdl.celdas,
}

export const semana02: Semana = {
  numero: 2,
  slug: 'semana-2',
  titulo: 'Rehabilitación Basada en la Comunidad (RBC)',
  sesiones: [
    { tipo: 'Teoría', fecha: 'Miércoles 26 de agosto de 2026', fechaISO: '2026-08-26' },
    { tipo: 'Práctica', fecha: 'Sábado 29 de agosto de 2026', fechaISO: '2026-08-29' },
  ],

  teoria: {
    titulo: 'La comunidad como espacio de rehabilitación',
    introduccion: 'Clase 2 – Rehabilitación Basada en la Comunidad (RBC)',
    bloques: [
      {
        id: 'inicio',
        tipo: 'evidencia',
        titulo: 'Así empezó la clase',
        descripcion: 'Evidencia de la clase teórica.',
        evidencia: evidenciaKahoot,
        contexto: {
          pregunta: '¿Qué recuerdas sobre la Atención Primaria de Salud (APS) y su relación con la comunidad?',
          texto: 'La clase empezó con un Kahoot: «¡Veamos qué recordamos!».',
        },
      },
      {
        id: 'conceptos',
        tipo: 'conceptos',
        titulo: 'Conceptos clave',
        descripcion: 'Abre cada tarjeta para leer la definición completa.',
        conceptos: [
          {
            id: 'rbc',
            titulo: 'Rehabilitación Basada en la Comunidad (RBC)',
            sintesis: 'Una estrategia de la OMS y la OPS para mejorar la calidad de vida de las personas con discapacidad y de sus familias.',
            desarrollo:
              'Es una estrategia de la OMS y la OPS que busca mejorar la calidad de vida de las personas con discapacidad y de sus familias. Promueve la inclusión social y el ejercicio de sus derechos. Aprovecha los centros de APS y los recursos de la comunidad para acercar la rehabilitación a quienes más lo necesitan, sobre todo en países de bajos ingresos.',
            cita: '(OMS et al., 2010)',
          },
          {
            id: 'principios',
            titulo: 'Principios de la RBC',
            sintesis: 'Cinco principios: la comunidad y la familia son corresponsables, y los servicios deben llegar a todas las zonas.',
            desarrollo:
              'Son cinco: la inclusión social, la participación comunitaria, el empoderamiento de la familia, la intersectorialidad y la descentralización. En conjunto significan que la comunidad y la familia son corresponsables y que los servicios deben llegar a zonas urbanas, periurbanas y rurales.',
            cita: '(OMS et al., 2010)',
          },
          {
            id: 'matriz',
            titulo: 'Matriz de la RBC',
            sintesis: 'El marco que ordena la estrategia en cinco componentes: salud, educación, subsistencia, social y fortalecimiento.',
            desarrollo:
              'Es el marco que ordena la estrategia en cinco componentes: salud, educación, subsistencia, social y fortalecimiento. Cada uno incluye acciones concretas, como prevención y rehabilitación en salud, educación desde la infancia temprana o participación y defensa de derechos.',
            cita: '(OMS et al., 2010)',
          },
        ],
      },
      {
        id: 'origen',
        tipo: 'origen',
        titulo: '¿Qué es la RBC? Concepto y origen',
        descripcion: 'Del enfoque comunitario a la estrategia de la OMS y la OPS.',
        definicion:
          'La Rehabilitación Basada en Comunidad (RBC) es una estrategia de la OMS y la OPS que busca mejorar la calidad de vida de las personas con discapacidad y de sus familias, promoviendo la inclusión social y el pleno ejercicio de sus derechos.',
        pasos: [
          { etiqueta: 'Punto de partida', titulo: 'Enfoque basado en la comunidad', texto: 'Ayuda a asegurar que el desarrollo alcance a los sectores más pobres y marginados.' },
          { etiqueta: 'Banco Mundial', titulo: 'Desarrollo Organizado por la Comunidad (DOC)', texto: 'El Banco Mundial impulsa el enfoque comunitario como DOC.' },
          { etiqueta: 'OMS', titulo: 'Iniciativas Basadas en la Comunidad (IBC)', texto: 'La OMS lo impulsa como IBC.' },
          {
            etiqueta: 'Método',
            titulo: 'Acercar la rehabilitación',
            texto: 'Hace uso óptimo de los centros de APS y los recursos de la comunidad para acercar los servicios de rehabilitación a las personas con discapacidad, especialmente en países de bajos ingresos.',
          },
        ],
        peru: {
          marco: 'En el Perú, la RBC está alineada a la Ley General de la Persona con Discapacidad (Ley N.º 29973) y a la acción conjunta de:',
          actores: ['MINSA', 'Gobiernos locales', 'Organizaciones civiles', 'Comunidades'],
          rol: 'Como terapeutas de lenguaje, nuestra intervención se enmarca no solo en el tratamiento individual, sino también en la participación activa de la comunidad, que es corresponsable del proceso de inclusión.',
        },
        fuente: PPT,
      },
      {
        id: 'principios',
        tipo: 'principios',
        titulo: 'Los cinco principios de la RBC',
        descripcion: 'Selecciona un principio para leerlo.',
        centro: 'RBC',
        principios: [
          { titulo: 'Inclusión social', texto: 'Las personas con discapacidad son miembros plenos de la sociedad.' },
          { titulo: 'Participación comunitaria', texto: 'La comunidad asume corresponsabilidad en la atención.' },
          { titulo: 'Empoderamiento familiar', texto: 'La familia es agente activo en el proceso rehabilitador.' },
          { titulo: 'Intersectorialidad', texto: 'Salud, educación, trabajo y protección social articulados.' },
          { titulo: 'Descentralización', texto: 'Los servicios llegan a zonas urbanas, periurbanas y rurales.' },
        ],
        fuente: PPT,
      },
      {
        id: 'matriz',
        tipo: 'matriz',
        titulo: 'Matriz de la RBC',
        descripcion: 'Elige un componente o un área para explorarla.',
        referencia: 'OMS, OIT, UNESCO e IDDC (2010). Guías para la RBC.',
        nota: 'La matriz ordena la estrategia en cinco componentes. Cada uno incluye acciones concretas, como prevención y rehabilitación en salud, educación desde la infancia temprana o participación y defensa de derechos (OMS et al., 2010).',
        componentes: [
          { titulo: 'Salud', areas: ['Promoción', 'Prevención', 'Atención médica', 'Rehabilitación', 'Dispositivos de asistencia'] },
          { titulo: 'Educación', areas: ['Infancia temprana', 'Primaria', 'Secundaria y superior', 'No formal', 'Aprendizaje a lo largo de la vida'] },
          { titulo: 'Subsistencia', areas: ['Desarrollo de destrezas', 'Trabajo por cuenta propia', 'Trabajo remunerado', 'Servicios financieros', 'Protección social'] },
          { titulo: 'Social', areas: ['Asistencia personal', 'Relaciones, matrimonio y familia', 'Cultura y artes', 'Recreación, ocio y deportes', 'Justicia'] },
          { titulo: 'Fortalecimiento', areas: ['Defensa y comunicación', 'Movilización comunal', 'Participación política', 'Grupos de autoayuda', 'Org. de personas con discapacidad'] },
        ],
      },
      {
        id: 'ejes',
        tipo: 'ejes',
        titulo: 'Ejes de la RBC en Terapia de Lenguaje',
        descripcion: 'Cómo se traduce la RBC en el quehacer del terapeuta.',
        fuente: PPT,
        ejes: [
          {
            titulo: 'Comunicación y lenguaje',
            acciones: [
              'Detección temprana de alteraciones de lenguaje, habla y audición.',
              'Capacitación a promotores de salud y docentes en estrategias de estimulación.',
              'Programas comunitarios de estimulación temprana (ej. talleres «Habla, toca y juega»).',
            ],
          },
          {
            titulo: 'Educación inclusiva',
            acciones: [
              'Adaptación curricular y apoyo a docentes en el aula regular.',
              'Diseño de materiales accesibles: pictogramas y sistemas alternativos de comunicación (SAAC).',
            ],
          },
          {
            titulo: 'Familia y comunidad',
            acciones: [
              'Talleres vivenciales a padres sobre estimulación del lenguaje en casa.',
              'Espacios de «escuela para familias»: orientación sobre derechos, cuidados y estrategias.',
            ],
          },
          {
            titulo: 'Inclusión social y laboral',
            acciones: [
              'Promoción de habilidades comunicativas funcionales en adolescentes y adultos.',
              'Apoyo en procesos de formación para la vida independiente y el empleo inclusivo.',
            ],
          },
        ],
      },
      {
        id: 'rol',
        tipo: 'rol',
        titulo: 'Rol del terapeuta de lenguaje en la RBC',
        descripcion: 'Elige un rol para ver con quién y en qué se articula.',
        rol: {
          lema: 'Su trabajo no se limita al consultorio.',
          etiquetaEnfoque: 'Conexión con el rol',
          enfoque:
            'En la RBC el terapeuta de lenguaje evalúa las necesidades comunicativas y facilita el acceso a servicios en el propio entorno de la persona. Capacita a promotores, docentes y familias en estimulación del lenguaje, y articula redes con salud, educación y protección social. También promueve la inclusión y cambia actitudes hacia la discapacidad en la comunidad.',
          fuente: 'Presentación de clase y ficha de teoría de la semana 2.',
          funciones: [
            {
              id: 'evaluador',
              verbo: 'Evaluador y facilitador',
              descripcion: 'Evalúa las necesidades comunicativas de la persona y facilita su acceso a los servicios de rehabilitación en su propio entorno.',
              vinculos: ['Necesidades comunicativas', 'Servicios de rehabilitación', 'Entorno de la persona'],
            },
            {
              id: 'capacitador',
              verbo: 'Capacitador',
              descripcion: 'Forma a promotores de salud, docentes y familias en estrategias de estimulación y comunicación.',
              vinculos: ['Promotores de salud', 'Docentes', 'Familias'],
            },
            {
              id: 'gestor',
              verbo: 'Gestor comunitario',
              descripcion: 'Articula redes intersectoriales (salud, educación, protección social) para sostener los programas.',
              vinculos: ['Salud', 'Educación', 'Protección social'],
            },
            {
              id: 'agente',
              verbo: 'Agente de cambio',
              descripcion: 'Promueve la inclusión social y transforma actitudes hacia la discapacidad en la comunidad.',
              vinculos: ['Inclusión social', 'Actitudes hacia la discapacidad'],
            },
          ],
        },
      },
      {
        id: 'peru',
        tipo: 'contexto-peru',
        titulo: 'Estrategias, retos y marco normativo en el Perú',
        descripcion: 'La RBC aplicada a nuestro contexto.',
        estrategias: [
          { titulo: 'Talleres en comunidades rurales', texto: 'Sesiones de estimulación del lenguaje y sensibilización dirigidas a familias y agentes comunitarios.' },
          { titulo: 'Visitas domiciliarias', texto: 'Seguimiento y orientación directa en el entorno familiar, especialmente en zonas de difícil acceso.' },
          { titulo: 'Redes locales', texto: 'Articulación con postas de salud, colegios y municipios para sostener la atención en el tiempo.' },
          { titulo: 'Campañas comunitarias', texto: 'Jornadas de tamizaje y sensibilización sobre comunicación, habla y audición.' },
        ],
        retos: [
          'Brecha de especialistas en provincia.',
          'Escasa accesibilidad a servicios en zonas altoandinas y amazónicas.',
          'Necesidad de materiales en lenguas originarias (quechua, aimara…).',
          'Sostenibilidad de los programas comunitarios en el tiempo.',
        ],
        normativa: {
          titulo: 'Convención sobre los Derechos de las Personas con Discapacidad — Artículo 3: Principios generales',
          cita: 'Organización de las Naciones Unidas (2006), Artículo 3.',
          ley: 'En el Perú: Ley N.º 29973, Ley General de la Persona con Discapacidad (2012).',
          principios: [
            { letra: 'a', texto: 'Respeto por la dignidad inherente, la autonomía individual —incluida la libertad de tomar las propias decisiones— y la independencia de las personas.' },
            { letra: 'b', texto: 'La no discriminación.' },
            { letra: 'c', texto: 'Participación plena y efectiva e inclusión en la sociedad.' },
            { letra: 'd', texto: 'Respeto por la diferencia y aceptación de las personas con discapacidad como parte de la diversidad humana y la humanidad.' },
            { letra: 'e', texto: 'Igualdad de oportunidades.' },
            { letra: 'f', texto: 'Accesibilidad.' },
            { letra: 'g', texto: 'Igualdad entre hombres y mujeres.' },
            { letra: 'h', texto: 'Respeto por la evolución de las facultades de los niños y las niñas con discapacidad a preservar su identidad.' },
          ],
        },
        cierre: 'La RBC en Terapia de Lenguaje no se limita a un consultorio: se expande a la comunidad como espacio de inclusión.',
      },
    ],
  },

  practica: {
    titulo: 'Difusión',
    proposito:
      'Reunir insumos ordenados y confiables que más adelante pueda reutilizar en otras actividades del curso, como infografías, dípticos, charlas o guiones de difusión, sin tener que empezar la búsqueda desde cero.',
    actividad:
      'Me asignaron un trastorno de la comunicación para investigarlo y en mi caso fue el trastorno del desarrollo del lenguaje (TDL). Completé un Excel con tres tipos de información sobre este trastorno: su definición, sus características y las actividades que se podrían trabajar a partir de él.',
    etiquetaCategorias: 'Información reunida sobre el TDL',
    categorias: ['Definición', 'Características', 'Actividades'],
    modalidad: 'Individual.',
    producto: 'Archivo de Excel, hoja «TDL».',
    aprendizaje: [
      'Aprendí que, para comunicar bien un trastorno a la comunidad, primero hay que entenderlo con claridad y tener la información organizada. Separar la definición, las características y las actividades me ayudó a distinguir qué debe saber una familia, qué señales puede observar un docente y qué puede hacer el terapeuta.',
      'En un contexto comunitario real usaría esta base para preparar materiales con lenguaje sencillo, orientar a madres, padres y docentes sobre cómo estimular el lenguaje en la rutina diaria y ayudar a identificar cuándo conviene derivar. También me recordó que este trabajo debe sostenerse en fuentes confiables y actualizarse.',
    ],
    evidencia: {
      titulo: 'Trastorno del desarrollo del lenguaje (TDL)',
      descripcion: 'Evidencia de la práctica: definición, características y actividades de mi hoja de Excel.',
      boton: 'Explorar la ficha del TDL',
    },
  },

  reflexion: {
    modelo: { nombre: 'Modelo reflexivo de Rolfe, Freshwater y Jasper', cita: '(Rolfe et al., 2001)' },
    destacada: 'La RBC pone a la familia y a la comunidad como parte de la solución.',
    original:
      'Revisamos la Rehabilitación Basada en la Comunidad y trabajé el TDL en un Excel con su definición, características y actividades. Hice un Kahoot sobre APS y me di cuenta de que había conceptos que recordaba a medias. Me costó ordenar la matriz de la RBC, con sus cinco componentes, porque pensaba la rehabilitación solo desde la salud. Es importante porque la RBC pone a la familia y a la comunidad como parte de la solución y relaciona la salud con la educación y la inclusión social (OMS et al., 2010). Con una comunidad, intentaría trabajar con docentes y familias además de con el paciente. Necesito reforzar cómo se conecta cada componente de la matriz con lo que haría un terapeuta de lenguaje.',
    etapas: [
      {
        id: 'que',
        pregunta: '¿Qué?',
        accion: 'Describir',
        proposito: 'Presento los hechos y aprendizajes principales de la semana.',
        respuestas: [
          {
            pregunta: '¿Qué hicimos o aprendimos esta semana?',
            texto: 'Revisamos la Rehabilitación Basada en la Comunidad y trabajé el TDL en un Excel con su definición, características y actividades. También hice un Kahoot sobre APS.',
          },
          {
            pregunta: '¿Qué me llamó la atención o me sorprendió?',
            texto: 'Con el Kahoot me di cuenta de que había conceptos que recordaba a medias. Además, me costó ordenar la matriz de la RBC, con sus cinco componentes.',
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
            texto: 'Es importante porque la RBC pone a la familia y a la comunidad como parte de la solución y relaciona la salud con la educación y la inclusión social (OMS et al., 2010).',
          },
          {
            pregunta: '¿Cómo se relaciona con la teoría o con lo que ya sabía?',
            texto: 'Me costó ordenar la matriz porque pensaba la rehabilitación solo desde la salud.',
          },
          {
            pregunta: '¿Qué significa para mi formación como futura terapeuta de lenguaje?',
            texto: 'Aprendí que, para comunicar bien un trastorno a la comunidad, primero hay que entenderlo con claridad y tener la información organizada.',
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
            texto: 'Con una comunidad, intentaría trabajar con docentes y familias además de con el paciente.',
          },
          {
            pregunta: '¿Y en un contexto comunitario real?',
            texto: 'Usaría esta base para preparar materiales con lenguaje sencillo, orientar a madres, padres y docentes sobre cómo estimular el lenguaje en la rutina diaria y ayudar a identificar cuándo conviene derivar.',
            origen: 'práctica',
          },
          {
            pregunta: '¿Qué necesito reforzar o seguir aprendiendo?',
            texto: 'Necesito reforzar cómo se conecta cada componente de la matriz con lo que haría un terapeuta de lenguaje.',
          },
        ],
      },
    ],
  },

  evidencias: { teoria: [evidenciaKahoot], practica: [fichaTDL] },

  referencias: [
    {
      id: 'ley-29973',
      fragmentos: [{ texto: 'Ley N.° 29973. Ley General de la Persona con Discapacidad. (2012). ' }, { texto: 'Diario Oficial El Peruano', cursiva: true }, { texto: '.' }],
    },
    {
      id: 'onu-2006',
      fragmentos: [
        { texto: 'Organización de las Naciones Unidas. (2006). ' },
        { texto: 'Convención sobre los derechos de las personas con discapacidad', cursiva: true },
        { texto: '. ONU.' },
      ],
    },
    {
      id: 'oms-2010',
      fragmentos: [
        { texto: 'OMS, OIT, UNESCO e IDDC. (2010). ' },
        { texto: 'Rehabilitación basada en la comunidad: Guías para la RBC', cursiva: true },
        { texto: '. Organización Mundial de la Salud.' },
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

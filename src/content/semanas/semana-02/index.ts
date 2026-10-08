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
        titulo: 'EVIDENCIA',
        descripcion: 'Actividad de inicio de la clase teórica.',
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
        id: 'mapa',
        tipo: 'mapa',
        titulo: 'Mapa conceptual interactivo',
        descripcion: 'Síntesis de la clase: de la RBC al rol del terapeuta de lenguaje.',
        mapa: {
          nota: 'Elaboración propia a partir de la presentación de la clase de la semana 2.',
          raiz: {
            id: 'rbc',
            titulo: 'Rehabilitación Basada en la Comunidad (RBC)',
            resumen: 'Estrategia de la OMS y la OPS',
            detalle: [
              'Busca mejorar la calidad de vida de las personas con discapacidad y de sus familias, promoviendo la inclusión social y el pleno ejercicio de sus derechos.',
            ],
            fuente: PPT,
            hijos: [
              {
                id: 'origen',
                titulo: 'Enfoque comunitario',
                resumen: 'Origen de la RBC',
                relacion: 'surge del',
                detalle: [
                  'Un enfoque basado en la comunidad ayuda a asegurar que el desarrollo alcance a los sectores más pobres y marginados.',
                  'Hace uso óptimo de los centros de APS y los recursos de la comunidad para acercar los servicios de rehabilitación a las personas con discapacidad, especialmente en países de bajos ingresos.',
                ],
                fuente: PPT,
                compacto: true,
                hijos: [
                  { relacion: 'impulsado como', id: 'doc', titulo: 'DOC', resumen: 'Banco Mundial', detalle: ['Desarrollo Organizado por la Comunidad, impulsado por el Banco Mundial.'], fuente: PPT },
                  { relacion: 'impulsado como', id: 'ibc', titulo: 'IBC', resumen: 'OMS', detalle: ['Iniciativas Basadas en la Comunidad, impulsadas por la OMS.'], fuente: PPT },
                ],
              },
              {
                id: 'principios',
                titulo: 'Cinco principios',
                resumen: 'Lo que sostiene la RBC',
                relacion: 'se guía por',
                fuente: PPT,
                compacto: true,
                hijos: [
                  { relacion: 'son', id: 'inclusion', titulo: 'Inclusión social', detalle: ['Las personas con discapacidad son miembros plenos de la sociedad.'], fuente: PPT },
                  { relacion: 'son', id: 'participacion', titulo: 'Participación comunitaria', detalle: ['La comunidad asume corresponsabilidad en la atención.'], fuente: PPT },
                  { relacion: 'son', id: 'empoderamiento', titulo: 'Empoderamiento familiar', detalle: ['La familia es agente activo en el proceso rehabilitador.'], fuente: PPT },
                  { relacion: 'son', id: 'intersectorialidad', titulo: 'Intersectorialidad', detalle: ['Salud, educación, trabajo y protección social articulados.'], fuente: PPT },
                  { relacion: 'son', id: 'descentralizacion', titulo: 'Descentralización', detalle: ['Los servicios llegan a zonas urbanas, periurbanas y rurales.'], fuente: PPT },
                ],
              },
              {
                id: 'matriz',
                titulo: 'Matriz de la RBC',
                resumen: 'Marco de referencia (OMS et al., 2010)',
                relacion: 'se organiza en la',
                fuente: 'Presentación de clase (OMS, OIT, UNESCO e IDDC, 2010)',
                compacto: true,
                hijos: [
                  { relacion: 'tiene cinco componentes', id: 'm-salud', titulo: 'Salud', detalle: ['Áreas:'], lista: ['Promoción', 'Prevención', 'Atención médica', 'Rehabilitación', 'Dispositivos de asistencia'], fuente: PPT },
                  { relacion: 'tiene cinco componentes', id: 'm-educacion', titulo: 'Educación', detalle: ['Áreas:'], lista: ['Infancia temprana', 'Primaria', 'Secundaria y superior', 'No formal', 'Aprendizaje a lo largo de la vida'], fuente: PPT },
                  { relacion: 'tiene cinco componentes', id: 'm-subsistencia', titulo: 'Subsistencia', detalle: ['Áreas:'], lista: ['Desarrollo de destrezas', 'Trabajo por cuenta propia', 'Trabajo remunerado', 'Servicios financieros', 'Protección social'], fuente: PPT },
                  { relacion: 'tiene cinco componentes', id: 'm-social', titulo: 'Social', detalle: ['Áreas:'], lista: ['Asistencia personal', 'Relaciones, matrimonio y familia', 'Cultura y artes', 'Recreación, ocio y deportes', 'Justicia'], fuente: PPT },
                  { relacion: 'tiene cinco componentes', id: 'm-fortalecimiento', titulo: 'Fortalecimiento', detalle: ['Áreas:'], lista: ['Defensa y comunicación', 'Movilización comunal', 'Participación política', 'Grupos de autoayuda', 'Org. de personas con discapacidad'], fuente: PPT },
                ],
              },
              {
                id: 'peru',
                titulo: 'La RBC en el Perú',
                resumen: 'Marco normativo, estrategias y retos',
                relacion: 'se aplica en',
                fuente: PPT,
                hijos: [
                  {
                    id: 'normativa',
                    titulo: 'Marco normativo',
                    relacion: 'se enmarca en',
                    resumen: 'Ley N.º 29973 y CDPD',
                    fuente: PPT,
                    hijos: [
                      {
                        id: 'ley',
                        titulo: 'Ley N.º 29973',
                        resumen: 'Ley General de la Persona con Discapacidad',
                        detalle: ['Acción conjunta del MINSA, los gobiernos locales, organizaciones civiles y las comunidades.'],
                        fuente: PPT,
                      },
                      {
                        id: 'cdpd',
                        titulo: 'CDPD, artículo 3',
                        resumen: 'Principios generales (ONU, 2006)',
                        detalle: ['Principios generales:'],
                        lista: [
                          'Dignidad, autonomía e independencia',
                          'No discriminación',
                          'Participación e inclusión plenas',
                          'Respeto por la diferencia',
                          'Igualdad de oportunidades',
                          'Accesibilidad',
                          'Igualdad entre hombres y mujeres',
                          'Respeto por la evolución de las facultades de niñas y niños',
                        ],
                        fuente: 'Presentación de clase (ONU, 2006, art. 3)',
                      },
                    ],
                  },
                  {
                    id: 'estrategias',
                    titulo: 'Estrategias',
                    relacion: 'se concreta en',
                    resumen: 'Talleres, visitas, redes y campañas',
                    detalle: ['Talleres en comunidades rurales, visitas domiciliarias, redes locales y campañas comunitarias.'],
                    fuente: PPT,
                  },
                  {
                    id: 'retos',
                    titulo: 'Retos',
                    relacion: 'enfrenta',
                    resumen: 'Brechas y sostenibilidad',
                    lista: [
                      'Brecha de especialistas en provincia',
                      'Escasa accesibilidad en zonas altoandinas y amazónicas',
                      'Materiales en lenguas originarias',
                      'Sostenibilidad de los programas',
                    ],
                    fuente: PPT,
                  },
                ],
              },
            ],
          },
          sintesis: {
            id: 'rol-rbc',
            titulo: 'Rol del terapeuta de lenguaje en la RBC',
            resumen: 'Evaluador, capacitador, gestor y agente de cambio',
            detalle: [
              'La RBC en Terapia de Lenguaje no se limita a un consultorio: se expande a la comunidad como espacio de inclusión.',
              'Sus cuatro roles se desarrollan en el apartado «Rol del terapeuta de lenguaje en la RBC».',
            ],
            fuente: PPT,
          },
        },
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

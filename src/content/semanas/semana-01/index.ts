import type { Semana } from '../../tipos'
import { evidenciasSemana01 } from './evidencias'

/**
 * Semana 1 — contenido tomado del documento «Portafolio semana 1» (Word),
 * del mapa conceptual de elaboración propia y del Excel de evidencias.
 */
export const semana01: Semana = {
  numero: 1,
  slug: 'semana-1',
  titulo: 'Atención Primaria de Salud y rol del terapeuta de lenguaje',
  sesiones: [
    { tipo: 'Teoría', fecha: 'Miércoles 19 de agosto de 2026', fechaISO: '2026-08-19' },
    { tipo: 'Práctica', fecha: 'Sábado 22 de agosto de 2026', fechaISO: '2026-08-22' },
  ],

  teoria: {
    titulo: 'Comprendiendo la atención comunitaria',
    introduccion: 'Clase 1 – Atención Primaria de Salud (APS) y rol del terapeuta de lenguaje',
    conceptos: [
      {
        id: 'aps',
        titulo: 'Atención primaria de salud (APS)',
        sintesis: 'La atención de salud básica y esencial, al alcance de todas las personas y familias, y puerta de entrada al sistema de salud.',
        desarrollo:
          'Es la atención de salud básica y esencial que debe estar al alcance de todas las personas y familias de una comunidad. Cuenta con su participación y tiene un costo que la comunidad y el país pueden sostener. Es la puerta de entrada al sistema de salud.',
        cita: '(OMS, 1978; Vignolo et al., 2011)',
      },
      {
        id: 'niveles',
        titulo: 'Niveles de atención',
        sintesis: 'Una forma de organizar los recursos de salud, de lo más sencillo a lo más complejo, para no dispersarlos.',
        desarrollo:
          'Son una forma de organizar los recursos de salud, de lo más sencillo a lo más complejo, para no dispersarlos. El primer nivel (puestos y centros de salud) atiende la mayoría de los problemas frecuentes y se enfoca en promoción, prevención, tamizaje y rehabilitación. Los niveles 2 y 3 reciben lo que requiere hospitalización o mayor especialización.',
        cita: '(Vignolo et al., 2011)',
      },
      {
        id: 'rbc',
        titulo: 'Rehabilitación Basada en la Comunidad (RBC)',
        sintesis: 'Una estrategia de desarrollo comunitario para la rehabilitación, la igualdad de oportunidades y la inclusión social de las personas con discapacidad.',
        desarrollo:
          'Es una estrategia de desarrollo comunitario para la rehabilitación, la igualdad de oportunidades y la inclusión social de las personas con discapacidad. Funciona cuando la persona, la comunidad y la red de servicios trabajan de forma coordinada.',
        cita: '(OMS et al., 2012)',
      },
    ],
    mapa: {
      nota: 'Elaboración propia. Versión interactiva de mi mapa conceptual, revisada con la presentación de la clase de la semana 1.',
      raiz: {
        id: 'raiz',
        titulo: 'Terapia de Lenguaje en Atención Comunitaria',
        resumen: 'Bases teórico-conceptuales de la semana 1',
        detalle: [
          'Logro de aprendizaje de la sesión: explicar las bases conceptuales de la atención comunitaria y de la APS; identificar los niveles de atención, principios y características de la APS; y reconocer el rol del tecnólogo médico en Terapia de Audición, Voz y Lenguaje dentro de los programas comunitarios.',
        ],
        fuente: 'Presentación de clase, semana 1',
        hijos: [
          {
            id: 'conceptos-basicos',
            titulo: 'Conceptos básicos',
            resumen: 'Salud, comunidad y atención comunitaria',
            relacion: 'se sustenta en',
            hijos: [
              {
                id: 'salud',
                titulo: 'Salud',
                relacion: 'incluye',
                resumen: 'Bienestar físico, mental y social',
                detalle: ['Estado de completo bienestar físico, mental y social, y no solo la ausencia de enfermedad (OMS, 1978).'],
                fuente: 'Mapa conceptual y presentación de clase',
              },
              {
                id: 'comunidad',
                titulo: 'Comunidad',
                relacion: 'incluye',
                resumen: 'Territorio, cultura e intereses comunes',
                detalle: ['Grupo de personas que comparten un territorio, cultura e intereses, y que se organizan en torno a necesidades comunes.'],
                fuente: 'Mapa conceptual y presentación de clase',
              },
              {
                id: 'atencion-comunitaria',
                titulo: 'Atención comunitaria',
                relacion: 'incluye',
                resumen: 'Modelo centrado en la comunidad',
                detalle: ['Modelo de atención centrado en la comunidad, que promueve la salud, previene la enfermedad y fomenta la participación de las personas.'],
                fuente: 'Mapa conceptual y presentación de clase',
              },
            ],
          },
          {
            id: 'aps',
            titulo: 'Atención Primaria de Salud (APS)',
            resumen: 'Puerta de entrada al sistema de salud',
            relacion: 'se sustenta en',
            detalle: [
              'La atención primaria de salud es la asistencia sanitaria esencial, accesible a todos los individuos y familias de la comunidad, a través de medios aceptables para ellos, con su plena participación y a un costo asequible para la comunidad y el país.',
              'Es el núcleo del sistema de salud del país y forma parte integral del desarrollo socioeconómico general de la comunidad (OMS, 1978).',
            ],
            fuente: 'Presentación de clase (Declaración de Alma-Ata, OMS, 1978)',
            hijos: [
              {
                id: 'objetivos',
                titulo: 'Objetivos',
                relacion: 'persigue',
                resumen: 'Cuatro objetivos de la APS',
                fuente: 'Presentación de clase',
                hijos: [
                  { id: 'acceso', titulo: 'Acceso universal', detalle: ['Garantizar el primer contacto y la puerta de entrada al sistema de salud para toda la población.'], fuente: 'Presentación de clase' },
                  { id: 'promocion', titulo: 'Promoción y prevención', detalle: ['Priorizar la promoción de la salud y la prevención de la enfermedad y la discapacidad.'], fuente: 'Presentación de clase' },
                  { id: 'participacion', titulo: 'Participación comunitaria', detalle: ['Involucrar a personas, familias y organizaciones en el cuidado de su propia salud.'], fuente: 'Presentación de clase' },
                  { id: 'integralidad', titulo: 'Integralidad y continuidad', detalle: ['Brindar atención integral, continua y coordinada a lo largo de la vida.'], fuente: 'Presentación de clase' },
                ],
              },
              {
                id: 'principios',
                titulo: 'Principios',
                relacion: 'se rige por',
                resumen: 'Esencial, pertinente, universal y participativa',
                fuente: 'Presentación de clase',
                hijos: [
                  { id: 'esencial', titulo: 'Esencial', detalle: ['Aborda los problemas de salud y los riesgos que se producen con más frecuencia en una población.'], fuente: 'Presentación de clase' },
                  { id: 'pertinente', titulo: 'Pertinente', detalle: ['Usa recursos apropiados, desde los sanitarios propiamente dichos hasta los distintos recursos de que disponga la comunidad.'], fuente: 'Presentación de clase' },
                  { id: 'universal', titulo: 'Universal', detalle: ['Debe estar al alcance de todos los individuos y familias de la comunidad.'], fuente: 'Presentación de clase' },
                  { id: 'participativa', titulo: 'Participativa', detalle: ['Las personas y familias asumen responsabilidad sobre su propia salud y bienestar y sobre los de su comunidad.'], fuente: 'Presentación de clase' },
                ],
              },
              {
                id: 'accesibilidad',
                titulo: 'Característica: accesibilidad',
                relacion: 'se caracteriza por',
                resumen: 'Cuatro dimensiones',
                detalle: ['Posibilidad de que la población acceda a los servicios de salud. Se expresa en cuatro dimensiones.'],
                fuente: 'Presentación de clase',
                hijos: [
                  { id: 'geografica', titulo: 'Geográfica', detalle: ['Proximidad de los centros de atención al domicilio y al centro de trabajo.'], fuente: 'Presentación de clase' },
                  { id: 'economica', titulo: 'Económica', detalle: ['Acceso a la atención al margen de la situación económica de las personas.'], fuente: 'Presentación de clase' },
                  { id: 'cultural', titulo: 'Cultural', detalle: ['Atención acorde con las pautas de comportamiento de la población (religión, cultura, valores, costumbres).'], fuente: 'Presentación de clase' },
                  { id: 'funcional', titulo: 'Funcional', detalle: ['Atención recibida por quienes la necesitan, en el momento en que la necesitan.'], fuente: 'Presentación de clase' },
                ],
              },
            ],
          },
          {
            id: 'sistema',
            titulo: 'Sistema y niveles de atención',
            resumen: 'Organización de los recursos en salud',
            relacion: 'se sustenta en',
            hijos: [
              {
                id: 'sistema-salud',
                titulo: 'Sistema de salud',
                relacion: 'se organiza en',
                resumen: 'MINSA, EsSalud, Sanidades y sector privado',
                detalle: ['Forma concreta en que se organizan los recursos para la atención de la salud del país. En el Perú lo conforman:'],
                lista: ['MINSA', 'EsSalud', 'Sanidades de las Fuerzas Armadas y Policiales', 'Sector privado'],
                fuente: 'Mapa conceptual y presentación de clase',
                hijos: [
                  {
                    id: 'niveles',
                    titulo: 'Niveles de atención',
                    relacion: 'define',
                    resumen: 'Del más sencillo al más complejo',
                    detalle: [
                      'Conjunto de elementos interrelacionados y adaptados a distintas necesidades, que van del más sencillo al más complejo.',
                      'Esta organización evita la dispersión de los recursos y permite el máximo grado de operatividad y de aprovechamiento de estos.',
                    ],
                    fuente: 'Presentación de clase (Vignolo et al., 2011)',
                    hijos: [
                      {
                        id: 'nivel-1',
                        titulo: 'Nivel 1',
                        resumen: 'Puestos y centros de salud',
                        detalle: [
                          'Atiende cerca del 80% de los problemas de salud más frecuentes.',
                          'El 60-70% debería resolverse en este nivel con participación de la comunidad.',
                          'Promoción, prevención, tamizaje y rehabilitación; deriva el resto al 2.° nivel.',
                        ],
                        fuente: 'Presentación de clase (Vignolo et al., 2011)',
                      },
                      {
                        id: 'nivel-2',
                        titulo: 'Nivel 2',
                        resumen: 'Hospitales generales',
                        detalle: ['Acoge a pacientes que requieren hospitalización; atiende al 20-30% de la población.', 'Su fin es la curación y la recuperación de la salud.'],
                        fuente: 'Presentación de clase (Vignolo et al., 2011)',
                      },
                      {
                        id: 'nivel-3',
                        titulo: 'Nivel 3',
                        resumen: 'Institutos y hospitales especializados',
                        detalle: ['Mayor grado de especialización y tecnología más compleja.'],
                        fuente: 'Presentación de clase (Vignolo et al., 2011)',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'discapacidad',
            titulo: 'La discapacidad en la comunidad',
            resumen: 'Funcionamiento, prevención y atención',
            relacion: 'se sustenta en',
            detalle: [
              'Desde una visión integral de la atención primaria, además del tratamiento de la enfermedad debe incorporarse la intervención sobre la discapacidad.',
              'Por ello se propone una atención primaria orientada a la promoción del funcionamiento, la prevención de la discapacidad y la atención a la discapacidad.',
            ],
            fuente: 'Presentación de clase',
            hijos: [
              {
                id: 'rbc',
                titulo: 'Rehabilitación Basada en la Comunidad (RBC)',
                relacion: 'se aborda mediante',
                resumen: 'Estrategia de desarrollo comunitario',
                detalle: [
                  'Estrategia de desarrollo comunitario (OMS/OPS) para la rehabilitación, la igualdad de oportunidades y la inclusión social de las personas con discapacidad.',
                  'Sus procedimientos permiten que la persona con discapacidad, la comunidad y la red de servicios trabajen de forma coordinada.',
                ],
                fuente: 'Presentación de clase (OMS et al., 2012)',
                hijos: [
                  { id: 'rbc-persona', titulo: 'Persona con discapacidad', fuente: 'Presentación de clase' },
                  { id: 'rbc-comunidad', titulo: 'Comunidad', fuente: 'Presentación de clase' },
                  { id: 'rbc-red', titulo: 'Red de servicios de salud', fuente: 'Presentación de clase' },
                  { id: 'rbc-comites', titulo: 'Comités comunitarios', fuente: 'Presentación de clase' },
                ],
              },
            ],
          },
        ],
      },
      sintesis: {
        id: 'rol',
        titulo: 'Rol del terapeuta de lenguaje en la APS',
        resumen: 'Promoción, prevención y trabajo comunitario',
        detalle: [
          'Promoción, prevención y trabajo comunitario, contribuyendo a la salud comunicativa y al desarrollo de la población, especialmente en comunidades con barreras de acceso a servicios especializados.',
          'Sus cuatro funciones se desarrollan en el apartado «Rol del terapeuta de lenguaje».',
        ],
        fuente: 'Mapa conceptual y presentación de clase',
      },
    },
    rol: {
      lema: 'El terapeuta de lenguaje lleva la atención comunitaria a donde las personas viven y aprenden.',
      enfoque:
        'Promoción, prevención y trabajo comunitario, contribuyendo a la salud comunicativa y al desarrollo de la población, especialmente en comunidades con barreras de acceso a servicios especializados.',
      fuente: 'Presentación de clase y ficha de teoría de la semana 1.',
      funciones: [
        {
          id: 'promocion',
          verbo: 'Promoción',
          descripcion: 'Difunde el desarrollo comunicativo saludable y orienta a padres, cuidadores, docentes y adultos mayores.',
          vinculos: ['Padres', 'Cuidadores', 'Docentes', 'Adultos mayores'],
        },
        {
          id: 'prevencion',
          verbo: 'Prevención',
          descripcion: 'Realiza tamizajes de habla, voz, audición y lenguaje para la detección temprana de dificultades.',
          vinculos: ['Habla', 'Voz', 'Audición', 'Lenguaje'],
        },
        {
          id: 'trabajo-comunitario',
          verbo: 'Trabajo comunitario',
          descripcion: 'Capacita agentes comunitarios y trabaja en equipos multi e interdisciplinarios dentro de la RBC.',
          vinculos: ['Agentes comunitarios', 'Equipos multi e interdisciplinarios', 'RBC'],
        },
        {
          id: 'articulacion',
          verbo: 'Articulación',
          descripcion: 'Participa en programas del Estado (MINSA, MINEDU, MIDIS, OMAPED) y campañas sociales de prevención.',
          vinculos: ['MINSA', 'MINEDU', 'MIDIS', 'OMAPED', 'Campañas sociales de prevención'],
        },
      ],
    },
  },

  practica: {
    titulo: 'Construyendo redes de atención',
    proposito:
      'Reunir en un solo documento, a la mano, opciones reales a las que se pueda derivar a una familia o a un paciente de forma más rápida y eficaz, según su necesidad y su ubicación.',
    actividad:
      'Elaboré un directorio en Excel con lugares de atención de los trastornos de la comunicación en distintos distritos y conos de Lima. Incluí centros de terapia de lenguaje, hospitales y centros que atienden estos casos, CEBE, PRITE, instituciones que atienden condiciones específicas, centros geriátricos y ONG. También incluí los hospitales que realizan tamizaje auditivo neonatal, nasoendoscopia y potenciales evocados.',
    categorias: [
      'Centros de terapia de lenguaje',
      'Hospitales y centros que atienden estos casos',
      'CEBE',
      'PRITE',
      'Instituciones que atienden condiciones específicas',
      'Centros geriátricos',
      'ONG',
      'Tamizaje auditivo neonatal',
      'Nasoendoscopia',
      'Potenciales evocados',
    ],
    modalidad: 'De forma individual.',
    producto: 'Archivo del Excel, sección «Lugares de atención».',
    aprendizaje: [
      'Aprendí que reconocer a tiempo dónde derivar es parte del trabajo del terapeuta de lenguaje, porque ningún profesional ni servicio resuelve todo por sí solo. Conocer la red de instituciones me permite orientar a las familias hacia el servicio adecuado, ya sea educativo, de salud o de apoyo social, y evitar que pierdan tiempo o abandonen la búsqueda.',
      'En un contexto comunitario real usaría este directorio para actualizar la lista, ordenarla por distrito y por tipo de servicio, y compartirla con docentes, promotores y familias. Así la referencia y la contrarreferencia dejan de depender de la memoria y se vuelven una acción planificada.',
    ],
  },

  reflexion: {
    modelo: { nombre: 'Modelo reflexivo de Rolfe, Freshwater y Jasper', cita: '(Rolfe et al., 2001)' },
    destacada: 'Usaría esa lista para dar una derivación concreta y no una indicación vaga.',
    original:
      'Esta semana vimos qué es la atención primaria de salud, cómo se organizan los niveles de atención y armé un directorio de lugares a los que se puede derivar a una familia. Me sorprendió que el primer nivel esté pensado para resolver la mayoría de los problemas de salud, porque yo asociaba la terapia de lenguaje casi solo con hospitales y consultorios. Esto importa porque la APS busca que la atención sea accesible en lo geográfico, lo económico y lo cultural (OMS, 1978; Vignolo et al., 2011), y al armar el directorio vi que hay servicios que existen, pero no son fáciles de encontrar por distrito. Con una familia o una escuela, usaría esa lista para dar una derivación concreta y no una indicación vaga. Me falta conocer mejor cómo funciona la referencia y contrarreferencia en la práctica.',
    etapas: [
      {
        id: 'que',
        pregunta: '¿Qué?',
        accion: 'Describir',
        proposito: 'Presento los hechos y aprendizajes principales de la semana.',
        respuestas: [
          {
            pregunta: '¿Qué hicimos o aprendimos esta semana?',
            texto: 'Esta semana vimos qué es la atención primaria de salud, cómo se organizan los niveles de atención y armé un directorio de lugares a los que se puede derivar a una familia.',
          },
          {
            pregunta: '¿Qué me llamó la atención o me sorprendió?',
            texto: 'Me sorprendió que el primer nivel esté pensado para resolver la mayoría de los problemas de salud.',
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
            texto: 'Esto importa porque la APS busca que la atención sea accesible en lo geográfico, lo económico y lo cultural (OMS, 1978; Vignolo et al., 2011). Al armar el directorio vi que hay servicios que existen, pero no son fáciles de encontrar por distrito.',
          },
          {
            pregunta: '¿Cómo se relaciona con la teoría o con lo que ya sabía?',
            texto: 'Yo asociaba la terapia de lenguaje casi solo con hospitales y consultorios. Comprender que el primer nivel está pensado para resolver la mayoría de los problemas de salud cambió esa idea.',
          },
          {
            pregunta: '¿Qué significa para mi formación como futura terapeuta de lenguaje?',
            texto: 'Aprendí que reconocer a tiempo dónde derivar es parte del trabajo del terapeuta de lenguaje, porque ningún profesional ni servicio resuelve todo por sí solo.',
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
            texto: 'Con una familia o una escuela, usaría esa lista para dar una derivación concreta y no una indicación vaga.',
          },
          {
            pregunta: '¿Y en un contexto comunitario real?',
            texto: 'Usaría este directorio para actualizar la lista, ordenarla por distrito y por tipo de servicio, y compartirla con docentes, promotores y familias.',
            origen: 'práctica',
          },
          {
            pregunta: '¿Qué necesito reforzar o seguir aprendiendo?',
            texto: 'Me falta conocer mejor cómo funciona la referencia y contrarreferencia en la práctica.',
          },
        ],
      },
    ],
  },

  evidencias: evidenciasSemana01,

  referencias: [
    {
      id: 'oms-1978',
      fragmentos: [
        { texto: 'Organización Mundial de la Salud. (1978). ' },
        { texto: 'Declaración de Alma-Ata', cursiva: true },
        { texto: '. Conferencia Internacional sobre Atención Primaria de Salud.' },
      ],
    },
    {
      id: 'oms-2012',
      fragmentos: [
        { texto: 'OMS, OIT, UNESCO y OPS. (2012). ' },
        { texto: 'Rehabilitación basada en la comunidad: Guías para la RBC', cursiva: true },
        { texto: '.' },
      ],
    },
    {
      id: 'vignolo-2011',
      fragmentos: [
        { texto: 'Vignolo, J., Vacarezza, M., Álvarez, C. y Sosa, A. (2011). Niveles de atención, de prevención y atención primaria de la salud. ' },
        { texto: 'Archivos de Medicina Interna, 33', cursiva: true },
        { texto: '(1), 11–14.' },
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

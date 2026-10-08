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
    niveles: {
      intro: 'De lo más sencillo a lo más complejo, para no dispersar los recursos.',
      cita: 'Vignolo et al. (2011)',
      items: [
        {
          id: 'comunidad',
          etiqueta: 'APS',
          titulo: 'Personas, familias y comunidad',
          descripcion:
            'La APS es la puerta de entrada al sistema de salud: debe estar al alcance de todas las personas y familias de una comunidad y cuenta con su participación.',
        },
        {
          id: 'nivel-1',
          etiqueta: 'Nivel 1',
          titulo: 'Puestos y centros de salud',
          descripcion:
            'Atiende la mayoría de los problemas frecuentes y se enfoca en promoción, prevención, tamizaje y rehabilitación.',
        },
        {
          id: 'nivel-2-3',
          etiqueta: 'Niveles 2 y 3',
          titulo: 'Hospitalización o mayor especialización',
          descripcion: 'Reciben lo que requiere hospitalización o mayor especialización.',
        },
      ],
    },
    mapa: {
      nota: 'Mapa conceptual de elaboración propia. La versión interactiva conserva sus conceptos, relaciones y textos originales.',
      raiz: {
        id: 'raiz',
        titulo: 'Terapia de Lenguaje en Atención Comunitaria',
        hijos: [
          {
            id: 'conceptos-basicos',
            titulo: 'Conceptos básicos',
            relacion: 'se sustenta en',
            hijos: [
              {
                id: 'salud',
                titulo: 'Salud',
                relacion: 'incluye',
                texto: 'Estado de completo bienestar físico, mental y social, y no solo la ausencia de enfermedad (OMS, 1978).',
              },
              {
                id: 'comunidad',
                titulo: 'Comunidad',
                relacion: 'incluye',
                texto: 'Grupo de personas que comparten un territorio, cultura e intereses, y se organizan en torno a necesidades comunes.',
              },
              {
                id: 'atencion-comunitaria',
                titulo: 'Atención comunitaria',
                relacion: 'incluye',
                texto: 'Modelo de atención centrado en la comunidad, que promueve la salud, previene la enfermedad y fomenta la participación de las personas.',
              },
            ],
          },
          {
            id: 'aps',
            titulo: 'Atención Primaria de Salud (APS)',
            relacion: 'se sustenta en',
            hijos: [
              {
                id: 'aps-definicion',
                titulo: '',
                relacion: 'es',
                texto:
                  'La asistencia sanitaria esencial, accesible a todos, con participación comunitaria y a un costo asequible. Es el núcleo del sistema de salud y parte del desarrollo socioeconómico de la comunidad.',
                hijos: [
                  {
                    id: 'acceso',
                    titulo: 'Acceso universal',
                    relacion: 'se caracteriza por',
                    texto: 'Puerta de entrada al sistema de salud para toda la población.',
                  },
                  {
                    id: 'promocion',
                    titulo: 'Promoción y prevención',
                    relacion: 'se caracteriza por',
                    texto: 'Prioriza la salud y previene la enfermedad y la discapacidad.',
                  },
                  {
                    id: 'participacion',
                    titulo: 'Participación comunitaria',
                    relacion: 'se caracteriza por',
                    texto: 'Involucra a personas, familias y organizaciones en el cuidado de la salud.',
                  },
                  {
                    id: 'integralidad',
                    titulo: 'Integralidad y continuidad',
                    relacion: 'se caracteriza por',
                    texto: 'Atención integral, continua y coordinada a lo largo de la vida.',
                  },
                ],
              },
            ],
          },
          {
            id: 'sistema',
            titulo: 'Sistema y niveles de atención',
            relacion: 'se sustenta en',
            hijos: [
              {
                id: 'sistema-salud',
                titulo: 'Sistema de salud',
                relacion: 'se organiza en',
                texto: 'Forma en que se organizan los recursos para la atención de la salud en el país. En el Perú lo conforman:',
                lista: ['MINSA', 'EsSalud', 'Sanidades de las Fuerzas Armadas y Policiales', 'Sector privado'],
              },
            ],
          },
          {
            id: 'discapacidad',
            titulo: 'La discapacidad en la comunidad',
            relacion: 'se sustenta en',
            hijos: [
              {
                id: 'rbc',
                titulo: 'Rehabilitación Basada en la Comunidad (RBC)',
                relacion: 'se aborda mediante',
                texto: 'Estrategia que promueve la inclusión, participación y autonomía de las personas con discapacidad en su entorno.',
              },
            ],
          },
        ],
      },
      sintesis: {
        id: 'rol',
        titulo: 'Rol del terapeuta de lenguaje en la APS',
        hijos: [
          {
            id: 'rol-enfoque',
            titulo: '',
            relacion: 'se enfoca en',
            texto:
              'Promoción, prevención y trabajo comunitario, contribuyendo a la salud comunicativa y al desarrollo de la población, especialmente en comunidades con barreras de acceso a servicios especializados.',
          },
        ],
      },
    },
    rol: {
      lema: 'El terapeuta de lenguaje lleva la atención comunitaria a donde las personas viven y aprenden.',
      enfoque:
        'Promoción, prevención y trabajo comunitario, contribuyendo a la salud comunicativa y al desarrollo de la población, especialmente en comunidades con barreras de acceso a servicios especializados.',
      funciones: [
        {
          id: 'promueve',
          verbo: 'Promueve',
          descripcion: 'el desarrollo comunicativo con familias, docentes y adultos mayores.',
          vinculos: ['Familias', 'Docentes', 'Adultos mayores'],
        },
        {
          id: 'tamiza',
          verbo: 'Realiza tamizajes',
          descripcion: 'de habla, voz, audición y lenguaje para detectar a tiempo.',
          vinculos: ['Habla', 'Voz', 'Audición', 'Lenguaje'],
        },
        {
          id: 'capacita',
          verbo: 'Capacita',
          descripcion: 'a agentes comunitarios.',
          vinculos: ['Agentes comunitarios'],
        },
        {
          id: 'articula',
          verbo: 'Se articula',
          descripcion: 'con programas del Estado.',
          vinculos: ['MINSA', 'MINEDU', 'MIDIS', 'OMAPED'],
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
    original:
      'Esta semana vimos qué es la atención primaria de salud, cómo se organizan los niveles de atención y armé un directorio de lugares a los que se puede derivar a una familia. Me sorprendió que el primer nivel esté pensado para resolver la mayoría de los problemas de salud, porque yo asociaba la terapia de lenguaje casi solo con hospitales y consultorios. Esto importa porque la APS busca que la atención sea accesible en lo geográfico, lo económico y lo cultural (OMS, 1978; Vignolo et al., 2011), y al armar el directorio vi que hay servicios que existen, pero no son fáciles de encontrar por distrito. Con una familia o una escuela, usaría esa lista para dar una derivación concreta y no una indicación vaga. Me falta conocer mejor cómo funciona la referencia y contrarreferencia en la práctica.',
    aprendi:
      'Esta semana vimos qué es la atención primaria de salud, cómo se organizan los niveles de atención y armé un directorio de lugares a los que se puede derivar a una familia.',
    sorprendio:
      'Me sorprendió que el primer nivel esté pensado para resolver la mayoría de los problemas de salud, porque yo asociaba la terapia de lenguaje casi solo con hospitales y consultorios. Esto importa porque la APS busca que la atención sea accesible en lo geográfico, lo económico y lo cultural (OMS, 1978; Vignolo et al., 2011), y al armar el directorio vi que hay servicios que existen, pero no son fáciles de encontrar por distrito.',
    aplicaria: 'Con una familia o una escuela, usaría esa lista para dar una derivación concreta y no una indicación vaga.',
    pendiente: 'Me falta conocer mejor cómo funciona la referencia y contrarreferencia en la práctica.',
    destacada: 'Usaría esa lista para dar una derivación concreta y no una indicación vaga.',
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
  ],
}

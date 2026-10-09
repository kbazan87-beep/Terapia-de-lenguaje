import { MotionConfig } from 'motion/react'
import { semanas } from './content/semanas'
import { Navegacion, type EnlaceNav } from './components/layout/Navegacion'
import { perfil } from './content/perfil'
import { Pie } from './components/layout/Pie'
import { Portada } from './components/secciones/Portada'
import { SobreMi } from './components/secciones/SobreMi'
import { Recorrido } from './components/secciones/Recorrido'
import { Referencias } from './components/secciones/Referencias'
import { Evaluacion } from './components/secciones/Evaluacion'
import { SemanaSeccion } from './components/semana/SemanaSeccion'

const indice = (n: number) => String(n).padStart(2, '0')

const enlaces: EnlaceNav[] = [
  { id: 'inicio', etiqueta: 'Inicio' },
  { id: 'sobre-mi', etiqueta: 'Sobre mí' },
  { id: 'recorrido', etiqueta: 'Recorrido' },
  {
    etiqueta: 'Semanas',
    grupo: Array.from({ length: perfil.totalSemanas }, (_, i) => {
      const s = semanas.find((x) => x.numero === i + 1)
      return { id: s?.slug, etiqueta: `Semana ${i + 1}`, detalle: s?.titulo ?? 'Próximamente' }
    }),
  },
  { id: 'evaluacion', etiqueta: 'Autoevaluación y coevaluación', corta: 'Evaluación' },
  { id: 'referencias', etiqueta: 'Referencias' },
]

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navegacion enlaces={enlaces} />
      <main id="contenido">
        <Portada />
        <SobreMi />
        <Recorrido semanas={semanas} />
        {semanas.map((s, i) => (
          <SemanaSeccion key={s.slug} semana={s} indice={indice(3 + i)} />
        ))}
        <Evaluacion indice={indice(3 + semanas.length)} />
        <Referencias semanas={semanas} indice={indice(4 + semanas.length)} />
      </main>
      <Pie />
    </MotionConfig>
  )
}

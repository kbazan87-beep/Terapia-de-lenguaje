import { MotionConfig } from 'motion/react'
import { semanas } from './content/semanas'
import { Navegacion, type EnlaceNav } from './components/layout/Navegacion'
import { Pie } from './components/layout/Pie'
import { Portada } from './components/secciones/Portada'
import { SobreMi } from './components/secciones/SobreMi'
import { Recorrido } from './components/secciones/Recorrido'
import { Referencias } from './components/secciones/Referencias'
import { SemanaSeccion } from './components/semana/SemanaSeccion'

const indice = (n: number) => String(n).padStart(2, '0')

const enlaces: EnlaceNav[] = [
  { id: 'inicio', etiqueta: 'Inicio' },
  { id: 'sobre-mi', etiqueta: 'Sobre mí' },
  { id: 'recorrido', etiqueta: 'Recorrido' },
  ...semanas.map((s) => ({ id: s.slug, etiqueta: `Semana ${s.numero}` })),
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
        <Referencias semanas={semanas} indice={indice(3 + semanas.length)} />
      </main>
      <Pie />
    </MotionConfig>
  )
}

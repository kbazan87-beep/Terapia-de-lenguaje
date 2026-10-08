import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = { children: ReactNode; className?: string; retraso?: number; as?: 'div' | 'li' | 'section' }

/** Aparición suave al entrar en pantalla. Se desactiva con «reducir movimiento». */
export function Revelar({ children, className, retraso = 0, as = 'div' }: Props) {
  const Componente = motion[as]
  return (
    <Componente
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: retraso, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Componente>
  )
}

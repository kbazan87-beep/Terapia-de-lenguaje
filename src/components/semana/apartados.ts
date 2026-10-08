import { BookOpen, ClipboardList, Feather, type LucideIcon } from 'lucide-react'

export type ApartadoId = 'teoria' | 'practica' | 'reflexion'

export type Apartado = {
  id: ApartadoId
  etiqueta: string
  icono: LucideIcon
  /** Clases de color propias de cada apartado (identidad visual). */
  acento: { fondo: string; texto: string; suave: string; borde: string }
}

/** Secuencia de cada semana: comprender, aplicar y reflexionar. Las evidencias viven dentro de Teoría y Práctica. */
export const apartados: Apartado[] = [
  { id: 'teoria', etiqueta: 'Teoría', icono: BookOpen, acento: { fondo: 'bg-petroleo-700', texto: 'text-petroleo-700', suave: 'bg-petroleo-50', borde: 'border-petroleo-300' } },
  { id: 'practica', etiqueta: 'Práctica', icono: ClipboardList, acento: { fondo: 'bg-salvia-700', texto: 'text-salvia-700', suave: 'bg-salvia-50', borde: 'border-salvia-300' } },
  { id: 'reflexion', etiqueta: 'Reflexión', icono: Feather, acento: { fondo: 'bg-coral-700', texto: 'text-coral-700', suave: 'bg-coral-50', borde: 'border-coral-400' } },
]

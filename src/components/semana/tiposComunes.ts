import type { Apartado, ApartadoId } from './apartados'

export type PropsApartado = {
  acento: Apartado['acento']
  irA: (id: ApartadoId, enfocar?: boolean) => void
}

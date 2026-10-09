import type { Semana } from '../tipos'
import { semana01 } from './semana-01'
import { semana02 } from './semana-02'
import { semana03 } from './semana-03'
import { semana04 } from './semana-04'
import { semana05 } from './semana-05'

/** Registro de semanas. Para incorporar una nueva, crea `semana-0N/` y agrégala aquí. */
export const semanas: Semana[] = [semana01, semana02, semana03, semana04, semana05]

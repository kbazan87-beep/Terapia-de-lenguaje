import type { BloqueTeoria } from '../../../../content/tipos'

/** Bloque de teoría de un tipo concreto. */
export type BloqueDe<T extends BloqueTeoria['tipo']> = Extract<BloqueTeoria, { tipo: T }>

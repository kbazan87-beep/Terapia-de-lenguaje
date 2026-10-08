import { useEffect, useState } from 'react'

/** Devuelve el id de la sección que ocupa la franja central de la pantalla. */
export function useSeccionActiva(ids: string[]) {
  const [activa, setActiva] = useState(ids[0])

  useEffect(() => {
    const elementos = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiva(visible.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    elementos.forEach((e) => observador.observe(e))
    return () => observador.disconnect()
  }, [ids])

  return activa
}

import { ArrowRight, Film, Users } from 'lucide-react'
import type { EvidenciaVideo } from '../../../content/tipos'

/** Reproductor de una evidencia en video, con sus integrantes y el vínculo con trabajos previos. */
export function VideoEvidencia({ evidencia }: { evidencia: EvidenciaVideo }) {
  const r = evidencia.relacionado
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <figure className="tarjeta overflow-hidden lg:col-span-7">
        <div className="flex justify-center bg-petroleo-900 p-3 sm:p-5">
          <video
            controls
            preload="metadata"
            playsInline
            poster={evidencia.poster}
            className="aspect-[9/16] max-h-[78vh] w-full max-w-sm rounded-2xl bg-black"
            aria-label={evidencia.titulo}
          >
            <source src={evidencia.src} type="video/mp4" />
            Tu navegador no puede reproducir este video.
          </video>
        </div>
        <figcaption className="space-y-4 p-5 sm:p-6">
          <div>
            <p className="flex items-center gap-2 font-semibold text-tinta">
              <Film className="size-4 text-lavanda-700" aria-hidden /> {evidencia.titulo}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-gris">{evidencia.descripcion}</p>
            <p className="mt-1 text-xs text-gris">{evidencia.formato}</p>
          </div>
          {evidencia.integrantes && (
            <div className="border-t border-linea pt-4">
              <p className="eyebrow flex items-center gap-2 text-[0.68rem] text-lavanda-700">
                <Users className="size-3.5" aria-hidden /> {evidencia.integrantes.titulo}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {evidencia.integrantes.nombres.map((n) => (
                  <li key={n} className="rounded-full bg-lavanda-50 px-3 py-1.5 text-sm text-tinta">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </figcaption>
      </figure>

      {r && (
        <aside className="flex flex-col justify-between gap-6 rounded-3xl bg-salvia-50 p-6 sm:p-7 lg:col-span-5">
          <div>
            <p className="eyebrow text-salvia-700">{r.titulo}</p>
            <p className="mt-3 leading-relaxed text-tinta">{r.texto}</p>
            <ul className="mt-4 space-y-2">
              {r.items.map((i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-sm text-tinta">
                  <span aria-hidden className="size-2 rounded-full bg-salvia-500" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <a href={r.href} className="group inline-flex items-center justify-between gap-3 rounded-full bg-salvia-700 px-5 py-3 text-sm font-semibold text-white hover:bg-petroleo-900">
            {r.boton} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
          </a>
        </aside>
      )}
    </div>
  )
}

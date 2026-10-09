import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, CircleDashed, Download, RotateCcw, Sparkles, Target, UserRound, UsersRound } from 'lucide-react'
import { autoevaluacion, coevaluacion, rubrica, type CriterioRubrica, type NivelRubrica } from '../../content/evaluacion'
import { crearPdf, guardar, type DatosPdf } from '../../lib/pdfEvaluacion'
import { EncabezadoSeccion } from '../ui/EncabezadoSeccion'
import { Revelar } from '../ui/Revelar'

type Puntajes = Record<string, NivelRubrica | null>
const NIVELES: NivelRubrica[] = [0, 1, 2, 3, 4]
const MAXIMO_TOTAL = rubrica.maximo * rubrica.criterios.length

/** Estado guardado solo en este navegador (comodidad de quien visita); si no hay acceso, se usa el valor inicial. */
function useGuardado<T>(clave: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const v = localStorage.getItem(clave)
      return v ? { ...inicial, ...JSON.parse(v) } : inicial
    } catch {
      return inicial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor))
    } catch {
      /* sin almacenamiento disponible */
    }
  }, [clave, valor])
  return [valor, setValor] as const
}

const completo = (p: Puntajes) => rubrica.criterios.every((c) => p[c.id] !== null && p[c.id] !== undefined)
const total = (p: Puntajes) => rubrica.criterios.reduce((a, c) => a + (p[c.id] ?? 0), 0)

function Estado({ listo }: { listo: boolean }) {
  return listo ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-salvia-50 px-2.5 py-1 text-xs font-semibold text-salvia-700">
      <CheckCircle2 className="size-3.5" aria-hidden /> Completo
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-coral-400 px-2.5 py-1 text-xs font-semibold text-coral-700">
      <CircleDashed className="size-3.5" aria-hidden /> Pendiente
    </span>
  )
}

/** Selector de puntaje de 0 a 4: no permite valores fuera de la escala. */
function Selector({ criterio, valor, cambiar, prefijo }: { criterio: CriterioRubrica; valor: NivelRubrica | null; cambiar: (v: NivelRubrica) => void; prefijo: string }) {
  return (
    <div role="radiogroup" aria-label={`Puntaje: ${criterio.nombre}`} className="grid grid-cols-5 gap-1.5 sm:flex sm:flex-wrap">
      {NIVELES.map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          id={`${prefijo}-${criterio.id}-${n}`}
          aria-checked={valor === n}
          title={rubrica.nombresNiveles[n]}
          onClick={() => cambiar(n)}
          className={`flex min-w-0 flex-col items-center rounded-xl px-1 py-1.5 sm:min-w-11 sm:px-2 transition ${valor === n ? 'bg-petroleo-700 text-white shadow-sm' : 'bg-petroleo-50 text-petroleo-900 hover:bg-petroleo-100'}`}
        >
          <span className="font-display text-lg leading-none">{n}</span>
          <span className={`mt-0.5 text-[0.65rem] leading-tight ${valor === n ? 'text-white/80' : 'text-gris'}`}>{rubrica.nombresNiveles[n]}</span>
        </button>
      ))}
    </div>
  )
}

/** Tarjeta de un criterio: nivel de desempeño, puntaje y texto (justificación o comentario). */
function Criterio({ criterio, valor, cambiar, prefijo, texto, indice }: { criterio: CriterioRubrica; valor: NivelRubrica | null; cambiar: (v: NivelRubrica) => void; prefijo: string; texto: ReactNode; indice: number }) {
  return (
    <li className="tarjeta grid gap-5 p-5 sm:p-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-display text-xl leading-snug font-semibold text-petroleo-900">
            <span className="mr-2 text-coral-700">{indice}.</span>
            {criterio.nombre}
          </p>
          <Estado listo={valor !== null} />
        </div>
        <div className="mt-4">
          <Selector criterio={criterio} valor={valor} cambiar={cambiar} prefijo={prefijo} />
        </div>
        <p className="mt-3 text-sm text-gris">
          Puntaje: <span className="font-semibold text-tinta">{valor ?? '—'}</span> / {rubrica.maximo}
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={valor ?? 'sin'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-xl bg-crema px-3 py-2 text-sm leading-relaxed text-tinta"
          >
            {valor === null ? (
              <span className="text-gris">Selecciona un puntaje para ver el nivel de desempeño.</span>
            ) : valor === 0 ? (
              <>
                <span className="font-semibold">No presenta.</span> Equivale a 0.
              </>
            ) : (
              <>
                <span className="font-semibold">{rubrica.nombresNiveles[valor]} ({valor}):</span> {criterio.niveles[valor]}
              </>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="lg:col-span-7">{texto}</div>
    </li>
  )
}

/** Resultados por criterio y total; el total solo se muestra cuando todos los criterios tienen puntaje. */
function Resultados({ puntajes, comparar }: { puntajes: Puntajes; comparar?: { etiqueta: string; puntajes: Puntajes } }) {
  const listo = completo(puntajes)
  const faltan = rubrica.criterios.filter((c) => puntajes[c.id] === null || puntajes[c.id] === undefined).length
  return (
    <div className="grid gap-5 rounded-3xl bg-petroleo-900 p-6 text-white sm:p-7 md:grid-cols-12 md:items-center">
      <div className="md:col-span-4">
        <p className="eyebrow text-coral-100">Puntaje total</p>
        {listo ? (
          <p className="mt-1 font-display text-6xl leading-none" aria-live="polite">
            {total(puntajes)}
            <span className="text-2xl text-white/60"> / {MAXIMO_TOTAL}</span>
          </p>
        ) : (
          <p className="mt-2 font-display text-2xl leading-snug" aria-live="polite">
            Pendiente
            <span className="mt-1 block font-sans text-sm text-white/70">
              {faltan === 1 ? 'Falta 1 criterio por puntuar.' : `Faltan ${faltan} criterios por puntuar.`}
            </span>
          </p>
        )}
      </div>
      <ul className="space-y-2.5 md:col-span-8">
        {rubrica.criterios.map((c) => {
          const v = puntajes[c.id]
          const otro = comparar?.puntajes[c.id]
          return (
            <li key={c.id}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-white/85">{c.nombre}</span>
                <span className="shrink-0 font-semibold">
                  {v ?? '—'} / {rubrica.maximo}
                  {comparar && (
                    <span className="ml-2 font-normal text-white/60">
                      · {comparar.etiqueta}: {otro ?? '—'}
                    </span>
                  )}
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10" aria-hidden>
                <motion.div className="h-full rounded-full bg-coral-400" initial={false} animate={{ width: `${((v ?? 0) / rubrica.maximo) * 100}%` }} transition={{ duration: 0.4 }} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function BotonPdf({ etiqueta, habilitado, aviso, generar }: { etiqueta: string; habilitado: boolean; aviso: string; generar: () => Promise<string | null> }) {
  const [estado, setEstado] = useState<string | null>(null)
  const [ocupado, setOcupado] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={!habilitado || ocupado}
        onClick={async () => {
          setOcupado(true)
          setEstado(null)
          try {
            setEstado(await generar())
          } catch {
            setEstado('No se pudo generar el PDF.')
          } finally {
            setOcupado(false)
          }
        }}
        className="inline-flex items-center gap-2 rounded-full bg-lavanda-700 px-5 py-3 text-sm font-semibold text-white hover:bg-petroleo-900 disabled:cursor-not-allowed disabled:opacity-45"
      >
        <Download className="size-4" aria-hidden /> {ocupado ? 'Generando…' : etiqueta}
      </button>
      <span className="text-xs text-gris" aria-live="polite">
        {habilitado ? estado : aviso}
      </span>
    </div>
  )
}

function descargarPdf(datos: DatosPdf) {
  const nombre = `${datos.titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}.pdf`
  return guardar(nombre, crearPdf(datos))
}

function Autoevaluacion() {
  const [puntajes, setPuntajes] = useGuardado<Puntajes>('evaluacion-autoevaluacion-v1', autoevaluacion.puntajes)
  const modificado = rubrica.criterios.some((c) => puntajes[c.id] !== autoevaluacion.puntajes[c.id])
  const textos = autoevaluacion.justificaciones
  const listo = completo(puntajes)

  return (
    <div className="space-y-6">
      <ol className="space-y-4">
        {rubrica.criterios.map((c, i) => (
          <Criterio
            key={c.id}
            indice={i + 1}
            criterio={c}
            prefijo="auto"
            valor={puntajes[c.id] ?? null}
            cambiar={(v) => setPuntajes((p) => ({ ...p, [c.id]: v }))}
            texto={
              <div className="h-full rounded-2xl border border-linea bg-white/60 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold tracking-wider text-salvia-700 uppercase">Justificación / qué mejoraré</p>
                  <Estado listo={!!textos[c.id]} />
                </div>
                <p className="mt-2 leading-relaxed text-tinta">{textos[c.id] ?? <span className="text-gris">Pendiente.</span>}</p>
              </div>
            }
          />
        ))}
      </ol>

      <Resultados puntajes={puntajes} />

      {modificado && (
        <p className="flex flex-wrap items-center gap-3 rounded-2xl bg-coral-50 px-4 py-3 text-sm text-tinta">
          Cambiaste algún puntaje en este navegador; los cambios no modifican el portafolio publicado.
          <button type="button" onClick={() => setPuntajes(autoevaluacion.puntajes)} className="inline-flex items-center gap-1.5 font-semibold text-coral-700 hover:text-petroleo-900">
            <RotateCcw className="size-4" aria-hidden /> Restablecer mis puntajes
          </button>
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { titulo: 'Mis fortalezas', texto: autoevaluacion.reflexionFinal.fortalezas, icono: <Sparkles className="size-5" aria-hidden />, color: 'bg-salvia-50 text-salvia-700' },
          { titulo: 'Lo que debo mejorar', texto: autoevaluacion.reflexionFinal.mejoras, icono: <Target className="size-5" aria-hidden />, color: 'bg-lavanda-50 text-lavanda-700' },
        ].map((r) => (
          <div key={r.titulo} className="tarjeta p-6">
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-3 text-sm font-bold tracking-wider uppercase">
                <span className={`inline-flex size-10 items-center justify-center rounded-full ${r.color}`}>{r.icono}</span>
                <span className="text-petroleo-900">{r.titulo}</span>
              </p>
              <Estado listo={!!r.texto} />
            </div>
            <p className="mt-4 font-display text-lg leading-snug text-petroleo-900">{r.texto ?? <span className="font-sans text-base text-gris">Pendiente.</span>}</p>
          </div>
        ))}
      </div>

      <BotonPdf
        etiqueta="Descargar autoevaluación (PDF)"
        habilitado={listo}
        aviso="Asigna un puntaje a todos los criterios para descargarla."
        generar={() =>
          descargarPdf({
            titulo: 'Autoevaluación del portafolio',
            puntajes,
            textos,
            etiquetaTexto: 'Justificación / qué mejoraré',
            cierre: [
              { titulo: 'Mis fortalezas', texto: autoevaluacion.reflexionFinal.fortalezas },
              { titulo: 'Lo que debo mejorar', texto: autoevaluacion.reflexionFinal.mejoras },
            ],
          })
        }
      />
    </div>
  )
}

type DatosCoevaluacion = { evaluador: string; puntajes: Puntajes; comentarios: Record<string, string>; comentarioGeneral: string }

function Coevaluacion() {
  const inicial: DatosCoevaluacion = {
    evaluador: coevaluacion.evaluador ?? '',
    puntajes: coevaluacion.puntajes,
    comentarios: Object.fromEntries(Object.entries(coevaluacion.comentarios).map(([k, v]) => [k, v ?? ''])),
    comentarioGeneral: coevaluacion.comentarioGeneral ?? '',
  }
  const [datos, setDatos] = useGuardado<DatosCoevaluacion>('evaluacion-coevaluacion-v1', inicial)
  const listo = completo(datos.puntajes) && datos.evaluador.trim() !== ''
  const campo = 'w-full rounded-xl border border-linea bg-white px-3 py-2 text-sm text-tinta placeholder:text-gris/70 focus:border-petroleo-500 focus:outline-none'

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-coral-400 bg-coral-50/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-tinta">
          <span className="font-semibold">Formulario pendiente.</span> {coevaluacion.descripcion} Aún no cuento con sus respuestas, por eso todos los campos están vacíos.
        </p>
        <Estado listo={listo} />
      </div>

      <label className="tarjeta flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:gap-4">
        <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-petroleo-900">
          <UserRound className="size-4 text-lavanda-700" aria-hidden /> Persona evaluadora (mi par)
        </span>
        <input type="text" value={datos.evaluador} onChange={(e) => setDatos((d) => ({ ...d, evaluador: e.target.value }))} placeholder="Nombre de mi par (pendiente)" className={campo} />
      </label>

      <ol className="space-y-4">
        {rubrica.criterios.map((c, i) => (
          <Criterio
            key={c.id}
            indice={i + 1}
            criterio={c}
            prefijo="coev"
            valor={datos.puntajes[c.id] ?? null}
            cambiar={(v) => setDatos((d) => ({ ...d, puntajes: { ...d.puntajes, [c.id]: v } }))}
            texto={
              <label className="flex h-full flex-col gap-2">
                <span className="text-xs font-bold tracking-wider text-salvia-700 uppercase">Comentario de retroalimentación</span>
                <textarea
                  rows={4}
                  value={datos.comentarios[c.id] ?? ''}
                  onChange={(e) => setDatos((d) => ({ ...d, comentarios: { ...d.comentarios, [c.id]: e.target.value } }))}
                  placeholder="Pendiente"
                  className={`${campo} flex-1 resize-y`}
                />
              </label>
            }
          />
        ))}
      </ol>

      <label className="tarjeta flex flex-col gap-2 p-5">
        <span className="text-xs font-bold tracking-wider text-salvia-700 uppercase">Comentario general</span>
        <textarea rows={3} value={datos.comentarioGeneral} onChange={(e) => setDatos((d) => ({ ...d, comentarioGeneral: e.target.value }))} placeholder="Pendiente" className={`${campo} resize-y`} />
      </label>

      <Resultados puntajes={datos.puntajes} comparar={{ etiqueta: 'mi puntaje', puntajes: autoevaluacion.puntajes }} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <BotonPdf
          etiqueta="Descargar coevaluación (PDF)"
          habilitado={listo}
          aviso="Se podrá descargar cuando tenga el nombre de mi par y los cinco puntajes."
          generar={() =>
            descargarPdf({
              titulo: 'Coevaluación del portafolio',
              evaluador: datos.evaluador,
              puntajes: datos.puntajes,
              textos: datos.comentarios,
              etiquetaTexto: 'Comentario',
              cierre: [{ titulo: 'Comentario general', texto: datos.comentarioGeneral }],
            })
          }
        />
        <button type="button" onClick={() => setDatos(inicial)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gris hover:text-petroleo-900">
          <RotateCcw className="size-4" aria-hidden /> Vaciar el formulario
        </button>
      </div>
      <p className="text-xs text-gris">Lo que se escribe aquí se guarda solo en este navegador; no se envía ni se publica.</p>
    </div>
  )
}

const PESTANAS = [
  { id: 'autoevaluacion', etiqueta: 'Autoevaluación', icono: UserRound },
  { id: 'coevaluacion', etiqueta: 'Coevaluación', icono: UsersRound },
] as const

/** Sección final del portafolio: autoevaluación y coevaluación con la rúbrica oficial del curso. */
export function Evaluacion({ indice }: { indice: string }) {
  const [activa, setActiva] = useState(0)
  const botones = useRef<(HTMLButtonElement | null)[]>([])
  const teclado = (e: KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const k = (i + 1) % PESTANAS.length
    setActiva(k)
    botones.current[k]?.focus()
  }

  return (
    <section id="evaluacion" aria-labelledby="titulo-evaluacion" className="bg-crema py-20 md:py-28">
      <div className="contenedor">
        <EncabezadoSeccion id="titulo-evaluacion" indice={indice} antetitulo="Autoevaluación y coevaluación" titulo="Cómo valoro mi portafolio">
          Con la rúbrica oficial del curso. {rubrica.escala}
        </EncabezadoSeccion>

        <Revelar>
          <div role="tablist" aria-label="Tipo de evaluación" className="mb-8 grid grid-cols-2 gap-1.5 rounded-full border border-linea bg-papel p-1.5 sm:inline-grid">
            {PESTANAS.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  botones.current[i] = el
                }}
                type="button"
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={activa === i}
                aria-controls={`panel-${p.id}`}
                tabIndex={activa === i ? 0 : -1}
                onClick={() => setActiva(i)}
                onKeyDown={(e) => teclado(e, i)}
                className={`relative flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${activa === i ? 'text-white' : 'text-gris hover:text-tinta'}`}
              >
                {activa === i && <motion.span layoutId="evaluacion-activa" className="absolute inset-0 -z-0 rounded-full bg-petroleo-700" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <p.icono className="relative size-4" aria-hidden />
                <span className="relative">{p.etiqueta}</span>
              </button>
            ))}
          </div>
        </Revelar>

        {PESTANAS.map((p, i) => (
          <div key={p.id} id={`panel-${p.id}`} role="tabpanel" aria-labelledby={`tab-${p.id}`} hidden={activa !== i}>
            {activa === i && (p.id === 'autoevaluacion' ? <Autoevaluacion /> : <Coevaluacion />)}
          </div>
        ))}

        <p className="mt-8 text-xs text-gris">
          {rubrica.titulo}. *{rubrica.notaAsterisco}
        </p>
      </div>
    </section>
  )
}

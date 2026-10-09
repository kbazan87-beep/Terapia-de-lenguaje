import { jsPDF } from 'jspdf'
import { rubrica, type NivelRubrica } from '../content/evaluacion'
import { perfil } from '../content/perfil'

export type DatosPdf = {
  titulo: string
  /** Persona evaluadora (coevaluación); se omite en la autoevaluación. */
  evaluador?: string | null
  puntajes: Record<string, NivelRubrica | null>
  textos: Record<string, string | null>
  etiquetaTexto: string
  cierre: { titulo: string; texto: string | null }[]
}

// Las fuentes estándar de PDF no incluyen algunos signos tipográficos.
const seguro = (t: string) => t.replace(/[–—]/g, '-').replace(/[“”]/g, '"').replace(/[‘’]/g, "'")

/** Genera el PDF de una evaluación con los datos completados (los pendientes se indican como tales). */
export function crearPdf(d: DatosPdf) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const margen = 48
  const ancho = doc.internal.pageSize.getWidth() - margen * 2
  const alto = doc.internal.pageSize.getHeight()
  let y = margen

  const espacio = (h: number) => {
    if (y + h > alto - margen) {
      doc.addPage()
      y = margen
    }
  }
  const parrafo = (texto: string, tam = 10, estilo: 'normal' | 'bold' | 'italic' = 'normal', color = 30) => {
    doc.setFont('helvetica', estilo).setFontSize(tam).setTextColor(color)
    const lineas = doc.splitTextToSize(seguro(texto), ancho) as string[]
    for (const l of lineas) {
      espacio(tam * 1.35)
      doc.text(l, margen, y)
      y += tam * 1.35
    }
  }

  parrafo(d.titulo, 16, 'bold', 20)
  parrafo(`${perfil.nombre} · ${perfil.curso} (${perfil.codigo}) · ${perfil.periodo}`, 9, 'normal', 90)
  parrafo(`${perfil.universidad} · Docente: ${perfil.docente}`, 9, 'normal', 90)
  if (d.evaluador !== undefined) parrafo(`Persona evaluadora: ${d.evaluador?.trim() || 'Pendiente'}`, 10, 'bold')
  parrafo(rubrica.escala, 9, 'italic', 90)
  y += 8

  for (const c of rubrica.criterios) {
    const p = d.puntajes[c.id]
    espacio(60)
    doc.setDrawColor(210).line(margen, y - 4, margen + ancho, y - 4)
    y += 8
    parrafo(`${c.nombre} — ${p === null || p === undefined ? 'Pendiente' : `${p} / ${rubrica.maximo} (${rubrica.nombresNiveles[p]})`}`, 11, 'bold', 20)
    if (p) parrafo(`Nivel: ${c.niveles[p as 1 | 2 | 3 | 4]}`, 9, 'normal', 80)
    const t = d.textos[c.id]
    parrafo(`${d.etiquetaTexto}: ${t?.trim() || 'Pendiente'}`, 10)
    y += 4
  }

  const valores = rubrica.criterios.map((c) => d.puntajes[c.id])
  const completo = valores.every((v) => v !== null && v !== undefined)
  y += 6
  parrafo(completo ? `Puntaje total: ${valores.reduce<number>((a, v) => a + (v ?? 0), 0)} / ${rubrica.maximo * rubrica.criterios.length}` : 'Puntaje total: pendiente (hay criterios sin puntaje).', 12, 'bold', 20)

  for (const s of d.cierre) {
    y += 6
    parrafo(s.titulo, 11, 'bold', 20)
    parrafo(s.texto?.trim() || 'Pendiente', 10)
  }
  return doc.output('blob')
}

type Descargas = { save: (r: { filename: string; data: Blob }) => Promise<unknown> }
type ClaudeVisor = { use?: (nombre: 'downloads') => Promise<Descargas | null> }

/** Descarga el archivo: en el visor de artefactos usa la capacidad «downloads»; fuera de él, un enlace temporal. */
export async function guardar(nombre: string, datos: Blob): Promise<string | null> {
  if (import.meta.env.MODE === 'artifact') {
    const descargas = await (window as unknown as { claude?: ClaudeVisor }).claude?.use?.('downloads')
    if (!descargas) return 'La descarga no está disponible en esta vista.'
    try {
      await descargas.save({ filename: nombre, data: datos })
      return 'Descarga iniciada.'
    } catch (e) {
      const codigo = (e as { code?: string }).code
      return codigo === 'declined' ? null : codigo === 'rate_limited' ? 'Ya hay una descarga pendiente de confirmar.' : 'No se pudo descargar el archivo en esta vista.'
    }
  }
  const url = URL.createObjectURL(datos)
  const a = document.createElement('a')
  a.href = url
  a.download = nombre
  document.body.append(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return null
}

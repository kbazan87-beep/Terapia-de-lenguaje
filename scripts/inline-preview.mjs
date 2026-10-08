// Une el JS y el CSS del build en un único HTML autocontenido.
// Modo "preview": documento completo. Modo "artifact": solo el contenido (título, estilos, raíz y script),
// porque la plataforma de artefactos añade su propio esqueleto <html>/<head>/<body>.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const modo = process.argv[2] ?? 'preview'
const dir = `dist-${modo}`
let html = readFileSync(join(dir, 'index.html'), 'utf8')

html = html.replace(/<script type="module" crossorigin src="\.\/(assets\/[^"]+\.js)"><\/script>/, (_, src) => {
  const js = readFileSync(join(dir, src), 'utf8').replace(/<\/script/g, '<\\/script')
  return `<script type="module">${js}</script>`
})
html = html.replace(/<link rel="stylesheet" crossorigin href="\.\/(assets\/[^"]+\.css)">/, (_, href) => {
  return `<style>${readFileSync(join(dir, href), 'utf8')}</style>`
})

if (modo === 'artifact') {
  const head = html.match(/<head>([\s\S]*)<\/head>/)[1].replace(/<meta [^>]*>\s*/g, '').replace(/<link rel="icon"[^>]*>\s*/, '')
  const body = html.match(/<body>([\s\S]*)<\/body>/)[1]
  html = `${head.trim()}\n${body.trim()}\n`
}

const salida = join(dir, modo === 'artifact' ? 'cada-voz-cuenta.html' : 'portafolio-vista-previa.html')
writeFileSync(salida, html)
console.log('Archivo:', salida, `${(html.length / 1024).toFixed(0)} KB`)

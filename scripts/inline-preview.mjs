// Une el JS y el CSS de dist-preview en un único index.html autocontenido para la vista previa.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = 'dist-preview'
let html = readFileSync(join(dir, 'index.html'), 'utf8')

html = html.replace(/<script type="module" crossorigin src="\.\/(assets\/[^"]+\.js)"><\/script>/, (_, src) => {
  const js = readFileSync(join(dir, src), 'utf8').replace(/<\/script/g, '<\\/script')
  return `<script type="module">${js}</script>`
})
html = html.replace(/<link rel="stylesheet" crossorigin href="\.\/(assets\/[^"]+\.css)">/, (_, href) => {
  return `<style>${readFileSync(join(dir, href), 'utf8')}</style>`
})

writeFileSync(join(dir, 'portafolio-vista-previa.html'), html)
console.log('Vista previa:', join(dir, 'portafolio-vista-previa.html'), `${(html.length / 1024).toFixed(0)} KB`)

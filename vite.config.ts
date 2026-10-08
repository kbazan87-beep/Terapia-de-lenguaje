import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base` relativo permite desplegar en GitHub Pages (subcarpeta) o en Vercel (raíz).
// El modo "preview" incrusta todos los recursos para generar una vista previa de un solo archivo.
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), tailwindcss()],
  build:
    mode === 'preview'
      ? { outDir: 'dist-preview', assetsInlineLimit: 100_000_000, cssCodeSplit: false }
      : { outDir: 'dist' },
}))

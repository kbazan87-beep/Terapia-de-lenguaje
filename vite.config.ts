import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base` relativo permite desplegar en GitHub Pages (subcarpeta) o en Vercel (raíz).
// Los modos "preview" y "artifact" incrustan todos los recursos para generar un solo archivo.
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), tailwindcss()],
  build:
    mode === 'preview' || mode === 'artifact'
      ? { outDir: `dist-${mode}`, assetsInlineLimit: 100_000_000, cssCodeSplit: false }
      : { outDir: 'dist' },
}))

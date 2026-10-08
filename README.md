# Cada voz cuenta — Portafolio T0351

Portafolio académico digital de **Kimberli Zaleth Cardozo Casimiro** para el curso *Terapia de Lenguaje en Atención Comunitaria* (T0351, 2026-II), Carrera de Terapia de Audición, Voz y Lenguaje, Universidad Peruana Cayetano Heredia.

Se trata de un portafolio personal de la estudiante y no es una publicación oficial de la universidad.

## Ejecutar en local

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # compilación de producción en dist/
npm run preview    # sirve dist/ localmente
npm run build:preview  # genera dist-preview/portafolio-vista-previa.html (un solo archivo)
```

Tecnologías: React, TypeScript, Vite, Tailwind CSS, Motion y Lucide React.

## Estructura

```
src/
  content/                 ← contenido académico (sin lógica de presentación)
    perfil.ts              ← portada, sobre mí y metas
    tipos.ts               ← modelo de datos de una semana
    semanas/
      index.ts             ← registro de semanas
      semana-01/
        index.ts           ← teoría, práctica, reflexión y referencias
        evidencias.ts      ← evidencias (mapa original y hojas del Excel)
        lugares.json       ← hoja «Lugares de atención» (extraída sin cambios)
        instrumentos.json  ← hoja «Instrumentos» (extraída sin cambios)
  components/
    layout/                ← navegación y pie
    secciones/             ← portada, sobre mí, recorrido, referencias
    semana/                ← pestañas Teoría · Práctica · Evidencias · Reflexión
  assets/                  ← logo UPCH, mapa conceptual original, Excel de evidencias
scripts/
  extraer_excel.py         ← regenera los JSON a partir del Excel
```

## Agregar una semana

1. Crea `src/content/semanas/semana-0N/index.ts` con un objeto `Semana` (ver `tipos.ts`).
2. Si hay hojas de Excel, conviértelas con `python3 -I scripts/extraer_excel.py <archivo.xlsx> src/content/semanas/semana-0N` (ajusta los nombres de las hojas en el script).
3. Regístrala en `src/content/semanas/index.ts`. La navegación, la línea de tiempo y las referencias se actualizan solas.

## Despliegue (pendiente)

`vite.config.ts` usa `base: './'`, por lo que `dist/` funciona tanto en **Vercel** (framework Vite, comando `npm run build`, directorio `dist`) como en **GitHub Pages** (publicar el contenido de `dist/`).

## Evidencias y datos

- El Excel incluido es la versión actualizada sin los sombreados rojos. Las filas, los nombres y los datos no se modificaron.
- Los nombres de las compañeras se publican con su autorización.
- El mapa conceptual original se conserva como evidencia de elaboración propia.

# Amigurupi Crochet

Sitio de una sola página para **Amigurupi Crochet** (Motozintla, Chiapas).
Next.js 16 · React 19 · Tailwind v4 · Framer Motion · Lenis.

```bash
npm run dev     # desarrollo
npm run build   # build de producción (todo estático)
npm start       # servir el build
```

## Marca

La paleta está tomada píxel a píxel de `Paleta de Colores.jpg` y vive en
`src/app/globals.css` como tokens de Tailwind:

| Token | Valor | Uso |
|---|---|---|
| `rosa` | `#f98abf` | color principal de marca |
| `coral` | `#ff9a5c` | segundo color del degradado |
| `sol` | `#f0d732` | hilo de acento |
| `blush` | `#fef1f8` | fondo de secciones alternas |
| `menta` / `cielo` / `lila` | `#9aebe5` / `#8cd7f6` / `#bea3f0` | hilos de acento |

Sobre esa base se derivan la rampa `rosa-50…700`, los lienzos cálidos
(`lienzo`, `velo`) y la tinta ciruela (`tinta`, `tinta-70`, `tinta-50`).
Los tres tonos de tinta pasan contraste AA (≥ 4.5:1) sobre `lienzo`.

Tipografía: **Fraunces** (display, con ejes `SOFT`/`WONK` para el aire hecho a
mano) e **Inter** (texto).

## La mascota

`public/marca/mascota.png` se extrae de la ilustración de referencia con
`scripts/build-assets.mjs`. El script **sólo borra fondo**: recorta, hace un
relleno por inundación desde el borde con una paleta de referencia limitada a
tonos pálidos y fríos (el rosa/marfil del fondo), descarta las formas sueltas
que no son la mascota y reescala de forma uniforme con Lanczos.

Nunca se retocan colores, proporciones ni rasgos. Si hay que rehacerla:

```bash
node scripts/build-assets.mjs
```

El mismo script convierte la galería a WebP y copia el video del hero.
Las rutas de origen apuntan a la carpeta de marca `Amigurupi Web`.

## Contenido

Todo el texto editable (servicios, pasos, preguntas, testimonios, fichas de
galería) está en `src/lib/contenido.ts`. No hace falta tocar componentes para
cambiar copys, precios de proceso, categorías o datos de contacto.

Para añadir una foto a la galería: colócala en la carpeta de marca, corre el
script y añade su entrada en `piezas`. `tramo: "alto"` la hace ocupar una
casilla más alta dentro del mosaico.

## Accesibilidad y movimiento

- `prefers-reduced-motion` desactiva Lenis, pausa el video del hero y anula
  las animaciones de Framer y CSS.
- Navegación por teclado completa en el visor de la galería (Esc, ← →) y en
  el carrusel de creaciones.
- Enlace de salto al contenido, jerarquía de encabezados sin saltos, `alt` en
  todas las imágenes y áreas táctiles de 44px como mínimo.

## SEO

Metadatos, Open Graph, `sitemap.xml`, `robots.txt` y datos estructurados
(`LocalBusiness` + `FAQPage`) se generan desde `src/app/`. Antes de publicar,
cambia la constante `SITIO` en `layout.tsx`, `sitemap.ts` y `robots.ts` por el
dominio real.

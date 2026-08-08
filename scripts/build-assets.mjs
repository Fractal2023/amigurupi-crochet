/**
 * Pipeline de assets de Amigurupi Crochet.
 *
 * El original vive fuera del repo (la carpeta de marca "Amigurupi Web").
 * Este script genera los archivos optimizados de /public y se puede volver
 * a correr las veces que haga falta.
 *
 * La ilustración oficial del personaje ya llega con fondo transparente, así
 * que aquí sólo se recorta el margen vacío y se escala de forma uniforme.
 * Nunca se tocan colores, proporciones ni rasgos.
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC = "C:/Users/USER/Documents/OV-STUDIO/Amigurupi Web";
const OUT = path.join(process.cwd(), "public");

/** Ancho al que se sirve el personaje: suficiente para pantallas retina. */
const ANCHO_MASCOTA = 900;

async function main() {
  await fs.mkdir(path.join(OUT, "galeria"), { recursive: true });
  await fs.mkdir(path.join(OUT, "marca"), { recursive: true });

  // --- Personaje de marca ---
  const mascota = path.join(OUT, "marca", "personaje.png");
  await sharp(path.join(SRC, "Personaje_HeroFINAL.png"))
    .trim({ threshold: 1 })
    .resize({ width: ANCHO_MASCOTA, kernel: "lanczos3", withoutEnlargement: false })
    .png({ compressionLevel: 9 })
    .toFile(mascota);

  const { width, height } = await sharp(mascota).metadata();

  // --- Icono de la app: la cara del personaje sobre el degradado de marca ---
  const cara = Math.round(width * 0.62);
  const cabeza = await sharp(mascota)
    .extract({
      left: Math.round(width / 2 - cara / 2),
      top: Math.round(height * 0.04),
      width: cara,
      height: cara,
    })
    .resize({ width: 400 })
    .toBuffer();

  const lienzo = Buffer.from(
    `<svg width="512" height="512"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0" stop-color="#fff5fa"/><stop offset="0.55" stop-color="#fdc9e1"/>` +
      `<stop offset="1" stop-color="#f98abf"/></linearGradient></defs>` +
      `<rect width="512" height="512" rx="112" fill="url(#g)"/></svg>`,
  );
  await sharp(lienzo)
    .composite([{ input: cabeza, top: 66, left: 56 }])
    .png()
    .toFile(path.join(process.cwd(), "src", "app", "icon.png"));

  // --- Logo ---
  await sharp(path.join(SRC, "Logo", "Logo Amigurupi Oficial.png"))
    .trim({ threshold: 1 })
    .resize({ width: 1600, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "marca", "logo.png"));

  // --- Galería ---
  const dir = path.join(SRC, "Galeria");
  const fotos = (await fs.readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  for (const foto of fotos) {
    await sharp(path.join(dir, foto))
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, "galeria", `${path.parse(foto).name}.webp`));
  }

  // --- Video del hero ---
  await fs.copyFile(
    path.join(SRC, "Video Hero", "Crochet_website_hero_animation_202608062330.mp4"),
    path.join(OUT, "hero.mp4"),
  );

  console.log(
    `Assets listos: personaje ${width}x${height}, ${fotos.length} fotos, logo, icono y video.`,
  );
}

main();

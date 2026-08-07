/**
 * Asset pipeline for Amigurupi Crochet.
 *
 * Source of truth lives outside the repo (the "Amigurupi Web" brand folder).
 * This script produces the optimized files in /public and is safe to re-run.
 *
 * The mascot is extracted from the reference artwork with an edge flood-fill
 * that only clears the flat background colour. Mascot pixels are never
 * recoloured, rescaled non-uniformly, or otherwise altered.
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC = "C:/Users/USER/Documents/OV-STUDIO/Amigurupi Web";
const OUT = path.join(process.cwd(), "public");

const REFERENCE = path.join(
  SRC,
  "Referencias",
  "ChatGPT Image 6 ago 2026, 11_14_05 p.m..png",
);

/**
 * Clears the connected background region touching the crop border.
 *
 * Every border pixel contributes a reference colour, so multi-tone backdrops
 * (the pink gradient band, the ivory card) are all matched. Crops are taken
 * wide enough that the mascot never touches an edge, which is what keeps its
 * own colours out of the reference set.
 *
 * `props` are boxes around set-dressing that sits inside the crop and touches
 * the mascot (a yarn ball behind her hair). Each box is cleared by its own
 * fill, seeded and bounded inside the box, so a prop's colours can never
 * match something elsewhere in the artwork.
 */
async function cutout(
  input,
  { left, top, width, height },
  outFile,
  { tolerance = 10, props = [], escala = 760 } = {},
) {
  const { data, info } = await sharp(input)
    .extract({ left, top, width, height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels } = info;
  const idx = (x, y) => (y * w + x) * channels;

  const border = [];
  for (let x = 0; x < w; x++) border.push([x, 0], [x, h - 1]);
  for (let y = 0; y < h; y++) border.push([0, y], [w - 1, y]);

  // Reference palette, quantised so near-identical border pixels collapse.
  // Border pixels only qualify if they are pale (the blush/ivory backdrop);
  // saturated or dark pixels that clip into the crop are ignored so they can
  // never be mistaken for background. Prop seeds bypass the filter.
  const refs = [];
  const seen = new Set();
  for (const [x, y] of border) {
    const i = idx(x, y);
    // Pale AND cool-leaning (blue >= green): that is the blush/ivory backdrop.
    // Warm pale tones — the mascot's skin, the bunny's cream body — are
    // excluded so the fill can never bite into the artwork.
    if (!(data[i] >= 240 && data[i + 1] >= 180 && data[i + 2] >= data[i + 1] - 2)) continue;
    const key = `${data[i] >> 3},${data[i + 1] >> 3},${data[i + 2] >> 3}`;
    if (seen.has(key)) continue;
    seen.add(key);
    refs.push([data[i], data[i + 1], data[i + 2]]);
  }

  const visited = new Uint8Array(w * h);

  const fill = (seeds, palette, bounds) => {
    const matches = (i) =>
      palette.some(
        ([r, g, b]) =>
          Math.abs(data[i] - r) <= tolerance &&
          Math.abs(data[i + 1] - g) <= tolerance &&
          Math.abs(data[i + 2] - b) <= tolerance,
      );
    const stack = [...seeds];
    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < bounds.x0 || y < bounds.y0 || x > bounds.x1 || y > bounds.y1) continue;
      const p = y * w + x;
      if (visited[p]) continue;
      const i = idx(x, y);
      if (!matches(i)) continue;
      visited[p] = 1;
      data[i + 3] = 0;
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
  };

  fill(border, refs, { x0: 0, y0: 0, x1: w - 1, y1: h - 1 });

  for (const box of props) {
    const bounds = { x0: box.x, y0: box.y, x1: box.x + box.w - 1, y1: box.y + box.h - 1 };
    // Seed from the box's outer column, which is entirely backdrop or prop.
    const seeds = [];
    const palette = [];
    const local = new Set();
    for (let y = bounds.y0; y <= bounds.y1; y++) {
      seeds.push([bounds.x0, y]);
      const i = idx(bounds.x0, y);
      const key = `${data[i] >> 3},${data[i + 1] >> 3},${data[i + 2] >> 3}`;
      if (local.has(key)) continue;
      local.add(key);
      palette.push([data[i], data[i + 1], data[i + 2]]);
    }
    fill(seeds, palette, bounds);
  }

  // Keep only the largest remaining shape: props that happened to sit inside
  // the crop (yarn balls, a crochet hook) drop out, the mascot never does.
  const label = new Int32Array(w * h).fill(-1);
  let best = { id: -1, size: 0 };
  let next = 0;
  for (let s = 0; s < w * h; s++) {
    if (visited[s] || label[s] !== -1) continue;
    const id = next++;
    let size = 0;
    const queue = [s];
    label[s] = id;
    while (queue.length) {
      const p = queue.pop();
      size++;
      const x = p % w;
      const y = (p / w) | 0;
      if (x > 0 && !visited[p - 1] && label[p - 1] === -1) (label[p - 1] = id), queue.push(p - 1);
      if (x < w - 1 && !visited[p + 1] && label[p + 1] === -1) (label[p + 1] = id), queue.push(p + 1);
      if (y > 0 && !visited[p - w] && label[p - w] === -1) (label[p - w] = id), queue.push(p - w);
      if (y < h - 1 && !visited[p + w] && label[p + w] === -1) (label[p + w] = id), queue.push(p + w);
    }
    if (size > best.size) best = { id, size };
  }
  for (let p = 0; p < w * h; p++) {
    if (!visited[p] && label[p] !== best.id) {
      visited[p] = 1;
      data[p * channels + 3] = 0;
    }
  }

  // Feather the 1px halo left by the hard alpha cut so edges stay soft.
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const p = y * w + x;
      if (visited[p]) continue;
      const neighbours =
        visited[p - 1] + visited[p + 1] + visited[p - w] + visited[p + w];
      if (neighbours > 0) data[idx(x, y) + 3] = 255 - neighbours * 45;
    }
  }

  // El recorte procede de una maqueta pequeña. Se reescala de forma uniforme
  // con Lanczos para que el navegador tenga píxeles reales en pantallas
  // retina: proporciones, colores y rasgos quedan intactos.
  const recorte = await sharp(data, { raw: { width: w, height: h, channels } })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();

  await sharp(recorte)
    .resize({ width: escala, kernel: "lanczos3", withoutEnlargement: false })
    .png({ compressionLevel: 9, quality: 92 })
    .toFile(outFile);
}

async function main() {
  await fs.mkdir(path.join(OUT, "galeria"), { recursive: true });
  await fs.mkdir(path.join(OUT, "marca"), { recursive: true });

  // --- Mascot (unmodified artwork, background removed only) ---
  await cutout(
    REFERENCE,
    { left: 512, top: 76, width: 296, height: 421 },
    path.join(OUT, "marca", "mascota.png"),
    // The yarn ball touches her hair, so it needs its own box; the crochet
    // hook is detached and falls out with the largest-shape pass.
    { props: [{ x: 0, y: 272, w: 80, h: 118 }] },
  );
  // Only the full-body mascot is extracted. The heart-hands variant sits on a
  // saturated pink band that is within a few values of her glasses, so a
  // cutout there would eat into the artwork — and the brief forbids altering
  // her. One canonical mascot asset it is.
  await fs.rm(path.join(OUT, "marca", "mascota-corazon.png"), { force: true });

  // --- Logo ---
  await sharp(path.join(SRC, "Logo", "Logo Amigurupi Oficial.png"))
    .trim({ threshold: 1 })
    .resize({ width: 1600, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "marca", "logo.png"));

  // --- Gallery ---
  const dir = path.join(SRC, "Galeria");
  const files = (await fs.readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  for (const file of files) {
    const base = path.parse(file).name;
    await sharp(path.join(dir, file))
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, "galeria", `${base}.webp`));
    // Tiny blur placeholder inlined at build time by the gallery data module.
    await sharp(path.join(dir, file))
      .resize({ width: 16 })
      .webp({ quality: 30 })
      .toFile(path.join(OUT, "galeria", `${base}-blur.webp`));
  }

  // --- Hero video + poster ---
  await fs.copyFile(
    path.join(SRC, "Video Hero", "Crochet_website_hero_animation_202608062330.mp4"),
    path.join(OUT, "hero.mp4"),
  );

  console.log(`Assets built: ${files.length} gallery images, mascot, logo, video.`);
}

main();

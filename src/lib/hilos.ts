/**
 * Los seis hilos de color de la paleta oficial, en tripletas RGB para poder
 * modularles la opacidad desde CSS (`rgb(var(--hilo) / 0.08)`).
 *
 * Se usan para teñir las tarjetas del proceso y de "por qué elegirnos": el
 * tinte se mantiene muy bajo para que el texto ciruela conserve su contraste
 * y la página no se vuelva un arcoíris.
 */
export const hilos = [
  { nombre: "rosa", rgb: "249 138 191" },
  { nombre: "coral", rgb: "255 154 92" },
  { nombre: "sol", rgb: "240 215 50" },
  { nombre: "menta", rgb: "154 235 229" },
  { nombre: "cielo", rgb: "140 215 246" },
  { nombre: "lila", rgb: "190 163 240" },
] as const;

/** Devuelve el hilo que le toca a la posición `i`, dando la vuelta al final. */
export function hilo(i: number) {
  return hilos[i % hilos.length];
}

/**
 * Secuencia de los cinco pasos del proceso: rosa, durazno, crema, agua y
 * lavanda. Se salta el cielo para que la lavanda caiga en el último paso.
 */
export const hilosProceso = [
  hilos[0], // rosa
  hilos[1], // coral / durazno
  hilos[2], // sol / crema cálida
  hilos[3], // menta / agua
  hilos[5], // lila / lavanda
] as const;

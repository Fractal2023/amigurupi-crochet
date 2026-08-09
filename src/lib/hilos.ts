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
 * Las tarjetas usan un solo color más la crema del papel, y van rotando
 * entre cuatro pastel: rosa, durazno, lavanda y agua. Se dejan fuera el sol
 * y el cielo para que la sección no se vuelva un arcoíris.
 */
const rotacion = [hilos[0], hilos[1], hilos[5], hilos[3]] as const;

/** Color de la tarjeta número `i`, dando la vuelta al final. */
export function hiloTarjeta(i: number) {
  return rotacion[i % rotacion.length];
}

/** Los cinco pasos: rosa, durazno, lavanda, agua y otra vez rosa. */
export const hilosProceso = [0, 1, 2, 3, 4].map(hiloTarjeta);

"use client";

import { useEffect, useRef, useState } from "react";
import { Corazon } from "./ui/Icono";
import { HebraMini, OvilloMini } from "./ui/Adornos";

/**
 * Corazones, ovillos y hebras flotando de fondo por toda la página.
 *
 * Las piezas se reparten por **bandas de altura fija**, no por porcentajes:
 * repartirlas en porcentaje deja tramos enteros sin nada en las secciones
 * largas, y con una ventana de 700px podías hacer scroll sin ver ninguna.
 * Así la densidad es la misma mida lo que mida la sección.
 *
 * La capa va como primer hijo de una sección `relative overflow-hidden` con
 * z-index negativo: esa es justo la capa que pinta encima del fondo de la
 * sección pero debajo de todo su contenido, así que nunca estorban al texto.
 */
const piezas = { corazon: Corazon, ovillo: OvilloMini, hebra: HebraMini };
type Pieza = keyof typeof piezas;

/** Alto de cada banda. Tres piezas por banda dan una densidad discreta. */
const BANDA = 440;

type Ranura = {
  /** Posición horizontal, en % del ancho de la sección. */
  x: number;
  /** Posición vertical dentro de su banda, de 0 a 1. */
  y: number;
  s: number;
  t: number;
  giro: number;
  o: number;
  tipo: Pieza;
};

/**
 * Doce ranuras que se van repartiendo entre bandas. Al no ser múltiplo de
 * las tres piezas por banda, el patrón tarda cuatro bandas en repetirse y no
 * se nota el mosaico.
 */
const ranuras: Ranura[] = [
  { x: 4, y: 0.14, s: 17, t: 15, giro: -12, o: 0.5, tipo: "corazon" },
  { x: 88, y: 0.3, s: 13, t: 18, giro: 11, o: 0.42, tipo: "ovillo" },
  { x: 46, y: 0.72, s: 11, t: 17, giro: -6, o: 0.34, tipo: "hebra" },
  { x: 93, y: 0.08, s: 15, t: 21, giro: 9, o: 0.46, tipo: "corazon" },
  { x: 12, y: 0.55, s: 12, t: 19, giro: 14, o: 0.38, tipo: "ovillo" },
  { x: 68, y: 0.9, s: 14, t: 20, giro: -9, o: 0.4, tipo: "corazon" },
  { x: 2, y: 0.42, s: 12, t: 16, giro: 8, o: 0.36, tipo: "hebra" },
  { x: 76, y: 0.2, s: 16, t: 22, giro: -10, o: 0.48, tipo: "corazon" },
  { x: 30, y: 0.86, s: 13, t: 18, giro: 13, o: 0.38, tipo: "ovillo" },
  { x: 96, y: 0.64, s: 11, t: 19, giro: -7, o: 0.34, tipo: "hebra" },
  { x: 20, y: 0.26, s: 14, t: 17, giro: 5, o: 0.42, tipo: "corazon" },
  { x: 58, y: 0.48, s: 12, t: 21, giro: -13, o: 0.32, tipo: "ovillo" },
];

export function Flotantes({ patron = 0 }: { patron?: number }) {
  const capa = useRef<HTMLDivElement>(null);
  const [bandas, setBandas] = useState(0);

  useEffect(() => {
    const padre = capa.current?.parentElement;
    if (!padre) return;

    const medir = () =>
      setBandas(Math.max(1, Math.round(padre.offsetHeight / BANDA)));

    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(padre);
    return () => observador.disconnect();
  }, []);

  const adornos = Array.from({ length: bandas }, (_, b) =>
    [0, 1, 2].map((i) => {
      const r = ranuras[(patron * 5 + b * 3 + i) % ranuras.length];
      return { ...r, clave: `${b}-${i}`, arriba: (b + r.y) * BANDA };
    }),
  ).flat();

  return (
    <div
      ref={capa}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {adornos.map((a, i) => {
        const Pieza = piezas[a.tipo];
        return (
          <span
            key={a.clave}
            className="absolute motion-safe:animate-[deriva_var(--dur)_ease-in-out_infinite] motion-reduce:animate-none"
            style={
              {
                left: `${a.x}%`,
                top: a.arriba,
                opacity: a.o,
                "--dur": `${a.t}s`,
                "--giro": `${a.giro}deg`,
                animationDelay: `${(i % 7) * 0.9}s`,
              } as React.CSSProperties
            }
          >
            <Pieza
              className="text-rosa-300"
              style={{ width: a.s, height: a.s }}
              strokeWidth={a.tipo === "corazon" ? 1.8 : undefined}
            />
          </span>
        );
      })}
    </div>
  );
}

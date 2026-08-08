"use client";

import { valores } from "@/lib/contenido";
import { hilo } from "@/lib/hilos";
import { iconos } from "../ui/Icono";
import { Bucle, Chispita, CorazonLleno, Espiral, Flor, Puntada } from "../ui/Adornos";
import { Eyebrow } from "../ui/Puntada";
import { Escalonado, Hijo, Revelar, TituloRevelado } from "../ui/Movimiento";
import { Corazones } from "../Corazones";

/** Mismo lenguaje que el proceso: silueta propia y adorno propio por tarjeta. */
const siluetas = [
  { radio: "2.75rem 1.25rem 2.5rem 1.5rem", giro: -0.6, Adorno: Flor },
  { radio: "1.25rem 2.75rem 1.5rem 2.5rem", giro: 0.5, Adorno: Bucle },
  { radio: "2.5rem 1.5rem 1.25rem 2.75rem", giro: -0.5, Adorno: CorazonLleno },
  { radio: "1.5rem 2.5rem 2.75rem 1.25rem", giro: 0.6, Adorno: Puntada },
  { radio: "2.75rem 2rem 1.5rem 2.25rem", giro: -0.7, Adorno: Chispita },
  { radio: "1.5rem 2.75rem 2.25rem 1.5rem", giro: 0.55, Adorno: Flor },
];

export function Valores() {
  return (
    <section className="relative overflow-hidden bg-lienzo py-24 sm:py-32 lg:py-40">
      <Corazones patron={0} />
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <header className="mx-auto max-w-[40rem] text-center">
          <Revelar className="flex justify-center">
            <Eyebrow>Por qué elegirnos</Eyebrow>
          </Revelar>
          <TituloRevelado
            texto="Lo que hace distinta a cada pieza"
            desde={0.05}
            acentoDesde={3}
            claseAcento="text-gradiente italic"
            className="mt-6 font-display text-[clamp(2.25rem,5.2vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-tinta"
          />
        </header>

        <Escalonado
          as="ul"
          paso={0.07}
          className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {valores.map((valor, i) => {
            const Icono = iconos[valor.icono];
            const { radio, giro, Adorno } = siluetas[i];
            return (
              <Hijo as="li" key={valor.titulo}>
                <article
                  // --hilo lleva el color de la paleta que le toca; el relleno
                  // en degradado, la puntada y el canto los ponen las clases.
                  style={
                    {
                      "--hilo": hilo(i).rgb,
                      borderRadius: radio,
                      rotate: `${giro}deg`,
                    } as React.CSSProperties
                  }
                  className="tarjeta-lujo puntada-borde grano group h-full p-9 sm:p-10 motion-reduce:rotate-0"
                >
                  <span
                    aria-hidden
                    className="boton-ovillo relative grid h-16 w-16 place-items-center overflow-hidden rounded-full text-tinta/85 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
                  >
                    <Espiral className="absolute inset-0 h-full w-full text-[rgb(var(--hilo))] opacity-25" />
                    <Icono className="relative h-7 w-7" />
                  </span>

                  <h3 className="mt-7 font-display text-[1.4375rem] font-medium leading-[1.18] tracking-[-0.02em] text-tinta">
                    {valor.titulo}
                  </h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-[1.72] text-tinta-70">
                    {valor.texto}
                  </p>

                  <Adorno className="pointer-events-none absolute bottom-6 right-6 h-9 w-9 text-[rgb(var(--hilo))] opacity-45" />
                </article>
              </Hijo>
            );
          })}
        </Escalonado>
      </div>
    </section>
  );
}

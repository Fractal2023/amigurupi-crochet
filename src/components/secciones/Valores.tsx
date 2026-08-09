"use client";

import { valores } from "@/lib/contenido";
import { hiloTarjeta } from "@/lib/hilos";
import { iconos } from "../ui/Icono";
import { Bucle, Chispita, CorazonLleno, Flor, Puntada } from "../ui/Adornos";
import { Eyebrow } from "../ui/Puntada";
import { Escalonado, Hijo, Revelar, TituloRevelado } from "../ui/Movimiento";
import { Flotantes } from "../Flotantes";

/** Mismo lenguaje que el proceso: silueta propia y adorno propio por tarjeta. */
const siluetas = [
  { radio: "2.5rem 1rem 2.25rem 1.25rem", giro: -0.7, Adorno: Flor },
  { radio: "1rem 2.5rem 1.25rem 2.25rem", giro: 0.6, Adorno: Bucle },
  { radio: "2.25rem 1.25rem 1rem 2.5rem", giro: -0.6, Adorno: CorazonLleno },
  { radio: "1.25rem 2.25rem 2.5rem 1rem", giro: 0.7, Adorno: Puntada },
  { radio: "2.5rem 1.75rem 1.25rem 2rem", giro: -0.8, Adorno: Chispita },
  { radio: "1.25rem 2.5rem 2rem 1.25rem", giro: 0.65, Adorno: Flor },
];

export function Valores() {
  return (
    <section className="relative overflow-hidden bg-lienzo py-16 sm:py-20 lg:py-28">
      <Flotantes patron={1} />
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
                  // Dos colores por pieza: el pastel de --hilo y la crema.
                  // El relleno liso, el contorno y el festón los ponen las
                  // clases; aquí sólo va el color y la silueta.
                  style={
                    {
                      "--hilo": hiloTarjeta(i).rgb,
                      borderRadius: radio,
                      rotate: `${giro}deg`,
                    } as React.CSSProperties
                  }
                  className="tarjeta-plana puntada-borde feston-inferior group h-full px-9 pb-14 pt-9 sm:px-10 sm:pb-16 sm:pt-10 motion-reduce:rotate-0"
                >
                  <span
                    aria-hidden
                    className="aro-plano grid h-16 w-16 place-items-center rounded-full text-tinta group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
                  >
                    <Icono className="h-7 w-7" />
                  </span>

                  <h3 className="mt-7 font-display text-[1.4375rem] font-medium leading-[1.18] tracking-[-0.02em] text-tinta">
                    {valor.titulo}
                  </h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-[1.72] text-tinta-70">
                    {valor.texto}
                  </p>

                  <Adorno className="pointer-events-none absolute bottom-16 right-7 h-8 w-8 text-[var(--trazo-hilo)] opacity-60" />
                </article>
              </Hijo>
            );
          })}
        </Escalonado>
      </div>
    </section>
  );
}

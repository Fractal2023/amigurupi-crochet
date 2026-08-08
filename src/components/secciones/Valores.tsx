"use client";

import { valores } from "@/lib/contenido";
import { hilo } from "@/lib/hilos";
import { iconos } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Escalonado, Hijo, Revelar, TituloRevelado } from "../ui/Movimiento";
import { Corazones } from "../Corazones";

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
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {valores.map((valor, i) => {
            const Icono = iconos[valor.icono];
            return (
              <Hijo as="li" key={valor.titulo}>
                <article
                  // --hilo lleva el color de la paleta que le toca a esta
                  // tarjeta; el relleno en degradado y el canto translúcido
                  // los pone la clase .tarjeta-lujo.
                  style={{ "--hilo": hilo(i).rgb } as React.CSSProperties}
                  className="tarjeta-lujo grano group h-full rounded-[2rem] p-9 sm:p-10"
                >
                  <span
                    aria-hidden
                    className="circulo-hilo grid h-16 w-16 backdrop-blur-[6px] backdrop-saturate-150 place-items-center rounded-full p-4 text-tinta/85 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
                  >
                    <Icono className="h-full w-full" />
                  </span>

                  <h3 className="mt-7 font-display text-[1.4375rem] font-medium leading-[1.18] tracking-[-0.02em] text-tinta">
                    {valor.titulo}
                  </h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-[1.72] text-tinta-70">
                    {valor.texto}
                  </p>
                </article>
              </Hijo>
            );
          })}
        </Escalonado>
      </div>
    </section>
  );
}

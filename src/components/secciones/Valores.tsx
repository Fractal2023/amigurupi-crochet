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
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {valores.map((valor, i) => {
            const Icono = iconos[valor.icono];
            return (
              <Hijo as="li" key={valor.titulo}>
                <article
                  // --hilo lleva el color de la paleta que le toca a esta
                  // tarjeta; el tinte se queda muy bajo para no comprometer
                  // el contraste del texto.
                  style={{ "--hilo": hilo(i).rgb } as React.CSSProperties}
                  className="group relative isolate h-full overflow-hidden rounded-[var(--radius-carta)] border border-[rgb(var(--hilo)/0.35)] bg-[rgb(var(--hilo)/0.07)] p-8 transition-all duration-500 ease-[var(--ease-suave)] hover:-translate-y-1.5 hover:border-[rgb(var(--hilo)/0.6)] hover:shadow-[0_18px_48px_-14px_rgb(var(--hilo)/0.75)]"
                >
                  {/* Resplandor: late suavemente mientras el cursor está encima */}
                  <span
                    aria-hidden
                    className="absolute -inset-px -z-10 rounded-[inherit] bg-[radial-gradient(120%_90%_at_50%_0%,rgb(var(--hilo)/0.42),transparent_70%)] opacity-0 transition-opacity duration-500 ease-[var(--ease-suave)] group-hover:opacity-100 motion-safe:group-hover:animate-[resplandor_2.6s_ease-in-out_infinite]"
                  />

                  {/* Hilo de color que se teje de izquierda a derecha */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[rgb(var(--hilo))] transition-transform duration-500 ease-[var(--ease-suave)] group-hover:scale-x-100"
                  />

                  <span
                    aria-hidden
                    className="grid h-13 w-13 place-items-center rounded-2xl border border-[rgb(var(--hilo)/0.45)] bg-white/75 p-3 text-tinta transition-all duration-500 group-hover:scale-105 group-hover:bg-white motion-reduce:group-hover:scale-100"
                  >
                    <Icono className="h-6 w-6" />
                  </span>

                  <h3 className="mt-6 font-display text-[1.3125rem] leading-snug text-tinta">
                    {valor.titulo}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.68] text-tinta-70">
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

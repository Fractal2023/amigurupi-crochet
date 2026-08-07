"use client";

import { valores } from "@/lib/contenido";
import { iconos } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Escalonado, Hijo, Revelar, TituloRevelado } from "../ui/Movimiento";

/** Un hilo de la paleta oficial por tarjeta, en el orden del logo. */
const hilos = [
  "var(--color-rosa)",
  "var(--color-coral)",
  "var(--color-sol)",
  "var(--color-menta)",
  "var(--color-cielo)",
  "var(--color-lila)",
];

export function Valores() {
  return (
    <section className="relative overflow-hidden bg-lienzo py-24 sm:py-32 lg:py-40">
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
                <article className="group relative h-full overflow-hidden rounded-[var(--radius-carta)] border border-hilo/80 bg-white/60 p-8 transition-all duration-500 ease-[var(--ease-suave)] hover:-translate-y-1.5 hover:border-transparent hover:bg-white hover:shadow-[var(--shadow-alta)]">
                  {/* Hilo de color que se revela al pasar el cursor */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-suave)] group-hover:scale-x-100"
                    style={{ backgroundColor: hilos[i % hilos.length] }}
                  />

                  <span
                    aria-hidden
                    className="grid h-13 w-13 place-items-center rounded-2xl border border-hilo bg-velo p-3 text-rosa-500 transition-colors duration-500 group-hover:border-rosa-200 group-hover:text-rosa-600"
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

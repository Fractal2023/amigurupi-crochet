"use client";

import { testimonios } from "@/lib/contenido";
import { Estrella } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Escalonado, Hijo, Revelar, TituloRevelado } from "../ui/Movimiento";
import { Flotantes } from "../Flotantes";

export function Testimonios() {
  return (
    <section className="grano relative overflow-hidden bg-velo py-16 sm:py-20 lg:py-28">
      <Flotantes patron={2} />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,var(--color-lienzo),transparent)]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,138,191,0.2),transparent_66%)] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <header className="mx-auto max-w-[40rem] text-center">
          <Revelar className="flex justify-center">
            <Eyebrow>Testimonios</Eyebrow>
          </Revelar>
          <TituloRevelado
            texto="Lo que dicen quienes ya nos confiaron su idea"
            desde={0.05}
            acentoDesde={4}
            claseAcento="text-gradiente italic"
            className="mt-6 font-display text-[clamp(2.25rem,5.2vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-tinta"
          />
        </header>

        <Escalonado
          as="ul"
          paso={0.09}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {testimonios.map((testimonio, i) => (
            <Hijo
              as="li"
              key={testimonio.tipo}
              className={i % 2 === 1 ? "lg:mt-10" : ""}
            >
              <figure className="vidrio group flex h-full flex-col gap-5 rounded-[var(--radius-carta)] p-7 shadow-[var(--shadow-suave)] transition-all duration-500 ease-[var(--ease-suave)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-alta)] motion-safe:animate-[flotar_var(--dur)_ease-in-out_infinite]"
                style={
                  {
                    "--dur": `${9 + i}s`,
                    animationDelay: `${i * 0.7}s`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="flex gap-1 text-rosa-400"
                  role="img"
                  aria-label="5 de 5 estrellas"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Estrella key={s} className="h-[0.9rem] w-[0.9rem]" />
                  ))}
                </div>

                <blockquote className="flex-1 text-[0.9375rem] leading-[1.72] text-tinta-70">
                  “{testimonio.texto}”
                </blockquote>

                <figcaption className="flex items-center gap-2.5 border-t border-rosa-200/60 pt-5">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-rosa-300"
                  />
                  <span className="eyebrow text-tinta-50">{testimonio.tipo}</span>
                </figcaption>
              </figure>
            </Hijo>
          ))}
        </Escalonado>
      </div>
    </section>
  );
}

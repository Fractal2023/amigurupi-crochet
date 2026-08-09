"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { marca, preguntas } from "@/lib/contenido";
import { Boton } from "../ui/Boton";
import { Flecha, Mas } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Revelar, TituloRevelado } from "../ui/Movimiento";
import { Flotantes } from "../Flotantes";

export function Preguntas() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-lienzo py-16 sm:py-20 lg:py-28"
    >
      <Flotantes patron={0} />
      <div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Revelar>
            <Eyebrow>Preguntas frecuentes</Eyebrow>
          </Revelar>
          <TituloRevelado
            texto="Todo lo que suelen preguntarnos"
            desde={0.05}
            acentoDesde={3}
            claseAcento="text-gradiente italic"
            className="mt-6 font-display text-[clamp(2.25rem,5.2vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-tinta"
          />
          <Revelar retraso={0.1}>
            <p className="mt-6 max-w-[26rem] text-[1.0625rem] leading-[1.7] text-tinta-70">
              ¿Te quedó una duda que no está aquí? Escríbenos y con gusto te la
              resolvemos antes de que hagas cualquier pago.
            </p>
            <div className="mt-8">
              <Boton
                href={marca.whatsappUrl}
                variante="contorno"
                icono={<Flecha className="h-[1.05rem] w-[1.05rem]" />}
              >
                Preguntar por WhatsApp
              </Boton>
            </div>
          </Revelar>
        </div>

        <ul className="divide-y divide-rosa-200/70 border-y border-rosa-200/70">
          {preguntas.map((item, i) => {
            const activa = abierta === i;
            return (
              <li key={item.p}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setAbierta(activa ? null : i)}
                    aria-expanded={activa}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-boton-${i}`}
                    className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left transition-colors duration-300"
                  >
                    <span
                      className={`font-display text-[1.125rem] leading-snug transition-colors duration-300 sm:text-[1.25rem] ${
                        activa ? "text-rosa-600" : "text-tinta group-hover:text-rosa-500"
                      }`}
                    >
                      {item.p}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-400 ease-[var(--ease-suave)] ${
                        activa
                          ? "rotate-45 border-transparent bg-[linear-gradient(120deg,var(--color-rosa-500),var(--color-coral))] text-white"
                          : "border-rosa-200 text-rosa-500 group-hover:border-rosa-300 group-hover:bg-velo"
                      }`}
                    >
                      <Mas className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {activa ? (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-boton-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.3 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[42rem] pb-7 pr-12 text-[0.9375rem] leading-[1.75] text-tinta-70 sm:text-[1rem]">
                        {item.r}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

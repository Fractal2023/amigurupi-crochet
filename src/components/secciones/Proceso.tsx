"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { marca, pasos } from "@/lib/contenido";
import { Boton } from "../ui/Boton";
import { Flecha } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Revelar, TituloRevelado } from "../ui/Movimiento";

export function Proceso() {
  const pista = useRef<HTMLOListElement>(null);
  const quieto = useReducedMotion();

  // El hilo se teje conforme la lista atraviesa la pantalla.
  const { scrollYProgress } = useScroll({
    target: pista,
    offset: ["start 72%", "end 62%"],
  });
  const avance = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="proceso"
      className="grano relative scroll-mt-24 overflow-hidden bg-velo py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,var(--color-lienzo),transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,var(--color-lienzo),transparent)]"
      />

      <div className="relative mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <header className="mx-auto max-w-[42rem] text-center">
          <Revelar className="flex justify-center">
            <Eyebrow>Cómo encargar</Eyebrow>
          </Revelar>

          <TituloRevelado
            texto="Así transformamos tu idea en una pieza única"
            desde={0.05}
            acentoDesde={5}
            claseAcento="text-gradiente italic"
            className="mt-6 font-display text-[clamp(2.25rem,5.2vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-tinta"
          />

          <Revelar retraso={0.12}>
            <p className="mx-auto mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-tinta-70">
              Cinco pasos, un solo mensaje de WhatsApp para empezar. Sin
              formularios largos ni intermediarios.
            </p>
          </Revelar>
        </header>

        <ol ref={pista} className="relative mt-16 sm:mt-20 lg:mt-24">
          {/* Hilo guía: recorrido completo en tenue + progreso en color */}
          <div
            aria-hidden
            className="absolute left-[1.6875rem] top-2 h-[calc(100%-4rem)] w-[2px] rounded-full bg-rosa-200/70 lg:left-1/2 lg:-translate-x-1/2"
          >
            <motion.div
              className="h-full w-full origin-top rounded-full bg-[linear-gradient(180deg,var(--color-rosa-400),var(--color-coral))]"
              style={quieto ? { scaleY: 1 } : { scaleY: avance }}
            />
          </div>

          {pasos.map((paso, i) => {
            const derecha = i % 2 === 1;
            return (
              <li
                key={paso.numero}
                className="relative grid grid-cols-[3.375rem_1fr] items-start gap-x-5 pb-12 last:pb-0 sm:gap-x-7 lg:grid-cols-[1fr_5rem_1fr] lg:gap-x-0 lg:pb-16"
              >
                {/* Nodo del hilo: primera columna en móvil, central en escritorio */}
                <div className="relative z-10 flex justify-center lg:col-start-2 lg:row-start-1">
                  <motion.span
                    initial={{ scale: quieto ? 1 : 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-25% 0px -25% 0px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="grid h-14 w-14 place-items-center rounded-full border border-white/80 bg-lienzo/90 font-display text-[1.0625rem] text-rosa-600 shadow-[var(--shadow-alta)] backdrop-blur-sm"
                  >
                    {paso.numero}
                  </motion.span>
                </div>

                {/* La tarjeta alterna de lado en escritorio; en móvil siempre va
                    a la derecha del hilo. */}
                <div
                  className={
                    derecha
                      ? "lg:col-start-3 lg:row-start-1"
                      : "lg:col-start-1 lg:row-start-1"
                  }
                >
                  <Tarjeta paso={paso} alineado={derecha ? "izquierda" : "derecha"} />
                </div>
              </li>
            );
          })}
        </ol>

        <Revelar retraso={0.1}>
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <Boton
              href={marca.whatsappUrl}
              icono={<Flecha className="h-[1.05rem] w-[1.05rem]" />}
            >
              Empezar mi encargo
            </Boton>
            <p className="text-[0.875rem] text-tinta-50">
              Respondo personalmente, normalmente el mismo día.
            </p>
          </div>
        </Revelar>
      </div>
    </section>
  );
}

function Tarjeta({
  paso,
  alineado,
}: {
  paso: (typeof pasos)[number];
  alineado: "izquierda" | "derecha";
}) {
  return (
    <Revelar y={22}>
      <article
        className={`group rounded-[var(--radius-carta)] border border-white/70 bg-white/72 p-6 shadow-[var(--shadow-suave)] backdrop-blur-md transition-all duration-500 ease-[var(--ease-suave)] hover:-translate-y-1 hover:border-rosa-200 hover:shadow-[var(--shadow-alta)] sm:p-8 ${
          alineado === "derecha" ? "lg:mr-10 lg:text-right" : "lg:ml-10"
        }`}
      >
        <h3 className="font-display text-[1.25rem] leading-snug text-tinta sm:text-[1.4375rem]">
          {paso.titulo}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-[1.68] text-tinta-70 sm:text-[1rem]">
          {paso.texto}
        </p>
      </article>
    </Revelar>
  );
}

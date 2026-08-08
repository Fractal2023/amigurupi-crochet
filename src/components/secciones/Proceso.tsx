"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { marca, pasos } from "@/lib/contenido";
import { hilosProceso } from "@/lib/hilos";
import { Boton } from "../ui/Boton";
import { Flecha } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Revelar, TituloRevelado } from "../ui/Movimiento";
import { Corazones } from "../Corazones";

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
      <Corazones patron={1} />
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
          {/* Hilo guía. La base se desvanece por los extremos en vez de
              cortarse en seco, y el avance recorre la paleta completa con
              un halo suave, para que no parezca una barra de progreso. */}
          <div
            aria-hidden
            className="absolute left-[2.25rem] top-2 h-[calc(100%-4rem)] w-[3px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,transparent,rgb(249_138_191/0.3)_9%,rgb(249_138_191/0.3)_91%,transparent)] lg:left-1/2"
          >
            <motion.div
              className="h-full w-full origin-top rounded-full bg-[linear-gradient(180deg,var(--color-rosa),var(--color-coral)_28%,var(--color-sol)_50%,var(--color-menta)_72%,var(--color-lila))] shadow-[0_0_14px_-1px_rgb(249_138_191/0.7)]"
              style={quieto ? { scaleY: 1 } : { scaleY: avance }}
            />
          </div>

          {pasos.map((paso, i) => {
            const derecha = i % 2 === 1;
            return (
              <li
                key={paso.numero}
                className="relative grid grid-cols-[4.5rem_1fr] items-center gap-x-4 pb-14 last:pb-0 sm:gap-x-5 lg:grid-cols-[1fr_5.5rem_1fr] lg:gap-x-0 lg:pb-20"
              >
                {/* Número: pieza editorial, no una insignia. Va sobre la
                    tarjeta (z-10) y ésta se mete bajo él con márgenes
                    negativos, así el círculo queda medio fuera del canto. */}
                <div className="relative z-10 flex justify-center lg:col-start-2 lg:row-start-1">
                  <motion.span
                    initial={{ scale: quieto ? 1 : 0.55, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-25% 0px -25% 0px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ "--hilo": hilosProceso[i].rgb } as React.CSSProperties}
                    className="circulo-hilo grid h-[4.5rem] w-[4.5rem] backdrop-blur-[6px] backdrop-saturate-150 place-items-center rounded-full font-display text-[1.625rem] leading-none tracking-[-0.02em] text-tinta/80 lg:h-[5.5rem] lg:w-[5.5rem] lg:text-[2rem]"
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
                  <Tarjeta paso={paso} indice={i} alineado={derecha ? "izquierda" : "derecha"} />
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
              Respondemos personalmente, normalmente el mismo día.
            </p>
          </div>
        </Revelar>
      </div>
    </section>
  );
}

function Tarjeta({
  paso,
  indice,
  alineado,
}: {
  paso: (typeof pasos)[number];
  indice: number;
  alineado: "izquierda" | "derecha";
}) {
  const derecha = alineado === "derecha";

  return (
    <Revelar y={22}>
      <article
        style={{ "--hilo": hilosProceso[indice].rgb } as React.CSSProperties}
        // El margen negativo mete la tarjeta bajo el círculo del número; el
        // padding del lado que solapa se agranda para que el texto respire.
        className={`tarjeta-lujo grano -ml-8 rounded-[2rem] py-8 pl-14 pr-7 sm:py-10 sm:pl-16 sm:pr-9 ${
          derecha
            ? "lg:ml-0 lg:-mr-8 lg:pl-10 lg:pr-16 lg:text-right"
            : "lg:pl-16 lg:pr-10"
        }`}
      >
        <h3 className="font-display text-[1.375rem] font-medium leading-[1.15] tracking-[-0.02em] text-tinta sm:text-[1.625rem]">
          {paso.titulo}
        </h3>
        <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-[1.72] text-tinta-70 sm:text-[1rem] lg:max-w-none">
          {paso.texto}
        </p>
      </article>
    </Revelar>
  );
}

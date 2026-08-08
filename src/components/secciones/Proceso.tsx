"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { marca, pasos } from "@/lib/contenido";
import { hilosProceso } from "@/lib/hilos";
import { Boton } from "../ui/Boton";
import { Flecha } from "../ui/Icono";
import { Bucle, Chispita, CorazonLleno, Espiral, Flor, Puntada } from "../ui/Adornos";
import { Eyebrow } from "../ui/Puntada";
import { Revelar, TituloRevelado } from "../ui/Movimiento";
import { Corazones } from "../Corazones";
import { HiloTejido } from "./HiloTejido";

/**
 * Cada paso tiene su propia silueta y su propio adorno, para que ninguna
 * tarjeta se lea como copia de la anterior. Los radios son asimétricos a
 * propósito: recortes de papel, no rectángulos.
 */
const siluetas = [
  { radio: "2.75rem 1.25rem 2.5rem 1.5rem", giro: -0.7, Adorno: Flor },
  { radio: "1.25rem 2.75rem 1.5rem 2.5rem", giro: 0.6, Adorno: Bucle },
  { radio: "2.5rem 1.5rem 1.25rem 2.75rem", giro: -0.5, Adorno: Puntada },
  { radio: "1.5rem 2.5rem 2.75rem 1.25rem", giro: 0.7, Adorno: CorazonLleno },
  { radio: "2.75rem 2rem 1.5rem 2.25rem", giro: -0.6, Adorno: Chispita },
];

export function Proceso() {
  const pista = useRef<HTMLOListElement>(null);

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

        {/* `isolate` mantiene el hilo (-z-10) dentro de esta lista: sin él
            acabaría detrás del fondo de la sección. El margen superior deja
            sitio al ovillo del que sale. */}
        <ol
          ref={pista}
          className="relative isolate mt-28 pt-20 sm:mt-32 lg:mt-36 lg:pt-24"
        >
          <HiloTejido contenedor={pista} ancla="[data-ancla]" />

          {pasos.map((paso, i) => {
            const derecha = i % 2 === 1;
            const { radio, giro, Adorno } = siluetas[i];
            return (
              <li
                key={paso.numero}
                className="relative grid grid-cols-[4.5rem_1fr] items-center gap-x-4 pb-16 last:pb-0 sm:gap-x-5 lg:grid-cols-[1fr_5.5rem_1fr] lg:gap-x-0 lg:pb-24"
              >
                <div
                  data-ancla
                  className="relative z-10 flex justify-center lg:col-start-2 lg:row-start-1"
                >
                  <NumeroOvillo numero={paso.numero} hilo={hilosProceso[i].rgb} />
                </div>

                <div
                  className={
                    derecha
                      ? "lg:col-start-3 lg:row-start-1"
                      : "lg:col-start-1 lg:row-start-1"
                  }
                >
                  <Tarjeta
                    paso={paso}
                    hilo={hilosProceso[i].rgb}
                    radio={radio}
                    giro={giro}
                    Adorno={Adorno}
                    alineado={derecha ? "izquierda" : "derecha"}
                  />
                </div>
              </li>
            );
          })}
        </ol>

        <Revelar retraso={0.1}>
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
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

/** Número sobre un botón de ovillo, con la espiral del tejido detrás. */
function NumeroOvillo({ numero, hilo }: { numero: string; hilo: string }) {
  const quieto = useReducedMotion();

  return (
    <motion.span
      initial={{ scale: quieto ? 1 : 0.55, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-25% 0px -25% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ "--hilo": hilo } as React.CSSProperties}
      className="boton-ovillo relative grid h-[4.5rem] w-[4.5rem] place-items-center overflow-hidden rounded-full lg:h-[5.5rem] lg:w-[5.5rem]"
    >
      <Espiral className="absolute inset-0 h-full w-full text-[rgb(var(--hilo))] opacity-25" />
      <span className="relative font-display text-[1.625rem] leading-none tracking-[-0.02em] text-tinta/80 lg:text-[2rem]">
        {numero}
      </span>
    </motion.span>
  );
}

function Tarjeta({
  paso,
  hilo,
  radio,
  giro,
  Adorno,
  alineado,
}: {
  paso: (typeof pasos)[number];
  hilo: string;
  radio: string;
  giro: number;
  Adorno: (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  alineado: "izquierda" | "derecha";
}) {
  const quieto = useReducedMotion();
  const derecha = alineado === "derecha";

  return (
    <motion.article
      initial={{ opacity: 0, y: quieto ? 0 : 26, scale: quieto ? 1 : 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={
        {
          "--hilo": hilo,
          borderRadius: radio,
          // Un grado escaso de inclinación: la etiqueta parece colocada a
          // mano, no encajada por una retícula.
          rotate: quieto ? 0 : `${giro}deg`,
        } as React.CSSProperties
      }
      className={`tarjeta-lujo puntada-borde grano -ml-8 py-9 pl-16 pr-8 sm:py-11 sm:pl-[4.75rem] sm:pr-10 ${
        derecha
          ? "lg:ml-0 lg:-mr-8 lg:pl-11 lg:pr-[4.75rem] lg:text-right"
          : "lg:pl-[4.75rem] lg:pr-11"
      }`}
    >
      <h3 className="font-display text-[1.375rem] font-medium leading-[1.15] tracking-[-0.02em] text-tinta sm:text-[1.625rem]">
        {paso.titulo}
      </h3>
      <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-[1.72] text-tinta-70 sm:text-[1rem] lg:max-w-none">
        {paso.texto}
      </p>

      <Adorno
        className={`pointer-events-none absolute bottom-5 h-9 w-9 text-[rgb(var(--hilo))] opacity-45 ${
          derecha ? "left-6 lg:left-9" : "right-6"
        }`}
      />
    </motion.article>
  );
}

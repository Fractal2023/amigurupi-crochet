"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { marca, pasos } from "@/lib/contenido";
import { hilosProceso } from "@/lib/hilos";
import { Boton } from "../ui/Boton";
import { Flecha } from "../ui/Icono";
import { Bucle, Chispita, CorazonLleno, Flor, Puntada } from "../ui/Adornos";
import { Eyebrow } from "../ui/Puntada";
import { Revelar, TituloRevelado } from "../ui/Movimiento";
import { Flotantes } from "../Flotantes";
import { HiloTejido } from "./HiloTejido";

/**
 * Cada paso tiene su propia silueta y su propio adorno, para que ninguna
 * tarjeta se lea como copia de la anterior. Los radios son asimétricos a
 * propósito: recortes de papel, no rectángulos.
 */
const siluetas = [
  { radio: "2.5rem 1rem 2.25rem 1.25rem", giro: -0.8, Adorno: Flor },
  { radio: "1rem 2.5rem 1.25rem 2.25rem", giro: 0.7, Adorno: Bucle },
  { radio: "2.25rem 1.25rem 1rem 2.5rem", giro: -0.6, Adorno: Puntada },
  { radio: "1.25rem 2.25rem 2.5rem 1rem", giro: 0.8, Adorno: CorazonLleno },
  { radio: "2.5rem 1.75rem 1.25rem 2rem", giro: -0.7, Adorno: Chispita },
];

export function Proceso() {
  const pista = useRef<HTMLOListElement>(null);

  return (
    <section
      id="proceso"
      className="relative scroll-mt-24 overflow-hidden bg-velo py-24 sm:py-32 lg:py-40"
    >
      <Flotantes patron={1} />
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

        {/* En móvil el recorrido baja en columna; a partir de `lg` se despliega
            en fila para verlo entero sin tanto scroll. `isolate` mantiene el
            hilo (-z-10) dentro de la lista: sin él acabaría detrás del fondo
            de la sección. */}
        <ol
          ref={pista}
          className="relative isolate mt-28 pt-20 sm:mt-32 lg:mt-24 lg:flex lg:items-start lg:gap-4 lg:pl-28 lg:pt-14"
        >
          <HiloTejido contenedor={pista} ancla="[data-ancla]" />

          {pasos.map((paso, i) => {
            const { radio, giro, Adorno } = siluetas[i];
            return (
              <li
                key={paso.numero}
                className={`relative grid grid-cols-[4.5rem_1fr] items-center gap-x-4 pb-16 last:pb-0 sm:gap-x-5 lg:flex lg:flex-1 lg:flex-col lg:items-center lg:gap-y-6 lg:pb-0 ${
                  // El desnivel alternado da al hilo algo por lo que serpentear.
                  i % 2 === 1 ? "lg:mt-20" : ""
                }`}
              >
                <div
                  data-ancla
                  className="relative z-10 flex justify-center lg:col-start-2 lg:row-start-1"
                >
                  <NumeroAro numero={paso.numero} hilo={hilosProceso[i].rgb} />
                </div>

                <Tarjeta
                  paso={paso}
                  hilo={hilosProceso[i].rgb}
                  radio={radio}
                  giro={giro}
                  Adorno={Adorno}
                  retraso={i * 0.09}
                />
              </li>
            );
          })}
        </ol>

        <Revelar retraso={0.1}>
          <div className="mt-20 flex flex-col items-center gap-4 text-center lg:mt-28">
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

/** Número dentro de un aro plano de crema con su contorno dibujado. */
function NumeroAro({ numero, hilo }: { numero: string; hilo: string }) {
  const quieto = useReducedMotion();

  return (
    <motion.span
      initial={{ scale: quieto ? 1 : 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ "--hilo": hilo } as React.CSSProperties}
      className="aro-plano grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full font-display text-[1.625rem] leading-none tracking-[-0.02em] text-tinta lg:h-[5rem] lg:w-[5rem] lg:text-[1.875rem]"
    >
      {numero}
    </motion.span>
  );
}

function Tarjeta({
  paso,
  hilo,
  radio,
  giro,
  Adorno,
  retraso,
}: {
  paso: (typeof pasos)[number];
  hilo: string;
  radio: string;
  giro: number;
  Adorno: (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  retraso: number;
}) {
  const quieto = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: quieto ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{ duration: 0.8, delay: retraso, ease: [0.22, 1, 0.36, 1] }}
      style={
        {
          "--hilo": hilo,
          borderRadius: radio,
          // Un grado escaso de inclinación: la etiqueta parece colocada a
          // mano, no encajada por una retícula.
          rotate: quieto ? 0 : `${giro}deg`,
        } as React.CSSProperties
      }
      className="tarjeta-plana puntada-borde feston-inferior -ml-8 px-8 pb-12 pt-9 pl-16 sm:px-10 sm:pb-14 sm:pt-11 sm:pl-[4.75rem] lg:ml-0 lg:w-full lg:px-6 lg:pb-12 lg:pt-8"
    >
      <h3 className="font-display text-[1.375rem] font-medium leading-[1.15] tracking-[-0.02em] text-tinta sm:text-[1.5rem] lg:text-[1.3125rem]">
        {paso.titulo}
      </h3>
      <p className="mt-3.5 max-w-[34ch] text-[0.9375rem] leading-[1.7] text-tinta-70 lg:max-w-none lg:text-[0.875rem]">
        {paso.texto}
      </p>

      <Adorno className="pointer-events-none absolute bottom-14 right-6 h-8 w-8 text-[var(--trazo-hilo)] opacity-60 lg:bottom-16 lg:right-5" />
    </motion.article>
  );
}

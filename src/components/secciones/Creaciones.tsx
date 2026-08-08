"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { destacadas, marca } from "@/lib/contenido";
import { Boton } from "../ui/Boton";
import { Flecha } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Revelar, TituloRevelado } from "../ui/Movimiento";
import { Corazones } from "../Corazones";

const SUAVE = [0.22, 1, 0.36, 1] as const;

export function Creaciones() {
  const [indice, setIndice] = useState(0);
  const [direccion, setDireccion] = useState(1);
  const quieto = useReducedMotion();
  const arrastre = useRef(0);

  const ir = useCallback(
    (delta: number) => {
      setDireccion(delta);
      setIndice((i) => (i + delta + destacadas.length) % destacadas.length);
    },
    [],
  );

  const saltarA = (i: number) => {
    setDireccion(i > indice ? 1 : -1);
    setIndice(i);
  };

  // Navegación por teclado cuando el carrusel tiene el foco.
  const alTecla = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") ir(1);
    if (e.key === "ArrowLeft") ir(-1);
  };

  // Avance automático pausado al interactuar o si se pidió menos movimiento.
  const [pausado, setPausado] = useState(false);
  useEffect(() => {
    if (quieto || pausado) return;
    const t = setInterval(() => ir(1), 6500);
    return () => clearInterval(t);
  }, [quieto, pausado, ir]);

  const actual = destacadas[indice];

  return (
    <section
      id="creaciones"
      className="grano relative scroll-mt-24 overflow-hidden bg-[linear-gradient(170deg,var(--color-rosa-100)_0%,var(--color-blush)_45%,var(--color-rosa-100)_100%)] py-24 text-tinta sm:py-32 lg:py-40"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <Corazones patron={1} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_20%_0%,rgba(249,138,191,0.32),transparent_62%),radial-gradient(80%_60%_at_92%_96%,rgba(255,154,92,0.18),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <header className="max-w-[40rem]">
          <Revelar>
            <Eyebrow>Creaciones destacadas</Eyebrow>
          </Revelar>
          <TituloRevelado
            texto="Piezas que se convirtieron en recuerdo"
            desde={0.05}
            acentoDesde={3}
            claseAcento="text-gradiente italic"
            className="mt-6 font-display text-[clamp(2.25rem,5.2vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-tinta"
          />
        </header>

        <div
          className="relative mt-14 outline-none"
          tabIndex={0}
          role="group"
          aria-roledescription="carrusel"
          aria-label="Creaciones destacadas"
          onKeyDown={alTecla}
        >
          <div className="relative overflow-hidden rounded-[var(--radius-pieza)]">
            <AnimatePresence initial={false} mode="wait" custom={direccion}>
              <motion.article
                key={actual.archivo}
                custom={direccion}
                initial={{ opacity: 0, x: quieto ? 0 : direccion * 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: quieto ? 0 : direccion * -48 }}
                transition={{ duration: 0.65, ease: SUAVE }}
                drag={quieto ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragStart={(_, info) => (arrastre.current = info.point.x)}
                onDragEnd={(_, info) => {
                  const recorrido = info.point.x - arrastre.current;
                  if (Math.abs(recorrido) > 70) ir(recorrido < 0 ? 1 : -1);
                }}
                className="grid cursor-grab grid-cols-1 items-stretch active:cursor-grabbing lg:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:min-h-[32rem]">
                  <Image
                    src={`/galeria/${actual.archivo}.webp`}
                    alt={actual.titulo}
                    fill
                    draggable={false}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(59,15,43,0.18))]"
                  />
                </div>

                <div className="flex flex-col justify-center gap-6 border-t border-white/70 bg-white/75 p-8 backdrop-blur-md sm:p-12 lg:border-l lg:border-t-0 lg:p-14">
                  <p className="eyebrow text-rosa-600">{actual.titulo}</p>
                  <p className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium italic leading-[1.14] tracking-[-0.02em] text-tinta">
                    “{actual.frase}”
                  </p>
                  <p className="text-[0.9375rem] leading-[1.72] text-tinta-70 sm:text-[1rem]">
                    {actual.texto}
                  </p>
                  <div className="pt-1">
                    <Boton
                      href={marca.whatsappUrl}
                      variante="primario"
                      icono={<Flecha className="h-[1.05rem] w-[1.05rem]" />}
                    >
                      Quiero uno así
                    </Boton>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Controles */}
          <div className="mt-8 flex items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Elegir creación">
              {destacadas.map((d, i) => (
                <button
                  key={d.archivo}
                  type="button"
                  role="tab"
                  aria-selected={i === indice}
                  aria-label={d.titulo}
                  onClick={() => saltarA(i)}
                  className="group relative min-h-11 cursor-pointer px-1 py-3"
                >
                  <span
                    className={`block h-[3px] rounded-full transition-all duration-500 ease-[var(--ease-suave)] ${
                      i === indice
                        ? "w-14 bg-rosa-500"
                        : "w-7 bg-rosa-300/60 group-hover:bg-rosa-400"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex shrink-0 gap-2.5">
              <button
                type="button"
                onClick={() => ir(-1)}
                aria-label="Creación anterior"
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-rosa-300/70 bg-white/60 text-tinta transition-all duration-300 hover:border-rosa-400 hover:bg-white"
              >
                <Flecha className="h-[1.1rem] w-[1.1rem] rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => ir(1)}
                aria-label="Creación siguiente"
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-rosa-300/70 bg-white/60 text-tinta transition-all duration-300 hover:border-rosa-400 hover:bg-white"
              >
                <Flecha className="h-[1.1rem] w-[1.1rem]" />
              </button>
            </div>
          </div>

          <p aria-live="polite" className="sr-only">
            {actual.titulo}, {indice + 1} de {destacadas.length}
          </p>
        </div>
      </div>
    </section>
  );
}

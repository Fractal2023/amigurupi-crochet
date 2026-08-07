"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { destacadas, marca } from "@/lib/contenido";
import { Boton } from "../ui/Boton";
import { Flecha } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Revelar, TituloRevelado } from "../ui/Movimiento";

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
      className="grano relative scroll-mt-24 overflow-hidden bg-tinta py-24 text-white sm:py-32 lg:py-40"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_20%_0%,rgba(249,138,191,0.28),transparent_62%),radial-gradient(80%_60%_at_92%_96%,rgba(255,154,92,0.2),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <header className="max-w-[40rem]">
          <Revelar>
            <Eyebrow tono="text-rosa-300">Creaciones destacadas</Eyebrow>
          </Revelar>
          <TituloRevelado
            texto="Piezas que se convirtieron en recuerdo"
            desde={0.05}
            acentoDesde={3}
            claseAcento="italic text-rosa-300"
            className="mt-6 font-display text-[clamp(2.25rem,5.2vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-white"
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
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(59,15,43,0.5))] lg:bg-[linear-gradient(90deg,transparent_55%,rgba(59,15,43,0.45))]"
                  />
                </div>

                <div className="flex flex-col justify-center gap-6 bg-white/[0.06] p-8 backdrop-blur-md sm:p-12 lg:p-14">
                  <p className="eyebrow text-rosa-300">{actual.titulo}</p>
                  <p className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium italic leading-[1.14] tracking-[-0.02em] text-white">
                    “{actual.frase}”
                  </p>
                  <p className="text-[0.9375rem] leading-[1.72] text-white/72 sm:text-[1rem]">
                    {actual.texto}
                  </p>
                  <div className="pt-1">
                    <Boton
                      href={marca.whatsappUrl}
                      variante="fantasma"
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
                        ? "w-14 bg-rosa-300"
                        : "w-7 bg-white/25 group-hover:bg-white/50"
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
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                <Flecha className="h-[1.1rem] w-[1.1rem] rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => ir(1)}
                aria-label="Creación siguiente"
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
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

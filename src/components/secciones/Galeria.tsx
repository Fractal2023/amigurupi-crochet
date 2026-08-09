"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { categorias, piezas, type CategoriaId, type Pieza } from "@/lib/contenido";
import { Cruz, Flecha, Lupa } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Revelar, TituloRevelado } from "../ui/Movimiento";
import { Flotantes } from "../Flotantes";

const SUAVE = [0.22, 1, 0.36, 1] as const;

export function Galeria() {
  const [filtro, setFiltro] = useState<CategoriaId | "todas">("todas");
  const [abierta, setAbierta] = useState<number | null>(null);
  const quieto = useReducedMotion();

  const visibles = useMemo(
    () =>
      filtro === "todas"
        ? piezas
        : piezas.filter((p) => p.categorias.includes(filtro)),
    [filtro],
  );

  const mover = useCallback(
    (delta: number) =>
      setAbierta((actual) => {
        if (actual === null) return null;
        return (actual + delta + visibles.length) % visibles.length;
      }),
    [visibles.length],
  );

  // Teclado del visor: Escape cierra, flechas navegan.
  useEffect(() => {
    if (abierta === null) return;
    const alTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", alTecla);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", alTecla);
      document.body.style.overflow = "";
    };
  }, [abierta, mover]);

  return (
    <section
      id="galeria"
      className="relative scroll-mt-24 overflow-hidden bg-lienzo py-16 sm:py-20 lg:py-28"
    >
      <Flotantes patron={2} />
      <div
        aria-hidden
        className="absolute -right-40 top-1/3 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(190,163,240,0.14),transparent_66%)] blur-2xl"
      />

      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[36rem]">
            <Revelar>
              <Eyebrow>Galería</Eyebrow>
            </Revelar>
            <TituloRevelado
              texto="Algunos que ya cobraron vida"
              desde={0.05}
              acentoDesde={2}
              claseAcento="text-gradiente italic"
              className="mt-6 font-display text-[clamp(2.25rem,5.2vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-tinta"
            />
          </div>
          <Revelar retraso={0.1}>
            <p className="max-w-[24rem] text-[1.0625rem] leading-[1.7] text-tinta-70 lg:pb-2 lg:text-right">
              Cada pieza de esta galería fue un encargo real, tejido a mano para
              una persona concreta.
            </p>
          </Revelar>
        </header>

        {/* ---------- Filtros ---------- */}
        <Revelar retraso={0.08}>
          <div
            role="tablist"
            aria-label="Filtrar creaciones por categoría"
            className="mt-11 flex flex-wrap gap-2"
          >
            {categorias.map((cat) => {
              const activo = filtro === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activo}
                  onClick={() => setFiltro(cat.id)}
                  className={`relative min-h-11 cursor-pointer rounded-full px-5 py-2.5 text-[0.875rem] font-medium transition-colors duration-300 ${
                    activo
                      ? "text-white"
                      : "border border-rosa-200/80 bg-white/60 text-tinta-70 hover:border-rosa-300 hover:text-rosa-600"
                  }`}
                >
                  {activo ? (
                    <motion.span
                      layoutId="filtro-activo"
                      className="absolute inset-0 rounded-full bg-[linear-gradient(105deg,var(--color-rosa-500),var(--color-coral))] shadow-[var(--shadow-suave)]"
                      transition={{ duration: 0.45, ease: SUAVE }}
                    />
                  ) : null}
                  <span className="relative">{cat.etiqueta}</span>
                </button>
              );
            })}
          </div>
        </Revelar>

        {/* ---------- Mosaico ----------
            Retícula real (no columnas CSS): así el orden del DOM coincide con
            el orden visual y las animaciones de reordenado son correctas.
            `grid-flow-dense` cierra los huecos que dejan las piezas altas. */}
        <motion.ul
          layout
          // En una sola columna cada foto conserva su 4:5 original; el mosaico
          // de alturas variables sólo tiene sentido a partir de dos columnas.
          className="mt-10 grid grid-cols-1 gap-5 sm:auto-rows-[7rem] sm:grid-flow-dense sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibles.map((pieza, i) => (
              <motion.li
                key={pieza.archivo}
                layout
                initial={{ opacity: 0, scale: quieto ? 1 : 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: quieto ? 1 : 0.94 }}
                transition={{ duration: 0.5, delay: i * 0.035, ease: SUAVE }}
                className={`aspect-[4/5] sm:aspect-auto ${
                  pieza.tramo === "alto" ? "sm:row-span-5" : "sm:row-span-4"
                }`}
              >
                <Miniatura pieza={pieza} onAbrir={() => setAbierta(i)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p aria-live="polite" className="sr-only">
          {visibles.length}{" "}
          {visibles.length === 1 ? "creación visible" : "creaciones visibles"}
        </p>
      </div>

      {/* ---------- Visor ---------- */}
      <AnimatePresence>
        {abierta !== null ? (
          <Visor
            pieza={visibles[abierta]}
            indice={abierta}
            total={visibles.length}
            onCerrar={() => setAbierta(null)}
            onMover={mover}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Miniatura({ pieza, onAbrir }: { pieza: Pieza; onAbrir: () => void }) {
  return (
    <button
      type="button"
      onClick={onAbrir}
      className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[var(--radius-carta)] bg-velo shadow-[var(--shadow-suave)] transition-all duration-500 ease-[var(--ease-suave)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-flotante)]"
    >
      <span className="sr-only">Ver {pieza.titulo} en grande</span>
      <Image
        src={`/galeria/${pieza.archivo}.webp`}
        alt={pieza.titulo}
        fill
        loading="lazy"
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-suave)] group-hover:scale-[1.055] motion-reduce:group-hover:scale-100"
      />

      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(59,15,43,0.68))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 translate-y-3 p-6 text-left opacity-0 transition-all duration-500 ease-[var(--ease-suave)] group-hover:translate-y-0 group-hover:opacity-100"
      >
        <span className="block font-display text-[1.1875rem] leading-snug text-white">
          {pieza.titulo}
        </span>
        <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-white/85">
          {pieza.descripcion}
        </span>
      </span>

      <span
        aria-hidden
        className="absolute right-4 top-4 grid h-10 w-10 scale-75 place-items-center rounded-full border border-white/70 bg-white/25 text-white opacity-0 backdrop-blur-md transition-all duration-500 ease-[var(--ease-suave)] group-hover:scale-100 group-hover:opacity-100"
      >
        <Lupa className="h-[1.1rem] w-[1.1rem]" />
      </span>
    </button>
  );
}

function Visor({
  pieza,
  indice,
  total,
  onCerrar,
  onMover,
}: {
  pieza: Pieza;
  indice: number;
  total: number;
  onCerrar: () => void;
  onMover: (d: number) => void;
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={pieza.titulo}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[130] flex items-center justify-center bg-tinta/72 p-4 backdrop-blur-xl sm:p-8"
      onClick={onCerrar}
    >
      <motion.figure
        key={pieza.archivo}
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.5, ease: SUAVE }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full w-full max-w-[62rem] flex-col overflow-hidden rounded-[var(--radius-carta)] bg-lienzo shadow-[var(--shadow-flotante)] sm:flex-row"
      >
        <div className="relative aspect-[4/5] w-full shrink-0 bg-velo sm:aspect-auto sm:h-[min(78vh,44rem)] sm:w-[58%]">
          <Image
            src={`/galeria/${pieza.archivo}.webp`}
            alt={pieza.titulo}
            fill
            sizes="(max-width: 640px) 92vw, 40rem"
            className="object-cover"
          />
        </div>

        <figcaption className="flex flex-1 flex-col justify-center gap-4 p-7 sm:p-10">
          <p className="eyebrow text-rosa-600">
            {indice + 1} / {total}
          </p>
          <h3 className="font-display text-[clamp(1.5rem,3.4vw,2.125rem)] font-medium leading-[1.1] tracking-[-0.02em] text-tinta">
            {pieza.titulo}
          </h3>
          <p className="text-[0.9375rem] leading-[1.7] text-tinta-70">
            {pieza.descripcion}
          </p>

          <div className="mt-2 flex gap-2.5">
            <button
              type="button"
              onClick={() => onMover(-1)}
              aria-label="Creación anterior"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-rosa-200 text-tinta transition-colors duration-300 hover:border-rosa-300 hover:bg-velo"
            >
              <Flecha className="h-[1.1rem] w-[1.1rem] rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => onMover(1)}
              aria-label="Creación siguiente"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-rosa-200 text-tinta transition-colors duration-300 hover:border-rosa-300 hover:bg-velo"
            >
              <Flecha className="h-[1.1rem] w-[1.1rem]" />
            </button>
          </div>
        </figcaption>

        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar visor"
          autoFocus
          className="absolute right-3.5 top-3.5 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/70 bg-white/80 text-tinta backdrop-blur-md transition-colors duration-300 hover:bg-white"
        >
          <Cruz className="h-[1.1rem] w-[1.1rem]" />
        </button>
      </motion.figure>
    </motion.div>
  );
}

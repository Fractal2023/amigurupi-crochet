"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { marca, navegacion } from "@/lib/contenido";
import { hiloTarjeta } from "@/lib/hilos";
import { Flecha, WhatsApp } from "./ui/Icono";
import { Flotantes } from "./Flotantes";

export function Navegacion() {
  const [desplazado, setDesplazado] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState<string>("inicio");
  const quieto = useReducedMotion();

  useEffect(() => {
    const alScroll = () => setDesplazado(window.scrollY > 24);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  // Resalta la sección visible sin escuchar el scroll en cada frame.
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiva(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    navegacion.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observador.observe(el);
    });
    return () => observador.disconnect();
  }, []);

  // El menú móvil bloquea el scroll de fondo mientras está abierto.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  useEffect(() => {
    const alEscape = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alEscape);
    return () => window.removeEventListener("keydown", alEscape);
  }, []);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:shadow-[var(--shadow-alta)]"
      >
        Saltar al contenido
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-[var(--ease-suave)] ${
          desplazado
            ? "border-b border-white/60 bg-lienzo/72 py-2.5 shadow-[0_1px_24px_-12px_rgb(151_22_79/0.28)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-transparent py-4"
        }`}
      >
        <nav
          aria-label="Principal"
          className="mx-auto flex w-full max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8"
        >
          <Link
            href="#inicio"
            aria-label={`${marca.nombre} — inicio`}
            className="relative z-10 shrink-0"
          >
            <Image
              src="/marca/logo.png"
              alt={marca.nombre}
              width={1600}
              height={553}
              priority
              className={`w-auto transition-all duration-500 ease-[var(--ease-suave)] ${
                desplazado ? "h-9 sm:h-10" : "h-11 sm:h-12"
              } ${desplazado ? "" : "drop-shadow-[0_2px_14px_rgba(255,255,255,0.55)]"}`}
            />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {navegacion.map(({ id, etiqueta }) => (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  aria-current={activa === id ? "true" : undefined}
                  className={`relative block cursor-pointer rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-300 ${
                    activa === id
                      ? "text-rosa-600"
                      : desplazado
                        ? "text-tinta-70 hover:text-rosa-500"
                        : "text-tinta/80 hover:text-rosa-600"
                  }`}
                >
                  {etiqueta}
                  {activa === id ? (
                    <motion.span
                      layoutId="nav-activa"
                      className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-[linear-gradient(90deg,var(--color-rosa-400),var(--color-coral))]"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <Link
              href={marca.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden cursor-pointer items-center gap-2 rounded-full bg-[linear-gradient(105deg,var(--color-rosa-500),var(--color-rosa-400)_60%,var(--color-coral))] bg-[length:180%_auto] px-5 py-2.5 text-[0.875rem] font-medium text-white shadow-[var(--shadow-alta)] transition-all duration-300 ease-[var(--ease-suave)] hover:-translate-y-0.5 hover:bg-[position:100%_center] hover:shadow-[var(--shadow-flotante)] sm:inline-flex"
            >
              Encarga el tuyo
              <Flecha className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
            </Link>

            <BotonMenu
              abierto={abierto}
              onClick={() => setAbierto((v) => !v)}
              quieto={!!quieto}
            />
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {abierto ? (
          <motion.div
            id="menu-movil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] overflow-hidden bg-blush xl:hidden"
          >
            <Flotantes patron={2} />

            {/* El personaje se asoma por abajo mientras el menú está abierto */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, y: quieto ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -bottom-8 -right-16 aspect-[900/1282] w-40 opacity-90 sm:-right-10 sm:w-52"
            >
              <Image
                src="/marca/personaje.png"
                alt=""
                fill
                sizes="13rem"
                className="object-contain"
              />
            </motion.div>

            <motion.ul
              className="relative flex h-full flex-col justify-center gap-0 px-8 pt-20"
              initial="oculto"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {navegacion.map(({ id, etiqueta }, i) => (
                <motion.li
                  key={id}
                  variants={{
                    oculto: { opacity: 0, x: quieto ? 0 : -18 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <Link
                    href={`#${id}`}
                    onClick={() => setAbierto(false)}
                    className="group flex cursor-pointer items-center gap-3.5 border-b border-dashed border-rosa-300/70 py-4 font-display text-[1.75rem] leading-tight text-tinta transition-colors duration-300 hover:text-rosa-600"
                  >
                    {/* Nudo de hilo: cada entrada lleva su color de la paleta */}
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                      style={{ backgroundColor: `rgb(${hiloTarjeta(i).rgb})` }}
                    />
                    {etiqueta}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                className="pt-9"
                variants={{
                  oculto: { opacity: 0, y: quieto ? 0 : 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Link
                  href={marca.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setAbierto(false)}
                  className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[linear-gradient(105deg,var(--color-rosa-500),var(--color-coral))] px-7 py-4 font-medium text-white shadow-[var(--shadow-alta)]"
                >
                  <WhatsApp className="h-5 w-5" />
                  Encarga el tuyo
                </Link>
                <p className="mt-5 max-w-[13rem] font-display text-[1.0625rem] italic leading-snug text-rosa-600">
                  {marca.lema}
                </p>
              </motion.li>
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/**
 * Botón del menú móvil. En vez de dos rayas rectas lleva dos hebras de hilo
 * onduladas que se estiran hasta cruzarse al abrir: los dos trazos comparten
 * la misma estructura de curva, así que la interpolación es continua.
 */
const HEBRAS = {
  cerrado: [
    "M 5 9.2 C 8.5 7.4, 15.5 11, 19 9.2",
    "M 5 14.8 C 8.5 13, 15.5 16.6, 19 14.8",
  ],
  abierto: ["M 6 6 C 10 10, 14 14, 18 18", "M 18 6 C 14 10, 10 14, 6 18"],
};

function BotonMenu({
  abierto,
  onClick,
  quieto,
}: {
  abierto: boolean;
  onClick: () => void;
  quieto: boolean;
}) {
  const estado = abierto ? "abierto" : "cerrado";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={abierto}
      aria-controls="menu-movil"
      aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
      className={`relative z-10 grid h-12 w-12 cursor-pointer place-items-center rounded-full border-2 transition-colors duration-300 active:scale-95 motion-reduce:active:scale-100 xl:hidden ${
        abierto
          ? "border-rosa-500 bg-rosa-500 text-white"
          : "border-rosa-400 bg-lienzo text-rosa-600 hover:bg-rosa-50"
      }`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        className="h-[1.6rem] w-[1.6rem]"
      >
        {HEBRAS.cerrado.map((_, i) => (
          <motion.path
            key={i}
            initial={false}
            animate={{ d: HEBRAS[estado][i] }}
            transition={
              quieto
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 26 }
            }
          />
        ))}
      </svg>
    </button>
  );
}

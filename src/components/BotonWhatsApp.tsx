"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { marca } from "@/lib/contenido";
import { WhatsApp } from "./ui/Icono";

/**
 * Botón flotante permanente. Aparece tras el primer scroll para no competir
 * con el hero, y muestra una etiqueta al pasar el cursor en escritorio.
 */
export function BotonWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > 320);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-[110] sm:bottom-8 sm:right-8"
        >
          <Link
            href={marca.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbeme por WhatsApp para pedir información sobre un amigurumi personalizado"
            className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-white shadow-[var(--shadow-flotante)] transition-transform duration-300 ease-[var(--ease-suave)] hover:scale-105 active:scale-95 motion-reduce:hover:scale-100 sm:h-[3.75rem] sm:w-[3.75rem]"
          >
            {/* Pulso de atención, detrás del botón */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-rosa-300 motion-safe:animate-[latido_2.8s_var(--ease-suave)_infinite]"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[linear-gradient(140deg,var(--color-rosa-400),var(--color-rosa-500)_50%,var(--color-coral))] shadow-[0_0_28px_-4px_var(--color-rosa-300)] transition-shadow duration-300 group-hover:shadow-[0_0_44px_-2px_var(--color-rosa-300)]" />
            <WhatsApp className="relative h-7 w-7" />

            <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] hidden whitespace-nowrap rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[0.8125rem] font-medium text-tinta opacity-0 shadow-[var(--shadow-suave)] backdrop-blur-md transition-all duration-300 ease-[var(--ease-suave)] group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
              Escríbeme por WhatsApp
            </span>
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

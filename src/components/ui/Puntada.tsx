"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Motivo de marca: una cadeneta de crochet que se "teje" sola al entrar en
 * pantalla. Se usa como separador entre secciones y como columna del proceso.
 */
export function Cadeneta({
  className = "",
  color = "var(--color-rosa-300)",
}: {
  className?: string;
  color?: string;
}) {
  const quieto = useReducedMotion();

  return (
    <svg
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <motion.path
        d="M0 12 C 20 0, 40 0, 60 12 S 100 24, 120 12 S 160 0, 180 12 S 220 24, 240 12 S 280 0, 300 12 S 340 24, 360 12 S 400 0, 420 12 S 460 24, 480 12 S 520 0, 540 12 S 580 24, 600 12 S 640 0, 660 12 S 700 24, 720 12 S 760 0, 780 12 S 820 24, 840 12 S 880 0, 900 12 S 940 24, 960 12 S 1000 0, 1020 12 S 1060 24, 1080 12 S 1120 0, 1140 12 S 1180 24, 1200 12"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: quieto ? 1 : 0, opacity: quieto ? 1 : 0.2 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

/** Los siete hilos de la paleta oficial, como firma discreta de marca. */
export function HilosDeMarca({ className = "" }: { className?: string }) {
  const hilos = [
    "var(--color-rosa)",
    "var(--color-coral)",
    "var(--color-sol)",
    "var(--color-menta)",
    "var(--color-cielo)",
    "var(--color-lila)",
  ];

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-hidden>
      {hilos.map((hilo, i) => (
        <motion.span
          key={hilo}
          className="block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: hilo }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </span>
  );
}

/** Etiqueta de sección: punto de hilo + texto en versalitas espaciadas. */
export function Eyebrow({
  children,
  className = "",
  // rosa-600 en lugar de rosa-500: a 12px la etiqueta necesita 4.5:1.
  tono = "text-rosa-600",
}: {
  children: React.ReactNode;
  className?: string;
  tono?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-2.5 ${tono} ${className}`}>
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
      />
      {children}
    </p>
  );
}

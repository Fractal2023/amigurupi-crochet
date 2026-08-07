"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const SUAVE = [0.22, 1, 0.36, 1] as const;

/**
 * Revelado al hacer scroll. Entra desde abajo con opacidad, una sola vez.
 * Si el usuario pidió menos movimiento, aparece sin desplazamiento.
 */
export function Revelar({
  children,
  retraso = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  retraso?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const quieto = useReducedMotion();
  const M = motion[as];

  return (
    <M
      className={className}
      initial={{ opacity: 0, y: quieto ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.85, delay: retraso, ease: SUAVE }}
    >
      {children}
    </M>
  );
}

/** Contenedor que escalona la entrada de sus hijos `<Hijo>`. */
export function Escalonado({
  children,
  className,
  paso = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  paso?: number;
  as?: "div" | "ul" | "section";
}) {
  const M = motion[as];
  const variantes: Variants = {
    oculto: {},
    visible: { transition: { staggerChildren: paso, delayChildren: 0.05 } },
  };

  return (
    <M
      className={className}
      variants={variantes}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </M>
  );
}

export function Hijo({
  children,
  className,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article";
}) {
  const quieto = useReducedMotion();
  const M = motion[as];

  return (
    <M
      className={className}
      variants={{
        oculto: { opacity: 0, y: quieto ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, ease: SUAVE },
        },
      }}
    >
      {children}
    </M>
  );
}

/**
 * Titular que se revela palabra por palabra. Se anuncia como una sola frase
 * a los lectores de pantalla; las palabras sueltas son decorativas.
 */
export function TituloRevelado({
  texto,
  className,
  claseAcento,
  desde = 0,
  acentoDesde,
  como: Tag = "h2",
}: {
  texto: string;
  className?: string;
  claseAcento?: string;
  desde?: number;
  /** Índice de palabra a partir del cual se aplica `claseAcento`. */
  acentoDesde?: number;
  como?: "h1" | "h2" | "h3" | "p";
}) {
  const quieto = useReducedMotion();
  const palabras = texto.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden className="inline-block">
        {palabras.map((palabra, i) => (
          <span
            key={`${palabra}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.12em]"
          >
            <motion.span
              className={
                acentoDesde !== undefined && i >= acentoDesde
                  ? `inline-block ${claseAcento ?? ""}`
                  : "inline-block"
              }
              initial={{ y: quieto ? 0 : "110%", opacity: quieto ? 0 : 1 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.9,
                delay: desde + i * 0.055,
                ease: SUAVE,
              }}
            >
              {palabra}
            </motion.span>
            {i < palabras.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { marca } from "@/lib/contenido";
import { Boton } from "../ui/Boton";
import { Flecha } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Revelar, TituloRevelado } from "../ui/Movimiento";

const promesas = [
  {
    titulo: `${marca.anios} años de experiencia`,
    texto:
      "Cientos de horas de práctica que se notan en la tensión del punto y en el acabado de cada figura.",
  },
  {
    titulo: "Diseños únicos",
    texto:
      "Cada encargo nace de cero. No repito piezas ni vendo tu diseño a nadie más.",
  },
  {
    titulo: "Atención personalizada",
    texto:
      "Hablas directamente conmigo. Te comparto avances y ajustamos hasta que quede como lo imaginabas.",
  },
  {
    titulo: "Materiales de calidad",
    texto:
      "Algodón y chenille de buena marca, relleno hipoalergénico y ojos de seguridad.",
  },
];

/** Cinta de texto en movimiento continuo, como firma editorial de la marca. */
export function Cinta() {
  const frases = [
    "Amigurumis personalizados",
    "Mascotas tejidas",
    "Personajes a la medida",
    "Ramos de flores en crochet",
    "Regalos que se guardan",
    "Decoración tejida",
    "Figuras por encargo",
  ];
  const doble = [...frases, ...frases];

  return (
    <div
      aria-hidden
      className="relative flex overflow-hidden border-y border-rosa-200/50 bg-[linear-gradient(90deg,var(--color-blush),var(--color-lienzo)_50%,var(--color-blush))] py-5"
    >
      <div className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 motion-safe:animate-[desliz_38s_linear_infinite]">
        {doble.map((frase, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-[1.0625rem] italic text-tinta-70">
              {frase}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rosa-300" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Sobre() {
  const seccion = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: seccion,
    offset: ["start end", "end start"],
  });
  const yGrande = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const yChica = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      id="sobre-mi"
      ref={seccion}
      className="relative scroll-mt-24 overflow-hidden bg-lienzo py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="absolute -left-40 top-1/4 -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(249,138,191,0.16),transparent_66%)] blur-2xl"
      />

      <div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        {/* ---------- Composición asimétrica de imágenes ---------- */}
        <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
          <motion.div
            style={quieto ? undefined : { y: yGrande }}
            className="relative aspect-[4/5] w-[82%] overflow-hidden rounded-[var(--radius-pieza)] shadow-[var(--shadow-flotante)]"
          >
            <Image
              src="/galeria/55.webp"
              alt="Pareja personalizada tejida a mano, con su ropa y accesorios recreados"
              fill
              sizes="(max-width: 1024px) 82vw, 34vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(59,15,43,0.18))]"
            />
          </motion.div>

          <motion.div
            style={quieto ? undefined : { y: yChica }}
            className="absolute -bottom-10 right-0 aspect-square w-[46%] overflow-hidden rounded-[var(--radius-carta)] border-4 border-lienzo shadow-[var(--shadow-alta)]"
          >
            <Image
              src="/galeria/63.webp"
              alt="Perrito tejido en hilo chenille abrazando un corazón rosa"
              fill
              sizes="(max-width: 1024px) 38vw, 16vw"
              className="object-cover"
            />
          </motion.div>

          {/* Sello de años de oficio */}
          <Revelar retraso={0.2}>
            <div className="vidrio absolute -left-3 top-6 flex items-center gap-3 rounded-full py-2.5 pl-2.5 pr-5 shadow-[var(--shadow-alta)] sm:-left-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-rosa-400),var(--color-coral))] font-display text-lg leading-none text-white">
                {marca.anios}
              </span>
              <span className="text-[0.75rem] font-semibold uppercase leading-tight tracking-[0.14em] text-tinta-70">
                años
                <br />
                de oficio
              </span>
            </div>
          </Revelar>
        </div>

        {/* ---------- Texto ---------- */}
        <div className="lg:pl-4">
          <Revelar>
            <Eyebrow>Sobre mí</Eyebrow>
          </Revelar>

          <TituloRevelado
            texto="Cada puntada cuenta una historia"
            desde={0.05}
            acentoDesde={3}
            claseAcento="text-gradiente italic"
            className="mt-6 font-display text-[clamp(2.25rem,5.4vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-tinta"
          />

          <Revelar retraso={0.12}>
            <div className="mt-7 space-y-5 text-[1.0625rem] leading-[1.7] text-tinta-70">
              <p>
                Soy Lucía y llevo{" "}
                <strong className="font-semibold text-tinta">
                  {marca.anios} años
                </strong>{" "}
                tejiendo por encargo desde mi taller en Motozintla, Chiapas.
                Empecé haciendo figuras para regalar a mi familia y hoy tejo
                recuerdos para personas de todo México.
              </p>
              <p>
                No trabajo con moldes ni con máquinas. Cada figura se diseña
                desde cero a partir de tus fotos y se teje punto por punto, con
                el tiempo que haga falta para que la sonrisa, el peinado o esa
                manchita en el ojito queden exactamente como los recuerdas.
              </p>
              <p className="font-display text-[1.1875rem] italic leading-[1.55] text-tinta">
                Más que un muñeco, creo recuerdos que se abrazan.
              </p>
            </div>
          </Revelar>

          <dl className="mt-11 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
            {promesas.map((promesa, i) => (
              <Revelar key={promesa.titulo} retraso={0.1 + i * 0.07}>
                <div className="border-t border-rosa-200/70 pt-4">
                  <dt className="font-display text-[1.0625rem] leading-snug text-tinta">
                    {promesa.titulo}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-[1.6] text-tinta-50">
                    {promesa.texto}
                  </dd>
                </div>
              </Revelar>
            ))}
          </dl>

          <Revelar retraso={0.2}>
            <div className="mt-11">
              <Boton
                href={marca.whatsappUrl}
                icono={<Flecha className="h-[1.05rem] w-[1.05rem]" />}
              >
                Cuéntame tu idea
              </Boton>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}

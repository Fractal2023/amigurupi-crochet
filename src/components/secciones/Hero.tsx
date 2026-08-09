"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { marca } from "@/lib/contenido";
import { Boton } from "../ui/Boton";
import { Corazon, Flecha, Lupa } from "../ui/Icono";
import { HilosDeMarca } from "../ui/Puntada";
import { Flotantes } from "../Flotantes";

const SUAVE = [0.22, 1, 0.36, 1] as const;

/**
 * Destellos sobre el video. Los corazones y ovillos los pone
 * `<Flotantes />`, que acompaña a todas las secciones por igual.
 */
const adornos = [
  { x: "42%", y: "12%", s: 14, d: 2.2, t: 8 },
  { x: "88%", y: "58%", s: 16, d: 2.8, t: 8.5 },
  { x: "30%", y: "44%", s: 12, d: 3.4, t: 7 },
  { x: "78%", y: "36%", s: 13, d: 1.1, t: 8.2 },
  { x: "62%", y: "80%", s: 15, d: 0.6, t: 9.2 },
];

export function Hero() {
  const seccion = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [videoListo, setVideoListo] = useState(false);
  const quieto = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: seccion,
    offset: ["start start", "end start"],
  });

  // Parallax cinematográfico: el fondo se mueve menos que el contenido.
  const yFondo = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yTexto = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const yMascota = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacidad = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // El video sólo se reproduce si el usuario no pidió menos movimiento.
  useEffect(() => {
    const el = video.current;
    if (!el) return;

    // El archivo puede terminar de cargar antes de la hidratación, en cuyo
    // caso `onLoadedData` ya no dispara: comprobamos el estado directamente.
    if (el.readyState >= 2) setVideoListo(true);

    if (quieto) {
      el.pause();
      return;
    }
    el.play().catch(() => {
      /* Algunos navegadores bloquean autoplay: el degradado rosa sostiene la escena. */
    });
  }, [quieto]);

  return (
    <section
      id="inicio"
      ref={seccion}
      className="grano relative isolate flex min-h-[100svh] items-center overflow-hidden bg-velo pt-[var(--nav-h)]"
    >
      {/* ---------- Fondo de video ---------- */}
      <motion.div
        style={quieto ? undefined : { y: yFondo }}
        className="absolute inset-0 -z-30 h-[118%]"
      >
        {/* Desenfocado y a media opacidad: el video aporta color y movimiento
            ambiental, nunca un sujeto que compita con el titular. */}
        <video
          ref={video}
          className={`h-full w-full scale-[1.12] object-cover blur-[3px] saturate-[0.92] transition-opacity duration-1000 ${
            videoListo ? "opacity-[0.62]" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          onLoadedData={() => setVideoListo(true)}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ---------- Capas de tratamiento: rosa, degradado y profundidad ---------- */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(254,241,248,0.9)_0%,rgba(254,241,248,0.66)_40%,rgba(255,251,248,0.9)_100%)]"
      />
      {/* Velo lateral: mantiene la columna de texto sobre un campo tranquilo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(254,241,248,0.9),rgba(254,241,248,0.55))] lg:bg-[linear-gradient(100deg,rgba(254,241,248,0.96)_0%,rgba(254,241,248,0.86)_34%,rgba(254,241,248,0.34)_62%,rgba(254,241,248,0.06)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_86%_at_78%_18%,rgba(249,138,191,0.3)_0%,transparent_58%),radial-gradient(90%_70%_at_8%_88%,rgba(255,154,92,0.14)_0%,transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-20 h-56 bg-[linear-gradient(180deg,transparent,var(--color-lienzo))]"
      />

      <Flotantes patron={2} />

      {/* ---------- Adornos flotantes ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {adornos.map((a, i) => (
          <span
            key={i}
            className="absolute motion-safe:animate-[flotar_var(--dur)_ease-in-out_infinite] motion-reduce:animate-none"
            style={
              {
                left: a.x,
                top: a.y,
                "--dur": `${a.t}s`,
                animationDelay: `${a.d}s`,
              } as React.CSSProperties
            }
          >
            <span
              className="block rounded-full bg-white motion-safe:animate-[brillo_4s_ease-in-out_infinite]"
              style={{
                width: a.s / 3,
                height: a.s / 3,
                animationDelay: `${a.d}s`,
                boxShadow: "0 0 12px 3px rgba(255,255,255,0.9)",
              }}
            />
          </span>
        ))}
      </div>

      {/* ---------- Contenido ---------- */}
      <div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-6 px-5 pb-16 pt-8 sm:gap-8 sm:pb-24 sm:pt-10 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-4 lg:pb-16">
        <motion.div
          style={quieto ? undefined : { y: yTexto, opacity: opacidad }}
          className="relative z-10 max-w-[36rem]"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: SUAVE }}
            className="eyebrow flex flex-wrap items-center gap-3 text-rosa-600"
          >
            <HilosDeMarca />
            Amigurumis personalizados · Motozintla
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,8.2vw,5.25rem)] font-medium leading-[0.94] tracking-[-0.035em] text-tinta">
            <span className="sr-only">{marca.lema}</span>
            <span aria-hidden className="block">
              {["Tú", "lo", "imaginas,"].map((palabra, i) => (
                <span key={palabra} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: quieto ? 0 : "112%", opacity: quieto ? 0 : 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.28 + i * 0.07, ease: SUAVE }}
                  >
                    {palabra}
                  </motion.span>
                  {i < 2 ? " " : ""}
                </span>
              ))}
            </span>
            <span aria-hidden className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="text-gradiente inline-block pr-2 italic"
                style={{ fontVariationSettings: '"SOFT" 60, "WONK" 1' }}
                initial={{ y: quieto ? 0 : "112%", opacity: quieto ? 0 : 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.55, ease: SUAVE }}
              >
                yo lo tejo.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78, ease: SUAVE }}
            className="mt-7 max-w-[34rem] text-[1.0625rem] leading-[1.65] text-tinta-70 sm:text-[1.125rem]"
          >
            En <strong className="font-semibold text-tinta">Amigurupi Crochet</strong>{" "}
            transformamos tus ideas, mascotas, personajes y recuerdos en piezas
            únicas tejidas completamente a mano.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.92, ease: SUAVE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Boton
              href={marca.whatsappUrl}
              icono={<Flecha className="h-[1.05rem] w-[1.05rem]" />}
            >
              Encarga el tuyo
            </Boton>
            <Boton
              href="#galeria"
              variante="contorno"
              icono={<Lupa className="h-[1.05rem] w-[1.05rem]" />}
            >
              Ver galería
            </Boton>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.15 }}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-rosa-200/60 pt-6 sm:mt-12 sm:gap-x-9 sm:pt-7"
          >
            {[
              { n: `${marca.anios} años`, t: "tejiendo por encargo" },
              { n: "100%", t: "hecho a mano" },
              { n: "Envíos", t: "a todo México" },
            ].map((dato) => (
              <div key={dato.t}>
                <dt className="font-display text-[1.375rem] leading-none text-rosa-600">
                  {dato.n}
                </dt>
                <dd className="mt-1.5 text-[0.8125rem] leading-tight text-tinta-50">
                  {dato.t}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- Mascota de marca ---------- */}
        <motion.div
          style={quieto ? undefined : { y: yMascota }}
          className="relative z-0 mx-auto -mt-2 w-full max-w-[19rem] sm:max-w-[23rem] lg:mt-0 lg:max-w-none lg:justify-self-end"
        >
          <div className="relative mx-auto aspect-[900/1282] w-full lg:w-[clamp(20rem,30vw,27rem)]">
            {/* Halo suave detrás de la mascota */}
            <div
              aria-hidden
              className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(253,201,225,0.55)_42%,transparent_68%)] blur-xl"
            />
            <motion.div
              className="relative h-full w-full motion-safe:animate-[flotar_9s_ease-in-out_infinite]"
              initial={{ opacity: 0, scale: quieto ? 1 : 0.92, y: quieto ? 0 : 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: SUAVE }}
            >
              <Image
                src="/marca/personaje.png"
                alt="Personaje de Amigurupi con vestido bordado, sosteniendo un ovillo de estambre rosa y su aguja de crochet"
                fill
                priority
                quality={88}
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 24rem, 27rem"
                className="object-contain drop-shadow-[0_36px_44px_rgba(151,22,79,0.24)]"
              />
            </motion.div>

            {/* Nota manuscrita. Sólo flota sobre el personaje en pantallas
                anchas, donde hay sitio a su izquierda; en móvil se apoya
                debajo para no taparle el vestido. */}
            <motion.figure
              initial={{ opacity: 0, y: 18, rotate: quieto ? 0 : 6 }}
              animate={{ opacity: 1, y: 0, rotate: 3.5 }}
              transition={{ duration: 1, delay: 1.05, ease: SUAVE }}
              className="vidrio relative z-10 mx-auto -mt-8 max-w-[15rem] rounded-[1.25rem] px-5 py-4 shadow-[var(--shadow-alta)] sm:max-w-[16rem] lg:absolute lg:-left-16 lg:bottom-6 lg:mx-0 lg:mt-0 lg:max-w-[14rem] xl:-left-24"
            >
              <blockquote className="font-display text-[0.9375rem] italic leading-[1.5] text-tinta">
                “Tu personaje, tu mascota, tu historia… tejido especialmente
                para ti.”
              </blockquote>
              <figcaption className="mt-2.5 flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-rosa-500">
                <Corazon className="h-3.5 w-3.5" strokeWidth={2} />
                Hecho a mano
              </figcaption>
            </motion.figure>
          </div>
        </motion.div>
      </div>

      {/* ---------- Indicador de scroll ---------- */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={quieto ? undefined : { opacity: opacidad }}
        className="absolute inset-x-0 bottom-6 z-10 hidden justify-center lg:flex"
      >
        <span className="flex h-11 w-[1.625rem] items-start justify-center rounded-full border border-rosa-300/70 p-1.5">
          <motion.span
            className="block h-2 w-[3px] rounded-full bg-rosa-400"
            animate={quieto ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

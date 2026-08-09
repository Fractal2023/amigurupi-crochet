"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { marca } from "@/lib/contenido";
import { hiloTarjeta } from "@/lib/hilos";
import { Boton } from "../ui/Boton";
import { Flecha } from "../ui/Icono";
import { Bucle, Chispita, Flor } from "../ui/Adornos";
import { Eyebrow } from "../ui/Puntada";
import { Revelar, TituloRevelado } from "../ui/Movimiento";
import { Flotantes } from "../Flotantes";

const SUAVE = [0.22, 1, 0.36, 1] as const;

const promesas = [
  {
    titulo: `${marca.anios} años de experiencia`,
    texto:
      "Años de oficio y de cariño por el crochet, que se sienten al tener la pieza en las manos.",
  },
  {
    titulo: "Diseños personalizados",
    texto:
      "Hacemos tu pieza a la medida a partir de tus fotos, y también tus personajes favoritos de siempre.",
  },
  {
    titulo: "Atención personalizada",
    texto:
      "Tratas directamente con quien teje tu amigurumi, sin intermediarios ni vendedores de por medio.",
  },
  {
    titulo: "Materiales de calidad",
    texto:
      "Algodón y chenille de buena marca, relleno hipoalergénico y ojos de seguridad.",
  },
];

/** Las tres fotos del collage, cada una con su marco, su giro y su ritmo. */
const collage = [
  {
    archivo: "55",
    alt: "Pareja personalizada tejida a mano, con su ropa y accesorios recreados",
    clase: "left-0 top-[6%] w-[62%] aspect-[4/5]",
    radio: "2.5rem 1rem 2.25rem 1.25rem",
    giro: -3,
    hilo: 0,
    ritmo: [-14, 14] as [number, number],
  },
  {
    archivo: "63",
    alt: "Perrito tejido en hilo chenille abrazando un corazón rosa",
    clase: "right-0 top-0 w-[40%] aspect-square",
    radio: "1rem 2.25rem 1.25rem 2.25rem",
    giro: 4.5,
    hilo: 1,
    ritmo: [34, -26] as [number, number],
  },
  {
    archivo: "61",
    alt: "Abogada personalizada tejida a mano, con su traje rojo y su melena",
    clase: "right-[5%] bottom-0 w-[47%] aspect-[4/5]",
    radio: "2.25rem 1.25rem 1rem 2.5rem",
    giro: 2,
    hilo: 2,
    ritmo: [22, -18] as [number, number],
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
  const { scrollYProgress } = useScroll({
    target: seccion,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="sobre-mi"
      ref={seccion}
      className="relative scroll-mt-24 overflow-hidden bg-lienzo py-16 sm:py-20 lg:py-28"
    >
      <Flotantes patron={0} />

      <div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* ---------- Collage del taller ---------- */}
        <div className="relative mx-auto aspect-[1/1.16] w-full max-w-[28rem] lg:max-w-[32rem]">
          {collage.map((foto, i) => (
            <Marco key={foto.archivo} foto={foto} orden={i} avance={scrollYProgress} />
          ))}

          {/* Adornos sueltos, como recortes pegados alrededor de las fotos */}
          <Adorno className="-left-4 top-[38%] h-11 w-11 text-rosa-400" retraso={0.5}>
            <Flor />
          </Adorno>
          <Adorno className="-right-3 top-[42%] h-9 w-9 text-coral" retraso={0.65}>
            <Bucle />
          </Adorno>
          <Adorno className="bottom-[6%] left-[6%] h-8 w-8 text-lila" retraso={0.8}>
            <Chispita />
          </Adorno>
        </div>

        {/* ---------- La historia ---------- */}
        <div className="lg:pl-4">
          <Revelar>
            <Eyebrow>Sobre mí</Eyebrow>
          </Revelar>

          <div className="relative">
            <TituloRevelado
              texto="Cada puntada cuenta una historia"
              desde={0.05}
              acentoDesde={3}
              claseAcento="text-gradiente italic"
              className="mt-6 font-display text-[clamp(2.25rem,5.4vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-tinta"
            />
            <Subrayado />
          </div>

          <Revelar retraso={0.12}>
            <p className="mt-8 text-[1.0625rem] leading-[1.72] text-tinta-70">
              En <strong className="font-semibold text-tinta">Amigurupi</strong>{" "}
              llevamos{" "}
              <strong className="font-semibold text-tinta">
                {marca.anios} años
              </strong>{" "}
              tejiendo por encargo desde el taller en Motozintla, Chiapas. Lo que
              empezó como figuras para regalar en familia hoy son recuerdos que
              viajan a todo México.
            </p>
          </Revelar>

          {/* Frase destacada: el corazón de la sección, en grande */}
          <Revelar retraso={0.18}>
            <figure className="relative mt-8 pl-6">
              <span
                aria-hidden
                className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[3px] rounded-full bg-rosa-300"
              />
              <blockquote className="font-display text-[clamp(1.3125rem,2.5vw,1.75rem)] font-medium italic leading-[1.35] tracking-[-0.01em] text-tinta">
                Más que un amigurumi, tejemos recuerdos que se abrazan.
              </blockquote>
            </figure>
          </Revelar>

          <Revelar retraso={0.22}>
            <p className="mt-8 text-[1.0625rem] leading-[1.72] text-tinta-70">
              No trabajamos con moldes ni con máquinas. Cada amigurumi se diseña
              desde cero a partir de tus fotos y se teje punto por punto, con el
              tiempo que haga falta para que la sonrisa, el peinado o esa
              manchita en el ojito queden exactamente como los recuerdas.
            </p>
          </Revelar>

          <dl className="mt-11 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
            {promesas.map((promesa, i) => (
              <Revelar key={promesa.titulo} retraso={0.12 + i * 0.08}>
                <div className="relative border-t border-dashed border-rosa-300/80 pt-5">
                  {/* Nudo de hilo donde arranca cada promesa */}
                  <span
                    aria-hidden
                    className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: `rgb(${hiloTarjeta(i).rgb})` }}
                  />
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
                Cuéntanos tu idea
              </Boton>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}

/**
 * Foto en marco ilustrado: contorno de color, paspartú de crema y un giro
 * escaso. Entra girada de más y se asienta, y luego se mece con el scroll a
 * un ritmo propio para que el collage tenga profundidad.
 */
function Marco({
  foto,
  orden,
  avance,
}: {
  foto: (typeof collage)[number];
  orden: number;
  avance: MotionValue<number>;
}) {
  const quieto = useReducedMotion();
  const y = useTransform(avance, [0, 1], foto.ritmo);
  const trazo = `rgb(${hiloTarjeta(foto.hilo).rgb})`;

  return (
    <motion.div
      style={quieto ? undefined : { y }}
      className={`absolute ${foto.clase}`}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: quieto ? 1 : 0.88,
          rotate: quieto ? foto.giro : foto.giro + (orden % 2 === 0 ? -9 : 9),
        }}
        whileInView={{ opacity: 1, scale: 1, rotate: foto.giro }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 1, delay: orden * 0.14, ease: SUAVE }}
        whileHover={quieto ? undefined : { rotate: 0, scale: 1.03 }}
        className="h-full w-full border-2 bg-lienzo p-2"
        // El paspartú de crema y el contorno de color hacen el marco; nada
        // de sombras, para no romper el acabado plano del resto del sitio.
        style={{ borderRadius: foto.radio, borderColor: trazo }}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ borderRadius: `calc(${foto.radio.split(" ")[0]} - 0.4rem)` }}
        >
          <Image
            src={`/galeria/${foto.archivo}.webp`}
            alt={foto.alt}
            fill
            sizes="(max-width: 1024px) 60vw, 20rem"
            className="object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Recorte decorativo que aparece girando y luego flota. */
function Adorno({
  children,
  className,
  retraso,
}: {
  children: React.ReactNode;
  className: string;
  retraso: number;
}) {
  const quieto = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, scale: quieto ? 1 : 0.4, rotate: -25 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay: retraso, ease: SUAVE }}
      className={`absolute motion-safe:animate-[flotar_9s_ease-in-out_infinite] ${className}`}
    >
      {children}
    </motion.span>
  );
}

/** Trazo suelto bajo el titular, dibujado a mano alzada. */
function Subrayado() {
  const quieto = useReducedMotion();

  return (
    <svg
      aria-hidden
      viewBox="0 0 220 14"
      fill="none"
      className="mt-2 h-3.5 w-[13.75rem] max-w-[60%] text-rosa-300"
    >
      <motion.path
        d="M3 9.5C34 4 71 2.5 108 4.5s72 5.5 109 2"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        initial={{ pathLength: quieto ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, delay: 0.5, ease: SUAVE }}
      />
    </svg>
  );
}

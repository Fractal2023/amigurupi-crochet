"use client";

import Image from "next/image";
import Link from "next/link";
import { marca } from "@/lib/contenido";
import { Boton } from "../ui/Boton";
import { Flecha, Instagram, Pin, Reloj, Sobre, WhatsApp } from "../ui/Icono";
import { Eyebrow } from "../ui/Puntada";
import { Escalonado, Hijo, Revelar, TituloRevelado } from "../ui/Movimiento";
import { Flotantes } from "../Flotantes";

const MAPA =
  "https://www.google.com/maps?q=Calle+Central+Oriente+510-B,+Motozintla,+Chiapas,+M%C3%A9xico&output=embed";
const MAPA_ENLACE =
  "https://www.google.com/maps/search/?api=1&query=Calle+Central+Oriente+510-B,+Motozintla,+Chiapas";

const datos = [
  {
    icono: WhatsApp,
    etiqueta: "WhatsApp",
    valor: marca.telefono,
    href: marca.whatsappUrl,
    nota: "La forma más rápida de empezar tu encargo.",
  },
  {
    icono: Sobre,
    etiqueta: "Correo",
    valor: marca.email,
    href: `mailto:${marca.email}`,
    nota: "Para cotizaciones de pedidos grandes.",
  },
  {
    icono: Pin,
    etiqueta: "Taller",
    valor: `${marca.direccion.calle}, ${marca.direccion.corta}`,
    href: MAPA_ENLACE,
    nota: "Entrega local y punto de recolección.",
  },
  {
    icono: Reloj,
    etiqueta: "Horario",
    valor: "Lunes a sábado, 9:00 – 19:00",
    nota: "Mensajes contestados el mismo día.",
  },
];

export function Contacto() {
  return (
    <section
      id="contacto"
      className="relative scroll-mt-24 overflow-hidden bg-lienzo pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <Flotantes patron={1} />
      {/* ---------- Llamado final con la mascota ---------- */}
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <Revelar>
          {/* El degradado arranca profundo y sólo se abre al coral detrás de la
              mascota: así el texto blanco mantiene 4.5:1 en toda su columna. */}
          <div className="grano relative overflow-hidden rounded-[var(--radius-pieza)] bg-[linear-gradient(112deg,#8d1449_0%,#a81a5b_32%,#c02168_58%,#e05c93_80%,var(--color-coral)_100%)] px-7 py-12 text-white sm:px-14 sm:py-16 lg:px-20 lg:py-20">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(70%_100%_at_88%_50%,rgba(255,255,255,0.28),transparent_62%)]"
            />

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <p className="eyebrow text-white">¿Tienes una idea en mente?</p>
                <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(2rem,4.6vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.03em] text-white">
                  Hagámosla realidad{" "}
                  <span className="italic text-white/85">juntas.</span>
                </h2>
                <p className="mt-5 max-w-[36rem] text-[1.0625rem] leading-[1.68] text-white/92">
                  Mándanos una foto y cuéntanos qué imaginas. Te respondemos con una
                  propuesta, precio y tiempo de entrega, sin compromiso.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Boton
                    href={marca.whatsappUrl}
                    variante="claro"
                    icono={<Flecha className="h-[1.05rem] w-[1.05rem]" />}
                  >
                    Escríbenos por WhatsApp
                  </Boton>
                  <Boton
                    href={marca.instagram}
                    variante="fantasma"
                    icono={<Instagram className="h-[1.05rem] w-[1.05rem]" />}
                  >
                    Ver Instagram
                  </Boton>
                </div>
              </div>

              <div className="relative mx-auto aspect-[900/1282] w-[13rem] sm:w-[15rem] lg:w-full lg:max-w-[17rem] lg:justify-self-end">
                <Image
                  src="/marca/personaje.png"
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 15rem, 17rem"
                  className="object-contain drop-shadow-[0_28px_36px_rgba(120,10,60,0.32)] motion-safe:animate-[flotar_8s_ease-in-out_infinite]"
                />
              </div>
            </div>
          </div>
        </Revelar>
      </div>

      {/* ---------- Datos de contacto y mapa ---------- */}
      <div className="mx-auto mt-16 w-full max-w-[88rem] px-5 sm:px-8 lg:mt-24">
        <header className="max-w-[40rem]">
          <Revelar>
            <Eyebrow>Contacto</Eyebrow>
          </Revelar>
          <TituloRevelado
            texto="Dónde encontrarnos"
            desde={0.05}
            acentoDesde={1}
            claseAcento="text-gradiente italic"
            className="mt-6 font-display text-[clamp(2.25rem,5.2vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-tinta"
          />
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          <Escalonado as="ul" paso={0.07} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {datos.map(({ icono: Icono, etiqueta, valor, href, nota }) => {
              const contenido = (
                <>
                  <span
                    aria-hidden
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-hilo bg-velo p-2.5 text-rosa-500 transition-colors duration-500 group-hover:border-rosa-200 group-hover:text-rosa-600"
                  >
                    <Icono className="h-5 w-5" />
                  </span>
                  <span className="mt-5 block eyebrow text-tinta-50">
                    {etiqueta}
                  </span>
                  <span className="mt-2.5 block font-display text-[1.0625rem] leading-snug text-tinta">
                    {valor}
                  </span>
                  <span className="mt-2 block text-[0.8125rem] leading-relaxed text-tinta-50">
                    {nota}
                  </span>
                </>
              );

              return (
                <Hijo as="li" key={etiqueta}>
                  {href ? (
                    <Link
                      href={href}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group block h-full cursor-pointer rounded-[var(--radius-carta)] border border-hilo/80 bg-white/60 p-7 transition-all duration-500 ease-[var(--ease-suave)] hover:-translate-y-1 hover:border-rosa-200 hover:bg-white hover:shadow-[var(--shadow-alta)]"
                    >
                      {contenido}
                    </Link>
                  ) : (
                    <div className="group h-full rounded-[var(--radius-carta)] border border-hilo/80 bg-white/60 p-7">
                      {contenido}
                    </div>
                  )}
                </Hijo>
              );
            })}
          </Escalonado>

          <Revelar retraso={0.12}>
            <figure className="relative h-full min-h-[22rem] overflow-hidden rounded-[var(--radius-carta)] border border-hilo/80 shadow-[var(--shadow-suave)]">
              <iframe
                src={MAPA}
                title="Mapa del taller de Amigurupi Crochet en Motozintla, Chiapas"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full min-h-[22rem] border-0 grayscale-[0.15]"
              />
              <figcaption className="vidrio pointer-events-none absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-[var(--shadow-alta)] sm:right-auto">
                <Pin className="h-5 w-5 shrink-0 text-rosa-500" />
                <span className="text-[0.875rem] leading-snug text-tinta">
                  <strong className="font-semibold">{marca.direccion.calle}</strong>
                  <br />
                  {marca.direccion.corta}, {marca.direccion.pais}
                </span>
              </figcaption>
            </figure>
          </Revelar>
        </div>
      </div>
    </section>
  );
}

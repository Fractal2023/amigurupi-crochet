import Image from "next/image";
import Link from "next/link";
import { marca, navegacion } from "@/lib/contenido";
import { Facebook, Instagram, Pin, Sobre, WhatsApp } from "../ui/Icono";
import { Cadeneta } from "../ui/Puntada";

const servicios = [
  "Amigurumis personalizados",
  "Mascotas tejidas",
  "Personajes personalizados",
  "Ramos de flores en crochet",
  "Regalos personalizados",
  "Decoración tejida",
  "Figuras especiales por encargo",
];

const redes = [
  { icono: WhatsApp, href: marca.whatsappUrl, nombre: "WhatsApp" },
  { icono: Instagram, href: marca.instagram, nombre: "Instagram" },
  { icono: Facebook, href: marca.facebook, nombre: "Facebook" },
  { icono: Sobre, href: `mailto:${marca.email}`, nombre: "Correo" },
];

export function Pie() {
  return (
    <footer className="grano relative overflow-hidden bg-velo pt-20">
      <Cadeneta className="absolute inset-x-0 top-0 h-6 w-full text-rosa-300" />
      <div
        aria-hidden
        className="absolute -bottom-32 left-1/2 -z-10 h-[30rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,138,191,0.22),transparent_68%)] blur-3xl"
      />

      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 pb-16 sm:gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 max-w-[24rem] lg:col-span-1">
            <Image
              src="/marca/logo.png"
              alt={marca.nombre}
              width={1600}
              height={553}
              loading="lazy"
              className="h-14 w-auto"
            />
            <p className="mt-6 text-[0.9375rem] leading-[1.7] text-tinta-70">
              Hecho a mano con amor en Motozintla, Chiapas, para momentos que se
              quedan.
            </p>
            <p className="mt-5 font-display text-[1.0625rem] italic text-rosa-600">
              {marca.lema}
            </p>

            <ul className="mt-7 flex gap-2.5">
              {redes.map(({ icono: Icono, href, nombre }) => (
                <li key={nombre}>
                  <Link
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={nombre}
                    className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-rosa-200/80 bg-white/60 text-tinta-70 transition-all duration-300 hover:-translate-y-0.5 hover:border-rosa-300 hover:bg-white hover:text-rosa-600"
                  >
                    <Icono className="h-[1.15rem] w-[1.15rem]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Secciones del sitio">
            <h2 className="eyebrow text-tinta-50">Explora</h2>
            <ul className="mt-3">
              {navegacion.map(({ id, etiqueta }) => (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    // min-h-11: área táctil cómoda sin engordar la tipografía.
                    className="inline-flex min-h-11 cursor-pointer items-center text-[0.9375rem] text-tinta-70 transition-colors duration-300 hover:text-rosa-600"
                  >
                    {etiqueta}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-tinta-50">Servicios</h2>
            <ul className="mt-5 space-y-3">
              {servicios.map((servicio) => (
                <li key={servicio} className="text-[0.9375rem] leading-snug text-tinta-70">
                  {servicio}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="eyebrow text-tinta-50">Contacto</h2>
            <ul className="mt-5 space-y-4 text-[0.9375rem] text-tinta-70">
              <li>
                <Link
                  href={marca.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex cursor-pointer items-center gap-2.5 transition-colors duration-300 hover:text-rosa-600"
                >
                  <WhatsApp className="h-[1.05rem] w-[1.05rem] shrink-0 text-rosa-400" />
                  {marca.whatsapp}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${marca.email}`}
                  className="group inline-flex cursor-pointer items-center gap-2.5 break-all transition-colors duration-300 hover:text-rosa-600"
                >
                  <Sobre className="h-[1.05rem] w-[1.05rem] shrink-0 text-rosa-400" />
                  {marca.email}
                </Link>
              </li>
              <li className="flex items-start gap-2.5">
                <Pin className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 text-rosa-400" />
                <span className="leading-relaxed">
                  {marca.direccion.calle}
                  <br />
                  {marca.direccion.ciudad}, {marca.direccion.pais}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* pb extra en móvil: el botón flotante de WhatsApp ocupa esa esquina. */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-rosa-200/70 pb-24 pt-8 text-[0.8125rem] text-tinta-50 sm:flex-row sm:pb-8">
          <p>
            © {new Date().getFullYear()} {marca.nombre}. Todos los derechos
            reservados.
          </p>
          <p className="flex items-center gap-2">
            Tejido a mano en Chiapas, México
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-rosa-300" />
          </p>
        </div>
      </div>
    </footer>
  );
}

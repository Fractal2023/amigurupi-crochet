"use client";

import { marca } from "@/lib/contenido";
import { Eyebrow } from "../ui/Puntada";
import { Revelar } from "../ui/Movimiento";
import { Flotantes } from "../Flotantes";

/**
 * Bloque de cierre orientado a búsqueda local: nombra el oficio, la ciudad y
 * la zona de reparto en texto plano, que es lo que leen los buscadores.
 *
 * Reutiliza los mismos componentes y tokens del resto del sitio (contenedor,
 * `Eyebrow`, `Revelar`, la costura discontinua y el fondo velo del pie), así
 * que no introduce ningún recurso visual nuevo.
 */
export function Cobertura() {
  const servicios = [
    "Amigurumis personalizados a partir de tus fotos",
    "Mascotas tejidas y personajes tejidos por encargo",
    "Ramos de flores en crochet y regalos tejidos",
    "Figuras de graduación, parejas y decoración tejida",
  ];

  return (
    <section
      aria-labelledby="cobertura-titulo"
      className="relative overflow-hidden bg-velo py-16 sm:py-20 lg:py-24"
    >
      <Flotantes patron={0} />

      <div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Revelar>
            <Eyebrow>Taller en Motozintla</Eyebrow>
          </Revelar>

          <Revelar retraso={0.06}>
            <h2
              id="cobertura-titulo"
              className="mt-5 max-w-[24ch] font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-tinta"
            >
              Crochet artesanal hecho en Motozintla, Chiapas
            </h2>
          </Revelar>

          <Revelar retraso={0.1}>
            <div className="mt-6 space-y-4 text-[1rem] leading-[1.72] text-tinta-70">
              <p>
                {marca.nombre} es un taller de crochet artesanal en{" "}
                {marca.direccion.calle}, {marca.direccion.corta}. Tejemos a mano
                amigurumis personalizados a partir de tus fotos: personajes
                tejidos, mascotas tejidas, parejas, figuras de graduación y
                ramos de flores en crochet.
              </p>
              <p>
                Atendemos encargos de toda la región y hacemos{" "}
                <strong className="font-semibold text-tinta">
                  envíos a todo México
                </strong>{" "}
                por paquetería con número de guía. En Motozintla también puedes
                recoger tu pieza directamente en el taller.
              </p>
            </div>
          </Revelar>
        </div>

        <div className="lg:pt-14">
          <Revelar retraso={0.12}>
            <h3 className="eyebrow text-tinta-50">Lo que tejemos por encargo</h3>
            <ul className="mt-5 space-y-3">
              {servicios.map((servicio) => (
                <li
                  key={servicio}
                  className="border-b border-dashed border-rosa-300/70 pb-3 text-[0.9375rem] leading-relaxed text-tinta-70 last:border-0"
                >
                  {servicio}
                </li>
              ))}
            </ul>
          </Revelar>

          <Revelar retraso={0.16}>
            <h3 className="eyebrow mt-8 text-tinta-50">Enviamos y entregamos en</h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-tinta-70">
              {marca.zonas.join(" · ")} y el resto de Chiapas. Envíos a todo
              México.
            </p>
          </Revelar>
        </div>
      </div>
    </section>
  );
}

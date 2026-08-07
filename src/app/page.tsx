import { BotonWhatsApp } from "@/components/BotonWhatsApp";
import { DesplazamientoSuave } from "@/components/DesplazamientoSuave";
import { Navegacion } from "@/components/Navegacion";
import { Contacto } from "@/components/secciones/Contacto";
import { Creaciones } from "@/components/secciones/Creaciones";
import { Galeria } from "@/components/secciones/Galeria";
import { Hero } from "@/components/secciones/Hero";
import { Pie } from "@/components/secciones/Pie";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Proceso } from "@/components/secciones/Proceso";
import { Cinta, Sobre } from "@/components/secciones/Sobre";
import { Testimonios } from "@/components/secciones/Testimonios";
import { Valores } from "@/components/secciones/Valores";

export default function Inicio() {
  return (
    <>
      <DesplazamientoSuave />
      <Navegacion />

      <main id="contenido" className="flex-1">
        <Hero />
        <Cinta />
        <Sobre />
        <Proceso />
        <Galeria />
        <Creaciones />
        <Valores />
        <Testimonios />
        <Preguntas />
        <Contacto />
      </main>

      <Pie />
      <BotonWhatsApp />
    </>
  );
}

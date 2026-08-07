"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll con inercia. Se desactiva por completo si el sistema pide menos
 * movimiento, para no secuestrar el desplazamiento nativo.
 */
export function DesplazamientoSuave() {
  useEffect(() => {
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (quieto.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 0.95,
    });

    let frame = 0;
    const bucle = (tiempo: number) => {
      lenis.raf(tiempo);
      frame = requestAnimationFrame(bucle);
    };
    frame = requestAnimationFrame(bucle);

    // Los enlaces de anclaje deben pasar por Lenis para que el offset del
    // navbar fijo se respete.
    const alClic = (evento: MouseEvent) => {
      const objetivo = (evento.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!objetivo) return;
      const id = objetivo.getAttribute("href");
      if (!id || id === "#") return;
      const destino = document.querySelector(id);
      if (!destino) return;
      evento.preventDefault();
      lenis.scrollTo(destino as HTMLElement, { offset: -84 });
    };

    document.addEventListener("click", alClic);
    return () => {
      document.removeEventListener("click", alClic);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

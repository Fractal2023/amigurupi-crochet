"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Punto = { x: number; y: number };

/**
 * Convierte una lista de puntos en una curva suave (Catmull-Rom pasada a
 * Béziers cúbicas). Sin esquinas: el hilo entra y sale de cada paso con la
 * misma inclinación con la que llegó.
 */
function suavizar(p: Punto[]) {
  if (p.length < 2) return "";
  let d = `M ${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d +=
      ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)},` +
      ` ${c2x.toFixed(1)} ${c2y.toFixed(1)},` +
      ` ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

/**
 * El hilo que une los pasos. En vez de una línea recta, mide dónde cae cada
 * paso y traza una curva que se mece de un lado a otro entre ellos, así que
 * funciona igual con la columna única del móvil que con el zigzag de
 * escritorio. GSAP la va tejiendo conforme bajas.
 */
export function HiloTejido({
  contenedor,
  ancla,
}: {
  contenedor: RefObject<HTMLElement | null>;
  /** Selector de los elementos por los que debe pasar el hilo. */
  ancla: string;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const trazo = useRef<SVGPathElement>(null);
  const [caja, setCaja] = useState({ w: 0, h: 0 });
  const [ruta, setRuta] = useState("");
  const [ovillo, setOvillo] = useState<Punto | null>(null);

  // --- Medición: se recalcula al cambiar de tamaño o de disposición ---
  useEffect(() => {
    const raiz = contenedor.current;
    if (!raiz) return;

    const medir = () => {
      const base = raiz.getBoundingClientRect();
      const nodos = [...raiz.querySelectorAll<HTMLElement>(ancla)];
      if (!nodos.length || base.width === 0) return;

      const centros: Punto[] = nodos.map((n) => {
        const r = n.getBoundingClientRect();
        return {
          x: r.left - base.left + r.width / 2,
          y: r.top - base.top + r.height / 2,
        };
      });

      // El ovillo va bastante por encima del primer paso, para que no se
      // encime con la primera tarjeta y el hilo tenga recorrido que mostrar.
      const inicio = { x: centros[0].x, y: Math.max(42, centros[0].y - 168) };

      // Puntos de paso intermedios que mecen el hilo a un lado y al otro:
      // sin ellos la curva entre pasos alineados sería una recta.
      const conOndas: Punto[] = [inicio];
      const todos = [inicio, ...centros];
      for (let i = 0; i < todos.length - 1; i++) {
        const a = todos[i];
        const b = todos[i + 1];
        const dy = b.y - a.y;
        const lado = i % 2 === 0 ? 1 : -1;
        const medioX = (a.x + b.x) / 2;
        // El vaivén nunca puede empujar el hilo fuera del contenedor: en
        // móvil los pasos van pegados al margen izquierdo y la sección
        // recorta lo que se salga.
        const margen = 14;
        const sitio =
          lado > 0 ? base.width - medioX - margen : medioX - margen;
        const amplitud = Math.max(
          0,
          Math.min(52, Math.abs(dy) * 0.24, sitio),
        );
        conOndas.push({ x: medioX + lado * amplitud, y: a.y + dy * 0.5 });
        conOndas.push(b);
      }

      // Rizo final: el hilo se despide con una vuelta suave.
      const ultimo = centros[centros.length - 1];
      const rizo = Math.min(26, ultimo.x - 14);
      conOndas.push({ x: ultimo.x - rizo, y: ultimo.y + 46 });
      conOndas.push({ x: ultimo.x + 8, y: ultimo.y + 84 });

      setCaja({ w: base.width, h: base.height });
      setOvillo(inicio);
      setRuta(suavizar(conOndas));
    };

    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(raiz);
    window.addEventListener("resize", medir);
    return () => {
      observador.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, [contenedor, ancla]);

  // --- Tejido: el trazo se dibuja al ritmo del scroll ---
  useEffect(() => {
    const linea = trazo.current;
    const raiz = contenedor.current;
    if (!linea || !raiz || !ruta) return;

    const largo = linea.getTotalLength();
    gsap.set(linea, { strokeDasharray: largo });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(linea, { strokeDashoffset: 0 });
      return;
    }

    gsap.set(linea, { strokeDashoffset: largo });
    const animacion = gsap.to(linea, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: raiz,
        start: "top 72%",
        end: "bottom 68%",
        scrub: 0.8,
      },
    });

    return () => {
      animacion.scrollTrigger?.kill();
      animacion.kill();
    };
  }, [ruta, contenedor]);

  if (!ruta || !caja.w) return null;

  return (
    <svg
      ref={svg}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
      viewBox={`0 0 ${caja.w} ${caja.h}`}
      fill="none"
    >
      <defs>
        <linearGradient id="hilo-degradado" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-rosa)" />
          <stop offset="28%" stopColor="var(--color-coral)" />
          <stop offset="52%" stopColor="var(--color-sol)" />
          <stop offset="76%" stopColor="var(--color-menta)" />
          <stop offset="100%" stopColor="var(--color-lila)" />
        </linearGradient>
      </defs>

      {/* Sombra del hilo: el mismo recorrido, difuso, para darle cuerpo */}
      <path
        d={ruta}
        stroke="rgb(249 138 191 / 0.22)"
        strokeWidth={9}
        strokeLinecap="round"
      />
      {/* Hilo tejido */}
      <path
        ref={trazo}
        d={ruta}
        stroke="url(#hilo-degradado)"
        strokeWidth={3.5}
        strokeLinecap="round"
      />

      {/* Ovillo del que sale el hilo */}
      {ovillo ? (
        <g transform={`translate(${ovillo.x} ${ovillo.y})`}>
          <circle r="46" fill="rgb(249 138 191 / 0.14)" />
          <circle
            r="34"
            fill="rgb(253 201 225 / 0.96)"
            stroke="rgb(239 98 163 / 0.45)"
            strokeWidth="1.4"
          />
          {/* Vueltas del estambre */}
          <g
            stroke="rgb(222 61 134 / 0.38)"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          >
            <path d="M-31 -13C-17 -4 3 13 11 31" />
            <path d="M-23 -25C-7 -15 15 5 24 21" />
            <path d="M-10 -32C5 -22 23 -5 31 10" />
            <path d="M6 -33C17 -25 27 -13 33 -2" />
            <path d="M-32 4C-22 10 -10 22 -4 33" />
          </g>
          {/* Brillo alto, como el de una madeja de algodón */}
          <ellipse
            cx="-11"
            cy="-14"
            rx="13"
            ry="9"
            transform="rotate(-32 -11 -14)"
            fill="rgb(255 255 255 / 0.45)"
          />
          <circle
            r="34"
            fill="none"
            stroke="rgb(255 255 255 / 0.55)"
            strokeWidth="1.2"
          />
        </g>
      ) : null}
    </svg>
  );
}

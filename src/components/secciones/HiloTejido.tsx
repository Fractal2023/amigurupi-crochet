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
  const [enFila, setEnFila] = useState(false);

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

      const primero = centros[0];
      const ultimo = centros[centros.length - 1];

      // En escritorio los pasos se despliegan en fila y en móvil en columna.
      // El vaivén del hilo tiene que ir siempre perpendicular al recorrido.
      const horizontal =
        Math.abs(ultimo.x - primero.x) > Math.abs(ultimo.y - primero.y);

      // El ovillo se aparta del primer paso para que no se encime con su
      // tarjeta y el hilo tenga recorrido que mostrar.
      const inicio = horizontal
        ? { x: Math.max(44, primero.x - 112), y: primero.y }
        : { x: primero.x, y: Math.max(42, primero.y - 168) };

      // Puntos de paso intermedios que mecen el hilo a un lado y al otro:
      // sin ellos la curva entre pasos alineados sería una recta.
      const conOndas: Punto[] = [inicio];
      const todos = [inicio, ...centros];
      const margen = 14;

      for (let i = 0; i < todos.length - 1; i++) {
        const a = todos[i];
        const b = todos[i + 1];
        const medio = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const lado = i % 2 === 0 ? 1 : -1;
        const avance = horizontal ? b.x - a.x : b.y - a.y;

        // El vaivén nunca puede empujar el hilo fuera del contenedor: la
        // sección recorta lo que se salga.
        const sitio = horizontal
          ? lado > 0
            ? base.height - medio.y - margen
            : medio.y - margen
          : lado > 0
            ? base.width - medio.x - margen
            : medio.x - margen;

        const amplitud = Math.max(
          0,
          Math.min(horizontal ? 40 : 52, Math.abs(avance) * 0.24, sitio),
        );

        conOndas.push(
          horizontal
            ? { x: medio.x, y: medio.y + lado * amplitud }
            : { x: medio.x + lado * amplitud, y: medio.y },
        );
        conOndas.push(b);
      }

      // Rizo final: el hilo se despide con una vuelta suave.
      if (horizontal) {
        const rizo = Math.min(34, base.width - ultimo.x - margen);
        conOndas.push({ x: ultimo.x + rizo, y: ultimo.y - 24 });
        conOndas.push({ x: ultimo.x + rizo * 1.6, y: ultimo.y + 10 });
      } else {
        const rizo = Math.min(26, ultimo.x - margen);
        conOndas.push({ x: ultimo.x - rizo, y: ultimo.y + 46 });
        conOndas.push({ x: ultimo.x + 8, y: ultimo.y + 84 });
      }

      setEnFila(horizontal);
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
        <linearGradient
          id="hilo-degradado"
          x1="0"
          y1="0"
          x2={enFila ? "1" : "0"}
          y2={enFila ? "0" : "1"}
        >
          <stop offset="0%" stopColor="var(--color-rosa)" />
          <stop offset="28%" stopColor="var(--color-coral)" />
          <stop offset="52%" stopColor="var(--color-sol)" />
          <stop offset="76%" stopColor="var(--color-menta)" />
          <stop offset="100%" stopColor="var(--color-lila)" />
        </linearGradient>
      </defs>

      {/* Hilo tejido: un solo trazo limpio, sin halos ni sombras */}
      <path
        ref={trazo}
        d={ruta}
        stroke="url(#hilo-degradado)"
        strokeWidth={3.5}
        strokeLinecap="round"
      />

      {/* Ovillo del que sale el hilo: plano, con su contorno dibujado */}
      {ovillo ? (
        <g transform={`translate(${ovillo.x} ${ovillo.y})`}>
          <circle
            r="32"
            fill="var(--color-rosa)"
            stroke="var(--color-rosa-600)"
            strokeWidth="2"
          />
          {/* Vueltas del estambre */}
          <g
            stroke="var(--color-rosa-600)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          >
            <path d="M-29 -12C-16 -4 3 12 10 29" />
            <path d="M-21 -23C-6 -14 14 5 22 20" />
            <path d="M-9 -30C5 -21 21 -5 29 9" />
            <path d="M6 -31C16 -23 25 -12 31 -2" />
          </g>
        </g>
      ) : null}
    </svg>
  );
}

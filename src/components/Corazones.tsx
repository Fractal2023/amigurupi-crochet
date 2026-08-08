import { Corazon } from "./ui/Icono";

/**
 * Corazones de crochet flotando de fondo, como en el hero pero para toda la
 * página: se coloca uno en cada sección.
 *
 * La capa va **detrás** del contenido: primer hijo de una sección
 * `relative overflow-hidden` y con z-index negativo, que es justo la capa que
 * pinta encima del fondo de la sección pero debajo de todo su contenido en
 * flujo. Así los corazones nunca compiten con el texto y no hace falta
 * esconderlos en pantallas chicas.
 */
const patrones = [
  // Cada patrón reparte los corazones distinto para que dos secciones
  // seguidas no se vean calcadas.
  [
    { x: "4%", y: "14%", s: 30, d: 0, t: 15, giro: -12, o: 0.5 },
    { x: "88%", y: "8%", s: 20, d: 3.6, t: 18, giro: 11, o: 0.42 },
    { x: "13%", y: "72%", s: 18, d: 5.2, t: 17, giro: -6, o: 0.36 },
    { x: "94%", y: "58%", s: 26, d: 1.4, t: 21, giro: 9, o: 0.46 },
    { x: "70%", y: "88%", s: 16, d: 6.1, t: 19, giro: 14, o: 0.32 },
  ],
  [
    { x: "9%", y: "26%", s: 22, d: 2.1, t: 19, giro: 8, o: 0.44 },
    { x: "92%", y: "20%", s: 28, d: 0.5, t: 16, giro: -10, o: 0.48 },
    { x: "3%", y: "78%", s: 17, d: 4.4, t: 22, giro: 13, o: 0.34 },
    { x: "80%", y: "82%", s: 21, d: 2.9, t: 18, giro: -7, o: 0.4 },
    { x: "48%", y: "5%", s: 14, d: 5.8, t: 20, giro: 5, o: 0.28 },
  ],
];

export function Corazones({ patron = 0 }: { patron?: number }) {
  const corazones = patrones[patron % patrones.length];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {corazones.map((c, i) => (
        <span
          key={i}
          className="absolute motion-safe:animate-[deriva_var(--dur)_ease-in-out_infinite] motion-reduce:animate-none"
          style={
            {
              left: c.x,
              top: c.y,
              opacity: c.o,
              "--dur": `${c.t}s`,
              "--giro": `${c.giro}deg`,
              animationDelay: `${c.d}s`,
            } as React.CSSProperties
          }
        >
          <Corazon
            className="text-rosa-300"
            style={{ width: c.s, height: c.s }}
            strokeWidth={1.6}
          />
        </span>
      ))}
    </div>
  );
}

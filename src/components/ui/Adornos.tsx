/**
 * Adornos de crochet para las tarjetas: florecitas, bucles de hilo, puntadas
 * y destellos. Trazo suelto, como dibujado a mano, para que acompañen sin
 * competir con el texto. Todos son decorativos (`aria-hidden`).
 */
type Props = React.SVGProps<SVGSVGElement>;

function Trazo({ children, ...props }: Props & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

/** Florecita de cinco pétalos con el centro relleno. */
export const Flor = (p: Props) => (
  <Trazo {...p}>
    <path d="M24 10c4.4 0 6.6 3.3 5.6 7.1 3.5-1.9 7.3-.5 8.6 3.6 1.4 4.1-.9 7.4-4.9 7.6 2.7 2.9 2.3 6.9-1.2 9.4-3.5 2.5-7.3 1.3-8.1-2.6-.8 3.9-4.6 5.1-8.1 2.6-3.5-2.5-3.9-6.5-1.2-9.4-4-.2-6.3-3.5-4.9-7.6 1.3-4.1 5.1-5.5 8.6-3.6-1-3.8 1.2-7.1 5.6-7.1Z" />
    <circle cx="24" cy="24" r="3.6" fill="currentColor" stroke="none" opacity="0.75" />
  </Trazo>
);

/** Bucle de hilo con su rizo, como un punto de cadeneta suelto. */
export const Bucle = (p: Props) => (
  <Trazo {...p}>
    <path d="M8 30c0-7 5-12 11-12s10 4.4 10 9.5S25.4 36 21 36s-7.5-3-7.5-6.8 2.8-6.2 6-6.2c3.6 0 6.2 2.8 6.2 6.4" />
    <path d="M25.7 29c2.6-6.6 8-11 14.3-11" />
    <path d="M40 18c-2.2 0-3.6 1.5-3.6 3.2 0 1.5 1.1 2.6 2.5 2.6 1.2 0 2.1-.8 2.1-1.9" />
  </Trazo>
);

/** Tres puntadas cortas, como una costura a mano. */
export const Puntada = (p: Props) => (
  <Trazo {...p} strokeDasharray="5 5">
    <path d="M8 32c6-9 12-13.5 18-13.5S32 24 40 16" />
  </Trazo>
);

/** Corazón tejido, relleno suave. */
export const CorazonLleno = (p: Props) => (
  <Trazo {...p}>
    <path
      d="M24 38S10 30.2 10 21.4A7.4 7.4 0 0 1 24 17.6a7.4 7.4 0 0 1 14 3.8C38 30.2 24 38 24 38Z"
      fill="currentColor"
      fillOpacity="0.16"
    />
  </Trazo>
);

/** Destello de cuatro puntas. */
export const Chispita = (p: Props) => (
  <Trazo {...p}>
    <path
      d="M24 10c1.2 7.6 4.4 10.8 12 12-7.6 1.2-10.8 4.4-12 12-1.2-7.6-4.4-10.8-12-12 7.6-1.2 10.8-4.4 12-12Z"
      fill="currentColor"
      fillOpacity="0.14"
    />
  </Trazo>
);

/** Espiral de ovillo, para el fondo de los círculos numerados. */
export const Espiral = (p: Props) => (
  <Trazo {...p} strokeWidth={1.2}>
    <path d="M6 22c7 3 15 11 18 20M12 10c9 4 19 14 23 24M22 6c8 4 16 12 20 21M34 7c5 4 9 9 11 15" />
  </Trazo>
);

export const adornos = [Flor, Bucle, CorazonLleno, Chispita, Puntada] as const;

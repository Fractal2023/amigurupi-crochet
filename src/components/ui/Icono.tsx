/**
 * Iconografía propia: un solo trazo (1.5px, extremos redondeados) para que
 * todo el sitio hable el mismo idioma visual. Sin emojis.
 */
type Props = React.SVGProps<SVGSVGElement> & { titulo?: string };

function Base({ titulo, children, ...props }: Props & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={titulo ? undefined : true}
      role={titulo ? "img" : undefined}
      {...props}
    >
      {titulo ? <title>{titulo}</title> : null}
      {children}
    </svg>
  );
}

export const Chispa = (p: Props) => (
  <Base {...p}>
    <path d="M12 3.2 13.9 9 20 10.9 13.9 12.8 12 18.6 10.1 12.8 4 10.9 10.1 9Z" />
    <path d="M18.4 16.2 19.2 18.4 21.4 19.2 19.2 20 18.4 22.2 17.6 20 15.4 19.2 17.6 18.4Z" />
  </Base>
);

/** Aguja de crochet: el gesto de "hecho a mano" propio del oficio. */
export const Gancho = (p: Props) => (
  <Base {...p}>
    <path d="M17.6 3.4 6.2 14.8a3 3 0 0 0-.85 1.7l-.5 3.3a.7.7 0 0 0 .8.8l3.3-.5a3 3 0 0 0 1.7-.86L20.6 8.4" />
    <path d="M17.6 3.4a2.15 2.15 0 0 1 3 3" />
    <path d="M15.2 5.8 18.2 8.8" />
    <path d="M6.4 14.6 9.4 17.6" />
  </Base>
);

export const Ovillo = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M6.2 6.4c3.6 1.4 8.1 5.9 9.5 9.5M8.6 4.4c3.9 1.6 8.7 6.4 10.3 10.3M4.4 8.7c3 1.2 6.8 5 8 8M4 13.6c1.6.7 3.8 2.9 4.5 4.5" />
  </Base>
);

export const Chat = (p: Props) => (
  <Base {...p}>
    <path d="M20.5 11.8c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.15-2.9-.42L4 20.5l1.5-3.6A7 7 0 0 1 3.5 11.8C3.5 7.7 7.3 4.4 12 4.4s8.5 3.3 8.5 7.4Z" />
    <path d="M8.8 11.8h.01M12 11.8h.01M15.2 11.8h.01" strokeWidth={2} />
  </Base>
);

export const Regalo = (p: Props) => (
  <Base {...p}>
    <path d="M4 10.4h16v9.1a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5Z" />
    <path d="M3 7.6h18v2.8H3zM12 7.6V21" />
    <path d="M12 7.6S10.9 3 8.6 3a2.3 2.3 0 0 0 0 4.6ZM12 7.6S13.1 3 15.4 3a2.3 2.3 0 0 1 0 4.6Z" />
  </Base>
);

export const Corona = (p: Props) => (
  <Base {...p}>
    <path d="M3.6 7.8 6.9 12l3.4-6.6a1.9 1.9 0 0 1 3.4 0L17.1 12l3.3-4.2a1 1 0 0 1 1.75.86l-2.1 8.5a1.6 1.6 0 0 1-1.55 1.24H5.5a1.6 1.6 0 0 1-1.55-1.24l-2.1-8.5A1 1 0 0 1 3.6 7.8Z" />
  </Base>
);

export const Corazon = (p: Props) => (
  <Base {...p}>
    <path d="M12 20.3s-7.8-4.6-7.8-9.7A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.8 3c0 5.1-7.8 9.7-7.8 9.7Z" />
  </Base>
);

export const Flecha = (p: Props) => (
  <Base {...p}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </Base>
);

export const Cruz = (p: Props) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const Mas = (p: Props) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const Lupa = (p: Props) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M15.8 15.8 20.5 20.5" />
  </Base>
);

export const Sobre = (p: Props) => (
  <Base {...p}>
    <rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2.2" />
    <path d="m3.6 7 7.3 5.3a2 2 0 0 0 2.2 0L20.4 7" />
  </Base>
);

export const Pin = (p: Props) => (
  <Base {...p}>
    <path d="M12 21.5s7-5.9 7-11.1a7 7 0 1 0-14 0c0 5.2 7 11.1 7 11.1Z" />
    <circle cx="12" cy="10.2" r="2.6" />
  </Base>
);

export const Reloj = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.2V12l3.2 1.9" />
  </Base>
);

export const Estrella = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95Z" />
  </svg>
);

export const WhatsApp = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden={p.titulo ? undefined : true} role={p.titulo ? "img" : undefined} {...p}>
    {p.titulo ? <title>{p.titulo}</title> : null}
    <path d="M17.5 14.4c-.3-.15-1.75-.86-2-.96-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07a8.1 8.1 0 0 1-2.4-1.48 9 9 0 0 1-1.65-2.06c-.17-.3-.02-.45.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.29-1.03 1-1.03 2.45 0 1.44 1.06 2.83 1.2 3.03.15.2 2.08 3.18 5.05 4.46.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.56-.35Z" />
    <path d="M12.04 2.4A9.5 9.5 0 0 0 3.9 16.86L2.6 21.6l4.86-1.27a9.5 9.5 0 1 0 4.58-17.93Zm5.55 15.05a7.9 7.9 0 0 1-9.87 1.07l-.35-.21-2.88.75.77-2.8-.23-.36a7.9 7.9 0 1 1 12.56 1.55Z" />
  </svg>
);

export const Instagram = (p: Props) => (
  <Base {...p}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </Base>
);

export const Facebook = (p: Props) => (
  <Base {...p}>
    <path d="M14.8 8.2h2.4V4.6h-2.6c-2.4 0-4 1.6-4 4v2.2H8.2v3.6h2.4v6.8h3.7v-6.8h2.5l.6-3.6h-3.1V9.1c0-.6.2-.9.5-.9Z" />
  </Base>
);

export const iconos = {
  chispa: Chispa,
  mano: Gancho,
  ovillo: Ovillo,
  chat: Chat,
  regalo: Regalo,
  corona: Corona,
} as const;

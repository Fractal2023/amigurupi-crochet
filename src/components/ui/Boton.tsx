import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variante = "primario" | "contorno" | "claro" | "fantasma";

const base =
  "group relative inline-flex min-h-11 cursor-pointer items-center justify-center gap-2.5 " +
  "rounded-full px-7 py-3.5 text-[0.9375rem] font-medium tracking-[-0.01em] " +
  "transition-all duration-300 ease-[var(--ease-suave)] " +
  "active:scale-[0.975] motion-reduce:active:scale-100";

const variantes: Record<Variante, string> = {
  primario:
    "text-white shadow-[var(--shadow-alta)] " +
    "bg-[linear-gradient(105deg,var(--color-rosa-500),var(--color-rosa-400)_55%,var(--color-coral))] " +
    "bg-[length:180%_auto] bg-[position:0%_center] " +
    "hover:bg-[position:100%_center] hover:shadow-[var(--shadow-flotante)] hover:-translate-y-0.5",
  contorno:
    "text-tinta border border-rosa-200 bg-white/70 backdrop-blur-md " +
    "hover:border-rosa-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-[var(--shadow-suave)]",
  claro:
    "text-tinta bg-white/85 backdrop-blur-md border border-white/70 " +
    "hover:bg-white hover:-translate-y-0.5 hover:shadow-[var(--shadow-alta)]",
  fantasma:
    "text-white border border-white/45 bg-white/10 backdrop-blur-md " +
    "hover:bg-white/20 hover:border-white/70 hover:-translate-y-0.5",
};

type Props = {
  children: ReactNode;
  variante?: Variante;
  className?: string;
  icono?: ReactNode;
} & Omit<ComponentProps<typeof Link>, "className">;

export function Boton({
  children,
  variante = "primario",
  className = "",
  icono,
  ...props
}: Props) {
  const externo = typeof props.href === "string" && props.href.startsWith("http");

  return (
    <Link
      className={`${base} ${variantes[variante]} ${className}`}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {icono ? (
        <span className="transition-transform duration-300 ease-[var(--ease-suave)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
          {icono}
        </span>
      ) : null}
    </Link>
  );
}

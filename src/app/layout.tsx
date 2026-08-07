import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { marca, preguntas } from "@/lib/contenido";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITIO = "https://amigurupicrochet.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: "Amigurumis Personalizados en Motozintla | Amigurupi Crochet",
    template: "%s | Amigurupi Crochet",
  },
  description:
    "Creamos amigurumis personalizados, mascotas tejidas, personajes y flores en crochet hechos completamente a mano en Motozintla, Chiapas.",
  keywords: [
    "amigurumis personalizados",
    "crochet personalizado",
    "amigurumis chiapas",
    "amigurumis motozintla",
    "flores crochet",
    "mascotas tejidas",
    "regalos personalizados",
    "amigurumi personalizado méxico",
  ],
  authors: [{ name: marca.nombre }],
  creator: marca.nombre,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITIO,
    siteName: marca.nombre,
    title: "Amigurumis Personalizados en Motozintla | Amigurupi Crochet",
    description:
      "Tú lo imaginas, yo lo tejo. Amigurumis personalizados, mascotas tejidas, personajes y flores en crochet hechos completamente a mano.",
    images: [
      {
        url: "/galeria/55.webp",
        width: 1080,
        height: 1350,
        alt: "Pareja personalizada tejida a mano por Amigurupi Crochet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amigurumis Personalizados en Motozintla | Amigurupi Crochet",
    description:
      "Tú lo imaginas, yo lo tejo. Piezas únicas tejidas completamente a mano.",
    images: ["/galeria/55.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fffbf8",
  width: "device-width",
  initialScale: 1,
};

/** Datos estructurados para búsquedas locales ("amigurumis en Motozintla"). */
const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: marca.nombre,
  description:
    "Amigurumis personalizados, mascotas tejidas, personajes y flores en crochet hechos completamente a mano.",
  image: `${SITIO}/marca/logo.png`,
  url: SITIO,
  telephone: "+529621192249",
  email: marca.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: marca.direccion.calle,
    addressLocality: "Motozintla",
    addressRegion: "Chiapas",
    addressCountry: "MX",
  },
  geo: { "@type": "GeoCoordinates", latitude: 15.3639, longitude: -92.2472 },
  areaServed: "México",
  sameAs: [marca.instagram, marca.facebook],
};

/** Las preguntas frecuentes también se publican como datos estructurados. */
const datosFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: preguntas.map(({ p, r }) => ({
    "@type": "Question",
    name: p,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Contenido estático propio, no proviene de entrada de usuario. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datosFaq) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

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

const TITULO =
  "Amigurupi Crochet | Amigurumis Personalizados en Motozintla, Chiapas";

const DESCRIPCION =
  "Creamos amigurumis personalizados, personajes, mascotas, ramos de flores y " +
  "regalos tejidos a crochet. Hechos a mano en Motozintla, Chiapas. Envíos a " +
  "todo México.";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: TITULO,
    template: "%s | Amigurupi Crochet",
  },
  description: DESCRIPCION,
  keywords: [
    "amigurumis personalizados",
    "crochet personalizado",
    "amigurumis en Chiapas",
    "amigurumis en Motozintla",
    "regalos tejidos",
    "mascotas tejidas",
    "personajes tejidos",
    "ramos de flores crochet",
    "crochet artesanal México",
  ],
  authors: [{ name: marca.nombre }],
  creator: marca.nombre,
  publisher: marca.nombre,
  category: "Artesanía y regalos personalizados",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITIO,
    siteName: marca.nombre,
    title: TITULO,
    description: DESCRIPCION,
    images: [
      {
        url: "/galeria/55.webp",
        width: 1080,
        height: 1350,
        alt: "Pareja personalizada tejida a mano por Amigurupi Crochet en Motozintla, Chiapas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: [
      {
        url: "/galeria/55.webp",
        alt: "Pareja personalizada tejida a mano por Amigurupi Crochet en Motozintla, Chiapas",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#fffbf8",
  width: "device-width",
  initialScale: 1,
};

/**
 * Datos estructurados para búsquedas locales ("amigurumis en Motozintla").
 * El teléfono va en E.164, que es lo que espera Google.
 */
const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITIO}#taller`,
  name: marca.nombre,
  description: DESCRIPCION,
  image: `${SITIO}/galeria/55.webp`,
  logo: `${SITIO}/marca/logo.png`,
  url: SITIO,
  telephone: marca.telefonoE164,
  email: marca.email,
  priceRange: "$$",
  currenciesAccepted: "MXN",
  paymentAccepted: "Efectivo, Transferencia bancaria, Depósito",
  knowsLanguage: "es-MX",
  address: {
    "@type": "PostalAddress",
    streetAddress: marca.direccion.calle,
    addressLocality: marca.direccion.ciudad,
    addressRegion: marca.direccion.estado,
    addressCountry: "MX",
  },
  geo: { "@type": "GeoCoordinates", latitude: 15.3639, longitude: -92.2472 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  areaServed: [
    { "@type": "Country", name: "México" },
    ...marca.zonas.map((zona) => ({ "@type": "City", name: zona })),
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Atención a clientes",
    telephone: marca.telefonoE164,
    email: marca.email,
    availableLanguage: "Spanish",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tejidos a crochet por encargo",
    itemListElement: [
      "Amigurumis personalizados",
      "Mascotas tejidas",
      "Personajes tejidos",
      "Ramos de flores en crochet",
      "Regalos tejidos personalizados",
      "Decoración tejida",
    ].map((servicio) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: servicio },
    })),
  },
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // La pieza más grande que el sitio muestra es de 1080px de ancho, así que
    // no tiene sentido generar variantes por encima de eso.
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440],
    imageSizes: [64, 96, 128, 200, 256, 384, 512],
    qualities: [75, 88],
  },
};

export default nextConfig;

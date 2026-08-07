import type { MetadataRoute } from "next";

const SITIO = "https://amigurupicrochet.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITIO,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

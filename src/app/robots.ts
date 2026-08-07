import type { MetadataRoute } from "next";

const SITIO = "https://amigurupicrochet.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITIO}/sitemap.xml`,
  };
}

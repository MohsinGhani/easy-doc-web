import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "*",
      disallow: [
        "/admin",
        "/api",
        "/_next",
        "/public",
        "/vercel",
        "/_vercel",
        "/vercel.json",
        "/sitemap.xml",
        "/robots.txt",
        "/payout-settings",
        "/my-payments",
      ],
    },
    sitemap: "https://easy-doc-web-silk.vercel.app/sitemap.xml",
  };
}

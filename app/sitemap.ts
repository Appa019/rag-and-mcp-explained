import type { MetadataRoute } from "next";
import { ragSections, mcpSections } from "@/lib/module-sections";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rag-mcp.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const ragUrls = ragSections.map((s) => ({
    url: s.slug === "" ? `${SITE_URL}/rag` : `${SITE_URL}/rag/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const mcpUrls = mcpSections.map((s) => ({
    url: s.slug === "" ? `${SITE_URL}/mcp` : `${SITE_URL}/mcp/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...ragUrls,
    ...mcpUrls,
  ];
}

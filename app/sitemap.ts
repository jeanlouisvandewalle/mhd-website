import type { MetadataRoute } from "next";
import { categories, sortedProjects } from "@/content/projects";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/projecten/",
    ...categories.map((c) => `/projecten/${c.slug}/`),
    ...sortedProjects.map((p) => `/projecten/${p.slug}/`),
    "/over-ons/",
    "/contact/",
    "/privacy/",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}

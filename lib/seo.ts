import type { Metadata } from "next";
import { site } from "@/content/site";

/** Paginametadata met canonical URL en Open Graph. `path` begint en eindigt met "/". */
export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const images = image ? [{ url: image }] : undefined;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: title ? `${title} — ${site.name}` : site.name,
      description,
      ...(images ? { images } : {}),
    },
  };
}

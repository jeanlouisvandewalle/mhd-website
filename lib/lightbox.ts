import { projectImage } from "./images";
import { categoryLabel, type Project } from "@/content/projects";
import type { LightboxData } from "@/components/Lightbox";

/** Alle foto's van een project (hero eerst) in het formaat van de lightbox. */
export function lightboxData(p: Project, opts: { link?: boolean } = {}): Omit<LightboxData, "index"> {
  const ids = [p.hero, ...p.gallery.map((g) => g.id).filter((id) => id !== p.hero)];
  return {
    title: p.title,
    label: [categoryLabel(p.categories[0]), p.location].filter(Boolean).join(" · "),
    href: opts.link ? `/projecten/${p.slug}/` : undefined,
    images: ids.map((id) => {
      const img = projectImage(p.slug, id);
      return {
        src: img.src,
        srcSet: img.srcSet,
        width: img.width,
        height: img.height,
        alt: p.gallery.find((g) => g.id === id)?.alt ?? p.title,
      };
    }),
  };
}

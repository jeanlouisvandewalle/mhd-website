import { projectImage } from "@/lib/images";

type Props = {
  slug: string;
  id: string;
  alt: string;
  /** `sizes`-attribuut: hoe breed het beeld op het scherm wordt weergegeven */
  sizes: string;
  /** Vaste beeldverhouding van het kader (bv. "4/5"); zonder = originele verhouding; "none" = via className */
  ratio?: string;
  priority?: boolean;
  focus?: string;
  className?: string;
  /** Subtiele vergroting bij hover van een omhullende `.group` */
  zoom?: boolean;
  /** "span" binnen een knop (geldige HTML), anders "div" */
  as?: "div" | "span";
};

/**
 * Responsive projectfoto. Het kader reserveert altijd zijn ruimte (geen layout shift),
 * het beeld vult het kader met `object-fit: cover`.
 */
export function Picture({ slug, id, alt, sizes, ratio, priority, focus, className = "", zoom, as: Tag = "div" }: Props) {
  const img = projectImage(slug, id);
  return (
    <Tag
      className={`media block ${zoom ? "media--zoom" : ""} ${className}`}
      style={ratio === "none" ? undefined : { aspectRatio: ratio ?? `${img.width} / ${img.height}` }}
      data-reveal-media
    >
      {/* Bewust <img>: de beelden zijn al geoptimaliseerd door scripts/images.mjs (statische export). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        style={focus ? { objectPosition: focus } : undefined}
      />
    </Tag>
  );
}

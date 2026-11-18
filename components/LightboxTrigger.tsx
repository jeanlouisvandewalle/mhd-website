"use client";

import Link from "next/link";
import { openLightbox, type LightboxData } from "./Lightbox";

type Data = Omit<LightboxData, "index">;

/**
 * Projecttegel: een klik opent de foto's in de lightbox.
 * Ctrl/Cmd-klik, middelklik of zonder JavaScript gaat de link gewoon naar de projectpagina.
 */
export function ProjectTileLink({ href, data, className, ariaLabel, children }: { href: string; data: Data; className?: string; ariaLabel: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        openLightbox({ ...data, index: 0 });
      }}
    >
      {children}
    </Link>
  );
}

/** Galerijfoto op een projectpagina: opent de lightbox op deze foto. */
export function ZoomButton({ data, index, label, children }: { data: Data; index: number; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="zoomable group"
      aria-haspopup="dialog"
      aria-label={`Vergroot foto: ${label}`}
      onClick={() => openLightbox({ ...data, index })}
    >
      {children}
    </button>
  );
}

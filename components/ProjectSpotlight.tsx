"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Arrow } from "./Logo";
import { openLightbox, type LightboxData } from "./Lightbox";

type Data = Omit<LightboxData, "index">;

/**
 * "Geselecteerd project": één groot beeld in het midden, links en rechts kleinere
 * beelden van de vorige en volgende foto. Klik op een zijbeeld (of de pijlen, of swipe)
 * om door het project te gaan; klik op het grote beeld om het schermvullend te bekijken.
 */
export function ProjectSpotlight({ data }: { data: Data & { href: string } }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = data.images.length;
  const at = (i: number) => data.images[(i + n) % n];
  const go = (d: number) => setIndex((i) => (i + d + n) % n);
  const cur = at(index);
  const prev = at(index - 1);
  const next = at(index + 1);

  const side = (img: typeof cur, dir: -1 | 1) => (
    <button
      type="button"
      onClick={() => go(dir)}
      aria-label={dir === -1 ? "Vorige foto" : "Volgende foto"}
      className="group relative block w-full aspect-[3/4] overflow-hidden bg-[color-mix(in_srgb,var(--fg)_6%,var(--bg))] cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={img.src}
        src={img.src}
        srcSet={img.srcSet}
        sizes="(min-width:1024px) 16vw, 1px"
        alt=""
        loading="lazy"
        className="spotlight-img absolute inset-0 h-full w-full object-cover opacity-55 transition-[opacity,transform] duration-700 group-hover:opacity-90 group-hover:scale-[1.03]"
      />
    </button>
  );

  return (
    <div
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="grid-12 items-center">
        <div className="hidden lg:block lg:col-span-2">{side(prev, -1)}</div>

        <button
          type="button"
          onClick={() => openLightbox({ ...data, index })}
          aria-label={`Bekijk foto schermvullend: ${cur.alt}`}
          aria-haspopup="dialog"
          className="group col-span-12 lg:col-span-8 lg:col-start-3 relative block aspect-[3/2] overflow-hidden bg-[color-mix(in_srgb,var(--fg)_6%,var(--bg))] cursor-zoom-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={cur.src}
            src={cur.src}
            srcSet={cur.srcSet}
            sizes="(min-width:1024px) 66vw, 100vw"
            alt={cur.alt}
            width={cur.width}
            height={cur.height}
            className="spotlight-img absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
          />
        </button>

        <div className="hidden lg:block lg:col-span-2 lg:col-start-11">{side(next, 1)}</div>
      </div>

      {/* Onderschrift en navigatie */}
      <div className="grid-12 gap-y-6 items-center mt-8">
        <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-3">
          <p className="t-label text-accent">{data.label}</p>
          <h3 className="mt-3 text-[13px] t-caps !tracking-[0.2em] font-semibold">{data.title}</h3>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-wrap items-center justify-between md:justify-end gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Vorige foto" className="w-11 h-11 inline-flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <Arrow className="rotate-180" />
            </button>
            <span className="t-label t-num text-grey w-[5.5ch] text-center" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => go(1)} aria-label="Volgende foto" className="w-11 h-11 inline-flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <Arrow />
            </button>
          </div>
          <Link href={data.href} className="arrow-link">
            <span className="label">Bekijk project</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}

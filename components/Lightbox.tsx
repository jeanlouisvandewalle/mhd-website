"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Arrow } from "./Logo";

export type LightboxImage = { src: string; srcSet: string; alt: string; width: number; height: number };
export type LightboxData = { title: string; label?: string; href?: string; images: LightboxImage[]; index: number };

const EVENT = "mhd:lightbox";

/** Opent de lightbox vanuit eender welk element op de pagina. */
export function openLightbox(data: LightboxData) {
  window.dispatchEvent(new CustomEvent<LightboxData>(EVENT, { detail: data }));
}

/**
 * Volledig scherm fotoweergave voor één project.
 * Pijltjes (knoppen, ← →, swipe) wisselen tussen de foto's; Esc of × sluit.
 * Eén exemplaar staat in de layout en luistert naar `openLightbox()`.
 */
export function LightboxHost() {
  const [data, setData] = useState<LightboxData | null>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const count = data?.images.length ?? 0;
  const go = useCallback((dir: number) => setIndex((i) => (count ? (i + dir + count) % count : 0)), [count]);

  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => {
      setData(null);
      returnFocus.current?.focus();
    }, 350);
  }, []);

  // Openen
  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<LightboxData>).detail;
      returnFocus.current = document.activeElement as HTMLElement;
      setData(d);
      setIndex(d.index);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    };
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  // Toetsenbord, scroll-lock en focus
  useEffect(() => {
    if (!data) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // Focus binnen de lightbox houden
        const nodes = Array.from(document.querySelectorAll<HTMLElement>("#lightbox button, #lightbox a"));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
    };
  }, [data, go, close]);

  // Buurfoto's alvast laden
  useEffect(() => {
    if (!data) return;
    for (const d of [1, -1]) {
      const img = data.images[(index + d + count) % count];
      if (img) {
        const pre = new Image();
        pre.sizes = "90vw";
        pre.srcset = img.srcSet;
        pre.src = img.src;
      }
    }
  }, [data, index, count]);

  if (!data) return null;
  const img = data.images[index];
  const multiple = count > 1;

  return (
    <div
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${data.title} — foto ${index + 1} van ${count}`}
      className={`lightbox theme-dark ${visible ? "is-open" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* Bovenbalk */}
      <div className="lightbox__top wrap">
        <p className="t-label text-accent">{data.label}</p>
        <button ref={closeRef} type="button" className="lightbox__btn" onClick={close} aria-label="Sluiten">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M3 3l14 14M17 3L3 17" /></svg>
        </button>
      </div>

      {/* Foto */}
      <figure className="lightbox__stage" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={img.src}
          src={img.src}
          srcSet={img.srcSet}
          sizes="(min-width:1024px) 86vw, 100vw"
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="lightbox__img"
        />
      </figure>

      {multiple ? (
        <>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Vorige foto">
            <Arrow className="rotate-180" />
          </button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Volgende foto">
            <Arrow />
          </button>
        </>
      ) : null}

      {/* Onderschrift */}
      <div className="lightbox__bottom wrap">
        <p className="t-label !tracking-[0.2em]">{data.title}</p>
        <p className="t-label text-grey t-num" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        {data.href ? (
          <Link href={data.href} className="arrow-link !py-0" onClick={() => setData(null)}>
            <span className="label">Bekijk project</span>
            <Arrow />
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}

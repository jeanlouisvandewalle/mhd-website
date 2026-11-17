"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { nav, site } from "@/content/site";
import { categories } from "@/content/projects";

export function Header() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu sluiten bij navigatie
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <>
      <header className={`site-header ${compact ? "is-compact" : ""}`}>
        <div className="wrap site-header__bar">
          <Link href="/" className="site-logo" aria-label={`${site.name} — home`}>
            <Logo />
          </Link>

          <nav aria-label="Hoofdnavigatie" className="hidden md:block">
            <ul className="flex items-center gap-12 t-label">
              <li className="dropdown py-3">
                <Link href="/projecten/" className={`link-line ${isActive("/projecten/") ? "is-active" : ""}`} aria-current={pathname === "/projecten/" ? "page" : undefined}>
                  Projecten
                </Link>
                <div className="dropdown__panel">
                  <ul className="flex flex-col gap-3">
                    <li>
                      <Link href="/projecten/" className="link-line">Alle projecten</Link>
                    </li>
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/projecten/${c.slug}/`}
                          className="link-line"
                          aria-current={pathname === `/projecten/${c.slug}/` ? "page" : undefined}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              {nav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-line" aria-current={isActive(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={burgerRef}
            type="button"
            className="burger md:hidden relative z-[60]"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu md:hidden ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobiele navigatie" className="wrap flex flex-1 flex-col justify-between pt-10 pb-10">
          <ul className="flex flex-col gap-2">
            <li className="mm-item" style={{ transitionDelay: "60ms" }}>
              <Link href="/projecten/" className="t-h1 block py-1">Projecten</Link>
              <ul className="mt-3 mb-5 flex flex-col gap-1 pl-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/projecten/${c.slug}/`} className="block py-2 text-[15px] text-grey">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {nav.slice(1).map((item, i) => (
              <li key={item.href} className="mm-item" style={{ transitionDelay: `${120 + i * 60}ms` }}>
                <Link href={item.href} className="t-h1 block py-1">{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="mm-item t-small text-grey flex flex-col gap-1" style={{ transitionDelay: "260ms" }}>
            <a href={site.phoneHref} className="py-1">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="py-1">{site.email}</a>
          </div>
        </nav>
      </div>
    </>
  );
}

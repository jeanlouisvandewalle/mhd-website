import Link from "next/link";
import { Arrow } from "./Logo";

/** Tekstlink met pijl — vervangt klassieke CTA-knoppen. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const inner = (
    <>
      <span className="label">{children}</span>
      <Arrow />
    </>
  );
  return external ? (
    <a href={href} className={`arrow-link ${className}`}>{inner}</a>
  ) : (
    <Link href={href} className={`arrow-link ${className}`}>{inner}</Link>
  );
}

/** Klein sectielabel, bv. "01 — Interieur" */
export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`t-label ${className}`}>{children}</p>;
}

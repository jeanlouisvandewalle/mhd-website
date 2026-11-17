import Link from "next/link";
import { Logo } from "./Logo";
import { Year } from "./Year";
import { nav, site } from "@/content/site";
import { categories } from "@/content/projects";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="wrap pt-24 md:pt-32 pb-10">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <Link href="/" aria-label={`${site.name} — home`} className="inline-block">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="mt-8 t-small text-footer-grey">{site.tagline}</p>
          </div>

          <FooterCol title="Navigatie" className="col-span-6 md:col-span-4 lg:col-span-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line">{item.label}</Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Expertise" className="col-span-6 md:col-span-4 lg:col-span-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/projecten/${c.slug}/`} className="link-line">{c.label}</Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Contact" className="col-span-12 md:col-span-4 lg:col-span-3">
            <li><a href={site.phoneHref} className="link-line">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="link-line break-all">{site.email}</a></li>
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line">
                {site.address.street}, {site.address.postalCode} {site.address.city}
              </a>
            </li>
          </FooterCol>
        </div>

        <div className="mt-24 md:mt-32 pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-3 justify-between t-small text-footer-grey">
          <p>© {site.name} — <Year /></p>
          <Link href="/privacy/" className="link-line self-start">Privacybeleid</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="t-label text-footer-grey mb-6">{title}</h2>
      <ul className="flex flex-col gap-3 text-[15px]">{children}</ul>
    </div>
  );
}

import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: `Een project bespreken? Contacteer ${site.name} in ${site.address.city}: ${site.phone} of ${site.email}.`,
  path: "/contact/",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export default function ContactPage() {
  return (
    <div className="theme-dark">
      <section className="wrap pt-[clamp(5rem,11vw,11rem)] pb-[clamp(4rem,8vw,8rem)]">
        <div data-reveal>
          <p className="t-label rule text-accent mb-8">Contact</p>
          {/* Optische uitlijning: de E van Sweet Sans heeft 0,13em witruimte links, de W 0,04em */}
          <h1 className="t-display t-caps !tracking-[0.06em] fit-caps relative -left-[0.13em]">Een project bespreken?</h1>
          <p className="t-lead text-grey mt-6 relative -left-[0.04em]">We horen graag van je.</p>
        </div>
      </section>

      <section className="wrap pb-[var(--section)]">
        <div className="grid-12 gap-y-20 border-t border-line pt-12">
          <address className="col-span-12 lg:col-span-4 not-italic flex flex-col gap-10" data-reveal>
            <ContactItem label={site.name}>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </a>
            </ContactItem>
            <ContactItem label="Telefoon">
              <a href={site.phoneHref} className="link-line">{site.phone}</a>
            </ContactItem>
            <ContactItem label="E-mail">
              <a href={`mailto:${site.email}`} className="link-line break-all">{site.email}</a>
            </ContactItem>
          </address>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6" data-reveal style={delay(150)}>
            <h2 className="sr-only">Contactformulier</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="t-label text-accent mb-3">{label}</p>
      <p className="t-h3">{children}</p>
    </div>
  );
}

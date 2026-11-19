import Link from "next/link";
import { Picture } from "@/components/Picture";
import { ProjectGrid } from "@/components/projects";
import { ArrowLink } from "@/components/ui";
import { Fade } from "@/components/Fade";
import { Arrow } from "@/components/Logo";
import { sortedProjects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  description: site.description,
  path: "/",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

/** Beelden per discipline — echte MHD-realisaties uit de projectdata. */
const expertise = [
  {
    no: "01",
    title: "Interieur",
    text: "Maatwerk voor iedere ruimte.",
    href: "/projecten/interieur/",
    slug: "residentie-kalk-en-eik",
    id: "05",
    alt: "Keukeneiland en eettafel in kalk en eik",
  },
  {
    no: "02",
    title: "Exterieur",
    text: "Doordachte oplossingen voor buiten.",
    href: "/projecten/exterieur/",
    slug: "poolhouse-kortrijk",
    id: "01",
    alt: "Poolhouse met houten gevelbekleding aan het zwembad",
  },
  {
    no: "03",
    title: "Totaalprojecten",
    text: "Van eerste idee tot laatste detail.",
    href: "/projecten/totaalprojecten/",
    slug: "uitbouw-leefruimte",
    id: "02",
    alt: "Uitbouw met nieuwe leefruimte, gezien van buitenaf",
  },
];

export default function Home() {
  const featured = sortedProjects.filter((p) => p.featured);

  return (
    <>
      {/* 01 — Hero: beeldvullend, vloeit onderaan over in het zwarte Expertise-blok */}
      <section aria-labelledby="hero-title" className="theme-dark relative h-[calc(88svh-var(--header-h))] min-h-[560px] md:h-[calc(100svh-var(--header-h))] md:min-h-[620px] overflow-hidden">
        <Picture
          slug="residentie-kalk-en-eik"
          id="01"
          alt="Leefruimte met keuken, eettafel en zithoek, volledig in maatwerk door MHD"
          sizes="100vw"
          priority
          ratio="none"
          focus="38% 50%"
          className="!absolute inset-0 h-full hero-shade hero-shade--fade hero-zoom"
        />
        <div className="relative z-10 h-full wrap flex flex-col justify-end pb-[clamp(2.5rem,6vw,5.5rem)]">
          <div className="grid-12 gap-y-8 items-end">
            <div className="col-span-12 lg:col-span-8">
              <p className="t-label rule text-[#f2efe9]/80 mb-7">{site.name}</p>
              <h1 id="hero-title" className="t-h1 t-caps !tracking-[0.07em] text-[#f2efe9] max-w-[16ch]">
                Maatwerk in zijn puurste vorm
              </h1>
            </div>
            {/* Tagline en link delen exact dezelfde rechterrand; de -mr compenseert de letterspatiëring na de laatste letter */}
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col gap-3 lg:items-end text-[#f2efe9]">
              <p className="t-label text-[#f2efe9]/80 whitespace-nowrap max-sm:text-[clamp(8.5px,2.7vw,10px)] max-sm:!tracking-[0.16em] lg:-mr-[0.26em]">{site.tagline}</p>
              <ArrowLink href="/projecten/">Bekijk projecten</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Expertise op zwart, direct onder de hero */}
      <section className="theme-dark" aria-labelledby="expertise-title">
        <div className="wrap pt-[clamp(4rem,8vw,8rem)] pb-[clamp(3rem,6vw,6rem)]">
          <SectionHead id="expertise-title" label="Expertise" title="Drie disciplines, één handschrift" />

          <div className="flex flex-col gap-[clamp(5rem,10vw,11rem)]">
            <Link href={expertise[0].href} className="group grid-12 gap-y-10 items-end" data-reveal>
              <div className="col-span-12 lg:col-span-7">
                <Picture slug={expertise[0].slug} id={expertise[0].id} alt={expertise[0].alt} sizes="(min-width:1024px) 58vw, 100vw" ratio="4 / 3" zoom />
              </div>
              <Discipline {...expertise[0]} className="col-span-12 md:col-span-7 lg:col-span-5 lg:col-start-8 lg:pl-[clamp(0rem,2vw,2rem)]" />
            </Link>

            <Link href={expertise[1].href} className="group grid-12 gap-y-10 items-end" data-reveal>
              <Discipline {...expertise[1]} className="col-span-12 md:col-span-7 lg:col-span-5 lg:col-start-1 order-2 lg:order-1" />
              <div className="col-span-12 lg:col-span-7 lg:col-start-6 order-1 lg:order-2">
                <Picture slug={expertise[1].slug} id={expertise[1].id} alt={expertise[1].alt} sizes="(min-width:1024px) 58vw, 100vw" ratio="3 / 2" zoom />
              </div>
            </Link>

            {/* Totaalprojecten: zelfde opbouw als Interieur — foto links, tekst rechts */}
            <Link href={expertise[2].href} className="group grid-12 gap-y-10 items-end" data-reveal>
              <div className="col-span-12 lg:col-span-7">
                <Picture slug={expertise[2].slug} id={expertise[2].id} alt={expertise[2].alt} sizes="(min-width:1024px) 58vw, 100vw" ratio="4 / 3" zoom focus="50% 60%" />
              </div>
              <Discipline {...expertise[2]} className="col-span-12 md:col-span-7 lg:col-span-5 lg:col-start-8 lg:pl-[clamp(0rem,2vw,2rem)]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Zachte overgang zwart → kalkwit */}
      <Fade from="ink" to="kalk" />

      {/* 03 — Geselecteerde projecten op kalkwit */}
      <section className="theme-light" aria-labelledby="selected-title">
        <div className="wrap pt-[clamp(2rem,4vw,4rem)] pb-[clamp(3rem,6vw,6rem)]">
          <SectionHead id="selected-title" label="Portfolio" title="Geselecteerde projecten" count={featured.length} />
          <ProjectGrid projects={featured} layout="home" />
          <div className="mt-[clamp(4rem,8vw,8rem)] flex justify-end" data-reveal>
            <ArrowLink href="/projecten/">Bekijk alle projecten</ArrowLink>
          </div>
        </div>
      </section>

      {/* Zachte overgang kalkwit → zwart */}
      <Fade from="kalk" to="ink" />

      {/* 04 — Contact op zwart, loopt over in de footer */}
      <section className="theme-dark" aria-labelledby="contact-title">
        <div className="wrap pt-[clamp(2rem,4vw,4rem)]">
          <div className="grid-12 gap-y-10 items-end">
            <div className="col-span-12 lg:col-span-9" data-reveal>
              <p className="t-label rule text-accent mb-8">Contact</p>
              <h2 id="contact-title" className="t-display">Een project in gedachten?</h2>
              <p className="t-lead text-grey mt-6">We luisteren graag.</p>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:text-right" data-reveal style={delay(150)}>
              <ArrowLink href="/contact/">Neem contact op</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({ id, label, title, count }: { id: string; label: string; title: string; count?: number }) {
  return (
    <div className="grid-12 gap-y-6 items-end mb-[clamp(3.5rem,7vw,7rem)]" data-reveal>
      <p className="col-span-12 lg:col-span-3 t-label rule text-accent">{label}</p>
      <h2 id={id} className="col-span-10 lg:col-span-7 t-h2">{title}</h2>
      {count ? (
        <span className="col-span-2 text-right t-label text-grey t-num">{String(count).padStart(2, "0")}</span>
      ) : null}
    </div>
  );
}

function Discipline({ no, title, text, className = "" }: { no: string; title: string; text: string; className?: string }) {
  return (
    <div className={className}>
      <p className="t-label text-accent t-num mb-6">{no}</p>
      <h3 className="t-caps !tracking-[0.08em] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.15]">{title}</h3>
      <p className="text-grey mt-5">{text}</p>
      <span className="arrow-link mt-8">
        <span className="label">Bekijk {title.toLowerCase()}</span>
        <Arrow />
      </span>
    </div>
  );
}

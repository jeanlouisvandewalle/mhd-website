import Link from "next/link";
import { Picture } from "@/components/Picture";
import { ProjectGrid } from "@/components/projects";
import { ArrowLink } from "@/components/ui";
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
      {/* 01 — Hero */}
      <section aria-labelledby="hero-title">
        <div className="px-[var(--gutter)] md:px-0">
          <Picture
            slug="residentie-kalk-en-eik"
            id="01"
            alt="Leefruimte met keuken, eettafel en zithoek, volledig in maatwerk door MHD"
            sizes="100vw"
            priority
            ratio="none"
            focus="38% 50%"
            className="aspect-[4/5] sm:aspect-[4/3] md:aspect-auto md:h-[calc(100svh-var(--header-h)-7.5rem)] md:min-h-[520px]"
          />
        </div>
        <div className="wrap">
          <div className="grid-12 gap-y-6 items-end pt-7 md:pt-8 md:min-h-[7.5rem]">
            <h1 id="hero-title" className="col-span-12 md:col-span-9 t-h3 md:text-[clamp(1.375rem,2.1vw,2rem)] leading-[1.15]">
              <span className="sr-only">{site.name} — </span>
              {site.tagline}
            </h1>
            <div className="col-span-12 md:col-span-3 md:text-right">
              <ArrowLink href="/projecten/">Bekijk projecten</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Introductie */}
      <section className="wrap py-[var(--section)]">
        <div className="grid-12 gap-y-10">
          <h2 className="col-span-12 lg:col-span-10 lg:col-start-2 t-display" data-reveal>
            Maatwerk, tot in het&nbsp;detail.
          </h2>
          <p className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-8 t-lead text-grey" data-reveal style={delay(150)}>
            Van interieur tot exterieur. Van ontwerp tot realisatie.
          </p>
        </div>
      </section>

      {/* 03 — Geselecteerde projecten */}
      <section className="wrap" aria-labelledby="selected-title">
        <div className="flex items-end justify-between gap-6 border-t border-line pt-6 mb-[clamp(3rem,6vw,6rem)]" data-reveal>
          <h2 id="selected-title" className="t-label">Geselecteerde projecten</h2>
          <span className="t-label text-grey t-num">{String(featured.length).padStart(2, "0")}</span>
        </div>
        <ProjectGrid projects={featured} layout="home" />
        <div className="mt-[clamp(4rem,8vw,8rem)] flex justify-end" data-reveal>
          <ArrowLink href="/projecten/">Bekijk alle projecten</ArrowLink>
        </div>
      </section>

      {/* 04 — Expertise */}
      <section className="wrap pt-[var(--section)]" aria-labelledby="expertise-title">
        <div className="flex items-end justify-between gap-6 border-t border-line pt-6 mb-[clamp(3rem,6vw,6rem)]" data-reveal>
          <h2 id="expertise-title" className="t-label">Expertise</h2>
          <span className="t-label text-grey">Interieur — Exterieur — Totaalprojecten</span>
        </div>

        <div className="flex flex-col gap-[clamp(5rem,10vw,11rem)]">
          {/* Interieur: beeld links, tekst rechts onderaan */}
          <Link href={expertise[0].href} className="group grid-12 gap-y-8 items-end" data-reveal>
            <div className="col-span-12 lg:col-span-7">
              <Picture slug={expertise[0].slug} id={expertise[0].id} alt={expertise[0].alt} sizes="(min-width:1024px) 58vw, 100vw" ratio="4 / 3" zoom />
            </div>
            <Discipline {...expertise[0]} className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-9" />
          </Link>

          {/* Exterieur: tekst links, beeld rechts */}
          <Link href={expertise[1].href} className="group grid-12 gap-y-8 items-end" data-reveal>
            <Discipline {...expertise[1]} className="col-span-12 md:col-span-6 lg:col-span-3 lg:col-start-2 order-2 lg:order-1" />
            <div className="col-span-12 lg:col-span-7 lg:col-start-6 order-1 lg:order-2">
              <Picture slug={expertise[1].slug} id={expertise[1].id} alt={expertise[1].alt} sizes="(min-width:1024px) 58vw, 100vw" ratio="3 / 2" zoom />
            </div>
          </Link>

          {/* Totaalprojecten: brede uitsnede over de volle breedte */}
          <Link href={expertise[2].href} className="group grid-12 gap-y-8" data-reveal>
            <div className="col-span-12">
              <Picture slug={expertise[2].slug} id={expertise[2].id} alt={expertise[2].alt} sizes="100vw" ratio="21 / 9" zoom className="max-md:!aspect-[4/3]" focus="50% 60%" />
            </div>
            <Discipline {...expertise[2]} className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-5" />
          </Link>
        </div>
      </section>

      {/* 05 — Over MHD */}
      <section className="wrap py-[var(--section)]" aria-labelledby="about-title">
        <div className="grid-12 gap-y-12 items-center">
          <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2" data-reveal>
            <Picture slug="residentie-kalk-en-eik" id="03" alt="Afgeronde kastwand in kalkafwerking" sizes="(min-width:1024px) 42vw, (min-width:768px) 50vw, 100vw" ratio="4 / 5" />
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8" data-reveal style={delay(150)}>
            <p className="t-label text-grey mb-6">Over MHD</p>
            <h2 id="about-title" className="t-h2">Drie generaties vakmanschap.</h2>
            <p className="t-lead text-grey mt-6">Een verhaal van ervaring, precisie en aandacht voor materiaal.</p>
            <div className="mt-10">
              <ArrowLink href="/over-ons/">Meer over MHD</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — Contact */}
      <section className="wrap pb-[var(--section)]" aria-labelledby="contact-title">
        <div className="border-t border-line pt-[clamp(4rem,10vw,10rem)] grid-12 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-9" data-reveal>
            <h2 id="contact-title" className="t-display">Een project in gedachten?</h2>
            <p className="t-lead text-grey mt-6">We luisteren graag.</p>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:text-right" data-reveal style={delay(150)}>
            <ArrowLink href="/contact/">Neem contact op</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}

function Discipline({ no, title, text, className = "" }: { no: string; title: string; text: string; className?: string }) {
  return (
    <div className={className}>
      <p className="t-label text-grey t-num mb-5">{no}</p>
      <h3 className="t-h2">{title}</h3>
      <p className="text-grey mt-4">{text}</p>
      <span className="arrow-link mt-6">
        <span className="label">Bekijk {title.toLowerCase()}</span>
        <Arrow />
      </span>
    </div>
  );
}

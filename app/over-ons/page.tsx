import { Picture } from "@/components/Picture";
import { ArrowLink } from "@/components/ui";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Over ons",
  description:
    "MHD combineert drie generaties ervaring met een scherp oog voor materiaal, vorm en afwerking. Eigen atelier in Izegem.",
  path: "/over-ons/",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

/*
 * Ruimte voor later: zodra er foto's van het team, het atelier of het werkproces zijn,
 * vervang je de projectbeelden hieronder (props `slug` + `id` van <Picture>) of voeg je
 * een map fotos/over-ons/ toe en verwijs je daarnaar. Label ze dan ook zo in de alt-tekst.
 */
/** Drie pijlers, overgenomen van de huidige website en ingekort tot één zin. */
const pillars = [
  { no: "01", title: "Van vader op zoon", text: "Kennis van hout, al generaties lang doorgegeven." },
  { no: "02", title: "Passie voor kwaliteit", text: "Kwalitatief hout, Belgische materialen, een ambachtelijke aanpak." },
  { no: "03", title: "Modern machinepark", text: "Ambacht, gekoppeld aan de nieuwste technieken." },
];

export default function AboutPage() {
  return (
    <>
      {/* Opening — Drie generaties vakmanschap */}
      <section className="theme-kalk" aria-labelledby="about-title">
        <div className="wrap pt-[clamp(3rem,6vw,6rem)] pb-[var(--section)]">
          <div className="grid-12 gap-y-12 items-center">
            <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2">
              <Picture slug="residentie-kalk-en-eik" id="03" alt="Afgeronde kastwand in kalkafwerking" sizes="(min-width:1024px) 42vw, (min-width:768px) 50vw, 100vw" ratio="4 / 5" priority />
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7 @container" data-reveal style={delay(150)}>
              <p className="t-label rule text-accent mb-8">Over MHD</p>
              {/* Zelfde stijl als de titel "Projecten"; krimpt enkel als het langste woord anders niet in de kolom past */}
              <h1 id="about-title" className="t-display t-caps !tracking-[0.06em] about-title">Drie generaties vakmanschap.</h1>
              <p className="t-lead text-grey mt-6">Een verhaal van ervaring, precisie en aandacht voor materiaal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Familiebedrijf — statement op zwart, met beeldband */}
      <section className="theme-dark" aria-labelledby="dna-title">
        <div className="wrap py-[var(--section)]">
          <div className="grid-12 gap-y-10 items-end">
            <div className="col-span-12 lg:col-span-7" data-reveal>
              <p className="t-label rule text-accent mb-8">Familiebedrijf</p>
              <h2 id="dna-title" className="t-h1 t-caps !tracking-[0.06em]">Hout zit in ons DNA.</h2>
            </div>
            <p className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 t-lead text-grey" data-reveal style={delay(150)}>
              Dieter Holvoet en een team van acht vakmensen, vanuit een eigen atelier in {site.address.city}.
            </p>
          </div>
        </div>
        <div data-reveal>
          <Picture
            slug="uitbouw-leefruimte"
            id="01"
            alt="Eethoek met eiken wandbekleding en maatkasten in zwart eiken"
            sizes="100vw"
            ratio="none"
            className="aspect-[4/5] sm:aspect-[3/2] md:aspect-[21/9]"
          />
        </div>
      </section>

      {/* Drie pijlers */}
      <section className="theme-light" aria-labelledby="pillars-title">
        <div className="wrap pt-[var(--section)] pb-[clamp(4rem,7vw,7rem)]">
          <h2 id="pillars-title" className="t-label rule text-accent mb-[clamp(3rem,6vw,5rem)]" data-reveal>Waar we voor staan</h2>
          <ol className="grid gap-y-12 md:grid-cols-3 md:gap-x-[var(--col-gap)]">
            {pillars.map((p, i) => (
              <li key={p.no} className="border-t border-line pt-8" data-reveal style={delay(i * 100)}>
                <span className="t-label text-accent t-num">{p.no}</span>
                <h3 className="mt-6 t-caps !tracking-[0.1em] text-[clamp(1.25rem,1.7vw,1.625rem)] leading-[1.25]">{p.title}</h3>
                <p className="text-grey mt-4 max-w-[30ch]">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Beeldcompositie: materiaal en detail */}
      <section className="theme-kalk" aria-label="Details uit realisaties">
        <div className="wrap pt-0 pb-[var(--section)]">
        <div className="grid-12 gap-y-[clamp(3.5rem,9vw,10rem)] items-end">
          <figure className="col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-2" data-reveal>
            <Picture slug="uitbouw-leefruimte" id="13" alt="Detail van een kastfront in zwart eiken" sizes="(min-width:1024px) 34vw, (min-width:768px) 42vw, 100vw" />
          </figure>
          <figure className="col-span-12 md:col-span-6 md:col-start-7" data-reveal style={delay(150)}>
            <Picture slug="residentie-kalk-en-eik" id="04" alt="Eiken kastdeuren met houten grepen" sizes="(min-width:768px) 50vw, 100vw" ratio="4 / 5" />
          </figure>
        </div>
        </div>
      </section>

      {/* Atelier */}
      <section className="theme-dark">
        <div className="wrap py-[var(--section)]">
        <div className="grid-12 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-7" data-reveal>
            <p className="t-label rule text-accent mb-8">Atelier</p>
            <h2 className="t-h1 t-caps !tracking-[0.06em]">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col gap-2 lg:items-end" data-reveal style={delay(150)}>
            <ArrowLink href="/projecten/">Bekijk onze projecten</ArrowLink>
            <ArrowLink href="/contact/">Neem contact op</ArrowLink>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}

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
/**
 * "Zo werken we" — drie stappen, elk met een echt beeld uit het atelier of een realisatie.
 * Foto's staan in fotos/over-ons/ (01–04). Teksten zijn kort gehouden en gebaseerd op de huidige website.
 */
const steps = [
  {
    no: "01",
    title: "Met de hand",
    text: "Kwalitatief hout en Belgische materialen, ambachtelijk bewerkt in ons atelier in Izegem.",
    img: "02",
    alt: "Vakman freest een massief houten kader in het atelier",
    ratio: "16 / 10",
  },
  {
    no: "02",
    title: "Met precisie",
    text: "Elk project tekenen we zelf. Een modern machinepark zorgt dat alles tot op de millimeter klopt.",
    img: "03",
    alt: "Medewerker van MHD aan de paneelzaag in het atelier",
    ratio: "16 / 10",
  },
  {
    no: "03",
    title: "Bij u thuis",
    text: "Tot het resultaat past bij uw ruimte, uw smaak en uw manier van leven.",
    img: "04",
    alt: "Gezin aan een bar op maat met eiken wandbekleding",
    ratio: "3 / 2",
  },
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
              <h1 id="about-title" className="t-display t-caps !tracking-[0.06em] about-title">Drie generaties vakmanschap</h1>
              <p className="t-lead text-grey mt-6">Een verhaal van ervaring, precisie en aandacht voor materiaal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Familiebedrijf — statement op zwart met een beeld uit het atelier */}
      <section className="theme-dark" aria-labelledby="dna-title">
        <div className="wrap py-[var(--section)]">
          <div className="grid-12 gap-y-12 items-end">
            <div className="col-span-12 lg:col-span-5" data-reveal>
              <p className="t-label rule text-accent mb-8">Familiebedrijf</p>
              <h2 id="dna-title" className="t-h1 t-caps !tracking-[0.06em]">Hout zit in ons DNA</h2>
              <p className="t-lead text-grey mt-8 max-w-[34ch]">
                Van vader op zoon, al drie generaties. Vandaag staat Dieter Holvoet aan het roer, samen met een team van acht vakmensen.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6" data-reveal style={delay(150)}>
              <Picture slug="over-ons" id="01" alt="Twee vakmensen van MHD overleggen aan de werkbank in het atelier" sizes="(min-width:1024px) 58vw, 100vw" ratio="16 / 10" />
            </div>
          </div>
        </div>
      </section>

      {/* Zo werken we — vier stappen, afwisselend beeld links en rechts */}
      <section className="theme-light" aria-labelledby="steps-title">
        <div className="wrap py-[var(--section)]">
          <div className="grid-12 gap-y-6 items-end mb-[clamp(4rem,8vw,8rem)]" data-reveal>
            <p className="col-span-12 lg:col-span-3 t-label rule text-accent">Zo werken we</p>
            <h2 id="steps-title" className="col-span-12 lg:col-span-8 t-h2">Van eerste schets tot het moment dat u thuiskomt</h2>
          </div>

          <ol className="flex flex-col gap-[clamp(4.5rem,9vw,9rem)]">
            {steps.map((st, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={st.no} className="grid-12 gap-y-8 items-center" data-reveal>
                  <div className={`col-span-12 lg:col-span-7 ${flip ? "lg:col-start-6 lg:order-2" : ""}`}>
                    <Picture slug="over-ons" id={st.img} alt={st.alt} sizes="(min-width:1024px) 58vw, 100vw" ratio={st.ratio} />
                  </div>
                  <div className={`col-span-12 md:col-span-8 lg:col-span-4 ${flip ? "lg:col-start-1 lg:order-1" : "lg:col-start-9"}`}>
                    <span className="t-label text-accent t-num">{st.no}</span>
                    <h3 className="mt-5 t-caps !tracking-[0.1em] text-[clamp(1.375rem,2vw,1.875rem)] leading-[1.2]">{st.title}</h3>
                    <p className="text-grey mt-4 t-lead max-w-[32ch]">{st.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Atelier */}
      <section className="theme-dark">
        <div className="wrap pt-[var(--section)] pb-[clamp(3rem,6vw,6rem)]">
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

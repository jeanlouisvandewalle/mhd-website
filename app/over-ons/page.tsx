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
const themes = [
  {
    no: "01",
    word: "Ervaring",
    line: "Drie generaties vakmanschap.",
    text: "Kennis van hout en schrijnwerk, doorgegeven van generatie op generatie.",
  },
  {
    no: "02",
    word: "Precisie",
    line: "Aandacht voor elk detail.",
    text: "Ontwerp en technische uitwerking gebeuren in eigen huis.",
  },
  {
    no: "03",
    word: "Maatwerk",
    line: "Oplossingen afgestemd op de ruimte.",
    text: `Gemaakt in ons eigen atelier in ${site.address.city}.`,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Opening — Drie generaties vakmanschap */}
      <section className="theme-kalk" aria-labelledby="about-title">
        <div className="wrap pt-[clamp(5rem,11vw,11rem)] pb-[var(--section)]">
          <div className="grid-12 gap-y-12 items-center">
            <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2">
              <Picture slug="residentie-kalk-en-eik" id="03" alt="Afgeronde kastwand in kalkafwerking" sizes="(min-width:1024px) 42vw, (min-width:768px) 50vw, 100vw" ratio="4 / 5" priority />
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8" data-reveal style={delay(150)}>
              <p className="t-label rule text-accent mb-8">Over MHD</p>
              <h1 id="about-title" className="t-h2">Drie generaties vakmanschap.</h1>
              <p className="t-lead text-grey mt-6">Een verhaal van ervaring, precisie en aandacht voor materiaal.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="theme-dark" data-reveal>
        <Picture
          slug="uitbouw-leefruimte"
          id="01"
          alt="Eethoek met eiken wandbekleding en maatkasten in zwart eiken"
          sizes="100vw"
          ratio="none"
          className="aspect-[4/5] sm:aspect-[3/2] md:aspect-[21/9]"
        />
      </div>

      {/* Thema's */}
      <section className="theme-light" aria-label="Waar MHD voor staat">
        <div className="wrap pt-[var(--section)] pb-[clamp(3rem,5vw,5rem)]">
        <ol className="flex flex-col">
          {themes.map((t, i) => (
            <li key={t.no} className="grid-12 gap-y-4 border-t border-line py-[clamp(2.5rem,5vw,4.5rem)] last:border-b" data-reveal style={delay(i * 80)}>
              <span className="col-span-2 lg:col-span-1 t-label text-accent t-num pt-3">{t.no}</span>
              <h2 className="col-span-10 lg:col-span-4 t-h2 t-caps !tracking-[0.08em]">{t.word}</h2>
              <div className="col-span-12 md:col-span-10 md:col-start-3 lg:col-span-5 lg:col-start-7">
                <p className="t-h3">{t.line}</p>
                <p className="text-grey mt-3">{t.text}</p>
              </div>
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

import { ArrowLink } from "@/components/ui";

export const metadata = { title: "Pagina niet gevonden", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="wrap py-[var(--section)]">
      <p className="t-label text-grey mb-6">404</p>
      <h1 className="t-display">Deze pagina bestaat niet.</h1>
      <div className="mt-12 flex flex-col gap-2">
        <ArrowLink href="/projecten/">Bekijk onze projecten</ArrowLink>
        <ArrowLink href="/">Naar de homepage</ArrowLink>
      </div>
    </section>
  );
}

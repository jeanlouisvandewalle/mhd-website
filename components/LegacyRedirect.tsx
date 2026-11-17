import Link from "next/link";
import { site } from "@/content/site";

/**
 * Doorverwijzing voor URL's van de vorige website (statische hosting kent geen
 * server-redirects). Zoekmachines volgen de meta-refresh en de canonical.
 */
export function LegacyRedirect({ to }: { to: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <link rel="canonical" href={`${site.url}${to}`} />
      <meta name="robots" content="noindex, follow" />
      <section className="wrap py-[var(--section)]">
        <p className="t-lead">
          Deze pagina is verhuisd naar <Link href={to} className="underline underline-offset-4">{to}</Link>.
        </p>
      </section>
    </>
  );
}

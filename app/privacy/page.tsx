import fs from "node:fs";
import path from "node:path";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = pageMeta({
  title: "Privacybeleid",
  description: `Privacybeleid van ${site.name}.`,
  path: "/privacy/",
});

export default function PrivacyPage() {
  // Tekst overgenomen van de bestaande website; aanpasbaar in content/privacy.html
  const html = fs.readFileSync(path.join(process.cwd(), "content", "privacy.html"), "utf8");
  return (
    <section className="wrap pt-[clamp(4rem,10vw,10rem)] pb-[var(--section)]">
      <div className="grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <p className="t-label text-grey mb-6">Juridisch</p>
          <h1 className="t-h1">Privacybeleid</h1>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 prose-mhd" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
}

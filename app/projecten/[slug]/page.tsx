import Link from "next/link";
import { notFound } from "next/navigation";
import { Picture } from "@/components/Picture";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Arrow } from "@/components/Logo";
import { categoryLabel, getProject, imageAlt, sortedProjects } from "@/content/projects";
import { projectImage } from "@/lib/images";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return sortedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projecten/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const img = projectImage(p.slug, p.hero);
  return pageMeta({
    title: p.location ? `${p.title}, ${p.location}` : p.title,
    description: p.description,
    path: `/projecten/${p.slug}/`,
    image: img.src,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projecten/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = sortedProjects.findIndex((x) => x.slug === p.slug);
  const hasOthers = sortedProjects.length > 1;
  const prev = hasOthers ? sortedProjects[(idx - 1 + sortedProjects.length) % sortedProjects.length] : null;
  const next = hasOthers ? sortedProjects[(idx + 1) % sortedProjects.length] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.description,
    image: `${site.url}${projectImage(p.slug, p.hero).src}`,
    creator: { "@type": "Organization", name: site.name, url: site.url },
    ...(p.location ? { locationCreated: { "@type": "Place", name: p.location } } : {}),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1 — Hero */}
      <div className="px-[var(--gutter)] md:px-0">
        <Picture
          slug={p.slug}
          id={p.hero}
          alt={imageAlt(p, p.hero)}
          sizes="100vw"
          priority
          ratio="none"
          className="aspect-[4/5] md:aspect-auto md:h-[calc(92svh-var(--header-h))] md:min-h-[480px]"
        />
      </div>

      {/* 2 — Titel en kerngegevens */}
      <header className="wrap pt-[clamp(3rem,7vw,7rem)] pb-[clamp(4rem,9vw,10rem)]">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-8" data-reveal>
            <p className="t-label text-grey mb-6">
              <Link href={`/projecten/${p.categories[0]}/`} className="link-line">{categoryLabel(p.categories[0])}</Link>
            </p>
            <h1 className="t-h1">{p.title}</h1>
          </div>
          <dl className="col-span-12 lg:col-span-3 lg:col-start-10 self-end grid grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-5 t-small" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <div>
              <dt className="t-label text-grey mb-1">Categorie</dt>
              <dd>{p.categories.map(categoryLabel).join(", ")}</dd>
            </div>
            {p.location ? (
              <div>
                <dt className="t-label text-grey mb-1">Locatie</dt>
                <dd>{p.location}</dd>
              </div>
            ) : null}
            {p.year ? (
              <div>
                <dt className="t-label text-grey mb-1">Jaar</dt>
                <dd>{p.year}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </header>

      {/* 3 — Fotogalerij */}
      <section aria-label="Fotogalerij" className="wrap">
        <ProjectGallery project={p} exclude={p.hero} />
      </section>

      {/* 4 — Korte omschrijving */}
      <section className="wrap py-[var(--section)]">
        <div className="grid-12 gap-y-8 border-t border-line pt-10">
          <h2 className="col-span-12 lg:col-span-3 t-label text-grey" data-reveal>Over dit project</h2>
          <div className="col-span-12 lg:col-span-7 lg:col-start-5" data-reveal>
            <p className="t-h3 text-pretty">{p.description}</p>
            {p.scope?.length ? (
              <p className="t-small text-grey mt-8">{p.scope.join(" · ")}</p>
            ) : null}
          </div>
        </div>
      </section>

      {/* 5 — Projectnavigatie */}
      <nav aria-label="Projectnavigatie" className="wrap pb-[var(--section)]">
        <div className="grid-12 gap-y-14 border-t border-ink pt-8">
          {prev && prev.slug !== p.slug ? (
            <Link href={`/projecten/${prev.slug}/`} className="group col-span-12 md:col-span-4 flex flex-col gap-2" rel="prev">
              <span className="t-label text-grey">Vorig project</span>
              <span className="t-h3">{prev.title}</span>
            </Link>
          ) : <span className="hidden md:block md:col-span-4" />}
          <div className="col-span-12 md:col-span-4 md:text-center order-last md:order-none">
            <Link href="/projecten/" className="arrow-link"><span className="label">Alle projecten</span><Arrow /></Link>
          </div>
          {next && next.slug !== p.slug ? (
            <Link href={`/projecten/${next.slug}/`} className="group col-span-12 md:col-span-4 flex flex-col gap-4 md:items-end md:text-right" rel="next">
              <span className="t-label text-grey">Volgend project</span>
              <span className="t-h3">{next.title}</span>
              <Picture
                slug={next.slug}
                id={next.cover}
                alt=""
                sizes="(min-width:768px) 33vw, 100vw"
                ratio="3 / 2"
                zoom
                className="mt-2"
              />
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}

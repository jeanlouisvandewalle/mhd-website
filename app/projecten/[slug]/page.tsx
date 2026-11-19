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
      <section className="theme-dark relative h-[calc(80svh-var(--header-h))] min-h-[520px] md:h-[calc(100svh-var(--header-h))] md:min-h-[600px] overflow-hidden">
        <Picture
          slug={p.slug}
          id={p.hero}
          alt={imageAlt(p, p.hero)}
          sizes="100vw"
          priority
          ratio="none"
          className="!absolute inset-0 h-full hero-shade hero-zoom"
        />
        {/* 2 — Titel */}
        <div className="relative z-10 h-full wrap flex flex-col justify-end pb-[clamp(2.5rem,5vw,5rem)]">
          <p className="t-label rule text-[#f2efe9]/80 mb-7">
            <Link href={`/projecten/${p.categories[0]}/`} className="link-line">{categoryLabel(p.categories[0])}</Link>
          </p>
          <h1 className="t-h1 t-caps !tracking-[0.07em] text-[#f2efe9] max-w-[18ch]">{p.title}</h1>
        </div>
      </section>

      {/* Kerngegevens */}
      <section className="theme-dark">
        <div className="wrap">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 border-t border-line py-10 md:py-12">
            <div>
              <dt className="t-label text-accent mb-2">Categorie</dt>
              <dd>{p.categories.map(categoryLabel).join(", ")}</dd>
            </div>
            {p.location ? (
              <div>
                <dt className="t-label text-accent mb-2">Locatie</dt>
                <dd>{p.location}</dd>
              </div>
            ) : null}
            {p.year ? (
              <div>
                <dt className="t-label text-accent mb-2">Jaar</dt>
                <dd>{p.year}</dd>
              </div>
            ) : null}
            {p.scope?.length ? (
              <div className="col-span-2 md:col-span-1 md:col-start-4">
                <dt className="t-label text-accent mb-2">Uitgevoerd</dt>
                <dd className="text-grey">{p.scope.join(", ")}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </section>

      {/* 3 — Fotogalerij */}
      <section aria-label="Fotogalerij" className="theme-light">
        <div className="wrap py-[clamp(4rem,9vw,10rem)]">
          <ProjectGallery project={p} exclude={p.hero} />
        </div>
      </section>

      {/* 4 — Korte omschrijving */}
      <section className="theme-kalk">
        <div className="wrap py-[var(--section)]">
          <div className="grid-12 gap-y-8">
            <h2 className="col-span-12 lg:col-span-3 t-label rule text-accent pt-3" data-reveal>Over dit project</h2>
            <p className="col-span-12 lg:col-span-7 lg:col-start-5 t-h2 text-pretty" data-reveal>{p.description}</p>
          </div>
        </div>
      </section>

      {/* 5 — Projectnavigatie */}
      <nav aria-label="Projectnavigatie" className="theme-dark">
        <div className="wrap pt-[clamp(4rem,8vw,8rem)]">
          <div className="grid-12 gap-y-14 items-end">
            {prev && prev.slug !== p.slug ? (
              <Link href={`/projecten/${prev.slug}/`} className="group col-span-12 md:col-span-4 flex flex-col gap-3" rel="prev">
                <span className="t-label text-accent">Vorig project</span>
                <span className="t-h3 t-caps !tracking-[0.12em]">{prev.title}</span>
              </Link>
            ) : <span className="hidden md:block md:col-span-4" />}
            <div className="col-span-12 md:col-span-4 md:text-center order-last md:order-none">
              <Link href="/projecten/" className="arrow-link"><span className="label">Alle projecten</span><Arrow /></Link>
            </div>
            {next && next.slug !== p.slug ? (
              <Link href={`/projecten/${next.slug}/`} className="group col-span-12 md:col-span-4 flex flex-col gap-4 md:items-end md:text-right" rel="next">
                <Picture
                  slug={next.slug}
                  id={next.cover}
                  alt=""
                  sizes="(min-width:768px) 33vw, 100vw"
                  ratio="3 / 2"
                  zoom
                  className="mb-3"
                />
                <span className="t-label text-accent">Volgend project</span>
                <span className="t-h3 t-caps !tracking-[0.12em]">{next.title}</span>
              </Link>
            ) : null}
          </div>
        </div>
      </nav>
    </article>
  );
}

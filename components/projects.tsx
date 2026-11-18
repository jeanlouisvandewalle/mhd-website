import Link from "next/link";
import { Picture } from "./Picture";
import { Arrow } from "./Logo";
import { projectImage } from "@/lib/images";
import { lightboxData } from "@/lib/lightbox";
import { ProjectTileLink } from "./LightboxTrigger";
import { categories, categoryLabel, imageAlt, type Category, type Project } from "@/content/projects";

type Slot = { cls: string; shape: "landscape" | "portrait" | "wide"; sizes: string };

/**
 * Asymmetrisch editorial grid. Het patroon herhaalt zich per zes projecten;
 * op mobiel wordt het één kolom, op tablet twee.
 */
const INDEX_PATTERN: Slot[] = [
  { cls: "md:col-span-12 lg:col-start-1 lg:col-span-7", shape: "landscape", sizes: "(min-width:1024px) 58vw, 100vw" },
  { cls: "md:col-span-6 lg:col-start-9 lg:col-span-4 lg:mt-[clamp(8rem,16vw,18rem)]", shape: "portrait", sizes: "(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" },
  { cls: "md:col-span-6 lg:col-start-2 lg:col-span-4", shape: "portrait", sizes: "(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" },
  { cls: "md:col-span-12 lg:col-start-7 lg:col-span-6 lg:mt-[clamp(6rem,12vw,14rem)]", shape: "landscape", sizes: "(min-width:1024px) 50vw, 100vw" },
  { cls: "md:col-span-12 lg:col-start-1 lg:col-span-12", shape: "wide", sizes: "100vw" },
  { cls: "md:col-span-6 md:col-start-4 lg:col-start-6 lg:col-span-5", shape: "portrait", sizes: "(min-width:1024px) 42vw, (min-width:768px) 50vw, 100vw" },
];

const HOME_PATTERN: Slot[] = [
  { cls: "md:col-span-12 lg:col-start-1 lg:col-span-8", shape: "landscape", sizes: "(min-width:1024px) 66vw, 100vw" },
  { cls: "md:col-span-6 lg:col-start-10 lg:col-span-3 lg:mt-[clamp(10rem,22vw,24rem)]", shape: "portrait", sizes: "(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw" },
  { cls: "md:col-span-6 lg:col-start-2 lg:col-span-4", shape: "portrait", sizes: "(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" },
  { cls: "md:col-span-12 lg:col-start-7 lg:col-span-6 lg:mt-[clamp(8rem,14vw,16rem)]", shape: "landscape", sizes: "(min-width:1024px) 50vw, 100vw" },
];

const NARROW_FALLBACK: Slot = {
  cls: "md:col-span-12 lg:col-start-4 lg:col-span-6",
  shape: "landscape",
  sizes: "(min-width:1024px) 50vw, 100vw",
};

const RATIO = { landscape: "3 / 2", portrait: "4 / 5", wide: "21 / 9" } as const;

export function ProjectGrid({ projects, layout = "index" }: { projects: Project[]; layout?: "index" | "home" }) {
  const pattern = layout === "home" ? HOME_PATTERN : INDEX_PATTERN;
  return (
    <ul className="grid-12 gap-y-[clamp(4rem,8vw,9rem)]">
      {projects.map((p, i) => {
        let slot = pattern[i % pattern.length];
        // Te kleine bronfoto voor een beeldvullende uitsnede? Dan een rustiger, smaller formaat.
        if (slot.shape === "wide" && projectImage(p.slug, p.cover).width < 1800) slot = NARROW_FALLBACK;
        return (
          <li key={p.slug} className={`col-span-12 ${slot.cls}`} data-reveal>
            <ProjectCard project={p} index={p.order} shape={slot.shape} sizes={slot.sizes} />
          </li>
        );
      })}
    </ul>
  );
}

export function ProjectCard({
  project: p,
  index,
  shape,
  sizes,
}: {
  project: Project;
  index: number;
  shape: Slot["shape"];
  sizes: string;
}) {
  const id = shape === "portrait" ? p.coverPortrait : p.cover;
  // Brede uitsnede is op mobiel te smal: daar valt ze terug op 3/2.
  const ratio = RATIO[shape];
  return (
    <ProjectTileLink
      href={`/projecten/${p.slug}/`}
      data={lightboxData(p, { link: true })}
      className="group block cursor-zoom-in"
      ariaLabel={`${p.title} — ${categoryLabel(p.categories[0])}: bekijk de foto's`}
    >
      <Picture
        slug={p.slug}
        id={id}
        alt={imageAlt(p, id)}
        sizes={sizes}
        ratio={ratio}
        zoom
        className={shape === "wide" ? "max-md:!aspect-[3/2]" : ""}
      />
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-[13px] leading-snug t-caps !tracking-[0.2em] font-semibold">{p.title}</h3>
          <p className="t-small text-grey mt-2">
            {categoryLabel(p.categories[0])}
            {p.location ? <span> · {p.location}</span> : null}
          </p>
        </div>
        <div className="flex items-center gap-4 pt-[1px] t-label text-accent t-num">
          <Arrow className="opacity-0 -translate-x-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0" />
          <span>{String(index).padStart(2, "0")}</span>
        </div>
      </div>
    </ProjectTileLink>
  );
}

/** Categoriefilters als tekstlinks — werken via echte routes. */
export function CategoryFilters({ active, counts }: { active: Category | "alle"; counts: Record<string, number> }) {
  const items = [{ slug: "alle", label: "Alle", href: "/projecten/" }, ...categories.map((c) => ({ slug: c.slug, label: c.label, href: `/projecten/${c.slug}/` }))];
  return (
    <nav aria-label="Filter projecten op categorie">
      <ul className="flex flex-wrap gap-x-10 gap-y-3 t-label">
        {items.map((it) => {
          const isActive = it.slug === active;
          return (
            <li key={it.slug}>
              <Link
                href={it.href}
                className={`link-line inline-flex items-baseline gap-1.5 py-2 ${isActive ? "is-active text-fg" : "text-grey hover:text-fg transition-colors duration-500"}`}
                aria-current={isActive ? "page" : undefined}
              >
                {it.label}
                <sup className="t-num text-[9px] tracking-normal text-accent">{counts[it.slug] ?? 0}</sup>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Verzorgde lege toestand voor een categorie zonder projecten. */
export function EmptyCategory({ label }: { label: string }) {
  return (
    <div className="grid-12 border-t border-line pt-12">
      <p className="col-span-12 md:col-span-6 t-lead text-grey">
        Binnenkort tonen we hier onze projecten in {label.toLowerCase()}.
      </p>
      <div className="col-span-12 md:col-span-4 md:col-start-9 mt-8 md:mt-0">
        <Link href="/projecten/" className="arrow-link"><span className="label">Bekijk alle projecten</span><Arrow /></Link>
      </div>
    </div>
  );
}

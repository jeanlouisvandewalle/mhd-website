import { CategoryFilters, EmptyCategory, ProjectGrid } from "./projects";
import { categories, projectsIn, sortedProjects, type Category } from "@/content/projects";

export function ProjectsIndex({ category }: { category?: Category }) {
  const list = category ? projectsIn(category) : sortedProjects;
  const cat = categories.find((c) => c.slug === category);
  const counts: Record<string, number> = { alle: sortedProjects.length };
  for (const c of categories) counts[c.slug] = projectsIn(c.slug).length;

  return (
    <>
      <section className="wrap pt-[clamp(4rem,10vw,10rem)] pb-[clamp(3rem,6vw,6rem)]">
        <div className="grid-12 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-8" data-reveal>
            <p className="t-label text-grey mb-6">{cat ? "Projecten" : "Portfolio"}</p>
            <h1 className="t-display">{cat ? cat.label : "Projecten"}</h1>
          </div>
          <p className="col-span-12 lg:col-span-4 t-lead text-grey lg:text-right" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            {cat ? cat.intro : "Een selectie van ons werk."}
          </p>
        </div>
        <div className="mt-[clamp(3rem,6vw,6rem)] pt-5 border-t border-line" data-reveal>
          <CategoryFilters active={category ?? "alle"} counts={counts} />
        </div>
      </section>

      <section className="wrap pb-[var(--section)]">
        {list.length ? <ProjectGrid projects={list} /> : <EmptyCategory label={cat?.label ?? ""} />}
      </section>
    </>
  );
}

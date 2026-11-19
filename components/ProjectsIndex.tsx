import { CategoryFilters, EmptyCategory, ProjectGrid } from "./projects";
import { categories, projectsIn, sortedProjects, type Category } from "@/content/projects";

export function ProjectsIndex({ category }: { category?: Category }) {
  const list = category ? projectsIn(category) : sortedProjects;
  const cat = categories.find((c) => c.slug === category);
  const counts: Record<string, number> = { alle: sortedProjects.length };
  for (const c of categories) counts[c.slug] = projectsIn(c.slug).length;

  return (
    <>
      {/* Opening op zwart */}
      <section className="theme-dark">
        <div className="wrap pt-[clamp(5rem,11vw,11rem)] pb-[clamp(2.5rem,4vw,4rem)]">
          <div className="grid-12 gap-y-10 items-end">
            <div className="col-span-12 lg:col-span-8" data-reveal>
              <p className="t-label rule text-accent mb-8">{cat ? "Projecten" : "Portfolio"}</p>
              <h1 className="t-display t-caps !tracking-[0.06em]">{cat ? cat.label : "Projecten"}</h1>
            </div>
          </div>
          <div className="mt-[clamp(4rem,7vw,7rem)] pt-6 border-t border-line" data-reveal>
            <CategoryFilters active={category ?? "alle"} counts={counts} />
          </div>
        </div>
      </section>

      <section className="theme-light">
        <div className="wrap pt-[clamp(4rem,8vw,8rem)] pb-[var(--section)]">
          {list.length ? <ProjectGrid projects={list} /> : <EmptyCategory label={cat?.label ?? ""} />}
        </div>
      </section>
    </>
  );
}

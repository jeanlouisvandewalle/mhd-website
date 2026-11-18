import { Picture } from "./Picture";
import { projectImage } from "@/lib/images";
import { lightboxData } from "@/lib/lightbox";
import { ZoomButton } from "./LightboxTrigger";
import type { Project, ProjectImage } from "@/content/projects";

type Img = ProjectImage & { portrait: boolean };
type Row =
  | { type: "full" | "inset-left" | "inset-right"; items: [Img] }
  | { type: "p-left" | "p-right"; items: [Img] }
  | { type: "pp-a" | "pp-b"; items: [Img, Img] }
  | { type: "lp"; items: [Img, Img] };

/**
 * Stelt automatisch een editorial galerij samen op basis van de beeldoriëntatie:
 * brede beelden, beeldparen, verticale details en bewuste witruimte wisselen elkaar af.
 * Nieuwe foto's toevoegen volstaat — de compositie past zich aan.
 */
function compose(images: Img[]): Row[] {
  const rows: Row[] = [];
  let i = 0;
  let n = 0;
  let landscapes = 0;
  let portraits = 0;
  while (i < images.length) {
    const a = images[i];
    const b = images[i + 1];
    if (!a.portrait && b?.portrait && n % 3 === 1) {
      rows.push({ type: "lp", items: [a, b] });
      i += 2;
    } else if (a.portrait && b?.portrait) {
      rows.push({ type: portraits++ % 2 ? "pp-b" : "pp-a", items: [a, b] });
      i += 2;
    } else if (!a.portrait) {
      const t = (["full", "inset-right", "inset-left"] as const)[landscapes++ % 3];
      rows.push({ type: t, items: [a] });
      i += 1;
    } else {
      rows.push({ type: portraits++ % 2 ? "p-right" : "p-left", items: [a] });
      i += 1;
    }
    n++;
  }
  return rows;
}

const S = {
  full: "100vw",
  wide: "(min-width:1024px) 75vw, 100vw",
  half: "(min-width:1024px) 50vw, (min-width:768px) 50vw, 100vw",
  third: "(min-width:1024px) 34vw, (min-width:768px) 50vw, 100vw",
};

export function ProjectGallery({ project, exclude }: { project: Project; exclude?: string }) {
  const imgs: Img[] = project.gallery
    .filter((g) => g.id !== exclude)
    .map((g) => ({ ...g, portrait: projectImage(project.slug, g.id).portrait }));
  const rows = compose(imgs);
  const lb = lightboxData(project);
  const pic = (img: Img, sizes: string) => (
    <ZoomButton data={lb} index={Math.max(0, lb.images.findIndex((x) => x.src === projectImage(project.slug, img.id).src))} label={img.alt}>
      <Picture slug={project.slug} id={img.id} alt={img.alt} sizes={sizes} focus={img.focus} zoom as="span" />
    </ZoomButton>
  );

  return (
    <div className="flex flex-col gap-[clamp(3.5rem,9vw,10rem)]">
      {rows.map((row, r) => {
        const key = `${r}-${row.items.map((x) => x.id).join("-")}`;
        switch (row.type) {
          case "full":
            return (
              <figure key={key} data-reveal>
                {pic(row.items[0], S.full)}
              </figure>
            );
          case "inset-right":
          case "inset-left":
            return (
              <div key={key} className="grid-12">
                <figure className={`col-span-12 ${row.type === "inset-right" ? "lg:col-start-4 lg:col-span-9" : "lg:col-start-1 lg:col-span-9"}`} data-reveal>
                  {pic(row.items[0], S.wide)}
                </figure>
              </div>
            );
          case "p-left":
          case "p-right":
            return (
              <div key={key} className="grid-12">
                <figure
                  className={`col-span-12 md:col-span-8 lg:col-span-5 ${row.type === "p-left" ? "md:col-start-2 lg:col-start-3" : "md:col-start-4 lg:col-start-7"}`}
                  data-reveal
                >
                  {pic(row.items[0], S.half)}
                </figure>
              </div>
            );
          case "pp-a":
            return (
              <div key={key} className="grid-12 gap-y-[clamp(3.5rem,9vw,10rem)] items-start">
                <figure className="col-span-12 md:col-span-6" data-reveal>{pic(row.items[0], S.half)}</figure>
                <figure className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9 md:mt-[clamp(6rem,18vw,20rem)]" data-reveal>
                  {pic(row.items[1], S.third)}
                </figure>
              </div>
            );
          case "pp-b":
            return (
              <div key={key} className="grid-12 gap-y-[clamp(3.5rem,9vw,10rem)] items-end">
                <figure className="col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-2" data-reveal>{pic(row.items[0], S.third)}</figure>
                <figure className="col-span-12 md:col-span-6 md:col-start-7" data-reveal>{pic(row.items[1], S.half)}</figure>
              </div>
            );
          case "lp":
            return (
              <div key={key} className="grid-12 gap-y-[clamp(3.5rem,9vw,10rem)] items-end">
                <figure className="col-span-12 lg:col-span-7" data-reveal>{pic(row.items[0], S.wide)}</figure>
                <figure className="col-span-12 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-9" data-reveal>{pic(row.items[1], S.third)}</figure>
              </div>
            );
        }
      })}
    </div>
  );
}

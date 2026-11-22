import manifest from "@/content/images.generated.json";
import { BASE_PATH } from "./basePath";

type Entry = { width: number; height: number; widths: number[] };
const data = manifest as Record<string, Record<string, Entry>>;

export type ImageSource = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  portrait: boolean;
};

/** Geeft src/srcSet/afmetingen terug voor een projectfoto (fotos/<slug>/<id>.jpg). */
export function projectImage(slug: string, id: string): ImageSource {
  const entry = data[slug]?.[id];
  if (!entry) throw new Error(`Afbeelding niet gevonden: ${slug}/${id} — voer 'npm run images' uit.`);
  const base = `${BASE_PATH}/images/projecten/${slug}/${id}`;
  const srcSet = entry.widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
  const mid = entry.widths.find((w) => w >= 1280) ?? entry.widths.at(-1)!;
  return {
    src: `${base}-${mid}.webp`,
    srcSet,
    width: entry.width,
    height: entry.height,
    portrait: entry.height > entry.width,
  };
}

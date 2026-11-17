/**
 * Zet de originele projectfoto's om naar geoptimaliseerde, responsive WebP-bestanden.
 *
 *   Bron:   fotos/<project-slug>/<NN>.jpg   (originelen, hoge resolutie)
 *   Uit:    public/images/projecten/<project-slug>/<NN>-<breedte>.webp
 *           content/images.generated.json   (afmetingen + beschikbare breedtes)
 *
 * Gebruik:  npm run images
 * Wordt ook automatisch uitgevoerd vóór `npm run build`. Reeds bestaande bestanden
 * worden overgeslagen; gebruik `npm run images -- --force` om alles opnieuw te maken.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
const SRC = path.join(ROOT, "fotos");
const OUT = path.join(ROOT, "public", "images", "projecten");
const MANIFEST = path.join(ROOT, "content", "images.generated.json");
const WIDTHS = [640, 1280, 1920, 2560];
const QUALITY = 78;
const force = process.argv.includes("--force");

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};

if (!fs.existsSync(SRC)) {
  console.log("Geen map 'fotos/' gevonden — bestaande afbeeldingen in public/ worden gebruikt.");
  process.exit(0);
}

let made = 0;
for (const slug of fs.readdirSync(SRC).sort()) {
  const dir = path.join(SRC, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f)).sort();
  const outDir = path.join(OUT, slug);
  fs.mkdirSync(outDir, { recursive: true });
  manifest[slug] = {};

  for (const file of files) {
    const id = path.parse(file).name;
    const input = sharp(path.join(dir, file)).rotate();
    const meta = await input.metadata();
    const portrait = (meta.orientation ?? 1) >= 5;
    const w = portrait ? meta.height : meta.width;
    const h = portrait ? meta.width : meta.height;
    const widths = WIDTHS.filter((x) => x < w);
    widths.push(Math.min(w, WIDTHS.at(-1)));
    const unique = [...new Set(widths)].sort((a, b) => a - b);

    for (const width of unique) {
      const target = path.join(outDir, `${id}-${width}.webp`);
      if (!force && fs.existsSync(target)) continue;
      await sharp(path.join(dir, file)).rotate().resize({ width }).webp({ quality: QUALITY, effort: 5 }).toFile(target);
      made++;
    }
    manifest[slug][id] = { width: w, height: h, widths: unique };
  }
}

fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + "\n");

// Open Graph-afbeelding (1200×630) op basis van de homepagehero.
const og = path.join(ROOT, "public", "og.jpg");
const ogSrc = path.join(SRC, "residentie-kalk-en-eik", "01.jpg");
if (fs.existsSync(ogSrc) && (force || !fs.existsSync(og))) {
  await sharp(ogSrc).rotate().resize(1200, 630, { fit: "cover" }).jpeg({ quality: 82, mozjpeg: true }).toFile(og);
}

console.log(`Afbeeldingen klaar — ${made} bestanden aangemaakt.`);

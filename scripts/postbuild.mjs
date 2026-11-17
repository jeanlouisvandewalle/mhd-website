/**
 * Na `next build` (statische export): Next.js schrijft de prefetch-segmenten als
 *   out/contact/__next.contact/__PAGE__.txt
 * terwijl de browser ze opvraagt als
 *   out/contact/__next.contact.__PAGE__.txt
 * Op een statische host (GitHub Pages, …) geeft dat 404's in de console.
 * Dit script maakt een platte kopie naast elke geneste versie.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..", "out");
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("__next.")) flatten(full, dir, entry.name);
      else walk(full);
    }
  }
}

function flatten(srcDir, parent, prefix) {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const full = path.join(srcDir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(full, parent, name);
    else {
      fs.copyFileSync(full, path.join(parent, name));
      copied++;
    }
  }
}

if (fs.existsSync(OUT)) {
  walk(OUT);
  console.log(`Postbuild: ${copied} prefetch-bestanden afgevlakt.`);
}

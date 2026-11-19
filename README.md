# MHD Totaalprojecten — website

Architecturale portfoliowebsite voor [totaalprojecten-mhd.be](https://totaalprojecten-mhd.be).
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · volledig statische export.

```bash
npm install
npm run dev        # ontwikkelserver op http://localhost:3000
npm run build      # afbeeldingen + statische site in out/
```

De map `out/` is een volledig statische website. Upload ze naar eender welke host
(GitHub Pages, Netlify, Cloudflare Pages, klassieke webhosting). Er is geen server nodig.

---

## 1. Designrichting

*Photography first. Design second. Words last.* Ingetogen, maar uitgesproken luxueus.

- **Kleur**: diep zwart `#0B0B0B` en warm kalkwit `#F2EFE9` vormen de basis. Het kalkwit, afgeleid van de
  kalkafwerking in de realisaties, vervangt overal het zuivere wit. Daarbij komt een fijn bronsaccent (`#84693F` op licht, `#C3A676` op donker)
  voor lijnen, nummers en labels.
- **Ritme**: secties wisselen tussen zwart en kalkwit (klassen `theme-dark`, `theme-light` en `theme-kalk`; licht en kalk zijn nu dezelfde kleur).
  Header en footer zijn altijd zwart.
- **Fotografie in originele kleuren** als bouwsteen van de layout. Hero's vullen het scherm, met een zachte verdonkering
  onderaan voor leesbare tekst.
- **12-koloms grid** met asymmetrische, editoriale composities. Op tablet worden het twee kolommen, op mobiel één.
- **Geen knoppen**: navigatie gebeurt via tekstlinks in kapitalen met een bronslijn en een pijl.
- **Rustige beweging**: hero's faden in vanuit zwart, elementen verschijnen zacht bij het scrollen,
  beelden zoomen licht in bij hover. Alles valt weg bij `prefers-reduced-motion`.

## 2. Lettertype

**Sweet Sans Pro**: dezelfde letterfamilie als het MHD-logo en de huidige website. Kapitalen met ruime spatiëring
(klasse `t-caps`, `t-label`) geven de typografische stem van het logo terug. Titels en lopende tekst staan in gewone
schrijfwijze.

Het lettertype wordt geladen via de bestaande **Adobe Fonts-kit van MHD** (`ytx6hpy`, zie `app/layout.tsx`).
Die licentie hoort bij het Adobe-account van MHD. Aandachtspunt bij livegang: de kit moet het productiedomein
toelaten. Dat is vandaag al zo voor totaalprojecten-mhd.be. Is de kit onbereikbaar, dan valt de site terug op
Helvetica Neue of Arial.

## 3. Projectstructuur

```
app/
  page.tsx                     Homepage
  projecten/page.tsx           Alle projecten
  projecten/interieur/         Categoriepagina's (ook exterieur/, totaalprojecten/)
  projecten/[slug]/page.tsx    Projectdetail (één pagina per project)
  over-ons/  contact/  privacy/
  (legacy)/                    Doorverwijzingen van de oude URL's (/interieur/, /realisaties/, /over-mhd/, …)
  sitemap.ts  robots.ts  icon.svg  not-found.tsx
  globals.css                  Designsystem (kleuren, typografie, grid, animaties)
components/                    Header, Footer, Picture, ProjectGrid, ProjectGallery, ContactForm, …
content/
  site.ts                      Bedrijfsgegevens (telefoon, e-mail, adres, formulier)
  projects.ts                  Alle projecten (centrale datastructuur)
  privacy.html                 Tekst van het privacybeleid
  images.generated.json        Automatisch gegenereerd (afmetingen van de foto's)
fotos/                         Originele foto's (hoge resolutie, niet in git)
public/images/projecten/       Geoptimaliseerde WebP-versies (gegenereerd)
scripts/images.mjs             Beeldoptimalisatie
scripts/postbuild.mjs          Kleine correctie voor de statische export
```

## 4. Waar staan de afbeeldingen?

| Wat | Waar |
|---|---|
| Originelen (hoge resolutie) | `fotos/<project-slug>/01.jpg`, `02.jpg`, … |
| Geoptimaliseerd voor het web | `public/images/projecten/<project-slug>/<nr>-<breedte>.webp` (640, 1280, 1920 en 2560 px) |
| Open Graph-beeld | `public/og.jpg` (gegenereerd uit de homepagehero) |
| Logo | `components/Logo.tsx` en `public/logo.svg` (het bestaande MHD-logo als vector) |

`npm run images` zet nieuwe of gewijzigde originelen om. Dat gebeurt ook automatisch bij `npm run build`.
De map `fotos/` staat niet in git (te groot), maar wel in OneDrive. De gegenereerde WebP-bestanden staan wel in git,
zodat de site ook zonder de originelen gebouwd kan worden.

## 5. Een nieuw project toevoegen

1. Maak een map `fotos/<slug>/`, bijvoorbeeld `fotos/keuken-brugge/`.
2. Zet de foto's erin als `01.jpg`, `02.jpg`, … De volgorde is de volgorde in de galerij.
3. Voer `npm run images` uit.
4. Voeg in `content/projects.ts` een object toe aan `projects`:

```ts
{
  id: 7,
  slug: "keuken-brugge",
  title: "Keuken",
  categories: ["interieur"],          // eerste = hoofdcategorie
  location: "Brugge",                  // optioneel
  year: 2026,                          // optioneel
  description: "Twee à drie zinnen.",
  hero: "01",                          // groot beeld bovenaan (liggend)
  cover: "01",                         // liggende coverfoto in de grids
  coverPortrait: "03",                 // staande coverfoto in de grids
  order: 7,                            // volgorde in de lijsten
  featured: false,                     // true = op de homepage
  scope: ["Keuken", "Maatkasten"],     // optioneel: uitgevoerde werken
  gallery: [
    { id: "01", alt: "Korte, feitelijke beschrijving van het beeld" },
    { id: "02", alt: "…", focus: "50% 30%" },   // optioneel focuspunt voor uitsneden
  ],
},
```

De galerij op de projectpagina stelt zich automatisch samen op basis van staande en liggende foto's.
De categoriefilters, de sitemap en de vorige/volgende-navigatie passen zich ook vanzelf aan.

## 6. Een foto vervangen

Vervang het bestand in `fotos/<slug>/` en behoud de bestandsnaam (bv. `03.jpg`). Voer daarna
`npm run images -- --force` uit. Wil je de volgorde wijzigen, hernoem dan de bestanden of pas `hero`, `cover`
en `gallery` aan in `content/projects.ts`.

**CMS later**: elk veld in `Project` is een gewoon CMS-veld. Bij een koppeling met Sanity of Payload
vervang je `content/projects.ts` door een fetch tijdens de build. De componenten blijven ongewijzigd.

## 7. Wat ontbreekt nog voor publicatie

**Te bevestigen door MHD**
- [ ] **Projecttitels en omschrijvingen.** Ze zijn neutraal geformuleerd op basis van wat op de foto's te zien is.
      Laat MHD ze nalezen.
- [ ] **Locaties.** *Kortrijk* en *Nieuwpoort* komen uit de bestandsnamen van de foto's. Zijn ze correct, en mogen ze getoond worden?
- [ ] **Jaartallen.** Die zijn niet bekend en worden daarom niet getoond. Je kan ze toevoegen via `year`.
- [ ] **Fotorechten en credits.** De bestanden van project 1 heten `HR_Sophie De Bel-*.jpg`. Ga na of dit een fotograaf is
      en of een vermelding gewenst is.
- [x] **Ondernemingsnummer.** BE 0500.534.549 staat in de footer en in de structured data. Je past het aan in `content/site.ts`.
- [ ] **Teamfoto, atelierfoto's, beelden van het werkproces** voor de pagina Over ons. Daar staan nu detailbeelden uit projecten.

**Technisch**
- [ ] **Domein en DNS.** Bij hosting op GitHub Pages voeg je een bestand `public/CNAME` toe met `totaalprojecten-mhd.be`.
- [ ] **Privacybeleid.** Dit is de tekst van de huidige site (2018). Vermeld daarin FormSubmit als verwerker van formuliergegevens,
      of dat van de verzenddienst die je kiest.

## 8. Contactformulier

Het formulier verstuurt via **[FormSubmit](https://formsubmit.co)** naar `info@totaalprojecten-mhd.be`. Dat is gratis en vraagt
geen server.

- **Activatie**: de eerste inzending stuurt een activatiemail naar info@totaalprojecten-mhd.be. Bevestig die één keer.
  Tot dan toont het formulier een foutmelding met het e-mailadres als alternatief.
- **Andere dienst** (Formspree, Web3Forms, een eigen endpoint): stel `NEXT_PUBLIC_FORM_ENDPOINT` in vóór de build,
  of pas `formEndpoint` aan in `content/site.ts`. Het endpoint moet JSON aannemen en `{ "success": true }` teruggeven.
- **Validatie**: naam, e-mail en bericht zijn verplicht. Het telefoonnummer wordt alleen gecontroleerd als het is ingevuld.
- **Spam**: een onzichtbaar honeypotveld, plus een minimale invultijd van 2,5 seconden.
- **Eerlijkheid**: de succesmelding verschijnt enkel wanneer de dienst de verzending bevestigt.

---

## Status

**Productieklaar**
- Alle routes en de navigatie (desktop-dropdown, mobiel menu, footer)
- Projectoverzicht, categoriefilters via echte routes, projectdetail met galerij en vorige/volgende
- Responsive op desktop, tablet en mobiel; geen horizontale scroll
- SEO: unieke titels en beschrijvingen, canonical URL's, Open Graph, sitemap.xml, robots.txt,
  JSON-LD (bedrijf en projecten), `lang="nl-BE"`
- Toegankelijkheid: semantische HTML, skiplink, zichtbare focus, alt-teksten, formulierlabels en foutmeldingen,
  `prefers-reduced-motion`
- Performance: responsive WebP via `srcset`, lazy loading, hero met voorrang, geen externe scripts (enkel de Adobe Fonts-stylesheet)
- Doorverwijzingen van de oude URL's van de vorige site

**Tijdelijke of te bevestigen content**: zie punt 7.

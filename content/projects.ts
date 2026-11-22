/**
 * PROJECTEN — centrale datastructuur.
 *
 * Een project toevoegen:
 *   1. Zet de originele foto's in  fotos/<slug>/01.jpg, 02.jpg, …  (volgorde = galerijvolgorde)
 *   2. Voer `npm run images` uit (maakt de WebP-versies + afmetingen aan)
 *   3. Voeg hieronder een object toe aan `projects`
 *
 * De structuur is bewust "plat" gehouden, zodat ze later 1-op-1 naar een CMS
 * (Sanity, Payload, …) kan worden overgezet: elk veld hieronder wordt dan een CMS-veld.
 */

export type Category = "interieur" | "exterieur" | "totaalprojecten";

export const categories: { slug: Category; label: string; intro: string }[] = [
  { slug: "interieur", label: "Interieur", intro: "Maatwerk voor iedere ruimte." },
  { slug: "exterieur", label: "Exterieur", intro: "Doordachte oplossingen voor buiten." },
  { slug: "totaalprojecten", label: "Totaalprojecten", intro: "Van eerste idee tot laatste detail." },
];

export type ProjectImage = {
  /** Bestandsnaam zonder extensie in fotos/<slug>/ (bv. "01") */
  id: string;
  alt: string;
  /** Optioneel focuspunt voor uitsneden, als CSS object-position (bv. "50% 30%") */
  focus?: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  /** Eerste categorie = hoofdcategorie (wordt als label getoond) */
  categories: Category[];
  description: string;
  /** Beeld bovenaan de projectpagina (liggend) */
  hero: string;
  /** Liggende en staande coverfoto voor de overzichtsgrids */
  cover: string;
  coverPortrait: string;
  gallery: ProjectImage[];
  order: number;
  featured: boolean;
  /** Het project dat als "Geselecteerd project" op de homepage staat (slechts één) */
  spotlight?: boolean;
  location?: string;
  year?: number;
  scope?: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "residentie-kalk-en-eik",
    title: "Residentie in kalk en eik",
    categories: ["interieur"],
    description:
      "Een volledige binnenafwerking in maatwerk: keuken, kastenwanden, slaapkamers en kinderkamer. Greeploze volumes in kalkafwerking, gecombineerd met eiken fronten en grepen.",
    hero: "01",
    cover: "05",
    coverPortrait: "03",
    order: 1,
    featured: true,
    spotlight: true,
    scope: ["Keuken", "Maatkasten", "Slaapkamers", "Kinderkamer"],
    gallery: [
      { id: "01", alt: "Leefruimte met keuken, eettafel en zithoek in kalk en eik" },
      { id: "02", alt: "Gang met kamerhoge, greeploze maatkasten" },
      { id: "03", alt: "Afgeronde kastwand in kalkafwerking" },
      { id: "04", alt: "Eiken kastdeuren met houten grepen" },
      { id: "05", alt: "Keukeneiland met zitbank en eettafel" },
      { id: "06", alt: "Keuken met eiken fronten en natuurstenen werkblad" },
      { id: "07", alt: "Kastenwand met geïntegreerde oven" },
      { id: "08", alt: "Keuken met inbouwtoestellen en open schappen" },
      { id: "09", alt: "Slaapkamer met maatwerk hoofdbord en bovenkasten" },
      { id: "10", alt: "Slaapkamer met tv-meubel op maat" },
      { id: "11", alt: "Stapelbed in eiken" },
      { id: "12", alt: "Kinderkamer met stapelbed en kleerkast" },
    ],
  },
  {
    id: 2,
    slug: "uitbouw-leefruimte",
    title: "Uitbouw en leefruimte",
    categories: ["totaalprojecten", "exterieur", "interieur"],
    description:
      "Een uitbouw waarin binnen en buiten op elkaar aansluiten. Gevelbekleding, keuken in zwart eiken, eiken wandbekleding en maatkasten als één geheel.",
    hero: "02",
    cover: "01",
    coverPortrait: "06",
    order: 2,
    featured: true,
    scope: ["Uitbouw", "Gevelbekleding", "Keuken", "Wandbekleding", "Maatkasten"],
    gallery: [
      { id: "01", alt: "Eethoek in de uitbouw met eiken wandbekleding" },
      { id: "02", alt: "Zicht van buitenaf op de nieuwe leefruimte" },
      { id: "03", alt: "Keuken in zwart eiken met natuurstenen werkblad" },
      { id: "04", alt: "Zwarte keukenkast met open nissen" },
      { id: "05", alt: "Zwarte buitendeur in de nieuwe gevel" },
      { id: "06", alt: "Gevel met zwarte bekleding en glaspartij" },
      { id: "07", alt: "Tv-wand met open kasten" },
      { id: "08", alt: "Bar met ribbelfront tegen de eiken wand" },
      { id: "09", alt: "Haard tegen de eiken wandbekleding" },
      { id: "10", alt: "Keuken met bar in zwart eiken" },
      { id: "11", alt: "Natuurstenen werkblad tegen de eiken wand" },
      { id: "12", alt: "Detail van spoelbak en kraan" },
      { id: "13", alt: "Detail van een kastfront in zwart eiken" },
    ],
  },
  {
    id: 3,
    slug: "poolhouse-kortrijk",
    title: "Poolhouse",
    categories: ["exterieur", "totaalprojecten"],
    location: "Kortrijk",
    description:
      "Een poolhouse met houten gevelbekleding en grote glaspartijen. Binnen een eiken wand en een bar met zwart werkblad.",
    hero: "01",
    cover: "03",
    coverPortrait: "07",
    order: 3,
    featured: true,
    scope: ["Poolhouse", "Gevelbekleding", "Binnenafwerking", "Bar"],
    gallery: [
      { id: "01", alt: "Poolhouse met houten gevelbekleding aan het zwembad" },
      { id: "02", alt: "Binnenruimte van de poolhouse met eiken wand" },
      { id: "03", alt: "Poolhouse en zwembad" },
      { id: "04", alt: "Bar met zwart werkblad en hanglampen" },
      { id: "05", alt: "Overdekt terras van de poolhouse" },
      { id: "06", alt: "Zithoek in de poolhouse" },
      { id: "07", alt: "Binnenruimte met bar en eiken wandbekleding" },
      { id: "08", alt: "Zwembad met de poolhouse op de achtergrond" },
    ],
  },
  {
    id: 4,
    slug: "appartement-nieuwpoort",
    title: "Appartement",
    categories: ["interieur"],
    location: "Nieuwpoort",
    description:
      "Keuken, schuifwanden en kastenwanden in licht eiken, gecombineerd met terrazzo. Toestellen en opbergruimte zijn volledig geïntegreerd.",
    hero: "01",
    cover: "01",
    coverPortrait: "02",
    order: 4,
    featured: true,
    scope: ["Keuken", "Schuifwanden", "Kastenwanden"],
    gallery: [
      { id: "01", alt: "Leefruimte met keuken en open kasten" },
      { id: "02", alt: "Keuken in licht eiken achter een glazen wand" },
      { id: "03", alt: "Werkblad in terrazzo met eiken fronten" },
      { id: "04", alt: "Keuken met terrazzo en eiken bovenkasten" },
      { id: "05", alt: "Witte schuifwand op maat" },
      { id: "06", alt: "Detail van eiken front en terrazzo" },
      { id: "07", alt: "Kastenwand met verlichte open nis" },
      { id: "08", alt: "Open nis met verlichting en terrazzo" },
      { id: "09", alt: "Keukenlade met ingebouwde afvalbakken" },
    ],
  },
  {
    id: 5,
    slug: "maatkasten-bureau",
    title: "Maatkasten en bureau",
    categories: ["interieur"],
    description:
      "Kamerhoge kastenwanden met ingefreesde grepen, doorgetrokken tot een bureau op maat.",
    hero: "01",
    cover: "01",
    coverPortrait: "02",
    order: 5,
    featured: false,
    scope: ["Kastenwanden", "Bureau"],
    gallery: [
      { id: "01", alt: "Bureau op maat naast een kastenwand" },
      { id: "02", alt: "Kamerhoge kastenwand in een slaapkamer" },
      { id: "03", alt: "Detail van een ingefreesde greep" },
      { id: "04", alt: "Kastenwand met open kast en bureau" },
      { id: "05", alt: "Kastenwand naast het raam" },
      { id: "06", alt: "Detail van een greep" },
      { id: "07", alt: "Bureau op maat" },
      { id: "08", alt: "Kastdeuren met verticale grepen" },
    ],
  },
  {
    id: 6,
    slug: "horeca-interieur",
    title: "Horeca-interieur",
    categories: ["interieur"],
    description:
      "Toog, achterbuffet, wandbekleding en vaste zitbanken voor een café. Gemaakt voor intensief dagelijks gebruik.",
    hero: "01",
    cover: "01",
    coverPortrait: "07",
    order: 6,
    featured: false,
    scope: ["Toog", "Achterbuffet", "Wandbekleding", "Zitbanken"],
    gallery: [
      { id: "01", alt: "Toog met verlicht achterbuffet" },
      { id: "02", alt: "Lange toog met barkrukken" },
      { id: "03", alt: "Zithoek met wandbekleding" },
      { id: "04", alt: "Detail van de toog" },
      { id: "05", alt: "Café-interieur met toog" },
      { id: "06", alt: "Zicht over de volledige zaak" },
      { id: "07", alt: "Vaste zitbank met wandverlichting" },
    ],
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectsIn = (cat: Category) => sortedProjects.filter((p) => p.categories.includes(cat));

export const categoryLabel = (cat: Category) => categories.find((c) => c.slug === cat)!.label;

export const imageAlt = (p: Project, id: string) => p.gallery.find((g) => g.id === id)?.alt ?? p.title;

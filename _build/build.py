"""Genereert alle pagina's van de MHD-website.

Gebruik:  python _build/build.py
Teksten, projecten en pagina's pas je hier aan; daarna opnieuw uitvoeren.
Mappen met een underscore worden niet gepubliceerd door GitHub Pages.
"""
import json
import os
from html import escape

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
DOMAIN = "https://totaalprojecten-mhd.be"

PHONE = "0475 26 73 31"
PHONE_LINK = "tel:+32475267331"
EMAIL = "info@totaalprojecten-mhd.be"
ADDRESS = ("Zandstraat 8", "8870 Izegem")
MAPS = "https://goo.gl/maps/Yra4PKhXhCvD6VE38"
# Formulierdienst voor de statische site. Eerste inzending stuurt een activatiemail naar dit adres.
FORM_ENDPOINT = "https://formsubmit.co/ajax/" + EMAIL

# ---------------------------------------------------------------- projecten
PROJECTS = [
    {
        "slug": "uitbouw-leefruimte",
        "cover": 5,
        "title": "Uitbouw & leefruimte",
        "location": "West-Vlaanderen",
        "cats": ["totaalconcept", "interieur", "exterieur"],
        "tags": "Totaalconcept · Interieur · Exterieur",
        "text": "Een uitbouw die binnen en buiten laat samenvallen. Van de zwarte gevelbekleding tot de keuken in zwart eiken, de wandbekleding in massieve eik en de haardpartij: alles werd door MHD ontworpen, gemaakt en geplaatst.",
        "specs": [["Opdracht", "Uitbouw, keuken, wandbekleding, kasten"], ["Materiaal", "Gerookt & natuurlijk eiken, natuursteen"], ["Aanpak", "Ontwerp tot plaatsing"]],
    },
    {
        "slug": "poolhouse-kortrijk",
        "title": "Poolhouse Kortrijk",
        "location": "Kortrijk",
        "cats": ["exterieur", "totaalconcept"],
        "tags": "Exterieur · Totaalconcept",
        "text": "Een poolhouse als verlengstuk van de tuin. Houten gevelbekleding en grote glaspartijen buiten, een warme eiken wand en een bar met zwart blad binnen. Robuust, onderhoudsarm en strak gedetailleerd.",
        "specs": [["Opdracht", "Poolhouse, gevelbekleding, binneninrichting"], ["Materiaal", "Hout, eiken wandbekleding"], ["Aanpak", "Totaalproject"]],
    },
    {
        "slug": "appartement-leem-en-eik",
        "title": "Residentie in kalk & eik",
        "location": "West-Vlaanderen",
        "cats": ["interieur", "totaalconcept"],
        "tags": "Interieur · Totaalconcept",
        "text": "Een volledige binnenhuisinrichting waarin keuken, leefruimte en slaapkamers als één geheel zijn ontworpen. Greeploze kalkvolumes, warme eiken accenten en een afgeronde kastwand geven rust tot in elke hoek.",
        "specs": [["Opdracht", "Keuken, living, slaapkamers, maatkasten"], ["Materiaal", "Eiken, kalkafwerking, natuursteen"], ["Aanpak", "Totaalinrichting"]],
    },
    {
        "slug": "appartement-nieuwpoort",
        "title": "Appartement Nieuwpoort",
        "location": "Nieuwpoort",
        "cats": ["interieur"],
        "tags": "Interieur",
        "text": "Licht eiken en terrazzo voor een appartement aan zee. Een keuken met verdoken toestellen, schuifwanden en open nissen die het licht vangen. Elk paneel en elke voeg loopt door.",
        "specs": [["Opdracht", "Keuken, schuifwanden, kastenwand"], ["Materiaal", "Licht eiken, terrazzo"], ["Aanpak", "Interieur op maat"]],
    },
    {
        "slug": "horeca-interieur-cafe",
        "title": "Horeca-interieur",
        "location": "",
        "cats": ["interieur"],
        "tags": "Interieur · Horeca",
        "text": "Een café met karakter: een lange toog met lambrisering, achterbuffet met verlichte nissen, wandkasten en vaste zitbanken. Gebouwd om dagelijks intens gebruikt te worden en mooi te blijven.",
        "specs": [["Opdracht", "Toog, achterbuffet, wandbekleding, zitbanken"], ["Materiaal", "Eiken, gelakt plaatmateriaal"], ["Aanpak", "Horeca-inrichting"]],
    },
    {
        "slug": "maatkasten-slaapkamer-bureau",
        "title": "Maatkasten & bureau",
        "location": "",
        "cats": ["interieur"],
        "tags": "Interieur",
        "text": "Kamerhoge kastenwanden met ingefreesde grepen in eik, naadloos doorgetrokken tot een geïntegreerd bureau. Minimalistisch in uitzicht, doordacht in gebruik.",
        "specs": [["Opdracht", "Kastenwanden, bureau, open kast"], ["Materiaal", "Gelakt paneel, eiken accenten"], ["Aanpak", "Maatwerk"]],
    },
]
manifest = json.load(open(os.path.join(SITE, "assets/img/projecten/manifest.json"), encoding="utf-8"))
for i, p in enumerate(PROJECTS, 1):
    p["no"] = f"{i:02d}"
    p["images"] = manifest[p["slug"]]


def img(slug, n, small=False):
    return f"assets/img/projecten/{slug}/{n:02d}{'-s' if small else ''}.webp"


# ---------------------------------------------------------------- bouwstenen
LOGO = """<svg viewBox="0 0 141.24 54.18" aria-hidden="true" fill="currentColor"><path d="M34.14,54.18V27.54h-.3l-13.02,21.96h-1.08L6.72,27.54h-.3v26.64H0V15H6.9l13.62,23.1h.12l13.62-23.1h6.6V54.18h-6.72Z"/><path d="M54.42,39.18V0h6.72V14.82h21.3V0h6.72V39.18h-6.72V20.82h-21.3v18.36h-6.72Z"/><path d="M102.72,54.18V15h18.78c7.08,0,11.04,1.98,14.4,5.22,3.48,3.6,5.34,8.64,5.34,14.34s-2.04,11.22-5.76,14.82c-3.36,3-6.9,4.8-13.98,4.8h-18.78Zm18.48-6c4.98,0,6.66-1.14,9-3.06,2.52-2.52,4.02-6.36,4.02-10.56s-1.32-7.74-3.78-10.26c-2.22-2.04-4.32-3.3-9.24-3.3h-11.76v27.18h11.76Z"/></svg>"""
ARROW = '<svg viewBox="0 0 24 12" fill="none" stroke="currentColor" stroke-width="1"><path d="M0 6h23M18 1l5 5-5 5"/></svg>'

NAV = [
    ("interieur", "Interieur"),
    ("exterieur", "Exterieur"),
    ("totaalconcept", "Totaalconcept"),
    ("realisaties", "Realisaties"),
    ("over-mhd", "Over MHD"),
]


def header(r, active):
    cur = ' aria-current="page"'
    links = "".join(f'<a href="{r}{slug}/"{cur if slug == active else ""}>{label}</a>' for slug, label in NAV)
    return f"""<header class="site-header">
  <div class="wrap">
    <a class="logo" href="{r or './'}" aria-label="MHD Totaalprojecten — home">{LOGO}<small>Schrijnwerk<br>&amp; totaalprojecten</small></a>
    <nav class="nav" id="nav" aria-label="Hoofdmenu">{links}<a class="btn btn--ghost" href="{r}contact/"{cur if active == "contact" else ""}>Contact</a></nav>
    <button class="burger" aria-label="Menu" aria-controls="nav" aria-expanded="false"><span></span><span></span></button>
  </div>
</header>"""


def footer(r):
    return f"""<footer class="site-footer">
  <div class="wrap">
    <div class="footer__top">
      <div class="footer__brand">{LOGO}
        <p>MHD maakt schrijnwerk voor binnen en buiten. U kan bij ons ook terecht voor totaalconcepten op het gebied van interieur en exterieur. Vanuit ons eigen atelier in Izegem.</p>
      </div>
      <div><h4>Sitemap</h4><ul>
        <li><a href="{r or './'}">Home</a></li>
        {"".join(f'<li><a href="{r}{s}/">{l}</a></li>' for s, l in NAV)}
        <li><a href="{r}contact/">Contact</a></li></ul></div>
      <div><h4>Contact</h4><ul>
        <li><a href="{PHONE_LINK}">{PHONE}</a></li>
        <li><a href="mailto:{EMAIL}">{EMAIL}</a></li></ul></div>
      <div><h4>Atelier</h4><ul>
        <li><a href="{MAPS}" target="_blank" rel="noopener">{ADDRESS[0]}<br>{ADDRESS[1]}</a></li></ul></div>
    </div>
    <div class="footer__big" aria-hidden="true">Maatwerk in hout</div>
    <div class="footer__bottom"><span>© 2026 MHD Totaalprojecten. Alle rechten voorbehouden.</span><a href="{r}privacy-beleid/">Privacybeleid</a></div>
  </div>
</footer>"""


def page(path, title, desc, body, active="", og_image=None, out=None):
    depth = 0 if path == "" else path.strip("/").count("/") + 1
    r = "../" * depth
    og = f"{DOMAIN}/{og_image}" if og_image else f"{DOMAIN}/{img('uitbouw-leefruimte', 1)}"
    projects_js = f"<script>window.MHD_PROJECTS={json.dumps(PROJECTS, ensure_ascii=False)};</script>" if "data-project" in body else ""
    html = f"""<!doctype html>
<html lang="nl-BE" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{escape(title)}</title>
<meta name="description" content="{escape(desc)}">
<link rel="canonical" href="{DOMAIN}/{path}">
<meta property="og:type" content="website">
<meta property="og:title" content="{escape(title)}">
<meta property="og:description" content="{escape(desc)}">
<meta property="og:image" content="{og}">
<meta name="theme-color" content="#0e0d0c">
<link rel="icon" href="{r}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{r}assets/css/style.css">
</head>
<body data-root="{r}">
<a class="skip" href="#main">Ga naar de inhoud</a>
{header(r, active)}
<main id="main">
{body.replace("{r}", r)}
</main>
{footer(r)}
{projects_js}
<script src="{r}assets/js/main.js" defer></script>
</body>
</html>
"""
    out = out or (os.path.join(SITE, path, "index.html") if path else os.path.join(SITE, "index.html"))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, "w", encoding="utf-8").write(html)


def page_hero(eyebrow, title, lead, image=None, short=False):
    media = f'<div class="hero__media"><img src="{{r}}{image}" alt="" fetchpriority="high"></div>' if image else ""
    return f"""<section class="page-hero{' page-hero--short' if short else ''}">
  {media}
  <div class="wrap">
    <span class="eyebrow reveal">{eyebrow}</span>
    <h1 class="reveal">{title}</h1>
    {f'<p class="lead reveal">{lead}</p>' if lead else ''}
  </div>
</section>"""


def project_cards(projects):
    out = []
    for p in projects:
        loc = f" · {p['location']}" if p["location"] else ""
        out.append(f"""<button class="project reveal" data-project="{p['slug']}" data-cats="{' '.join(p['cats'])}" aria-label="Bekijk project {escape(p['title'])}">
  <div class="project__img"><img src="{{r}}{img(p['slug'], p.get('cover', 1), True)}" alt="{escape(p['title'])}" loading="lazy" width="900" height="675"></div>
  <div class="project__meta"><div><h3>{escape(p['title'])}</h3><div class="project__tags">{p['tags']}{loc}</div></div><span class="num">{p['no']} — {len(p['images']):02d} foto's</span></div>
</button>""")
    return '<div class="projects">' + "\n".join(out) + "</div>"


def cta(dark=False):
    return f"""<section class="section cta{' dark' if dark else ' paper'}">
  <div class="wrap">
    <span class="eyebrow reveal">Maak je houtdromen waar</span>
    <h2 class="reveal">Laten we samen iets <span class="it">blijvends</span> bouwen.</h2>
    <p class="lead reveal">Een kast op maat, een volledige keuken, een poolhouse of een totaalproject. Vertel ons wat u voor ogen heeft — we denken graag mee.</p>
    <div class="cta__actions reveal"><a class="btn {'btn--solid' if dark else 'btn--ink'}" href="{{r}}contact/">Neem contact op {ARROW}</a><a class="btn" href="{PHONE_LINK}">{PHONE}</a></div>
  </div>
</section>"""


def by_cat(cat):
    return [p for p in PROJECTS if cat in p["cats"]]


# ---------------------------------------------------------------- home
home = f"""
<section class="hero">
  <div class="hero__media"><img src="{{r}}{img('uitbouw-leefruimte', 1)}" alt="Leefruimte met eiken wandbekleding en zwart eiken keuken door MHD" fetchpriority="high"></div>
  <div class="wrap">
    <div class="hero__grid">
      <div>
        <span class="eyebrow reveal">Atelier in Izegem · Drie generaties</span>
        <h1 class="reveal">Schrijnwerk van de <span class="it">bovenste</span> plank</h1>
        <div class="hero__actions reveal"><a class="btn btn--solid" href="{{r}}realisaties/">Ontdek onze realisaties {ARROW}</a><a class="btn btn--ghost" href="{{r}}contact/">Neem contact op</a></div>
      </div>
      <div class="hero__side reveal"><p><b>Maatwerk om op te bouwen.</b> Droom je van een kast op maat, een unieke eettafel of een volledig interieur? Wij maken er werk van.</p></div>
    </div>
  </div>
  <div class="hero__scroll" aria-hidden="true">Scroll</div>
</section>

<section class="section">
  <div class="wrap">
    <div class="intro">
      <div class="intro__statement">
        <span class="eyebrow reveal">Over MHD</span>
        <h2 class="reveal">Hout zit in ons <span class="it">DNA.</span> Al drie generaties.</h2>
      </div>
      <div class="intro__body">
        <p class="lead reveal">MHD is een jong en dynamisch familiebedrijf dat vakmanschap en professionaliteit voorop zet. In ons eigen atelier in Izegem transformeren we uw favoriete houtsoort in een interieur of buitenomgeving dat generaties meegaat.</p>
        <a class="link reveal" href="{{r}}over-mhd/">Ons verhaal {ARROW}</a>
        <div class="intro__media">
          <img class="reveal-img" src="{{r}}{img('appartement-leem-en-eik', 3, True)}" alt="Keuken in kalk en eiken" loading="lazy">
          <img class="reveal-img" src="{{r}}{img('maatkasten-slaapkamer-bureau', 5, True)}" alt="Detail van een ingefreesde eiken greep" loading="lazy">
        </div>
      </div>
    </div>
    <div class="stats">
      <div class="stat reveal"><b>3</b><span>Generaties vakmanschap</span></div>
      <div class="stat reveal"><b>9</b><span>Vakmensen in eigen team</span></div>
      <div class="stat reveal"><b>100%</b><span>Ontwerp op maat</span></div>
      <div class="stat reveal"><b>1</b><span>Aanspreekpunt van atelier tot werf</span></div>
    </div>
  </div>
</section>

<section class="dark">
  <div class="disciplines">
    <a class="discipline" href="{{r}}interieur/">
      <img src="{{r}}{img('appartement-nieuwpoort', 2, True)}" alt="" loading="lazy">
      <div class="discipline__body"><span class="num">01</span><h3>Interieur</h3><p>Maatkasten, keukens, wanden, deuren, toonbanken, meubels en parket — uitgevoerd met precisie en een uitzonderlijke afwerking.</p><span class="link">Ontdek {ARROW}</span></div>
    </a>
    <a class="discipline" href="{{r}}exterieur/">
      <img src="{{r}}{img('poolhouse-kortrijk', 2, True)}" alt="" loading="lazy">
      <div class="discipline__body"><span class="num">02</span><h3>Exterieur</h3><p>Ramen, deuren, gevelbekleding, terrassen en bijgebouwen in robuust hardhout dat de architectuur versterkt.</p><span class="link">Ontdek {ARROW}</span></div>
    </a>
    <a class="discipline" href="{{r}}totaalconcept/">
      <img src="{{r}}{img('uitbouw-leefruimte', 6, True)}" alt="" loading="lazy">
      <div class="discipline__body"><span class="num">03</span><h3>Totaalconcept</h3><p>Van eerste schets tot oplevering nemen we elke stap voor onze rekening, met nauwgezette werfcoördinatie.</p><span class="link">Ontdek {ARROW}</span></div>
    </a>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="eyebrow reveal">Geselecteerde realisaties</span><h2 class="reveal">Elk project vertelt een <span class="it">verhaal.</span></h2></div>
      <a class="link reveal" href="{{r}}realisaties/">Alle realisaties {ARROW}</a>
    </div>
    {project_cards(PROJECTS[:4])}
  </div>
</section>

<div class="band"><img src="{{r}}{img('appartement-leem-en-eik', 2)}" alt="Leefruimte met keukeneiland en maatkasten" loading="lazy"></div>

<section class="section dark">
  <div class="wrap">
    <div class="section-head">
      <div><span class="eyebrow reveal">Werkwijze</span><h2 class="reveal">Van eerste schets tot laatste <span class="it">voeg.</span></h2></div>
      <p class="lead reveal" style="max-width:24em">Eén partner voor het hele traject. Zo blijft elk detail bewaakt, van ontwerp tot plaatsing.</p>
    </div>
    <div class="steps">
      <div class="step reveal"><span class="num">01</span><h3>Advies</h3><p>We luisteren naar uw wensen, smaak en budget en adviseren over houtsoort, afwerking en techniek.</p></div>
      <div class="step reveal"><span class="num">02</span><h3>Ontwerp</h3><p>Elk project tekenen en berekenen we zelf in onze eigen tekensoftware, in nauw overleg met u of uw architect.</p></div>
      <div class="step reveal"><span class="num">03</span><h3>Atelier</h3><p>Ambachtelijk gemaakt in Izegem, met Belgische materialen en een nagelnieuw machinepark.</p></div>
      <div class="step reveal"><span class="num">04</span><h3>Plaatsing</h3><p>Ons eigen team plaatst en coördineert de werf, tot de laatste afwerking perfect zit.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="pro">
      <div>
        <span class="eyebrow reveal">Voor architecten &amp; bouwpartners</span>
        <h2 class="reveal">Uw ontwerp, uitgevoerd met <span class="it">respect</span> voor elk detail.</h2>
        <p class="reveal">Architecten, ontwikkelaars en ondernemers rekenen op MHD voor schrijnwerk dat het concept versterkt. We denken technisch mee, detailleren in huis en houden de planning strak.</p>
        <ul class="list-lines">
          <li class="reveal"><span class="num">—</span>Technische detaillering en berekeningen in eigen huis</li>
          <li class="reveal"><span class="num">—</span>Uitvoering volgens plan, lastenboek en timing</li>
          <li class="reveal"><span class="num">—</span>Residentieel, horeca, kantoor en retail</li>
          <li class="reveal"><span class="num">—</span>Vast team van vakmensen en onderaannemers</li>
        </ul>
        <a class="btn btn--ink reveal" href="{{r}}contact/">Bespreek uw project {ARROW}</a>
      </div>
      <div class="pro__media">
        <img class="reveal-img" src="{{r}}{img('uitbouw-leefruimte', 9, True)}" alt="Zwart eiken keuken met natuursteen blad" loading="lazy">
        <img class="reveal-img" src="{{r}}{img('appartement-nieuwpoort', 3, True)}" alt="Keuken in licht eiken en terrazzo" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="section paper">
  <div class="wrap">
    <div class="quote">
      <img class="reveal-img" src="{{r}}{img('horeca-interieur-cafe', 5, True)}" alt="Detail van een toog met eiken lambrisering" loading="lazy">
      <blockquote class="reveal">
        <span class="eyebrow">Wat klanten zeggen</span>
        <p>Het was een hele uitdaging om van de kledijzaak een belevingskantoor te maken. Maar met MHD zaten we direct op dezelfde golflengte. Hij heeft prachtig werk geleverd en iedereen is lovend over het kantoor.</p>
        <cite><b>Jonas Van Biervliet</b><span>Eigenaar JVB Verzekeringen</span></cite>
      </blockquote>
    </div>
  </div>
</section>

{cta(dark=True)}
"""
schema = {
    "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", "name": "MHD Totaalprojecten",
    "url": DOMAIN + "/", "telephone": "+32475267331", "email": EMAIL, "image": f"{DOMAIN}/{img('uitbouw-leefruimte', 1)}",
    "address": {"@type": "PostalAddress", "streetAddress": ADDRESS[0], "postalCode": "8870", "addressLocality": "Izegem", "addressCountry": "BE"},
    "founder": {"@type": "Person", "name": "Dieter Holvoet"},
}
home += f'<script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script>'
page("", "Schrijnwerk, totaalprojecten en maatwerk in hout | MHD Totaalprojecten",
     "MHD maakt schrijnwerk van de bovenste plank: interieur, exterieur en totaalprojecten op maat vanuit ons eigen atelier in Izegem.", home)


# ---------------------------------------------------------------- disciplinepagina's
def discipline_page(slug, title, desc, eyebrow, h1, lead, hero_img, h2, paragraphs, items, side_img, side_cap):
    body = page_hero(eyebrow, h1, lead, hero_img) + f"""
<section class="section">
  <div class="wrap">
    <div class="split">
      <div class="split__text">
        <span class="eyebrow reveal">{eyebrow}</span>
        <h2 class="reveal">{h2}</h2>
        {''.join(f'<p class="reveal">{t}</p>' for t in paragraphs)}
        <ul class="list-lines">{''.join(f'<li class="reveal"><span class="num">{i:02d}</span>{t}</li>' for i, t in enumerate(items, 1))}</ul>
        <a class="btn btn--ink reveal" href="{{r}}contact/">Vraag een vrijblijvend gesprek aan {ARROW}</a>
      </div>
      <figure class="split__media" style="margin:0"><img class="reveal-img" src="{{r}}{side_img}" alt="{escape(side_cap)}" loading="lazy"><figcaption>{side_cap}</figcaption></figure>
    </div>
  </div>
</section>
<section class="section paper">
  <div class="wrap">
    <div class="section-head"><div><span class="eyebrow reveal">Referenties</span><h2 class="reveal">Ontdek onze <span class="it">realisaties.</span></h2></div>
    <a class="link reveal" href="{{r}}realisaties/">Alle realisaties {ARROW}</a></div>
    {project_cards(by_cat(slug))}
  </div>
</section>
{cta(dark=True)}"""
    page(f"{slug}/", title, desc, body, active=slug, og_image=hero_img)


discipline_page(
    "interieur", "Interieur schrijnwerk op maat met kwalitatieve afwerking | MHD Totaalprojecten",
    "Interieurbouw op maat: maatkasten, keukens, houten wanden, deuren, toonbanken, meubels en parket, uitgevoerd met precisie.",
    "Schrijnwerk voor binnen", "Interieur <span class=\"it\">op maat</span>",
    "Ingebouwd of losstaand, residentieel of professioneel. Elk interieur uitgevoerd met precisie en een uitzonderlijk kwalitatieve afwerking.",
    img("appartement-leem-en-eik", 1),
    "Alles wat met interieurbouw te maken heeft.",
    ["Bij ons kan je terecht voor alles wat met interieurbouw te maken heeft, zowel ingebouwd als losstaand. Alle interieurprojecten voeren we uit met precisie en een uitzonderlijk kwalitatieve afwerking.",
     "We hebben een team gespecialiseerd in interieurschrijnwerk dat graag alle types schrijnwerk binnenshuis aanpakt. Daarbij ontwikkelen we zelfs unieke concepten, 100% op maat — en zorgen we uiteraard voor een verfijnde afwerking.",
     "We ontwerpen en realiseren onze projecten in onze eigen tekensoftware. Zo werken we optimaal samen voor het beste resultaat."],
    ["Maatkasten &amp; dressings", "Keukens", "Houten wanden &amp; lambrisering", "Deuren", "Toonbanken &amp; horeca", "Meubels &amp; werkbladen", "Parket"],
    img("appartement-nieuwpoort", 6, True), "Appartement Nieuwpoort — eiken &amp; terrazzo",
)
discipline_page(
    "exterieur", "Robuust, duurzaam en stijlvol buitenschrijnwerk | MHD Totaalprojecten",
    "Buitenschrijnwerk in robuust hardhout: ramen, deuren, gevelbekleding, terrassen, carports en bijgebouwen.",
    "Schrijnwerk voor buiten", "Exterieur <span class=\"it\">in hardhout</span>",
    "Robuust, duurzaam en stijlvol. Buitenschrijnwerk dat de uitstraling van een gebouw echt kan transformeren.",
    img("poolhouse-kortrijk", 2),
    "Schrijnwerk dat de architectuur versterkt.",
    ["Ook voor exterieurprojecten met hout hebben we een gespecialiseerd team waar we mogen mee uitpakken. Voor alle toepassingen van buitenschrijnwerk werken we samen met kwaliteitspartners.",
     "Buitenschrijnwerk biedt een uitgebreide waaier aan designmogelijkheden. Of het nu gaat om ramen, deuren of gevelbekleding: het juiste schrijnwerk zorgt voor visuele coherentie en een unieke stijl die bij de architectuur past.",
     "Kwalitatief buitenschrijnwerk in robuuste materialen zoals hardhout verlengt de levensduur aanzienlijk, is bestand tegen weersinvloeden en vraagt minder onderhoud. Ook hier maken we zelf de ontwerpen en berekeningen, geven we advies en overleggen we samen met de klant."],
    ["Ramen &amp; deuren", "Gevelbekleding", "Terrassen", "Poolhouses &amp; bijgebouwen", "Carports", "Houtskeletbouw"],
    img("uitbouw-leefruimte", 13, True), "Uitbouw — gevelbekleding en buitendeur",
)
discipline_page(
    "totaalconcept", "Totaalprojecten: van ontwerp tot uitvoering | MHD Totaalprojecten",
    "MHD neemt elke stap van het constructieproces voor zijn rekening, met nauwgezette werfcoördinatie en opvolging.",
    "Totaalprojecten", "Totaal&shy;<span class=\"it\">concept</span>",
    "Eén partner, één aanspreekpunt. Van eerste ontwerp tot sleutel-op-de-deur.",
    img("uitbouw-leefruimte", 2),
    "Elke stap voor onze rekening.",
    ["U kan bij MHD ook terecht voor totaalprojecten. Daarbij nemen we elke stap van het constructieproces voor onze rekening.",
     "Dankzij onze uitgebreide ervaring hebben we een sterke expertise in totaalprojecten. Met een nauwgezette werfcoördinatie en opvolging garanderen we een correcte uitvoering van de voorziene werken.",
     "Samen met een vast team van gedreven onderaannemers brengen we elk project tot een goed einde — binnen en buiten, als één samenhangend geheel."],
    ["Ontwerp &amp; technische uitwerking", "Houtskeletbouw &amp; uitbouwen", "Volledige binnenhuisinrichting", "Werfcoördinatie &amp; opvolging", "Oplevering tot in detail"],
    img("poolhouse-kortrijk", 5, True), "Poolhouse Kortrijk — binneninrichting",
)

# ---------------------------------------------------------------- realisaties
counts = {c: len(by_cat(c)) for c in ("interieur", "exterieur", "totaalconcept")}
filters = f"""<div class="filters reveal" role="group" aria-label="Filter realisaties">
  <button data-filter="alles" aria-pressed="true">Alles<sup>{len(PROJECTS)}</sup></button>
  <button data-filter="interieur" aria-pressed="false">Interieur<sup>{counts['interieur']}</sup></button>
  <button data-filter="exterieur" aria-pressed="false">Exterieur<sup>{counts['exterieur']}</sup></button>
  <button data-filter="totaalconcept" aria-pressed="false">Totaalconcept<sup>{counts['totaalconcept']}</sup></button>
</div>"""
body = page_hero("Realisaties", "Onze <span class=\"it\">realisaties</span>",
                 "Ontdek onze schrijnwerkprojecten. Klik op een project en blader door het volledige verhaal.",
                 img("horeca-interieur-cafe", 1), short=True) + f"""
<section class="section">
  <div class="wrap">{filters}{project_cards(PROJECTS)}</div>
</section>
{cta(dark=True)}"""
page("realisaties/", "Realisaties: bekijk onze voltooide projecten | MHD Totaalprojecten",
     "Ontdek de schrijnwerkprojecten van MHD en blader door onze realisaties in interieur, exterieur en totaalconcept.", body, active="realisaties")

# ---------------------------------------------------------------- over MHD
body = page_hero("Over MHD", "Hout zit in ons <span class=\"it\">DNA</span>",
                 "Al drie generaties lang. Houtbewerking en schrijnwerk stromen door onze aderen.",
                 img("maatkasten-slaapkamer-bureau", 4)) + f"""
<section class="section">
  <div class="wrap">
    <div class="split">
      <div class="split__text">
        <span class="eyebrow reveal">Familiebedrijf uit Izegem</span>
        <h2 class="reveal">Jong, dynamisch en <span class="it">ambachtelijk.</span></h2>
        <p class="reveal">MHD is een jong en dynamisch familiebedrijf dat professionaliteit voorop zet. Bij elk project willen we ons garant stellen voor de tevredenheid van de klant.</p>
        <p class="reveal">Aan het roer staat Dieter Holvoet, samen met een team van acht collega's die gepassioneerd zijn door hout. Onze bouwstenen zijn een natuurlijk en duurzaam materiaal met een warm karakter. Elke dag geeft ons team het beste van zichzelf om de dromen en wensen van klanten te realiseren. Daarnaast werken we samen met een vast team van gedreven onderaannemers.</p>
        <p class="reveal">Bij ons wordt er met ambachtelijke en Belgische materialen gewerkt. Onze focus ligt op het uitzicht, in combinatie met functionaliteit, de smaak van de klant en het budget. In ons eigen atelier in Izegem transformeren we je favoriete houtsoort in de nieuwste aanvulling van je interieur of buitenomgeving — van houtskeletbouw en interieurschrijnwerk tot exterieurschrijnwerk.</p>
      </div>
      <figure class="split__media" style="margin:0"><img class="reveal-img" src="{{r}}{img('uitbouw-leefruimte', 11, True)}" alt="Eiken wandbekleding met haard" loading="lazy"><figcaption>Massief eiken, gemaakt in Izegem</figcaption></figure>
    </div>
  </div>
</section>
<div class="band"><img src="{{r}}{img('poolhouse-kortrijk', 1)}" alt="Poolhouse met houten gevelbekleding" loading="lazy"></div>
<section class="section paper">
  <div class="wrap">
    <div class="section-head"><div><span class="eyebrow reveal">Waar we voor staan</span><h2 class="reveal">Drie bouwstenen.</h2></div></div>
    <div class="values">
      <div class="value reveal"><span class="num">01</span><h3>Van vader op zoon</h3><p>Onze kennis en knowhow over hout geven we al generaties lang door. We kennen hout door en door, van materiaal tot afwerking. En dat merk je bij elk project.</p></div>
      <div class="value reveal"><span class="num">02</span><h3>Passie voor kwaliteit</h3><p>Kwalitatief hout, materialen uit eigen land en een ambachtelijke aanpak. Dat zijn onze bouwstenen om voor elke klant een kwalitatief resultaat te leveren.</p></div>
      <div class="value reveal"><span class="num">03</span><h3>Modern machinepark</h3><p>Onze ambachtelijke aanpak koppelen we aan een nagelnieuw machinepark om de allerbeste resultaten te bereiken. Zo blijven we innoveren in houtbewerking en technieken.</p></div>
    </div>
  </div>
</section>
{cta(dark=True)}"""
page("over-mhd/", "Over MHD schrijnwerk: 3 generaties expertise in hout | MHD Totaalprojecten",
     "MHD is een familiebedrijf uit Izegem met drie generaties ervaring in schrijnwerk, een eigen atelier en een modern machinepark.", body, active="over-mhd")

# ---------------------------------------------------------------- contact
chips = lambda name, opts: "".join(f'<label><input type="radio" name="{name}" value="{o}"{" required" if i == 0 else ""}><span>{o}</span></label>' for i, o in enumerate(opts))
body = page_hero("Contact", "Neem <span class=\"it\">contact</span> op", "", short=True) + f"""
<section class="section">
  <div class="wrap">
    <div class="contact">
      <div class="contact__info">
        <span class="eyebrow reveal">Maak je houtdromen waar</span>
        <h2 class="reveal">Vertel ons over uw <span class="it">project.</span></h2>
        <p class="reveal">Particulier, architect, ontwikkelaar of ondernemer: we bekijken elke aanvraag persoonlijk en nemen binnen twee werkdagen contact met u op.</p>
        <ul class="contact__list">
          <li class="reveal"><small>Telefoon</small><a href="{PHONE_LINK}">{PHONE}</a></li>
          <li class="reveal"><small>E-mail</small><a href="mailto:{EMAIL}">{EMAIL}</a></li>
          <li class="reveal"><small>Atelier</small><a href="{MAPS}" target="_blank" rel="noopener">{ADDRESS[0]}, {ADDRESS[1]}</a></li>
        </ul>
      </div>
      <form class="form reveal" data-endpoint="{FORM_ENDPOINT}" novalidate>
        <input type="hidden" name="_subject" value="Nieuwe aanvraag via de website">
        <input type="hidden" name="_template" value="table">
        <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <fieldset class="field field--full"><legend>Ik ben</legend><div class="chips">{chips('Profiel', ['Particulier', 'Architect', 'Aannemer / ontwikkelaar', 'Ondernemer'])}</div></fieldset>
        <div class="field"><label for="f-vn">Voornaam</label><input id="f-vn" name="Voornaam" autocomplete="given-name" required></div>
        <div class="field"><label for="f-fn">Familienaam</label><input id="f-fn" name="Familienaam" autocomplete="family-name" required></div>
        <div class="field"><label for="f-em">E-mail</label><input id="f-em" type="email" name="email" autocomplete="email" required></div>
        <div class="field"><label for="f-tel">Telefoon</label><input id="f-tel" type="tel" name="Telefoon" autocomplete="tel"></div>
        <fieldset class="field field--full"><legend>Type project</legend><div class="chips">{chips('Type project', ['Interieur', 'Exterieur', 'Totaalconcept', 'Nog niet zeker'])}</div></fieldset>
        <div class="field field--full"><label for="f-msg">Bericht</label><textarea id="f-msg" name="Bericht" required placeholder="Locatie, timing, plannen of inspiratie…"></textarea></div>
        <label class="consent"><input type="checkbox" name="Privacy" value="Akkoord" required><span>Ik ga akkoord dat MHD mijn gegevens gebruikt om mijn aanvraag te beantwoorden, zoals beschreven in het <a href="{{r}}privacy-beleid/">privacybeleid</a>.</span></label>
        <div class="form__submit"><button class="btn btn--ink" type="submit">Verzenden {ARROW}</button><p class="form__status" role="status" aria-live="polite"></p></div>
      </form>
    </div>
  </div>
</section>
<div class="band"><img src="{{r}}{img('uitbouw-leefruimte', 5)}" alt="Keuken in zwart eiken" loading="lazy"></div>"""
page("contact/", "Neem contact op met ons | MHD Totaalprojecten",
     "Contacteer MHD Totaalprojecten in Izegem voor schrijnwerk op maat, interieur, exterieur of een totaalproject.", body, active="contact")

# ---------------------------------------------------------------- privacy
privacy = open(os.path.join(HERE, "privacy.html"), encoding="utf-8").read()
body = page_hero("Juridisch", "Privacy&shy;beleid", "", short=True) + f"""
<section class="section"><div class="wrap"><div class="prose">{privacy}</div></div></section>"""
page("privacy-beleid/", "Privacybeleid | MHD Totaalprojecten", "Privacybeleid van MHD Totaalprojecten.", body)

# ---------------------------------------------------------------- 404, sitemap, robots
body = page_hero("Pagina niet gevonden", "Deze pagina <span class=\"it\">bestaat niet</span>",
                 "Misschien vindt u wat u zoekt bij onze realisaties.", short=True) + cta()
page("", "Pagina niet gevonden | MHD Totaalprojecten", "Pagina niet gevonden.", body, out=os.path.join(SITE, "404.html"))

urls = ["", "interieur/", "exterieur/", "totaalconcept/", "realisaties/", "over-mhd/", "contact/", "privacy-beleid/"]
open(os.path.join(SITE, "sitemap.xml"), "w", encoding="utf-8").write(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "".join(f"  <url><loc>{DOMAIN}/{u}</loc></url>\n" for u in urls) + "</urlset>\n")
open(os.path.join(SITE, "robots.txt"), "w", encoding="utf-8").write(f"User-agent: *\nAllow: /\nSitemap: {DOMAIN}/sitemap.xml\n")
print("Klaar:", len(urls), "pagina's + 404")

# MHD Totaalprojecten — website

Statische website (HTML/CSS/JS) voor [totaalprojecten-mhd.be](https://totaalprojecten-mhd.be), gehost op GitHub Pages.

## Pagina's
Dezelfde URL's als de huidige site: `/`, `/interieur/`, `/exterieur/`, `/totaalconcept/`, `/realisaties/`, `/over-mhd/`, `/contact/`, `/privacy-beleid/`.

## Aanpassen
Teksten en projecten staan in `_build/build.py`. Na een wijziging:

```
python _build/build.py
```

Nieuwe projectfoto's: zet ze als WebP in `assets/img/projecten/<slug>/` (`01.webp` groot, `01-s.webp` klein), voeg ze toe aan `manifest.json` en aan `PROJECTS` in `build.py`.

## Contactformulier
Verstuurd via [FormSubmit](https://formsubmit.co) naar `info@totaalprojecten-mhd.be` (instelbaar via `FORM_ENDPOINT` in `build.py`).
De eerste inzending stuurt een activatiemail naar dat adres die één keer bevestigd moet worden.

## Lokaal bekijken
```
python -m http.server 8765
```
en open http://localhost:8765

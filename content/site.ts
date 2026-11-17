/**
 * Centrale bedrijfsgegevens. Alle gegevens hieronder komen van de bestaande website
 * totaalprojecten-mhd.be. Pas ze hier aan; ze worden overal op de site gebruikt.
 */
export const site = {
  name: "MHD Totaalprojecten",
  shortName: "MHD",
  url: "https://totaalprojecten-mhd.be",
  tagline: "Interieur. Exterieur. Totaalprojecten.",
  description:
    "MHD Totaalprojecten realiseert maatwerk in interieur, exterieur en totaalprojecten, vanuit een eigen atelier in Izegem.",
  phone: "0475 26 73 31",
  phoneHref: "tel:+32475267331",
  email: "info@totaalprojecten-mhd.be",
  address: {
    street: "Zandstraat 8",
    postalCode: "8870",
    city: "Izegem",
    country: "BE",
  },
  mapsUrl: "https://goo.gl/maps/Yra4PKhXhCvD6VE38",
  /**
   * Verzendadres van het contactformulier.
   * Standaard: FormSubmit (gratis, geen server nodig). De eerste inzending stuurt
   * een activatiemail naar het e-mailadres hierboven, die één keer bevestigd moet worden.
   * Overschrijfbaar via de omgevingsvariabele NEXT_PUBLIC_FORM_ENDPOINT.
   * Leeg laten = formulier toont dat verzenden niet beschikbaar is en verwijst naar e-mail.
   */
  formEndpoint:
    process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "https://formsubmit.co/ajax/info@totaalprojecten-mhd.be",
} as const;

export const nav = [
  { href: "/projecten/", label: "Projecten" },
  { href: "/over-ons/", label: "Over ons" },
  { href: "/contact/", label: "Contact" },
] as const;

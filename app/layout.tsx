import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { LightboxHost } from "@/components/Lightbox";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Interieur, exterieur en totaalprojecten`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: site.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  url: `${site.url}/`,
  image: `${site.url}/og.jpg`,
  logo: `${site.url}/logo.svg`,
  telephone: "+32475267331",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl-BE" suppressHydrationWarning>
      <head>
        {/* Sweet Sans Pro — lettertype van het MHD-logo, via de bestaande Adobe Fonts-kit van MHD */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/ytx6hpy.css" />
        {/* Activeert de reveal-animaties enkel wanneer JavaScript beschikbaar is */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <a href="#inhoud" className="skip-link">Naar de inhoud</a>
        <Header />
        <main id="inhoud" className="flex-1">{children}</main>
        <Footer />
        <RevealObserver />
        <LightboxHost />
      </body>
    </html>
  );
}

import { Archivo, JetBrains_Mono } from "next/font/google";
import { company, faqs, services } from "@/content/site";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "New Jersey trucking company (USDOT 3875433, MC-1420159) hauling full truckload freight and intermodal containers across the lower 48. 24/7 dispatch.";

export const metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "GIA Blessed Trucking | New Jersey Trucking & Freight Carrier",
    template: "%s | GIA Blessed Trucking",
  },
  description,
  applicationName: company.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: company.url,
    siteName: company.name,
    title: "GIA Blessed Trucking — Your freight, in good hands.",
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Blue GIA Blessed Trucking Volvo tractor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GIA Blessed Trucking — Your freight, in good hands.",
    description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#0B1426",
};

// One @graph: WebSite (site name in results), the carrier itself, the
// services it offers, and the FAQ shown on the page. Organization rather than
// LocalBusiness: there is no public street address to list yet.
const orgId = `${company.url}/#organization`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${company.url}/#website`,
      url: company.url,
      name: company.name,
      alternateName: company.legalName,
      publisher: { "@id": orgId },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": orgId,
      name: company.legalName,
      alternateName: company.name,
      url: company.url,
      logo: `${company.url}/GiaLogoFinal.png`,
      image: `${company.url}/og.jpg`,
      description,
      slogan: company.tagline,
      email: company.email,
      telephone: company.phone,
      areaServed: [
        { "@type": "State", name: "New Jersey" },
        { "@type": "Country", name: "United States" },
      ],
      knowsAbout: ["Full truckload freight", "Intermodal containers", "Interstate trucking"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "dispatch",
        telephone: company.phone,
        email: company.email,
        areaServed: "US",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
      identifier: [
        { "@type": "PropertyValue", propertyID: "USDOT", value: company.usdot },
        { "@type": "PropertyValue", propertyID: "MC", value: company.mc },
      ],
      makesOffer: services.map((svc) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: svc.title,
          description: svc.body,
          serviceType: "Freight trucking",
          provider: { "@id": orgId },
          areaServed: { "@type": "Country", name: "United States" },
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${company.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          // Arms the scroll-reveal styles before first paint, with a fail-safe
          // that shows everything if the app never hydrates (see globals.css).
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.classList.contains('hydrated'))d.classList.add('reveal-all')},3000)",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

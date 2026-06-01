import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { cn } from "@workspace/ui/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://haydarunver.com"

const HOME_TITLE =
  "Haydar Ünver | Nefes, Aile Dizimi, Bioenerji ve Ses Meditasyonu"
const HOME_DESC =
  "Haydar Ünver ile nefes terapisi, aile dizimi, bioenerji, ses meditasyonu ve farkındalık çalışmaları. Antalya'da bireysel seanslar, grup çalışmaları ve online programlar."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s | Haydar Ünver",
  },
  description: HOME_DESC,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Haydar Ünver",
    title: HOME_TITLE,
    description: HOME_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESC,
  },
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "ru-RU": "/ru",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Haydar Ünver",
  url: SITE_URL,
  jobTitle: "Nefes Terapisti & Wellness Eğitmeni",
  description:
    "Nefes terapisi, bioenerji, ses meditasyonu ve aile dizimi alanlarında çalışan terapist ve eğitmen.",
  sameAs: [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_YOUTUBE_URL,
    process.env.NEXT_PUBLIC_TELEGRAM_URL,
  ].filter(Boolean),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Antalya",
    addressCountry: "TR",
  },
}

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}

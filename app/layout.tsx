import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { OG_IMAGE, organizationSchema, personSchema, websiteSchema } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/lib/site";
import { ADSENSE_CLIENT } from "@/lib/adsense";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Video to GIF Converter Free & GIF Maker | CodeLove",
    template: "%s | GIF Studio",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.creator, url: SITE.creatorUrl }],
  creator: SITE.creator,
  publisher: SITE.brand,
  manifest: `${SITE.url}/manifest.webmanifest`,
  keywords: [
    "gif studio",
    "video to gif free",
    "video to gif converter free",
    "mp4 to gif free",
    "gif maker free",
    "compress gif online free",
    "online video compressor",
    "video compressor online",
    "video compressor free",
    "compress video online free",
    "reduce video size online",
    "video size compressor",
    "compress video for whatsapp",
    "resize gif free",
    "crop video free",
    "crop video 1 1",
    "video cut",
    "video shorts cutter",
    "online video editor free",
    "free online converter",
    "mp4 to gif",
    "convert video to gif",
    "make gif from video",
    "gif to mp4",
    "video to gif no watermark",
    "high quality gif maker",
    "gif maker online",
    "codelove",
    "code love",
    "codelove gif",
    "codelove video to gif",
  ],
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: SITE.name,
    title: "Video to GIF Converter & Free GIF Tools | GIF Studio by CodeLove",
    description: SITE.description,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to GIF Converter & Free GIF Tools | GIF Studio by CodeLove",
    description: SITE.description,
    creator: SITE.twitter,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth ${inter.variable} ${jakarta.variable}`}
    >
      <head>
        <link rel="sitemap" type="application/xml" href="https://videotogif.codelove.in/sitemap.xml" />
        {ADSENSE_CLIENT ? (
          <>
            <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
              crossOrigin="anonymous"
            />
          </>
        ) : null}
        {/* CodeLove Analytics (admin.codelove.in). async, not defer: React treats <script async src> as a resource and
            skips it during hydration; a defer script gets compared with the script AdSense inserts into <head>. */}
        <script async src="https://admin.codelove.in/t.js" />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-J5QTR1JC22" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J5QTR1JC22');
          `}
        </Script>
        <JsonLd data={[organizationSchema(), websiteSchema(), personSchema()]} />
        <ThemeProvider>
          <SmoothScroll />
          <PageLoader />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-[color:var(--accent-fg)]"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

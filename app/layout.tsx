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
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

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
    default: "Free Online GIF & Video Editing Tools | GIF Studio",
    template: "%s | GIF Studio",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.creator, url: SITE.brandUrl }],
  creator: SITE.creator,
  publisher: SITE.brand,
  manifest: `${SITE.url}/manifest.webmanifest`,
  keywords: [
    "gif studio",
    "video to gif free",
    "video to gif converter free",
    "mp4to gif free",
    "gif maker free",
    "compress gif online free",
    "video compressor free",
    "resize gif free",
    "crop video free",
    "online video editor free",
    "free online converter",
    "codelove",
  ],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "Free Online GIF & Video Editing Tools | GIF Studio",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online GIF & Video Editing Tools | GIF Studio",
    description: SITE.description,
    creator: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
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

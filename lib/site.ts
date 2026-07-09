
const IS_PROD = process.env.NODE_ENV === "production";

export const SITE = {
  name: "GIF Studio",
  tagline: "Convert, Compress & Edit GIFs and Videos in Seconds.",
  altTagline: "The fastest online GIF and Video toolkit.",
  description:
    "Create GIFs, convert videos, resize, crop, compress, optimize, and download instantly without installing any software. No watermark. No signup. Works directly in your browser.",
  url: IS_PROD
    ? "https://videotogif.codelove.in"
    : "http://localhost:3000",
  basePath: "",
  creator: "Gowtham",
  brand: "CodeLove.in",
  brandUrl: "https://codelove.in",
  twitter: "@gifstudio",
  email: "support@codelove.in",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
] as const;

/** Prefix a public asset path with the basePath so it resolves on GitHub Pages. */
export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.basePath}${clean}`;
}

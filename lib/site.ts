
const IS_PROD = process.env.NODE_ENV === "production";

export const SITE = {
  name: "GIF Studio",
  tagline: "Convert, Compress & Edit GIFs and Videos in Seconds.",
  altTagline: "The fastest online GIF and Video toolkit.",
  description:
    "Free in-browser GIF and video tools: convert video to GIF and GIF to MP4, then resize, crop or compress. Files stay on your device. No signup, no watermark.",
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

/** Sister site that extracts frames from video (promoted in the header and footer). */
export const VIDEO_TO_IMAGES_URL = "https://videotoimages.codelove.in";

/** The rest of the CodeLove network — the only sister sites that exist. */
export const NETWORK = [
  { label: "CodeLove", href: SITE.brandUrl },
  { label: "Free 3D Models", href: "https://models.codelove.in" },
  { label: "Free 3D Games", href: "https://games.codelove.in" },
  { label: "Instagram & Pinterest Downloader", href: "https://downloader.codelove.in" },
  { label: "Link in Bio", href: "https://linkinbio.codelove.in" },
  { label: "Video to Images", href: VIDEO_TO_IMAGES_URL },
  { label: "Free YouTube Automation", href: "https://utubeflow.codelove.in" },
  { label: "Free Java Games", href: "https://javaplay.codelove.in" },
] as const;

/** Related how-to guides on the main CodeLove site (linked from the footer). */
export const GUIDES = [
  {
    label: "How to convert video to GIF",
    href: "https://codelove.in/learn/guide/how-to-convert-video-to-gif",
  },
  {
    label: "How to make a GIF smaller",
    href: "https://codelove.in/learn/guide/how-to-make-a-gif-smaller",
  },
] as const;

/** Prefix a public asset path with the basePath so it resolves on GitHub Pages. */
export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.basePath}${clean}`;
}

/**
 * Absolute URL for an internal page path, always ending in a slash to match
 * `trailingSlash: true` (the URL GitHub Pages actually serves).
 */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean.endsWith("/") ? clean : `${clean}/`}`;
}

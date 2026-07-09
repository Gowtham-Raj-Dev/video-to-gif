import type { IconName } from "./tools";

export interface WhyItem {
  icon:
    | "bolt"
    | "shield"
    | "infinity"
    | "tag"
    | "cpu"
    | "phone"
    | "cloudoff"
    | "keyoff"
    | "sparkle"
    | "heart";
  title: string;
  description: string;
}

export const TRUST_BADGES = [
  "100K+ Files Processed",
  "Fast Browser Processing",
  "Privacy First",
  "Free Forever Tools",
  "Lightning Fast",
  "No Watermarks",
];

export const WHY_CHOOSE: WhyItem[] = [
  { icon: "bolt", title: "Lightning Fast Processing", description: "A modern in-browser pipeline gets your result in seconds, not minutes." },
  { icon: "shield", title: "Privacy First", description: "Your files are processed on your device and never uploaded to a server." },
  { icon: "infinity", title: "No Upload Limits", description: "There are no artificial caps on how much you can convert or compress." },
  { icon: "tag", title: "No Watermark", description: "Every export is clean — we never brand your creations." },
  { icon: "cpu", title: "Modern Browser Technology", description: "Powered by fast, native web APIs for desktop-class performance." },
  { icon: "phone", title: "Works on Mobile", description: "A fully responsive experience that feels great on any screen." },
  { icon: "cloudoff", title: "Works Offline", description: "Where supported, tools keep working even without a connection." },
  { icon: "keyoff", title: "No Registration", description: "Just open a tool and start — no account, no email required." },
  { icon: "sparkle", title: "100% Free", description: "Every tool is free to use, with no hidden paywalls." },
  { icon: "heart", title: "Beautiful UI", description: "A polished, accessible interface crafted down to the last pixel." },
];

export interface ShowcaseItem {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  accentFrom: string;
  accentTo: string;
  icon: IconName;
}

export const SHOWCASE: ShowcaseItem[] = [
  {
    eyebrow: "For Creators",
    title: "Built for Creators",
    description:
      "Turn raw clips into scroll-stopping GIFs and reels. Trim the perfect moment, reframe for any platform, and export in a couple of clicks — no timeline software required.",
    points: ["High-quality export presets", "Instant social-ready output", "No watermark on anything"],
    accentFrom: "from-cyan-400",
    accentTo: "to-blue-500",
    icon: "videoToGif",
  },
  {
    eyebrow: "For Developers",
    title: "Perfect for Developers",
    description:
      "Ship lighter assets and faster pages. Convert bulky GIFs to MP4, compress media, and generate correctly-sized files for your docs, READMEs and product demos.",
    points: ["Optimized, lightweight assets", "Batch-ready architecture", "Predictable, clean output"],
    accentFrom: "from-fuchsia-400",
    accentTo: "to-cyan-400",
    icon: "gifCompress",
  },
  {
    eyebrow: "For Social",
    title: "Optimized for Social Media",
    description:
      "Crop to 9:16 for Reels and Shorts, square for feed, or any custom ratio. Ultra-fast compression keeps quality high while hitting every platform's upload limit.",
    points: ["Instagram, TikTok & Shorts presets", "Ultra-fast compression", "Instant downloads"],
    accentFrom: "from-emerald-400",
    accentTo: "to-cyan-400",
    icon: "videoCrop",
  },
];

export const HOW_IT_WORKS = [
  { step: "01", icon: "upload", title: "Upload File", description: "Drop in your video or GIF — it stays on your device the whole time." },
  { step: "02", icon: "grid", title: "Choose Tool", description: "Pick from convert, resize, crop or compress to fit your goal." },
  { step: "03", icon: "sliders", title: "Adjust Settings", description: "Fine-tune dimensions, quality, frame rate and more with a live preview." },
  { step: "04", icon: "download", title: "Download Result", description: "Export instantly — no watermark, no signup, no waiting." },
] as const;

export const FORMATS = {
  video: ["MP4", "MOV", "AVI", "MKV", "WEBM", "MPEG"],
  gif: ["GIF", "Animated GIF", "High Quality Export"],
};

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export const STATS: Stat[] = [
  { value: 100, suffix: "K+", label: "Files Converted" },
  { value: 500, suffix: "K+", label: "Downloads" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
  { value: 4.9, suffix: "★", label: "User Rating", decimals: 1 },
];

export interface Testimonial {
  name: string;
  role: string;
  initials: string;
  quote: string;
  gradient: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Arjun Mehta",
    role: "Frontend Developer",
    initials: "AM",
    gradient: "from-cyan-400 to-blue-500",
    quote:
      "I convert bulky demo GIFs to MP4 for our docs constantly. It's instant, private, and the file sizes are unbelievably small. This replaced three tools for me.",
  },
  {
    name: "Sofia Rossi",
    role: "Content Creator",
    initials: "SR",
    gradient: "from-fuchsia-400 to-pink-500",
    quote:
      "The 9:16 crop presets are a lifesaver for Reels. No watermark, no signup, and it just works on my phone. I use it every single day.",
  },
  {
    name: "Daniel Kim",
    role: "Product Designer",
    initials: "DK",
    gradient: "from-emerald-400 to-cyan-400",
    quote:
      "Beautiful interface and genuinely fast. Resizing GIFs for our design system used to be a chore — now it takes seconds and the quality is perfect.",
  },
  {
    name: "Priya Nair",
    role: "YouTuber",
    initials: "PN",
    gradient: "from-amber-400 to-rose-500",
    quote:
      "I compress every upload to hit size limits without losing quality. It's fast, free, and the fact that nothing gets uploaded to a server sold me instantly.",
  },
  {
    name: "Marcus Lee",
    role: "Social Media Manager",
    initials: "ML",
    gradient: "from-indigo-400 to-cyan-400",
    quote:
      "Managing content for five brands means constant reformatting. GIF Studio's crop and resize tools keep everything on-brand and platform-perfect.",
  },
  {
    name: "Elena Vasquez",
    role: "Motion Designer",
    initials: "EV",
    gradient: "from-sky-400 to-emerald-400",
    quote:
      "The video to GIF quality is the best I've found in a browser tool. Clean palettes, smooth loops, zero fuss. It feels like a premium native app.",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const HOME_FAQS: Faq[] = [
  { question: "Is GIF Studio free?", answer: "Yes. Every tool on GIF Studio is completely free to use with no hidden paywalls, no trials and no premium tiers. You can convert, compress, resize and crop as much as you want." },
  { question: "Does it add a watermark?", answer: "Never. All of your exports are 100% watermark-free, no matter which tool you use or how many files you process." },
  { question: "Can I compress large videos?", answer: "Yes. The video compressor is built to handle large files and can often reduce size by 60–80% while keeping the footage looking sharp." },
  { question: "Does it work on mobile?", answer: "Absolutely. GIF Studio is fully responsive and every tool works in modern mobile browsers on both iOS and Android." },
  { question: "Which browsers are supported?", answer: "The latest versions of Chrome, Edge, Firefox, Safari and other Chromium-based browsers are fully supported for the best experience." },
  { question: "Is my file uploaded to a server?", answer: "No. Processing happens locally in your browser, so your files never leave your device. This keeps your content completely private." },
  { question: "Can I resize GIFs?", answer: "Yes. The GIF resize tool lets you set custom dimensions or lock the aspect ratio while keeping the animation perfectly smooth." },
  { question: "Can I crop videos?", answer: "Yes. Crop any video to Instagram, TikTok, YouTube Shorts, square, or a fully custom ratio with an interactive selector." },
  { question: "Can I convert a GIF to MP4?", answer: "Yes. The GIF to Video tool turns animated GIFs into MP4 files that are far smaller and more widely compatible." },
  { question: "How long are my files stored?", answer: "They aren't. Because everything is processed on your device, nothing is stored on any server — your files disappear the moment you close the tab." },
  { question: "Do I need to create an account?", answer: "No account or signup is required. Just open a tool and start working immediately." },
  { question: "What video formats can I convert?", answer: "MP4, MOV, AVI, MKV, WEBM and MPEG are all supported for conversion, cropping, resizing and compression." },
  { question: "Will compression reduce my quality?", answer: "Our tools use smart optimization to minimize file size while preserving visual quality, so any change is typically hard to notice." },
  { question: "Can I use GIF Studio offline?", answer: "Where your browser supports it, the tools continue to work offline since processing doesn't depend on a server." },
  { question: "Is there a limit on how many files I can process?", answer: "No. There are no artificial limits — convert, resize, crop and compress as many files as you like, completely free." },
];

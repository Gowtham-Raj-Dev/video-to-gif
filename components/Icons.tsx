import type { SVGProps } from "react";
import type { IconName } from "@/lib/tools";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function VideoToGifIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="5" width="12" height="10" rx="2" />
      <path d="m14.5 8 4-2v8l-4-2" />
      <path d="M6 19h12" />
      <path d="M9 22h6" />
    </svg>
  );
}

export function GifToVideoIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="9.5" y="9" width="12" height="10" rx="2" />
      <path d="m9.5 12-4-2v8l4-2" />
      <path d="M14 2v4M12 4h4" />
    </svg>
  );
}

export function GifResizeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M3 9h18" opacity="0.4" />
      <path d="m14 10 4 4M18 10v4h-4" />
    </svg>
  );
}

export function GifCropIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
      <path d="M2 6h14a2 2 0 0 1 2 2v14" />
    </svg>
  );
}

export function VideoCropIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
      <path d="M2 6h14a2 2 0 0 1 2 2v14" />
      <path d="m10.5 9.5 3 1.7-3 1.7z" />
    </svg>
  );
}

export function VideoResizeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="6" width="14" height="12" rx="2" />
      <path d="m8 10 3 2-3 2z" />
      <path d="M18 4h4v4M22 4l-4 4" />
    </svg>
  );
}

export function GifCompressIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 8h2v2M16 16h-2v-2" />
      <path d="m9 9 6 6M9 9v-.5M15 15v.5" opacity="0.5" />
      <path d="M14 8h2v2M8 16h2v-2" />
    </svg>
  );
}

export function VideoCompressIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="6" width="14" height="12" rx="2" />
      <path d="m7.5 10 3 2-3 2z" />
      <path d="M19 5v5M19 19v-5M17 8l2-2 2 2M17 16l2 2 2-2" />
    </svg>
  );
}

const MAP: Record<IconName, (p: IconProps) => JSX.Element> = {
  videoToGif: VideoToGifIcon,
  gifToVideo: GifToVideoIcon,
  gifResize: GifResizeIcon,
  gifCrop: GifCropIcon,
  videoCrop: VideoCropIcon,
  videoResize: VideoResizeIcon,
  gifCompress: GifCompressIcon,
  videoCompress: VideoCompressIcon,
};

export function ToolIcon({ name, ...props }: { name: IconName } & IconProps) {
  const Cmp = MAP[name];
  return <Cmp {...props} />;
}

/* --- UI / interface icons --- */

export function BoltIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12z" />
    </svg>
  );
}
export function ShieldIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
export function InfinityIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6.5 8a4 4 0 1 0 0 8c2 0 3-1.5 5.5-4s3.5-4 5.5-4a4 4 0 1 1 0 8c-2 0-3-1.5-5.5-4S8.5 8 6.5 8Z" />
    </svg>
  );
}
export function SparkleIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3v18M3 12h18" opacity="0.35" />
      <path d="M12 4c.7 4 3.3 6.6 7.3 7.3-4 .7-6.6 3.3-7.3 7.3-.7-4-3.3-6.6-7.3-7.3C8.7 10.6 11.3 8 12 4Z" />
    </svg>
  );
}
export function CpuIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
    </svg>
  );
}
export function PhoneIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}
export function CloudOffIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 18a4 4 0 0 1 .5-8 6 6 0 0 1 11 1 3.5 3.5 0 0 1 1.5 6.6" />
      <path d="m3 3 18 18" />
    </svg>
  );
}
export function KeyOffIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 6-6 3 3M14.5 8.5 17 11" />
    </svg>
  );
}
export function TagIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}
export function HeartIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 20s-7-4.5-9.5-9A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9.5 5C19 15.5 12 20 12 20Z" />
    </svg>
  );
}
export function UploadIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 16V4M8 8l4-4 4 4" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}
export function SlidersIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" opacity="0.3" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}
export function DownloadIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 4v12M8 12l4 4 4-4" />
      <path d="M4 18v0a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
    </svg>
  );
}
export function GridIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
export function SearchIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
export function ArrowRightIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function ChevronIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
export function SunIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
export function MoonIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z" />
    </svg>
  );
}
export function GithubIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}
export function CheckIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
export function StarIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" />
    </svg>
  );
}
export function MenuIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
export function CloseIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function RefreshIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
    </svg>
  );
}

export function MaximizeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

export function MinimizeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </svg>
  );
}

// Per-tool control definitions and ffmpeg argument builders.
// Each tool maps a user-adjustable settings object to a concrete ffmpeg command.

export type Control =
  | {
      key: string;
      label: string;
      type: "range";
      min: number;
      max: number;
      step: number;
      default: number;
      suffix?: string;
    }
  | {
      key: string;
      label: string;
      type: "number";
      min?: number;
      max?: number;
      default: number;
      placeholder?: string;
      suffix?: string;
    }
  | {
      key: string;
      label: string;
      type: "select";
      default: string;
      options: { label: string; value: string }[];
    };

export type Settings = Record<string, number | string>;

export interface BuildResult {
  args: (input: string, output: string) => string[];
  outputExt: string;
  outputMime: string;
}

export interface ToolProcessor {
  controls: Control[];
  /** Accept attribute for the file input. */
  accept: string;
  /** Build the ffmpeg command + output info from the chosen settings. */
  build: (settings: Settings) => BuildResult;
}

const num = (v: number | string, fallback: number): number => {
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
};

/** Center-crop filter for a given aspect ratio "w:h" using ffmpeg expressions. */
function cropFilter(ratio: string): string {
  const [aw, ah] = ratio.split(":").map(Number);
  const w = `min(iw,ih*${aw}/${ah})`;
  const h = `min(ih,iw*${ah}/${aw})`;
  return `crop='${w}':'${h}'`;
}

const VIDEO_ACCEPT = "video/*";
const GIF_ACCEPT = "image/gif";

export const PROCESSORS: Record<string, ToolProcessor> = {
  "video-to-gif": {
    accept: VIDEO_ACCEPT,
    controls: [
      { key: "start", label: "Start time", type: "number", min: 0, default: 0, suffix: "sec" },
      { key: "duration", label: "Duration (0 = full)", type: "number", min: 0, default: 0, suffix: "sec" },
      { key: "fps", label: "Frame rate", type: "range", min: 5, max: 30, step: 1, default: 15, suffix: "fps" },
      { key: "width", label: "Width (0 = original)", type: "number", min: 0, max: 1920, default: 480, suffix: "px" },
      {
        key: "quality",
        label: "Quality",
        type: "select",
        default: "high",
        options: [
          { label: "High — optimized palette", value: "high" },
          { label: "Standard — faster", value: "standard" },
          { label: "Small — fewer colors", value: "small" },
        ],
      },
      {
        key: "loop",
        label: "Looping",
        type: "select",
        default: "infinite",
        options: [
          { label: "Loop forever", value: "infinite" },
          { label: "Play once", value: "once" },
        ],
      },
    ],
    build: (s) => {
      const start = num(s.start, 0);
      const duration = num(s.duration, 0);
      const fps = num(s.fps, 15);
      const width = num(s.width, 480);
      const quality = typeof s.quality === "string" ? s.quality : "high";
      const loop = typeof s.loop === "string" ? s.loop : "infinite";
      const scale = width > 0 ? `${width}:-1` : "iw:-1";
      const base = `fps=${fps},scale=${scale}:flags=lanczos`;
      // A single-pass palette pipeline gives noticeably cleaner GIFs.
      const vf =
        quality === "high"
          ? `${base},split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle`
          : quality === "small"
            ? `${base},split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse`
            : base;
      const loopVal = loop === "once" ? "-1" : "0";
      // Seek before -i (fast) and cap with -t so only the chosen window is used.
      const pre = start > 0 ? ["-ss", String(start)] : [];
      const dur = duration > 0 ? ["-t", String(duration)] : [];
      return {
        args: (i, o) => [...pre, "-i", i, ...dur, "-vf", vf, "-loop", loopVal, o],
        outputExt: "gif",
        outputMime: "image/gif",
      };
    },
  },

  "gif-to-video": {
    accept: GIF_ACCEPT,
    controls: [],
    build: () => ({
      args: (i, o) => [
        "-i", i,
        "-movflags", "faststart",
        "-pix_fmt", "yuv420p",
        "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        o,
      ],
      outputExt: "mp4",
      outputMime: "video/mp4",
    }),
  },

  "gif-resize": {
    accept: GIF_ACCEPT,
    controls: [
      { key: "width", label: "Width (0 = auto)", type: "number", min: 0, max: 2000, default: 320, suffix: "px" },
      { key: "height", label: "Height (0 = auto)", type: "number", min: 0, max: 2000, default: 0, suffix: "px" },
    ],
    build: (s) => {
      const w = num(s.width, 0);
      const h = num(s.height, 0);
      const sw = w > 0 ? String(w) : "-1";
      const sh = h > 0 ? String(h) : "-1";
      const scale = w <= 0 && h <= 0 ? "iw:ih" : `${sw}:${sh}`;
      
      const cw = num(s.cropW, 0);
      const ch = num(s.cropH, 0);
      const cx = num(s.cropX, 0);
      const cy = num(s.cropY, 0);
      const cropStr = cw > 0 && ch > 0 ? `crop=${cw}:${ch}:${cx}:${cy},` : "";

      return {
        args: (i, o) => ["-i", i, "-vf", `${cropStr}scale=${scale}:flags=lanczos`, "-loop", "0", o],
        outputExt: "gif",
        outputMime: "image/gif",
      };
    },
  },

  "gif-crop": {
    accept: GIF_ACCEPT,
    controls: [],
    build: (s) => {
      const ratio = typeof s.ratio === "string" ? s.ratio : "1:1";
      const cw = num(s.cropW, 0);
      const ch = num(s.cropH, 0);
      const cx = num(s.cropX, 0);
      const cy = num(s.cropY, 0);
      const cropStr = cw > 0 && ch > 0 ? `crop=${cw}:${ch}:${cx}:${cy}` : cropFilter(ratio);
      
      return {
        args: (i, o) => ["-i", i, "-vf", cropStr, "-loop", "0", o],
        outputExt: "gif",
        outputMime: "image/gif",
      };
    },
  },

  "video-crop": {
    accept: VIDEO_ACCEPT,
    controls: [],
    build: (s) => {
      const ratio = typeof s.ratio === "string" ? s.ratio : "9:16";
      const cw = num(s.cropW, 0);
      const ch = num(s.cropH, 0);
      const cx = num(s.cropX, 0);
      const cy = num(s.cropY, 0);
      const cropStr = cw > 0 && ch > 0 ? `crop=${cw}:${ch}:${cx}:${cy}` : cropFilter(ratio);

      return {
        args: (i, o) => [
          "-i", i,
          "-vf", `${cropStr},scale=trunc(iw/2)*2:trunc(ih/2)*2`,
          "-pix_fmt", "yuv420p",
          o,
        ],
        outputExt: "mp4",
        outputMime: "video/mp4",
      };
    },
  },

  "video-resize": {
    accept: VIDEO_ACCEPT,
    controls: [
      {
        key: "height",
        label: "Resolution",
        type: "select",
        default: "720",
        options: [
          { label: "1080p", value: "1080" },
          { label: "720p", value: "720" },
          { label: "480p", value: "480" },
          { label: "360p", value: "360" },
        ],
      },
    ],
    build: (s) => {
      const h = num(s.height, 720);
      const cw = num(s.cropW, 0);
      const ch = num(s.cropH, 0);
      const cx = num(s.cropX, 0);
      const cy = num(s.cropY, 0);
      const cropStr = cw > 0 && ch > 0 ? `crop=${cw}:${ch}:${cx}:${cy},` : "";

      return {
        args: (i, o) => [
          "-i", i,
          "-vf", `${cropStr}scale=-2:${h}`,
          "-pix_fmt", "yuv420p",
          o,
        ],
        outputExt: "mp4",
        outputMime: "video/mp4",
      };
    },
  },

  "gif-compressor": {
    accept: GIF_ACCEPT,
    controls: [
      {
        key: "level",
        label: "Compression",
        type: "select",
        default: "medium",
        options: [
          { label: "Light (best quality)", value: "light" },
          { label: "Balanced", value: "medium" },
          { label: "Strong (smallest)", value: "strong" },
        ],
      },
    ],
    build: (s) => {
      const level = typeof s.level === "string" ? s.level : "medium";
      const map: Record<string, { fps: number; scale: string }> = {
        light: { fps: 15, scale: "iw*0.9:-1" },
        medium: { fps: 12, scale: "iw*0.75:-1" },
        strong: { fps: 10, scale: "iw*0.6:-1" },
      };
      const { fps, scale } = map[level] ?? map.medium;
      return {
        args: (i, o) => ["-i", i, "-vf", `fps=${fps},scale=${scale}:flags=lanczos`, "-loop", "0", o],
        outputExt: "gif",
        outputMime: "image/gif",
      };
    },
  },

  "video-compressor": {
    accept: VIDEO_ACCEPT,
    controls: [
      {
        key: "crf",
        label: "Quality",
        type: "select",
        default: "28",
        options: [
          { label: "High quality (larger)", value: "23" },
          { label: "Balanced", value: "28" },
          { label: "Small size", value: "32" },
        ],
      },
    ],
    build: (s) => {
      const crf = typeof s.crf === "string" ? s.crf : "28";
      return {
        args: (i, o) => [
          "-i", i,
          "-c:v", "libx264",
          "-crf", crf,
          "-preset", "veryfast",
          "-c:a", "aac",
          "-movflags", "faststart",
          "-pix_fmt", "yuv420p",
          o,
        ],
        outputExt: "mp4",
        outputMime: "video/mp4",
      };
    },
  },
};

export function getProcessor(slug: string): ToolProcessor | undefined {
  return PROCESSORS[slug];
}

export function defaultSettings(controls: Control[]): Settings {
  const s: Settings = {};
  for (const c of controls) s[c.key] = c.default;
  return s;
}

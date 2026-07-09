// Lazy, singleton ffmpeg.wasm loader.
//
// Uses the SINGLE-THREADED core so it works on GitHub Pages (and any static
// host) without the COOP/COEP cross-origin-isolation headers that the
// multi-threaded core requires. Everything runs locally in the browser —
// files are never uploaded.

import type { FFmpeg } from "@ffmpeg/ffmpeg";

const CORE_VERSION = "0.12.6";
const BASE_URL = `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/umd`;

let ffmpeg: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

export type ProgressHandler = (ratio: number) => void;

/** Load (once) and return the shared FFmpeg instance. */
export async function getFFmpeg(onLoadProgress?: ProgressHandler): Promise<FFmpeg> {
  if (ffmpeg) return ffmpeg;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { toBlobURL } = await import("@ffmpeg/util");

    const instance = new FFmpeg();

    if (onLoadProgress) {
      instance.on("progress", ({ progress }) => {
        onLoadProgress(Math.max(0, Math.min(1, progress)));
      });
    }

    await instance.load({
      coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    ffmpeg = instance;
    return instance;
  })();

  return loadPromise;
}

export function isFFmpegLoaded(): boolean {
  return ffmpeg !== null;
}

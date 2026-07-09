"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ToolIcon,
  ArrowRightIcon,
  CheckIcon,
  UploadIcon,
} from "@/components/Icons";
import { setPendingFile } from "@/lib/fileHandoff";

const TARGET = "/video-to-gif";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function HeroUploadPanel() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  function goToTool(selected: File) {
    setPendingFile({ file: selected });
    router.push(TARGET);
  }

  function handleConvert() {
    if (file) goToTool(file);
    else inputRef.current?.click();
  }

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-card sm:p-7">
        {/* header */}
        <div className="flex items-center gap-3">
          <span className="icon-tile h-10 w-10">
            <ToolIcon name="videoToGif" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">Video to GIF</p>
            <p className="text-xs text-muted">Fast, private, no watermark</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {file ? "Loaded" : "Ready"}
          </span>
        </div>

        {/* upload zone */}
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          hidden
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) setFile(f);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          className={`group relative mt-6 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed px-6 py-12 text-center transition-all duration-200 ${
            dragging
              ? "border-accent bg-accent/[0.06] scale-[0.99]"
              : "border-[color:var(--border)] hover:border-accent hover:bg-accent/[0.03]"
          }`}
        >
          {/* soft glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"
          />
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-accent text-[color:var(--accent-fg)] shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
            <UploadIcon className="h-6 w-6" />
          </span>
          {file ? (
            <div className="flex w-full flex-col items-center">
              <div className="mt-4 w-full max-w-[260px] px-2 sm:max-w-[320px]">
                <p className="truncate text-sm font-semibold" title={file.name}>
                  {file.name}
                </p>
              </div>
              <p className="mt-1 text-xs text-muted">{formatBytes(file.size)}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="mt-2 text-[11px] font-medium text-accent underline-offset-4 hover:underline"
              >
                Choose a different file
              </button>
            </div>
          ) : (
            <>
              <p className="mt-4 text-[15px] font-semibold">
                Drop your video here
              </p>
              <p className="mt-1 text-xs text-muted">
                or <span className="text-accent">browse files</span>
              </p>
              <p className="mt-3 text-[11px] tracking-wide text-muted">
                MP4 · MOV · AVI · WEBM&nbsp;&nbsp;→&nbsp;&nbsp;GIF
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleConvert}
          className="btn-primary mt-6 w-full rounded-xl py-3 text-[15px]"
        >
          {file ? "Convert to GIF" : "Upload a video"}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
          <CheckIcon className="h-3.5 w-3.5 text-accent" /> Processed on your
          device — nothing is uploaded
        </p>
      </div>
    </div>
  );
}

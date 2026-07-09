"use client";

import { useEffect, useRef, useState } from "react";
import {
  UploadIcon,
  SlidersIcon,
  DownloadIcon,
  CheckIcon,
  CloseIcon,
  ChevronIcon,
  RefreshIcon,
  GifCropIcon as CropIcon,
  MaximizeIcon,
  MinimizeIcon,
} from "@/components/Icons";
import { CropPopup } from "./CropPopup";
import type { Tool } from "@/lib/tools";
import { takePendingFile } from "@/lib/fileHandoff";
import { getFFmpeg } from "@/lib/ffmpeg";
import {
  getProcessor,
  defaultSettings,
  type Settings,
  type Control,
} from "@/lib/toolProcessing";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extOf(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : "bin";
}

/** A short human-readable summary of the current settings for the trigger row. */
function summarize(controls: Control[], settings: Settings): string {
  return controls
    .map((c) => {
      const v = settings[c.key] ?? c.default;
      if (c.type === "select") {
        return c.options.find((o) => o.value === String(v))?.label ?? String(v);
      }
      return `${v}${c.suffix ? ` ${c.suffix}` : ""}`;
    })
    .join(" · ");
}

type Status = "idle" | "loading" | "processing" | "done" | "error";

interface Result {
  url: string;
  name: string;
  size: number;
  mime: string;
}

export function ToolWorkspace({ tool }: { tool: Tool }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const processor = getProcessor(tool.slug);
  const [settings, setSettings] = useState<Settings>(() =>
    processor ? defaultSettings(processor.controls) : {}
  );

  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [outputOpen, setOutputOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);

  const resultUrlRef = useRef<string | null>(null);

  // Pick up a file handed off from another page (e.g. the home hero panel).
  useEffect(() => {
    const handoff = takePendingFile();
    if (handoff) setFile(handoff.file);
  }, []);

  // Revoke the object URL when it changes or on unmount to avoid leaks.
  useEffect(() => {
    return () => {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  function resetOutput() {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    setResult(null);
    setError(null);
    setStatus("idle");
    setProgress(0);
    setOutputOpen(false);
  }

  function chooseFile(f: File | null) {
    resetOutput();
    setFile(f);
    if (f && tool.category === "Crop") {
      setCropOpen(true);
    }
  }

  function updateSetting(key: string, value: number | string) {
    setSettings((s) => ({ ...s, [key]: value }));
    if (result || error) resetOutput();
  }

  const accept =
    processor?.accept ??
    (tool.inputFormats.includes("GIF") && tool.inputFormats.length === 1
      ? "image/gif"
      : "video/*,image/gif");

  const actionLabel =
    tool.category === "Convert"
      ? "Convert & Download"
      : tool.category === "Compress"
      ? "Compress"
      : `${tool.category} & Download`;

  const hasControls = !!processor && processor.controls.length > 0;
  const summary = hasControls ? summarize(processor!.controls, settings) : null;

  async function run() {
    if (!file || !processor) return;
    setError(null);
    setResult(null);
    setProgress(0);
    setStatus("loading");

    try {
      const ff = await getFFmpeg((r) => setProgress(r));

      const { args, outputExt, outputMime } = processor.build(settings);
      const inputName = `input.${extOf(file.name)}`;
      const outputName = `output.${outputExt}`;

      // Track conversion progress (separate from the one-time load progress).
      const onProgress = ({ progress: p }: { progress: number }) =>
        setProgress(Math.max(0, Math.min(1, p)));
      ff.on("progress", onProgress);

      setStatus("processing");
      setProgress(0);

      const buffer = new Uint8Array(await file.arrayBuffer());
      await ff.writeFile(inputName, buffer);
      await ff.exec(args(inputName, outputName));

      const data = (await ff.readFile(outputName)) as Uint8Array;
      ff.off("progress", onProgress);

      // Clean up the virtual FS so repeated runs don't accumulate.
      await ff.deleteFile(inputName).catch(() => {});
      await ff.deleteFile(outputName).catch(() => {});

      const blob = new Blob([data as unknown as BlobPart], { type: outputMime });
      const url = URL.createObjectURL(blob);
      resultUrlRef.current = url;

      const base = file.name.replace(/\.[^.]+$/, "");
      setResult({
        url,
        name: `${base}.${outputExt}`,
        size: blob.size,
        mime: outputMime,
      });
      setStatus("done");
      setProgress(1);
      setOutputOpen(true);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while processing your file."
      );
      setStatus("error");
    }
  }

  const busy = status === "loading" || status === "processing";
  const percent = Math.round(progress * 100);

  return (
    <div id="workspace" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 shadow-card sm:p-8">
        {busy && <ProcessingOverlay status={status} percent={percent} />}
        {settingsOpen && hasControls && (
          <SettingsPopup
            controls={processor!.controls}
            settings={settings}
            onChange={updateSetting}
            onClose={() => setSettingsOpen(false)}
          />
        )}
        {cropOpen && file && (
          <CropPopup
            file={file}
            defaultRatio={String(settings.ratio || "1:1")}
            onSave={(c, ratio) => {
              setSettings((s) => ({
                ...s,
                ratio,
                cropX: c.x,
                cropY: c.y,
                cropW: c.w,
                cropH: c.h,
              }));
              setCropOpen(false);
            }}
            onClose={() => setCropOpen(false)}
          />
        )}
        {outputOpen && result && (
          <OutputPopup
            result={result}
            onRunAgain={run}
            onClose={() => setOutputOpen(false)}
          />
        )}

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Drop zone */}
          <div>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files?.[0];
                if (f) chooseFile(f);
              }}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
              }}
              className={`flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center transition-colors ${
                dragging
                  ? "border-accent bg-accent/5"
                  : "border-[color:var(--border)] hover:border-accent"
              }`}
            >
              <input
                id="workspace-file-input"
                ref={inputRef}
                type="file"
                accept={accept}
                hidden
                onChange={(e) => {
                  chooseFile(e.target.files?.[0] ?? null);
                  e.target.value = "";
                }}
              />
              <span className="grid h-14 w-14 place-items-center rounded-lg bg-accent text-[color:var(--accent-fg)]">
                <UploadIcon className="h-7 w-7" />
              </span>
              {file ? (
                <div className="mt-5 flex w-full flex-col items-center">
                  <div className="w-full max-w-[260px] px-2 sm:max-w-[320px]">
                    <p className="truncate font-semibold" title={file.name}>
                      {file.name}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{formatBytes(file.size)}</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      chooseFile(null);
                    }}
                    className="mt-3 text-xs font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Choose a different file
                  </button>
                </div>
              ) : (
                <>
                  <p className="mt-5 font-semibold">
                    Drag &amp; drop your file here
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    or click to browse — {tool.inputFormats.join(", ")}
                  </p>
                </>
              )}
            </div>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
              <CheckIcon className="h-3.5 w-3.5 text-accent" />
              Files are processed privately in your browser — nothing is uploaded.
            </p>
          </div>

          {/* Settings trigger + action */}
          <div className="flex flex-col">
            {tool.category === "Crop" && file && (
              <button
                type="button"
                onClick={() => setCropOpen(true)}
                disabled={busy}
                className="mb-3 flex w-full items-center justify-between rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-alt)] px-4 py-3 text-left transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <CropIcon className="h-4 w-4 text-accent" /> Interactive Crop
                </span>
                <ChevronIcon className="h-4 w-4 -rotate-90 text-muted" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              disabled={!hasControls || busy}
              className="flex w-full items-center justify-between rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-alt)] px-4 py-3 text-left transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <SlidersIcon className="h-4 w-4 text-accent" /> Settings
              </span>
              <ChevronIcon className="h-4 w-4 -rotate-90 text-muted" />
            </button>

            {summary ? (
              <p className="mt-3 text-xs leading-relaxed text-muted">{summary}</p>
            ) : (
              <p className="mt-3 text-xs leading-relaxed text-muted">
                No settings needed — just upload and {tool.category.toLowerCase()}.
              </p>
            )}

            <button
              type="button"
              disabled={!file || busy || !processor}
              onClick={run}
              className="btn-primary mt-auto w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              <DownloadIcon className="h-4 w-4" />
              {busy ? "Working…" : actionLabel}
            </button>
            {result && !outputOpen ? (
              <button
                type="button"
                onClick={() => setOutputOpen(true)}
                className="mt-3 text-center text-xs font-medium text-accent underline-offset-4 hover:underline"
              >
                View result
              </button>
            ) : (
              <p className="mt-3 text-center text-[11px] text-muted">
                Runs entirely in your browser — the first run downloads the
                engine once.
              </p>
            )}
          </div>
        </div>

        {/* Errors surface below; the result itself lives in the popup only. */}
        {error && (
          <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

function SettingsPopup({
  controls,
  settings,
  onChange,
  onClose,
}: {
  controls: Control[];
  settings: Settings;
  onChange: (key: string, value: number | string) => void;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Close on Escape for keyboard users.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={`absolute inset-0 z-40 flex items-center justify-center backdrop-blur-md transition-all ${isExpanded ? "p-0" : "p-4"}`}
      style={{ backgroundColor: "rgb(var(--accent) / 0.1)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`flex flex-col overflow-hidden bg-[color:var(--card)] transition-all ${isExpanded ? "h-full w-full rounded-none border-0" : "max-h-[88%] w-[min(340px,92%)] rounded-xl border border-[color:var(--border)] shadow-card"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <SlidersIcon className="h-4 w-4 text-accent" /> Settings
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--fg)]"
              title={isExpanded ? "Minimize" : "Maximize"}
            >
              {isExpanded ? <MinimizeIcon className="h-4 w-4" /> : <MaximizeIcon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close settings"
              className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--fg)]"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
          {controls.map((c) => (
            <ControlField
              key={c.key}
              control={c}
              value={settings[c.key]}
              onChange={(v) => onChange(c.key, v)}
              disabled={false}
            />
          ))}
        </div>

        <div className="border-t border-[color:var(--border)] p-3">
          <button type="button" onClick={onClose} className="btn-primary w-full">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function ProcessingOverlay({
  status,
  percent,
}: {
  status: Status;
  percent: number;
}) {
  const loading = status === "loading";
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center rounded-xl p-4 backdrop-blur-md"
      style={{ backgroundColor: "rgb(var(--accent) / 0.06)" }}
    >
      <div className="w-[min(340px,90%)] rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 text-center shadow-card">
        <div className="mx-auto grid h-14 w-14 place-items-center">
          <svg
            className="h-14 w-14 animate-spin text-accent"
            viewBox="0 0 50 50"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              className="opacity-20"
            />
            <path
              d="M25 5 a20 20 0 0 1 20 20"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="mt-4 font-semibold">
          {loading ? "Loading engine…" : "Processing your file…"}
        </p>
        <p className="mt-1 text-xs text-muted">
          {loading
            ? "One-time download — this runs entirely in your browser."
            : "Crunching frames privately on your device."}
        </p>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[color:var(--bg-alt)]">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-200"
            style={{ width: `${Math.max(6, percent)}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-semibold tabular-nums text-accent">
          {percent}%
        </p>
      </div>
    </div>
  );
}

function OutputPopup({
  result,
  onRunAgain,
  onClose,
}: {
  result: Result;
  onRunAgain: () => void;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={`absolute inset-0 z-40 flex items-center justify-center backdrop-blur-md transition-all ${isExpanded ? "p-0" : "p-4"}`}
      style={{ backgroundColor: "rgb(var(--accent) / 0.1)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`flex flex-col overflow-hidden bg-[color:var(--card)] transition-all ${isExpanded ? "h-full w-full rounded-none border-0" : "max-h-[88%] w-[min(320px,90%)] rounded-xl border border-[color:var(--border)] shadow-card"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <CheckIcon className="h-4 w-4 text-accent" /> Your file is ready
          </h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--fg)]"
              title={isExpanded ? "Minimize" : "Maximize"}
            >
              {isExpanded ? <MinimizeIcon className="h-4 w-4" /> : <MaximizeIcon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onRunAgain}
              aria-label="Run again"
              className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--fg)]"
            >
              <RefreshIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--fg)]"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-alt)]">
            {result.mime.startsWith("video") ? (
              <video
                src={result.url}
                controls
                loop
                autoPlay
                muted
                className="mx-auto max-h-40 w-auto max-w-full bg-black object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.url}
                alt="Converted result preview"
                className="mx-auto max-h-40 w-auto max-w-full object-contain"
              />
            )}
          </div>
          <p className="mt-3 break-all text-center text-xs text-muted">
            {result.name} · {formatBytes(result.size)}
          </p>
        </div>

        <div className="space-y-2 border-t border-[color:var(--border)] p-3">
          <a
            href={result.url}
            download={result.name}
            className="btn-primary w-full"
          >
            <DownloadIcon className="h-4 w-4" />
            Download {result.name.split(".").pop()?.toUpperCase()}
          </a>
        </div>
      </div>
    </div>
  );
}

function ControlField({
  control,
  value,
  onChange,
  disabled,
}: {
  control: Control;
  value: number | string | undefined;
  onChange: (v: number | string) => void;
  disabled: boolean;
}) {
  if (control.type === "select") {
    return (
      <label className="block rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-alt)] px-4 py-3">
        <span className="text-sm font-medium">{control.label}</span>
        <select
          value={String(value ?? control.default)}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="mt-2 w-full rounded-md border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm outline-none focus:border-accent disabled:opacity-50"
        >
          {control.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (control.type === "range") {
    const current = typeof value === "number" ? value : control.default;
    return (
      <label className="block rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-alt)] px-4 py-3">
        <span className="flex items-center justify-between text-sm font-medium">
          {control.label}
          <span className="text-xs text-muted">
            {current}
            {control.suffix ? ` ${control.suffix}` : ""}
          </span>
        </span>
        <input
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={current}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="mt-2 w-full accent-[color:var(--accent)] disabled:opacity-50"
        />
      </label>
    );
  }

  // number
  const current = typeof value === "number" ? value : control.default;
  return (
    <label className="flex items-center justify-between gap-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-alt)] px-4 py-3">
      <span className="text-sm font-medium">{control.label}</span>
      <span className="flex items-center gap-1.5">
        <input
          type="number"
          min={control.min}
          max={control.max}
          value={current}
          placeholder={control.placeholder}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="w-20 rounded-md border border-[color:var(--border)] bg-[color:var(--card)] px-2 py-1.5 text-right text-sm outline-none focus:border-accent disabled:opacity-50"
        />
        {control.suffix && (
          <span className="text-xs text-muted">{control.suffix}</span>
        )}
      </span>
    </label>
  );
}

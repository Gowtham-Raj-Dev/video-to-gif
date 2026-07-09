// A tiny in-memory handoff so a file picked on one page (e.g. the home hero)
// can be consumed by the tool workspace after client-side navigation.
// App Router client navigation keeps the JS runtime alive, so this survives.

export interface FileHandoff {
  file: File;
  fps?: number;
  quality?: number;
}

let pending: FileHandoff | null = null;

export function setPendingFile(handoff: FileHandoff | null) {
  pending = handoff;
}

export function takePendingFile(): FileHandoff | null {
  const value = pending;
  pending = null;
  return value;
}

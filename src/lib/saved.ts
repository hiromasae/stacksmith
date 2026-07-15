/**
 * localStorage-backed store of saved stack slugs.
 *
 * Shape: key "stacksmith:saved:v1" holds a JSON array of slugs. All reads are
 * SSR-safe (window access is guarded) and `subscribe`/`getSavedSlugs` are
 * designed for `useSyncExternalStore`: same-tab writes fire a custom event,
 * cross-tab writes arrive via the browser's "storage" event, and snapshots
 * are referentially stable until the underlying value actually changes.
 */

const STORAGE_KEY = "stacksmith:saved:v1";
const CHANGE_EVENT = "stacksmith:saved-change";

/** Stable empty snapshot — also the server snapshot for useSyncExternalStore. */
const EMPTY: readonly string[] = [];

// Snapshot cache so getSavedSlugs() returns the same array reference until
// the stored value changes (useSyncExternalStore requires stable snapshots).
let cachedRaw: string | null = null;
let cachedSlugs: readonly string[] = EMPTY;

function read(): readonly string[] {
  if (typeof window === "undefined") return EMPTY;

  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY; // storage unavailable (privacy mode, etc.)
  }

  if (raw === cachedRaw) return cachedSlugs;

  cachedRaw = raw;
  if (raw === null) {
    cachedSlugs = EMPTY;
  } else {
    try {
      const parsed: unknown = JSON.parse(raw);
      cachedSlugs = Array.isArray(parsed)
        ? parsed.filter((s): s is string => typeof s === "string")
        : EMPTY;
    } catch {
      cachedSlugs = EMPTY; // corrupted value — treat as nothing saved
    }
  }
  return cachedSlugs;
}

function write(slugs: readonly string[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    return; // storage full/unavailable — keep current state
  }
  // Same-tab notification; other tabs get the native "storage" event.
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Current saved slugs (most recently saved last). Empty array on the server. */
export function getSavedSlugs(): readonly string[] {
  return read();
}

/** Server snapshot for useSyncExternalStore — always the unsaved state. */
export function getServerSavedSlugs(): readonly string[] {
  return EMPTY;
}

export function isSaved(slug: string): boolean {
  return read().includes(slug);
}

/** Save the slug if unsaved, remove it if saved. No-op on the server. */
export function toggleSaved(slug: string): void {
  if (typeof window === "undefined") return;
  const current = read();
  write(
    current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug],
  );
}

/**
 * Subscribe to changes (same-tab custom event + cross-tab "storage").
 * Returns an unsubscribe function. Safe to call during SSR (no-op).
 */
export function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    // key === null means the whole store was cleared.
    if (event.key === null || event.key === STORAGE_KEY) onChange();
  };

  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", handleStorage);
  };
}

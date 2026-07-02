"use client";

import { useCallback, useSyncExternalStore } from "react";

const EMPTY: string[] = [];
const cache = new Map<string, { raw: string; parsed: string[] }>();

function eventName(key: string) {
  return `bh-idset:${key}`;
}

function readParsed(key: string): string[] {
  const raw = window.localStorage.getItem(key) ?? "[]";
  const cached = cache.get(key);
  if (cached && cached.raw === raw) return cached.parsed;
  let parsed: string[] = [];
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = [];
  }
  cache.set(key, { raw, parsed });
  return parsed;
}

function writeParsed(key: string, next: string[]) {
  const raw = JSON.stringify(next);
  window.localStorage.setItem(key, raw);
  cache.set(key, { raw, parsed: next });
  window.dispatchEvent(new Event(eventName(key)));
}

function subscribe(key: string, callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(eventName(key), callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(eventName(key), callback);
  };
}

/**
 * A list of listing ids backed by localStorage, read via
 * useSyncExternalStore so it hydrates safely (server snapshot is always
 * empty) and stays in sync across components and browser tabs.
 */
export function useIdSet(storageKey: string) {
  const ids = useSyncExternalStore(
    useCallback((cb) => subscribe(storageKey, cb), [storageKey]),
    () => readParsed(storageKey),
    () => EMPTY
  );

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const add = useCallback(
    (id: string) => {
      const current = readParsed(storageKey);
      if (!current.includes(id)) writeParsed(storageKey, [...current, id]);
    },
    [storageKey]
  );

  const remove = useCallback(
    (id: string) => {
      const current = readParsed(storageKey);
      writeParsed(
        storageKey,
        current.filter((existing) => existing !== id)
      );
    },
    [storageKey]
  );

  const toggle = useCallback(
    (id: string) => {
      const current = readParsed(storageKey);
      writeParsed(
        storageKey,
        current.includes(id) ? current.filter((existing) => existing !== id) : [...current, id]
      );
    },
    [storageKey]
  );

  const clear = useCallback(() => writeParsed(storageKey, []), [storageKey]);

  return { ids, has, add, remove, toggle, clear, count: ids.length };
}

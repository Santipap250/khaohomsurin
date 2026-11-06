"use client";

import { useCallback, useSyncExternalStore } from "react";
import { z } from "zod";
import type { CartItem } from "@/types";

const KEY = "khs-cart-v1";
const schema = z.array(
  z.object({
    productId: z.string().max(80),
    variantId: z.string().max(80),
    qty: z.number().int().min(1).max(99),
  }),
);

const EMPTY: CartItem[] = [];
let cache: { raw: string | null; items: CartItem[] } = { raw: null, items: EMPTY };
const listeners = new Set<() => void>();

function read(): CartItem[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cache.items;
  }
  if (raw === cache.raw) return cache.items;
  let items = EMPTY;
  if (raw) {
    try {
      const parsed = schema.safeParse(JSON.parse(raw));
      if (parsed.success) items = parsed.data;
    } catch {
      items = EMPTY;
    }
  }
  cache = { raw, items };
  return items;
}

function write(items: CartItem[]) {
  const raw = JSON.stringify(items);
  try {
    window.localStorage.setItem(KEY, raw);
  } catch {
    // Storage blocked (private mode / quota): keep working in memory for this session.
  }
  cache = { raw, items };
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const noopSubscribe = () => () => {};

export function useCart() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const add = useCallback((productId: string, variantId: string, qty = 1) => {
    const current = read();
    const found = current.find((i) => i.productId === productId && i.variantId === variantId);
    write(
      found
        ? current.map((i) => (i === found ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
        : [...current, { productId, variantId, qty: Math.min(99, qty) }],
    );
  }, []);

  const setQty = useCallback((productId: string, variantId: string, qty: number) => {
    const next = Math.max(0, Math.min(99, Math.floor(qty)));
    write(
      read()
        .map((i) => (i.productId === productId && i.variantId === variantId ? { ...i, qty: next } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  const remove = useCallback((productId: string, variantId: string) => {
    write(read().filter((i) => !(i.productId === productId && i.variantId === variantId)));
  }, []);

  const clear = useCallback(() => write([]), []);

  const count = items.reduce((n, i) => n + i.qty, 0);
  return { items, hydrated, count, add, setQty, remove, clear };
}

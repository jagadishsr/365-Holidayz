import { useCallback, useEffect, useState } from 'react';
import type { HappyClientGalleryItem } from '../types';
import {
  HAPPY_CLIENTS_CSV_URL,
  parseHappyClientsCsv
} from '../utils/happyClientsParser';

const CACHE_KEY = '365holidayz_happy_clients_gallery_v1';
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchHappyClientsGallery(): Promise<HappyClientGalleryItem[]> {
  // 1. Primary source: same-origin endpoint that parses in-cell images + pasted URLs from Sheet2 htmlview
  try {
    const res = await fetch(`/api/happy-clients-sheet?_cb=${Date.now()}`, {
      cache: 'no-store'
    });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = (await res.json()) as { items?: HappyClientGalleryItem[] };
      if (Array.isArray(data.items) && data.items.length > 0) {
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ items: data.items, ts: Date.now() }));
          } catch {
            // Ignore quota issues
          }
        }
        return data.items;
      }
    }
  } catch {
    // Fall through to CORS CSV endpoint
  }

  // 2. Direct CORS CSV fallback (captures any pasted image URLs cleanly even on static-only hosts)
  try {
    const csvRes = await fetch(`${HAPPY_CLIENTS_CSV_URL}&_cb=${Date.now()}`, {
      cache: 'no-store'
    });
    if (csvRes.ok) {
      const csvText = await csvRes.text();
      const csvItems = parseHappyClientsCsv(csvText);
      if (csvItems.length > 0) {
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ items: csvItems, ts: Date.now() }));
          } catch {
            // Ignore quota issues
          }
        }
        return csvItems;
      }
    }
  } catch {
    // Fall through to local fallback cache if offline
  }

  // 3. Offline cached fallback
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { items?: HappyClientGalleryItem[] };
        if (Array.isArray(parsed.items)) return parsed.items;
      }
    } catch {
      // Ignore storage errors
    }
  }

  return [];
}

export function useHappyClientsGallery() {
  const [items, setItems] = useState<HappyClientGalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const load = useCallback(async () => {
    const nextItems = await fetchHappyClientsGallery();
    setItems(nextItems);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const intervalId = window.setInterval(() => {
      load();
    }, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [load]);

  return { items, loading, refresh: load };
}

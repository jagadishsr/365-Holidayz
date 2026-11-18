import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  HAPPY_CLIENTS_HTMLVIEW_URL,
  parseHappyClientsHtml
} from '../src/utils/happyClientsParser';

interface ApiResponse extends ServerResponse {
  status?: (code: number) => ApiResponse;
  json?: (data: unknown) => void;
}

export default async function handler(_req: IncomingMessage, res: ApiResponse) {
  try {
    const upstreamUrl = `${HAPPY_CLIENTS_HTMLVIEW_URL}&_cb=${Date.now()}`;
    const response = await fetch(upstreamUrl, {
      headers: {
        'User-Agent': '365Holidayz-Gallery-Sync/1.0',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Google Sheets htmlview returned HTTP ${response.status}`);
    }

    const html = await response.text();
    const items = parseHappyClientsHtml(html);

    const payload = JSON.stringify({
      items,
      source: 'google-sheet-htmlview',
      syncedAt: new Date().toISOString()
    });

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.statusCode = 200;
    res.end(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch Happy Clients sheet';
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.statusCode = 502;
    res.end(JSON.stringify({ items: [], error: message }));
  }
}

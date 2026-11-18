import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {
  HAPPY_CLIENTS_HTMLVIEW_URL,
  parseHappyClientsHtml,
} from './src/utils/happyClientsParser';

function happyClientsApiPlugin(): Plugin {
  return {
    name: 'happy-clients-sheet-api',
    configureServer(server) {
      server.middlewares.use('/api/happy-clients-sheet', async (_req, res) => {
        try {
          const upstreamUrl = `${HAPPY_CLIENTS_HTMLVIEW_URL}&_cb=${Date.now()}`;
          const response = await fetch(upstreamUrl, {
            headers: {
              'User-Agent': '365Holidayz-Gallery-Sync/1.0',
              'Cache-Control': 'no-cache',
            },
          });
          if (!response.ok) {
            throw new Error(`Google Sheets returned HTTP ${response.status}`);
          }
          const html = await response.text();
          const items = parseHappyClientsHtml(html);

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store, max-age=0');
          res.statusCode = 200;
          res.end(
            JSON.stringify({
              items,
              source: 'google-sheet-htmlview',
              syncedAt: new Date().toISOString(),
            })
          );
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Failed to fetch Happy Clients sheet';
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store, max-age=0');
          res.statusCode = 502;
          res.end(JSON.stringify({items: [], error: message}));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), happyClientsApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

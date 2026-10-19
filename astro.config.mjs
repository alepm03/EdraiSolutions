// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://edraisolutions.es',
  devToolbar: { enabled: false },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        // The Barranco agent only allows a fixed list of origins. In dev this
        // proxy sets that Origin server-side, same trick as the production repo.
        '/api/barranco': {
          target: 'https://barranco-agent-edge.vercel.app',
          changeOrigin: true,
          rewrite: () => '/barranco-agent',
          headers: { Origin: 'http://localhost:5173' },
        },
      },
    },
  },
});

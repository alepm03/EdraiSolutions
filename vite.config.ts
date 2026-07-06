import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: '/',   // 👈 MUY IMPORTANTE para GitHub Pages
    server: {
      // 5173 porque el CORS del bot del Barranco (demo real) permite localhost:5173 en dev.
      port: 5173,
      host: '0.0.0.0',
    },
    plugins: [react(), tailwindcss()],
    define: {
      // Worker URL is not a secret — safe to embed in the bundle.
      // The actual GEMINI_API_KEY lives in the Cloudflare Worker (cf-worker/).
      // env = loadEnv (reads .env files, works locally)
      // process.env = OS environment (used by GitHub Actions secrets)
      'process.env.WORKER_URL': JSON.stringify(env.VITE_WORKER_URL || process.env.VITE_WORKER_URL || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});


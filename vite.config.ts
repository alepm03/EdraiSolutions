import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: '/',   // 👈 MUY IMPORTANTE para GitHub Pages
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        // El CORS del bot del Barranco solo permite localhost:5173; este proxy
        // fija ese Origin server-side para poder probar el demo real en dev
        // desde cualquier puerto.
        '/api/barranco': {
          target: 'https://barranco-agent-edge.vercel.app',
          changeOrigin: true,
          rewrite: () => '/barranco-agent',
          headers: { Origin: 'http://localhost:5173' },
        },
      },
    },
    plugins: [react(), tailwindcss()],
    define: {
      // Worker URL is not a secret — safe to embed in the bundle.
      // The actual GEMINI_API_KEY lives in the Cloudflare Worker (cf-worker/).
      // env = loadEnv (reads .env files, works locally)
      // process.env = OS environment (used by GitHub Actions secrets)
      'process.env.WORKER_URL': JSON.stringify(
        env.VITE_WORKER_URL ||
        process.env.VITE_WORKER_URL ||
        // Fallback para dev local sin .env.local. No es un secreto: la URL ya es
        // visible en el bundle de producción; la key de Gemini vive en el Worker.
        'https://edrai-gemini-proxy.ricardopichardo.workers.dev'
      ),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});


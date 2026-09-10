/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_N8N_WEBHOOK_URL: string;
  readonly VITE_WORKER_URL: string;
  /** Project API Key de PostHog. Pública y de solo escritura. */
  readonly VITE_POSTHOG_KEY?: string;
  /** Host de ingesta. Por defecto Cloud EU; se puede apuntar al proxy /ph del Worker. */
  readonly VITE_POSTHOG_HOST?: string;
  /** 'cookieless' (por defecto, sin banner) | 'consent' (banner + session replay). */
  readonly VITE_POSTHOG_MODE?: 'cookieless' | 'consent';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

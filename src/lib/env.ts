// Public endpoints (not secrets: they are visible in the production bundle).
// The Gemini key lives in the Cloudflare Worker; the Barranco agent runs on Vercel.
export const WORKER_URL: string =
  import.meta.env.PUBLIC_WORKER_URL || 'https://edrai-gemini-proxy.ricardopichardo.workers.dev';

export const BARRANCO_API_URL: string =
  import.meta.env.PUBLIC_BARRANCO_API_URL ||
  (import.meta.env.DEV ? '/api/barranco' : 'https://barranco-agent-edge.vercel.app/barranco-agent');

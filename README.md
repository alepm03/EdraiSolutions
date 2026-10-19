# Edrai Solutions: web corporativa

Web de [Edrai Solutions](https://edraisolutions.es), agencia de IA de Madrid: agentes de IA, software a medida, automatización y consultoría para pymes de servicios.

## Stack

- **Frontend:** Astro 7 (una página estática por ruta) con islas React 19 para lo interactivo (consola del hero, demos de chat, chat flotante, formulario), Tailwind CSS v4, GSAP + ScrollTrigger y Lenis.
- **Transiciones entre páginas:** View Transitions de Astro (`ClientRouter`). El nav y el chat persisten; el título de cada servicio se transforma desde su tarjeta de la home.
- **Backend de IA:** Cloudflare Worker (`cf-worker/`), proxy de Gemini y endpoint `/contact` que reenvía los leads a n8n.
- **Demo real:** agente del Mercado del Barranco (Vercel Edge).
- **Despliegue:** GitHub Pages con cada push a `main` (`.github/workflows/deploy.yml`).

## Estructura

- `src/pages/`: rutas (home, `[service].astro` para los cuatro servicios, casos, contacto, sobre nosotros, legal).
- `src/components/`: secciones en Astro; `src/components/react/`: islas React.
- `src/data/site.ts`: todo el contenido. **Las cifras del Mercado del Barranco (`MONTHLY`) se actualizan a mano cada mes** desde Supabase `barranco-agent`.
- `src/scripts/motion.ts`: scroll suave, GSAP y efectos que se reenganchan en cada navegación.
- `public/video/`: película de 45 s, bucle, reels verticales y clips de las páginas de servicio.
- `DESIGN.md` y `PRODUCT.md`: sistema de diseño y contexto de producto.

## Setup local

Requiere Node 22.12 o superior.

```bash
npm install
cp .env.local.example .env.local
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/ en local
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `PUBLIC_WORKER_URL` | URL del Cloudflare Worker (chat con IA y formulario). En el despliegue sale del secret `VITE_WORKER_URL`. |
| `PUBLIC_BARRANCO_API_URL` | Endpoint del agente del Barranco. Vacío: URL de producción (en desarrollo pasa por el proxy `/api/barranco`). |
| `PUBLIC_POSTHOG_KEY`, `PUBLIC_POSTHOG_HOST`, `PUBLIC_POSTHOG_MODE` | Analítica PostHog sin cookies (ver `docs/ANALITICA.md`). |

> Las claves de API (Gemini, OpenAI, etc.) **no se almacenan en el frontend**. Viven como secretos en el Cloudflare Worker (`cf-worker/`).

## Desplegar el Worker

```bash
cd cf-worker
npx wrangler deploy
```

## Equipo

- **Ricardo Pichardo**, Co-Founder & CEO · [LinkedIn](https://www.linkedin.com/in/ricardopichardo)
- **Alejandro Pichardo**, Co-Founder & CTO · [LinkedIn](https://www.linkedin.com/in/alejandro-pichardo-036478392/)

---

[edraisolutions.es](https://edraisolutions.es) · ricardopichardo@edraisolutions.es

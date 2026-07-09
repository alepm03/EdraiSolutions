# Edrai Solutions — Web corporativa

Web de [Edrai Solutions](https://edraisolutions.es), agencia de automatización con IA para negocios en España.

## Stack

- **Frontend:** React 19 · TypeScript · Vite · Tailwind CSS
- **AI Backend:** Cloudflare Workers (proxy Gemini/OpenAI)
- **Automatizaciones:** n8n (flujos de trabajo y demos en vivo)

## Setup local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Copiar el archivo de variables de entorno y rellenarlo:
   ```bash
   cp .env.local.example .env.local
   ```

3. Arrancar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   → Disponible en `http://localhost:3000`

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_WORKER_URL` | URL del Cloudflare Worker desplegado (proxy de IA para chatbots y formulario) |
| `VITE_N8N_WEBHOOK_URL` | URL del webhook del chatbot del Mercado del Barranco (demo de integración real) |

> Las claves de API (Gemini, OpenAI, etc.) **no se almacenan en el frontend**. Viven como secretos en el Cloudflare Worker (`cf-worker/`).

## Desplegar el Worker

```bash
cd cf-worker
npx wrangler deploy
```

## Equipo

- **Ricardo Pichardo** — Co-Founder & CEO · [LinkedIn](https://www.linkedin.com/in/ricardopichardo)
- **Alejandro Pichardo** — Co-Founder & CTO · [LinkedIn](https://www.linkedin.com/in/alejandro-pichardo-036478392/)

---

[edraisolutions.es](https://edraisolutions.es) · info@edraisolutions.es

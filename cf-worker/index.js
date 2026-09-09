/**
 * Cloudflare Worker — Gemini API Proxy + Contact Email
 *
 * Secrets (store with wrangler secret put):
 *   GEMINI_API_KEY    — Google AI Studio key
 *   N8N_WEBHOOK_URL   — n8n webhook URL for sending lead emails via Gmail
 *   POSTHOG_API_KEY   — PostHog Project API Key (analítica de servidor, opcional)
 *
 * Routes:
 *   POST /          → Gemini 2.5 Flash proxy
 *   POST /contact   → Forward lead to n8n webhook → Gmail send
 *   ANY  /ph/*      → Reverse proxy de PostHog (esquiva bloqueadores)
 *
 * Deploy:
 *   npx wrangler deploy
 *   npx wrangler secret put GEMINI_API_KEY
 *   npx wrangler secret put N8N_WEBHOOK_URL
 *   npx wrangler secret put POSTHOG_API_KEY
 */

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/**
 * CORS — only allow requests from the production GitHub Pages domain
 * and localhost for local development.
 */
const ALLOWED_ORIGINS = new Set([
  "https://edraisolutions.es",
  "https://www.edraisolutions.es",
  "https://alepm03.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

function getCorsHeaders(requestOrigin) {
  const isAllowed = ALLOWED_ORIGINS.has(requestOrigin);
  return {
    ...(isAllowed ? { "Access-Control-Allow-Origin": requestOrigin } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

// ---------------------------------------------------------------------------
// PostHog — analítica de servidor
//
// Los eventos de servidor son la verdad del embudo: el front puede fallar, tener
// un bloqueador o cerrarse a mitad, pero si el lead llegó aquí, llegó. Se emiten
// con distinct_id = email, el mismo identificador que usa `identifyLead()` en el
// front, así el recorrido anónimo y el lead quedan unidos sin usar cookies.
//
// Secrets (npx wrangler secret put ...):
//   POSTHOG_API_KEY   Project API Key (la pública, de solo escritura)
//   POSTHOG_HOST      opcional, por defecto Cloud EU
// ---------------------------------------------------------------------------

const POSTHOG_DEFAULT_HOST = "https://eu.i.posthog.com";
const POSTHOG_ASSET_HOST = "https://eu-assets.i.posthog.com";

async function capture(env, { event, distinctId, properties = {} }) {
  if (!env.POSTHOG_API_KEY || !distinctId) return;
  const host = env.POSTHOG_HOST || POSTHOG_DEFAULT_HOST;
  try {
    await fetch(`${host}/i/v0/e/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: env.POSTHOG_API_KEY,
        event,
        distinct_id: distinctId,
        properties: { ...properties, $lib: "edrai-cf-worker" },
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    // La analítica nunca debe tumbar el envío de un lead.
    console.error("[PostHog] capture error:", err);
  }
}

/**
 * Proxy inverso de PostHog bajo /ph/*. Sirviendo la ingesta desde el dominio del
 * Worker, los bloqueadores de anuncios dejan de comerse entre un 10% y un 30% de
 * los eventos. Se activa poniendo VITE_POSTHOG_HOST=<worker>/ph en el build del
 * front; mientras no se ponga, esta ruta simplemente no se llama.
 */
async function handlePostHogProxy(request) {
  const url = new URL(request.url);
  const ruta = url.pathname.replace(/^\/ph/, "") || "/";
  // Los estáticos (el propio script y la config del proyecto) los sirve el host
  // de assets; la ingesta y las flags, el host de API.
  const esEstatico = ruta.startsWith("/static/") || ruta.startsWith("/array/");
  const destino = new URL(
    ruta + url.search,
    esEstatico ? POSTHOG_ASSET_HOST : POSTHOG_DEFAULT_HOST,
  );

  const cabeceras = new Headers(request.headers);
  cabeceras.set("Host", destino.hostname);

  return fetch(destino.toString(), {
    method: request.method,
    headers: cabeceras,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
  });
}

// ---------------------------------------------------------------------------
// Email helpers
// ---------------------------------------------------------------------------

function buildEmailHtml({ name, email, phone, message, source, date }) {
  const esc = (s) => String(s || "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Nuevo Lead — Edrai Solutions</title></head>
<body style="font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);">
    <div style="background:#0891b2;padding:24px 32px;">
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">&#128233; Nuevo Lead — Edrai Solutions</h1>
      <p style="color:#cffafe;margin:4px 0 0;font-size:13px;">Origen: ${esc(source)} &middot; ${esc(date)}</p>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr style="background:#f0f9ff;">
          <td style="padding:10px 16px;font-weight:700;color:#0e7490;width:140px;">Nombre</td>
          <td style="padding:10px 16px;color:#111;">${esc(name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-weight:700;color:#0e7490;">Email</td>
          <td style="padding:10px 16px;color:#111;">${esc(email)}</td>
        </tr>
        <tr style="background:#f0f9ff;">
          <td style="padding:10px 16px;font-weight:700;color:#0e7490;">Tel&eacute;fono</td>
          <td style="padding:10px 16px;color:#111;">${esc(phone)}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-weight:700;color:#0e7490;">Mensaje&nbsp;/&nbsp;Contexto</td>
          <td style="padding:10px 16px;color:#111;white-space:pre-wrap;">${esc(message)}</td>
        </tr>
        <tr style="background:#f0f9ff;">
          <td style="padding:10px 16px;font-weight:700;color:#0e7490;">Origen</td>
          <td style="padding:10px 16px;color:#111;">${esc(source)}</td>
        </tr>
      </table>
    </div>
    <div style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">
        Generado automáticamente por el sistema de contacto de Edrai Solutions.
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// /contact handler
// ---------------------------------------------------------------------------

async function handleContact(request, env, corsHeaders, ctx) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  const { name, email, phone, message, source = "web", analytics_id } = body;

  if (!name || !email) {
    return new Response(
      JSON.stringify({ error: "name and email are required" }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  const date = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });
  const subject = `[Lead - ${source}] ${name} — ${date}`;
  const html = buildEmailHtml({ name, email, phone, message, source, date });

  const idAnalitica = String(email).trim().toLowerCase();
  const propiedadesLead = {
    origen_lead: source,
    tiene_telefono: Boolean(phone),
    tiene_mensaje: Boolean(message && String(message).trim()),
    visita_id: analytics_id || null,
  };

  ctx?.waitUntil(
    capture(env, {
      event: "lead_recibido",
      distinctId: idAnalitica,
      properties: {
        ...propiedadesLead,
        // $set puebla la ficha de la persona en PostHog. El nombre y el teléfono
        // se guardan aquí porque ya se están tratando para contactar con el lead,
        // con el consentimiento que dio en el formulario.
        $set: { nombre: name, telefono: phone || null, origen_lead: source },
      },
    }),
  );

  try {
    const n8nRes = await fetch(env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, html, name, email, phone, message, source, date }),
    });

    if (!n8nRes.ok) {
      const errText = await n8nRes.text();
      console.error("n8n webhook error:", n8nRes.status, errText);
      ctx?.waitUntil(capture(env, {
        event: "lead_email_fallido",
        distinctId: idAnalitica,
        properties: { ...propiedadesLead, estado: n8nRes.status },
      }));
      return new Response(
        JSON.stringify({ error: "Email service error", status: n8nRes.status }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    ctx?.waitUntil(capture(env, {
      event: "lead_email_enviado",
      distinctId: idAnalitica,
      properties: propiedadesLead,
    }));

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (err) {
    console.error("Contact handler error:", err);
    ctx?.waitUntil(capture(env, {
      event: "lead_email_fallido",
      distinctId: idAnalitica,
      properties: { ...propiedadesLead, estado: "excepcion" },
    }));
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
}

// ---------------------------------------------------------------------------
// Main fetch handler
// ---------------------------------------------------------------------------

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = getCorsHeaders(request.headers.get("Origin") ?? "");

    // Proxy de PostHog: se resuelve antes que nada porque necesita GET y sus
    // propias cabeceras CORS, que vienen ya en la respuesta de PostHog.
    if (new URL(request.url).pathname.startsWith("/ph")) {
      return handlePostHogProxy(request);
    }

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    // Route by pathname
    const url = new URL(request.url);
    if (url.pathname === "/contact") {
      return handleContact(request, env, corsHeaders, ctx);
    }

    // Default route: Gemini proxy
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { messages, systemInstruction, temperature = 0.7 } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Build the Gemini REST request payload
    const geminiPayload = {
      contents: messages.map((m) => ({
        role: m.role === "model" ? "model" : "user",
        parts: [{ text: m.text }],
      })),
      generationConfig: { temperature },
      ...(systemInstruction && {
        systemInstruction: { parts: [{ text: systemInstruction }] },
      }),
    };

    try {
      const geminiRes = await fetch(
        `${GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(geminiPayload),
        }
      );

      if (!geminiRes.ok) {
        const errText = await geminiRes.text();
        console.error("Gemini API error:", geminiRes.status, errText);
        return new Response(
          JSON.stringify({ error: "Gemini API error", status: geminiRes.status }),
          { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const data = await geminiRes.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Lo siento, no pude generar una respuesta.";

      return new Response(
        JSON.stringify({ text }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    } catch (err) {
      console.error("Worker fetch error:", err);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
  },
};

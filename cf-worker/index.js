/**
 * Cloudflare Worker — Gemini API Proxy
 *
 * Keeps GEMINI_API_KEY server-side (stored as a Worker secret).
 * The frontend sends messages here; this worker forwards them to Google
 * and returns only the model's text response.
 *
 * Deploy:
 *   npx wrangler deploy
 *   npx wrangler secret put GEMINI_API_KEY   ← paste key when prompted
 */

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * CORS — only allow requests from the production GitHub Pages domain
 * and localhost for local development.
 */
const ALLOWED_ORIGINS = [
  "https://alepm03.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function getCorsHeaders(requestOrigin) {
  const origin = ALLOWED_ORIGINS.includes(requestOrigin)
    ? requestOrigin
    : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request.headers.get("Origin") ?? "");

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geminiPayload),
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

# Auditoría web edraisolutions.es — Julio 2026

Auditoría de UI/UX, SEO, rendimiento, accesibilidad y conversión de la landing.
Stack: React 19 + Vite + Tailwind 4 + GSAP · Deploy: GitHub Pages (workflow `deploy.yml`) · Backend: Cloudflare Worker + n8n.

## ✅ Quick wins (aplicados en esta rama)

| Área | Hallazgo | Fix |
|------|----------|-----|
| Demo | Ejemplo obsoleto "Centro Deportivo" | Rebrand a **Mercado del Barranco** (caso real), textos en `DEMO_CONFIG` para swap fácil |
| SEO | `og:image` apuntaba a `/static/og-image.jpg` **que no existía** (compartir en RRSS/WhatsApp salía sin imagen) | Generada og-image 1200×630 on-brand |
| SEO | Sin `<link rel="canonical">` | Añadido |
| Perf | Importmap de esm.sh (React, lucide, @google/genai) en `index.html`, redundante con el bundle de Vite; `@google/genai` ni se usa | Eliminado |
| Perf | Fotos del equipo sin optimizar: 742KB (PNG) y 726KB (JPEG) | → webp 800px: **18KB y 55KB** (−97%), `loading="lazy"` + `decoding="async"` |
| Tipografía | Se usa `font-black` (peso 900) en toda la web pero Google Fonts solo cargaba Inter 300–800 → el navegador sintetizaba el 900 (texto "engordado" artificialmente) | Cargado 900, retirado 300 (sin uso) |
| A11y | Labels del formulario sin `htmlFor`/`id`; sin `autocomplete`; botón de menú móvil y de envío del chat sin `aria-label` | Corregido |

## 🔜 Corto plazo (siguiente iteración, 1–2 sesiones)

1. **Conectar el webhook real del Barranco**: actualizar el secret `VITE_N8N_WEBHOOK_URL` del repo (GitHub → Settings → Secrets → Actions) con el endpoint del bot del Mercado del Barranco. Sin esto, el demo muestra el fallback.
2. **Integrar el widget real de `barranco-webchat`** cuando Ricardo dé acceso al repo (TODO marcado en `components/RealChatDemo.tsx`).
3. **Prueba social**: la sección del demo real es el mejor activo de conversión — añadir logo/foto del Mercado del Barranco (con su permiso) y una cita/testimonio del cliente. Un caso real con nombre vale más que las stats genéricas.
4. **Peso del JS (427KB, 138KB gzip)**: lazy-load de las secciones de demo (`React.lazy` para `ChatbotDemo`/`RealChatDemo`, están below-the-fold) y revisar si GSAP puede importarse por módulos.
5. **Limpieza de ficheros legacy**: `index-User1.html`, `favicon-User1.svg` y la carpeta `static/` en la raíz (duplicada de `public/static/`, Vite solo sirve `public/`). Confirmar que nadie los usa y borrar.
6. **Self-host de Inter** (`@fontsource/inter` o woff2 local): elimina la dependencia de Google Fonts (RTT extra y implicación RGPD — transferencia de IP a Google, relevante siendo agencia que presume de cumplimiento).
7. **Sitemap.xml + robots.txt**: no existen; GitHub Pages no los genera. Añadir a `public/`.

## 📋 Backlog (a valorar)

- **Hero móvil**: el H1 "Automatiza tu negocio. Multiplica tus resultados." ocupa ~40% del viewport; probar una variante más compacta con el CTA visible sin scroll.
- **Página de casos de éxito** (`/casos/mercado-del-barranco`): SEO long-tail + credibilidad. Hoy toda la web es una SPA de una sola URL; considerar prerender o migración ligera a Astro si el SEO orgánico se vuelve prioridad.
- **Analítica**: no hay ningún tracking (ni siquiera de eventos de conversión del formulario/chat). Añadir una analítica respetuosa (Plausible/Umami) para medir el funnel: visita → interacción con demo → formulario.
- **Formulario**: probar reducir campos obligatorios (teléfono opcional) — cada campo obligatorio reduce conversión; el RGPD checkbox ya está bien resuelto.
- **`prefers-reduced-motion`**: se respeta en CSS pero las animaciones GSAP/partículas del hero no lo comprueban; además evaluar pausar partículas en móvil (batería/CPU).
- **FAQ visible**: el JSON-LD declara una FAQPage con 5 preguntas, pero conviene que el contenido visible de `#faq` coincida exactamente con el schema (Google puede penalizar schema sin contenido equivalente).
- **Blog/contenido**: para posicionar "automatización IA hostelería/clínicas" en España, el caso del Barranco es la semilla perfecta.

## Verificación realizada

- `npm run build` ✓ · dev server sin errores de consola ✓
- Demo del Barranco: renderiza, y sin `VITE_N8N_WEBHOOK_URL` muestra aviso amable (verificado en navegador) ✓
- Fotos webp cargan en `#equipo` ✓ · responsive 375px y desktop ✓

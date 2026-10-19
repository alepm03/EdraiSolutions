# Investigación de referencias para la home de Edrai (19 oct 2026)

Método: WebFetch (texto extraído de cada home) más `curl` del HTML servido para comprobar etiquetas `<video>`, atributos y librerías. Lo que no se pudo confirmar (animaciones en runtime, scroll-linked, transiciones) se marca "no verificado". Un análisis de HTML estático no ve comportamiento JS.

## 1. Análisis de sitios

### paperfreelabs.com (competidor directo)
- Astro (atributos `data-astro-cid-*` en el HTML). Fuente: https://paperfreelabs.com
- Un único `<video data-demo src="/video/demo-cerebro.mp4" poster=... width="1920" height="1080" preload="none" muted loop playsinline controls>`, es decir: vídeo horizontal 16:9 **inline en la página**, con poster, con controles, `preload="none"`. No hay `autoplay` en el atributo; que arranque al entrar en viewport por JS: no verificado. Fuente: HTML de https://paperfreelabs.com
- Hero: titular grande, subtítulo, formulario de teléfono inline ("Llamadme hoy") y rejilla de capacidades (Mensajería, Correo, Contabilidad, Banco, ERP...). Fuente: https://paperfreelabs.com
- Demo en directo simulada (no vídeo): ventana de app con sidebar, badges de integraciones (WhatsApp, Outlook, Holded, Banco), contador "148 tareas hoy", selector de 6 pasos para saltar dentro de la animación, botón Aprobar/Rechazar interactivo. Etiqueta "Verlo con sonido". Fuente: https://paperfreelabs.com
- Navegación por anclas (#hero, #casos...) y secciones numeradas 01 a 05: sitio de una página, sin transición entre rutas. Vídeo vertical: no se observa. Fuente: https://paperfreelabs.com
- Lección: ya hacen "vídeo visible en página + demo simulada con pasos clicables". El listón a superar es movimiento y acabado, no el concepto.

### sierra.ai
- Dos posters Wistia (`/api/wistia-poster?id=...`) justo tras el hero, contenedores `wistia-bg ... pointer-events-none`; vídeo alojado en Wistia. Si hace autoplay o abre modal: no verificado (el HTML no tiene `<video>` nativo). Fuente: https://sierra.ai
- Hero tipográfico corto ("Better outcomes. Built on Sierra.") con un solo enlace. Tira de ~25 logos, bloques de propuesta de valor, testimonios con logo, capturas de producto estáticas, rejilla de compliance. Imágenes vía Sanity CDN. Sin widgets de demo. Fuente: https://sierra.ai
- Lección: el vídeo funciona como fondo/atmósfera tras el titular; tipografía y silencio visual hacen el trabajo.

### decagon.ai
- Webflow (assets en `cdn.prod.website-files.com`); GSAP presente en el HTML. Fuente: https://decagon.ai
- Hero: H1 "The AI concierge for every customer" con tres burbujas de mensaje flotantes (visual tipo chat). Vídeo solo en tarjetas del mega-menú (`cl--nav-card-video`, `playsinline`) y un MP4 de "dialogues" en almacenamiento público. Autoplay en hero: no verificado. Fuente: https://decagon.ai
- Tabs Voice / Chat / Email, marquee de logos, tarjetas de caso con métrica. Fuente: https://decagon.ai
- Lección: el "demo de chat" son burbujas de mensajes flotando en el hero, sin iframe ni modal.

### linear.app
- Sin `<video>` en la home; todo es UI maquetada en HTML/imagen: vista de issue con respuesta de agente, panel de chat IA, kanban, roadmap, diff de código, con captions "Fig 0.1". Imágenes por Cloudflare Images. Transiciones de ruta: no verificado. Fuente: https://linear.app
- Lección: demuestra producto con maquetas "vivas" de UI en lugar de vídeo. Muy relevante para el demo de chat de Edrai.

### lindy.ai
- Hero a dos columnas: titular + CTAs a la izquierda, a la derecha un workspace de Slack simulado (hilo con pasos "done in 21s", tool-calls, tarjetas de artefactos, contadores de emoji). Sin `<video>` en el HTML. Marquee de logos (set repetido 3 veces). Fuente: https://www.lindy.ai
- Lección: demo estática pero muy realista, que cuenta el producto en 3 s.

### vapi.ai
- Next.js (`/_next/`), CMS Prismic. Hero con imagen de fondo y demo de voz con pestañas (Soporte, Cualificación, Citas), botón "Start call" con permiso de micrófono; sección "Hear for yourself" con número al que llamar. Fuente: https://vapi.ai
- Vídeo: `<video muted playsInline preload="auto" autoPlay loop class="absolute size-full object-cover">` con fuentes .webm y .mp4 (`case-study-hero-video`): vídeo de fondo autoplay silencioso, con doble formato. Fuente: HTML de https://vapi.ai
- Banda de estadísticas (llamadas, uptime, latencia). Fuente: https://vapi.ai

### 11x.ai
- Webflow; **GSAP, Lenis y ScrollTrigger** presentes en el HTML. Vídeos `11x-new.webm` y `11x-new-mob.webm` (versión móvil separada), con `autoplay` y `playsinline`. Fuente: HTML de https://www.11x.ai
- H1 en minúsculas partido en bloques por palabra (animación palabra a palabra, sin verificar el efecto), eyebrow con canal rotatorio, fondo con parallax por cursor. Demo de voz inline (selector de escenario y tono, temporizador en vivo), carrusel de métricas (8 tarjetas). Fuente: https://www.11x.ai
- Scroll-driven real: ScrollTrigger lo hace posible; qué secciones lo usan: no verificado.

### clay.com
- Webflow, GSAP + ScrollTrigger. **Hay 10 `<video>`** en la home. El hero usa `autoplay loop muted playsinline data-module="background-video"` (MP4). Cinco vídeos de capítulo (Data, Agents, Orchestration, Execution, Reps) en `.webm` con `preload="none"` y `data-desktop` (carga solo en escritorio), más un vídeo en el footer y un vídeo de menú con poster. Un caso de cliente usa reproductor propio (`class="video-player"`, no autoplay). Fuente: HTML de https://clay.com
- Estructura en capítulos apilados (cada uno con etiqueta, titular, métricas y un loop). Pestañas de casos de uso con capturas, y un campo "What do you want to build?". Fuente: https://clay.com
- Lección: patrón limpio de "loops silenciosos por sección, lazy, solo escritorio" y un reproductor con controles para el vídeo narrado.

### attio.com
- Next.js. Sin `<video>`. Hero con panel de demo compuesto (transcripción de reunión, hilo estilo Slack con @Attio, terminal con tool calls) y rejilla de widgets (tabla, pipeline, workflow builder). Stats "30M MCP tool calls/mes". Fuente: https://attio.com
- Enlaces a botones "Resumir con ChatGPT/Claude/Perplexity" aparecen en 11x (no en Attio); ver 11x.

### relevanceai.com
- Webflow. Hero con "Watch the video" (botón; modal o inline: no verificado, el HTML no tiene `<video>`). Dashboards de métricas de agentes, mockups de agentes por rol, escalera de autonomía L1 a L4, marquee de logos. Fuente: https://relevanceai.com

### cognition.com (antes cognition.ai, redirige 301)
- La extracción solo devolvió contenido editorial (Devin, FrontierCode, logos de clientes). Estructura de hero y vídeo: no verificado. Fuente: https://cognition.com/

### Awwwards
- Búsqueda: aparece "Ponder AI" (Webflow + GSAP, con elementos "Video on scroll" y "Steps Scroll") en https://www.awwwards.com/inspiration/homepage-ponder-ai. Año de premio y efecto exacto: no verificado. No se pudo identificar un ganador 2026 concreto.

### Síntesis de patrones verificados
| Patrón | Dónde | Evidencia |
|---|---|---|
| Vídeo horizontal inline con poster, `preload="none"`, controles | paperfree | HTML |
| Vídeo de fondo autoplay silencioso, webm + mp4 | vapi, clay, 11x | HTML |
| Variante móvil del vídeo (archivo distinto) | 11x | `11x-new-mob.webm` |
| Loops por capítulo, `preload="none"`, solo escritorio | clay | HTML |
| Demo del producto como maqueta HTML viva, sin vídeo | linear, lindy, attio, paperfree | texto/HTML |
| Demo de voz/chat interactivo en hero | vapi, 11x | texto |
| GSAP + ScrollTrigger + Lenis | 11x, clay (GSAP en decagon) | HTML |
| Transición entre rutas con View Transitions | ninguno confirmado | no verificado |
| Vídeo vertical 9:16 junto al contenido | ninguno observado | no verificado |

Nota: ningún referente muestra el vídeo detrás de un modal salvo posible botón "Watch the video" (relevance). Los líderes lo integran inline o como fondo.

## 2. Componentes de 21st.dev

Listado general: https://21st.dev/community/components (instalación con `npx shadcn@latest add` y API key de 21st, con límite diario gratis; la ayuda indica componentes MIT, pero varias fichas muestran "unknown" o "no-license": revisar la licencia de cada ficha antes de copiar). Todos son React + Tailwind; las dependencias salen de las fichas.

Vídeo y scroll-expand
1. Scroll Expansion Hero (arunachalam): https://21st.dev/@arunachalam/components/scroll-expansion-hero . El medio crece al hacer scroll. framer-motion, MIT. Es para Next.js: habría que portarlo.
2. Video Scroll Hero (isaiahbjork): https://21st.dev/@isaiahbjork/components/video-scroll-hero . Vídeo al 25 % que escala a pantalla completa. framer-motion, licencia desconocida.
3. Scroll Animated Video (lovesickfromthe6ix): https://21st.dev/@lovesickfromthe6ix/components/scroll-animated-video . GSAP ScrollTrigger, contenedor que se expande, overlay con CTA, Lenis opcional. Licencia desconocida. Es el más portable a Astro (GSAP vanilla).
4. Cinematic landing Hero (jahed): https://21st.dev/@jahed/components/cinematic-landing-hero.md . No inspeccionado en detalle.

Bento y testimonios
5. Bento Grid Testimonials (shadcnspace): https://21st.dev/@shadcnspace/components/testimonial-01.md . Citas, imagen y métrica; paquete `motion`.
6. BentoTestimonials (ruhith369): https://21st.dev/@ruhith369/components/bento-testimonials
7. Feature Overview Bento (mohammadshehadeh): https://21st.dev/@mohammadshehadeh/components/feature-10.md
8. Testimonial Marquee (componentry): https://21st.dev/@componentry/components/testimonial-marquee.md . Marquee infinito con variantes de 1 y 2 filas.
9. Grid Testimonials Marquee (abushaidislam7): https://21st.dev/@abushaidislam7/components/grid-testimonials-marquee.md . MIT.

Estadísticas
10. Number Ticker (dev.yadhakim): https://21st.dev/@dev.yadhakim/components/number-ticker . Odómetro con spring, arranca al entrar en vista.
11. Number Ticker (kevingirelli): https://21st.dev/@kevingirelli/components/number-ticker.md . MIT, easing, formato por locale (útil para "es-ES").

Sticky scroll y transiciones
12. Sticky Scroll Reveal (aceternity): https://21st.dev/@aceternity/components/sticky-scroll-reveal . Texto que cambia mientras un visual queda fijo; framer-motion; MIT.
13. Sticky Scroll (uilayout.contact): https://21st.dev/@uilayout.contact/components/sticky-scroll.md . Depende de Lenis; licencia desconocida.
14. Footer reveal (motiondotdev): https://21st.dev/@motiondotdev/components/motion-footer-reveal.md . Paquete `motion`, MIT.
- Transiciones de página: no se localizó un componente específico en 21st.dev; para multipágina es mejor la API de Astro (sección 3).

Chat / demo
15. AI Chat Bot (muditgoel1512): https://21st.dev/@muditgoel1512/components/ai-chat-bot . React + Tailwind + Framer Motion, indicador de escritura, timestamps, respuestas simuladas; el más cercano a un estilo WhatsApp.
16. AI Chat Sheet (muhammetbilgin): https://21st.dev/@muhammetbilgin/components/ai-chat-sheet.md . lucide-react + framer-motion; licencia desconocida.

Aviso: Astro necesita islas React (`@astrojs/react`) para usar la mayoría; framer-motion añade peso. Para la home conviene reescribir el patrón con GSAP/CSS en vanilla y usar el componente solo como referencia visual.

## 3. Astro View Transitions (docs oficiales)
Fuente: https://docs.astro.build/en/guides/view-transitions/

- Activar: en el `<head>` del layout compartido,
  `import { ClientRouter } from "astro:transitions";` y `<ClientRouter />`. Opción `fallback="animate" | "swap" | "none"` para navegadores sin soporte (por defecto simula la animación).
- `transition:name="x"`: empareja un elemento de la página vieja con el de la nueva para que "se transforme" entre ellas. Cada nombre debe ser único por página. Astro infiere pares por tipo y posición, pero conviene fijarlo a mano.
- `transition:animate`: `fade` (por defecto), `slide`, `initial` (nativo del navegador), `none`. Personalizable: `fade({ duration: "0.4s" })` o un objeto `{ forwards: { old, new }, backwards: { old, new } }` con keyframes definidos en CSS global.
- `transition:persist`: mantiene el elemento o isla en el DOM al navegar. Un `<video>` persistido sigue reproduciéndose; una isla conserva su estado. Se puede dar un nombre (`transition:persist="video-marca"`) para emparejar entre componentes distintos. `transition:persist-props` conserva las props originales. Limitaciones: las animaciones CSS se reinician y los iframes se recargan.
- Eventos en `document`, en orden: `astro:before-preparation`, `astro:after-preparation`, `astro:before-swap`, `astro:after-swap`, `astro:page-load`. Hay que reenganchar listeners en `astro:page-load`.
- Control: `data-astro-reload` (fuerza navegación completa), `data-astro-history`, `navigate(href)` de `astro:transitions/client`.
- Scripts: los de módulo se ejecutan una vez; los `is:inline` pueden repetirse, `data-astro-rerun` fuerza la reejecución.
- Accesibilidad: anuncia el cambio de ruta a lectores de pantalla; con `prefers-reduced-motion` desactiva las animaciones.
- Alternativa nativa: transiciones cross-document del navegador funcionan en MPA sin `ClientRouter` (solo animación). La regla CSS `@view-transition` no aparece en esa página de la documentación: no verificado aquí.

Aplicación a Edrai: el nav y un posible vídeo ambiental persisten con `transition:persist`; el titular de la tarjeta del servicio hace morph con `transition:name` entre la home y la página del servicio. El vídeo de 45 s con sonido no debe persistir entre páginas (sorpresa de audio): persistir solo loops mudos.

## 4. Recomendación priorizada (5 patrones)

1. **Vídeo de 45 s inline, inmediatamente tras el hero, con poster y "play" propio (no modal).** Patrón de paperfree (`preload="none"`, poster, controles) mejorado: contenedor 16:9 con marco/glow cian, autoplay mudo al entrar en viewport (IntersectionObserver) en bucle corto o botón "Ver con sonido" que reinicia con audio, subtítulos incrustados. Dónde: sección 2 de la home, a ancho casi completo. Por qué: es el activo estrella y el competidor ya lo tiene inline; esconderlo en modal pierde la partida.
2. **Scroll-expand del mismo vídeo (escala del 70-80 % al ancho completo mientras se hace scroll, sticky unos viewports).** Referencia: componentes 1 a 3 de 21st.dev; implementar con GSAP ScrollTrigger (11x y Clay usan GSAP). Por qué: da el efecto "épico" sin modal y convierte el scroll en una transición hacia el vídeo. Riesgo: respetar `prefers-reduced-motion` y móvil (desactivar el pin, dejar el vídeo estático).
3. **Demo de chat WhatsApp maquetada en HTML y viva en la página (estilo Lindy/Linear/paperfree), con guion automático y pasos clicables.** Dónde: hero a la derecha o sección 3, con burbujas, indicador de escritura y mini-tarjeta "cita agendada / factura registrada". Referencias: https://www.lindy.ai , https://linear.app , 21st.dev AI Chat Bot. Por qué: cuenta el servicio en 3 s, no pesa como vídeo y es el diferenciador frente a una captura.
4. **Vídeo vertical 9:16 como "teléfono" sticky junto a un texto por pasos (sticky scroll reveal).** Dónde: sección de WhatsApp/voz: a la izquierda tres pasos que cambian, a la derecha el marco de móvil fijo con el vídeo vertical en loop mudo (o un reel con sonido bajo clic). Referencia: Aceternity Sticky Scroll Reveal. Ningún referente lo muestra, así que es diferenciación real. Cargar con `preload="none"` y versión móvil propia (patrón 11x con `-mob.webm`, y Clay con `data-desktop`).
5. **View Transitions de Astro con persistencia y morph de títulos.** `ClientRouter` + `transition:persist` en nav y en loops ambientales + `transition:name` entre la tarjeta de servicio de la home y el hero de la página destino. Por qué: ninguno de los referentes lo hace (no verificado), lo que da sensación de aplicación y de calidad startup a coste bajo. Cuidar: reenganchar GSAP/ScrollTrigger en `astro:page-load`.

Complementos de bajo coste: bento de servicios (21st.dev items 5 a 7), marquee de testimonios, contador animado con formato `es-ES` para métricas de P&L y flujo de caja, y secciones en "capítulos" con loop mudo por servicio al estilo Clay.

## Límites de esta investigación
- WebFetch devuelve solo texto; el comportamiento JS (autoplay por scroll, parallax, transiciones de ruta) en los sitios de referencia no pudo verificarse.
- Se comprobaron atributos de `<video>` en el HTML servido, pero no el CSS ni el resto del bundle.
- 21st.dev no tiene listado por categoría accesible en la fuente; los componentes salen de su buscador y fichas. Comprobar licencia y que el componente siga disponible antes de usarlo.

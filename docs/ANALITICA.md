# Analítica de producto — PostHog

Cómo está montada la medición de edraisolutions.es, qué se mide y qué hay que
tocar para mantenerla. Decisión de partida: **PostHog Cloud EU en modo sin
cookies**, sin banner de consentimiento.

---

## 1. Por qué sin cookies

En España las cookies de analítica exigen consentimiento previo (art. 22.2 LSSI
y guía de la AEPD): rechazar tiene que ser tan fácil como aceptar y el script no
puede cargar antes de que el visitante acepte. No existe la exención de
"analítica propia" que sí tienen otros países de la UE.

PostHog se configura aquí con `persistence: 'memory'`: no escribe ni lee nada en
el dispositivo del visitante. Sin almacenamiento en el equipo del usuario, el
art. 22.2 no aplica y no hay banner que poner. Sigue aplicando el RGPD sobre los
datos tratados, y eso se cubre en la política de privacidad.

**El intercambio, en claro:**

| | Sin cookies (actual) | Con banner |
|---|---|---|
| Visitas medidas | 100% | solo quien acepta (típico 40-70%) |
| Embudo dentro de la visita | Sí | Sí |
| Visitante recurrente / atribución multi-visita | No | Sí |
| Session replay y mapas de calor | No | Sí |

Como la web es un one-pager donde la conversión ocurre en la misma visita, el
embudo que importa (llegada → scroll → CTA → formulario → lead) se mide entero.
Lo que se pierde es reconocer a quien vuelve otro día, y las grabaciones.

---

## 2. Puesta en marcha

1. **Crear la cuenta** en [posthog.com](https://posthog.com) eligiendo región
   **EU**. Ojo: la región no se puede cambiar después.
2. Copiar la **Project API Key**. No se crea a mano: cada proyecto nace con la
   suya. Aparece en el snippet del onboarding y, después, en
   **Settings → Project → Project API key** (`eu.posthog.com/settings/project`).
   Empieza por `phc_`, es de **solo escritura** —no permite leer datos— y por eso
   viaja en el bundle sin riesgo.

   No confundirla con la **Personal API key**, que da acceso completo a la
   cuenta (equivale a entrar con usuario y contraseña): esa sí se crea a mano,
   en Account settings → Personal API keys, y **nunca** debe ir en el front ni
   en el repo. Para esta integración no hace falta ninguna.
3. **Front**: añadir el secret `VITE_POSTHOG_KEY` en el repo
   (Settings → Secrets and variables → Actions). El workflow de deploy ya lo
   pasa al build. En local, ponerlo en `.env.local`.
4. **Worker**: `npx wrangler secret put POSTHOG_API_KEY` dentro de `cf-worker/`,
   con la misma key, y `npx wrangler deploy`.
5. **n8n**: ver §6.

Sin `VITE_POSTHOG_KEY` la analítica queda inerte: `track()` no hace nada y no se
carga PostHog. Se puede desarrollar en local sin ensuciar los datos.

### Ajustes recomendados dentro de PostHog

- **Captura de IP**: Settings → Project → General → *IP data capture*. Las
  organizaciones creadas en la región **EU vienen con la captura de IP
  desactivada por defecto** por RGPD, así que probablemente no haya nada que
  tocar: solo confirmar que sigue desactivada. El país se deduce igualmente.
- **Firmar el DPA**: Settings → Organization → Data processing agreement.
- **Retención de datos**: dejarla en lo mínimo que resulte útil (12 meses sobra
  para una landing).

---

## 3. Qué se mide

`$pageview`, `$pageleave` y el **autocapture** de clics vienen de serie. Encima
de eso, los eventos de negocio (definidos en `lib/analytics.ts`, emitidos desde
`hooks/usePageAnalytics.ts` y los componentes):

| Evento | Cuándo | Propiedades |
|---|---|---|
| `seccion_vista` | una sección entra en pantalla (40%) | `seccion` |
| `scroll_profundidad` | se alcanza el 25/50/75/100% | `porcentaje` |
| `cta_click` | clic en cualquier enlace hacia `#contacto` | `ubicacion`, `texto` |
| `nav_interna` | clic en el resto de anclas | `destino`, `ubicacion` |
| `contacto_directo` | clic en WhatsApp, email o teléfono | `canal`, `ubicacion` |
| `enlace_externo` | clic a LinkedIn, Instagram… | `dominio`, `ubicacion` |
| `formulario_enviado` | envío del formulario | `resultado` (ok/error), `con_mensaje` |
| `formulario_rgpd_sin_marcar` | envío sin la casilla RGPD marcada | — |
| `demo_chat_mensaje` | mensaje enviado en un demo | `demo` (agentes/barranco/widget), `turno` |
| `demo_chat_error` | fallo del demo | `demo`, `motivo` |
| `demo_agente_cambiado` | se cambia de agente en el demo | `agente` |
| `widget_chat_abierto` / `widget_chat_cerrado` | burbuja de chat | — |
| `widget_chat_lead` | el chat consigue los datos de un lead | `turno` |
| `lead_recibido` | **servidor**: el lead llega al Worker | `origen_lead`, `visita_id` |
| `lead_email_enviado` | **servidor**: n8n confirma el envío | `origen_lead` |
| `lead_email_fallido` | **servidor**: n8n falla | `origen_lead`, `estado` |

`formulario_rgpd_sin_marcar` es una alarma, no una métrica: la casilla es
`required`, así que el navegador bloquea el envío antes de llegar al código. Si
este evento aparece en producción, significa que el estado de React y el DOM se
han desincronizado — merece la pena mirarlo.

`ubicacion` es la sección de la página donde se hizo el clic (`hero`, `servicios`,
`contacto`, `cabecera`, `pie`…), que es lo que permite saber **qué CTA convierte**.

### Cómo se unen front y servidor sin cookies

El front manda su `distinct_id` de memoria al Worker en el campo `analytics_id`.
El Worker emite `lead_recibido` con `distinct_id = email` (el mismo identificador
que usa `identifyLead()` en el front al enviar el formulario) y guarda la visita
en la propiedad `visita_id`. Resultado: el recorrido anónimo y el lead quedan
cosidos sin escribir nada en el navegador.

### Qué NO se envía nunca

- El texto que el visitante escribe en los chats (solo el turno y qué demo).
- Nada del formulario de contacto: el `<form>` lleva la clase `ph-no-capture`,
  que hace que PostHog ignore todo ese subárbol.
- Solo se crea ficha de persona cuando hay un lead (`person_profiles:
  identified_only`). El tráfico anónimo genera eventos, no perfiles.

---

## 4. Insights que merece la pena crear el primer día

1. **Embudo de conversión**: `$pageview` → `seccion_vista` (seccion = `contacto`)
   → `cta_click` → `formulario_enviado` (resultado = ok) → `lead_recibido`.
2. **Qué CTA trae los leads**: `cta_click` desglosado por `ubicacion`.
3. **Hasta dónde llega la gente**: `scroll_profundidad` por `porcentaje`, y
   `seccion_vista` por `seccion` — dice qué secciones no ve nadie.
4. **Salud de los demos**: `demo_chat_mensaje` frente a `demo_chat_error`.
5. **Contacto directo frente a formulario**: `contacto_directo` (canal whatsapp)
   frente a `formulario_enviado`. En un negocio local puede que WhatsApp gane.
6. **Fugas de lead**: `formulario_enviado` (ok) frente a `lead_email_enviado`.
   Si divergen, hay leads que no están llegando al correo.

---

## 5. Proxy para esquivar bloqueadores (opcional)

Entre un 10% y un 30% de los visitantes bloquea el dominio de PostHog. El Worker
sirve la ingesta desde el dominio propio en la ruta `/ph/*`
(`handlePostHogProxy` en `cf-worker/index.js`).

Para activarlo basta con definir el secret `VITE_POSTHOG_HOST` del repo:

```
https://edrai-gemini-proxy.<subdominio>.workers.dev/ph
```

Mientras no se defina, el front va directo a `https://eu.i.posthog.com` y la ruta
del Worker no se llama nunca. Conviene activarlo **después** de comprobar que la
medición funciona sin proxy, para no depurar dos cosas a la vez.

---

## 6. Eventos desde n8n

El Worker ya cubre el ciclo del lead. En n8n merece la pena instrumentar lo que
solo ocurre allí (envío real por Gmail, conversaciones del bot, seguimientos).
Se hace con un nodo **HTTP Request**, sin instalar nada:

- **Method**: POST
- **URL**: `https://eu.i.posthog.com/i/v0/e/`
- **Body** (JSON):

```json
{
  "api_key": "<POSTHOG_API_KEY>",
  "event": "email_lead_entregado",
  "distinct_id": "={{ $json.email.toLowerCase() }}",
  "properties": {
    "origen_lead": "={{ $json.source }}",
    "$lib": "n8n"
  }
}
```

Usar siempre `distinct_id` = email en minúsculas: es lo que mantiene unido el
recorrido entre front, Worker y n8n. La key conviene guardarla como credencial
de n8n, no escrita a mano en cada nodo.

---

## 7. Activar session replay (modo consentimiento)

Si en algún momento interesa ver grabaciones —por ejemplo para rediseñar el
formulario— se puede pasar a modo consentimiento, idealmente durante una
temporada acotada y volviendo luego a cookieless.

Hace falta:

1. Poner `VITE_POSTHOG_MODE=consent` en el build. Eso conmuta la persistencia a
   `localStorage+cookie`, activa `opt_out_capturing_by_default` (no se captura
   nada hasta aceptar) y habilita replay y encuestas.
2. Construir el banner y llamar a `setConsent(true | false)` de
   `lib/analytics.ts` según la respuesta. El banner debe cumplir la guía de la
   AEPD: aceptar y rechazar con la misma prominencia, sin casillas premarcadas y
   sin cargar nada antes de la respuesta.
3. Guardar la elección del usuario y no volver a preguntar.
4. Actualizar la política de cookies (`components/LegalModal.tsx`): pasa a haber
   cookies de analítica, con su tabla de nombres, finalidad y caducidad.
5. En PostHog, activar el enmascarado de texto en las grabaciones para no
   guardar lo que la gente escribe.

Sin los pasos 2 a 4 el modo `consent` no es legal: quedaría capturando con
cookies sin haber preguntado.

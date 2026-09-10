/**
 * Analítica de producto — PostHog (Cloud EU)
 *
 * Modo por defecto: COOKIELESS. PostHog se configura con `persistence: 'memory'`,
 * es decir, no escribe ni lee nada en el dispositivo del visitante (ni cookies ni
 * localStorage). Por eso no hace falta banner de cookies: el art. 22.2 de la LSSI
 * regula el almacenamiento y acceso a datos en el equipo del usuario, y aquí no lo
 * hay. Sigue aplicando el RGPD sobre los datos que se procesan (IP, y el email del
 * lead cuando envía el formulario), y eso se cubre en la política de privacidad.
 *
 * Consecuencia de no persistir: cada carga de página es un visitante nuevo. En un
 * one-pager donde la conversión ocurre en la misma visita esto no afecta al embudo
 * (llegada → scroll → CTA → formulario), pero sí impide medir visitantes recurrentes
 * y grabar sesiones (session replay).
 *
 * Para activar temporadas con session replay hay que pasar a modo 'consent':
 * ver docs/ANALITICA.md. El código ya está preparado (`setConsent`), solo falta
 * el banner de UI.
 *
 * Variables de entorno (build time):
 *   VITE_POSTHOG_KEY   Project API Key. Es pública y de solo escritura; sin ella
 *                      todo este módulo queda inerte (útil en local).
 *   VITE_POSTHOG_HOST  Host de ingesta. Por defecto Cloud EU. Se puede apuntar al
 *                      proxy del Cloudflare Worker para esquivar bloqueadores.
 *   VITE_POSTHOG_MODE  'cookieless' (por defecto) | 'consent'
 */
// PostHog se carga en diferido: son ~285 KB de fuente (el 20 % del bundle) que
// no deben competir con el primer pintado. `initAnalytics()` programa la carga
// para cuando el navegador esté ocioso; hasta entonces los eventos se encolan y
// se envían en cuanto el SDK está listo, así no se pierde ninguno.
type PostHog = typeof import('posthog-js').default;

let posthog: PostHog | null = null;
let pending: Array<(ph: PostHog) => void> = [];

/** Encola una acción hasta que el SDK esté cargado e inicializado. */
function whenReady(fn: (ph: PostHog) => void): void {
  if (posthog && ready) fn(posthog);
  else pending.push(fn);
}

type ConsentMode = 'cookieless' | 'consent';

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || 'https://eu.i.posthog.com';
const MODE = ((import.meta.env.VITE_POSTHOG_MODE as ConsentMode | undefined) || 'cookieless');

let ready = false;
let loading = false;

export const isCookieless = () => MODE === 'cookieless';

export function initAnalytics(): void {
  if (loading || ready || !KEY || typeof window === 'undefined') return;
  loading = true;

  const boot = () => {
    void import('posthog-js').then(({ default: ph }) => {
      posthog = ph;
      initSdk(ph);
      const queued = pending;
      pending = [];
      queued.forEach((fn) => fn(ph));
    });
  };

  // Fuera del camino crítico: se espera a que el navegador esté ocioso, con un
  // tope para que no se quede sin cargar en pestañas que nunca llegan a estarlo.
  const ric = (window as unknown as {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void;
  }).requestIdleCallback;
  if (ric) ric(boot, { timeout: 3000 });
  else window.setTimeout(boot, 1200);
}

function initSdk(posthog: PostHog): void {
  posthog.init(KEY!, {
    api_host: HOST,
    ui_host: 'https://eu.posthog.com',

    // Sin persistencia en el dispositivo mientras no haya consentimiento.
    persistence: MODE === 'cookieless' ? 'memory' : 'localStorage+cookie',
    opt_out_capturing_by_default: MODE === 'consent',

    // Clics y envíos de formulario se capturan solos; los eventos de negocio se
    // añaden a mano más abajo. PostHog no captura el *valor* de los inputs, y los
    // campos del formulario llevan además la clase `ph-no-capture`.
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,

    // El replay y las encuestas necesitan almacenamiento en el dispositivo.
    disable_session_recording: MODE === 'cookieless',
    disable_surveys: MODE === 'cookieless',

    // Solo se crea ficha de persona cuando hay un lead identificado (formulario).
    // El tráfico anónimo genera eventos, no perfiles.
    person_profiles: 'identified_only',
    respect_dnt: true,

    loaded: () => { ready = true; },
  });

  ready = true;
}

/** Registra un evento. No-op si PostHog no está configurado. */
export function track(event: string, props?: Record<string, unknown>): void {
  if (!KEY) return;
  whenReady((ph) => ph.capture(event, props));
}

/**
 * Identificador de la visita en curso. Se envía al Worker junto con el lead para
 * poder unir el recorrido del front con los eventos de servidor sin cookies.
 */
export function getDistinctId(): string | undefined {
  if (!KEY || !ready || !posthog) return undefined;
  try { return posthog.get_distinct_id(); } catch { return undefined; }
}

/**
 * Asocia la visita a un lead tras enviar el formulario. Base legal: el
 * consentimiento explícito que el usuario marca en la casilla RGPD.
 */
export function identifyLead(email: string, props?: Record<string, unknown>): void {
  if (!KEY || !email) return;
  whenReady((ph) => ph.identify(email.trim().toLowerCase(), props));
}

/** Interruptor para el futuro banner de consentimiento (modo 'consent'). */
export function setConsent(granted: boolean): void {
  if (!KEY) return;
  whenReady((ph) => {
    if (granted) {
      ph.opt_in_capturing();
      ph.startSessionRecording?.();
    } else {
      ph.opt_out_capturing();
    }
  });
}

/** Nombres de evento en un solo sitio para que no se dupliquen escritos distintos. */
export const EV = {
  seccionVista:        'seccion_vista',
  scrollProfundidad:   'scroll_profundidad',
  ctaClick:            'cta_click',
  navInterna:          'nav_interna',
  contactoDirecto:     'contacto_directo',
  enlaceExterno:       'enlace_externo',
  formularioEnviado:   'formulario_enviado',
  formularioSinRgpd:   'formulario_rgpd_sin_marcar',
  demoMensaje:         'demo_chat_mensaje',
  demoError:           'demo_chat_error',
  demoAgente:          'demo_agente_cambiado',
  widgetAbierto:       'widget_chat_abierto',
  widgetCerrado:       'widget_chat_cerrado',
  widgetLead:          'widget_chat_lead',
} as const;

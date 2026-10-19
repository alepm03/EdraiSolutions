import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Phone, Globe, Star, Check, Calendar, Users, Database, Bell } from 'lucide-react';
import { LogoMark } from './Logo';

/**
 * Visual principal de la hero: «Flujo + Consola».
 *
 * Sustituye al robot 3D de Spline. Cuenta lo que hace la agencia en un ciclo
 * continuo de cuatro escenarios: entra un disparador (WhatsApp, llamada, web,
 * post-servicio), un pulso recorre el cable hasta el símbolo de marca, el
 * símbolo late, la consola reproduce la escena y cierra con el resultado.
 *
 * Decisiones:
 *  - Sin dependencias nuevas. Todo DOM + SVG + CSS; solo se animan transform,
 *    opacity y filter. El símbolo reutiliza `LogoMark` (geometría oficial).
 *  - Accesible: con prefers-reduced-motion se pinta una sola escena completa y
 *    estática, sin pulsos ni tecleo. Es decorativo, así que va aria-hidden y el
 *    contenido equivalente vive en el copy de la hero.
 *  - Sin FOUC: nada queda parado esperando a un observer. El primer fotograma
 *    ya muestra la pieza montada.
 *  - Se congela al pasar el cursor por encima y con la pestaña oculta.
 */

const CYCLE_PAUSE = 2100;

type SceneCtx = {
  body: HTMLDivElement;
  meta: HTMLSpanElement;
  /** Espera y devuelve true si la escena ha caducado: quien llama debe abortar. */
  wait: (ms: number) => Promise<boolean>;
  onCleanup: (fn: () => void) => void;
};

type Scenario = {
  id: string;
  trigger: { icon: React.ReactNode; label: string };
  out: { icon: React.ReactNode; label: string };
  head: string;
  meta: string;
  result: { title: string; sub: string };
  render: (ctx: SceneCtx) => Promise<void>;
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const el = (tag: string, cls?: string, html?: string) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const show = (n: HTMLElement) => n.classList.add('on');

/** Reinicia una animación CSS volviendo a aplicar la clase. */
const fire = (node: HTMLElement, cls = 'fire') => {
  node.classList.remove(cls);
  void node.offsetWidth;
  node.classList.add(cls);
};

// ── Escenas ────────────────────────────────────────────────────────────────

async function chatScene(ctx: SceneCtx) {
  const { body, wait } = ctx;
  const b1 = el('div', 'efc-bubble them efc-step', 'Hola, ¿tenéis mesa para 2 el viernes a las 21h?');
  const typing = el('div', 'efc-bubble us efc-typing efc-step', '<i></i><i></i><i></i>');
  const b2 = el('div', 'efc-bubble us efc-step', 'Sí, tenemos las 21:00 libre. ¿Te la reservo a tu nombre?');
  const b3 = el('div', 'efc-bubble them efc-step', 'Sí, perfecto. Soy Ana García.');
  body.append(b1, typing);

  show(b1); if (await wait(620)) return;
  show(typing); if (await wait(1050)) return;
  typing.remove();
  body.append(b2); show(b2); if (await wait(1100)) return;
  body.append(b3); show(b3); if (await wait(820)) return;
}

async function voiceScene(ctx: SceneCtx) {
  const { body, wait, meta } = ctx;

  const wave = el('div', 'efc-wave live efc-step');
  for (let i = 0; i < 24; i++) {
    const bar = el('i');
    bar.style.animationDelay = `${(i * 0.055).toFixed(3)}s`;
    wave.append(bar);
  }
  const l1 = el('div', 'efc-line agent efc-step', '<span class="who">Edrai</span><span class="said">Buenos días, ¿en qué puedo ayudarle?</span>');
  const l2 = el('div', 'efc-line efc-step', '<span class="who">Cliente</span><span class="said">Quería pedir cita para una limpieza.</span>');
  const l3 = el('div', 'efc-line agent efc-step', '<span class="who">Edrai</span><span class="said">Tengo hueco el martes a las 10:15. ¿Le va bien?</span>');
  body.append(wave, l1);

  let secs = 0;
  const tick = window.setInterval(() => {
    secs = Math.min(secs + 4, 48);
    meta.textContent = `00:${String(secs).padStart(2, '0')}`;
  }, 360);
  ctx.onCleanup(() => window.clearInterval(tick));

  show(wave); if (await wait(380)) return;
  show(l1); if (await wait(1120)) return;
  body.append(l2); show(l2); if (await wait(1120)) return;
  body.append(l3); show(l3); if (await wait(820)) return;
  window.clearInterval(tick);
  meta.textContent = '00:48';
}

async function typeInto(ctx: SceneCtx, node: Element, text: string) {
  for (let i = 1; i <= text.length; i++) {
    node.textContent = text.slice(0, i);
    if (await ctx.wait(20)) return true;
  }
  return false;
}

async function formScene(ctx: SceneCtx) {
  const { body, wait } = ctx;
  // Ejemplo genérico: sector y necesidad, nunca el nombre de un negocio real.
  const rows: [string, string][] = [
    ['Nombre', 'Marta R.'],
    ['Sector', 'Taller mecánico'],
    ['Necesita', 'Atender llamadas fuera de horario'],
  ];
  const nodes = rows.map(([k]) => el('div', 'efc-field efc-step', `<span class="k">${k}</span><span class="v"></span>`));
  const meter = el(
    'div',
    'efc-meter efc-step',
    '<div class="efc-meter-top"><span>Cualificación</span><b>Alta</b></div>' +
      '<div class="efc-meter-track"><span class="efc-meter-fill"></span></div>'
  );

  for (let i = 0; i < nodes.length; i++) {
    body.append(nodes[i]);
    show(nodes[i]);
    if (await wait(160)) return;
    if (await typeInto(ctx, nodes[i].querySelector('.v')!, rows[i][1])) return;
    nodes[i].classList.add('done');
    if (await wait(130)) return;
  }
  body.append(meter); show(meter);
  if (await wait(60)) return;
  (meter.querySelector('.efc-meter-fill') as HTMLElement).style.width = '86%';
  if (await wait(880)) return;
}

const STAR_SVG =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3 1.2-6.5-4.8-4.6 6.6-.9L12 2.5Z"/></svg>';

async function reviewScene(ctx: SceneCtx) {
  const { body, wait } = ctx;
  const ask = el('div', 'efc-bubble us efc-step', '¡Gracias por tu visita! ¿Nos dejas una reseña? Tardas 20 segundos.');
  const stars = el('div', 'efc-stars efc-step', STAR_SVG.repeat(5));
  const quote = el(
    'div',
    'efc-quote efc-step',
    'Reservé por WhatsApp en un minuto y al llegar estaba todo listo. Trato de diez.<cite>Ana G. · hace 2 horas · Google</cite>'
  );
  body.append(ask);

  show(ask); if (await wait(900)) return;
  body.append(stars); show(stars);
  for (const s of Array.from(stars.querySelectorAll('svg'))) {
    s.classList.add('lit');
    if (await wait(170)) return;
  }
  if (await wait(260)) return;
  body.append(quote); show(quote); if (await wait(760)) return;
}

// ── Los cuatro escenarios ──────────────────────────────────────────────────
// Contenido genérico a propósito: ningún nombre de cliente real.

const ICON_PROPS = { className: 'w-3.5 h-3.5 shrink-0', strokeWidth: 2 } as const;

const SCENARIOS: Scenario[] = [
  {
    id: 'whatsapp',
    trigger: { icon: <MessageCircle {...ICON_PROPS} />, label: 'WhatsApp' },
    out: { icon: <Calendar {...ICON_PROPS} />, label: 'Cita en la agenda' },
    head: 'Asistente Edrai · WhatsApp',
    meta: 'responde en 2 s',
    result: { title: 'Reserva confirmada', sub: 'Viernes 21:00 · 2 personas · equipo avisado' },
    render: chatScene,
  },
  {
    id: 'voz',
    trigger: { icon: <Phone {...ICON_PROPS} />, label: 'Llamada' },
    out: { icon: <Users {...ICON_PROPS} />, label: 'Sin llamadas perdidas' },
    head: 'Agente de voz · llamada entrante',
    meta: '00:00',
    result: { title: 'Llamada resuelta en 48 s', sub: 'Cita el martes 10:15 · confirmación por SMS' },
    render: voiceScene,
  },
  {
    id: 'web',
    trigger: { icon: <Globe {...ICON_PROPS} />, label: 'Web' },
    out: { icon: <Database {...ICON_PROPS} />, label: 'CRM actualizado' },
    head: 'Formulario de la web',
    meta: 'nuevo contacto',
    result: { title: 'Lead cualificado y enrutado', sub: 'Ficha creada en el CRM · comercial avisado' },
    render: formScene,
  },
  {
    id: 'resena',
    trigger: { icon: <Star {...ICON_PROPS} />, label: 'Reseña' },
    out: { icon: <Bell {...ICON_PROPS} />, label: 'Reputación al día' },
    head: 'Seguimiento post-servicio',
    meta: '2 h tras el servicio',
    result: { title: 'Reseña de 5 estrellas publicada', sub: 'Google · respuesta sugerida lista para enviar' },
    render: reviewScene,
  },
];

// ── Componente ─────────────────────────────────────────────────────────────

const HeroFlowConsole: React.FC<{ className?: string; compact?: boolean }> = ({
  className = '',
  compact = false,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);
  const wireRef = useRef<HTMLDivElement>(null);
  const vWireRef = useRef<HTMLDivElement>(null);

  // El estado de React solo pinta lo declarativo (qué disparador y qué salida
  // están vivos, y el texto del resultado). Las escenas manipulan el DOM de la
  // consola directamente porque son secuencias temporales, no estado derivado.
  // Dos estados a propósito: el disparador se enciende al inicio del ciclo
  // (es quien lanza el pulso), mientras que la cabecera, el reloj y el chip de
  // resultado describen la escena que hay EN la consola y solo cambian cuando
  // el pulso llega y se sustituye el contenido. Con un único estado la
  // cabecera se adelantaba casi un segundo al cuerpo.
  const [activeTrigger, setActiveTrigger] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [resultOn, setResultOn] = useState(false);

  const hoverRef = useRef(false);
  // Identidad de la ejecución actual del efecto. En StrictMode el efecto se
  // monta dos veces: con un booleano compartido el primer bucle revivía al
  // reactivarse la bandera y quedaban dos bucles peleándose por el mismo DOM.
  // Con un objeto por ejecución, el bucle viejo no puede resucitar nunca.
  const runRef = useRef<{ alive: boolean; cleanups: Array<() => void> } | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = { alive: true, cleanups: [] as Array<() => void> };
    runRef.current = run;

    const dead = () => !run.alive || runRef.current !== run;
    const clean = () => {
      run.cleanups.forEach((fn) => fn());
      run.cleanups = [];
    };

    /**
     * @param lead  Si es false, la consola se rellena de inmediato en vez de
     *              esperar a que el pulso recorra el cable. Se usa en la
     *              primera escena para que la página nunca abra con el panel
     *              vacío; el pulso y el latido se lanzan igualmente, en
     *              paralelo, para que la pieza se vea viva desde el primer
     *              fotograma.
     */
    const playScenario = async (i: number, lead: boolean) => {
      const s = SCENARIOS[i];
      const body = bodyRef.current;
      const meta = metaRef.current;
      const title = titleRef.current;
      if (!body || !meta || !title) return;

      clean();
      setResultOn(false);
      setActiveTrigger(i);

      const ctx: SceneCtx = {
        body,
        meta,
        onCleanup: (fn) => run.cleanups.push(fn),
        wait: async (ms: number) => {
          if (!reduced) await sleep(ms);
          return dead();
        },
      };

      const pulseAndBeat = async () => {
        if (reduced) return;
        await sleep(260);
        if (dead()) return;
        if (wireRef.current) fire(wireRef.current);
        if (vWireRef.current) fire(vWireRef.current);
        await sleep(500);
        if (dead()) return;
        if (engineRef.current) {
          fire(engineRef.current, 'beat');
          const t = window.setTimeout(() => engineRef.current?.classList.remove('beat'), 950);
          run.cleanups.push(() => window.clearTimeout(t));
        }
        await sleep(220);
      };

      // En las escenas encadenadas el pulso viaja con la escena anterior aún
      // en pantalla, así la consola nunca se queda un segundo en blanco.
      if (lead) {
        await pulseAndBeat();
        if (dead()) return;
      } else {
        void pulseAndBeat();
      }

      body.replaceChildren();
      setActiveScene(i);
      title.textContent = s.head;
      meta.textContent = s.meta;

      await s.render(ctx);
      if (dead()) return;

      if (reduced) body.querySelectorAll('.efc-step').forEach((n) => n.classList.add('on'));

      setResultOn(true);
      if (reduced) return;
      await sleep(CYCLE_PAUSE);
    };

    const start = async () => {
      // Primera escena sin espera: al cargar, la consola ya tiene contenido.
      await playScenario(0, false);
      if (reduced || dead()) return;

      let i = 1;
      while (!dead()) {
        // Congela mientras el cursor esté encima o la pestaña esté oculta.
        while (!dead() && (hoverRef.current || document.hidden)) await sleep(220);
        if (dead()) return;
        await playScenario(i % SCENARIOS.length, true);
        i++;
      }
    };

    void start();

    return () => {
      run.alive = false;
      clean();
    };
  }, []);

  const scenario = SCENARIOS[activeScene];

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      onPointerEnter={() => { hoverRef.current = true; }}
      onPointerLeave={() => { hoverRef.current = false; }}
      className={`efc relative w-full ${compact ? 'max-w-[440px]' : 'max-w-[560px]'} mx-auto flex flex-col ${className}`}
    >
      {/* Halo ambiental detrás de la pieza */}
      <div className="pointer-events-none absolute inset-[14%_8%] rounded-full bg-cyan-400/[0.09] blur-[80px] z-0" />

      {/* ── El flujo: disparadores → motor → resultados ──
          Por debajo de sm no cabe el diagrama de tres columnas sin truncar las
          etiquetas de resultado, así que ahí se apila: disparadores en 2×2,
          cable vertical y motor. El resultado de cada escena lo sigue contando
          el chip verde bajo la consola, así que no se pierde información. */}
      <div className="relative z-10 mb-3.5 flex flex-col items-center gap-3 rounded-2xl border border-white/[0.055] bg-white/[0.02] px-3 py-5 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:px-4 sm:py-6">
        {/* Disparadores */}
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:min-w-0 sm:flex-col">
          {SCENARIOS.map((s, i) => (
            <div key={s.id} className={`efc-trig ${i === activeTrigger ? 'live' : ''}`}>
              {s.trigger.icon}
              <span className="efc-trig-label">{s.trigger.label}</span>
            </div>
          ))}
        </div>

        {/* El motor: cable + símbolo de marca */}
        <div className="flex flex-col items-center gap-2.5">
          {/* El cable es vertical apilado y horizontal en el diagrama. Se
              disparan los dos; solo uno está visible en cada breakpoint. */}
          <div ref={vWireRef} className="efc-vwire h-7 sm:hidden">
            <span className="efc-pulse" />
          </div>
          <div ref={wireRef} className="efc-hwire hidden w-8 sm:block">
            <span className="efc-pulse" />
          </div>
          <div ref={engineRef} className="efc-engine w-[68px] h-[68px] sm:w-[76px] sm:h-[76px]">
            <span className="efc-halo" />
            <span className="efc-ring" />
            <LogoMark className="efc-mark w-full h-full" variant="inverse" />
          </div>
          <div className="efc-engine-caption">Edrai</div>
        </div>

        {/* Resultados */}
        <div className="hidden min-w-0 flex-col gap-2 sm:flex">
          {SCENARIOS.map((s, i) => (
            <div key={s.id} className={`efc-out ${i === activeScene && resultOn ? 'live' : ''}`}>
              {s.out.icon}
              <span className="efc-out-label">{s.out.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── La consola ── */}
      {/* Altura mínima fijada por encima del escenario más alto (medido: 257 px
          a 375 de ancho, 244 en escritorio) para que el chip de resultado y el
          contador no den saltos al cambiar de escena. */}
      <div className="relative z-10 flex min-h-[264px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_32px_80px_rgba(0,0,0,0.55)] backdrop-blur-[10px] sm:min-h-[252px]">
        <div className="flex flex-none items-center gap-2.5 border-b border-white/[0.055] bg-white/[0.03] px-4 py-3">
          <span className="efc-dot" />
          <span ref={titleRef} className="text-[12.5px] font-extrabold tracking-[-0.005em]">
            {scenario.head}
          </span>
          <span ref={metaRef} className="ml-auto text-[10.5px] font-bold text-slate-500 tabular-nums">
            {scenario.meta}
          </span>
        </div>
        <div ref={bodyRef} className="efc-body flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden p-4" />
      </div>

      {/* ── El resultado ── */}
      <div className={`efc-result ${resultOn ? 'on' : ''}`}>
        <Check className="w-4 h-4 shrink-0 text-emerald-400" strokeWidth={2.6} />
        <div className="efc-result-text">
          {scenario.result.title}
          <span>{scenario.result.sub}</span>
        </div>
      </div>

    </div>
  );
};

export default HeroFlowConsole;

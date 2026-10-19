// Site-wide motion runtime. One Lenis instance drives smooth scroll and feeds
// GSAP ScrollTrigger; every page-level effect registers through onPage() so it
// is set up on each `astro:page-load` (View Transitions keep the document) and
// torn down before the next swap. Content is visible by default: effects only
// run when the `js-motion` class is present (motion allowed).
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Cleanup = (() => void) | void;
type PageInit = () => Cleanup;

const inits: PageInit[] = [];
let cleanups: Array<() => void> = [];
let lenis: Lenis | null = null;
let started = false;

export const motionAllowed = () => document.documentElement.classList.contains('js-motion');

/** Register a page-level effect. It runs on every page load and its cleanup before the next swap. */
export function onPage(init: PageInit) {
  inits.push(init);
  if (started) runOne(init);
}

function runOne(init: PageInit) {
  const c = init();
  if (typeof c === 'function') cleanups.push(c);
}

function reveals(): Cleanup {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
  if (!motionAllowed() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.style.transitionDelay = `${Number(el.dataset.reveal || 0) * 80}ms`;
      el.classList.add('is-in');
      io.unobserve(el);
    }
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Muted loops play only while on screen; reduced motion keeps their poster. */
function loops(): Cleanup {
  const vids = document.querySelectorAll<HTMLVideoElement>('video[data-loop]');
  if (!vids.length || !motionAllowed()) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }
  }, { threshold: 0.25 });
  vids.forEach((v) => io.observe(v));
  return () => io.disconnect();
}

/** Cursor-following glow on cards (production's .card-glow::after reads --glow-x/y). */
function cardGlow(): Cleanup {
  if (!matchMedia('(hover: hover)').matches) return;
  const onMove = (e: PointerEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.card-glow');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', `${e.clientX - r.left}px`);
    card.style.setProperty('--glow-y', `${e.clientY - r.top}px`);
  };
  document.addEventListener('pointermove', onMove, { passive: true });
  return () => document.removeEventListener('pointermove', onMove);
}

/** Mark the current section in the persistent nav. */
function navState(): Cleanup {
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((a) => {
    const href = a.getAttribute('href')!.replace(/\/$/, '') || '/';
    const on = href !== '/' && (path === href || path.startsWith(`${href}/`));
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

export function initMotion() {
  if (started) return;
  started = true;

  if (motionAllowed()) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis?.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    // In-page anchors go through Lenis so they glide instead of jumping.
    document.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || !lenis) return;
      const id = a.getAttribute('href')!;
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    });
  }

  inits.unshift(reveals, loops, navState, cardGlow);

  document.addEventListener('astro:page-load', () => {
    const target = location.hash ? document.querySelector<HTMLElement>(location.hash) : null;
    lenis?.scrollTo(target ?? 0, { immediate: true, force: true, offset: target ? -80 : 0 });
    inits.forEach(runOne);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  // The router swaps <html> attributes from the new document: keep the motion flag.
  const allowed = motionAllowed();
  document.addEventListener('astro:after-swap', () => {
    document.documentElement.classList.toggle('js-motion', allowed);
  });

  document.addEventListener('astro:before-swap', () => {
    cleanups.forEach((c) => c());
    cleanups = [];
    ScrollTrigger.getAll().forEach((st) => st.kill());
  });
}

export { gsap, ScrollTrigger };

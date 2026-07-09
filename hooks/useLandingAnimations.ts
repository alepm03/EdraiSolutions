import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Central GSAP setup for the landing page.
 *
 * Design goals:
 *  - FOUC-safe: every entrance uses gsap.from(), so without JS the content
 *    stays fully visible.
 *  - Accessible: all motion is gated behind prefers-reduced-motion via
 *    gsap.matchMedia(); reduced-motion users get the static layout.
 *  - Performant: only transform/opacity are animated; scroll reveals fire once.
 *
 * Hook into a root ref that wraps the whole page. Animations are scoped to it,
 * so cleanup is automatic on unmount (handled by useGSAP).
 */
export function useLandingAnimations(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── Scroll progress bar (works regardless of motion preference) ──────────
      const bar = scope.current?.querySelector<HTMLElement>('[data-scroll-progress]');
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
          }
        );
      }

      // ── Motion-only animations ───────────────────────────────────────────────
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero entrance — cohesive staggered timeline
        const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero-item]');
        if (heroItems.length) {
          gsap.from(heroItems, {
            y: 28,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            delay: 0.1,
          });
        }

        // Hero robot — slide de entrada. Sin float continuo: el robot debe
        // quedar estático con los pies en la divisoria de la sección.
        const mockup = scope.current?.querySelector<HTMLElement>('[data-hero-mockup]');
        if (mockup) {
          gsap.from(mockup, { x: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.25 });
        }

        // Hero parallax — aurora blobs react to pointer (subtle depth)
        const hero = scope.current?.querySelector<HTMLElement>('[data-hero]');
        const layers = gsap.utils.toArray<HTMLElement>('[data-parallax]');
        if (hero && layers.length) {
          const qx = layers.map((l) => gsap.quickTo(l, 'xPercent', { duration: 1.2, ease: 'power3' }));
          const qy = layers.map((l) => gsap.quickTo(l, 'yPercent', { duration: 1.2, ease: 'power3' }));
          const onMove = (e: PointerEvent) => {
            const r = hero.getBoundingClientRect();
            const dx = (e.clientX - r.left) / r.width - 0.5;
            const dy = (e.clientY - r.top) / r.height - 0.5;
            layers.forEach((l, i) => {
              const depth = Number(l.dataset.parallax) || 1;
              qx[i](dx * depth * 6);
              qy[i](dy * depth * 6);
            });
          };
          hero.addEventListener('pointermove', onMove);
        }

        // Scroll reveals — batched fade/translate, fired once per element
        const reveals = gsap.utils.toArray<HTMLElement>('.gsap-reveal');
        if (reveals.length) {
          gsap.set(reveals, { opacity: 0, y: 36 });
          ScrollTrigger.batch(reveals, {
            start: 'top 88%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1,
              }),
          });
        }

        // 3D tilt + cursor glow on cards marked [data-tilt]
        const cards = gsap.utils.toArray<HTMLElement>('[data-tilt]');
        cards.forEach((card) => {
          const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' });
          const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' });
          gsap.set(card, { transformPerspective: 900, transformStyle: 'preserve-3d' });
          const onMove = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            rotY(px * 7);
            rotX(-py * 7);
            card.style.setProperty('--glow-x', `${(px + 0.5) * 100}%`);
            card.style.setProperty('--glow-y', `${(py + 0.5) * 100}%`);
          };
          const onLeave = () => {
            rotX(0);
            rotY(0);
          };
          card.addEventListener('pointermove', onMove);
          card.addEventListener('pointerleave', onLeave);
        });

        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    { scope }
  );
}

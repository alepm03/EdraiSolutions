/**
 * Instrumentación de la landing sin tocar el JSX: un solo listener delegado en
 * `document` para los clics de valor (CTAs, WhatsApp, email, teléfono, redes),
 * un IntersectionObserver para saber qué secciones se llegan a ver, y marcas de
 * profundidad de scroll. Cada evento se manda una sola vez por visita cuando
 * repetirlo no aporta nada.
 */
import { useEffect } from 'react';
import { track, EV } from '../lib/analytics';

const DEPTHS = [25, 50, 75, 100] as const;

/** Sección de la página donde ocurrió el clic, para saber qué CTA convierte. */
function ubicacionDe(el: Element): string {
  if (el.closest('header')) return 'cabecera';
  if (el.closest('footer')) return 'pie';
  const seccion = el.closest('section');
  if (seccion?.id) return seccion.id;
  if (seccion?.hasAttribute('data-hero')) return 'hero';
  return 'otra';
}

export function usePageAnalytics(): void {
  useEffect(() => {
    // ── Clics de valor ───────────────────────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      const enlace = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!enlace) return;

      const href = enlace.getAttribute('href') || '';
      const texto = enlace.textContent?.trim().slice(0, 60) || '';
      const ubicacion = ubicacionDe(enlace);

      if (href.includes('wa.me')) {
        track(EV.contactoDirecto, { canal: 'whatsapp', ubicacion });
      } else if (href.startsWith('mailto:')) {
        track(EV.contactoDirecto, { canal: 'email', ubicacion });
      } else if (href.startsWith('tel:')) {
        track(EV.contactoDirecto, { canal: 'telefono', ubicacion });
      } else if (href.startsWith('#contacto')) {
        track(EV.ctaClick, { destino: 'contacto', ubicacion, texto });
      } else if (href.startsWith('#') && href.length > 1) {
        track(EV.navInterna, { destino: href.slice(1), ubicacion });
      } else if (/^https?:/.test(href)) {
        try {
          track(EV.enlaceExterno, { dominio: new URL(href).hostname, ubicacion });
        } catch { /* href malformado: no merece un evento */ }
      }
    };
    document.addEventListener('click', onClick, { capture: true });

    // ── Secciones vistas ─────────────────────────────────────────────────────
    const vistas = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (!entry.isIntersecting || !id || vistas.has(id)) continue;
          vistas.add(id);
          track(EV.seccionVista, { seccion: id });
        }
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));

    // ── Profundidad de scroll ────────────────────────────────────────────────
    const alcanzados = new Set<number>();
    const onScroll = () => {
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      if (alto <= 0) return;
      const pct = (window.scrollY / alto) * 100;
      for (const d of DEPTHS) {
        if (pct >= d && !alcanzados.has(d)) {
          alcanzados.add(d);
          track(EV.scrollProfundidad, { porcentaje: d });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);
}

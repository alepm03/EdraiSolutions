/**
 * Per-section visual identity map.
 *
 * Históricamente cada sección tenía su propio color (azul, morado, esmeralda),
 * pese al comentario de abajo que decía "staying on-brand" — no lo estaba: la
 * guía de marca (design_v3.md) documenta un único acento, cian `#22d3ee`
 * (con una variante más profunda, `--brand-strong` `#0ea5e9`, para dar
 * profundidad sin cambiar de tono). Unificado 2026-09 — todas las entradas
 * usan la familia cian de Tailwind (`cyan-300/400/500`); la diferenciación
 * entre secciones viene ahora de la tipografía y el layout, no del color.
 *
 * Usage:
 *   import { getSectionTheme } from '../lib/sectionTheme';
 *   const theme = getSectionTheme('proceso');
 *   <span className={theme.eyebrow}>NUESTRO PROCESO</span>
 */

export interface SectionTheme {
  /** Hex accent color, e.g. "#22d3ee" */
  accent: string;
  /** RGB triplet string for use in rgba(), e.g. "34, 211, 238" */
  accentRgb: string;
  /** Tailwind classes for the small uppercase eyebrow/label */
  eyebrow: string;
  /** Tailwind classes for a soft glow effect (box-shadow) */
  glow: string;
  /** Tailwind classes for an accent-coloured hover border */
  border: string;
  /** Tailwind classes for a small badge/chip */
  chip: string;
}

const themes: Record<string, SectionTheme> = {
  servicios: {
    accent: '#22d3ee',
    accentRgb: '34, 211, 238',
    eyebrow:
      'text-[#22d3ee] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.25)]',
    border:
      'border border-transparent hover:border-[#22d3ee] transition-colors duration-200',
    chip: 'bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.25)] text-[#22d3ee] text-xs px-2 py-0.5 rounded-full',
  },

  proceso: {
    accent: '#22d3ee',
    accentRgb: '34, 211, 238',
    eyebrow:
      'text-[#22d3ee] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.25)]',
    border:
      'border border-transparent hover:border-[#22d3ee] transition-colors duration-200',
    chip: 'bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.25)] text-[#22d3ee] text-xs px-2 py-0.5 rounded-full',
  },

  sectores: {
    accent: '#22d3ee',
    accentRgb: '34, 211, 238',
    eyebrow:
      'text-[#22d3ee] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.25)]',
    border:
      'border border-transparent hover:border-[#22d3ee] transition-colors duration-200',
    chip: 'bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.25)] text-[#22d3ee] text-xs px-2 py-0.5 rounded-full',
  },

  demos: {
    accent: '#22d3ee',
    accentRgb: '34, 211, 238',
    eyebrow:
      'text-[#22d3ee] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.25)]',
    border:
      'border border-transparent hover:border-[#22d3ee] transition-colors duration-200',
    chip: 'bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.25)] text-[#22d3ee] text-xs px-2 py-0.5 rounded-full',
  },

  equipo: {
    accent: '#22d3ee',
    accentRgb: '34, 211, 238',
    eyebrow:
      'text-[#22d3ee] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.25)]',
    border:
      'border border-transparent hover:border-[#22d3ee] transition-colors duration-200',
    chip: 'bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.25)] text-[#22d3ee] text-xs px-2 py-0.5 rounded-full',
  },

  faq: {
    accent: '#22d3ee',
    accentRgb: '34, 211, 238',
    eyebrow:
      'text-[#22d3ee] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.25)]',
    border:
      'border border-transparent hover:border-[#22d3ee] transition-colors duration-200',
    chip: 'bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.25)] text-[#22d3ee] text-xs px-2 py-0.5 rounded-full',
  },

  contacto: {
    accent: '#22d3ee',
    accentRgb: '34, 211, 238',
    eyebrow:
      'text-[#22d3ee] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.25)]',
    border:
      'border border-transparent hover:border-[#22d3ee] transition-colors duration-200',
    chip: 'bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.25)] text-[#22d3ee] text-xs px-2 py-0.5 rounded-full',
  },
};

/** Cyan fallback for unknown section IDs */
const FALLBACK: SectionTheme = themes.servicios;

/**
 * Returns the SectionTheme for the given section ID.
 * Falls back to cyan (servicios) if the ID is not in the map.
 */
export function getSectionTheme(id: string): SectionTheme {
  return themes[id] ?? FALLBACK;
}

export default themes;

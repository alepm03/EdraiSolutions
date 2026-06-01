/**
 * Per-section visual identity map.
 * Each entry provides an accent color + ready-to-use Tailwind class strings
 * so every section can have its own chromatic identity while staying on-brand.
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
    accent: '#3b82f6',
    accentRgb: '59, 130, 246',
    eyebrow:
      'text-[#3b82f6] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.25)]',
    border:
      'border border-transparent hover:border-[#3b82f6] transition-colors duration-200',
    chip: 'bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.25)] text-[#3b82f6] text-xs px-2 py-0.5 rounded-full',
  },

  sectores: {
    accent: '#8b5cf6',
    accentRgb: '139, 92, 246',
    eyebrow:
      'text-[#8b5cf6] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.25)]',
    border:
      'border border-transparent hover:border-[#8b5cf6] transition-colors duration-200',
    chip: 'bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.25)] text-[#8b5cf6] text-xs px-2 py-0.5 rounded-full',
  },

  demos: {
    accent: '#10b981',
    accentRgb: '16, 185, 129',
    eyebrow:
      'text-[#10b981] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    border:
      'border border-transparent hover:border-[#10b981] transition-colors duration-200',
    chip: 'bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.25)] text-[#10b981] text-xs px-2 py-0.5 rounded-full',
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
    accent: '#3b82f6',
    accentRgb: '59, 130, 246',
    eyebrow:
      'text-[#3b82f6] text-xs font-semibold uppercase tracking-[0.2em]',
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.25)]',
    border:
      'border border-transparent hover:border-[#3b82f6] transition-colors duration-200',
    chip: 'bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.25)] text-[#3b82f6] text-xs px-2 py-0.5 rounded-full',
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

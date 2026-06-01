/**
 * SectionDivider — animated horizontal divider between landing page sections.
 *
 * Visual: a thin full-width line with a gradient fade on both ends,
 * plus a luminous beam that travels across it on an infinite loop.
 * Under prefers-reduced-motion: renders the static gradient line only.
 *
 * Props:
 *   accentRgb — RGB triplet string, e.g. "34, 211, 238" (default: cyan)
 *
 * Usage:
 *   import SectionDivider from '../components/SectionDivider';
 *   <SectionDivider accentRgb="59, 130, 246" />
 */

import React, { useId } from 'react';

interface SectionDividerProps {
  accentRgb?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  accentRgb = '34, 211, 238',
}) => {
  const uid = useId().replace(/:/g, '');
  const beamId = `beam-${uid}`;
  const glowId = `glow-${uid}`;

  return (
    <>
      {/* Scoped keyframes — isolated per instance, no global file edits */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes ${beamId} {
            0%   { transform: translateX(-110%); }
            100% { transform: translateX(110%); }
          }
          @keyframes ${glowId} {
            0%, 100% { opacity: 0.6; }
            50%       { opacity: 1; }
          }
          .divider-beam-${uid} {
            animation:
              ${beamId} 4s cubic-bezier(0.4, 0, 0.6, 1) infinite,
              ${glowId} 4s ease-in-out infinite;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .divider-beam-${uid} {
            display: none;
          }
        }
      `}</style>

      {/* Outer wrapper: full-width, vertically padded */}
      <div
        aria-hidden="true"
        className="relative w-full py-8 flex items-center justify-center overflow-hidden"
      >
        {/* Inner container: max-width centred, same rhythm as page content */}
        <div className="relative w-full max-w-6xl mx-auto px-6">

          {/* Static gradient line — always visible */}
          <div
            className="relative h-px w-full overflow-hidden rounded-full"
            style={{
              background: `linear-gradient(
                to right,
                transparent 0%,
                rgba(${accentRgb}, 0.08) 10%,
                rgba(${accentRgb}, 0.35) 30%,
                rgba(${accentRgb}, 0.5) 50%,
                rgba(${accentRgb}, 0.35) 70%,
                rgba(${accentRgb}, 0.08) 90%,
                transparent 100%
              )`,
            }}
          >
            {/* Traveling beam — hidden under prefers-reduced-motion */}
            <div
              className={`divider-beam-${uid} absolute inset-y-0 left-0`}
              style={{
                width: '30%',
                background: `linear-gradient(
                  to right,
                  transparent 0%,
                  rgba(${accentRgb}, 0.0) 0%,
                  rgba(${accentRgb}, 0.9) 40%,
                  rgba(${accentRgb}, 1) 50%,
                  rgba(${accentRgb}, 0.9) 60%,
                  rgba(${accentRgb}, 0.0) 100%
                )`,
                filter: `blur(1px) drop-shadow(0 0 6px rgba(${accentRgb}, 0.8))`,
              }}
            />
          </div>

          {/* Soft vertical glow bleed below the line */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-6 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, rgba(${accentRgb}, 0.07) 0%, transparent 70%)`,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SectionDivider;

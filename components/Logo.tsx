import React, { useId } from 'react';

type MarkVariant = 'inverse' | 'primary';

/**
 * Símbolo de marca «Corte» (propuesta 4b): el cuadrado del favicon seccionado
 * en diagonal y desplazado. El hueco del corte es transparente, así que el
 * fondo se ve a través de él.
 *
 * - `inverse`  → cian + blanco. Uso sobre fondos oscuros (toda la web).
 * - `primary`  → cian + navy.   Uso sobre fondos claros (documentos, facturas).
 */
export const LogoMark: React.FC<{ className?: string; variant?: MarkVariant }> = ({
  className = 'w-10 h-10',
  variant = 'inverse',
}) => {
  const clipId = `edrai-cut-${useId()}`;
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Edrai Solutions">
      <defs>
        <clipPath id={clipId}>
          <rect x="4" y="4" width="92" height="92" rx="26" ry="26" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path d="M -125 147 L 221 -53 L 400 -400 L -400 -400 Z" fill="#22D3EE" />
        <path
          d="M -121 153 L 225 -47 L 400 400 L -400 400 Z"
          fill={variant === 'inverse' ? '#FFFFFF' : '#0D1B2A'}
        />
      </g>
    </svg>
  );
};

/**
 * Lockup horizontal: símbolo + wordmark «EdrAI» con la regla cian sobre
 * «SOLUTIONS». La versal en «AI» es exclusiva del logo: el nombre legal, el
 * dominio y todo el texto corrido siguen siendo «Edrai Solutions».
 */
export const Logo: React.FC<{ size?: 'nav' | 'footer'; className?: string }> = ({
  size = 'nav',
  className = '',
}) => {
  const nav = size === 'nav';
  return (
    <div className={`flex items-center ${nav ? 'gap-3' : 'gap-4'} ${className}`}>
      <LogoMark
        className={`${nav ? 'w-10 h-10' : 'w-14 h-14'} shrink-0 transition-transform group-hover:-translate-y-0.5`}
      />
      <div>
        <div
          className={`${nav ? 'text-2xl' : 'text-4xl'} font-black tracking-tighter leading-none text-white`}
        >
          Edr<span className="text-cyan-400">AI</span>
        </div>
        <div
          className={`flex items-center ${nav ? 'gap-2 mt-1' : 'gap-2.5 mt-2'} text-gray-400 font-bold uppercase ${
            nav ? 'text-[9px] tracking-[0.38em]' : 'text-[11px] tracking-[0.42em]'
          }`}
        >
          <span className={`${nav ? 'w-3.5' : 'w-5'} h-[2px] bg-cyan-400 shrink-0`} />
          Solutions
        </div>
      </div>
    </div>
  );
};

export default Logo;

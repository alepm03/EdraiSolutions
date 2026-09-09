import React, { useId } from 'react';

type MarkVariant = 'inverse' | 'primary';

/**
 * Símbolo de marca «Corte»: el cuadrado del favicon seccionado en diagonal,
 * con la mitad superior desplazada. El hueco entre las dos mitades es parte
 * de la marca — no cerrarlo ni reducirlo.
 *
 * Geometría exacta del paquete de marca oficial (Claude Design, viewBox
 * `0 0 64 64`, clip `rx16` sobre un cuadrado de 56). No redibujar a mano.
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
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Edrai Solutions">
      <defs>
        <clipPath id={clipId}>
          <rect x="4" y="4" width="56" height="56" rx="16" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M-4 50 L68 18 L68 68 L-4 68 Z"
          fill={variant === 'inverse' ? '#FFFFFF' : '#0D1B2A'}
        />
        <path d="M2 38 L74 6 L74 -8 L2 -8 Z" fill="#22D3EE" />
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
          className={`${nav ? 'text-2xl' : 'text-4xl'} font-['Archivo'] font-extrabold tracking-tighter leading-none text-white`}
        >
          Edr<span className="text-cyan-400">AI</span>
        </div>
        <div
          className={`flex items-center ${nav ? 'gap-2 mt-1' : 'gap-2.5 mt-2'} text-gray-400 font-['Archivo'] font-semibold uppercase ${
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

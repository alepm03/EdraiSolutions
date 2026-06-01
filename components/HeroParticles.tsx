import React, { useEffect, useRef } from 'react';

/**
 * Animated "neural network" particle field for the hero background.
 *
 * Always-on, GPU-light canvas animation: floating nodes connected by lines
 * when close, with a subtle pull toward the pointer. This is the signature
 * AI-agency motion the static layout was missing.
 *
 * Accessible: bails out entirely under prefers-reduced-motion.
 * Performant: capped particle count scaled to viewport, single rAF loop,
 * pauses when the tab is hidden, only 2D transforms.
 */
const HeroParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number };
    let particles: P[] = [];

    const build = () => {
      const parent = canvas.parentElement!;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scaled to area, capped for performance
      const count = Math.min(90, Math.round((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const LINK = 150; // px distance to draw a connecting line

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Glow so nodes pop against the near-black hero
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(34, 211, 238, 0.9)';

      for (const p of particles) {
        // gentle pointer attraction
        const dxp = pointer.x - p.x;
        const dyp = pointer.y - p.y;
        const dp = Math.hypot(dxp, dyp);
        if (dp < 180 && dp > 0.01) {
          p.vx += (dxp / dp) * 0.012;
          p.vy += (dyp / dp) * 0.012;
        }
        // damp + drift
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 224, 248, 0.85)';
        ctx.fill();
      }

      // connecting lines (no glow — keeps the loop cheap)
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.38;
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    let raf = 0;
    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const stop = () => cancelAnimationFrame(raf);

    const onResize = () => build();
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    build();
    start();
    window.addEventListener('resize', onResize);
    const parent = canvas.parentElement!;
    parent.addEventListener('pointermove', onMove);
    parent.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10 pointer-events-none"
    />
  );
};

export default HeroParticles;

import React, { useEffect, useRef } from 'react';

/**
 * SiteBackground
 *
 * Global animated backdrop that sits fixed behind the entire site to break the
 * flat-black monotony of #030712. It renders:
 *   - a faint technical cyan grid (drawn on the canvas, slow drift)
 *   - thin luminous "data" beams that travel along grid lines, fade in/out,
 *     staggered and slow (cyan primary; occasional electric-blue / violet)
 *   - a couple of very soft drifting radial glows for depth
 *
 * Mount once, just inside the root <div> of App.tsx. No props.
 *
 * Performance: single <canvas>, single requestAnimationFrame loop, capped
 * device pixel ratio, paused while the tab is hidden. Under
 * prefers-reduced-motion only the static grid is painted (no rAF).
 */

// ── Palette (kept off pure #fff; tints carry the brand hue) ──────────────────
const COLORS = {
  background: '#030712',
  grid: 'rgba(34, 211, 238, 0.045)', // cyan, very low opacity
  beams: [
    { core: '52, 224, 245', glow: '34, 211, 238' }, // cyan (primary, weighted)
    { core: '52, 224, 245', glow: '34, 211, 238' }, // cyan again -> majority
    { core: '96, 165, 250', glow: '59, 130, 246' }, // electric blue
    { core: '167, 139, 250', glow: '139, 92, 246' }, // violet
  ],
} as const;

const GRID_SIZE = 64; // px between grid lines (CSS px)
const DRIFT_PERIOD = 26000; // ms for one full grid-cell drift cycle
const MAX_BEAMS = 7; // a handful at a time, never a screensaver
const DPR_CAP = 2;

type Axis = 'h' | 'v';

interface Beam {
  axis: Axis;
  line: number; // grid-line index it travels along
  pos: number; // head position along the axis, in CSS px
  speed: number; // px per second
  length: number; // tail length in CSS px
  color: { core: string; glow: string };
  born: number; // timestamp (ms) for fade-in
  life: number; // total lifetime in ms
  age: number; // elapsed ms
}

// Exponential ease-out: fast start, gentle settle. No bounce.
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const SiteBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let running = false;
    let lastTime = 0;
    let startTime = 0;

    const beams: Beam[] = [];
    // Soft drifting glows: position fractions + drift phase.
    const glows = [
      { hue: '34, 211, 238', baseX: 0.18, baseY: 0.22, r: 0.55, phase: 0 },
      { hue: '139, 92, 246', baseX: 0.82, baseY: 0.78, r: 0.6, phase: Math.PI },
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) drawStaticGrid();
    };

    // ── Drawing ───────────────────────────────────────────────────────────
    const drawGrid = (offset: number) => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = COLORS.grid;
      ctx.beginPath();
      // Vertical lines (drift right), wrap by GRID_SIZE.
      for (let x = -GRID_SIZE + offset; x <= width + GRID_SIZE; x += GRID_SIZE) {
        const px = Math.round(x) + 0.5;
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
      }
      // Horizontal lines (drift down).
      for (let y = -GRID_SIZE + offset; y <= height + GRID_SIZE; y += GRID_SIZE) {
        const py = Math.round(y) + 0.5;
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
      }
      ctx.stroke();
    };

    const drawStaticGrid = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid(0);
    };

    const drawGlows = (time: number) => {
      for (const g of glows) {
        const t = time / 1000;
        const drift = 0.04; // gentle wander, fraction of viewport
        const cx = (g.baseX + Math.sin(t * 0.05 + g.phase) * drift) * width;
        const cy = (g.baseY + Math.cos(t * 0.04 + g.phase) * drift) * height;
        const radius = g.r * Math.max(width, height);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${g.hue}, 0.05)`);
        grad.addColorStop(1, `rgba(${g.hue}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const spawnBeam = (now: number): Beam => {
      const axis: Axis = Math.random() < 0.5 ? 'h' : 'v';
      const span = axis === 'h' ? width : height;
      const cross = axis === 'h' ? height : width;
      const lineCount = Math.max(1, Math.floor(cross / GRID_SIZE));
      const line = Math.floor(Math.random() * (lineCount + 1));
      const dir = Math.random() < 0.5 ? 1 : -1;
      const speed = 80 + Math.random() * 90; // px/s, slow & elegant
      const length = 140 + Math.random() * 220;
      const color = COLORS.beams[Math.floor(Math.random() * COLORS.beams.length)];
      const travel = span + length * 2;
      return {
        axis,
        line,
        // Start just off the leading edge so the head enters cleanly.
        pos: dir === 1 ? -length : span + length,
        speed: speed * dir,
        length,
        color,
        born: now,
        life: (travel / speed) * 1000,
        age: 0,
      };
    };

    const drawBeam = (b: Beam) => {
      const along = b.line * GRID_SIZE + GRID_SIZE; // snap to a grid line
      const head = b.pos;
      const tail = head - Math.sign(b.speed) * b.length;

      // Envelope: ease-in over first 18%, ease-out over last 22% of life.
      const p = b.age / b.life;
      let alpha = 1;
      if (p < 0.18) alpha = easeOutQuart(p / 0.18);
      else if (p > 0.78) alpha = easeOutQuart((1 - p) / 0.22);
      alpha = Math.max(0, Math.min(1, alpha));
      if (alpha <= 0) return;

      let x0: number, y0: number, x1: number, y1: number;
      if (b.axis === 'h') {
        x0 = tail; y0 = along; x1 = head; y1 = along;
      } else {
        x0 = along; y0 = tail; x1 = along; y1 = head;
      }

      const grad = ctx.createLinearGradient(x0, y0, x1, y1);
      grad.addColorStop(0, `rgba(${b.color.glow}, 0)`);
      grad.addColorStop(0.7, `rgba(${b.color.glow}, ${0.22 * alpha})`);
      grad.addColorStop(1, `rgba(${b.color.core}, ${0.85 * alpha})`);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter'; // additive glow on dark bg
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${b.color.glow}, ${0.6 * alpha})`;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();

      // Bright head dot.
      ctx.shadowBlur = 10;
      ctx.fillStyle = `rgba(${b.color.core}, ${0.9 * alpha})`;
      ctx.beginPath();
      ctx.arc(x1, y1, 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let spawnTimer = 0;
    const SPAWN_INTERVAL = 900; // ms between spawn attempts (staggered)

    const frame = (now: number) => {
      if (!running) return;
      if (!startTime) startTime = now;
      const dt = lastTime ? Math.min(now - lastTime, 50) : 16; // clamp big gaps
      lastTime = now;
      const elapsed = now - startTime;

      ctx.clearRect(0, 0, width, height);

      // Soft depth glows behind the grid.
      drawGlows(elapsed);

      // Drifting grid (diagonal-ish: same offset on both axes).
      const offset = (elapsed % DRIFT_PERIOD) / DRIFT_PERIOD * GRID_SIZE;
      drawGrid(offset);

      // Spawn beams on a staggered cadence, capped.
      spawnTimer += dt;
      if (spawnTimer >= SPAWN_INTERVAL && beams.length < MAX_BEAMS) {
        spawnTimer = 0;
        if (Math.random() < 0.75) beams.push(spawnBeam(now));
      }

      // Update + draw beams; reap dead ones.
      for (let i = beams.length - 1; i >= 0; i--) {
        const b = beams[i];
        b.age += dt;
        b.pos += (b.speed * dt) / 1000;
        if (b.age >= b.life) {
          beams.splice(i, 1);
          continue;
        }
        drawBeam(b);
      }

      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      lastTime = 0;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    // ── Init ──────────────────────────────────────────────────────────────
    resize();
    window.addEventListener('resize', resize);

    if (reduceMotion) {
      drawStaticGrid();
    } else {
      document.addEventListener('visibilitychange', onVisibility);
      start();
    }

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -50, background: COLORS.background }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default SiteBackground;

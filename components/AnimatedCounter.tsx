import { useEffect, useRef, useState } from "react";

export interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number; // ms, default 1800
  className?: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function formatNum(n: number, decimals: number): string {
  if (!isFinite(n)) return "0";
  return decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1800,
  className = "",
}: AnimatedCounterProps) {
  const finalValue = isFinite(value) ? value : 0;
  const [display, setDisplay] = useState<string>(formatNum(finalValue, decimals));
  const containerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion() || finalValue === 0) {
      setDisplay(formatNum(finalValue, decimals));
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();
          animate();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalValue, decimals, duration]);

  function animate() {
    const start = performance.now();
    const startVal = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (finalValue - startVal) * eased;
      setDisplay(formatNum(current, decimals));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  return (
    <span ref={containerRef} className={className} aria-label={`${prefix}${finalValue}${suffix}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

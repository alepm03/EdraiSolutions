import { useEffect, useRef, useState } from "react";

export interface MarqueeItem {
  name: string;
  icon: React.ReactNode;
}

export interface LogoMarqueeProps {
  items: MarqueeItem[];
  /** pixels per second, default 40 */
  speed?: number;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const MARQUEE_KEYFRAMES = `
@keyframes edrai-marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

let styleInjected = false;
function injectStyles() {
  if (styleInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = MARQUEE_KEYFRAMES;
  document.head.appendChild(style);
  styleInjected = true;
}

export default function LogoMarquee({ items, speed = 40 }: LogoMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const reduced = prefersReducedMotion();

  // Duration scales with item count so speed stays constant regardless of list length
  const itemWidthEstimate = 140; // px per item (icon + name + gap)
  const totalWidth = items.length * itemWidthEstimate;
  const durationSeconds = totalWidth / speed;

  useEffect(() => {
    if (!reduced) injectStyles();
  }, [reduced]);

  // Static fallback for reduced-motion
  if (reduced) {
    return (
      <div className="overflow-hidden w-full py-2">
        <div className="flex flex-wrap gap-6 justify-center">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 text-white/70 text-sm font-medium select-none"
            >
              <span className="text-[#22d3ee]">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Duplicate list for seamless wrap
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden w-full py-2"
      style={{
        // Edge fade masks
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Tecnologías que usamos"
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: "max-content",
          animationName: "edrai-marquee",
          animationDuration: `${durationSeconds}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((item, i) => (
          <div
            // index suffix is safe here — order is static
            key={`${item.name}-${i}`}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 select-none cursor-default"
            style={{ padding: "0 40px 0 0", minWidth: "100px" }}
          >
            <span className="text-[#22d3ee] flex-shrink-0">{item.icon}</span>
            <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

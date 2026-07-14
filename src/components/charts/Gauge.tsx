import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../lib/motion";

interface Props {
  pct: number;
  locale: string;
}

/** Semi-circular gauge that fills when scrolled into view. */
export default function Gauge({ pct, locale }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { reduced } = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const shown = visible || reduced;
  const R = 130;
  const C = Math.PI * R; // semicircle length
  const filled = (pct / 100) * C;

  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!shown) return;
    if (reduced) {
      setDisplay(pct);
      return;
    }
    const t0 = performance.now();
    const dur = 2000;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(pct * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, pct, reduced]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-sm">
      <svg viewBox="0 0 320 180" className="w-full">
        <path
          d="M 30 165 A 130 130 0 0 1 290 165"
          fill="none"
          stroke="rgba(253,253,253,0.1)"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M 30 165 A 130 130 0 0 1 290 165"
          fill="none"
          stroke="#f5a200"
          strokeWidth="22"
          strokeLinecap="round"
          strokeDasharray={`${C}`}
          strokeDashoffset={shown ? C - filled : C}
          style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-1 text-center">
        <span className="stat-number text-5xl font-black text-gold-500 md:text-6xl">
          {display.toLocaleString(locale === "es" ? "es" : "en-US", {
            maximumFractionDigits: 2,
            minimumFractionDigits: display > 0 && display < pct ? 2 : 2,
          })}
          %
        </span>
      </div>
    </div>
  );
}

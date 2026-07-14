import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../lib/motion";

interface Bar {
  label: string;
  pct: number;
  color?: string;
}

interface Props {
  bars: Bar[];
  title: string;
  maxPct?: number;
}

/** Horizontal bar chart whose bars grow in on scroll. */
export default function HBarChart({ bars, title, maxPct = 35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { reduced } = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const shown = visible || reduced;

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-paper/10 bg-navy-900/60 p-6 md:p-8"
    >
      <h4 className="mb-6 text-base font-black text-paper md:text-lg">{title}</h4>
      <div className="space-y-4">
        {bars.map((b, i) => (
          <div key={b.label}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="text-sm text-paper/80">{b.label}</span>
              <span
                className="stat-number text-sm font-black"
                style={{
                  color: b.color ?? "#f5a200",
                  opacity: shown ? 1 : 0,
                  transition: `opacity 0.5s ease ${i * 130 + 600}ms`,
                }}
              >
                {b.pct}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-paper/8">
              <div
                className="h-full rounded-full"
                style={{
                  width: shown ? `${(b.pct / maxPct) * 100}%` : "0%",
                  background: b.color ?? "#f5a200",
                  transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 130}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

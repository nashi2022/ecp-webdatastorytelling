import { useEffect, useRef, useState } from "react";
import { arc, pie } from "d3-shape";
import { useReducedMotion } from "../../lib/motion";

interface Slice {
  label: string;
  pct: number;
  color: string;
}

interface Props {
  slices: Slice[];
  title: string;
  centerTop: string;
  centerBottom: string;
}

/** Animated donut chart: slices sweep in when scrolled into view. */
export default function Donut({ slices, title, centerTop, centerBottom }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { reduced } = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        if (reduced) {
          setProgress(1);
          return;
        }
        const t0 = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          setProgress(1 - Math.pow(1 - p, 3));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  const R = 150;
  const gen = pie<Slice>()
    .value((d) => d.pct)
    .sort(null)
    .padAngle(0.015);
  const arcs = gen(slices as Slice[]);
  const arcGen = arc<{ startAngle: number; endAngle: number; padAngle: number }>()
    .innerRadius(R * 0.62)
    .outerRadius(R)
    .cornerRadius(3);

  return (
    <div ref={ref}>
      <h4 className="mb-6 text-center text-base font-black text-paper md:text-lg">
        {title}
      </h4>
      <div className="relative mx-auto w-full max-w-xs">
        <svg viewBox={`${-R - 6} ${-R - 6} ${(R + 6) * 2} ${(R + 6) * 2}`} className="w-full">
          {arcs.map((a, i) => {
            const sweep = a.startAngle + (a.endAngle - a.startAngle) * progress;
            return (
              <path
                key={i}
                d={
                  arcGen({
                    startAngle: a.startAngle,
                    endAngle: sweep,
                    padAngle: a.padAngle,
                  }) ?? undefined
                }
                fill={a.data.color}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="stat-number text-4xl font-black text-gold-500 md:text-5xl">
            {centerTop}
          </span>
          <span className="mt-1 max-w-[9rem] text-[11px] leading-tight text-paper/60">
            {centerBottom}
          </span>
        </div>
      </div>
      <ul className="mx-auto mt-6 w-fit space-y-2">
        {slices.map((s) => (
          <li key={s.label} className="flex items-center gap-3 text-sm text-paper/80">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ background: s.color }}
            />
            <span>{s.label}</span>
            <span className="stat-number ml-auto pl-4 font-black text-paper">
              {s.pct}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

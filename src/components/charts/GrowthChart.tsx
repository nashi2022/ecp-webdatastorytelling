import { useId, useMemo } from "react";
import { scaleLinear } from "d3-scale";
import { area, curveMonotoneX, line } from "d3-shape";
import { growthSeries } from "../../data/impact";

interface Props {
  /** chart is revealed up to this year (inclusive, fractional ok) */
  upToYear: number;
  locale: string;
  label: string;
}

const W = 720;
const H = 440;
const M = { top: 30, right: 24, bottom: 40, left: 60 };

export default function GrowthChart({ upToYear, locale, label }: Props) {
  const clipId = useId();

  const { pathLine, pathArea, x, y, points } = useMemo(() => {
    const x = scaleLinear()
      .domain([2015, 2026])
      .range([M.left, W - M.right]);
    const y = scaleLinear()
      .domain([0, 4_000_000])
      .range([H - M.bottom, M.top]);
    const l = line<(typeof growthSeries)[number]>()
      .x((d) => x(d.year))
      .y((d) => y(d.learners))
      .curve(curveMonotoneX);
    const a = area<(typeof growthSeries)[number]>()
      .x((d) => x(d.year))
      .y0(H - M.bottom)
      .y1((d) => y(d.learners))
      .curve(curveMonotoneX);
    return {
      pathLine: l(growthSeries) ?? "",
      pathArea: a(growthSeries) ?? "",
      x,
      y,
      points: growthSeries,
    };
  }, []);

  const clipW = Math.max(
    0,
    Math.min(W, x(Math.min(upToYear, 2026)) - M.left + 4),
  );

  const fmt = (v: number) =>
    v >= 1_000_000
      ? `${(v / 1_000_000).toLocaleString(locale === "es" ? "es" : "en-US", { maximumFractionDigits: 1 })}M`
      : `${Math.round(v / 1000)}k`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={label}
    >
      <defs>
        <clipPath id={clipId}>
          <rect
            x={M.left - 4}
            y={0}
            height={H}
            width={clipW}
            style={{ transition: "width 1.4s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </clipPath>
        <linearGradient id={`${clipId}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5a200" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f5a200" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* gridlines + y labels */}
      {[1_000_000, 2_000_000, 3_000_000, 4_000_000].map((v) => (
        <g key={v}>
          <line
            x1={M.left}
            x2={W - M.right}
            y1={y(v)}
            y2={y(v)}
            stroke="rgba(253,253,253,0.08)"
            strokeDasharray="3 5"
          />
          <text
            x={M.left - 10}
            y={y(v) + 4}
            textAnchor="end"
            className="fill-paper/40"
            fontSize="12"
          >
            {fmt(v)}
          </text>
        </g>
      ))}
      {/* x labels */}
      {[2015, 2018, 2021, 2024, 2026].map((yr) => (
        <text
          key={yr}
          x={x(yr)}
          y={H - M.bottom + 24}
          textAnchor="middle"
          className="fill-paper/40"
          fontSize="12"
        >
          {yr}
        </text>
      ))}
      <line
        x1={M.left}
        x2={W - M.right}
        y1={H - M.bottom}
        y2={H - M.bottom}
        stroke="rgba(253,253,253,0.2)"
      />

      <g clipPath={`url(#${clipId})`}>
        <path d={pathArea} fill={`url(#${clipId}-g)`} />
        <path
          d={pathLine}
          fill="none"
          stroke="#f5a200"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* data points */}
      {points.map((p) => {
        const visible = p.year <= upToYear + 0.001;
        return (
          <g
            key={p.year}
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.5s",
            }}
          >
            <circle
              cx={x(p.year)}
              cy={y(p.learners)}
              r={p.approx ? 3.5 : 6}
              fill={p.approx ? "#0d2a66" : "#f5a200"}
              stroke={p.approx ? "rgba(245,162,0,0.5)" : "#fffaeb"}
              strokeWidth={p.approx ? 1.5 : 2}
            />
            {!p.approx && (
              <text
                x={x(p.year)}
                y={y(p.learners) - 14}
                textAnchor={p.year >= 2026 ? "end" : "middle"}
                className="fill-gold-400"
                fontSize="13"
                fontWeight="800"
              >
                {p.learners.toLocaleString(locale === "es" ? "es" : "en-US")}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

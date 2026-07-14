import { edinburghStudy } from "../../data/impact";

interface Props {
  stage: number; // 0..3
  labels: {
    title: string;
    treatment: string;
    control: string;
    source: string;
  };
}

function PersonIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6" fill={color}>
      <circle cx="12" cy="6" r="3.4" />
      <path d="M12 11c-3.6 0-6.5 2.4-6.5 5.4V21h13v-4.6c0-3-2.9-5.4-6.5-5.4z" />
    </svg>
  );
}

/**
 * Sticky visual for the Edinburgh experiment:
 * stage 1 — two groups of people appear
 * stage 2 — the meal voucher appears
 * stage 3 — result bars animate in
 */
export default function ExperimentVisual({ stage, labels }: Props) {
  const rows = [
    {
      label: labels.treatment,
      n: edinburghStudy.treatmentN,
      pct: edinburghStudy.treatmentMeatFreePct,
      color: "#f5a200",
    },
    {
      label: labels.control,
      n: edinburghStudy.controlN,
      pct: edinburghStudy.controlMeatFreePct,
      color: "#6e8fd8",
    },
  ];

  return (
    <div className="w-full max-w-xl rounded-3xl border border-paper/10 bg-navy-900/70 p-6 shadow-2xl backdrop-blur md:p-9">
      <h3
        className={`mb-6 text-center text-lg font-black text-paper transition-opacity duration-700 md:text-xl ${
          stage >= 3 ? "opacity-100" : "opacity-30"
        }`}
      >
        {labels.title}
      </h3>

      <div className="space-y-8">
        {rows.map((row, ri) => (
          <div key={row.label}>
            <div className="mb-2 flex items-end justify-between gap-3">
              <p
                className={`text-sm font-bold transition-colors duration-500 ${
                  stage >= 1 ? "text-paper" : "text-paper/25"
                }`}
              >
                {row.label}{" "}
                <span className="font-normal text-paper/45">n={row.n}</span>
              </p>
              <p
                className="stat-number text-2xl font-black transition-all duration-700 md:text-3xl"
                style={{
                  color: row.color,
                  opacity: stage >= 3 ? 1 : 0,
                  transform: stage >= 3 ? "none" : "translateY(8px)",
                }}
              >
                {row.pct.toLocaleString()}%
              </p>
            </div>

            {/* people pictogram */}
            <div className="mb-2 flex flex-wrap gap-1">
              {Array.from({ length: row.n }).map((_, i) => {
                const chose = i < Math.round((row.pct / 100) * row.n);
                return (
                  <div
                    key={i}
                    className="transition-all duration-500"
                    style={{
                      opacity: stage >= 1 ? 1 : 0,
                      transform: stage >= 1 ? "none" : "translateY(10px)",
                      transitionDelay: `${i * 35 + ri * 200}ms`,
                    }}
                  >
                    <PersonIcon
                      color={
                        stage >= 3
                          ? chose
                            ? row.color
                            : "rgba(253,253,253,0.16)"
                          : "rgba(253,253,253,0.45)"
                      }
                    />
                  </div>
                );
              })}
            </div>

            {/* result bar */}
            <div className="h-3 overflow-hidden rounded-full bg-paper/10">
              <div
                className="h-full rounded-full"
                style={{
                  width: stage >= 3 ? `${row.pct}%` : "0%",
                  background: row.color,
                  transition: "width 1.3s cubic-bezier(0.22,1,0.36,1) 0.2s",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* voucher */}
      <div
        className="mx-auto mt-8 w-fit rounded-xl border-2 border-dashed border-gold-500/70 bg-cream-50/95 px-5 py-3 text-center transition-all duration-700"
        style={{
          opacity: stage === 2 ? 1 : stage > 2 ? 0.35 : 0,
          transform: stage >= 2 ? "rotate(-2deg)" : "rotate(-2deg) scale(0.8)",
        }}
      >
        <p className="text-[10px] font-black tracking-[0.2em] text-navy-900 uppercase">
          Café voucher
        </p>
        <p className="text-sm font-bold text-navy-800">1 × free meal 🍽️</p>
      </div>

      <p
        className="mt-6 text-center text-[11px] leading-relaxed text-paper/40 transition-opacity duration-700"
        style={{ opacity: stage >= 3 ? 1 : 0 }}
      >
        {labels.source}
      </p>
    </div>
  );
}

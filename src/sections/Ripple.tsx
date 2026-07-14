import { useTranslation } from "react-i18next";
import Reveal from "../components/scroll/Reveal";
import { useCountUp } from "../components/scroll/useCountUp";
import { headline, co2Equivalents } from "../data/impact";

function EquivCard({
  value,
  label,
  icon,
  locale,
}: {
  value: number;
  label: string;
  icon: string;
  locale: string;
}) {
  const ref = useCountUp(value, { duration: 2, locale });
  return (
    <div className="rounded-2xl border border-paper/10 bg-navy-900/70 p-7 text-center backdrop-blur">
      <div className="mb-3 text-4xl" aria-hidden="true">
        {icon}
      </div>
      <p className="stat-number text-3xl font-black text-gold-500 md:text-4xl">
        <span ref={ref}>0</span>
      </p>
      <p className="mt-2 text-sm text-paper/70">{label}</p>
    </div>
  );
}

export default function Ripple() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const co2Ref = useCountUp(headline.co2PreventedKgPerYear, {
    duration: 3,
    locale,
  });

  return (
    <section
      id="ripple"
      className="relative overflow-hidden bg-navy-950 px-4 pt-24 pb-28 md:px-10"
    >
      {/* ripple rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-60">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-planet/25"
            style={{
              width: 300 + i * 340,
              height: 300 + i * 340,
              animation: `ripple-pulse 6s ease-out ${i * 1.5}s infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes ripple-pulse {
          0% { transform: scale(0.85); opacity: 0.7; }
          100% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>

      <div className="relative mx-auto max-w-5xl">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-paper/80 md:text-2xl">
            {t("ripple.intro")}
          </p>
        </Reveal>

        <Reveal className="mb-6 text-center">
          <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-2 border-planet/60 bg-navy-900 text-5xl shadow-2xl shadow-planet/20">
            🌱
          </div>
          <p className="stat-number text-balance text-5xl font-black text-planet md:text-7xl">
            <span ref={co2Ref}>0</span>
          </p>
          <p className="mt-3 text-sm font-bold tracking-[0.2em] text-paper/60 uppercase">
            {t("ripple.counterLabel")}
          </p>
          <p className="mt-2 text-xs text-paper/40">{t("ripple.counterNote")}</p>
        </Reveal>

        <Reveal className="mt-16 mb-8 text-center">
          <p className="text-lg font-bold text-paper/80">{t("ripple.equivIntro")}</p>
        </Reveal>

        <Reveal stagger className="grid gap-6 sm:grid-cols-3">
          <EquivCard
            value={co2Equivalents.carsOffRoad}
            label={t("ripple.equivCars")}
            icon="🚗"
            locale={locale}
          />
          <EquivCard
            value={co2Equivalents.flights}
            label={t("ripple.equivFlights")}
            icon="✈️"
            locale={locale}
          />
          <EquivCard
            value={co2Equivalents.trees}
            label={t("ripple.equivTrees")}
            icon="🌳"
            locale={locale}
          />
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-xl leading-relaxed font-semibold text-gold-400 italic md:text-2xl">
            {t("ripple.closing")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/scroll/Reveal";
import { useStepIndex } from "../components/scroll/useStepIndex";
import GrowthChart from "../components/charts/GrowthChart";
import { milestones, headline } from "../data/impact";

/** year shown on the chart for each milestone step */
const STEP_YEAR = [2016.2, 2020, 2024, 2024.7, 2025, 2026];

export default function Spark() {
  const { t, i18n } = useTranslation();
  const { containerRef, step } = useStepIndex<HTMLDivElement>();
  const upToYear = STEP_YEAR[Math.max(0, Math.min(step, STEP_YEAR.length - 1))];

  return (
    <section id="spark" className="relative bg-navy-900 px-4 pt-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader kicker={t("spark.kicker")} title={t("spark.title")} />

        <Reveal className="mb-16 grid items-center gap-8 md:grid-cols-[240px_1fr]">
          <img
            src="/images/lorena.jpg"
            alt="Lorena Mucke, Founder & CEO"
            className="mx-auto h-48 w-48 rounded-full border-4 border-gold-500/60 object-cover object-top shadow-2xl md:h-56 md:w-56"
          />
          <p className="max-w-2xl text-lg leading-relaxed text-paper/85 md:text-2xl">
            {t("spark.intro")}
          </p>
        </Reveal>

        <div ref={containerRef} className="relative md:grid md:grid-cols-[1fr_1.4fr] md:gap-10">
          {/* sticky chart (first in DOM so it pins behind steps on mobile) */}
          <div className="sticky top-0 z-0 flex h-svh flex-col items-center justify-center md:order-2">
            <p className="mb-3 self-start pl-2 text-xs font-bold tracking-[0.25em] text-paper/50 uppercase md:text-sm">
              {t("spark.chartLabel")}
            </p>
            <div className="w-full rounded-2xl bg-navy-900/85 p-2 backdrop-blur-sm md:bg-transparent md:p-0 md:backdrop-blur-none">
              <GrowthChart
                upToYear={upToYear}
                locale={i18n.language}
                label={t("spark.chartLabel")}
              />
            </div>
            <p className="mt-3 max-w-md self-start pl-2 text-[11px] text-paper/35">
              {t("spark.chartNote")}
            </p>
          </div>

          {/* milestone steps */}
          <div className="relative z-10 md:order-1">
            {milestones.map((m, i) => (
              <div
                key={m.key}
                data-step={i}
                className="flex min-h-[62svh] items-center py-8"
              >
                <div
                  className={`w-full max-w-md rounded-2xl border p-6 backdrop-blur-sm transition-all duration-500 md:p-7 ${
                    step === i
                      ? "border-gold-500/50 bg-navy-800/90 opacity-100 shadow-xl"
                      : "border-paper/10 bg-navy-800/40 opacity-40"
                  }`}
                >
                  <p className="stat-number mb-1 text-3xl font-black text-gold-500">
                    {t(`spark.milestones.${m.key}.year`)}
                  </p>
                  <h3 className="mb-2 text-xl font-bold text-paper">
                    {t(`spark.milestones.${m.key}.title`)}
                  </h3>
                  <p className="text-base leading-relaxed text-paper/70">
                    {t(`spark.milestones.${m.key}.text`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* quick stats strip */}
        <Reveal stagger className="grid gap-6 py-20 sm:grid-cols-2">
          <div className="rounded-2xl border border-paper/10 bg-navy-800/60 p-8 text-center">
            <p className="stat-number text-6xl font-black text-gold-500">
              {headline.educationPackages}
            </p>
            <p className="mt-2 font-bold text-paper">{t("spark.statPackages")}</p>
            <p className="mt-1 text-sm text-paper/55">
              {t("spark.statPackagesNote")}
            </p>
          </div>
          <div className="rounded-2xl border border-paper/10 bg-navy-800/60 p-8 text-center">
            <p className="stat-number text-6xl font-black text-gold-500">10+</p>
            <p className="mt-2 font-bold text-paper">{t("spark.statLanguages")}</p>
            <p className="mt-1 text-sm text-paper/55">
              {t("spark.statLanguagesNote")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

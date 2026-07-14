import { useTranslation } from "react-i18next";
import Reveal from "../components/scroll/Reveal";
import StepText from "../components/scroll/StepText";
import { useStepIndex } from "../components/scroll/useStepIndex";
import ExperimentVisual from "../components/charts/ExperimentVisual";
import Gauge from "../components/charts/Gauge";
import HBarChart from "../components/charts/HBarChart";
import {
  headline,
  motivators,
  barriers,
} from "../data/impact";

const MOTIVATOR_COLORS: Record<string, string> = {
  health: "#f5a200",
  environment: "#4caf7d",
  animals: "#ff8a70",
};

export default function Proof() {
  const { t, i18n } = useTranslation();
  const { containerRef, step } = useStepIndex<HTMLDivElement>();

  return (
    <section id="proof" className="relative bg-navy-900 px-4 pt-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-4 max-w-2xl">
          <p className="text-lg leading-relaxed text-paper/85 md:text-2xl">
            {t("proof.expIntro")}
          </p>
        </Reveal>

        {/* Edinburgh experiment scrollytelling */}
        <div ref={containerRef} className="relative md:grid md:grid-cols-2 md:gap-10">
          <div className="sticky top-0 z-0 flex h-svh items-center justify-center md:order-2">
            <ExperimentVisual
              stage={step}
              labels={{
                title: t("proof.expChartTitle"),
                treatment: t("proof.expTreatment"),
                control: t("proof.expControl"),
                source: t("proof.expSource"),
              }}
            />
          </div>
          <div className="relative z-10 md:order-1">
            {[1, 2, 3].map((i) => (
              <StepText key={i} index={i} active={step === i}>
                {t(`proof.expStep${i}`)}
              </StepText>
            ))}
          </div>
        </div>

        {/* peer-reviewed badge */}
        <Reveal className="mx-auto my-16 w-fit">
          <div className="flex items-center gap-4 rounded-2xl border border-gold-500/40 bg-navy-800/70 px-6 py-4">
            <svg viewBox="0 0 24 24" className="h-10 w-10 fill-gold-500">
              <path d="M12 1l3 5 5.7.9-4.1 4.1 1 5.8L12 14l-5.6 2.8 1-5.8L3.3 6.9 9 6z" />
            </svg>
            <div>
              <p className="font-black text-paper">{t("proof.peerReviewed")}</p>
              <p className="text-sm text-paper/60">{t("proof.peerReviewedNote")}</p>
            </div>
          </div>
        </Reveal>

        {/* intention gauge + multiplier */}
        <Reveal className="mb-6">
          <h3 className="text-balance text-3xl font-black text-paper md:text-5xl">
            {t("proof.gaugeTitle")}
          </h3>
        </Reveal>
        <div className="mb-20 grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <Gauge pct={headline.intentToChangePct} locale={i18n.language} />
            <p className="mx-auto mt-4 max-w-sm text-center text-base text-paper/75">
              {t("proof.gaugeLabel")}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-center text-xs text-paper/40">
              {t("proof.gaugeNote", { n: headline.intentToChangeN })}
            </p>
          </Reveal>
          <Reveal className="text-center">
            <p className="stat-number text-8xl font-black text-gold-500 md:text-9xl">
              {headline.behaviorMultiplier.toLocaleString(
                i18n.language === "es" ? "es" : "en-US",
              )}
              ×
            </p>
            <p className="mx-auto mt-3 max-w-sm text-base text-paper/75">
              {t("proof.multiplierLabel")}
            </p>
          </Reveal>
        </div>

        {/* motivators & barriers */}
        <Reveal className="mb-8 max-w-2xl">
          <h3 className="mb-3 text-balance text-3xl font-black text-paper md:text-5xl">
            {t("proof.whyTitle")}
          </h3>
          <p className="text-lg leading-relaxed text-paper/75">
            {t("proof.whyIntro")}
          </p>
        </Reveal>
        <div className="grid gap-6 pb-24 md:grid-cols-2">
          <Reveal>
            <HBarChart
              title={t("proof.motivators.title")}
              maxPct={35}
              bars={motivators.map((m) => ({
                label: t(`proof.motivators.${m.key}`),
                pct: m.pct,
                color: MOTIVATOR_COLORS[m.key] ?? "#6e8fd8",
              }))}
            />
          </Reveal>
          <Reveal delay={0.15}>
            <HBarChart
              title={t("proof.barriers.title")}
              maxPct={35}
              bars={barriers.map((b) => ({
                label: t(`proof.barriers.${b.key}`),
                pct: b.pct,
                color: "#6e8fd8",
              }))}
            />
            <p className="mt-3 text-xs leading-relaxed text-paper/40">
              {t("proof.barriersNote")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

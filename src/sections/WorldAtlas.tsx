import { useTranslation } from "react-i18next";
import StepText from "../components/scroll/StepText";
import { useStepIndex } from "../components/scroll/useStepIndex";
import WorldMap from "../components/charts/WorldMap";
import { headline, ecpCountries, type Region } from "../data/impact";

/** which regions are lit at each narrative step */
const STEP_REGIONS: Region[][] = [
  [],
  ["americas"],
  ["americas", "europe", "africa"],
  ["americas", "europe", "africa", "asia", "oceania"],
  ["americas", "europe", "africa", "asia", "oceania"],
];

export default function WorldAtlas() {
  const { t, i18n } = useTranslation();
  const { containerRef, step } = useStepIndex<HTMLDivElement>();
  const regions = STEP_REGIONS[Math.max(0, Math.min(step, STEP_REGIONS.length - 1))];

  const litCount =
    step === 0
      ? 0
      : new Set(
          ecpCountries.filter((c) => regions.includes(c.region)).map((c) => c.id),
        ).size + (step >= 3 ? 3 : 0); // + England/Scotland/N.Ireland counted separately by ECP

  return (
    <section id="world" className="relative bg-navy-950 px-4 pt-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div ref={containerRef} className="relative md:grid md:grid-cols-[1fr_2fr] md:gap-8">
          {/* sticky map (first in DOM so it pins behind steps on mobile) */}
          <div className="sticky top-0 z-0 flex h-svh flex-col items-center justify-center md:order-2">
            <WorldMap activeRegions={regions} hoverHint={t("world.hoverHint")} />
            <div className="mt-6 text-center">
              <p className="stat-number text-5xl font-black text-gold-500 md:text-6xl">
                {step >= 4
                  ? headline.totalCountries.toLocaleString(
                      i18n.language === "es" ? "es" : "en-US",
                    )
                  : litCount}
              </p>
              <p className="mt-1 text-sm font-semibold tracking-widest text-paper/60 uppercase">
                {t("world.mapCountLabel")}
              </p>
            </div>
          </div>

          {/* steps */}
          <div className="relative z-10 md:order-1">
            {[1, 2, 3, 4].map((i) => (
              <StepText key={i} index={i} active={step === i}>
                {t(`world.step${i}`)}
              </StepText>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

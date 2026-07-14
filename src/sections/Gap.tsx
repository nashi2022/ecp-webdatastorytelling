import { useTranslation } from "react-i18next";
import StepText from "../components/scroll/StepText";
import { useStepIndex } from "../components/scroll/useStepIndex";

const ORBIT_STATS = [
  // appear progressively with each step
  { step: 1, label: "15,000", pos: "top-2 left-4 md:-left-6" },
  { step: 2, label: "?", pos: "top-1/4 -right-2 md:-right-10" },
  { step: 3, label: "≠", pos: "bottom-1/4 -left-2 md:-left-10" },
  { step: 4, label: "ECP", pos: "bottom-2 right-4 md:-right-6" },
];

export default function Gap() {
  const { t } = useTranslation();
  const { containerRef, step } = useStepIndex<HTMLDivElement>();

  return (
    <section id="gap" className="relative bg-navy-950 px-4 pt-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div ref={containerRef} className="relative md:grid md:grid-cols-2 md:gap-10">
          {/* sticky visual */}
          <div className="sticky top-0 flex h-svh items-center justify-center md:order-2">
            <div className="relative">
              <div
                className={`relative mx-auto overflow-hidden rounded-full border-4 shadow-2xl transition-all duration-700 ${
                  step >= 3
                    ? "border-gold-500 shadow-gold-500/20"
                    : "border-paper/20 shadow-navy-950"
                } h-64 w-64 md:h-96 md:w-96`}
              >
                <img
                  src="/images/plate-dark.jpg"
                  alt={t("gap.trayCaption")}
                  className={`h-full w-full object-cover transition-transform duration-[1200ms] ${
                    step >= 1 ? "scale-100" : "scale-125"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-navy-950/60 transition-opacity duration-700 ${
                    step >= 1 ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>

              {ORBIT_STATS.map((s) => (
                <div
                  key={s.step}
                  className={`absolute ${s.pos} flex h-16 w-16 items-center justify-center rounded-full border text-lg font-black backdrop-blur transition-all duration-700 md:h-20 md:w-20 md:text-xl ${
                    step >= s.step
                      ? "scale-100 border-gold-500/60 bg-navy-900/90 text-gold-400 opacity-100"
                      : "scale-50 border-transparent bg-transparent text-transparent opacity-0"
                  }`}
                >
                  {s.label}
                </div>
              ))}

              <p
                className={`mx-auto mt-6 max-w-xs text-center text-sm text-paper/50 italic transition-opacity duration-700 ${
                  step >= 1 ? "opacity-100" : "opacity-0"
                }`}
              >
                {t("gap.trayCaption")}
              </p>
            </div>
          </div>

          {/* steps */}
          <div className="relative z-10 md:order-1">
            {[1, 2, 3, 4].map((i) => (
              <StepText key={i} index={i} active={step === i}>
                {t(`gap.step${i}`)}
              </StepText>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

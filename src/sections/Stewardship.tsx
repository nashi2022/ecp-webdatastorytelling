import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/scroll/Reveal";
import Donut from "../components/charts/Donut";
import { budget2024, headline, costPerLearnerUSD } from "../data/impact";

const SLICE_COLORS: Record<string, string> = {
  education: "#f5a200",
  operations: "#6e8fd8",
  fundraising: "#4caf7d",
  livingLab: "#ff8a70",
};

const BADGE_KEYS = [
  "charityNav",
  "candid",
  "keeling",
  "bestCharities",
  "teacherPick",
] as const;

export default function Stewardship() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "es" ? "es" : "en-US";

  return (
    <section
      id="stewardship"
      className="relative bg-navy-950 px-4 pt-24 pb-24 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker={t("stewardship.kicker")}
          title={t("stewardship.title")}
        />
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-lg leading-relaxed text-paper/80 md:text-xl">
            {t("stewardship.intro")}
          </p>
        </Reveal>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <Reveal>
            <Donut
              title={t("stewardship.donutTitle")}
              centerTop="80.9¢"
              centerBottom={t("stewardship.centsLabel")}
              slices={budget2024.map((b) => ({
                label: t(`stewardship.categories.${b.key}`),
                pct: b.pct,
                color: SLICE_COLORS[b.key],
              }))}
            />
          </Reveal>

          <div className="space-y-6">
            <Reveal stagger className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-paper/10 bg-navy-900/70 p-7 text-center">
                <p className="stat-number text-6xl font-black text-gold-500">
                  {headline.teamSize}
                </p>
                <p className="mt-2 text-sm text-paper/70">
                  {t("stewardship.teamLabel")}
                </p>
              </div>
              <div className="rounded-2xl border border-paper/10 bg-navy-900/70 p-7 text-center">
                <p className="stat-number text-6xl font-black text-gold-500">
                  ${costPerLearnerUSD.toLocaleString(locale)}
                </p>
                <p className="mt-2 text-sm text-paper/70">
                  {t("stewardship.costLabel")}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <img
                src="/images/team.jpg"
                alt="The ECP team"
                loading="lazy"
                className="w-full rounded-2xl border border-paper/10 object-cover shadow-2xl"
              />
            </Reveal>
          </div>
        </div>

        {/* trust badges */}
        <Reveal className="mt-20">
          <p className="mb-6 text-center text-sm font-bold tracking-[0.25em] text-paper/50 uppercase">
            {t("stewardship.badgesTitle")}
          </p>
        </Reveal>
        <Reveal stagger className="flex flex-wrap justify-center gap-4">
          {BADGE_KEYS.map((k) => (
            <div
              key={k}
              className="flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-navy-900/80 px-5 py-2.5"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gold-500" aria-hidden="true">
                <path d="M12 1l2.7 4.6 5.2.8-3.7 3.8.8 5.3L12 13l-5 2.5.8-5.3L4.1 6.4l5.2-.8z" />
              </svg>
              <span className="text-sm font-semibold text-paper/90">
                {t(`stewardship.badges.${k}`)}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

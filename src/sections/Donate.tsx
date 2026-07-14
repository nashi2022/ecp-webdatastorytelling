import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/scroll/Reveal";
import ParticleHero from "../components/charts/ParticleHero";
import { links, costPerLearnerUSD } from "../data/impact";

const TIER_KEYS = ["t1", "t2", "t3"] as const;

export default function Donate() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    const title = document.title;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled — fall through to clipboard */
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="donateCta"
      className="relative overflow-hidden bg-navy-900 px-4 pt-28 pb-24 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <ParticleHero className="h-full w-full" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(245,162,0,0.09), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeader
          kicker={t("donate.kicker")}
          title={t("donate.title")}
          align="center"
        />
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-paper/85 md:text-2xl">
            {t("donate.lead")}
          </p>
        </Reveal>

        <Reveal className="mb-4 text-center">
          <h3 className="text-2xl font-black text-paper md:text-3xl">
            {t("donate.tiersTitle")}
          </h3>
        </Reveal>

        <Reveal stagger className="mb-4 grid gap-6 md:grid-cols-3">
          {TIER_KEYS.map((k, i) => (
            <a
              key={k}
              href={links.donate}
              target="_blank"
              rel="noreferrer"
              className={`group rounded-3xl border p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                i === 1
                  ? "border-gold-500 bg-gold-500/10 hover:shadow-gold-500/20"
                  : "border-paper/15 bg-navy-800/70 hover:border-gold-500/50"
              }`}
            >
              <p className="stat-number text-5xl font-black text-gold-500 transition-transform duration-300 group-hover:scale-110">
                {t(`donate.tiers.${k}.amount`)}
              </p>
              <p className="mt-4 text-base leading-relaxed text-paper/80">
                {t(`donate.tiers.${k}.label`)}
              </p>
            </a>
          ))}
        </Reveal>
        <Reveal className="mb-14 text-center">
          <p className="text-xs text-paper/40">
            {t("donate.tierNote", { cost: costPerLearnerUSD })}
          </p>
        </Reveal>

        <Reveal className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={links.donate}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold-500 px-10 py-4 text-base font-black tracking-wide text-navy-950 uppercase shadow-xl shadow-gold-500/25 transition-all hover:scale-105 hover:bg-gold-400"
          >
            {t("donate.ctaDonate")}
          </a>
          <a
            href={links.impactReport}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-paper/30 px-8 py-4 text-base font-bold text-paper transition-colors hover:border-gold-500 hover:text-gold-400"
          >
            {t("donate.ctaReport")}
          </a>
          <button
            onClick={share}
            className="rounded-full border border-paper/30 px-8 py-4 text-base font-bold text-paper transition-colors hover:border-gold-500 hover:text-gold-400"
          >
            {copied ? t("donate.shareCopied") : t("donate.ctaShare")}
          </button>
        </Reveal>

        <Reveal stagger className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xl text-paper/70 md:text-2xl">{t("donate.closing1")}</p>
          <p className="text-xl text-paper/70 md:text-2xl">{t("donate.closing2")}</p>
          <p className="text-3xl font-black text-gold-500 md:text-4xl">
            {t("donate.closing3")}
          </p>
        </Reveal>

        <Reveal className="mt-16 text-center">
          <p className="text-xs text-paper/40">{t("donate.orgLine")}</p>
        </Reveal>
      </div>
    </section>
  );
}

import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../lib/motion";
import { useCountUp } from "../components/scroll/useCountUp";
import ParticleHero from "../components/charts/ParticleHero";
import { headline } from "../data/impact";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { reduced } = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const counterRef = useCountUp(headline.totalLearners, {
    duration: 3.2,
    locale: i18n.language,
  });

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.18,
        delay: 0.3,
      });
      gsap.from("[data-hero-fade]", {
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        delay: 1.4,
        stagger: 0.25,
      });
      // parallax the text away as user scrolls past
      gsap.to("[data-hero-content]", {
        opacity: 0,
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-navy-950"
    >
      {/* subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(29,68,148,0.35), transparent 70%)",
        }}
      />
      <ParticleHero className="absolute inset-0 h-full w-full" />

      <div
        data-hero-content
        className="pointer-events-none relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <p
          data-hero-fade
          className="mb-6 text-[11px] font-bold tracking-[0.3em] text-gold-400 uppercase md:text-xs"
        >
          {t("hero.kicker")}
        </p>
        <h1 className="text-balance text-5xl font-black leading-[1.02] md:text-8xl">
          <span data-hero-line className="block">
            {t("hero.title1")}
          </span>
          <span data-hero-line className="block text-gold-500">
            {t("hero.title2")}
          </span>
          <span data-hero-line className="block">
            {t("hero.title3")}
          </span>
        </h1>
        <p
          data-hero-fade
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-paper/75 md:text-xl"
        >
          {t("hero.lead")}
        </p>

        <div data-hero-fade className="mt-12">
          <div className="stat-number text-4xl font-black text-gold-500 md:text-6xl">
            <span ref={counterRef}>0</span>
          </div>
          <p className="mt-2 text-sm font-semibold tracking-widest text-paper/60 uppercase">
            {t("hero.counterLabel")}
          </p>
          <p className="mx-auto mt-4 max-w-md text-xs text-paper/40 italic">
            {t("hero.eachDot")}
          </p>
        </div>
      </div>

      {/* scroll hint */}
      <div
        data-hero-fade
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <p className="mb-2 text-[11px] font-semibold tracking-[0.25em] text-paper/50 uppercase">
          {t("hero.scrollHint")}
        </p>
        <div className="mx-auto h-10 w-6 rounded-full border-2 border-paper/30 p-1">
          <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-gold-500" />
        </div>
      </div>
    </section>
  );
}

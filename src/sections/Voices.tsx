import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/scroll/Reveal";
import { quoteKeys } from "../data/impact";

const QUOTE_IMAGES: Record<string, string | undefined> = {
  power: "/images/students-laptop.jpg",
  pollution: "/images/classroom-hands.jpg",
  lessMeat: "/images/students-salad.jpg",
  wholefoods: "/images/vegetables.jpg",
  redMeat: "/images/family-greens.jpg",
  teacher: "/images/teacher-desk.jpg",
};

export default function Voices() {
  const { t } = useTranslation();

  return (
    <section id="voices" className="relative bg-navy-900 px-4 pt-24 pb-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader kicker={t("voices.kicker")} title={t("voices.title")} />
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-lg leading-relaxed text-paper/80 md:text-xl">
            {t("voices.intro")}
          </p>
        </Reveal>

        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
          {quoteKeys.map((key, i) => {
            const img = QUOTE_IMAGES[key];
            const featured = key === "power";
            return (
              <Reveal key={key} delay={(i % 3) * 0.1}>
                <figure
                  className={`break-inside-avoid overflow-hidden rounded-3xl border transition-transform duration-300 hover:-translate-y-1 ${
                    featured
                      ? "border-gold-500/50 bg-navy-800"
                      : "border-paper/10 bg-navy-800/60"
                  }`}
                >
                  {img && (
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className="h-44 w-full object-cover"
                    />
                  )}
                  <blockquote className="p-6">
                    <svg
                      viewBox="0 0 24 24"
                      className="mb-3 h-7 w-7 fill-gold-500/80"
                      aria-hidden="true"
                    >
                      <path d="M9.6 5C6 7 3.8 10 3.8 14.2c0 3 1.8 4.8 4 4.8 2 0 3.5-1.5 3.5-3.5S9.9 12.2 8 12.2c-.3 0-.8.1-.9.1.4-2 2-4.1 4-5.3L9.6 5zm10 0c-3.6 2-5.8 5-5.8 9.2 0 3 1.8 4.8 4 4.8 2 0 3.5-1.5 3.5-3.5s-1.4-3.3-3.3-3.3c-.3 0-.8.1-.9.1.4-2 2-4.1 4-5.3L19.6 5z" />
                    </svg>
                    <p
                      className={`leading-relaxed text-paper/90 ${
                        featured ? "text-lg font-semibold" : "text-base"
                      }`}
                    >
                      {t(`voices.quotes.${key}.text`)}
                    </p>
                    <figcaption className="mt-4 text-sm font-bold tracking-wide text-gold-400">
                      — {t(`voices.quotes.${key}.who`)}
                    </figcaption>
                  </blockquote>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

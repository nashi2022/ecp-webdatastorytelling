import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { links } from "../data/impact";

export const CHAPTERS = [
  "hero",
  "gap",
  "spark",
  "world",
  "proof",
  "ripple",
  "voices",
  "stewardship",
  "donateCta",
] as const;

export type ChapterId = (typeof CHAPTERS)[number];

export default function Nav() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState<ChapterId>("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = CHAPTERS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id as ChapterId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const jump = (id: ChapterId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* top bar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 transition-all duration-500 md:px-8 ${
          scrolled
            ? "bg-navy-950/85 backdrop-blur-md shadow-lg shadow-navy-950/40"
            : "bg-transparent"
        }`}
      >
        <a
          href={links.website}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3"
        >
          <img
            src="/images/ecp-logo-white.png"
            alt="Educated Choices Program"
            className="h-9 w-9 md:h-11 md:w-11"
          />
          <span className="hidden text-sm font-bold tracking-wide text-paper/90 sm:block">
            Educated Choices Program
          </span>
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "es" : "en")
            }
            className="rounded-full border border-paper/30 px-3.5 py-1.5 text-xs font-bold tracking-widest text-paper transition-colors hover:border-gold-500 hover:text-gold-400"
            aria-label={`Switch language to ${t("meta.switchTo")}`}
          >
            {t("meta.switchTo")}
          </button>
          <a
            href={links.donate}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold-500 px-4 py-1.5 text-xs font-black tracking-widest text-navy-950 uppercase transition-transform hover:scale-105 hover:bg-gold-400 md:px-5 md:py-2"
          >
            {t("nav.donate")}
          </a>
        </div>
      </header>

      {/* chapter dots (desktop) */}
      <nav
        className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
        aria-label="Chapters"
      >
        {CHAPTERS.map((id) => (
          <button
            key={id}
            onClick={() => jump(id)}
            className="group relative flex items-center justify-end"
            aria-label={t(`nav.chapters.${id}`)}
          >
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded bg-navy-800 px-2.5 py-1 text-xs font-semibold text-paper opacity-0 transition-opacity group-hover:opacity-100">
              {t(`nav.chapters.${id}`)}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active === id
                  ? "h-3 w-3 bg-gold-500"
                  : "h-2 w-2 bg-paper/30 group-hover:bg-paper/70"
              }`}
            />
          </button>
        ))}
      </nav>
    </>
  );
}

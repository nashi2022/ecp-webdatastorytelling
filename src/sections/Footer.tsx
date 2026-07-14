import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../lib/motion";
import { links } from "../data/impact";

export default function Footer() {
  const { t } = useTranslation();
  const { reduced, setReduced } = useReducedMotion();

  return (
    <footer className="border-t border-paper/10 bg-navy-950 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <img
          src="/images/ecp-logo-white.png"
          alt="Educated Choices Program"
          className="h-14 w-14 opacity-80"
        />
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
          <a
            href={links.website}
            target="_blank"
            rel="noreferrer"
            className="text-paper/70 transition-colors hover:text-gold-400"
          >
            {t("footer.visit")}
          </a>
          <a
            href={links.library}
            target="_blank"
            rel="noreferrer"
            className="text-paper/70 transition-colors hover:text-gold-400"
          >
            {t("footer.library")}
          </a>
          <label className="flex cursor-pointer items-center gap-2 text-paper/70">
            <input
              type="checkbox"
              checked={reduced}
              onChange={(e) => setReduced(e.target.checked)}
              className="h-4 w-4 accent-gold-500"
            />
            {t("footer.reducedMotion")}
          </label>
        </div>
        <p className="mt-2 text-[11px] tracking-[0.18em] text-paper/35 uppercase">
          {t("footer.builtBy")}{" "}
          <span className="font-bold tracking-[0.12em] text-gold-500/80 normal-case">
            {t("footer.studio")}
          </span>
        </p>
      </div>
    </footer>
  );
}

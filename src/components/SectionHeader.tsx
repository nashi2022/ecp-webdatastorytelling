import Reveal from "./scroll/Reveal";

interface Props {
  kicker: string;
  title: string;
  light?: boolean;
  align?: "left" | "center";
}

export default function SectionHeader({
  kicker,
  title,
  light = false,
  align = "left",
}: Props) {
  return (
    <Reveal
      className={`mb-10 md:mb-16 ${align === "center" ? "text-center" : ""}`}
      stagger
    >
      <p
        className={`mb-4 text-xs font-bold tracking-[0.28em] uppercase md:text-sm ${
          light ? "text-gold-500" : "text-gold-500"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`text-balance text-4xl font-black leading-[1.05] md:text-6xl ${
          light ? "text-navy-900" : "text-paper"
        }`}
      >
        {title}
      </h2>
    </Reveal>
  );
}

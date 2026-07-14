import type { ReactNode } from "react";

interface Props {
  index: number;
  active: boolean;
  children: ReactNode;
}

/** One narrative step in a scrollytelling column. */
export default function StepText({ index, active, children }: Props) {
  return (
    <div
      data-step={index}
      className="flex min-h-[70svh] items-center py-10 md:min-h-[85svh]"
    >
      <div
        className={`max-w-md rounded-2xl border p-6 backdrop-blur-sm transition-all duration-500 md:p-8 ${
          active
            ? "border-gold-500/40 bg-navy-900/80 opacity-100 shadow-xl shadow-navy-950/50"
            : "border-paper/10 bg-navy-900/40 opacity-40"
        }`}
      >
        <p className="text-lg leading-relaxed text-paper md:text-xl">
          {children}
        </p>
      </div>
    </div>
  );
}

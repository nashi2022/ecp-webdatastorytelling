import { useEffect, useRef, useState } from "react";

/**
 * Scrollytelling helper: observes elements marked with [data-step] inside
 * the returned container ref and reports which one is centered in view.
 */
export function useStepIndex<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const steps = Array.from(
      container.querySelectorAll<HTMLElement>("[data-step]"),
    );
    if (steps.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStep(Number((e.target as HTMLElement).dataset.step));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    steps.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return { containerRef, step };
}

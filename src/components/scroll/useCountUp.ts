import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/motion";

/**
 * Animates a number from 0 to `target` inside the referenced element
 * when it scrolls into view. Formats with the active locale.
 */
export function useCountUp(
  target: number,
  opts?: { duration?: number; decimals?: number; locale?: string },
) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced } = useReducedMotion();
  const { duration = 2.4, decimals = 0, locale = "en" } = opts ?? {};

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (v: number) =>
      v.toLocaleString(locale === "es" ? "es" : "en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    if (reduced) {
      el.textContent = fmt(target);
      return;
    }
    const state = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        v: target,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = fmt(state.v);
        },
      });
    });
    return () => ctx.revert();
  }, [target, duration, decimals, locale, reduced]);

  return ref;
}

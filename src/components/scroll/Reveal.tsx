import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/motion";

interface Props {
  children: ReactNode;
  className?: string;
  /** stagger children instead of animating the wrapper */
  stagger?: boolean;
  y?: number;
  delay?: number;
}

/** Fades + slides content in when it enters the viewport (plays once). */
export default function Reveal({
  children,
  className,
  stagger = false,
  y = 36,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const targets = stagger ? Array.from(el.children) : [el];
    gsap.set(targets, { opacity: 0, y });

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.12 : 0,
          clearProps: "transform",
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      gsap.set(targets, { clearProps: "all" });
    };
  }, [reduced, stagger, y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

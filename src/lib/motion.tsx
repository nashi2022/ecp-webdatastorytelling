import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface MotionCtx {
  reduced: boolean;
  setReduced: (v: boolean) => void;
}

const Ctx = createContext<MotionCtx>({ reduced: false, setReduced: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("ecp-reduced-motion");
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    localStorage.setItem("ecp-reduced-motion", String(reduced));
    document.documentElement.classList.toggle("reduced-motion", reduced);
  }, [reduced]);

  return <Ctx.Provider value={{ reduced, setReduced }}>{children}</Ctx.Provider>;
}

export function useReducedMotion() {
  return useContext(Ctx);
}

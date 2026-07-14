import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { MotionProvider, useReducedMotion } from "./lib/motion";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Gap from "./sections/Gap";
import Spark from "./sections/Spark";
import WorldAtlas from "./sections/WorldAtlas";
import Proof from "./sections/Proof";
import Ripple from "./sections/Ripple";
import Voices from "./sections/Voices";
import Stewardship from "./sections/Stewardship";
import Donate from "./sections/Donate";
import Footer from "./sections/Footer";

function SmoothScroll() {
  const { reduced } = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.11, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}

export default function App() {
  return (
    <MotionProvider>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Gap />
        <Spark />
        <WorldAtlas />
        <Proof />
        <Ripple />
        <Voices />
        <Stewardship />
        <Donate />
      </main>
      <Footer />
    </MotionProvider>
  );
}

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../lib/motion";

interface P {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  r: number;
  hue: "gold" | "blue" | "white";
  tw: number; // twinkle phase
}

/**
 * Full-screen particle field. Particles drift in from random positions and
 * assemble into the ECP seal motif: an outer ring divided in three arcs
 * (people / animals / planet) with a soft starfield behind.
 */
export default function ParticleHero({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reduced } = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const start = performance.now();

    const COLORS = {
      gold: "245,162,0",
      blue: "110,143,216",
      white: "253,253,253",
    };

    function build() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = w < 768;
      const N = isMobile ? 900 : 2200;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.34;

      particles = [];
      for (let i = 0; i < N; i++) {
        let tx: number;
        let ty: number;
        let hue: P["hue"] = "white";
        const roll = Math.random();
        if (roll < 0.42) {
          // outer seal ring (double band)
          const a = Math.random() * Math.PI * 2;
          const rr = R * (0.96 + Math.random() * 0.1);
          tx = cx + Math.cos(a) * rr;
          ty = cy + Math.sin(a) * rr;
          hue = Math.random() < 0.55 ? "gold" : "white";
        } else if (roll < 0.58) {
          // three spokes at 90°, 210°, 330° (tri-division of the seal)
          const spoke = [-Math.PI / 2, (Math.PI * 7) / 6, (Math.PI * 11) / 6][
            Math.floor(Math.random() * 3)
          ];
          const d = Math.random() * R * 0.9;
          tx = cx + Math.cos(spoke) * d + (Math.random() - 0.5) * 6;
          ty = cy + Math.sin(spoke) * d + (Math.random() - 0.5) * 6;
          hue = "blue";
        } else if (roll < 0.72) {
          // inner ring
          const a = Math.random() * Math.PI * 2;
          const rr = R * (0.62 + Math.random() * 0.05);
          tx = cx + Math.cos(a) * rr;
          ty = cy + Math.sin(a) * rr;
          hue = "blue";
        } else {
          // ambient starfield
          tx = Math.random() * w;
          ty = Math.random() * h;
          hue = Math.random() < 0.2 ? "gold" : "white";
        }
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          tx,
          ty,
          vx: 0,
          vy: 0,
          r: 0.6 + Math.random() * 1.3,
          hue,
          tw: Math.random() * Math.PI * 2,
        });
      }
    }

    function frame(now: number) {
      const t = (now - start) / 1000;
      ctx!.clearRect(0, 0, w, h);
      // assembly eases in over the first ~3.5s
      const assemble = Math.min(1, t / 3.5);
      const ease = assemble * assemble * (3 - 2 * assemble);

      for (const p of particles) {
        // spring toward target scaled by assembly progress
        const ax = (p.tx - p.x) * 0.012 * ease;
        const ay = (p.ty - p.y) * 0.012 * ease;
        p.vx = (p.vx + ax) * 0.94;
        p.vy = (p.vy + ay) * 0.94;

        // gentle mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const f = (1 - d2 / 16000) * 1.5;
          p.vx += (dx / Math.sqrt(d2 + 0.01)) * f;
          p.vy += (dy / Math.sqrt(d2 + 0.01)) * f;
        }

        p.x += p.vx + Math.sin(t * 0.7 + p.tw) * 0.12;
        p.y += p.vy + Math.cos(t * 0.6 + p.tw) * 0.12;

        const alpha = 0.35 + 0.45 * Math.abs(Math.sin(t * 0.8 + p.tw));
        ctx!.fillStyle = `rgba(${COLORS[p.hue]},${alpha})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx!.fillStyle = `rgba(${COLORS[p.hue]},0.55)`;
        ctx!.beginPath();
        ctx!.arc(p.tx, p.ty, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    build();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      build();
      if (reduced) drawStatic();
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

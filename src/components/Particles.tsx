import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  phase: number;
  speed: number;
  isGreen: boolean; // green energy spark vs metallic gold mote
  twinkleSpeed: number;
}

interface ParticlesProps {
  className?: string;
  /** particles per 10,000 px² — tuned for an Apple/Tesla-level clean aesthetic */
  density?: number;
  maxCount?: number;
  /** 0..1 — global brightness multiplier */
  intensity?: number;
  /** when false, the canvas stops its RAF loop */
  active?: boolean;
}

/**
 * High-performance canvas of slowly drifting golden festive motes
 * and subtle Enzolt neon green energy particles with gentle twinkling.
 */
export default function Particles({
  className,
  density = 0.16,
  maxCount = 85,
  intensity = 1,
  active = true,
}: ParticlesProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let running = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = w < 768;
      const count = Math.min(
        maxCount,
        Math.floor(((w * h) / 10000) * density * (isMobile ? 0.6 : 1)),
      );

      particles = Array.from({ length: count }, () => {
        // ~28% electric green energy motes, 72% festive gold motes
        const isGreen = Math.random() < 0.28;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: isGreen ? 0.5 + Math.random() * 1.4 : 0.6 + Math.random() * 1.8,
          vx: (Math.random() - 0.5) * 0.14,
          vy: -(0.06 + Math.random() * 0.22),
          a: 0.25 + Math.random() * 0.55,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.7,
          isGreen,
          twinkleSpeed: 0.8 + Math.random() * 1.4,
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const tw = 0.55 + 0.45 * Math.sin(t * 0.0012 * p.twinkleSpeed + p.phase);
        const alpha = Math.min(1, Math.max(0, p.a * tw * intensity));
        if (alpha <= 0.01) continue;

        const glowRadius = p.r * 4.2;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);

        if (p.isGreen) {
          // Enzolt electric lime green energy spark
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          grad.addColorStop(0.3, `rgba(184, 243, 74, ${alpha * 0.85})`);
          grad.addColorStop(0.65, `rgba(165, 217, 46, ${alpha * 0.4})`);
          grad.addColorStop(1, "rgba(165, 217, 46, 0)");
        } else {
          // Festive metallic gold mote
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          grad.addColorStop(0.3, `rgba(234, 211, 156, ${alpha * 0.8})`);
          grad.addColorStop(0.65, `rgba(213, 168, 75, ${alpha * 0.45})`);
          grad.addColorStop(1, "rgba(213, 168, 75, 0)");
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (t: number) => {
      if (!running) return;

      for (const p of particles) {
        p.x += p.vx + Math.sin(t * 0.0004 + p.phase) * 0.1;
        p.y += p.vy;

        if (p.y < -12) {
          p.y = h + 12;
          p.x = Math.random() * w;
        }
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;
      }

      draw(t);
      raf = requestAnimationFrame(step);
    };

    build();
    if (reduced || !active) {
      draw(0);
    } else {
      raf = requestAnimationFrame(step);
    }

    const ro = new ResizeObserver(() => {
      build();
      if (reduced || !active) draw(0);
    });
    ro.observe(canvas);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced && active) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density, maxCount, intensity, reduced, active]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}

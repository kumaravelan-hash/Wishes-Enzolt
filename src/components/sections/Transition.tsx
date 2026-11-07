import { useLayoutEffect, useRef } from "react";
import Diya from "@/components/Diya";
import { gsap } from "@/lib/gsap";

export default function Transition() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st) return;
    const q = gsap.utils.selector(st);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(q("[data-t='flood']"), { scale: 0, autoAlpha: 0 });
      gsap.set(q("[data-t='tech']"), { autoAlpha: 0 });
      gsap.set(q("[data-t='copy'] > *"), { autoAlpha: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=260%",
          pin: st,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      tl
        // 1. Flame grows & camera pushes in
        .to(q("[data-t='diya']"), { scale: 3.2, y: 120, duration: 0.3, ease: "power2.in" }, 0)
        .to(q("[data-t='flame-label']"), { autoAlpha: 0, duration: 0.1 }, 0)
        // 2. Golden-green light floods the frame
        .to(q("[data-t='flood']"), { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power2.in" }, 0.16)
        .to(q("[data-t='diya']"), { autoAlpha: 0, duration: 0.08 }, 0.34)
        // 3. Flood recedes into Enzolt dark futuristic environment
        .to(q("[data-t='tech']"), { autoAlpha: 1, duration: 0.15 }, 0.4)
        .to(q("[data-t='flood']"), { autoAlpha: 0, scale: 1.6, duration: 0.2, ease: "power2.out" }, 0.42)
        // 4. Centered copy emerges clean and bold
        .to(q("[data-t='copy'] > *"), { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.07 }, 0.5)
        .to({}, { duration: 0.25 });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(q("[data-t='diya'], [data-t='flood'], [data-t='flame-label']"), { autoAlpha: 0 });
      gsap.set(q("[data-t='tech'], [data-t='copy'] > *"), {
        autoAlpha: 1,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-[#080B09]" aria-label="From light to intelligent energy">
      <div ref={stage} className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden">
        {/* ---- Futuristic Enzolt Tech Environment ---- */}
        <div data-t="tech" className="absolute inset-0">
          {/* Cyber Perspective Grid Floor in Enzolt Lime & Gold */}
          <div
            className="absolute inset-x-0 bottom-0 h-[56%]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(165,217,46,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(165,217,46,0.14) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              transform: "perspective(600px) rotateX(64deg)",
              transformOrigin: "50% 0%",
              maskImage: "linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0) 85%)",
              WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0) 85%)",
            }}
          />

          {/* Electric Horizon Glow Line */}
          <div
            className="absolute inset-x-0 top-[45%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(165,217,46,0.8) 40%, rgba(213,168,75,0.7) 60%, transparent)",
              boxShadow: "0 0 16px rgba(165,217,46,0.6)",
            }}
          />

          {/* Ambient center radial glow */}
          <div
            className="absolute left-1/2 top-[45%] h-[45vh] w-[120vw] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(165,217,46,0.16) 0%, rgba(213,168,75,0.08) 32%, rgba(8,11,9,0) 70%)",
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(70% 70% at 50% 50%, rgba(8,11,9,0) 30%, #080B09 100%)",
            }}
          />
        </div>

        {/* Centered copy */}
        <div
          data-t="copy"
          className="absolute left-1/2 top-1/2 z-10 flex w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A5D92E]/25 bg-[#151A17]/85 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-enzolt animate-pulse" />
            <span className="font-product text-[10px] font-semibold tracking-[0.3em] uppercase text-enzolt">
              A New Dimension
            </span>
          </div>

          <h2 className="font-display text-4xl font-extrabold leading-[1.04] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            BEYOND LIGHT.
            <br />
            <span className="text-green-gradient">BEYOND LIMITS.</span>
          </h2>
          <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-mist md:text-base">
            This festive season, we are celebrating more than a new beginning. We are introducing a new dimension of intelligent energy technology.
          </p>
        </div>

        {/* ---- Diya / flame (Start State) ---- */}
        <div data-t="diya" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform">
          <Diya size={145} halo rays flameScale={1.3} />
        </div>
        <p
          data-t="flame-label"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-product text-[10px] font-medium uppercase tracking-[0.35em] text-enzolt/70"
        >
          Keep scrolling
        </p>

        {/* Festive Golden-Green Flood */}
        <div
          data-t="flood"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[260vmax] w-[260vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #FFFFFF 0%, #EAD39C 16%, #A5D92E 36%, rgba(213,168,75,0.85) 55%, rgba(8,11,9,0) 72%)",
          }}
        />
      </div>
    </section>
  );
}

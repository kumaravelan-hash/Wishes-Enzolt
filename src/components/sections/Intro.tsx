import { useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import Diya from "@/components/Diya";
import Logo from "@/components/Logo";
import Particles from "@/components/Particles";
import { gsap, prefersReducedMotion, scrollToId } from "@/lib/gsap";

export default function Intro() {
  const root = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    if (prefersReducedMotion()) {
      gsap.set(q("[data-i]"), { autoAlpha: 1, y: 0, scale: 1 });
      setDone(true);
      return;
    }

    gsap.set(q("[data-i]"), { autoAlpha: 0 });
    gsap.set(q("[data-i='spark']"), { scale: 0.2 });
    gsap.set(q("[data-i='diya']"), { scale: 0.88, y: 24 });
    gsap.set(q("[data-i='text']"), { y: 28 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => setDone(true),
    });

    tl.to(q("[data-i='spark']"), { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power1.inOut" }, 0.3)
      .to(q("[data-i='diya']"), { autoAlpha: 1, scale: 1, y: 0, duration: 1.5 }, 0.9)
      .to(q("[data-i='spark']"), { autoAlpha: 0, duration: 0.8 }, 1.5)
      .to(q("[data-i='particles']"), { autoAlpha: 1, duration: 1.8 }, 1.2)
      .to(q("[data-i='logo']"), { autoAlpha: 1, y: 0, duration: 0.9 }, 1.8)
      .to(q("[data-i='text']"), { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.16 }, 2.2)
      .to(q("[data-i='hint']"), { autoAlpha: 1, duration: 1 }, 3.4);

    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  const skip = () => {
    tlRef.current?.progress(1);
  };

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#080B09] px-6 pt-24 pb-16 text-center"
    >
      {/* Dynamic particles (Golden festive motes + Enzolt neon green energy particles) */}
      <div data-i="particles" className="absolute inset-0">
        <Particles density={0.17} intensity={0.95} />
      </div>

      {/* Cinematic Dual Glow: Enzolt Electric Green radial glow + Warm Gold Diya aura */}
      <div
        className="pointer-events-none absolute left-1/2 top-[44%] h-[75vw] w-[75vw] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[48vw] md:w-[48vw]"
        style={{
          background:
            "radial-gradient(circle, rgba(165,217,46,0.11) 0%, rgba(213,168,75,0.08) 32%, rgba(8,11,9,0) 70%)",
        }}
      />

      {/* Soft dark vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 60% at 50% 50%, rgba(8,11,9,0) 0%, rgba(8,11,9,0.5) 65%, #080B09 100%)",
        }}
      />

      {/* Top brand mark */}
      <div data-i="logo" className="absolute top-16 left-1/2 -translate-x-1/2 md:top-20 z-20">
        <Logo size="md" />
      </div>

      {/* Initial ignition spark */}
      <div
        data-i="spark"
        className="pointer-events-none absolute left-1/2 top-[28%] md:top-[27%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full z-20"
        style={{
          background: "#FFFFFF",
          boxShadow:
            "0 0 28px 12px rgba(184,243,74,0.9), 0 0 70px 30px rgba(165,217,46,0.5), 0 0 100px 40px rgba(213,168,75,0.4)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center pt-8 md:pt-10">
        {/* Animated Diya with realistic flame positioned gracefully below the brand mark */}
        <div data-i="diya" className="mt-12 md:mt-18 mb-6 md:mb-8">
          <Diya size={145} rays flameScale={1} className="md:hidden" />
          <Diya size={185} rays flameScale={1} className="hidden md:block" />
        </div>

        {/* Eyebrow badge with Enzolt tech styling */}
        <div data-i="text" className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A5D92E]/25 bg-[#151A17]/80 px-4 py-1.5 shadow-[0_0_20px_-5px_rgba(165,217,46,0.2)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-enzolt shadow-[0_0_8px_#A5D92E]" />
          <span className="font-product text-[10px] font-semibold tracking-[0.3em] uppercase text-enzolt">
            Enzolt Energy · Festival of Lights
          </span>
          <Sparkles size={11} className="text-gold" />
        </div>

        {/* Large bold hero greeting typography */}
        <h1
          data-i="text"
          className="font-display text-[2.6rem] leading-[1.04] font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          THIS DIWALI,
          <br />
          <span className="text-green-gradient">LET LIGHT LEAD THE WAY.</span>
        </h1>

        {/* Clean subtitle */}
        <p
          data-i="text"
          className="mt-6 max-w-xl font-body text-sm leading-relaxed text-mist md:text-base lg:text-[1.05rem]"
        >
          Celebrating brighter beginnings, endless possibilities, and an intelligent future powered by clean energy innovation.
        </p>

        {/* Festive Wish Ribbon */}
        <div data-i="text" className="mt-8 flex flex-col items-center">
          <span className="font-product text-[0.72rem] font-bold tracking-[0.45em] text-gold uppercase">
            HAPPY DIWALI · ENZOLT ENERGY EDITION
          </span>
          <span className="mt-2 font-display text-sm tracking-wide text-white/75 md:text-base">
            Warm wishes of prosperity, innovation, and boundless light.
          </span>
        </div>

        {/* CTAs */}
        <div data-i="text" className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToId("wishes")}
            className="enzolt-btn group"
          >
            <span>Discover What&apos;s New</span>
            <ArrowDown size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-y-1" />
          </button>
          <button
            onClick={() => scrollToId("unicore")}
            className="ghost-btn"
          >
            Explore UNICORE 1500
          </button>
        </div>
      </div>

      {/* Skip button for returning visitors */}
      {!done && (
        <button
          onClick={skip}
          className="absolute bottom-6 right-6 z-20 font-body text-[10px] font-medium uppercase tracking-[0.3em] text-mist/60 transition-colors hover:text-enzolt"
        >
          Skip intro
        </button>
      )}

      {/* Scroll hint with Enzolt green accent */}
      <div
        data-i="hint"
        className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-enzolt/80"
      >
        <span className="font-body text-[9px] font-semibold uppercase tracking-[0.35em] text-mist">Scroll</span>
        <ArrowDown size={14} strokeWidth={2} className="scroll-hint text-enzolt" />
      </div>
    </section>
  );
}

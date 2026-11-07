import { useEffect, useRef } from "react";
import { Sparkles, Zap, ShieldCheck } from "lucide-react";
import diyaImg from "@/assets/diya-golden.jpg";
import Particles from "@/components/Particles";
import Reveal from "@/components/Reveal";
import { gsap } from "@/lib/gsap";

const EMBERS = Array.from({ length: 12 }, (_, i) => ({
  left: 42 + ((i * 17) % 20),
  delay: (i * 0.6) % 5,
  size: 2 + (i % 3),
  dur: 4 + (i % 4),
}));

export default function Greeting() {
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const pic = img.current;
    if (!el || !pic) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(
        pic,
        { yPercent: 6, scale: 0.96 },
        {
          yPercent: -6,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="wishes"
      ref={root}
      className="relative overflow-hidden bg-[#080B09] py-24 md:py-36"
      aria-labelledby="wishes-title"
    >
      <Particles density={0.12} intensity={0.8} maxCount={55} />

      {/* Dual ambient light: Enzolt green accent + warm golden illumination */}
      <div
        className="pointer-events-none absolute -left-[20%] top-1/2 h-[80vw] w-[80vw] -translate-y-1/2 md:left-[-5%] md:h-[55vw] md:w-[55vw]"
        style={{
          background:
            "radial-gradient(circle, rgba(165,217,46,0.08) 0%, rgba(213,168,75,0.12) 28%, rgba(8,11,9,0) 68%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-[-10%] bottom-0 h-[50vw] w-[50vw]"
        style={{
          background:
            "radial-gradient(circle, rgba(165,217,46,0.06) 0%, rgba(8,11,9,0) 65%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:px-10 lg:gap-16">
        {/* Diya visual with refined glass card and flame overlay */}
        <div className="md:col-span-7">
          <div ref={img} className="relative mx-auto w-full max-w-2xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#151A17]/60 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
              <img
                src={diyaImg}
                alt="A golden diya glowing softly in the dark"
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
                className="blend-screen h-full w-full object-cover"
              />

              {/* Animated flame overlay positioned over the photographed flame */}
              <div className="absolute inset-0" aria-hidden="true">
                <div
                  className="flame blend-screen"
                  style={{
                    left: "51.4%",
                    bottom: "46%",
                    width: "3.6%",
                    height: "17%",
                    borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 20%, #EAD39C 45%, #D5A84B 75%, rgba(165,217,46,0.2) 100%)",
                    filter: "blur(1.5px)",
                  }}
                />
                <div
                  className="flame-glow blend-screen"
                  style={{
                    left: "51.4%",
                    top: "46%",
                    width: "36%",
                    aspectRatio: "1 / 1",
                    height: "auto",
                    background:
                      "radial-gradient(circle, rgba(234,211,156,0.4) 0%, rgba(213,168,75,0.18) 32%, rgba(165,217,46,0.06) 50%, rgba(8,11,9,0) 70%)",
                  }}
                />
              </div>

              {/* Embers */}
              {EMBERS.map((e, i) => (
                <span
                  key={i}
                  className="ember"
                  aria-hidden="true"
                  style={{
                    left: `${e.left}%`,
                    top: "50%",
                    width: e.size,
                    height: e.size,
                    animationDelay: `${e.delay}s`,
                    animationDuration: `${e.dur}s`,
                  }}
                />
              ))}

              {/* Subtle tech watermark badge */}
              <div className="absolute bottom-4 left-5 flex items-center gap-2 rounded-full border border-white/10 bg-[#080B09]/80 px-3 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-enzolt animate-pulse" />
                <span className="font-product text-[9px] font-semibold tracking-[0.25em] text-white/80 uppercase">
                  Continuous Luminescence
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copy & Festive Message Card */}
        <div className="md:col-span-5">
          <Reveal stagger={0.12}>
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-px w-6 bg-enzolt" />
              <p className="eyebrow">Diwali Wishes</p>
            </div>

            <h2
              id="wishes-title"
              className="font-display text-4xl leading-[1.02] font-extrabold text-white sm:text-5xl lg:text-6xl"
            >
              LIGHT UP
              <br />
              <span className="text-green-gradient">EVERY MOMENT.</span>
            </h2>

            <div className="hairline-green my-7 w-32" />

            <p className="font-body text-base leading-relaxed text-mist md:text-[1.05rem]">
              This Diwali, may every flame inspire bold ideas, every spark ignite progress, and every home experience the calm reassurance of intelligent energy.
            </p>

            {/* Premium Charcoal Card with subtle green border */}
            <div className="enzolt-card mt-7 p-5">
              <div className="flex items-center gap-2.5 text-enzolt mb-2.5">
                <Sparkles size={16} />
                <span className="font-product text-[11px] font-semibold tracking-[0.2em] uppercase text-white">
                  A Festive Blessing of Power
                </span>
              </div>
              <p className="font-body text-[13px] leading-relaxed text-mist">
                As the lamps glow throughout the night, Enzolt Energy stands committed to keeping your world bright, connected, and resilient.
              </p>
              <div className="mt-4 flex items-center gap-5 border-t border-white/[0.06] pt-3 text-[11px] font-medium text-white/70">
                <span className="flex items-center gap-1.5">
                  <Zap size={13} className="text-enzolt" /> 100% Smart Energy
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-gold" /> Unmatched Reliability
                </span>
              </div>
            </div>

            <p className="mt-7 font-display text-lg font-bold text-enzolt">
              — Warmest festive regards, <span className="text-white">Team Enzolt Energy</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

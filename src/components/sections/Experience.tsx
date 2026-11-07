import { Gem, Radio, SlidersHorizontal, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

const HIGHLIGHTS: { icon: LucideIcon; title: string; text: string; tag: string }[] = [
  {
    icon: Gem,
    title: "Architectural Product Design",
    text: "A refined, monolithic form crafted with industrial precision to sit seamlessly in modern luxury spaces.",
    tag: "INDUSTRIAL CRAFTSMANSHIP",
  },
  {
    icon: Radio,
    title: "Intelligent Connectivity Core",
    text: "Engineered to maintain persistent low-latency telemetry with the Enzolt companion ecosystem.",
    tag: "ALWAYS ONLINE",
  },
  {
    icon: SlidersHorizontal,
    title: "Unified Energy Telemetry",
    text: "Real-time visibility into power flows, battery health, and backup readiness at a glance.",
    tag: "SMART REASSURANCE",
  },
];

export default function Experience() {
  return (
    <section
      className="relative overflow-hidden bg-[#080B09] py-24 md:py-36"
      aria-labelledby="experience-title"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[75vw] w-[75vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(165,217,46,0.08) 0%, rgba(213,168,75,0.05) 30%, rgba(8,11,9,0) 68%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-3xl text-center" stagger={0.12}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A5D92E]/25 bg-[#151A17]/80 px-4 py-1.5 shadow-[0_0_15px_-4px_rgba(165,217,46,0.2)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-enzolt animate-pulse" />
            <span className="font-product text-[10px] font-semibold tracking-[0.3em] uppercase text-enzolt">
              Product Engineering
            </span>
          </div>

          <h2
            id="experience-title"
            className="font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl"
          >
            DESIGNED FOR A
            <br />
            <span className="text-green-gradient">SMARTER ENERGY</span> EXPERIENCE.
          </h2>
          <p className="mt-4 mx-auto max-w-xl font-body text-sm leading-relaxed text-mist md:text-base">
            Engineered to perfection with luxury minimalism, high-performance battery integration, and continuous cloud telemetry.
          </p>
        </Reveal>

        {/* 3-Column Highlights Grid */}
        <Reveal stagger={0.14} className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="enzolt-card group relative flex flex-col justify-between p-8 transition-all duration-400 hover:border-enzolt/40 hover:shadow-[0_20px_45px_-12px_rgba(165,217,46,0.25)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-enzolt/30 bg-enzolt/10 text-enzolt transition-all duration-400 group-hover:bg-enzolt/20 group-hover:shadow-[0_0_20px_rgba(165,217,46,0.4)]">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <span className="font-product text-sm font-bold tracking-[0.2em] text-mist/50">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="mt-6">
                    <span className="font-product text-[10px] font-bold tracking-[0.25em] text-enzolt uppercase">
                      {h.tag}
                    </span>
                    <h3 className="mt-2 font-product text-xl font-bold tracking-tight text-white md:text-2xl">
                      {h.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-mist">
                      {h.text}
                    </p>
                  </div>
                </div>

                {/* Subtle bottom green accent highlight bar */}
                <div className="mt-8 h-0.5 w-10 rounded-full bg-white/10 transition-all duration-400 group-hover:w-20 group-hover:bg-enzolt" />
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

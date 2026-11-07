import { useEffect, useRef, useState } from "react";
import { BatteryCharging, Bell, Globe, Headphones, Plug, RotateCw, type LucideIcon } from "lucide-react";
import PhoneMockup, { type AppScreen } from "@/components/PhoneMockup";
import Reveal from "@/components/Reveal";
import { gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";

interface Feature {
  n: string;
  title: string;
  text: string;
  icon: LucideIcon;
  screen: AppScreen;
}

const FEATURES: Feature[] = [
  {
    n: "01",
    title: "Charging Monitoring",
    text: "Stay informed about your battery core charging telemetry in real time through the connected smart application.",
    icon: BatteryCharging,
    screen: "dashboard",
  },
  {
    n: "02",
    title: "Power Cut Monitoring",
    text: "Instant awareness when grid power fluctuates or cuts out, keeping you seamlessly connected to your energy status.",
    icon: Plug,
    screen: "power",
  },
  {
    n: "03",
    title: "Battery Cycle Information",
    text: "Access detailed battery usage, cycle health analytics, and performance insights directly from your phone.",
    icon: RotateCw,
    screen: "cycles",
  },
  {
    n: "04",
    title: "Enzolt Updates",
    text: "Receive firmware advancements, festive greetings, and critical system announcements straight to your device.",
    icon: Bell,
    screen: "updates",
  },
  {
    n: "05",
    title: "Customer Support",
    text: "Connect directly with specialized Enzolt energy consultants whenever assistance or maintenance is required.",
    icon: Headphones,
    screen: "support",
  },
  {
    n: "06",
    title: "Remote Access",
    text: "Experience the peace of mind of monitoring and configuring your home energy hub from anywhere in the world.",
    icon: Globe,
    screen: "remote",
  },
];

export default function SmartApp() {
  const [screen, setScreen] = useState<AppScreen>("dashboard");
  const phoneRef = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);

  // Phone entrance + gentle levitation
  useEffect(() => {
    const el = phoneRef.current;
    const sec = root.current;
    if (!el || !sec) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const entrance = gsap.fromTo(
        el,
        { autoAlpha: 0, y: 90, rotateX: 12, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 70%" },
        },
      );
      const float = gsap.to(el, {
        y: -10,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4,
      });
      return () => {
        entrance.scrollTrigger?.kill();
        entrance.kill();
        float.kill();
      };
    });
    return () => mm.revert();
  }, []);

  // Auto-cycle screens until the user interacts
  const [interacted, setInteracted] = useState(false);
  useEffect(() => {
    if (interacted) return;
    const id = window.setInterval(() => {
      setScreen((s) => {
        const i = FEATURES.findIndex((f) => f.screen === s);
        return FEATURES[(i + 1) % FEATURES.length].screen;
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, [interacted]);

  const select = (s: AppScreen) => {
    setInteracted(true);
    setScreen(s);
  };

  return (
    <section
      id="smart"
      ref={root}
      className="relative overflow-hidden bg-[#151A17] py-24 md:py-36"
      aria-labelledby="smart-title"
    >
      {/* Top transition from primary black to charcoal */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#080B09] to-transparent" />

      {/* Subtle ambient electric green glow */}
      <div
        className="pointer-events-none absolute right-[-15%] top-1/4 h-[70vw] w-[70vw] md:h-[40vw] md:w-[40vw]"
        style={{
          background: "radial-gradient(circle, rgba(165,217,46,0.08) 0%, rgba(21,26,23,0) 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-[-15%] bottom-1/4 h-[60vw] w-[60vw] md:h-[35vw] md:w-[35vw]"
        style={{
          background: "radial-gradient(circle, rgba(213,168,75,0.06) 0%, rgba(21,26,23,0) 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-3xl text-center" stagger={0.12}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A5D92E]/25 bg-[#080B09]/80 px-4 py-1.5 shadow-[0_0_15px_-4px_rgba(165,217,46,0.2)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-enzolt animate-pulse" />
            <span className="font-product text-[10px] font-semibold tracking-[0.3em] uppercase text-enzolt">
              Smart IoT Ecosystem
            </span>
          </div>

          <h2
            id="smart-title"
            className="font-display text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            YOUR ENERGY.
            <br />
            <span className="text-green-gradient">CONNECTED. ANYWHERE.</span>
          </h2>

          <p className="mt-5 font-body text-base text-mist md:text-[1.05rem]">
            Real-time intelligence and seamless system control, designed to sit quietly in your pocket.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 items-center gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Phone mockup column */}
          <div className="lg:col-span-5" style={{ perspective: 1400 }}>
            <div ref={phoneRef} className="will-change-transform">
              <PhoneMockup screen={screen} />
            </div>
          </div>

          {/* Redesigned Charcoal Content Cards */}
          <div className="lg:col-span-7">
            <Reveal stagger={0.08} className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {FEATURES.map((f) => {
                const active = screen === f.screen;
                const Icon = f.icon;
                return (
                  <button
                    key={f.n}
                    type="button"
                    onMouseEnter={() => select(f.screen)}
                    onFocus={() => select(f.screen)}
                    onClick={() => select(f.screen)}
                    aria-pressed={active}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-400",
                      active
                        ? "border-[#A5D92E]/50 bg-gradient-to-b from-[#A5D92E]/[0.10] to-[#151A17] shadow-[0_16px_40px_-20px_rgba(165,217,46,0.35)]"
                        : "border-white/[0.07] bg-[#121614]/80 hover:border-[#A5D92E]/35 hover:bg-[#181E1A]",
                    )}
                  >
                    {/* Top right subtle glow */}
                    <span
                      className={cn(
                        "pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full transition-opacity duration-500",
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-40",
                      )}
                      style={{
                        background: "radial-gradient(circle, rgba(165,217,46,0.3) 0%, rgba(165,217,46,0) 70%)",
                      }}
                    />

                    <div className="flex items-start justify-between">
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-xl border transition-colors duration-400",
                          active
                            ? "border-enzolt/60 bg-enzolt/20 text-enzolt shadow-[0_0_12px_rgba(165,217,46,0.3)]"
                            : "border-white/10 text-mist group-hover:border-enzolt/30 group-hover:text-enzolt",
                        )}
                      >
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      <span className={cn(
                        "font-product text-[10px] font-bold tracking-[0.25em]",
                        active ? "text-enzolt" : "text-mist/70 group-hover:text-enzolt"
                      )}>
                        FEATURE {f.n}
                      </span>
                    </div>

                    <h3 className="mt-4 font-product text-[15px] font-bold uppercase tracking-[0.05em] text-white">
                      {f.title}
                    </h3>
                    <p className="mt-2 font-body text-[13px] leading-relaxed text-mist">{f.text}</p>

                    <span
                      className={cn(
                        "mt-4 block h-[2px] w-full origin-left bg-gradient-to-r from-enzolt to-transparent transition-transform duration-500",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-40",
                      )}
                    />
                  </button>
                );
              })}
            </Reveal>

            <p className="mt-6 font-body text-[11px] leading-relaxed text-mist/60">
              The application interface shown is a conceptual visual representation. All smart features are engineered and supported by Enzolt Energy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

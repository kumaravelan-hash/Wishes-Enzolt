import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import Particles from "@/components/Particles";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/utils/cn";

/**
 * Pure Scroll-Driven Cinematic Video Transition Section.
 *
 * 1. Video 1 loads and plays immediately when scrolled into view.
 * 2. As the user scrolls further, an energy laser transition animation sweeps
 *    across and Video 2 loads and plays seamlessly.
 * 3. Operates identically on desktop (horizontal widescreen cinema) and mobile.
 * 4. All heavy text, headings, badges, and spec cards are completely removed.
 */
export default function ProductReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Video container references
  const video1WrapRef = useRef<HTMLDivElement>(null);
  const video2WrapRef = useRef<HTMLDivElement>(null);

  // Video element references
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Ambient blurred video references
  const bgVideo1Ref = useRef<HTMLVideoElement>(null);
  const bgVideo2Ref = useRef<HTMLVideoElement>(null);

  // Transition visual effect elements
  const sweepBeamRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  // Interactive UI state
  const [activeVideo, setActiveVideo] = useState<0 | 1>(0);
  const activeVideoRef = useRef<0 | 1>(0);
  activeVideoRef.current = activeVideo;

  const [isPlaying, setIsPlaying] = useState(true);
  const userPausedRef = useRef(false);

  const [isMuted, setIsMuted] = useState(true);
  const [isFill, setIsFill] = useState(true); // Default to horizontal fill on desktop
  const [scrollProgress, setScrollProgress] = useState(0);

  // Setup GSAP Pinned ScrollTrigger with scrubbed timeline animation
  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const v1Wrap = video1WrapRef.current;
    const v2Wrap = video2WrapRef.current;
    const sweep = sweepBeamRef.current;
    const flare = flareRef.current;

    if (!container || !stage || !v1Wrap || !v2Wrap) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isNoPref: "(prefers-reduced-motion: no-preference)",
        isReduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isReduce } = context.conditions as {
          isNoPref: boolean;
          isReduce: boolean;
        };

        // Initial setup
        gsap.set(v1Wrap, { autoAlpha: 1, scale: 1, y: 0 });
        gsap.set(v2Wrap, { autoAlpha: 0, scale: isReduce ? 1 : 1.05, y: isReduce ? 0 : 20 });
        if (sweep) gsap.set(sweep, { xPercent: -150, autoAlpha: 0 });
        if (flare) gsap.set(flare, { autoAlpha: 0, scale: 0.8 });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "unicore-scroll",
            trigger: container,
            start: "top top",
            end: "+=190%",
            pin: stage,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              setScrollProgress(p);

              // Phase 1: Video 1 is active (scroll progress < 0.48)
              if (p < 0.48) {
                if (activeVideoRef.current !== 0) {
                  activeVideoRef.current = 0;
                  setActiveVideo(0);
                }

                if (video2Ref.current && !video2Ref.current.paused) {
                  video2Ref.current.pause();
                }
                if (bgVideo2Ref.current && !bgVideo2Ref.current.paused) {
                  bgVideo2Ref.current.pause();
                }

                if (!userPausedRef.current) {
                  if (video1Ref.current && video1Ref.current.paused) {
                    video1Ref.current.play().catch(() => {});
                  }
                  if (bgVideo1Ref.current && bgVideo1Ref.current.paused) {
                    bgVideo1Ref.current.play().catch(() => {});
                  }
                }
              }
              // Phase 2: Video 2 is active (scroll progress >= 0.52)
              else if (p >= 0.52) {
                if (activeVideoRef.current !== 1) {
                  activeVideoRef.current = 1;
                  setActiveVideo(1);
                }

                if (video1Ref.current && !video1Ref.current.paused) {
                  video1Ref.current.pause();
                }
                if (bgVideo1Ref.current && !bgVideo1Ref.current.paused) {
                  bgVideo1Ref.current.pause();
                }

                if (!userPausedRef.current) {
                  if (video2Ref.current && video2Ref.current.paused) {
                    video2Ref.current.play().catch(() => {});
                  }
                  if (bgVideo2Ref.current && bgVideo2Ref.current.paused) {
                    bgVideo2Ref.current.play().catch(() => {});
                  }
                }
              }
            },
            onEnter: () => {
              if (!userPausedRef.current) {
                setIsPlaying(true);
                if (activeVideoRef.current === 0) {
                  video1Ref.current?.play().catch(() => {});
                  bgVideo1Ref.current?.play().catch(() => {});
                } else {
                  video2Ref.current?.play().catch(() => {});
                  bgVideo2Ref.current?.play().catch(() => {});
                }
              }
            },
            onLeave: () => {
              setIsPlaying(false);
              video1Ref.current?.pause();
              video2Ref.current?.pause();
              bgVideo1Ref.current?.pause();
              bgVideo2Ref.current?.pause();
            },
            onEnterBack: () => {
              if (!userPausedRef.current) {
                setIsPlaying(true);
                if (activeVideoRef.current === 0) {
                  video1Ref.current?.play().catch(() => {});
                  bgVideo1Ref.current?.play().catch(() => {});
                } else {
                  video2Ref.current?.play().catch(() => {});
                  bgVideo2Ref.current?.play().catch(() => {});
                }
              }
            },
            onLeaveBack: () => {
              setIsPlaying(false);
              video1Ref.current?.pause();
              video2Ref.current?.pause();
              bgVideo1Ref.current?.pause();
              bgVideo2Ref.current?.pause();
            },
          },
        });

        if (isReduce) {
          // Simple crossfade for reduced motion
          tl.to(v1Wrap, { autoAlpha: 0, duration: 0.3 }, 0.4).to(
            v2Wrap,
            { autoAlpha: 1, duration: 0.3 },
            0.4,
          );
        } else {
          // Cinematic Energy Sweep Transition between Video 1 & Video 2
          tl
            // Hold Video 1 clean from 0.0 to 0.35
            .to({}, { duration: 0.35 })

            // At 0.35 -> 0.65: Transition animation sweeps across
            // 1. Video 1 scales down slightly and fades
            .to(
              v1Wrap,
              {
                autoAlpha: 0,
                scale: 0.94,
                y: -15,
                duration: 0.28,
                ease: "power2.inOut",
              },
              0.35,
            )

            // 2. High-energy beam sweeps across screen
            .fromTo(
              sweep,
              { xPercent: -120, autoAlpha: 0 },
              { xPercent: 220, autoAlpha: 1, duration: 0.32, ease: "power1.inOut" },
              0.34,
            )
            .to(sweep, { autoAlpha: 0, duration: 0.08 }, 0.62)

            // 3. Central optical energy flare pulses
            .fromTo(
              flare,
              { autoAlpha: 0, scale: 0.7 },
              { autoAlpha: 0.75, scale: 1.4, duration: 0.16, ease: "power2.out" },
              0.38,
            )
            .to(flare, { autoAlpha: 0, scale: 1.8, duration: 0.16, ease: "power2.in" }, 0.52)

            // 4. Video 2 seamlessly crossfades in
            .to(
              v2Wrap,
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.28,
                ease: "power2.out",
              },
              0.38,
            )

            // Hold Video 2 clean from 0.65 to 1.0
            .to({}, { duration: 0.35 });
        }

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      },
    );

    return () => mm.revert();
  }, []);

  // Synchronize audio mute across both video elements
  useEffect(() => {
    if (video1Ref.current) video1Ref.current.muted = isMuted;
    if (video2Ref.current) video2Ref.current.muted = isMuted;
  }, [isMuted]);

  // Interactive toggle Play / Pause
  const togglePlay = () => {
    const currentVideo = activeVideoRef.current === 0 ? video1Ref.current : video2Ref.current;
    const currentBg = activeVideoRef.current === 0 ? bgVideo1Ref.current : bgVideo2Ref.current;

    if (!currentVideo) return;

    if (currentVideo.paused) {
      userPausedRef.current = false;
      currentVideo.play().then(() => setIsPlaying(true)).catch(() => {});
      currentBg?.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      currentVideo.pause();
      currentBg?.pause();
      setIsPlaying(false);
    }
  };

  // Interactive toggle Mute / Unmute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // Jump smoothly to Video 1 or Video 2
  const jumpToVideo = (target: 0 | 1) => {
    const trigger = ScrollTrigger.getById("unicore-scroll");
    if (!trigger) return;

    const startPos = trigger.start;
    const totalDist = trigger.end - trigger.start;
    const targetScroll = target === 0 ? startPos + 10 : startPos + totalDist * 0.75;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="unicore"
      ref={containerRef}
      className="relative bg-[#080B09] overflow-hidden"
      aria-label="UNICORE 1500 Video Presentation"
    >
      <Particles density={0.06} intensity={0.6} maxCount={40} />

      {/* Ambient background studio atmosphere */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[100vw] w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(165,217,46,0.14) 0%, rgba(213,168,75,0.06) 35%, rgba(8,11,9,0) 70%)",
        }}
      />

      {/* Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="relative flex h-[100svh] w-full flex-col items-center justify-center px-4 sm:px-6 md:px-10 overflow-hidden"
      >
        {/* Cinema Video Container Box */}
        <div className="relative w-full max-w-[360px] aspect-[9/16] max-h-[76svh] sm:max-w-2xl sm:aspect-video sm:max-h-none md:max-w-5xl md:aspect-[16/9]">
          {/* Ambient Outer Backlight Glow */}
          <div
            className="pointer-events-none absolute -inset-6 rounded-[40px] opacity-80 blur-3xl transition-opacity duration-700"
            style={{
              background:
                activeVideo === 0
                  ? "radial-gradient(ellipse at 50% 50%, rgba(165,217,46,0.32) 0%, rgba(213,168,75,0.12) 50%, transparent 75%)"
                  : "radial-gradient(ellipse at 50% 50%, rgba(213,168,75,0.3) 0%, rgba(165,217,46,0.16) 50%, transparent 75%)",
            }}
          />

          {/* Main Cinema Theater Frame */}
          <div className="relative h-full w-full overflow-hidden rounded-[22px] sm:rounded-[30px] md:rounded-[36px] border-2 border-white/[0.14] bg-[#0C100E] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),0_0_60px_rgba(165,217,46,0.2)]">
            {/* ============================================================== */}
            {/* LAYER 1: First Video (Enzolt_Reel_1_Final.mp4)                */}
            {/* ============================================================== */}
            <div
              ref={video1WrapRef}
              className="absolute inset-0 h-full w-full overflow-hidden will-change-transform"
            >
              {/* Blurred Ambient Background (Fills horizontal widescreen on desktop) */}
              <video
                ref={bgVideo1Ref}
                src="/Enzolt_Reel_1_Final.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 blur-2xl scale-110"
              />

              {/* Sharp Video Player */}
              <video
                ref={video1Ref}
                src="/Enzolt_Reel_1_Final.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className={cn(
                  "relative z-10 h-full w-full transition-all duration-300",
                  isFill ? "object-cover object-center" : "object-contain object-center",
                )}
              />
            </div>

            {/* ============================================================== */}
            {/* LAYER 2: Second Video (02_Reel_2_V2_Final.mp4)               */}
            {/* ============================================================== */}
            <div
              ref={video2WrapRef}
              className="absolute inset-0 h-full w-full overflow-hidden will-change-transform"
            >
              {/* Blurred Ambient Background (Fills horizontal widescreen on desktop) */}
              <video
                ref={bgVideo2Ref}
                src="/02_Reel_2_V2_Final.mp4"
                loop
                muted
                playsInline
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 blur-2xl scale-110"
              />

              {/* Sharp Video Player */}
              <video
                ref={video2Ref}
                src="/02_Reel_2_V2_Final.mp4"
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className={cn(
                  "relative z-10 h-full w-full transition-all duration-300",
                  isFill ? "object-cover object-center" : "object-contain object-center",
                )}
              />
            </div>

            {/* ============================================================== */}
            {/* TRANSITION OVERLAY EFFECTS (Energy Sweep Beam & Flare)         */}
            {/* ============================================================== */}
            {/* Vertical Laser Light Beam that sweeps horizontally */}
            <div
              ref={sweepBeamRef}
              className="pointer-events-none absolute top-0 bottom-0 z-30 w-8 -translate-x-1/2 opacity-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(165,217,46,0.6) 45%, #ffffff 50%, rgba(213,168,75,0.7) 55%, transparent 100%)",
                boxShadow:
                  "0 0 35px 8px rgba(165,217,46,0.8), 0 0 70px 20px rgba(213,168,75,0.4)",
              }}
            />

            {/* Central Optical Energy Flare */}
            <div
              ref={flareRef}
              className="pointer-events-none absolute inset-0 z-30 opacity-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(165,217,46,0.5) 25%, rgba(213,168,75,0.2) 50%, transparent 70%)",
              }}
            />

            {/* ============================================================== */}
            {/* TOP MINIMAL HUD OVERLAY (Minimalist Segment Switcher)           */}
            {/* ============================================================== */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-3.5 sm:p-5 md:p-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent">
              {/* Interactive Video Switcher Pills */}
              <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 p-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => jumpToVideo(0)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1 font-product text-[10px] sm:text-xs font-bold tracking-wider transition-all",
                    activeVideo === 0
                      ? "bg-enzolt text-[#080B09] shadow-[0_0_14px_rgba(165,217,46,0.6)]"
                      : "text-white/60 hover:text-white",
                  )}
                  aria-label="Switch to Video 01"
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      activeVideo === 0 ? "bg-[#080B09] animate-pulse" : "bg-white/40",
                    )}
                  />
                  <span>01</span>
                </button>

                {/* Dynamic Scroll Progress Bar between 01 and 02 */}
                <div className="relative h-1 w-8 sm:w-12 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="absolute inset-y-0 left-0 bg-enzolt transition-all duration-150"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => jumpToVideo(1)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1 font-product text-[10px] sm:text-xs font-bold tracking-wider transition-all",
                    activeVideo === 1
                      ? "bg-enzolt text-[#080B09] shadow-[0_0_14px_rgba(165,217,46,0.6)]"
                      : "text-white/60 hover:text-white",
                  )}
                  aria-label="Switch to Video 02"
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      activeVideo === 1 ? "bg-[#080B09] animate-pulse" : "bg-white/40",
                    )}
                  />
                  <span>02</span>
                </button>
              </div>

              {/* Minimal 4K indicator */}
              <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-black/60 px-3 py-1 font-product text-[9px] font-bold tracking-wider text-gold backdrop-blur-md">
                <span>4K CINEMA</span>
              </div>
            </div>

            {/* ============================================================== */}
            {/* BOTTOM CONTROLS BAR (Play/Pause, View Toggle, Audio Mute)      */}
            {/* ============================================================== */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-3.5 sm:p-5 md:p-6 bg-gradient-to-t from-black/85 via-black/35 to-transparent">
              {/* Play / Pause Toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-all hover:border-enzolt hover:bg-enzolt/20 hover:text-enzolt hover:scale-105 active:scale-95"
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                </button>
              </div>

              {/* Center Scroll Hint (Fades out smoothly once user scrolls) */}
              <div
                className="hidden sm:flex items-center gap-1.5 font-product text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 transition-opacity duration-300"
                style={{ opacity: Math.max(0, 1 - scrollProgress * 3.5) }}
              >
                <span>Scroll to Next Video</span>
                <ChevronDown size={14} className="animate-bounce" />
              </div>

              {/* Right Controls: Fit/Fill Toggle & Audio Mute Toggle */}
              <div className="flex items-center gap-2">
                {/* Desktop Horizontal Fill vs Fit Toggle */}
                <button
                  type="button"
                  onClick={() => setIsFill(!isFill)}
                  aria-label={isFill ? "Switch to centered fit" : "Switch to horizontal fill"}
                  title={isFill ? "Fit entire frame" : "Fill widescreen"}
                  className="hidden md:flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[11px] font-product font-semibold text-white/80 backdrop-blur-md transition-all hover:border-enzolt hover:text-enzolt"
                >
                  {isFill ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  <span>{isFill ? "Fit View" : "Horizontal Fill"}</span>
                </button>

                {/* Audio Mute / Unmute */}
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className={cn(
                    "flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all hover:scale-105 active:scale-95",
                    isMuted
                      ? "border-white/20 bg-black/70 text-white/80 hover:border-enzolt hover:text-enzolt"
                      : "border-enzolt bg-enzolt text-[#080B09] shadow-[0_0_18px_rgba(165,217,46,0.6)] font-bold",
                  )}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

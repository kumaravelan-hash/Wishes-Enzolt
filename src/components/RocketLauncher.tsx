import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Sparkles } from "lucide-react";
import crackerSound from "@/assets/whatsapp-audio-2026-11-07-at-103011-1-mpeg_joUy7ran.mp3";
import { gsap } from "@/lib/gsap";

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  radius: number;
  gravity: number;
  friction: number;
  twinkle: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  seed: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

// Celebration color palettes for the dual cracker bursts
const CRACKER_1_COLORS = [
  "#A5D92E", // Enzolt Electric Lime
  "#B8F34A", // Enzolt Neon Glow
  "#D5A84B", // Metallic Gold
  "#FFFFFF", // Pure Spark White
  "#EAFDC8", // Lime Sparkle
];

const CRACKER_2_COLORS = [
  "#FFC837", // Warm Festive Gold
  "#FF8008", // Saffron Flame
  "#D5A84B", // Metallic Gold
  "#B8F34A", // Electric Lime Accent
  "#FFFFFF", // Diamond White
  "#FFA200", // Deep Amber
];

/**
 * Custom SVG Rocket Graphic with Enzolt Titanium & Lime styling
 */
function RocketIcon({ className = "", size = 22 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Rocket Nose Cone */}
      <path
        d="M12 2C12 2 17 6 17 12V16L12 14.5L7 16V12C7 6 12 2 12 2Z"
        fill="url(#rocketBodyGrad)"
        stroke="#A5D92E"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Porthole Window */}
      <circle cx="12" cy="9" r="2.2" fill="#080B09" stroke="#D5A84B" strokeWidth="1" />
      <circle cx="11.4" cy="8.4" r="0.7" fill="#FFFFFF" />
      {/* Left Fin */}
      <path
        d="M7 13.5L3.5 17C3 17.5 3 18.5 3.5 19L5.5 19.5L7 16"
        fill="#151A17"
        stroke="#A5D92E"
        strokeWidth="1.1"
      />
      {/* Right Fin */}
      <path
        d="M17 13.5L20.5 17C21 17.5 21 18.5 20.5 19L18.5 19.5L17 16"
        fill="#151A17"
        stroke="#A5D92E"
        strokeWidth="1.1"
      />
      {/* Nozzle */}
      <path d="M10 15.5H14L13.2 18H10.8L10 15.5Z" fill="#D5A84B" />

      <defs>
        <linearGradient id="rocketBodyGrad" x1="12" y1="2" x2="12" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.3" stopColor="#E0E6E2" />
          <stop offset="0.75" stopColor="#151A17" />
          <stop offset="1" stopColor="#080B09" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function RocketLauncher() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [isRocketFlying, setIsRocketFlying] = useState(false);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 0, y: 120 });
  const [showCanvas, setShowCanvas] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const rocketDockRef = useRef<HTMLSpanElement>(null);
  const flyingRocketRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Active particle arrays shared across both bursts
  const particlesRef = useRef<Particle[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);

  // Animation and timer tracking refs
  const animFrameRef = useRef<number | null>(null);
  const sound1TimerRef = useRef<number | null>(null);
  const sound2TimerRef = useRef<number | null>(null);
  const masterStopTimerRef = useRef<number | null>(null);

  // Spawns a fireworks cracker explosion at (cx, cy)
  const spawnCrackerBurst = (
    cx: number,
    cy: number,
    palette: string[],
    particleCount = 140,
    shockColor = "#A5D92E",
  ) => {
    // 1. Primary Cracker Particles
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.4 + Math.random() * 8.8;
      const color = palette[Math.floor(Math.random() * palette.length)];

      particlesRef.current.push({
        x: cx,
        y: cy,
        prevX: cx,
        prevY: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        // Decay tuned for ~2.0 - 2.4s of sparkling fireworks
        decay: 0.008 + Math.random() * 0.007,
        color,
        radius: 1.8 + Math.random() * 2.2,
        gravity: 0.085,
        friction: 0.97,
        twinkle: Math.random() * 10,
      });
    }

    // 2. Glittering Sparks
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 4.8;
      sparksRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.01 + Math.random() * 0.009,
        color: Math.random() > 0.4 ? "#FFFFFF" : "#F5D77F",
        size: 1.2 + Math.random() * 1.5,
        seed: Math.random() * 100,
      });
    }

    // 3. Shockwave Optical Ring
    shockwavesRef.current.push({
      x: cx,
      y: cy,
      radius: 4,
      maxRadius: 95,
      alpha: 0.85,
      color: shockColor,
    });
  };

  // Trigger launch sequence
  const handleLaunch = () => {
    if (isLaunching) return;

    const centerX = window.innerWidth / 2;
    const isDesktop = window.innerWidth >= 768;
    const sideSpacing = isDesktop
      ? Math.min(window.innerWidth * 0.25, 270)
      : Math.min(window.innerWidth * 0.32, 130);

    // 1. Accurately measure the Diya Lamp on the Home page relative to #intro
    const diyaEl = document.querySelector("[data-i='diya']");
    const introEl = document.getElementById("intro");
    let lampX = centerX;
    let lampY = window.innerHeight * 0.38;

    if (diyaEl && introEl) {
      const diyaRect = diyaEl.getBoundingClientRect();
      const introRect = introEl.getBoundingClientRect();
      lampX = diyaRect.left - introRect.left + diyaRect.width / 2;
      lampY = diyaRect.top - introRect.top + diyaRect.height * 0.45;
    } else if (diyaEl) {
      const diyaRect = diyaEl.getBoundingClientRect();
      lampX = diyaRect.left + diyaRect.width / 2;
      lampY = diyaRect.top + window.scrollY + diyaRect.height * 0.45;
    }

    // Rocket apex right at the flame of the Diya
    const apexY = Math.max(60, lampY - 15);

    // Rocket ascends 100% DEAD STRAIGHT up the center
    setTargetPos({ x: centerX, y: apexY });
    setIsLaunching(true);
    setIsRocketFlying(true);
    setShowCanvas(true);

    // Clear previous particles
    particlesRef.current = [];
    sparksRef.current = [];
    shockwavesRef.current = [];

    // 1. Play Cracker Audio immediately on tap
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    // 2. Travel smoothly and steadily across all pages from bottom to top (2.60s to sync with Peak 1)
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 2.60,
      ease: "power2.inOut",
    });

    // Clear any previous active timers
    if (sound1TimerRef.current) window.clearTimeout(sound1TimerRef.current);
    if (sound2TimerRef.current) window.clearTimeout(sound2TimerRef.current);
    if (masterStopTimerRef.current) window.clearTimeout(masterStopTimerRef.current);

    // =========================================================================
    // AUDIO-SYNCED EVENT 1: SOUND 1 (Audio Peak 1 at exactly 2.60s)
    // Rocket arrives at apex and BURSTS ON BOTH SIDES OF THE LAMP
    // =========================================================================
    sound1TimerRef.current = window.setTimeout(() => {
      setIsRocketFlying(false);

      // Query current live position of Diya lamp now that scroll is at top
      const liveDiya = document.querySelector("[data-i='diya']");
      let liveLeftX = lampX - sideSpacing;
      let liveRightX = lampX + sideSpacing;
      let liveBurstY = lampY;

      if (liveDiya) {
        const r = liveDiya.getBoundingClientRect();
        const liveCenterX = r.left + r.width / 2;
        liveLeftX = liveCenterX - sideSpacing;
        liveRightX = liveCenterX + sideSpacing;
        liveBurstY = r.top + r.height * 0.45;
      }

      // Cracker 1: Detonates on BOTH SIDES of the lamp (Enzolt Lime & Diamond White)
      spawnCrackerBurst(liveLeftX, liveBurstY, CRACKER_1_COLORS, 140, "#A5D92E");
      spawnCrackerBurst(liveRightX, liveBurstY, CRACKER_1_COLORS, 140, "#B8F34A");
    }, 2600);

    // =========================================================================
    // AUDIO-SYNCED EVENT 2: SOUND 2 (Audio Peak 2 at exactly 3.15s - 550ms later)
    // Second major burst detonates across BOTH SIDES with festive gold & saffron
    // =========================================================================
    sound2TimerRef.current = window.setTimeout(() => {
      const liveDiya = document.querySelector("[data-i='diya']");
      let liveLeftX = lampX - sideSpacing;
      let liveRightX = lampX + sideSpacing;
      let liveBurstY = lampY;

      if (liveDiya) {
        const r = liveDiya.getBoundingClientRect();
        const liveCenterX = r.left + r.width / 2;
        liveLeftX = liveCenterX - sideSpacing;
        liveRightX = liveCenterX + sideSpacing;
        liveBurstY = r.top + r.height * 0.45;
      }

      // Cracker 2: Massive festive burst on BOTH SIDES of the lamp
      spawnCrackerBurst(liveLeftX, liveBurstY - 8, CRACKER_2_COLORS, 150, "#FF8008");
      spawnCrackerBurst(liveRightX, liveBurstY - 8, CRACKER_2_COLORS, 150, "#FFC837");
    }, 3150);

    // =========================================================================
    // MASTER 5.0-SECOND STOP TIMER
    // Stops audio, cleans up canvas, and resets button state
    // =========================================================================
    masterStopTimerRef.current = window.setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setShowCanvas(false);
      setIsLaunching(false);
      setIsRocketFlying(false);

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    }, 5000);
  };

  // GSAP animation for flying rocket in perfect sync with window scroll
  useEffect(() => {
    if (isRocketFlying && flyingRocketRef.current) {
      const startY = window.innerHeight - 70;
      gsap.fromTo(
        flyingRocketRef.current,
        {
          x: targetPos.x - 16,
          y: startY,
          scale: 0.9,
          opacity: 1,
        },
        {
          x: targetPos.x - 16,
          y: targetPos.y,
          scale: 1.25,
          duration: 2.60,
          ease: "power2.inOut",
        }
      );
    }
  }, [isRocketFlying, targetPos]);

  // High-performance 60FPS Lag-Free Dual Cracker Canvas Simulation
  useEffect(() => {
    if (!showCanvas) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Cap DPR to 2 to eliminate Retina CPU overhead
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    let isRunning = true;
    let frameCount = 0;

    const render = () => {
      if (!isRunning) return;
      frameCount++;

      const particles = particlesRef.current;
      const sparks = sparksRef.current;
      const shockwaves = shockwavesRef.current;

      // While rocket is ascending, spawn sparkling golden exhaust trail from its nozzle
      if (isRocketFlying && flyingRocketRef.current) {
        const r = flyingRocketRef.current.getBoundingClientRect();
        if (r.top > 0 && r.top < window.innerHeight) {
          const exX = r.left + r.width / 2 + (Math.random() - 0.5) * 6;
          const exY = r.bottom - 4;
          for (let k = 0; k < 3; k++) {
            sparks.push({
              x: exX,
              y: exY,
              vx: (Math.random() - 0.5) * 2.2,
              vy: 1.8 + Math.random() * 3.8,
              alpha: 0.95,
              decay: 0.035 + Math.random() * 0.02,
              color: Math.random() > 0.4 ? "#B8F34A" : "#FFC837",
              size: 1.4 + Math.random() * 1.5,
              seed: Math.random() * 50,
            });
          }
        }
      }

      // Smooth motion streak fade (NO expensive blur filters)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Additive blending: creates intense sparkling light where sparks overlap
      ctx.globalCompositeOperation = "lighter";

      // 1. Draw Shockwave Expanding Rings
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 3.8;
        sw.alpha -= 0.045;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = sw.alpha;
        ctx.stroke();
      }

      // 2. Draw Primary Cracker Particles (both spark bursts simultaneously)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.prevX = p.x;
        p.prevY = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Motion streak trail
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.radius * 0.9;
        ctx.globalAlpha = p.alpha * 0.6;
        ctx.stroke();

        // Soft glowing halo (fast 2-pass circle instead of shadowBlur)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.22;
        ctx.fill();

        // Bright sparkling particle head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      // 3. Draw Glitter & Twinkling Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.04;
        s.vx *= 0.98;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        // Festive twinkling shimmer
        const twinkleAlpha = s.alpha * (Math.sin(frameCount * 0.35 + s.seed) > 0 ? 1 : 0.25);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = twinkleAlpha;
        ctx.fill();
      }

      if (isRunning) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [showCanvas]);

  // Cleanup timers and audio on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (sound1TimerRef.current) window.clearTimeout(sound1TimerRef.current);
      if (sound2TimerRef.current) window.clearTimeout(sound2TimerRef.current);
      if (masterStopTimerRef.current) window.clearTimeout(masterStopTimerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <>
      {/* Hidden audio element for cracker sound (first 5 seconds) */}
      <audio
        ref={audioRef}
        src={crackerSound}
        preload="auto"
        aria-hidden="true"
      />

      {/* Docked Rocket & Tap to Fire Button - Centered in Footer */}
      <div className="flex flex-col items-center justify-center text-center">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleLaunch}
          disabled={isLaunching}
          aria-label="Tap to fire festive rocket"
          className={`group relative inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 transition-all duration-300 font-display text-xs font-bold tracking-[0.2em] uppercase ${
            isLaunching
              ? "cursor-not-allowed border-enzolt/40 bg-[#151A17] text-enzolt/70 opacity-90 shadow-[0_0_25px_rgba(165,217,46,0.2)]"
              : "border-enzolt/40 bg-[#151A17] text-white hover:border-enzolt hover:bg-enzolt/10 hover:text-enzolt hover:shadow-[0_0_28px_rgba(165,217,46,0.45)] hover:scale-105 active:scale-95"
          }`}
        >
          {/* Docked Rocket Icon */}
          <span
            ref={rocketDockRef}
            className={`relative flex items-center justify-center transition-opacity duration-200 ${
              isLaunching ? "opacity-0" : "opacity-100 group-hover:-translate-y-0.5 transition-transform"
            }`}
          >
            <RocketIcon size={20} />
          </span>

          {/* Button Label */}
          <span>{isLaunching ? "ROCKET LAUNCHED" : "TAP TO FIRE"}</span>

          {/* Pulsing Sparkle indicator */}
          <Sparkles
            size={14}
            className={`transition-colors ${
              isLaunching ? "text-enzolt animate-spin" : "text-gold group-hover:text-enzolt"
            }`}
          />

          {/* Subtle launch pad ignition glow when ready */}
          {!isLaunching && (
            <span
              className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle, rgba(165,217,46,0.35) 0%, rgba(213,168,75,0.15) 60%, transparent 80%)",
              }}
            />
          )}
        </button>
      </div>

      {/* Airborne Rocket Flight (Rendered in Body Portal for true cross-viewport trajectory) */}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            {isRocketFlying && (
              <div
                ref={flyingRocketRef}
                className="pointer-events-none fixed z-[99999] flex flex-col items-center will-change-transform"
                style={{
                  left: 0,
                  top: 0,
                  transform: `translate3d(${targetPos.x - 16}px, ${window.innerHeight - 70}px, 0)`,
                }}
              >
                {/* Rocket Vessel */}
                <div className="relative">
                  <RocketIcon size={32} />
                </div>

                {/* Rocket Fire Jet & Exhaust Flames */}
                <div className="relative -mt-1 flex flex-col items-center">
                  {/* Core White Hot Flame */}
                  <div
                    className="h-10 w-3 rounded-full animate-pulse"
                    style={{
                      background:
                        "linear-gradient(180deg, #FFFFFF 0%, #B8F34A 35%, #A5D92E 70%, rgba(213,168,75,0.2) 100%)",
                      boxShadow:
                        "0 0 20px 5px rgba(184,243,74,0.95), 0 0 45px 12px rgba(165,217,46,0.7)",
                      filter: "blur(0.5px)",
                    }}
                  />

                  {/* Outer Golden Flame Flicker */}
                  <div
                    className="absolute -top-1 h-14 w-5 rounded-full opacity-80 animate-ping"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 20%, #A5D92E 0%, #D5A84B 60%, transparent 100%)",
                      filter: "blur(2px)",
                    }}
                  />

                  {/* Golden Spark Trail */}
                  <div className="pointer-events-none mt-1 flex flex-col items-center gap-1.5 opacity-80">
                    <span className="h-3 w-3 rounded-full bg-[#B8F34A] blur-[1px] animate-ping" />
                    <span className="h-4 w-4 rounded-full bg-[#D5A84B] blur-[2px]" />
                    <span className="h-5 w-5 rounded-full bg-[#FF8008] blur-[3px]" />
                  </div>
                </div>
              </div>
            )}

            {/* Canvas Fireworks Dual Particle Explosion in Home Page Sky */}
            {showCanvas && (
              <canvas
                ref={canvasRef}
                className="pointer-events-none fixed inset-0 z-[999999] h-full w-full"
              />
            )}
          </>,
          document.body,
        )}
    </>
  );
}

import { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface DiyaProps {
  className?: string;
  /** overall width in px (height scales automatically) */
  size?: number;
  /** show the large ambient glow halo */
  halo?: boolean;
  /** show animated light rays behind the flame */
  rays?: boolean;
  flameScale?: number;
}

/**
 * A precision vector diya engineered for Enzolt Energy:
 * Metallic gold brass bowl with subtle dark industrial contours,
 * layered realistic flickering flame seated directly in the oil spout, and ambient illumination.
 */
const Diya = forwardRef<HTMLDivElement, DiyaProps>(function Diya(
  { className, size = 220, halo = true, rays = false, flameScale = 1 },
  ref,
) {
  const h = size * 0.62;
  const flameW = size * 0.16 * flameScale;
  const flameH = size * 0.35 * flameScale;

  // The spout apex is located at y=36 of the 136px SVG height
  const spoutY = flameH + (h * 36) / 136;
  // Center of the flame for aligning halo & rays
  const flameCenterY = spoutY - flameH * 0.52;

  return (
    <div
      ref={ref}
      className={cn("relative select-none", className)}
      style={{ width: size, height: h + flameH }}
      aria-hidden="true"
    >
      {/* Ambient warm aura + subtle green energy rim glow centered on flame */}
      {halo && (
        <>
          <div
            className="flame-glow"
            style={{
              width: size * 2.8,
              height: size * 2.8,
              top: flameCenterY,
              background:
                "radial-gradient(circle, rgba(234,211,156,0.32) 0%, rgba(213,168,75,0.16) 24%, rgba(165,217,46,0.04) 45%, rgba(8,11,9,0) 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full green-aura"
            style={{
              top: flameCenterY - size * 0.05,
              width: size * 1.6,
              height: size * 1.6,
              background:
                "radial-gradient(circle, rgba(165,217,46,0.08) 0%, rgba(165,217,46,0) 65%)",
            }}
          />
        </>
      )}

      {/* Rotating light rays centered on the flame */}
      {rays && (
        <div
          className="rays absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 ray-pulse"
          style={{
            width: size * 3.2,
            height: size * 3.2,
            marginTop: flameCenterY,
            background:
              "repeating-conic-gradient(from 0deg, rgba(234,211,156,0.09) 0deg 3.5deg, rgba(0,0,0,0) 3.5deg 15deg)",
            maskImage: "radial-gradient(circle, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 62%)",
            WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 62%)",
            borderRadius: "50%",
          }}
        />
      )}

      {/* Flame stack anchored directly onto the wick in the bowl spout */}
      <div
        className="absolute left-1/2"
        style={{ top: spoutY, width: 0, height: 0 }}
      >
        {/* Outer soft ambient flame glow */}
        <div
          className="flame"
          style={{
            width: flameW * 2.7,
            height: flameH * 1.35,
            marginBottom: -flameH * 0.12,
            borderRadius: "50% 50% 45% 45% / 60% 60% 40% 40%",
            background:
              "radial-gradient(ellipse at 50% 70%, rgba(234,211,156,0.48) 0%, rgba(213,168,75,0.24) 38%, rgba(8,11,9,0) 72%)",
            filter: "blur(6px)",
            animationDuration: "3.6s, 2s",
          }}
        />

        {/* Main flame body with golden graduation */}
        <div
          className="flame"
          style={{
            width: flameW,
            height: flameH,
            borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.0) 0%, #FFFFFF 15%, #EAD39C 38%, #D5A84B 68%, rgba(180,120,40,0.95) 100%)",
            boxShadow:
              "0 0 20px 5px rgba(234,211,156,0.6), 0 0 45px 12px rgba(213,168,75,0.35)",
          }}
        />

        {/* Inner intense white-hot core */}
        <div
          className="flame"
          style={{
            width: flameW * 0.44,
            height: flameH * 0.52,
            marginBottom: flameH * 0.02,
            borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
            background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 30%, #FFF8EA 100%)",
            animationDuration: "2.7s, 1.2s",
            opacity: 0.98,
          }}
        />

        {/* Flame base ember */}
        <div
          className="flame"
          style={{
            width: flameW * 0.7,
            height: flameH * 0.18,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(213,168,75,0.9) 0%, rgba(165,217,46,0.2) 60%, rgba(8,11,9,0) 80%)",
            animationDuration: "3s, 1.8s",
          }}
        />
      </div>

      {/* Wick emerging directly from the spout */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#1e1710]"
        style={{
          top: spoutY - size * 0.022,
          width: Math.max(2.5, size * 0.014),
          height: size * 0.04,
        }}
      />

      {/* Precision Metallic Brass Bowl with Enzolt Luxury Finish */}
      <svg
        viewBox="0 0 220 136"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: h }}
        fill="none"
      >
        <defs>
          <linearGradient id="diyaBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3E2C14" />
            <stop offset="25%" stopColor="#8C6627" />
            <stop offset="50%" stopColor="#EAD39C" />
            <stop offset="70%" stopColor="#D5A84B" />
            <stop offset="100%" stopColor="#251B0D" />
          </linearGradient>
          <linearGradient id="diyaInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EAD39C" />
            <stop offset="100%" stopColor="#6C4D1C" />
          </linearGradient>
          <linearGradient id="diyaBase" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A1C0B" />
            <stop offset="50%" stopColor="#D5A84B" />
            <stop offset="100%" stopColor="#2A1C0B" />
          </linearGradient>
          <radialGradient id="diyaShadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#D5A84B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D5A84B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Floor glow */}
        <ellipse cx="110" cy="126" rx="105" ry="10" fill="url(#diyaShadow)" />

        {/* Base */}
        <path d="M78 112 h64 l6 12 h-76 z" fill="url(#diyaBase)" />
        <ellipse cx="110" cy="112" rx="34" ry="5" fill="#5C4217" />

        {/* Bowl */}
        <path
          d="M6 46 C 6 46, 30 110, 110 110 C 190 110, 214 46, 214 46 C 214 46, 180 60, 110 60 C 40 60, 6 46, 6 46 Z"
          fill="url(#diyaBody)"
        />

        {/* Inner lip + oil */}
        <path
          d="M14 48 C 40 60, 70 64, 110 64 C 150 64, 180 60, 206 48 C 190 40, 150 36, 110 36 C 70 36, 30 40, 14 48 Z"
          fill="url(#diyaInner)"
        />
        <path
          d="M30 48 C 55 56, 80 58, 110 58 C 140 58, 165 56, 190 48 C 170 44, 140 42, 110 42 C 80 42, 50 44, 30 48 Z"
          fill="#EAD39C"
          opacity="0.75"
        />

        {/* Spout highlight */}
        <path d="M100 40 L110 30 L120 40 Z" fill="#FFFFFF" opacity="0.9" />

        {/* Rim specular highlight */}
        <path
          d="M14 48 C 40 60, 70 64, 110 64 C 150 64, 180 60, 206 48"
          stroke="#FFFFFF"
          strokeOpacity="0.6"
          strokeWidth="1.2"
        />

        {/* Clean futuristic engraved lines */}
        <path
          d="M40 78 q 10 -8 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0"
          stroke="#EAD39C"
          strokeOpacity="0.25"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M52 92 q 10 -8 20 0 t 20 0 t 20 0 t 20 0 t 20 0"
          stroke="#EAD39C"
          strokeOpacity="0.18"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
});

export default Diya;

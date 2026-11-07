import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withWordmark?: boolean;
}

/**
 * Enzolt Energy brand mark — using official festive logo asset
 * /Enzoltlogodiwali.png with optional Enzolt Energy typography.
 */
export default function Logo({ className, size = "md", withWordmark = true }: LogoProps) {
  const dims = { sm: 34, md: 44, lg: 54 }[size];
  const text = { sm: "text-[13px]", md: "text-[16px]", lg: "text-[22px]" }[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <img
        src="/Enzoltlogodiwali.png"
        alt="Enzolt Energy Logo"
        width={dims}
        height={dims}
        loading="eager"
        decoding="sync"
        className="shrink-0 rounded-full object-contain blend-screen transition-transform duration-300 group-hover:scale-105"
        style={{ width: dims, height: dims }}
      />

      {withWordmark && (
        <span className={cn("font-display font-extrabold tracking-[0.32em] text-white leading-none", text)}>
          ENZOLT
          <span className="ml-1.5 font-bold tracking-[0.28em] text-enzolt">ENERGY</span>
        </span>
      )}
    </span>
  );
}

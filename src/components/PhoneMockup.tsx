import {
  Activity,
  Bell,
  BatteryCharging,
  ChevronRight,
  Headphones,
  House,
  MessageCircle,
  Phone,
  Plug,
  Sparkles,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/utils/cn";

export type AppScreen = "dashboard" | "power" | "cycles" | "updates" | "support" | "remote";

interface PhoneMockupProps {
  screen: AppScreen;
  className?: string;
}

/**
 * Conceptual visual representation of the UNICORE 1500 companion app.
 * Redesigned with Enzolt Energy's dark industrial aesthetic & electric lime accents.
 */
export default function PhoneMockup({ screen, className }: PhoneMockupProps) {
  return (
    <div className={cn("relative mx-auto w-[265px] sm:w-[295px] md:w-[310px]", className)}>
      {/* Ambient Electric Green & Gold Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(165,217,46,0.18) 0%, rgba(213,168,75,0.06) 38%, rgba(8,11,9,0) 70%)",
        }}
      />

      {/* Device frame (Obsidian & Titanium finish) */}
      <div
        className="relative aspect-[9/19.2] w-full rounded-[2.8rem] p-[7px]"
        style={{
          background: "linear-gradient(160deg, #2D332F 0%, #151A17 35%, #080B09 65%, #1F2622 100%)",
          boxShadow:
            "0 0 0 1px rgba(165,217,46,0.22), 0 40px 80px -30px rgba(0,0,0,0.95), 0 0 50px -15px rgba(165,217,46,0.25)",
        }}
      >
        {/* Side physical button accents */}
        <span className="absolute -left-[2px] top-[18%] h-10 w-[2px] rounded-full bg-[#353D38]" />
        <span className="absolute -left-[2px] top-[29%] h-14 w-[2px] rounded-full bg-[#353D38]" />
        <span className="absolute -right-[2px] top-[24%] h-16 w-[2px] rounded-full bg-[#353D38]" />

        {/* OLED Screen */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.4rem] bg-[#080B09] text-white">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-[#000000] border border-white/[0.06]" />

          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3.5 font-body text-[10px] font-medium text-white/80">
            <span>9:41</span>
            <span className="flex items-center gap-1.5">
              <Wifi size={11} className="text-white/80" />
              <span className="inline-block h-[9px] w-[17px] rounded-[3px] border border-white/60 p-[1px]">
                <span className="block h-full w-[78%] rounded-[1px] bg-enzolt" />
              </span>
            </span>
          </div>

          {/* App header */}
          <div className="mt-4 flex items-center justify-between px-5">
            <div>
              <p className="font-product text-[9px] font-bold uppercase tracking-[0.28em] text-enzolt">ENZOLT</p>
              <p className="font-product text-[13px] font-bold tracking-wide">UNICORE 1500</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-enzolt/30 bg-enzolt/10 px-2.5 py-[3px] font-body text-[8px] font-medium uppercase tracking-[0.2em] text-enzolt">
              <span className="h-1.5 w-1.5 rounded-full bg-enzolt animate-pulse" /> Connected
            </span>
          </div>

          {/* Screen content viewports */}
          <div className="relative flex-1 overflow-hidden">
            <Screen name="dashboard" active={screen === "dashboard"}>
              <Dashboard />
            </Screen>
            <Screen name="power" active={screen === "power"}>
              <PowerScreen />
            </Screen>
            <Screen name="cycles" active={screen === "cycles"}>
              <CyclesScreen />
            </Screen>
            <Screen name="updates" active={screen === "updates"}>
              <UpdatesScreen />
            </Screen>
            <Screen name="support" active={screen === "support"}>
              <SupportScreen />
            </Screen>
            <Screen name="remote" active={screen === "remote"}>
              <RemoteScreen />
            </Screen>
          </div>

          {/* Bottom navigation tab bar */}
          <div className="mx-3 mb-3 flex items-center justify-around rounded-2xl border border-white/[0.08] bg-[#151A17]/90 px-2 py-2 backdrop-blur-md">
            {[
              { icon: House, key: "dashboard" },
              { icon: Activity, key: "cycles" },
              { icon: Bell, key: "updates" },
              { icon: Headphones, key: "support" },
            ].map(({ icon: Icon, key }) => (
              <span
                key={key}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300",
                  screen === key || (key === "dashboard" && (screen === "power" || screen === "remote"))
                    ? "bg-enzolt/20 text-enzolt shadow-[0_0_10px_rgba(165,217,46,0.3)]"
                    : "text-white/40",
                )}
              >
                <Icon size={14} strokeWidth={2} />
              </span>
            ))}
          </div>
          <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-white/20" />
        </div>
      </div>

      <p className="mt-4 text-center font-body text-[9px] uppercase tracking-[0.25em] text-white/35">
        Enzolt Smart OS · Companion App
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Screen({ name, active, children }: { name: string; active: boolean; children: React.ReactNode }) {
  return (
    <div
      data-screen={name}
      aria-hidden={!active}
      className={cn(
        "absolute inset-0 px-4 pt-3 transition-all duration-500 ease-out",
        active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      {children}
    </div>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.07] bg-[#151A17]/85 p-3.5 shadow-[0_10px_20px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-product text-[8px] font-semibold uppercase tracking-[0.22em] text-mist">{children}</p>;
}

function ChargeRing({ pct = 78 }: { pct?: number }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto h-[116px] w-[116px]">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke="url(#ringEnzolt)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          className="charge-arc"
          style={{ strokeDasharray: c, strokeDashoffset: c * (1 - pct / 100) }}
        />
        <defs>
          <linearGradient id="ringEnzolt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A5D92E" />
            <stop offset="60%" stopColor="#B8F34A" />
            <stop offset="100%" stopColor="#D5A84B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-product text-[26px] font-bold leading-none text-white">{pct}%</span>
        <span className="mt-1 flex items-center gap-1 font-body text-[8px] font-semibold uppercase tracking-[0.16em] text-enzolt">
          <BatteryCharging size={10} /> Fast Charging
        </span>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex flex-col gap-2.5">
      <Card className="pb-2 pt-3 border-enzolt/20">
        <Label>Battery Core Status</Label>
        <ChargeRing />
      </Card>
      <div className="grid grid-cols-2 gap-2.5">
        <Card>
          <Label>Grid Power</Label>
          <p className="mt-1.5 flex items-center gap-1.5 font-product text-[12px] font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-enzolt shadow-[0_0_6px_#A5D92E]" /> Active
          </p>
        </Card>
        <Card>
          <Label>Eco Mode</Label>
          <p className="mt-1.5 flex items-center gap-1.5 font-product text-[12px] font-semibold text-white">
            <Zap size={12} className="text-enzolt" /> Smart
          </p>
        </Card>
      </div>
      <Card className="flex items-center justify-between">
        <div>
          <Label>Health & Cycles</Label>
          <p className="mt-1 font-product text-[12px] font-semibold text-white">Optimal Condition</p>
        </div>
        <ChevronRight size={14} className="text-enzolt" />
      </Card>
    </div>
  );
}

function PowerScreen() {
  return (
    <div className="flex flex-col gap-2.5">
      <Card className="border-enzolt/20">
        <Label>Power Interruption Guard</Label>
        <div className="mt-2.5 flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-enzolt/15 text-enzolt">
            <Plug size={16} />
            <span className="ring-pulse absolute inset-0 rounded-full border border-enzolt/50" />
          </span>
          <div>
            <p className="font-product text-[12px] font-semibold text-white">Mains Online</p>
            <p className="font-body text-[9px] text-mist">Automatic zero-ms switchover ready</p>
          </div>
        </div>
      </Card>
      <Card>
        <Label>Recent Timeline</Label>
        <ul className="mt-2 space-y-2">
          {[
            ["Power interruption", "Zero-ms Backup active"],
            ["Mains restored", "Smart recharge initiated"],
            ["Voltage spike absorbed", "Grid stabilized"],
          ].map(([a, b], i) => (
            <li key={i} className="flex items-center justify-between border-b border-white/[0.06] pb-2 last:border-0 last:pb-0">
              <span className="font-body text-[9.5px] text-white/85">{a}</span>
              <span className="font-product text-[8px] font-semibold uppercase tracking-[0.14em] text-enzolt">{b}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function CyclesScreen() {
  const bars = [38, 52, 44, 75, 58, 66, 48];
  return (
    <div className="flex flex-col gap-2.5">
      <Card>
        <Label>Weekly Energy Consumption</Label>
        <div className="mt-3 flex h-[82px] items-end justify-between gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h}%`,
                background:
                  i === 3
                    ? "linear-gradient(180deg, #A5D92E, #151A17)"
                    : "linear-gradient(180deg, rgba(165,217,46,0.4), rgba(21,26,23,0.3))",
              }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between font-product text-[8px] text-mist">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-2.5">
        <Card>
          <Label>Cycle Count</Label>
          <p className="mt-1.5 font-product text-[12px] font-semibold text-white">412 Cycles</p>
        </Card>
        <Card>
          <Label>Battery Health</Label>
          <p className="mt-1.5 flex items-center gap-1 font-product text-[12px] font-semibold text-enzolt">
            <Sparkles size={12} className="text-gold" /> 98.4%
          </p>
        </Card>
      </div>
    </div>
  );
}

function UpdatesScreen() {
  return (
    <div className="flex flex-col gap-2.5">
      <Card className="border-enzolt/30 bg-gradient-to-b from-enzolt/15 to-[#151A17]">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-enzolt/20 text-enzolt">
            <Bell size={14} />
          </span>
          <div>
            <p className="font-product text-[8px] font-bold uppercase tracking-[0.25em] text-enzolt">Special Update</p>
            <p className="mt-1 font-product text-[12px] font-bold leading-snug text-white">
              Happy Diwali from Enzolt ✨
            </p>
            <p className="mt-1 font-body text-[9px] leading-relaxed text-mist">
              Wishing you a bright, safe, and joyously powered festive celebration.
            </p>
          </div>
        </div>
      </Card>
      {[
        ["Firmware v2.4", "Optimized LiFePO4 charging curve"],
        ["Cloud Sync", "Telemetry updates active"],
      ].map(([t, s], i) => (
        <Card key={i} className="flex items-center justify-between">
          <div>
            <Label>{t}</Label>
            <p className="mt-1 font-product text-[11px] font-semibold text-white">{s}</p>
          </div>
          <ChevronRight size={14} className="text-white/40" />
        </Card>
      ))}
    </div>
  );
}

function SupportScreen() {
  return (
    <div className="flex flex-col gap-2.5">
      <Card>
        <Label>Customer Concierge</Label>
        <p className="mt-1.5 font-product text-[12px] font-semibold text-white">Priority Assistance</p>
        <p className="mt-1 font-body text-[9px] text-mist">Enzolt engineers are ready 24/7 during festive hours.</p>
      </Card>
      <div className="grid grid-cols-2 gap-2.5">
        <Card className="flex flex-col items-center py-3.5 text-center transition-colors hover:border-enzolt/40">
          <MessageCircle size={18} className="text-enzolt" />
          <span className="mt-1.5 font-product text-[9px] font-semibold uppercase tracking-[0.2em] text-white">Chat</span>
        </Card>
        <Card className="flex flex-col items-center py-3.5 text-center transition-colors hover:border-enzolt/40">
          <Phone size={18} className="text-enzolt" />
          <span className="mt-1.5 font-product text-[9px] font-semibold uppercase tracking-[0.2em] text-white">Call</span>
        </Card>
      </div>
      <Card className="flex items-center gap-3">
        <span className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-enzolt to-brand-glow p-[1px]">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#151A17] font-product text-[10px] font-bold text-enzolt">EZ</span>
        </span>
        <div className="flex-1">
          <p className="font-product text-[11px] font-semibold text-white">Enzolt Care</p>
          <p className="font-body text-[9px] text-mist">All systems operating within nominal limits.</p>
        </div>
      </Card>
    </div>
  );
}

function RemoteScreen() {
  return (
    <div className="flex flex-col gap-2.5">
      <Card className="flex flex-col items-center py-5 text-center border-enzolt/20">
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-enzolt/15 text-enzolt">
          <Wifi size={22} />
          <span className="ring-pulse absolute inset-0 rounded-full border border-enzolt/40" />
        </span>
        <p className="mt-2.5 font-product text-[12px] font-semibold text-white">Secure Global Link</p>
        <p className="mt-1 font-body text-[9px] text-mist">Your UNICORE 1500 is synchronised to the cloud.</p>
      </Card>
      <div className="grid grid-cols-2 gap-2.5">
        <Card>
          <Label>Battery</Label>
          <p className="mt-1 font-product text-[12px] font-semibold text-enzolt">78% · Stable</p>
        </Card>
        <Card>
          <Label>Grid Link</Label>
          <p className="mt-1 font-product text-[12px] font-semibold text-white">Online · 230V</p>
        </Card>
      </div>
    </div>
  );
}

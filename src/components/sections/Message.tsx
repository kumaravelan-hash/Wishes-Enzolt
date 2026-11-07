import Diya from "@/components/Diya";
import Logo from "@/components/Logo";
import Particles from "@/components/Particles";
import Reveal from "@/components/Reveal";

export default function Message() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#080B09] py-28 md:py-36"
      aria-labelledby="message-title"
    >
      <Particles density={0.18} intensity={0.95} maxCount={95} />

      {/* Dual ambient ground glow: Warm gold festival radiance + subtle Enzolt green energy */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
        style={{
          background:
            "radial-gradient(65% 65% at 50% 100%, rgba(213,168,75,0.16) 0%, rgba(165,217,46,0.08) 35%, rgba(8,11,9,0) 75%)",
        }}
      />

      {/* Row of glowing diyas along the bottom with realistic flame flickers */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center gap-10 px-6 opacity-95 sm:gap-20 md:gap-32">
        <Diya size={78} halo={false} className="hidden sm:block translate-y-2 opacity-75" />
        <Diya size={118} halo className="translate-y-3" />
        <Diya size={78} halo={false} className="hidden sm:block translate-y-2 opacity-75" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <Reveal stagger={0.14} className="flex flex-col items-center">
          <Logo size="md" className="mb-8" />

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A5D92E]/25 bg-[#151A17]/80 px-4 py-1.5 shadow-[0_0_15px_-4px_rgba(165,217,46,0.2)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-enzolt animate-pulse" />
            <span className="font-product text-[10px] font-semibold tracking-[0.3em] uppercase text-enzolt">
              A Festive Diwali Message
            </span>
          </div>

          <h2
            id="message-title"
            className="font-display text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            EVERY LIGHT MARKS
            <br />
            <span className="text-green-gradient">A NEW BEGINNING.</span>
          </h2>

          <p className="mt-7 max-w-2xl font-body text-base leading-relaxed text-mist md:text-lg">
            This Diwali, we celebrate the transformative power of clean innovation, the relentless spirit of human progress, and the boundless possibilities of an electrified, intelligent tomorrow.
          </p>

          <div className="hairline my-10 w-44" />

          <p className="font-product text-sm font-bold tracking-[0.5em] text-gold uppercase md:text-base">
            HAPPY DIWALI
          </p>
          <p className="mt-4 font-display text-base tracking-wide text-white/80 md:text-lg">
            With warmest festive wishes & gratitude,
          </p>
          <p className="mt-1.5 font-product text-xs font-bold tracking-[0.4em] text-enzolt uppercase">
            TEAM ENZOLT ENERGY
          </p>
        </Reveal>
      </div>
    </section>
  );
}

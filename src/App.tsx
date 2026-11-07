import { lazy, Suspense, useEffect } from "react";
import Nav from "@/components/Nav";
import Intro from "@/components/sections/Intro";
import Greeting from "@/components/sections/Greeting";
import Transition from "@/components/sections/Transition";
import ProductReveal from "@/components/sections/ProductReveal";
import { ScrollTrigger } from "@/lib/gsap";

// Below-the-fold sections are code-split so the opening paints fast.
const SmartApp = lazy(() => import("@/components/sections/SmartApp"));
const Experience = lazy(() => import("@/components/sections/Experience"));
const Message = lazy(() => import("@/components/sections/Message"));
const Footer = lazy(() => import("@/components/sections/Footer"));

function SectionFallback() {
  return <div className="min-h-[60vh] bg-[#080B09]" aria-hidden="true" />;
}

export default function App() {
  useEffect(() => {
    // Recalculate pinned sections once fonts & images have settled.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 1200);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080B09] text-white">
      <a
        href="#unicore"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-enzolt focus:px-4 focus:py-2 focus:text-[#080B09] focus:font-semibold focus:shadow-[0_0_20px_#A5D92E]"
      >
        Skip to UNICORE 1500
      </a>
      <Nav />
      <main>
        <Intro />
        <Greeting />
        <Transition />
        <ProductReveal />
        <Suspense fallback={<SectionFallback />}>
          <SmartApp />
          <Experience />
          <Message />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { scrollToId } from "@/lib/gsap";
import { cn } from "@/utils/cn";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "wishes", label: "Diwali Wishes" },
  { id: "unicore", label: "UNICORE 1500" },
  { id: "smart", label: "Smart Monitoring" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleActiveSection = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      const smartEl = document.getElementById("smart");
      if (smartEl) {
        const top = smartEl.getBoundingClientRect().top + window.scrollY;
        if (scrollPos >= top) {
          setActive("smart");
          return;
        }
      }

      const unicoreEl = document.getElementById("unicore");
      if (unicoreEl) {
        const top = unicoreEl.getBoundingClientRect().top + window.scrollY;
        if (scrollPos >= top) {
          setActive("unicore");
          return;
        }
      }

      const wishesEl = document.getElementById("wishes");
      if (wishesEl) {
        const top = wishesEl.getBoundingClientRect().top + window.scrollY;
        if (scrollPos >= top) {
          setActive("wishes");
          return;
        }
      }

      setActive("home");
    };

    handleActiveSection();
    window.addEventListener("scroll", handleActiveSection, { passive: true });
    window.addEventListener("resize", handleActiveSection, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleActiveSection);
      window.removeEventListener("resize", handleActiveSection);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8 transition-all duration-500">
          <div
            className={cn(
              "flex w-full items-center justify-between rounded-full px-4 py-2.5 md:px-6 transition-all duration-500",
              scrolled
                ? "glass shadow-[0_12px_40px_-15px_rgba(165,217,46,0.25)] border border-[#A5D92E]/20 bg-[#151A17]/85 backdrop-blur-xl"
                : "border border-transparent bg-transparent",
            )}
          >
            <button
              onClick={() => go("home")}
              aria-label="Enzolt Energy — back to top"
              className="group flex items-center transition-opacity hover:opacity-90"
            >
              <Logo size="sm" />
            </button>

            <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={cn(
                    "relative font-display text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300",
                    active === l.id ? "text-enzolt" : "text-mist hover:text-white",
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-enzolt shadow-[0_0_8px_#A5D92E] transition-all duration-500",
                      active === l.id ? "w-full opacity-100" : "w-0 opacity-0",
                    )}
                  />
                </button>
              ))}

              <a
                href="https://www.enzolt.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="enzolt-btn !px-5 !py-2 !text-[10px]"
              >
                Explore Product
              </a>
            </nav>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-enzolt transition-colors hover:bg-enzolt/10 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-[#080B09]/96 backdrop-blur-2xl transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        {/* Subtle radial green ambient lighting */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 50% at 50% 100%, rgba(165,217,46,0.12) 0%, rgba(213,168,75,0.06) 40%, rgba(8,11,9,0) 75%)",
          }}
        />

        <nav
          aria-label="Mobile"
          className="relative mt-28 flex flex-col items-start gap-4 px-8"
        >
          {LINKS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
              className={cn(
                "font-display text-3xl font-extrabold tracking-tight transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                active === l.id ? "text-enzolt" : "text-white hover:text-enzolt",
              )}
            >
              {l.label}
            </button>
          ))}

          <a
            href="https://www.enzolt.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? "400ms" : "0ms" }}
            className={cn(
              "enzolt-btn mt-6 w-full max-w-xs transition-all duration-500 text-center",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            Explore Product
          </a>
        </nav>

        <div className="relative mt-auto border-t border-white/[0.08] px-8 py-8">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-mist">
            Happy Diwali · Enzolt Energy
          </p>
        </div>
      </div>
    </>
  );
}

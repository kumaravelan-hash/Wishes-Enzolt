import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  /** stagger direct children instead of animating the wrapper */
  stagger?: number;
  once?: boolean;
}

/**
 * Scroll-triggered fade/rise. Honors prefers-reduced-motion via GSAP matchMedia.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  y = 28,
  stagger,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = stagger ? Array.from(el.children) : el;
      gsap.set(targets, { autoAlpha: 0, y });
      const tween = gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        delay,
        stagger: stagger ?? 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [delay, y, stagger, once]);

  const Comp = Tag as ElementType;
  return (
    <Comp ref={ref} className={cn(className)}>
      {children}
    </Comp>
  );
}

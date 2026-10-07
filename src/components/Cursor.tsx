"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const dot = root.current!.querySelector(".c-dot")!;
      const ring = root.current!.querySelector(".c-ring")!;

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

      const dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2" });
      const dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2" });
      const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
      const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

      const move = (e: MouseEvent) => {
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      };
      let hovered = false;
      const over = (e: MouseEvent) => {
        const hit = !!(e.target as HTMLElement).closest(
          "a, button, [data-hover]"
        );
        if (hit === hovered) return;
        hovered = hit;
        gsap.to(ring, {
          scale: hit ? 2.2 : 1,
          borderColor: hit ? "#0ae448" : "rgba(10,228,72,0.6)",
          duration: 0.3,
        });
        gsap.to(dot, { scale: hit ? 0.4 : 1, duration: 0.3 });
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseover", over);
      return () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseover", over);
      };
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block"
    >
      <div className="c-dot absolute h-1.5 w-1.5 rounded-full bg-accent" />
      <div className="c-ring absolute h-9 w-9 rounded-full border border-accent/60" />
    </div>
  );
}

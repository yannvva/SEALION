"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

export default function ClipReveal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".clip-panel",
        { clipPath: "inset(9% 13% 9% 13% round 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            end: "top 15%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".clip-inner",
        { scale: 1.35 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            end: "top 15%",
            scrub: true,
          },
        }
      );

      const split = new SplitText(".clip-title", { type: "chars" });
      gsap.from(split.chars, {
        yPercent: 110,
        stagger: 0.03,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 40%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="py-10">
      <div className="clip-panel relative h-[80vh] overflow-hidden will-change-[clip-path]">
        <div className="clip-inner bg-grid absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-accent/30 via-[#0a2a12] to-black will-change-transform">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/60">
            clip-path + parallaxe interne
          </p>
          <h2 className="clip-title mt-4 overflow-hidden pb-2 text-[clamp(3rem,12vw,10rem)] font-black leading-none tracking-tight">
            IMMERSION
          </h2>
          <p className="mt-4 max-w-md px-6 text-center text-sm text-white/60">
            Le panneau s&apos;ouvre en se recadrant pendant que le contenu
            dézoome — une reveal style awwwards, pilotée par le scroll.
          </p>
        </div>
      </div>
    </section>
  );
}

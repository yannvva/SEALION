"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Preloader({ onReveal }: { onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const num = root.current!.querySelector(".pre-num")!;
      const counter = { v: 0 };

      gsap.to(".pre-label", {
        duration: 1.2,
        scrambleText: {
          text: "INITIALIZING MOTION SYSTEM",
          chars: "01<>/",
        },
      });

      gsap
        .timeline()
        .to(counter, {
          v: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
        .to(
          ".pre-bar-fill",
          { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
          0
        )
        .to(".pre-content", { opacity: 0, y: -30, duration: 0.35 }, "+=0.2")
        .to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onStart: onReveal,
        })
        .set(root.current, { display: "none" });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#070707]"
    >
      <div className="pre-content flex flex-col items-center">
        <p className="pre-label font-mono text-xs tracking-[0.4em] text-accent">
          INITIALIZING MOTION SYSTEM
        </p>
        <p className="pre-num mt-6 font-mono text-8xl font-black tabular-nums md:text-9xl">
          000
        </p>
        <div className="mt-8 h-px w-64 overflow-hidden bg-white/15">
          <div className="pre-bar-fill h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
      <p className="pre-content absolute bottom-8 font-mono text-xs tracking-[0.3em] text-white/30">
        IANSAN®
      </p>
    </div>
  );
}

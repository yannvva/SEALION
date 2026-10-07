"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Decode from "./Decode";

const BLOB_A =
  "M200 60 C270 60 330 120 335 190 C340 260 300 330 210 340 C120 350 65 290 62 210 C59 130 130 60 200 60 Z";
const BLOB_B =
  "M200 50 C240 95 320 90 345 165 C370 240 320 320 235 340 C150 360 70 320 60 235 C50 150 160 10 200 50 Z";

export default function MorphSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to("#blob-a", {
        morphSVG: BLOB_B,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".morph-svg", {
        rotate: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
      gsap.from(".morph-copy", {
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="flex flex-col items-center gap-10 px-6 py-28 md:flex-row md:px-12"
    >
      <div className="relative flex flex-1 items-center justify-center">
        <svg viewBox="0 0 400 400" className="morph-svg w-full max-w-md">
          <defs>
            <linearGradient id="blobGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0ae448" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#046b26" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path id="blob-a" d={BLOB_A} fill="url(#blobGrad)" />
        </svg>
        <p className="pointer-events-none absolute font-mono text-[10px] uppercase tracking-[0.4em] text-black/70">
          MorphSVG
        </p>
      </div>
      <div className="morph-copy flex-1">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          <Decode text="MÉTAMORPHOSE" />
        </p>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">
          <Decode text="N'importe quel tracé devient un autre." />
        </h2>
        <p className="mt-4 max-w-md text-sm text-white/55">
          <span className="text-accent">MorphSVG</span> interpole entre deux
          définitions de tracé complètement différentes — sans correspondance
          de points nécessaire. Un tween, un yoyo infini, plus une rotation
          lente pour le style.
        </p>
      </div>
    </section>
  );
}

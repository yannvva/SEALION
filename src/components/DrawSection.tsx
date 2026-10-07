"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Decode from "./Decode";

const TICKS = 36;

export default function DrawSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scroll = {
        trigger: root.current,
        start: "top 75%",
        end: "bottom 80%",
        scrub: 1,
      };

      gsap.from(".hud-el", {
        drawSVG: "0%",
        stagger: 0.04,
        ease: "none",
        scrollTrigger: scroll,
      });

      gsap.to(".orbit-dot", {
        motionPath: {
          path: "#trajectory",
          align: "#trajectory",
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        scrollTrigger: scroll,
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="vector"
      className="px-6 py-28 md:px-12"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        <Decode text="CHAMP VECTORIEL" />
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
        <Decode text="Les traits se dessinent. L'orbe suit le tracé." />
      </h2>
      <p className="mt-4 max-w-xl text-sm text-white/55">
        <span className="text-accent">DrawSVG</span> trace chaque contour du
        HUD pendant que <span className="text-accent">MotionPath</span> verrouille
        l&apos;orbe sur la trajectoire — les deux liés à votre scroll.
      </p>

      <svg viewBox="0 0 1200 520" className="mx-auto mt-10 w-full max-w-5xl">
        <circle
          className="hud-el"
          cx="600"
          cy="260"
          r="180"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
        />
        <circle
          className="hud-el"
          cx="600"
          cy="260"
          r="120"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
        />
        {Array.from({ length: TICKS }).map((_, i) => (
          <line
            key={i}
            className="hud-el"
            x1="600"
            y1="52"
            x2="600"
            y2={i % 6 === 0 ? "72" : "62"}
            stroke={i % 6 === 0 ? "#0ae448" : "rgba(255,255,255,0.3)"}
            strokeWidth="1.5"
            transform={`rotate(${(360 / TICKS) * i} 600 260)`}
          />
        ))}
        <line
          className="hud-el"
          x1="600"
          y1="40"
          x2="600"
          y2="480"
          stroke="rgba(255,255,255,0.1)"
        />
        <line
          className="hud-el"
          x1="380"
          y1="260"
          x2="820"
          y2="260"
          stroke="rgba(255,255,255,0.1)"
        />
        <path
          id="trajectory"
          className="hud-el"
          d="M 40 260 C 220 60, 380 460, 600 260 S 980 60, 1160 260"
          fill="none"
          stroke="#0ae448"
          strokeWidth="2"
        />
        <circle className="orbit-dot" r="7" fill="#0ae448" />
      </svg>
    </section>
  );
}

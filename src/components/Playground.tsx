"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import { gsap, useGSAP, Draggable } from "@/lib/gsap";
import Decode from "./Decode";

export default function Playground() {
  const root = useRef<HTMLElement>(null);
  const field = useRef<HTMLDivElement>(null);

  const burstRef = useRef<((x: number, y: number) => void) | undefined>(
    undefined
  );

  useGSAP(
    (_, contextSafe) => {
      Draggable.create(".drag-orb", {
        type: "x,y",
        inertia: true,
        bounds: field.current,
        edgeResistance: 0.75,
      });
      burstRef.current = contextSafe?.((x: number, y: number) => {
        const el = field.current!;
        for (let i = 0; i < 22; i++) {
          const p = document.createElement("span");
          const size = gsap.utils.random(3, 8);
          p.className = "pointer-events-none absolute block rounded-full";
          p.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${
            Math.random() > 0.4 ? "#0ae448" : "#fff"
          }`;
          el.appendChild(p);
          gsap.to(p, {
            physics2D: {
              velocity: gsap.utils.random(120, 700),
              angle: gsap.utils.random(0, 360),
              gravity: 1100,
            },
            rotation: gsap.utils.random(-300, 300),
            opacity: 0,
            duration: gsap.utils.random(0.9, 1.7),
            ease: "power1.out",
            onComplete: () => p.remove(),
          });
        }
      });
    },
    { scope: root }
  );

  const burst = (e: ReactMouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".drag-orb")) return;
    const el = field.current!;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    burstRef.current?.(x, y);
  };

  return (
    <section ref={root} id="lab" className="px-6 py-28 md:px-12">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        <Decode text="LABO DE GRAVITÉ" />
      </p>
      <h2 className="mt-4 text-4xl font-bold md:text-5xl">
        <Decode text="Une physique qu'on peut toucher." />
      </h2>
      <p className="mt-4 max-w-xl text-sm text-white/55">
        Cliquez n&apos;importe où pour détoner une explosion{" "}
        <span className="text-accent">Physics2D</span>. Attrapez l&apos;orbe et
        lancez-la — <span className="text-accent">Draggable + Inertia</span>{" "}
        gère l&apos;élan et les rebonds.
      </p>

      <div
        ref={field}
        onClick={burst}
        className="bg-grid relative mt-10 h-[65vh] overflow-hidden rounded-3xl border border-dashed border-white/15"
      >
        <p className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-xs uppercase tracking-[0.4em] text-white/25">
          Cliquez pour détoner
        </p>
        <div
          className="drag-orb absolute left-10 top-10 grid h-24 w-24 select-none place-items-center rounded-full bg-accent font-mono text-[10px] font-bold tracking-widest text-black"
          data-hover
        >
          LANCEZ&nbsp;MOI
        </div>
      </div>
    </section>
  );
}

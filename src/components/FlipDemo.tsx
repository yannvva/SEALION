"use client";

import { useRef, useState } from "react";
import { useGSAP, Flip } from "@/lib/gsap";
import Decode from "./Decode";
import Magnetic from "./Magnetic";

const ITEMS = [
  { n: "01", t: "Vector cores", w: "38%" },
  { n: "02", t: "Neural lattices", w: "62%" },
  { n: "03", t: "Photon meshes", w: "47%" },
  { n: "04", t: "Quantum grids", w: "74%" },
  { n: "05", t: "Plasma fields", w: "55%" },
  { n: "06", t: "Ion matrices", w: "81%" },
];

export default function FlipDemo() {
  const root = useRef<HTMLElement>(null);
  const [grid, setGrid] = useState(true);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);

  const toggle = () => {
    flipState.current = Flip.getState(".flip-item");
    setGrid((g) => !g);
  };

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        duration: 0.9,
        ease: "power3.inOut",
        absolute: true,
        stagger: 0.03,
      });
      flipState.current = null;
    },
    { scope: root, dependencies: [grid] }
  );

  return (
    <section ref={root} className="px-6 py-28 md:px-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            <Decode text="MORPHING DE LAYOUT" />
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            <Decode text="Basculez entre deux mises en page." />
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/55">
            <span className="text-accent">Flip</span> enregistre l&apos;état de
            chaque élément, React change le layout, et GSAP anime la
            différence. Cliquez sur le bouton.
          </p>
        </div>
        <Magnetic>
          <button
            onClick={toggle}
            className="rounded-full bg-accent px-7 py-3 font-mono text-sm font-bold text-black"
          >
            {grid ? "PASSER EN LISTE" : "PASSER EN GRILLE"}
          </button>
        </Magnetic>
      </div>

      <div
        className={
          grid
            ? "mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-3"
            : "mx-auto mt-10 flex max-w-4xl flex-col gap-2"
        }
      >
        {ITEMS.map((item) => (
          <div
            key={item.n}
            data-hover
            className={`flip-item rounded-xl border border-white/10 bg-white/[0.03] px-5 ${
              grid
                ? "flex aspect-[16/10] flex-col justify-between py-5"
                : "flex items-center justify-between py-3"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-white/30">{item.n}</span>
              <span className="font-semibold">{item.t}</span>
            </div>
            <div
              className={`h-1 rounded-full bg-accent ${grid ? "mt-4" : "mt-0"}`}
              style={{ width: item.w }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Decode from "./Decode";

const STACK = [
  {
    title: "Capture",
    desc: "ScrollTrigger épingle le viewport — la carte suivante attend sous la ligne de flottaison.",
    bg: "from-[#111] to-[#1a1a1a]",
  },
  {
    title: "Montée",
    desc: "Chaque carte remonte de yPercent 110 à 0, liée à la position de scroll.",
    bg: "from-[#0d1a10] to-[#12250f]",
  },
  {
    title: "Enfoncement",
    desc: "La carte recouverte réduit et s'assombrit — de la profondeur sans hack de z-index.",
    bg: "from-[#1a140d] to-[#251a0f]",
  },
  {
    title: "Libération",
    desc: "Après la dernière carte, le pin se relâche et la page reprend.",
    bg: "from-[#0d121a] to-[#0f1b25]",
  },
];

export default function CardStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.fromTo(
          card,
          { yPercent: 110 },
          { yPercent: 0, ease: "none", duration: 1 }
        );
        tl.to(
          cards[i - 1],
          { scale: 0.9, filter: "brightness(0.4)", ease: "none", duration: 1 },
          "<"
        );
      });
      // settle segment — the last card is fully in place well before the pin
      // releases, instead of still sliding when the section lets go
      tl.to({}, { duration: 0.45 });
      tl.to(
        ".stack-bar",
        { scaleX: 1, ease: "none", duration: tl.duration() },
        0
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative">
      <div className="flex h-screen flex-col items-center justify-center px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          <Decode text="PILE SUPERPOSÉE" />
        </p>
        <div className="relative mt-8 h-[64vh] w-full max-w-4xl overflow-hidden rounded-3xl">
          {STACK.map((c, i) => (
            <article
              key={c.title}
              data-hover
              className={`stack-card absolute inset-0 flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br ${c.bg} p-8 will-change-transform md:p-10`}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-5xl font-black text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  pin + scrub
                </span>
              </div>
              <div>
                <h3 className="text-4xl font-black text-accent md:text-5xl">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-md text-white/60">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 h-px w-40 overflow-hidden rounded-full bg-white/10">
          <div className="stack-bar h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </section>
  );
}

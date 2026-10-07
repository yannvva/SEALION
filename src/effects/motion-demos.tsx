"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useAnimate,
  animate,
  useMotionTemplate,
} from "motion/react";

/* ---------- MOTION (motion.dev) — alternative React-first à GSAP ---------- */

export function MSpringDemo() {
  return (
    <div className="grid h-full place-items-center">
      <motion.button
        data-hover
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.82, rotate: -3 }}
        transition={{ type: "spring", stiffness: 500, damping: 12 }}
        className="rounded-full border border-accent/50 bg-accent/10 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent"
      >
        spring tap
      </motion.button>
    </div>
  );
}

export function MDragDemo() {
  const frame = useRef<HTMLDivElement>(null);
  return (
    <div ref={frame} className="relative grid h-full place-items-center overflow-hidden">
      <div className="absolute h-32 w-52 rounded-xl border border-dashed border-white/15" />
      <motion.div
        data-hover
        drag
        dragConstraints={frame}
        dragElastic={0.35}
        dragMomentum
        whileDrag={{ scale: 1.08, boxShadow: "0 12px 30px rgba(10,228,72,0.25)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="grid h-14 w-24 cursor-grab place-items-center rounded-xl bg-accent font-mono text-[10px] font-bold text-black active:cursor-grabbing"
      >
        drag me
      </motion.div>
      <p className="pointer-events-none absolute bottom-3 font-mono text-[8px] text-white/30">inertie + élasticité natives</p>
    </div>
  );
}

export function MVariantsDemo() {
  const [k, setK] = useState(0);
  return (
    <div className="grid h-full place-items-center">
      <div className="text-center">
        <motion.ul
          key={k}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="space-y-1.5"
        >
          {["Montée", "Élasticité", "Cascade", "Timing"].map((t) => (
            <motion.li
              key={t}
              variants={{
                hidden: { y: 18, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 350, damping: 22 } },
              }}
              className="rounded-lg border border-white/15 px-5 py-1.5 font-mono text-[10px] text-white/70"
            >
              {t}
            </motion.li>
          ))}
        </motion.ul>
        <button data-hover onClick={() => setK((x) => x + 1)} className="mt-3 rounded-full border border-white/15 px-4 py-1 font-mono text-[9px] text-accent">
          ↻ rejouer
        </button>
      </div>
    </div>
  );
}

export function MPresenceDemo() {
  const [items, setItems] = useState(["Rapport Q3", "Maquettes v2", "Contrat signé"]);
  return (
    <div className="grid h-full place-items-center px-8">
      <div className="w-full space-y-1.5">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t}
              layout
              exit={{ x: -50, opacity: 0, transition: { duration: 0.25 } }}
              className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2"
            >
              <span className="font-mono text-[10px] text-white/65">{t}</span>
              <button data-hover onClick={() => setItems((it) => it.filter((x) => x !== t))} className="font-mono text-[10px] text-[#ff4d6d]">
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <button data-hover onClick={() => setItems(["Rapport Q3", "Maquettes v2", "Contrat signé"])} className="w-full py-2 font-mono text-[9px] text-accent">
            ↺ restaurer
          </button>
        )}
      </div>
    </div>
  );
}

export function MScrollDemo() {
  const sc = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: sc });
  const w = useTransform(scrollYProgress, [0, 1], ["2%", "100%"]);
  return (
    <div className="flex h-full flex-col">
      <div className="h-1 w-full bg-white/10">
        <motion.div className="h-full bg-accent" style={{ width: w }} />
      </div>
      <div ref={sc} className="mini-scroll min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-4">
        {["useScroll()", "container: ref", "scrollYProgress", "→ useTransform", "→ width %"].map((t) => (
          <div key={t} className="grid h-20 place-items-center rounded-xl border border-white/10 font-mono text-[10px] text-white/45">
            {t}
          </div>
        ))}
        <div className="h-10" />
      </div>
    </div>
  );
}

export function MMvColorDemo() {
  const root = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const hue = useTransform(x, [0, 1], [0, 360]);
  const deg = useTransform(hue, (v) => Math.round(v));
  const bg = useMotionTemplate`hsl(${hue} 85% 55%)`;
  return (
    <div
      ref={root}
      data-hover
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
      }}
      className="grid h-full cursor-crosshair place-items-center"
    >
      <div className="text-center">
        <motion.div className="mx-auto h-14 w-14 rounded-2xl" style={{ background: bg }} />
        <motion.p className="mt-3 font-mono text-[10px] tabular-nums text-white/60">
          hsl(<motion.span>{deg}</motion.span>°)
        </motion.p>
      </div>
    </div>
  );
}

export function MLayoutDemo() {
  const [tab, setTab] = useState(1);
  return (
    <div className="grid h-full place-items-center">
      <div className="flex rounded-full border border-white/15 p-1">
        {["Motion", "Spring", "Layout"].map((t, i) => (
          <button
            key={t}
            data-hover
            onClick={() => setTab(i)}
            className={`relative px-4 py-1.5 font-mono text-[10px] ${tab === i ? "text-black" : "text-white/45"}`}
          >
            {tab === i && <motion.span layoutId="m-pill" className="absolute inset-0 rounded-full bg-accent" />}
            <span className="relative z-10">{t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function MInViewDemo() {
  const sc = useRef<HTMLDivElement>(null);
  return (
    <div ref={sc} className="mini-scroll h-full space-y-3 overflow-y-auto px-6 py-4">
      <p className="py-4 text-center font-mono text-[9px] text-white/30">↓ scroll ↓</p>
      {["Bloc A", "Bloc B", "Bloc C", "Bloc D", "Bloc E"].map((t) => (
        <motion.div
          key={t}
          initial={{ opacity: 0, y: 26, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ root: sc, amount: 0.55 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="grid h-16 place-items-center rounded-xl border border-accent/25 bg-accent/[0.06] font-mono text-[10px] text-accent"
        >
          {t}
        </motion.div>
      ))}
      <div className="h-10" />
    </div>
  );
}

export function MSequenceDemo() {
  const [scope, animate] = useAnimate();
  const run = async () => {
    await animate(".m-seq", { x: 90 }, { duration: 0.4, ease: "easeOut" });
    await animate(".m-seq", { rotate: 180, borderRadius: "50%" }, { duration: 0.5, ease: "backOut" });
    await animate(".m-seq", { x: 0 }, { duration: 0.4, ease: "easeInOut" });
    await animate(".m-seq", { rotate: 360, borderRadius: "12%" }, { duration: 0.6, ease: "easeInOut" });
  };
  return (
    <div ref={scope} className="grid h-full place-items-center px-8">
      <div className="w-full">
        <div className="relative h-8 rounded-full border border-white/10">
          <div className="m-seq absolute left-1 top-1 h-6 w-6 rounded-md bg-accent will-change-transform" />
        </div>
        <button data-hover onClick={run} className="mx-auto mt-3 block rounded-full border border-white/15 px-5 py-1.5 font-mono text-[9px] text-accent">
          ▶ séquence await
        </button>
      </div>
    </div>
  );
}

export function MCursorDemo() {
  const root = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 22 });
  const sy = useSpring(my, { stiffness: 300, damping: 22 });
  return (
    <div
      ref={root}
      data-hover
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - 8);
        my.set(e.clientY - r.top - 8);
      }}
      className="relative h-full cursor-crosshair overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute h-4 w-4 rounded-full bg-accent shadow-[0_0_16px_rgba(10,228,72,0.6)]"
        style={{ x: sx, y: sy }}
      />
      <p className="pointer-events-none absolute bottom-3 w-full text-center font-mono text-[8px] text-white/30">
        useSpring({"{ stiffness: 300, damping: 22 }"})
      </p>
    </div>
  );
}

export function MMorphDemo() {
  return (
    <div className="grid h-full place-items-center">
      <motion.div
        animate={{
          borderRadius: ["28% 72% 58% 42% / 48% 42% 58% 52%", "62% 38% 40% 60% / 40% 58% 42% 60%", "28% 72% 58% 42% / 48% 42% 58% 52%"],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="h-20 w-20 bg-gradient-to-br from-accent/70 to-[#4da3ff]/60"
      />
    </div>
  );
}

export function MCounterDemo() {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  return (
    <div className="grid h-full place-items-center">
      <div className="text-center">
        <motion.p className="font-mono text-5xl font-black tabular-nums text-accent">
          {rounded}
        </motion.p>
        <button
          data-hover
          onClick={() => {
            mv.set(0);
            animate(mv, 128, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
          }}
          className="mt-3 rounded-full border border-white/15 px-5 py-1.5 font-mono text-[9px] text-white/60"
        >
          animate(0 → 128)
        </button>
      </div>
    </div>
  );
}

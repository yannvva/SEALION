"use client";

import {
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type UIEvent as ReactUIEvent,
} from "react";
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  SplitText,
  Draggable,
  Flip,
  Observer,
  MotionPathPlugin,
  CustomEase,
  CustomBounce,
  CustomWiggle,
} from "@/lib/gsap";
import Magnetic from "@/components/Magnetic";

export function SplitRevealDemo({ text, params }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const split = new SplitText(".d-split", { type: "chars" });
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.8 })
        .from(split.chars, {
          yPercent: pn(params, "decalage", 120),
          stagger: pn(params, "stagger", 0.05),
          duration: pn(params, "duree", 0.7),
          ease: ps(params, "ease", "power4.out"),
        })
        .to(
          split.chars,
          { yPercent: -120, stagger: 0.03, duration: 0.5, ease: "power3.in" },
          "+=1"
        );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p className="d-split overflow-hidden pb-1 text-4xl font-black tracking-tight">
        {text ?? "REVEAL"}
      </p>
    </div>
  );
}

export function ScrambleDemo({ text, params }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const words = csv(text, "DECODE,CIPHER,SIGNAL,VECTOR");
  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 });
      words.forEach((w) => {
        tl.to(".d-scr", {
          duration: pn(params, "vitesse", 0.9),
          scrambleText: { text: w, chars: "01<>/" },
        }).to({}, { duration: pn(params, "pause", 0.7) });
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p className="d-scr font-mono text-2xl font-bold tracking-[0.3em] text-accent">
        {words[0]}
      </p>
    </div>
  );
}

export function MarqueeDemo({ text, params }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-marq", {
        xPercent: -50,
        repeat: -1,
        duration: pn(params, "duree", 7),
        ease: "none",
      });
    },
    { scope: root }
  );
  const base = csv(text, "motion ✦ gsap");
  const items = Array.from(
    { length: Math.max(8, base.length) },
    (_, i) => base[i % base.length]
  );
  return (
    <div ref={root} className="flex h-full items-center overflow-hidden">
      <div className="d-marq flex w-max whitespace-nowrap will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex">
            {items.map((it, i) => (
              <span
                key={i}
                className="mx-4 font-mono text-sm uppercase tracking-[0.3em] text-white/50"
              >
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MagneticDemo({ params }: DemoProps) {
  return (
    <div className="grid h-full place-items-center">
      <Magnetic strength={pn(params, "force", 0.55)}>
        <div
          data-hover
          className="rounded-full bg-accent px-6 py-3 font-mono text-xs font-bold text-black"
        >
          HOVER ME
        </div>
      </Magnetic>
    </div>
  );
}

export function TiltDemo({ params }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const amp = pn(params, "amplitude", 18);
  const tiltRef = useRef<
    ((e: ReactMouseEvent<HTMLDivElement>) => void) | undefined
  >(undefined);
  const untiltRef = useRef<
    ((e: ReactMouseEvent<HTMLDivElement>) => void) | undefined
  >(undefined);
  useGSAP(
    (_, contextSafe) => {
      tiltRef.current = contextSafe?.(
        (e: ReactMouseEvent<HTMLDivElement>) => {
          const el = e.currentTarget;
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(el, {
            rotateY: nx * amp,
            rotateX: -ny * amp,
            transformPerspective: 700,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      );
      untiltRef.current = contextSafe?.(
        (e: ReactMouseEvent<HTMLDivElement>) => {
          gsap.to(e.currentTarget, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1,0.5)",
          });
        }
      );
    },
    { scope: root }
  );
  const tilt = (e: ReactMouseEvent<HTMLDivElement>) => tiltRef.current?.(e);
  const untilt = (e: ReactMouseEvent<HTMLDivElement>) =>
    untiltRef.current?.(e);
  return (
    <div ref={root} className="grid h-full place-items-center [perspective:700px]">
      <div
        onMouseMove={tilt}
        onMouseLeave={untilt}
        data-hover
        className="grid h-28 w-40 place-items-center rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-transparent font-mono text-xs text-white/60 will-change-transform"
      >
        TILT ME
      </div>
    </div>
  );
}

export function BurstDemo({ params }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const burstRef = useRef<((x: number, y: number) => void) | undefined>(
    undefined
  );

  useGSAP(
    (_, contextSafe) => {
      const count = pn(params, "particules", 16);
      const vel = pn(params, "velocite", 380);
      const grav = pn(params, "gravite", 700);
      burstRef.current = contextSafe?.((x: number, y: number) => {
        const el = root.current!;
        for (let i = 0; i < count; i++) {
          const p = document.createElement("span");
          const size = gsap.utils.random(3, 6);
          p.className = "pointer-events-none absolute block rounded-full";
          p.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${
            Math.random() > 0.4 ? "var(--accent)" : "#fff"
          }`;
          el.appendChild(p);
          gsap.to(p, {
            physics2D: {
              velocity: gsap.utils.random(vel * 0.2, vel),
              angle: gsap.utils.random(0, 360),
              gravity: grav,
            },
            opacity: 0,
            duration: gsap.utils.random(0.7, 1.3),
            ease: "power1.out",
            onComplete: () => p.remove(),
          });
        }
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      data-hover
      onClick={(e) => {
        const r = root.current!.getBoundingClientRect();
        burstRef.current?.(e.clientX - r.left, e.clientY - r.top);
      }}
      className="relative grid h-full place-items-center overflow-hidden"
    >
      <p className="pointer-events-none font-mono text-xs uppercase tracking-[0.3em] text-white/40">
        click to burst
      </p>
    </div>
  );
}

export function DragThrowDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      Draggable.create(".d-orb", {
        type: "x,y",
        inertia: true,
        bounds: root.current,
        edgeResistance: 0.75,
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <div
        className="d-orb absolute left-4 top-4 grid h-14 w-14 select-none place-items-center rounded-full bg-accent font-mono text-[9px] font-bold text-black"
        data-hover
      >
        THROW
      </div>
    </div>
  );
}

export function FlipMiniDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState(true);
  const state = useRef<ReturnType<typeof Flip.getState> | null>(null);

  useGSAP(
    () => {
      if (!state.current) return;
      Flip.from(state.current, {
        duration: 0.7,
        ease: "power3.inOut",
        absolute: true,
        stagger: 0.03,
      });
      state.current = null;
    },
    { scope: root, dependencies: [grid] }
  );

  return (
    <div
      ref={root}
      data-hover
      onClick={() => {
        state.current = Flip.getState(
          root.current!.querySelectorAll(".f-item")
        );
        setGrid((g) => !g);
      }}
      className="flex h-full flex-col items-center justify-center gap-3 p-4"
    >
      <div
        className={
          grid ? "grid w-full grid-cols-2 gap-2" : "flex w-full flex-col gap-2"
        }
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`f-item rounded-lg border border-white/15 bg-white/[0.05] ${
              grid ? "aspect-square" : "h-7"
            }`}
          />
        ))}
      </div>
      <p className="pointer-events-none font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        click to flip
      </p>
    </div>
  );
}

export function CursorFollowDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const dot = root.current!.querySelector(".d-follow")!;
      gsap.set(dot, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3" });
      const move = (e: MouseEvent) => {
        const r = root.current!.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      root.current!.addEventListener("mousemove", move);
      return () => root.current!.removeEventListener("mousemove", move);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative h-full overflow-hidden">
      <div className="d-follow absolute h-5 w-5 rounded-full border border-accent bg-accent/20" />
      <p className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        move inside
      </p>
    </div>
  );
}

export function DrawDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-path",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.4,
          ease: "power2.inOut",
        }
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 200 100" className="w-4/5 text-accent">
        <path
          className="d-path"
          d="M10 50 C 40 10, 60 90, 100 50 S 160 10, 190 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}

export function OrbitDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const path =
        root.current!.querySelector<SVGPathElement>(".d-orbit-path")!;
      gsap.to(".d-orbit-dot", {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
        duration: 4,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 200 120" className="w-4/5 text-accent">
        <path
          className="d-orbit-path"
          d="M 20 60 A 80 40 0 1 1 180 60 A 80 40 0 1 1 20 60 Z"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
        />
        <circle className="d-orbit-dot" cx={0} cy={0} r="6" fill="currentColor" />
      </svg>
    </div>
  );
}

const DEMO_BLOB_A =
  "M100 20 C140 20 170 50 172 90 C174 130 150 172 105 176 C60 180 25 150 24 105 C23 60 60 20 100 20 Z";
const DEMO_BLOB_B =
  "M100 15 C125 35 165 30 176 70 C187 110 165 160 118 172 C71 184 30 160 24 112 C18 64 75 -5 100 15 Z";

export function MorphDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-morph-a", {
        morphSVG: DEMO_BLOB_B,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 200 200" className="w-2/3 text-accent">
        <path className="d-morph-a" d={DEMO_BLOB_A} fill="currentColor" />
      </svg>
    </div>
  );
}

export function StackSimDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".d-stack-card");
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      tl.set(cards, { clearProps: "all" });
      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.fromTo(
          card,
          { yPercent: 120 },
          { yPercent: 0, duration: 0.8, ease: "power2.inOut" }
        );
        tl.to(
          cards[i - 1],
          { scale: 0.85, filter: "brightness(0.5)", duration: 0.8 },
          "<"
        );
      });
      tl.to(cards, { opacity: 0, y: -20, duration: 0.4, stagger: 0.05 }, "+=0.9");
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center p-4">
      <div className="relative h-28 w-40 overflow-hidden rounded-xl">
        {["#141414", "#0f2413", "#241a0f"].map((bg, i) => (
          <div
            key={i}
            className="d-stack-card absolute inset-0 rounded-xl border border-white/15 will-change-transform"
            style={{ background: bg }}
          />
        ))}
      </div>
    </div>
  );
}

export function ClipRevealDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-clip",
        { clipPath: "inset(22% 30% 22% 30% round 14px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.5,
          ease: "power3.inOut",
        }
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center p-4">
      <div className="d-clip relative h-32 w-full overflow-hidden rounded-xl will-change-[clip-path]">
        <div className="bg-grid absolute inset-0 grid place-items-center bg-gradient-to-br from-accent/40 via-[#0a2a12] to-black">
          <span className="font-mono text-xs tracking-[0.3em] text-white/70">
            UNMASK
          </span>
        </div>
      </div>
    </div>
  );
}

export function StaggerWaveDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-dot", {
        scale: 0.2,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "sine.inOut",
        stagger: { each: 0.05, grid: [5, 5], from: "center" },
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="d-dot h-3 w-3 rounded-full bg-accent" />
        ))}
      </div>
    </div>
  );
}

export function CounterDemo({ params }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = root.current!.querySelector(".d-count")!;
      const o = { v: 0 };
      gsap.to(o, {
        v: pn(params, "cible", 100),
        duration: pn(params, "duree", 2),
        repeat: -1,
        repeatDelay: 0.7,
        ease: "power2.inOut",
        onUpdate: () => {
          el.textContent = `${Math.round(o.v)}%`;
        },
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p className="d-count font-mono text-5xl font-black tabular-nums text-accent">
        0%
      </p>
    </div>
  );
}

export function TextFadeDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const split = new SplitText(".d-words", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.15,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.6,
        }
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6 text-center">
      <p className="d-words text-lg font-semibold leading-snug">
        {text ?? "Words lit in sequence, one by one"}
      </p>
    </div>
  );
}

export function ElasticDemo({ params }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const amp = pn(params, "ampleur", 1.2);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!.querySelector(".d-elastic")!;
      const noop = () => {};
      const enter =
        contextSafe?.(() =>
          gsap.to(el, { scale: amp, duration: 0.9, ease: "elastic.out(1,0.3)" })
        ) ?? noop;
      const leave =
        contextSafe?.(() =>
          gsap.to(el, { scale: 1, duration: 0.6, ease: "power3.out" })
        ) ?? noop;
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div
        className="d-elastic grid h-20 w-20 place-items-center rounded-2xl border border-accent/50 bg-accent/10 font-mono text-[10px] text-accent will-change-transform"
        data-hover
      >
        JELLY
      </div>
    </div>
  );
}

export function HorizontalMiniDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-panels", {
        xPercent: -60,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center overflow-hidden">
      <div className="d-panels flex w-max gap-3 px-4 will-change-transform">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid h-24 w-32 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/[0.04] font-mono text-xs text-white/50"
          >
            PANEL {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScrollToDemo() {
  const root = useRef<HTMLDivElement>(null);
  const jumpRef = useRef<(() => void) | undefined>(undefined);
  useGSAP(
    (_, contextSafe) => {
      jumpRef.current = contextSafe?.(() => {
        const scroller = root.current!.querySelector(".d-scroll")!;
        const target =
          root.current!.querySelector<HTMLElement>(".d-target")!;
        gsap.to(scroller, {
          scrollTo: { y: target.offsetTop - 24 },
          duration: 0.9,
          ease: "power2.inOut",
        });
      });
    },
    { scope: root }
  );
  const jump = () => jumpRef.current?.();
  return (
    <div ref={root} className="relative h-full">
      <div className="d-scroll mini-scroll relative h-full overflow-y-auto px-3 py-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`mb-2 rounded-lg border px-3 py-1.5 font-mono text-[10px] ${
              i === 6
                ? "d-target border-accent/60 text-accent"
                : "border-white/10 text-white/35"
            }`}
          >
            ITEM_{String(i + 1).padStart(2, "0")}
          </div>
        ))}
      </div>
      <button
        onClick={jump}
        data-hover
        className="absolute bottom-2 right-2 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold text-black"
      >
        JUMP ↓
      </button>
    </div>
  );
}

export function ObserverGaugeDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      let v = 30;
      const fill = root.current!.querySelector(".d-obs-fill")!;
      const num = root.current!.querySelector(".d-obs-num")!;
      gsap.set(fill, { scaleX: v / 100 });
      const obs = Observer.create({
        target: root.current,
        type: "pointer",
        onDrag: (self) => {
          v = gsap.utils.clamp(0, 100, v + self.deltaX * 0.4);
          gsap.to(fill, {
            scaleX: v / 100,
            duration: 0.25,
            ease: "power2.out",
          });
          num.textContent = String(Math.round(v)).padStart(3, "0");
        },
      });
      return () => obs.kill();
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      data-hover
      className="flex h-full flex-col items-center justify-center gap-4 px-8"
    >
      <p className="d-obs-num font-mono text-3xl font-black tabular-nums">030</p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="d-obs-fill h-full w-full origin-left bg-accent" />
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
        drag sideways
      </p>
    </div>
  );
}

export function DragSpinDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      Draggable.create(".d-knob", { type: "rotation", inertia: true });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div
        className="d-knob relative h-24 w-24 rounded-full border border-white/20 bg-white/[0.03] will-change-transform"
        data-hover
      >
        <span className="absolute left-1/2 top-1.5 h-3 w-0.5 -translate-x-1/2 rounded bg-accent" />
        <span className="absolute inset-0 grid place-items-center font-mono text-[9px] text-white/40">
          SPIN
        </span>
      </div>
    </div>
  );
}

export function WiggleDemo({ params }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  // unique ease name — several instances (card + modal) would otherwise
  // overwrite the global "dWiggle" ease while each other is still using it
  const ease = useId();
  const shakeRef = useRef<(() => void) | undefined>(undefined);
  useGSAP(
    (_, contextSafe) => {
      CustomWiggle.create(ease, {
        wiggles: pn(params, "wiggles", 7),
        type: "easeOut",
      });
      shakeRef.current = contextSafe?.(() =>
        gsap.fromTo(
          ".d-wig",
          { rotation: -pn(params, "amplitude", 25) },
          { rotation: 0, duration: 1.3, ease }
        )
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button
        data-hover
        onClick={() => shakeRef.current?.()}
        className="d-wig rounded-xl border border-accent/50 bg-accent/10 px-5 py-3 font-mono text-xs text-accent will-change-transform"
      >
        SHAKE ME
      </button>
    </div>
  );
}

export function BounceDemo({ params }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const ease = useId();
  useGSAP(
    () => {
      const height = pn(params, "hauteur", 70);
      CustomBounce.create(ease, {
        strength: pn(params, "force", 0.65),
        squash: 3,
      });
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.5 })
        .set(".d-ball", { y: -height, scaleX: 1, scaleY: 1 })
        .to(".d-ball", { y: 0, duration: 1.3, ease }, 0)
        .to(
          ".d-ball",
          {
            scaleX: 1.4,
            scaleY: 0.6,
            duration: 1.3,
            ease: `${ease}-squash`,
          },
          0
        );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative flex h-full items-end justify-center pb-8">
      <div className="d-ball h-8 w-8 origin-bottom rounded-full bg-accent will-change-transform" />
      <div className="absolute bottom-8 h-px w-24 bg-white/20" />
    </div>
  );
}

export function EaseLabDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const dot = root.current!.querySelector(".d-ease-dot")!;
      const label = root.current!.querySelector(".d-ease-label")!;
      const track = root.current!.querySelector<HTMLElement>(
        ".d-ease-track"
      )!;
      const dist = track.clientWidth - 14;
      const eases = [
        "power4.out",
        "elastic.out(1,0.35)",
        "bounce.out",
        "back.out(2.5)",
        "steps(9)",
        "expo.inOut",
        "rough({strength:3,points:40,taper:'out'})",
      ];
      const tl = gsap.timeline({ repeat: -1 });
      eases.forEach((e) => {
        tl.call(() => {
          label.textContent = e;
        })
          .fromTo(dot, { x: 0 }, { x: dist, duration: 1.4, ease: e })
          .to({}, { duration: 0.5 });
      });
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full flex-col items-center justify-center gap-4 px-8"
    >
      <div className="d-ease-track relative h-8 w-full rounded-full border border-white/10">
        <div className="d-ease-dot absolute left-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-accent" />
      </div>
      <p className="d-ease-label font-mono text-[10px] text-white/50">
        power4.out
      </p>
    </div>
  );
}

export function PhysicsFallDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-phys",
        { x: -50, y: -30, rotation: 0 },
        {
          physicsProps: {
            x: { velocity: 120, friction: 0.01 },
            y: { velocity: -80, acceleration: 420 },
            rotation: { velocity: 340, friction: 0.02 },
          },
          duration: 2.4,
          repeat: -1,
          repeatDelay: 0.5,
        }
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center overflow-hidden">
      <div className="d-phys h-10 w-10 rounded-lg border border-accent bg-accent/20 will-change-transform" />
    </div>
  );
}

export function LinesRevealDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const split = new SplitText(".d-lines", {
        type: "lines",
        mask: "lines",
      });
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.6 })
        .from(split.lines, {
          yPercent: 110,
          stagger: 0.12,
          duration: 0.7,
          ease: "power4.out",
        })
        .to(
          split.lines,
          {
            yPercent: -110,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.in",
          },
          "+=0.9"
        );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6 text-center">
      <p className="d-lines text-base font-semibold leading-snug">
        {text ?? "Masked lines revealed one by one"}
      </p>
    </div>
  );
}

export function ChoreoDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 0.4,
          defaults: { duration: 0.5, ease: "power2.inOut" },
        })
        .to(".d-box", { x: 90 })
        .to(".d-box", { y: 50 })
        .to(".d-box", { x: 0 })
        .to(".d-box", { y: 0 })
        .to(".d-box", { rotation: 360, scale: 0.55, duration: 0.7 })
        .to(".d-box", { rotation: 0, scale: 1 });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="h-full p-4">
      <div className="relative h-full w-full rounded-lg border border-dashed border-white/10">
        <div className="d-box absolute left-3 top-3 h-9 w-9 rounded-lg bg-accent will-change-transform" />
      </div>
    </div>
  );
}

export function TrailDemo() {
  const root = useRef<HTMLDivElement>(null);
  const trailRef = useRef<((x: number, y: number) => void) | undefined>(
    undefined
  );
  useGSAP(
    (_, contextSafe) => {
      let last = { x: -999, y: -999 };
      trailRef.current = contextSafe?.((x: number, y: number) => {
        if (Math.hypot(x - last.x, y - last.y) < 10) return;
        last = { x, y };
        const p = document.createElement("span");
        p.className =
          "pointer-events-none absolute block h-2.5 w-2.5 rounded-full bg-accent";
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        root.current!.appendChild(p);
        gsap.to(p, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => p.remove(),
        });
      });
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      data-hover
      onMouseMove={(e) => {
        const r = root.current!.getBoundingClientRect();
        trailRef.current?.(e.clientX - r.left, e.clientY - r.top);
      }}
      className="relative h-full overflow-hidden"
    >
      <p className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
        leave a trail
      </p>
    </div>
  );
}

export function ParallaxDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-l1", {
        x: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".d-l2", {
        x: -40,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".d-l3", {
        x: -80,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="relative flex h-full flex-col items-start justify-center gap-2 overflow-hidden px-6"
    >
      <p className="d-l1 font-mono text-xs text-white/25">░░░ background ░░░</p>
      <p className="d-l2 font-mono text-base text-white/50">▒▒▒ midground ▒▒▒</p>
      <p className="d-l3 font-mono text-xl font-bold text-accent">
        ███ foreground
      </p>
    </div>
  );
}

export function SmootherDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const steps = [0, 44, 18, 72, 40];
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      steps.forEach((p) => {
        tl.set(".d-raw", { y: -p }).to(
          ".d-smo",
          { y: -p, duration: 0.9, ease: "power3.out" },
          "<"
        );
      });
    },
    { scope: root }
  );
  const cols = [
    { cls: "d-raw", dot: "bg-white/40", label: "RAW" },
    { cls: "d-smo", dot: "bg-accent", label: "SMOOTHER" },
  ];
  return (
    <div
      ref={root}
      className="flex h-full items-end justify-center gap-12 pb-4 pt-4"
    >
      {cols.map((c) => (
        <div
          key={c.cls}
          className="flex h-full flex-col items-center justify-end gap-2"
        >
          <div className="relative h-24 w-8 overflow-hidden rounded-full border border-white/10">
            <div
              className={`${c.cls} absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full ${c.dot}`}
            />
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/40">
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Recreations of the official demos.gsap.com demos                    */
/* ------------------------------------------------------------------ */

export interface DemoProps {
  autoplay?: boolean;
  text?: string;
  params?: Record<string, number | string>;
}

// Numeric / string param with fallback — feeds the modal's réglages sliders.
const pn = (
  p: DemoProps["params"],
  k: string,
  def: number
): number => (typeof p?.[k] === "number" ? (p[k] as number) : def);
const ps = (
  p: DemoProps["params"],
  k: string,
  def: string
): string => (typeof p?.[k] === "string" ? (p[k] as string) : def);

// Splits a comma-separated custom text param ("a, b, c") into a word list.
const csv = (t: string | undefined, def: string): string[] => {
  const list = (t ?? def).split(",").map((s) => s.trim()).filter(Boolean);
  return list.length ? list : def.split(",").map((s) => s.trim());
};

// Resolved accent for imperative draws (canvas, gsap color tweens) — reads the
// element's own --accent so the modal's color override applies instantly.
const accentOf = (el: Element | null | undefined): string =>
  (el && getComputedStyle(el).getPropertyValue("--accent").trim()) ||
  "#0ae448";

export function EaseReverseDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(undefined);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      gsap.set(".er-item", { yPercent: 120 });
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power4.out", easeReverse: "power2.in" },
        })
        .to(".er-item", {
          yPercent: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
        });
    },
    { scope: root }
  );
  const toggle = () => {
    if (open) tl.current?.reverse();
    else tl.current?.play();
    setOpen(!open);
  };
  return (
    <div
      ref={root}
      data-hover
      onClick={toggle}
      className="flex h-full cursor-pointer flex-col items-center justify-center gap-1.5"
    >
      {["WORK", "ABOUT", "LAB", "CONTACT"].map((w) => (
        <div key={w} className="overflow-hidden">
          <p className="er-item text-lg font-bold opacity-0">{w}</p>
        </div>
      ))}
      <span className="mt-3 font-mono text-[9px] tracking-[0.3em] text-white/35">
        {open ? "CLOSE ×" : "MENU →"}
      </span>
    </div>
  );
}

export function HoverPreviewDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [hue, setHue] = useState("from-accent to-emerald-200");
  const xTo = useRef<((v: number) => void) | undefined>(undefined);
  const yTo = useRef<((v: number) => void) | undefined>(undefined);
  const rTo = useRef<((v: number) => void) | undefined>(undefined);
  const { contextSafe } = useGSAP(
    () => {
      gsap.set(".hp-panel", { xPercent: -50, yPercent: -50, scale: 0 });
      xTo.current = gsap.quickTo(".hp-panel", "x", {
        duration: 0.45,
        ease: "power3",
      });
      yTo.current = gsap.quickTo(".hp-panel", "y", {
        duration: 0.45,
        ease: "power3",
      });
      rTo.current = gsap.quickTo(".hp-panel", "rotation", {
        duration: 0.6,
        ease: "power3",
      });
    },
    { scope: root }
  );
  const move = (e: ReactMouseEvent) => {
    const r = root.current!.getBoundingClientRect();
    xTo.current?.(e.clientX - r.left);
    yTo.current?.(e.clientY - r.top);
    rTo.current?.(gsap.utils.clamp(-18, 18, e.movementX * 1.2));
  };
  const show = contextSafe?.(() =>
    gsap.to(".hp-panel", { scale: 1, duration: 0.4, ease: "back.out(2)" })
  );
  const hide = contextSafe?.(() =>
    gsap.to(".hp-panel", { scale: 0, duration: 0.3, ease: "power3.in" })
  );
  const rowIn = contextSafe?.((el: HTMLElement) =>
    gsap.fromTo(el, { x: 0 }, { x: 8, duration: 0.3, ease: "power2.out" })
  );
  const rowOut = contextSafe?.((el: HTMLElement) =>
    gsap.to(el, { x: 0, duration: 0.3 })
  );
  const ROWS = [
    { label: "NEBULA", hue: "from-accent to-emerald-200" },
    { label: "PULSAR", hue: "from-fuchsia-500 to-accent" },
    { label: "QUASAR", hue: "from-sky-400 to-accent" },
  ];
  return (
    <div
      ref={root}
      onMouseMove={move}
      onMouseLeave={hide}
      className="relative flex h-full flex-col justify-center gap-2 px-5"
    >
      {ROWS.map((r, i) => (
        <div
          key={r.label}
          data-hover
          onMouseEnter={(e) => {
            show?.();
            setHue(r.hue);
            rowIn?.(e.currentTarget);
          }}
          onMouseLeave={(e) => rowOut?.(e.currentTarget)}
          className="w-fit cursor-pointer text-xl font-black tracking-tight"
        >
          {r.label} <span className="text-white/30">0{i + 1}</span>
        </div>
      ))}
      <div className="hp-panel pointer-events-none absolute left-0 top-0 h-24 w-20">
        <div
          className={`hp-visual absolute inset-0 rounded-lg bg-gradient-to-br ${hue}`}
        />
      </div>
    </div>
  );
}

export function BentoScrubDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const vars = {
        scale: 0.25,
        opacity: 0,
        yPercent: 30,
        stagger: { each: 0.12, from: "random" as const },
      };
      if (autoplay) {
        gsap
          .timeline({ repeat: -1, yoyo: true, repeatDelay: 0.7 })
          .from(".d-bento-tile", { ...vars, duration: 1, ease: "power3.out" });
      } else {
        gsap.from(".d-bento-tile", {
          ...vars,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 95%",
            end: "top 40%",
            scrub: 1,
          },
        });
      }
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="grid h-full grid-cols-3 grid-rows-2 gap-1.5 p-3"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`d-bento-tile rounded-md border border-white/10 bg-gradient-to-br ${
            i === 0
              ? "col-span-2 row-span-2 from-accent/30 to-transparent"
              : "from-white/10 to-transparent"
          }`}
        />
      ))}
      <div className="d-bento-tile rounded-md border border-accent/40 bg-accent/10" />
    </div>
  );
}

export function StaggerInDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (autoplay) {
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.2 })
          .from(".d-si-item", {
            y: 30,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.55,
            stagger: 0.12,
            ease: "power3.out",
          });
      } else {
        gsap.from(".d-si-item", {
          y: 30,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        });
      }
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-2 px-5">
      {["alpha", "beta", "gamma", "delta"].map((w) => (
        <div
          key={w}
          className="d-si-item flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-xs">{w}.module</span>
        </div>
      ))}
    </div>
  );
}

const SWIPE_0 = "M0 0 H100 V0 Q50 0 0 0 Z";
const SWIPE_CURVE = "M0 0 H100 V72 Q50 96 0 72 Z";
const SWIPE_FULL = "M0 0 H100 V100 Q50 100 0 100 Z";
const SWIPE_UP = "M0 0 H100 V26 Q50 46 0 26 Z";

export function CurveSwipeDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.set(".d-swipe", { attr: { d: SWIPE_0 } });
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.8 })
        .to(".d-swipe", {
          morphSVG: SWIPE_CURVE,
          duration: 0.6,
          ease: "power2.in",
        })
        .to(".d-swipe", { morphSVG: SWIPE_FULL, duration: 0.35, ease: "power1.out" })
        .set(".d-page-a", { opacity: 0 })
        .set(".d-page-b", { opacity: 1 })
        .to({}, { duration: 0.5 })
        .to(".d-swipe", {
          morphSVG: SWIPE_UP,
          duration: 0.4,
          ease: "power1.in",
        })
        .to(".d-swipe", {
          morphSVG: SWIPE_0,
          duration: 0.55,
          ease: "power3.out",
        })
        .set(".d-page-a", { opacity: 1 })
        .set(".d-page-b", { opacity: 0 });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <p className="d-page-a absolute inset-0 grid place-items-center text-2xl font-black">
        PAGE A
      </p>
      <p className="d-page-b absolute inset-0 grid place-items-center text-2xl font-black text-white/50">
        PAGE B
      </p>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path className="d-swipe text-accent" d={SWIPE_0} fill="currentColor" />
      </svg>
    </div>
  );
}

const CNV_N = 90;
function polyPoints(verts: [number, number][], n: number) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * verts.length;
    const a = verts[Math.floor(t) % verts.length];
    const b = verts[(Math.floor(t) + 1) % verts.length];
    const f = t % 1;
    pts.push({ x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f });
  }
  return pts;
}
function canvasShapes(cx: number, cy: number, r: number) {
  const circle = Array.from({ length: CNV_N }, (_, i) => {
    const a = (i / CNV_N) * Math.PI * 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  const poly = (sides: number, rot = -Math.PI / 2) =>
    polyPoints(
      Array.from(
        { length: sides },
        (_, i) =>
          [
            cx + r * Math.cos(rot + (i / sides) * Math.PI * 2),
            cy + r * Math.sin(rot + (i / sides) * Math.PI * 2),
          ] as [number, number]
      ),
      CNV_N
    );
  const star = Array.from({ length: CNV_N }, (_, i) => {
    const a = (i / CNV_N) * Math.PI * 2 - Math.PI / 2;
    const rr = r * (0.55 + 0.45 * Math.cos(5 * a));
    return { x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a) };
  });
  return [circle, poly(3), star, poly(6), poly(4, Math.PI / 4)];
}

export function CanvasMorphDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const canvas =
        root.current!.querySelector<HTMLCanvasElement>("canvas")!;
      const ctx = canvas.getContext("2d")!;
      const pts = Array.from({ length: CNV_N }, () => ({ x: 100, y: 100 }));
      const shapes = canvasShapes(100, 100, 72);
      const isPaused = () =>
        root.current?.parentElement?.dataset.paused === "1";
      let idx = 0;
      const morph = () => {
        if (isPaused()) return;
        const target = shapes[idx % shapes.length];
        gsap.to(pts, {
          x: (i: number) => target[i].x,
          y: (i: number) => target[i].y,
          duration: 1.5,
          ease: "power3.inOut",
          stagger: { each: 0.004, from: "random" },
        });
        idx++;
      };
      morph();
      const iv = setInterval(morph, 2400);
      const draw = () => {
        if (isPaused()) return;
        ctx.clearRect(0, 0, 200, 200);
        ctx.beginPath();
        pts.forEach((p, i) =>
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        );
        ctx.closePath();
        ctx.strokeStyle = accentOf(canvas);
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.fillStyle = `color-mix(in srgb, ${accentOf(canvas)} 8%, transparent)`;
        ctx.fill();
        ctx.fillStyle = accentOf(canvas);
        pts.forEach((p) => ctx.fillRect(p.x - 0.7, p.y - 0.7, 1.4, 1.4));
      };
      gsap.ticker.add(draw);
      return () => {
        clearInterval(iv);
        gsap.ticker.remove(draw);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <canvas width={200} height={200} className="h-40 w-40" />
    </div>
  );
}

export function HorizontalTextDemo({ autoplay, text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (autoplay) {
        gsap.fromTo(
          ".d-ht-text",
          { xPercent: 2 },
          {
            xPercent: -42,
            duration: 4.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      } else {
        gsap.fromTo(
          ".d-ht-text",
          { xPercent: 5 },
          {
            xPercent: -45,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center overflow-hidden">
      <p className="d-ht-text whitespace-nowrap text-6xl font-black tracking-tight text-white/90">
        {text ?? (
          <>
            HORIZONTAL <span className="text-accent">✦</span> SCROLL{" "}
            <span className="text-accent">✦</span> TEXT{" "}
            <span className="text-accent">✦</span> DRIFT
          </>
        )}
      </p>
    </div>
  );
}

export function WaypointsDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const path =
        root.current!.querySelector<SVGPathElement>(".d-wp-path")!;
      const rawPath = MotionPathPlugin.getRawPath(path);
      const dots = gsap.utils.toArray<SVGCircleElement>(".d-wp-dot");
      dots.forEach((d, i) => {
        const pos = MotionPathPlugin.getPositionOnPath(
          rawPath,
          (i + 1) / (dots.length + 1)
        ) as { x: number; y: number } | undefined;
        if (pos && Number.isFinite(pos.x) && Number.isFinite(pos.y)) {
          gsap.set(d, { attr: { cx: pos.x, cy: pos.y } });
        }
      });
      let last = 0;
      gsap.to(".d-wp-ball", {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
        duration: 5,
        repeat: -1,
        ease: "none",
        onUpdate() {
          const p = this.progress();
          if (p < last) {
            dots.forEach((d) => d.setAttribute("fill-opacity", "0.2"));
          }
          dots.forEach((d, i) => {
            const wp = (i + 1) / (dots.length + 1);
            if (p >= wp && last < wp) {
              d.setAttribute("fill-opacity", "1");
              gsap.fromTo(
                d,
                { attr: { r: 3 } },
                { attr: { r: 6.5 }, duration: 0.35, yoyo: true, repeat: 1 }
              );
            }
          });
          last = p;
        },
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 240 140" className="w-full max-w-xs text-accent">
        <path
          className="d-wp-path"
          d="M10 110 C 60 20, 100 130, 140 50 S 200 90, 230 20"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            className="d-wp-dot"
            cx={0}
            cy={0}
            r={3}
            fill="currentColor"
            fillOpacity={0.2}
          />
        ))}
        <circle className="d-wp-ball" cx={0} cy={0} r={5} fill="currentColor" />
      </svg>
    </div>
  );
}

const LOOP_PANELS = [
  [
    "color-mix(in srgb, var(--accent) 20%, transparent)",
    "color-mix(in srgb, var(--accent) 4%, transparent)",
    "color-mix(in srgb, var(--accent) 33%, transparent)",
  ],
  ["#1f293733", "#1f29370a", "#1f293755"],
  [
    "color-mix(in srgb, var(--accent) 20%, transparent)",
    "color-mix(in srgb, var(--accent) 4%, transparent)",
    "color-mix(in srgb, var(--accent) 33%, transparent)",
  ],
  ["#37415133", "#3741510a", "#37415155"],
  ["#05966933", "#0596690a", "#05966955"],
];
export function LoopPanelsDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-lp-track", {
        xPercent: -50,
        duration: 14,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center overflow-hidden">
      <div className="d-lp-track flex w-max gap-3 pr-3">
        {[...LOOP_PANELS, ...LOOP_PANELS].map((c, i) => (
          <div
            key={i}
            className="h-20 w-32 shrink-0 rounded-lg border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${c[0]}, ${c[1]})`,
              borderColor: c[2],
            }}
          >
            <p className="p-2 font-mono text-[9px] text-white/50">
              PANEL_{(i % LOOP_PANELS.length) + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FooterBounceDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap
        .timeline({ paused: true })
        .fromTo(
          ".d-fb",
          { yPercent: 140 },
          { yPercent: 0, duration: 1.2, ease: "elastic.out(1, 0.55)" }
        )
        .fromTo(
          ".d-fb-tag",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 },
          "<0.4"
        );
      if (autoplay) {
        tl.repeat(-1).repeatDelay(1.8).play();
      } else {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top 88%",
          onEnter: () => tl.play(0),
          onLeaveBack: () => tl.pause(0),
        });
      }
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full flex-col items-center justify-end overflow-hidden"
    >
      <p className="mb-auto mt-5 font-mono text-[10px] text-white/30">
        — scroll to the end —
      </p>
      <div className="d-fb w-full rounded-t-xl border-t border-accent/50 bg-white/5 px-4 py-3 text-center">
        <p className="text-sm font-bold">FOOTER ✦</p>
        <p className="d-fb-tag font-mono text-[9px] text-accent">
          springs in on arrival
        </p>
      </div>
    </div>
  );
}

export function ScrollProgressDemo() {
  const root = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const onScroll = (e: ReactUIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
    gsap.set(barRef.current, { scaleX: p });
    if (pctRef.current)
      pctRef.current.textContent = `${Math.round(p * 100)}%`;
  };
  return (
    <div ref={root} className="relative flex h-full flex-col px-4 py-3">
      <div className="mb-2 flex items-center justify-between font-mono text-[9px] text-white/40">
        <span>INNER SCROLL</span>
        <span ref={pctRef} className="text-accent">
          0%
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 rounded-full bg-accent"
        />
      </div>
      <div
        onScroll={onScroll}
        className="mini-scroll mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1"
      >
        {Array.from({ length: 14 }, (_, i) => (
          <div
            key={i}
            className="rounded border border-white/10 bg-white/5 px-2 py-1.5 font-mono text-[10px] text-white/60"
          >
            row_{String(i + 1).padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MaskScrollDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const from = {
        clipPath: "circle(16% at 50% 50%)",
        scale: 1.4,
      };
      const to = {
        clipPath: "circle(75% at 50% 50%)",
        scale: 1,
      };
      if (autoplay) {
        gsap
          .timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 })
          .fromTo(".d-ms-img", from, {
            ...to,
            duration: 2,
            ease: "power2.inOut",
          });
      } else {
        gsap.fromTo(".d-ms-img", from, {
          ...to,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 95%",
            end: "top 35%",
            scrub: 1,
          },
        });
      }
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center">
      <p className="font-mono text-[10px] tracking-[0.3em] text-white/30">
        MASKED IMAGE
      </p>
      <div
        className="d-ms-img absolute inset-3 rounded-lg"
        style={{
          clipPath: "circle(16% at 50% 50%)",
          background:
            "radial-gradient(circle at 30% 30%, var(--accent), #065f46 60%, #022c22)",
        }}
      >
        <p className="absolute bottom-2 left-3 font-mono text-[9px] text-black/60">
          IMG_0042.RAW
        </p>
      </div>
    </div>
  );
}

export function PinIndicatorDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const N = 4;
  const onScroll = (e: ReactUIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
    setActive(Math.round(p * (N - 1)));
  };
  return (
    <div ref={root} className="relative flex h-full">
      <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2.5">
        {Array.from({ length: N }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              i === active ? "scale-150 bg-accent" : "bg-white/25"
            }`}
          />
        ))}
      </div>
      <div
        onScroll={onScroll}
        className="mini-scroll min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto"
      >
        {Array.from({ length: N }, (_, i) => (
          <div
            key={i}
            className="grid h-full snap-start place-items-center"
          >
            <p className="font-mono text-xs text-white/50">
              SECTION_0{i + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const LOOP_SEC = ["STACK", "FLOW", "GRID", "VOID"];
export function LoopSectionsDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-ls-track", {
        yPercent: -50,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="h-full overflow-hidden">
      <div className="d-ls-track flex flex-col">
        {[...LOOP_SEC, ...LOOP_SEC].map((s, i) => (
          <div
            key={i}
            className="grid h-20 shrink-0 place-items-center border-b border-white/10"
          >
            <p className="text-xl font-black tracking-widest text-white/70">
              {s}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WormDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const path =
        root.current!.querySelector<SVGPathElement>(".d-worm-path")!;
      const tl = autoplay
        ? gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
        : gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
      tl.fromTo(
        path,
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", duration: 1, ease: "none" },
        0
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 120 200" className="h-full max-h-44 text-accent">
        <path
          className="d-worm-path"
          d="M60 5 C 10 50, 110 90, 60 120 S 20 170, 60 195"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function TypewriterDemo({ text, params }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const words = csv(text, "build the web,animate everything,gsap rocks");
  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 });
      words.forEach((w) => {
        tl.to(".d-type", {
          text: w,
          duration: w.length * pn(params, "vitesse", 0.07),
          ease: "none",
        })
          .to({}, { duration: pn(params, "pause", 1.2) })
          .to(".d-type", { text: "", duration: 0.35, ease: "none" });
      });
      gsap.to(".d-caret", {
        opacity: 0,
        duration: 0.45,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-4">
      <p className="font-mono text-xl font-bold">
        &gt; <span className="d-type text-accent" />
        <span className="d-caret text-accent">▌</span>
      </p>
    </div>
  );
}

export function CustomEaseDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      CustomEase.create(
        "hop",
        "M0,0 C0.14,0 0.26,0.99 0.5,0.99 C0.7,0.99 0.8,0.3 1,0.3"
      );
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.5 })
        .fromTo(
          ".d-ce-dot",
          { x: 0 },
          { x: 168, duration: 1.4, ease: "hop" }
        )
        .to(".d-ce-dot", { x: 0, duration: 0.45, ease: "power2.in" }, "+=0.6");
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full flex-col items-center justify-center gap-5 px-6"
    >
      <svg viewBox="0 0 170 60" className="w-44">
        <path
          d="M0 60 C 24 60, 44 0, 85 0 C 119 0, 136 42, 170 42"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
      </svg>
      <div className="relative h-1 w-[170px] rounded-full bg-white/10">
        <div className="d-ce-dot absolute -top-1.5 left-0 h-4 w-4 rounded-full bg-accent" />
      </div>
      <p className="font-mono text-[9px] tracking-[0.25em] text-white/35">
        CUSTOM BEZIER
      </p>
    </div>
  );
}

export function KeyframesDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-kf", {
        keyframes: [
          { x: 60, duration: 0.4 },
          { y: 40, duration: 0.35 },
          { x: -60, duration: 0.4 },
          { y: -40, duration: 0.35 },
          { rotation: 360, scale: 0.55, duration: 0.5 },
          { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.5 },
        ],
        repeat: -1,
        repeatDelay: 0.4,
        ease: "power1.inOut",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="d-kf grid h-12 w-12 place-items-center rounded-xl border border-accent bg-accent/20 font-mono text-[9px] text-accent">
        KF
      </div>
    </div>
  );
}

export function TextFillDemo({ autoplay, text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const vars = {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none" as const,
      };
      if (autoplay) {
        gsap.fromTo(
          ".d-tf-fill",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { ...vars, duration: 2.2, repeat: -1, yoyo: true, repeatDelay: 0.6 }
        );
      } else {
        gsap.fromTo(
          ".d-tf-fill",
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            ...vars,
            scrollTrigger: {
              trigger: root.current,
              start: "top 95%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center">
      <p className="text-3xl font-black tracking-tight text-white/15">
        {text ?? "VELOCITY"}
      </p>
      <p
        className="d-tf-fill absolute text-3xl font-black tracking-tight text-accent"
        style={{ clipPath: "inset(0% 100% 0% 0%)" }}
      >
        {text ?? "VELOCITY"}
      </p>
    </div>
  );
}

export function ImageSeqDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const canvas =
        root.current!.querySelector<HTMLCanvasElement>("canvas")!;
      const ctx = canvas.getContext("2d")!;
      const verts = [-1, 1].flatMap((x) =>
        [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z] as const))
      );
      const edges: [number, number][] = [];
      for (let i = 0; i < 8; i++)
        for (let j = i + 1; j < 8; j++) {
          const d =
            Math.abs(verts[i][0] - verts[j][0]) +
            Math.abs(verts[i][1] - verts[j][1]) +
            Math.abs(verts[i][2] - verts[j][2]);
          if (d === 2) edges.push([i, j]);
        }
      const isPaused = () =>
        root.current?.parentElement?.dataset.paused === "1";
      const o = { p: 0 };
      const draw = () => {
        if (isPaused()) return;
        const a = o.p * Math.PI * 2;
        const tilt = 0.42;
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        ctx.clearRect(0, 0, 200, 200);
        ctx.strokeStyle = accentOf(canvas);
        ctx.lineWidth = 1.4;
        const proj = verts.map(([x, y, z]) => {
          const rx = x * cos - z * sin;
          const rz = x * sin + z * cos;
          const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
          const s = 120 / (rz + 3.2);
          return [100 + rx * s * 0.9, 100 + ry * s * 0.9] as const;
        });
        edges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(proj[i][0], proj[i][1]);
          ctx.lineTo(proj[j][0], proj[j][1]);
          ctx.stroke();
        });
      };
      const vars = {
        p: 1,
        ease: "none" as const,
        duration: 6,
        onUpdate: draw,
      };
      if (autoplay) {
        gsap.to(o, { ...vars, repeat: -1 });
      } else {
        gsap.to(o, {
          ...vars,
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      draw();
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <canvas width={200} height={200} className="h-36 w-36" />
    </div>
  );
}

export function DevtoolsDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(undefined);
  const range = useRef<HTMLInputElement>(null);
  const [playing, setPlaying] = useState(false);
  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, repeat: -1 })
        .to(".d-dt-dot", {
          y: -26,
          stagger: 0.12,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(".d-dt-dot", {
          y: 0,
          stagger: 0.12,
          duration: 0.55,
          ease: "bounce.out",
        })
        .to({}, { duration: 0.4 });
      tl.current.eventCallback("onUpdate", () => {
        if (range.current && tl.current)
          range.current.value = String(tl.current.progress() * 100);
      });
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full flex-col items-center justify-center gap-4 px-6"
    >
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="d-dt-dot h-4 w-4 rounded-full bg-accent" />
        ))}
      </div>
      <input
        ref={range}
        type="range"
        min={0}
        max={100}
        defaultValue={0}
        aria-label="Scrub timeline"
        data-hover
        onChange={(e) => {
          tl.current?.progress(Number(e.target.value) / 100).pause();
          setPlaying(false);
        }}
        className="w-full"
        style={{ accentColor: "var(--accent)" }}
      />
      <button
        data-hover
        onClick={() => {
          if (!tl.current) return;
          if (playing) tl.current.pause();
          else tl.current.play();
          setPlaying(!playing);
        }}
        className="rounded-full border border-white/20 px-4 py-1 font-mono text-[10px] text-white/60 hover:border-accent hover:text-accent"
      >
        {playing ? "❚❚ PAUSE" : "▶ PLAY"}
      </button>
    </div>
  );
}

export function PathHelperDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-ph-handle", {
        scale: 1.6,
        transformOrigin: "center",
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 200 120" className="w-4/5 text-accent">
        <path
          d="M20 95 C 55 15, 105 105, 140 40 S 175 60, 185 25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <line x1="20" y1="95" x2="48" y2="32" stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3" />
        <line x1="140" y1="40" x2="122" y2="80" stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3" />
        {[
          [20, 95],
          [48, 32],
          [140, 40],
          [122, 80],
          [185, 25],
        ].map(([cx, cy], i) => (
          <rect
            key={i}
            className="d-ph-handle"
            x={cx - 4}
            y={cy - 4}
            width={8}
            height={8}
            fill={i % 2 === 0 ? "currentColor" : "#fff"}
          />
        ))}
      </svg>
    </div>
  );
}

export function MatchMediaDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = root.current!;
      const track = el.querySelector<HTMLElement>(".d-mm-track")!;
      const dot = el.querySelector<HTMLElement>(".d-mm-dot")!;
      const label = el.querySelector(".d-mm-state")!;
      let tween: gsap.core.Tween | undefined;
      const apply = (big: boolean) => {
        tween?.kill();
        tween = undefined;
        gsap.set(dot, { x: 0 });
        if (big) {
          label.textContent = "≥460px — ACTIVE";
          label.className = "d-mm-state font-mono text-[9px] text-accent";
          tween = gsap.to(dot, {
            x: track.clientWidth - 16,
            repeat: -1,
            yoyo: true,
            duration: 1.1,
            ease: "sine.inOut",
          });
        } else {
          label.textContent = "<460px — DORMANT (élargis-moi)";
          label.className = "d-mm-state font-mono text-[9px] text-white/35";
        }
      };
      const ro = new ResizeObserver(([entry]) =>
        apply(entry.contentRect.width >= 460)
      );
      ro.observe(el);
      return () => {
        ro.disconnect();
        tween?.kill();
      };
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full flex-col items-center justify-center gap-5 px-8"
    >
      <div className="d-mm-track relative h-1 w-full max-w-44 rounded-full bg-white/10">
        <div className="d-mm-dot absolute -top-1.5 left-0 h-4 w-4 rounded-full bg-accent" />
      </div>
      <p className="d-mm-state font-mono text-[9px] text-white/35">…</p>
    </div>
  );
}

/* ---------- editorial / magazine text templates (IANSAN) ---------- */

export function EditorialTitleDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const split = new SplitText(".d-ed-title", {
        type: "lines",
        mask: "lines",
      });
      gsap
        .timeline({ repeat: -1, repeatDelay: 1 })
        .from(split.lines, {
          yPercent: 115,
          stagger: 0.12,
          duration: 0.9,
          ease: "power4.out",
        })
        .to(
          ".d-ed-kicker",
          { letterSpacing: "0.6em", opacity: 0.4, duration: 0.8 },
          "+=0.6"
        )
        .to({}, { duration: 0.8 });
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full flex-col items-center justify-center px-6 text-center"
    >
      <p className="d-ed-kicker font-mono text-[9px] uppercase tracking-[0.4em] text-accent">
        n°01 — Édition
      </p>
      <h3 className="d-ed-title mt-3 text-3xl font-black uppercase leading-[0.95] tracking-tight">
        {(text ?? "Le sens\ndu mouvement")
          .split("\n")
          .map((l, i, arr) => (
            <span key={i}>
              {l}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
      </h3>
    </div>
  );
}

export function WordRotatorDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".d-wr-word");
      gsap.set(words, { yPercent: 100 });
      gsap.set(words[0], { yPercent: 0 });
      const tl = gsap.timeline({ repeat: -1 });
      words.forEach((_, i) => {
        const next = words[(i + 1) % words.length];
        tl.to(words[i], { yPercent: -100, duration: 0.6, ease: "power3.in" })
          .fromTo(
            next,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.6, ease: "power3.out" },
            "<"
          )
          .to({}, { duration: 1.2 });
      });
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full items-center justify-center gap-2 px-4"
    >
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">
        Créer des
      </span>
      <span className="relative inline-block h-6 w-28 overflow-hidden text-left">
        {csv(text, "récits,interfaces,émotions,mondes").map((w) => (
          <span
            key={w}
            className="d-wr-word absolute left-0 font-mono text-sm font-bold uppercase tracking-[0.1em] text-accent"
          >
            {w}
          </span>
        ))}
      </span>
    </div>
  );
}

export function LetterWaveDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const waveRef = useRef<(() => void) | undefined>(undefined);
  useGSAP(
    (_, contextSafe) => {
      const split = new SplitText(".d-wave", { type: "chars" });
      waveRef.current = contextSafe?.(() => {
        gsap.fromTo(
          split.chars,
          { y: 0 },
          {
            y: -14,
            duration: 0.35,
            ease: "sine.out",
            stagger: { each: 0.035, yoyo: true, repeat: 1 },
          }
        );
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p
        onMouseEnter={() => waveRef.current?.()}
        data-hover
        className="d-wave cursor-default text-3xl font-black uppercase tracking-tight"
      >
        {text ?? "Survolez"}
      </p>
    </div>
  );
}

export function DropCapDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: autoplay
          ? undefined
          : { trigger: root.current, start: "top 88%", end: "top 40%", scrub: 1 },
      });
      if (autoplay) tl.repeat(-1).repeatDelay(1);
      tl.from(".d-cap", {
        scale: 3,
        opacity: 0,
        rotate: -8,
        duration: 0.6,
        ease: "power3.out",
      }).from(
        ".d-cap-line",
        { opacity: 0, x: -14, stagger: 0.08, duration: 0.5 },
        "-=0.2"
      );
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="flex h-full items-center px-6">
      <p className="max-w-[230px] text-[11px] leading-relaxed text-white/70">
        <span className="d-cap float-left mr-2 mt-1 text-5xl font-black leading-[0.8] text-accent">
          L
        </span>
        {["a typographie est la voix", "du design. Chaque graisse,", "chaque chasse, chaque", "interligne raconte."].map(
          (l) => (
            <span key={l} className="d-cap-line block">
              {l}
            </span>
          )
        )}
      </p>
    </div>
  );
}

export function PullQuoteDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      tl.fromTo(
        ".d-quote-line",
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", duration: 0.8, ease: "power2.inOut" }
      )
        .from(
          ".d-quote",
          { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          ".d-quote-sig",
          { opacity: 0, duration: 0.4 },
          "-=0.1"
        )
        .to({}, { duration: 1 });
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full flex-col items-center justify-center px-8"
    >
      <svg viewBox="0 0 200 6" className="w-40 text-accent">
        <line
          className="d-quote-line"
          x1="0"
          y1="3"
          x2="200"
          y2="3"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <blockquote className="d-quote mt-4 text-center text-sm font-semibold leading-snug text-white/85">
        «{" "}
        {(text ?? "L'animation n'est pas un ornement,\nc'est une grammaire.")
          .split("\n")
          .map((l, i, arr) => (
            <span key={i}>
              {l}
              {i < arr.length - 1 && <br />}
            </span>
          ))}{" "}
        »
      </blockquote>
      <p className="d-quote-sig mt-3 font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
        — manifeste
      </p>
    </div>
  );
}

export function OutlineFillDemo({ autoplay, text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (autoplay) {
        gsap.fromTo(
          ".d-out-fill",
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 2,
            ease: "power2.inOut",
            repeat: -1,
            repeatDelay: 0.6,
            yoyo: true,
          }
        );
      } else {
        gsap.fromTo(
          ".d-out-fill",
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 95%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center">
      <span className="d-out-ghost absolute text-5xl font-black uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">
        {text ?? "Édito"}
      </span>
      <span className="d-out-fill text-5xl font-black uppercase tracking-tight text-accent">
        {text ?? "Édito"}
      </span>
    </div>
  );
}

export function ColumnRevealDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.from(".d-col", {
        yPercent: 40,
        opacity: 0,
        stagger: 0.18,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });
      gsap.from(".d-col-rule", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );
  const cols = [
    ["Chap. I", "Le mouvement comme langage : une interface qui respire explique son propre fonctionnement."],
    ["Chap. II", "Chaque tween est une phrase. La timeline les assemble en récit lisible au scroll."],
    ["Chap. III", "La retenue signe le style : une seule intention par écran, jamais de bruit gratuit."],
  ];
  return (
    <div ref={root} className="flex h-full items-stretch gap-3 px-5 py-6">
      {cols.map(([k, t], i) => (
        <div key={k} className="flex flex-1 gap-3">
          {i > 0 && <div className="d-col-rule w-px bg-white/15" />}
          <div className="d-col">
            <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-accent">
              {k}
            </p>
            <p className="mt-2 text-[9px] leading-relaxed text-white/55">{t}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- transitions de sections ---------- */

export function SectionWipeDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>(".d-wipe-slide");
      const tl = gsap.timeline({ repeat: -1 });
      slides.forEach((s, i) => {
        if (i === 0) return;
        tl.fromTo(
          s,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "+=1"
        ).fromTo(
          s.querySelector(".d-wipe-img"),
          { scale: 1.35 },
          { scale: 1, duration: 0.9, ease: "power3.out" },
          "<"
        );
      });
      tl.to({}, { duration: 1 });
    },
    { scope: root }
  );
  const slides = [
    ["from-accent/80 to-[#053b17]", "01 / VERNAL"],
    ["from-[#1a140d] to-[#3a2a10]", "02 / ESTIVAL"],
    ["from-[#0d121a] to-[#14283a]", "03 / HIVERNAL"],
  ];
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      {slides.map(([bg, label]) => (
        <div
          key={label}
          className="d-wipe-slide absolute inset-0 overflow-hidden"
        >
          <div
            className={`d-wipe-img flex h-full w-full items-end bg-gradient-to-br ${bg} p-4`}
          >
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/70">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CurtainColsDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const cfg = autoplay
        ? {}
        : {
            scrollTrigger: {
              trigger: root.current,
              start: "top 90%",
              end: "top 35%",
              scrub: 1,
            },
          };
      const tl = gsap.timeline(cfg);
      if (autoplay) tl.repeat(-1).repeatDelay(0.8).yoyo(true);
      tl.to(".d-curtain-col", {
        scaleY: 0,
        stagger: { each: 0.08, from: "edges" },
        ease: "power3.inOut",
        duration: 0.9,
      });
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <div className="bg-grid flex h-full items-center justify-center bg-gradient-to-br from-[#123] to-[#0a1a2e]">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/50">
          IMG_RIDEAU
        </span>
      </div>
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="d-curtain-col flex-1 bg-[#0b0b0b]" />
        ))}
      </div>
    </div>
  );
}

export function ZoomThroughDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const cfg = autoplay
        ? {}
        : {
            scrollTrigger: {
              trigger: root.current,
              start: "top 95%",
              end: "top 30%",
              scrub: 1,
            },
          };
      const tl = gsap.timeline(cfg);
      if (autoplay) tl.repeat(-1).repeatDelay(0.6).yoyo(true);
      tl.fromTo(
        ".d-zoom-frame",
        { scale: 0.55, rotate: -4 },
        { scale: 1.05, rotate: 0, ease: "power2.inOut", duration: 1 }
      ).fromTo(
        ".d-zoom-inner",
        { scale: 1.6 },
        { scale: 1, ease: "power2.inOut", duration: 1 },
        "<"
      );
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="d-zoom-frame h-28 w-44 overflow-hidden rounded-xl border border-white/15 will-change-transform">
        <div className="d-zoom-inner bg-grid flex h-full items-end bg-gradient-to-tr from-accent/60 to-black p-2">
          <span className="font-mono text-[8px] text-white/60">ZOOM ↗</span>
        </div>
      </div>
    </div>
  );
}

export function CrossfadeDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>(".d-xf-slide");
      gsap.set(slides, { opacity: 0 });
      gsap.set(slides[0], { opacity: 1 });
      const tl = gsap.timeline({ repeat: -1 });
      slides.forEach((_, i) => {
        const next = (i + 1) % slides.length;
        tl.to({}, { duration: 1.4 })
          .to(slides[i], { opacity: 0, duration: 0.8 })
          .to(slides[next], { opacity: 1, duration: 0.8 }, "<")
          .to(
            ".d-xf-count",
            { innerText: next + 1, snap: { innerText: 1 }, duration: 0.01 },
            "<"
          );
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      {[
        "from-[#2a0d12] to-[#4a1520]",
        "from-[#0d1a10] to-[#153a24]",
        "from-[#101025] to-[#20204a]",
      ].map((bg) => (
        <div
          key={bg}
          className={`d-xf-slide bg-grid absolute inset-0 bg-gradient-to-br ${bg}`}
        />
      ))}
      <span className="absolute bottom-3 left-4 font-mono text-xs text-white/60">
        0<span className="d-xf-count">1</span> / 03
      </span>
    </div>
  );
}

export function PinRotateDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-windmill", {
        rotate: 360,
        ease: "none",
        scrollTrigger: autoplay
          ? undefined
          : {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
        ...(autoplay ? { duration: 4, repeat: -1 } : {}),
      });
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 100 100" className="d-windmill h-24 w-24 text-accent">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <rect
            key={r}
            x="47"
            y="8"
            width="6"
            height="34"
            rx="3"
            fill={r % 120 === 0 ? "currentColor" : "rgba(255,255,255,0.4)"}
            transform={`rotate(${r} 50 50)`}
          />
        ))}
      </svg>
    </div>
  );
}

/* ---------- effets photo / média ---------- */

export function BlindsDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const cfg = autoplay
        ? {}
        : {
            scrollTrigger: {
              trigger: root.current,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            },
          };
      const tl = gsap.timeline(cfg);
      if (autoplay) tl.repeat(-1).repeatDelay(0.7).yoyo(true);
      tl.to(".d-blind", {
        scaleX: 0,
        stagger: { each: 0.07, from: "center" },
        ease: "power3.inOut",
        duration: 0.9,
      });
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <div className="bg-grid flex h-full items-center justify-center bg-gradient-to-br from-[#301a0d] to-[#4a2f12]">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/50">
          IMG_STORES
        </span>
      </div>
      <div className="absolute inset-0 flex flex-col">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="d-blind flex-1 origin-center bg-[#0b0b0b]"
          />
        ))}
      </div>
    </div>
  );
}

export function KenBurnsDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap
        .timeline({ repeat: -1, yoyo: true, defaults: { ease: "none" } })
        .fromTo(
          ".d-kb-img",
          { scale: 1.15, xPercent: -4, yPercent: -3 },
          { scale: 1.35, xPercent: 4, yPercent: 3, duration: 9 }
        );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <div className="d-kb-img bg-grid h-full w-full bg-gradient-to-br from-[#0d1a2a] via-[#123a28] to-black will-change-transform" />
      <span className="absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.3em] text-white/50">
        KEN&nbsp;BURNS
      </span>
    </div>
  );
}

export function VelocitySkewDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const skewTo = gsap.quickTo(".d-vskew", "skewY", {
        duration: 0.5,
        ease: "power3",
      });
      const clampSkew = gsap.utils.clamp(-10, 10);
      let cur = 0;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          cur = clampSkew(self.getVelocity() / -400);
        },
      });
      const decay = () => {
        if (root.current?.parentElement?.dataset.paused === "1") return;
        cur *= 0.9;
        skewTo(cur);
      };
      gsap.ticker.add(decay);
      return () => gsap.ticker.remove(decay);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center overflow-hidden">
      <div className="d-vskew h-28 w-44 rounded-xl border border-white/15 bg-gradient-to-br from-[#251236] to-[#0d0620] will-change-transform">
        <p className="p-3 font-mono text-[8px] uppercase tracking-[0.25em] text-white/40">
          scroll → skew
        </p>
      </div>
    </div>
  );
}

export function HoverDistortDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const wrap = root.current!;
      const img = wrap.querySelector(".d-hd-img")!;
      const cap = wrap.querySelector(".d-hd-cap")!;
      const noop = () => {};
      const enter =
        contextSafe?.(() => {
          gsap.to(img, {
            scale: 1.15,
            filter: "grayscale(0%)",
            duration: 0.7,
            ease: "power3.out",
          });
          gsap.to(cap, { y: 0, opacity: 1, duration: 0.4 });
        }) ?? noop;
      const leave =
        contextSafe?.(() => {
          gsap.to(img, {
            scale: 1,
            filter: "grayscale(85%)",
            duration: 0.7,
            ease: "power3.out",
          });
          gsap.to(cap, { y: 12, opacity: 0, duration: 0.4 });
        }) ?? noop;
      wrap.addEventListener("mouseenter", enter);
      wrap.addEventListener("mouseleave", leave);
      return () => {
        wrap.removeEventListener("mouseenter", enter);
        wrap.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      data-hover
      className="relative h-full cursor-pointer overflow-hidden"
    >
      <div
        className="d-hd-img bg-grid h-full w-full bg-gradient-to-br from-[#1a2a3a] to-[#0a1420] will-change-transform"
        style={{ filter: "grayscale(85%)" }}
      />
      <p className="d-hd-cap absolute bottom-3 left-4 translate-y-3 font-mono text-[9px] tracking-[0.3em] text-accent opacity-0">
        NUIT_047.RAW
      </p>
    </div>
  );
}

export function BeforeAfterDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = root.current!;
      const set = gsap.quickSetter(".d-ba-top", "clipPath") as (
        v: string
      ) => void;
      const setLeft = gsap.quickSetter(".d-ba-handle", "left", "%") as (
        v: number
      ) => void;
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const p = gsap.utils.clamp(
          0,
          100,
          ((e.clientX - r.left) / r.width) * 100
        );
        set(`inset(0% ${100 - p}% 0% 0%)`);
        setLeft(p);
      };
      el.addEventListener("pointermove", onMove);
      return () => el.removeEventListener("pointermove", onMove);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative h-full touch-none">
      <div className="bg-grid absolute inset-0 bg-gradient-to-br from-[#0a1a2e] to-[#123]" />
      <div
        className="d-ba-top absolute inset-0 bg-gradient-to-br from-accent/70 to-[#053b17]"
        style={{ clipPath: "inset(0% 50% 0% 0%)" }}
      />
      <div
        className="d-ba-handle pointer-events-none absolute inset-y-0 w-px bg-white/70"
        style={{ left: "50%" }}
      />
      <span className="absolute bottom-2 left-3 font-mono text-[8px] text-black/70">
        APRÈS
      </span>
      <span className="absolute bottom-2 right-3 font-mono text-[8px] text-white/50">
        AVANT
      </span>
    </div>
  );
}

export function ImageTrailDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!;
      let last = 0;
      const onMove = contextSafe?.((e: PointerEvent) => {
        const now = performance.now();
        if (now - last < 70) return;
        last = now;
        const r = el.getBoundingClientRect();
        const t = document.createElement("div");
        const hue = Math.floor(gsap.utils.random(0, 360));
        t.className =
          "pointer-events-none absolute h-10 w-14 rounded-md border border-white/20";
        t.style.cssText = `left:${e.clientX - r.left - 28}px;top:${
          e.clientY - r.top - 20
        }px;background:linear-gradient(135deg,hsl(${hue},60%,30%),#0b0b0b)`;
        el.appendChild(t);
        gsap.fromTo(
          t,
          { scale: 0, rotate: gsap.utils.random(-14, 14) },
          { scale: 1, duration: 0.4, ease: "back.out(2)" }
        );
        gsap.to(t, {
          scale: 0,
          opacity: 0,
          y: -30,
          delay: 0.5,
          duration: 0.6,
          ease: "power2.in",
          onComplete: () => t.remove(),
        });
      }) ?? (() => {});
      el.addEventListener("pointermove", onMove);
      return () => el.removeEventListener("pointermove", onMove);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative h-full overflow-hidden">
      <p className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
        traînée d&apos;images
      </p>
    </div>
  );
}

/* ---------- navigation, curseur & divers ---------- */

export function RollLinkDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const noop = () => {};
      const bound = gsap.utils.toArray<HTMLElement>(".d-roll").map((link) => {
        const inner = link.querySelector(".d-roll-inner")!;
        const enter =
          contextSafe?.(() => {
            gsap.to(inner, {
              yPercent: -100,
              duration: 0.45,
              ease: "power3.inOut",
            });
          }) ?? noop;
        const leave =
          contextSafe?.(() => {
            gsap.to(inner, {
              yPercent: 0,
              duration: 0.45,
              ease: "power3.inOut",
            });
          }) ?? noop;
        link.addEventListener("mouseenter", enter);
        link.addEventListener("mouseleave", leave);
        return { link, enter, leave };
      });
      return () =>
        bound.forEach(({ link, enter, leave }) => {
          link.removeEventListener("mouseenter", enter);
          link.removeEventListener("mouseleave", leave);
        });
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full flex-col items-center justify-center gap-3"
    >
      {csv(text, "ACCUEIL,TRAVAUX,STUDIO").map((l) => (
        <a
          key={l}
          data-hover
          className="d-roll block h-6 cursor-pointer overflow-hidden"
        >
          <span className="d-roll-inner block">
            <span className="block font-mono text-sm uppercase tracking-[0.25em] text-white/70">
              {l}
            </span>
            <span className="block font-mono text-sm uppercase tracking-[0.25em] text-accent">
              {l}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function MenuOverlayDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      gsap.set(".d-ovl", { yPercent: -100 });
      gsap.set(".d-ovl-link", { yPercent: 120 });
      tlRef.current = gsap
        .timeline({ paused: true })
        .to(".d-ovl", { yPercent: 0, duration: 0.5, ease: "power4.inOut" })
        .to(
          ".d-ovl-link",
          { yPercent: 0, stagger: 0.06, duration: 0.5, ease: "power3.out" },
          "-=0.15"
        );
    },
    { scope: root }
  );
  useGSAP(
    () => {
      if (open) tlRef.current?.play();
      else tlRef.current?.reverse();
    },
    { dependencies: [open] }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="d-ovl-btn absolute right-4 top-3 z-10 rounded-full border border-white/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70"
        data-hover
      >
        {open ? "fermer" : "menu"}
      </button>
      <div className="d-ovl absolute inset-0 flex flex-col justify-center bg-accent px-6">
        {csv(text, "Manifeste,Projets,Journal,Contact").map((l, i) => (
          <div key={l} className="overflow-hidden">
            <span className="d-ovl-link block text-2xl font-black uppercase text-black">
              <span className="mr-3 font-mono text-[10px]">0{i + 1}</span>
              {l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MouseParallaxDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const layers = gsap.utils.toArray<HTMLElement>(".d-mpl");
      const setters = layers.map((l, i) => {
        const depth = (i + 1) * 12;
        return {
          x: gsap.quickTo(l, "x", { duration: 0.6, ease: "power3" }),
          y: gsap.quickTo(l, "y", { duration: 0.6, ease: "power3" }),
          depth,
        };
      });
      const onMove = (e: PointerEvent) => {
        const r = root.current!.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        setters.forEach((s) => {
          s.x(nx * s.depth);
          s.y(ny * s.depth);
        });
      };
      const el = root.current!;
      el.addEventListener("pointermove", onMove);
      return () => el.removeEventListener("pointermove", onMove);
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      data-hover
      className="relative grid h-full place-items-center overflow-hidden"
    >
      <div className="d-mpl absolute h-28 w-28 rounded-full border border-white/10" />
      <div className="d-mpl absolute h-16 w-16 rounded-full border border-white/25" />
      <div className="d-mpl grid h-8 w-8 place-items-center rounded-full bg-accent font-mono text-[8px] font-bold text-black">
        ✦
      </div>
    </div>
  );
}

export function OdometerDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const cols = gsap.utils.toArray<HTMLElement>(".d-odo-col");
      const show = contextSafe?.((n: number) => {
        const digits = String(n).padStart(3, "0").split("").map(Number);
        cols.forEach((col, i) => {
          gsap.to(col, {
            yPercent: -digits[i] * 10,
            duration: 0.9,
            ease: "power3.inOut",
          });
        });
      }) ?? (() => {});
      const isPaused = () =>
        root.current?.parentElement?.dataset.paused === "1";
      let v = 0;
      const iv = setInterval(() => {
        if (isPaused()) return;
        v = (v + Math.floor(gsap.utils.random(80, 320))) % 1000;
        show(v);
      }, 1800);
      show(247);
      return () => clearInterval(iv);
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full items-center justify-center gap-1"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-8 w-7 overflow-hidden">
          <div className="d-odo-col flex flex-col">
            {Array.from({ length: 10 }).map((_, d) => (
              <span
                key={d}
                className="flex h-8 items-center justify-center font-mono text-2xl font-bold text-accent"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      ))}
      <span className="ml-2 font-mono text-[10px] text-white/40">pts</span>
    </div>
  );
}

export function StickyMediaDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const scroller =
        root.current!.querySelector<HTMLElement>(".d-st-scroll");
      if (!scroller) return;
      const imgs = gsap.utils.toArray<HTMLElement>(".d-st-img");
      const rows = gsap.utils.toArray<HTMLElement>(".d-st-row");
      gsap.set(imgs, { opacity: 0 });
      gsap.set(imgs[0], { opacity: 1 });
      const onScroll = contextSafe?.(() => {
        const t =
          scroller.scrollTop /
          (scroller.scrollHeight - scroller.clientHeight);
        const idx = Math.min(rows.length - 1, Math.floor(t * rows.length));
        imgs.forEach((img, i) =>
          gsap.to(img, { opacity: i === idx ? 1 : 0, duration: 0.3 })
        );
        rows.forEach((r, i) =>
          gsap.to(r, {
            color:
              i === idx ? accentOf(root.current) : "rgba(255,255,255,0.35)",
            duration: 0.3,
          })
        );
      }) ?? (() => {});
      scroller.addEventListener("scroll", onScroll);
      return () => scroller.removeEventListener("scroll", onScroll);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full gap-3 p-4">
      <div className="d-st-scroll mini-scroll flex-1 space-y-6 overflow-y-auto py-2">
        {["intro", "process", "livraison", "contact"].map((s) => (
          <p key={s} className="d-st-row font-mono text-xs uppercase text-white/35">
            {s}
          </p>
        ))}
      </div>
      <div className="relative w-24 shrink-0 overflow-hidden rounded-lg">
        {["from-accent/70 to-[#053b17]", "from-[#3a2a10] to-[#1a140d]", "from-[#20204a] to-[#101025]", "from-[#123] to-[#0a1a2e]"].map(
          (bg) => (
            <div
              key={bg}
              className={`d-st-img absolute inset-0 bg-gradient-to-br ${bg}`}
            />
          )
        )}
      </div>
    </div>
  );
}

export function VelocityMarqueeDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tween = gsap.to(".d-vm-track", {
        xPercent: -50,
        repeat: -1,
        duration: 10,
        ease: "none",
      });
      let boost = 0;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          boost = gsap.utils.clamp(-8, 8, self.getVelocity() / -300);
        },
      });
      const decay = () => {
        if (root.current?.parentElement?.dataset.paused === "1") return;
        boost *= 0.94;
        tween.timeScale(1 + Math.abs(boost));
      };
      gsap.ticker.add(decay);
      return () => gsap.ticker.remove(decay);
    },
    { scope: root }
  );
  const items = csv(text, "vitesse,✦,scroll,✦,inertie,✦");
  return (
    <div ref={root} className="flex h-full items-center overflow-hidden">
      <div className="d-vm-track flex w-max whitespace-nowrap will-change-transform">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="mx-4 font-mono text-lg font-bold uppercase tracking-[0.2em] text-white/60"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CircularTextDemo() {
  const root = useRef<HTMLDivElement>(null);
  const pathId = useId();
  useGSAP(
    () => {
      gsap.to(".d-circ", {
        rotate: 360,
        duration: 14,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 120 120" className="d-circ h-28 w-28 text-accent">
        <defs>
          <path
            id={pathId}
            d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text className="fill-white/70 font-mono text-[10px] uppercase tracking-[0.28em]">
          <textPath href={`#${pathId}`}>
            motion design • gsap • iansan •
          </textPath>
        </text>
        <circle cx="60" cy="60" r="5" fill="currentColor" />
      </svg>
    </div>
  );
}

export function GlitchDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const burst = contextSafe?.(() => {
        gsap.utils.toArray<HTMLElement>(".d-gl").forEach((copy, i) => {
          const tl = gsap.timeline();
          for (let s = 0; s < 4; s++) {
            tl.set(copy, {
              clipPath: `inset(${gsap.utils.random(0, 80)}% 0% ${gsap.utils.random(
                0,
                80
              )}% 0%)`,
              x: gsap.utils.random(-8, 8) * (i ? 1 : -1),
              opacity: gsap.utils.random(0.4, 1),
            }).to({}, { duration: 0.05 });
          }
          tl.set(copy, { clipPath: "inset(0% 0% 0% 0%)", x: 0, opacity: i ? 0.7 : 1 });
        });
      }) ?? (() => {});
      const iv = setInterval(() => {
        if (root.current?.parentElement?.dataset.paused !== "1") burst();
      }, 1400);
      burst();
      return () => clearInterval(iv);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center">
      <p className="d-gl relative text-3xl font-black uppercase tracking-tight">
        {text ?? "Signal"}
      </p>
      <p
        className="d-gl absolute inset-0 m-auto h-fit w-fit text-3xl font-black uppercase tracking-tight text-accent"
        aria-hidden
      >
        {text ?? "Signal"}
      </p>
      <p
        className="d-gl absolute inset-0 m-auto h-fit w-fit text-3xl font-black uppercase tracking-tight text-white/40"
        aria-hidden
      >
        {text ?? "Signal"}
      </p>
    </div>
  );
}

export function RepelGridDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const dots = gsap.utils.toArray<HTMLElement>(".d-rp-dot");
      const setters = dots.map((d) => ({
        x: gsap.quickTo(d, "x", { duration: 0.5, ease: "power3" }),
        y: gsap.quickTo(d, "y", { duration: 0.5, ease: "power3" }),
        el: d,
      }));
      const onMove = (e: PointerEvent) => {
        const R = 70;
        setters.forEach((s) => {
          const r = s.el.getBoundingClientRect();
          const dx = r.left + r.width / 2 - e.clientX;
          const dy = r.top + r.height / 2 - e.clientY;
          const dist = Math.hypot(dx, dy);
          if (dist < R && dist > 0.01) {
            const f = ((R - dist) / R) * 26;
            s.x((dx / dist) * f);
            s.y((dy / dist) * f);
          } else {
            s.x(0);
            s.y(0);
          }
        });
      };
      const el = root.current!;
      el.addEventListener("pointermove", onMove);
      return () => el.removeEventListener("pointermove", onMove);
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      data-hover
      className="grid h-full grid-cols-8 place-items-center gap-1 px-8"
    >
      {Array.from({ length: 48 }).map((_, i) => (
        <span
          key={i}
          className="d-rp-dot block h-1.5 w-1.5 rounded-full bg-white/40 will-change-transform"
        />
      ))}
    </div>
  );
}

export function ProgressRingDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (autoplay) {
        const loop = { duration: 1.6, repeat: -1, repeatDelay: 0.5, yoyo: true, ease: "power2.inOut" };
        gsap.fromTo(".d-ring", { drawSVG: "0%" }, { drawSVG: "100%", ...loop });
        gsap.fromTo(".d-ring-val", { innerText: 0 }, { innerText: 100, snap: { innerText: 1 }, ...loop });
      } else {
        const st = {
          trigger: root.current,
          start: "top 95%",
          end: "top 35%",
          scrub: 1,
        };
        gsap.fromTo(".d-ring", { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", scrollTrigger: st });
        gsap.fromTo(".d-ring-val", { innerText: 0 }, { innerText: 100, snap: { innerText: 1 }, ease: "none", scrollTrigger: st });
      }
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center">
      <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90 text-accent">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="5"
        />
        <circle
          className="d-ring"
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
      <span className="d-ring-val absolute font-mono text-sm text-white/80">0</span>
    </div>
  );
}

export function CardFlipDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-flip", {
        rotateY: flipped ? 180 : 0,
        duration: 0.8,
        ease: "power3.inOut",
      });
    },
    { scope: root, dependencies: [flipped] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center [perspective:700px]">
      <button
        data-hover
        onClick={() => setFlipped((f) => !f)}
        className="d-flip relative h-32 w-24 [transform-style:preserve-3d]"
      >
        <span className="absolute inset-0 grid place-items-center rounded-xl border border-accent/60 bg-accent/10 font-mono text-xs text-accent [backface-visibility:hidden]">
          RECTO
        </span>
        <span className="absolute inset-0 grid place-items-center rounded-xl border border-white/20 bg-white/10 font-mono text-xs text-white/70 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          VERSO
        </span>
      </button>
    </div>
  );
}

export function PillNavDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const links = gsap.utils.toArray<HTMLElement>(".d-pill-link");
      const xTo = gsap.quickTo(".d-pill", "x", { duration: 0.4, ease: "power3" });
      const wTo = gsap.quickTo(".d-pill", "width", { duration: 0.4, ease: "power3" });
      const handlers = links.map((l) => {
        const enter = () => {
          xTo(l.offsetLeft);
          wTo(l.offsetWidth);
        };
        l.addEventListener("mouseenter", enter);
        return () => l.removeEventListener("mouseenter", enter);
      });
      return () => handlers.forEach((h) => h());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <nav className="relative flex gap-1 rounded-full border border-white/15 p-1">
        <span className="d-pill absolute inset-y-1 left-0 w-16 rounded-full bg-accent/20" />
        {["accueil", "studio", "journal"].map((l) => (
          <a
            key={l}
            data-hover
            className="d-pill-link relative z-10 cursor-pointer rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70"
          >
            {l}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function CornerRevealDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-corner",
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%)" },
        {
          clipPath: "polygon(0% 0%, 200% 0%, 0% 200%)",
          ease: "none",
          scrollTrigger: autoplay
            ? undefined
            : {
                trigger: root.current,
                start: "top 92%",
                end: "top 40%",
                scrub: 1,
              },
          ...(autoplay
            ? { duration: 1.8, repeat: -1, repeatDelay: 0.6, yoyo: true }
            : {}),
        }
      );
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <div className="bg-grid h-full w-full" />
      <div className="d-corner absolute inset-0 flex items-end bg-gradient-to-br from-accent/80 to-[#053b17] p-3">
        <span className="font-mono text-[9px] tracking-[0.3em] text-black/70">
          DIAGONALE
        </span>
      </div>
    </div>
  );
}

export function TextScatterDemo({ text }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const boomRef = useRef<(() => void) | undefined>(undefined);
  useGSAP(
    (_, contextSafe) => {
      const split = new SplitText(".d-scat", { type: "chars" });
      boomRef.current = contextSafe?.(() => {
        gsap
          .timeline()
          .to(split.chars, {
            x: () => gsap.utils.random(-90, 90),
            y: () => gsap.utils.random(-70, 70),
            rotation: () => gsap.utils.random(-120, 120),
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: { each: 0.015, from: "random" },
          })
          .to(split.chars, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.9,
            ease: "elastic.out(1,0.6)",
            stagger: { each: 0.02, from: "center" },
          });
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button
        data-hover
        onClick={() => boomRef.current?.()}
        className="d-scat text-2xl font-black uppercase tracking-tight"
      >
        {text ?? "Disperser"}
      </button>
    </div>
  );
}

export function ElasticLineDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const path = root.current!.querySelector(".d-el-path")!;
      const pos = { x: 0, y: 0 };
      const render = () =>
        path.setAttribute("d", `M 20 60 Q ${160 + pos.x} ${60 + pos.y} 300 60`);
      render();
      const springBack = () => {
        gsap.to(pos, {
          x: 0,
          y: 0,
          duration: 1.3,
          ease: "elastic.out(1,0.2)",
          onUpdate: render,
        });
      };
      const [drag] = Draggable.create(".d-el-dot", {
        type: "x,y",
        bounds: root.current!,
        onDrag() {
          pos.x = this.x;
          pos.y = this.y;
          render();
        },
        onDragEnd() {
          springBack();
          gsap.to(this.target, {
            x: 0,
            y: 0,
            duration: 1.3,
            ease: "elastic.out(1,0.2)",
          });
        },
      });
      return () => drag.kill();
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="relative flex h-full items-center justify-center"
    >
      <svg viewBox="0 0 320 120" className="w-full text-accent">
        <path
          className="d-el-path"
          d="M 20 60 Q 160 60 300 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <div
        data-hover
        className="d-el-dot absolute left-1/2 top-1/2 -ml-2.5 -mt-2.5 h-5 w-5 cursor-grab rounded-full bg-accent"
      />
    </div>
  );
}

export function SpotlightDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!.querySelector<HTMLElement>(".d-sl-mask")!;
      const xTo = gsap.quickTo(el, "--sx", {
        duration: 0.45,
        ease: "power3",
      });
      const yTo = gsap.quickTo(el, "--sy", {
        duration: 0.45,
        ease: "power3",
      });
      if (autoplay) {
        const a = { t: 0 };
        gsap.to(a, {
          t: Math.PI * 2,
          duration: 5,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            xTo(el.clientWidth / 2 + Math.cos(a.t) * 70);
            yTo(el.clientHeight / 2 + Math.sin(a.t) * 40);
          },
        });
      }
      const move =
        contextSafe?.((e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        }) ?? (() => {});
      const host = root.current!;
      host.addEventListener("mousemove", move);
      return () => host.removeEventListener("mousemove", move);
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  const mask: Record<string, string> = {
    "--sx": "-100",
    "--sy": "-100",
    WebkitMaskImage:
      "radial-gradient(circle 62px at calc(var(--sx) * 1px) calc(var(--sy) * 1px), #000 30%, transparent 78%)",
    maskImage:
      "radial-gradient(circle 62px at calc(var(--sx) * 1px) calc(var(--sy) * 1px), #000 30%, transparent 78%)",
  };
  return (
    <div
      ref={root}
      className="relative flex h-full items-center justify-center overflow-hidden"
    >
      <p className="text-3xl font-black uppercase tracking-tight text-white/15">
        Secteur&nbsp;sombre
      </p>
      <div
        className="d-sl-mask bg-grid absolute inset-0 flex items-center justify-center"
        style={mask}
      >
        <p className="text-3xl font-black uppercase tracking-tight text-accent">
          Secteur&nbsp;sombre
        </p>
      </div>
      <p className="absolute bottom-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        promène le curseur
      </p>
    </div>
  );
}

export function SplitFlapDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const WORDS = ["NEBULA", "QUASAR", "PULSAR", "ZENITH"];
      const G = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const cells = gsap.utils.toArray<HTMLElement>(".d-sf-cell");
      const isPaused = () =>
        root.current?.parentElement?.dataset.paused === "1";
      let wi = 0;
      const show = (word: string) => {
        cells.forEach((cell, i) => {
          const col = cell.firstElementChild as HTMLElement;
          const chain =
            gsap.utils.shuffle(G.split("")).slice(0, 7).join("") + word[i];
          col.innerHTML = chain
            .split("")
            .map((l) => `<span class="block h-7 leading-7">${l}</span>`)
            .join("");
          gsap.fromTo(
            col,
            { y: 0 },
            {
              y: -7 * 28,
              duration: 0.85,
              delay: i * 0.07,
              ease: "power3.inOut",
            }
          );
        });
      };
      show(WORDS[0]);
      const iv = window.setInterval(() => {
        if (isPaused()) return;
        wi = (wi + 1) % WORDS.length;
        show(WORDS[wi]);
      }, 2400);
      return () => window.clearInterval(iv);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center justify-center gap-1.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="d-sf-cell h-7 w-6 overflow-hidden rounded-sm border border-white/10 bg-black/60 text-center font-mono text-lg font-bold text-accent"
        >
          <div>
            <span className="block h-7 leading-7">·</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DragSliderDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const viewport = root.current!;
      const track = root.current!.querySelector<HTMLElement>(".d-ds-track")!;
      const item = track.querySelector<HTMLElement>(".d-ds-item")!;
      const step = item.offsetWidth + 12;
      const minX = Math.min(0, viewport.clientWidth - track.scrollWidth);
      const snaps = Array.from({ length: track.children.length }, (_, i) =>
        Math.max(-i * step, minX)
      );
      const [drag] = Draggable.create(track, {
        type: "x",
        inertia: true,
        bounds: { minX, maxX: 0 },
        edgeResistance: 0.85,
        snap: { x: snaps },
      });
      return () => drag.kill();
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="d-ds-view flex h-full flex-col justify-center gap-3 overflow-hidden px-5"
    >
      <div className="d-ds-track flex gap-3 will-change-transform">
        {["01", "02", "03", "04", "05", "06", "07"].map((n) => (
          <div
            key={n}
            className="d-ds-item grid h-28 w-24 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-xs text-white/50"
          >
            SLIDE_{n}
          </div>
        ))}
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        drag — inertie + snap
      </p>
    </div>
  );
}

export function FlipListDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<number[]>([1, 2, 3]);
  const state = useRef<Flip.FlipState | null>(null);
  const next = useRef(4);
  const mutate = (fn: (l: number[]) => number[]) => {
    state.current = Flip.getState(
      root.current!.querySelectorAll(".d-fli")
    );
    setItems(fn);
  };
  useGSAP(
    () => {
      if (!state.current) return;
      Flip.from(state.current, {
        duration: 0.5,
        ease: "power2.inOut",
        absolute: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }
          ),
        onLeave: (els) =>
          gsap.to(els, { opacity: 0, scale: 0.7, duration: 0.25 }),
      });
      state.current = null;
    },
    { scope: root, dependencies: [items] }
  );
  return (
    <div ref={root} className="flex h-full flex-col gap-3 p-5">
      <div className="flex gap-2">
        <button
          data-hover
          onClick={() =>
            mutate((l) => [...l.slice(0, 7), next.current++])
          }
          className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold text-black"
        >
          + ITEM
        </button>
        <p className="self-center font-mono text-[9px] text-white/30">
          clique un item pour le retirer
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        {items.map((n) => (
          <button
            key={n}
            data-hover
            onClick={() => mutate((l) => l.filter((x) => x !== n))}
            className="d-fli flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] text-white/60"
          >
            <span>MODULE_{String(n).padStart(2, "0")}</span>
            <span className="text-white/25">✕</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TextWaveDemo() {
  const root = useRef<HTMLDivElement>(null);
  const pid = "tp" + useId().replace(/:/g, "");
  useGSAP(
    () => {
      gsap.to(".d-tp-path", {
        attr: { d: "M 10 70 Q 85 15 160 70 T 310 70" },
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center justify-center">
      <svg viewBox="0 0 320 140" className="w-full">
        <path
          id={pid}
          className="d-tp-path"
          d="M 10 70 Q 85 70 160 70 T 310 70"
          fill="none"
        />
        <text className="fill-accent font-mono text-[11px] tracking-[0.3em]">
          <textPath href={`#${pid}`} startOffset="50%" textAnchor="middle">
            LE SENS DU MOUVEMENT
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export function ScrollZoomDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (autoplay) {
        gsap
          .timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 })
          .fromTo(
            ".d-sz-img",
            { scale: 0.3, borderRadius: "24px" },
            { scale: 1, borderRadius: "0px", duration: 1.6, ease: "power2.inOut" }
          );
      } else {
        gsap.fromTo(
          ".d-sz-img",
          { scale: 0.3, borderRadius: "24px" },
          {
            scale: 1,
            borderRadius: "0px",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 95%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden rounded-lg">
      <div className="d-sz-img absolute inset-0 bg-gradient-to-br from-accent/60 via-accent/20 to-black will-change-transform">
        <p className="absolute inset-0 grid place-items-center font-mono text-[10px] uppercase tracking-[0.3em] text-black/70">
          IMG_0100.RAW — plein cadre
        </p>
      </div>
    </div>
  );
}

export function SnapScrollDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const scroller =
        root.current!.querySelector<HTMLElement>(".d-sn-scroll");
      if (!scroller) return;
      ScrollTrigger.create({
        scroller,
        start: 0,
        end: "max",
        snap: {
          snapTo: 1 / 3,
          duration: { min: 0.15, max: 0.5 },
          ease: "power2.out",
        },
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full flex-col px-6 py-4">
      <div className="d-sn-scroll mini-scroll min-h-0 flex-1 snap-none space-y-3 overflow-y-auto pr-1">
        {["ACTE I", "ACTE II", "ACTE III", "ACTE IV"].map((s, i) => (
          <div
            key={s}
            className={`grid h-24 place-items-center rounded-lg border font-mono text-xs tracking-[0.3em] ${
              i % 2
                ? "border-white/10 bg-white/[0.04] text-white/50"
                : "border-accent/30 bg-accent/10 text-accent"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
      <p className="pt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        scroll — ça snappe tout seul
      </p>
    </div>
  );
}

export function CubeDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const turn = useRef<() => void>(() => {});
  useGSAP(
    (_, contextSafe) => {
      const rot = { y: 0 };
      turn.current =
        contextSafe?.(() => {
          rot.y -= 90;
          gsap.to(".d-cube", {
            rotateY: rot.y,
            duration: 0.9,
            ease: "power3.inOut",
          });
        }) ?? (() => {});
      let iv: number | undefined;
      if (autoplay)
        iv = window.setInterval(() => {
          if (root.current?.parentElement?.dataset.paused !== "1")
            turn.current();
        }, 2200);
      return () => {
        if (iv) window.clearInterval(iv);
      };
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  const faces = ["STRATÉGIE", "DESIGN", "MOTION", "CODE"];
  return (
    <div
      ref={root}
      className="flex h-full flex-col items-center justify-center gap-4"
    >
      <div style={{ perspective: 600 }}>
        <div
          className="d-cube relative h-16 w-48"
          style={{ transformStyle: "preserve-3d" }}
        >
          {faces.map((f, i) => (
            <div
              key={f}
              className="absolute inset-0 grid place-items-center rounded-md border border-accent/40 bg-[#0b0b0b] font-mono text-sm font-bold tracking-[0.3em] text-accent"
              style={{
                transform: `rotateY(${i * 90}deg) translateZ(96px)`,
                backfaceVisibility: "hidden",
              }}
            >
              {f}
            </div>
          ))}
        </div>
      </div>
      <button
        data-hover
        onClick={() => turn.current()}
        className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 hover:border-accent"
      >
        pivoter →
      </button>
    </div>
  );
}

export function GooeyDemo() {
  const root = useRef<HTMLDivElement>(null);
  const fid = "goo" + useId().replace(/:/g, "");
  useGSAP(
    () => {
      gsap.to(".d-goo-b", {
        x: 46,
        y: -28,
        duration: 1.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".d-goo-c", {
        x: -34,
        y: 22,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      const [drag] = Draggable.create(".d-goo-a", {
        type: "x,y",
        bounds: root.current!,
      });
      return () => drag.kill();
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative flex h-full items-center justify-center">
      <svg viewBox="0 0 320 140" className="h-full w-full">
        <defs>
          <filter id={fid}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" />
          </filter>
        </defs>
        <g filter={`url(#${fid})`} className="fill-accent">
          <circle
            data-hover
            className="d-goo-a cursor-grab"
            cx="160"
            cy="70"
            r="16"
          />
          <circle className="d-goo-b" cx="110" cy="70" r="14" />
          <circle className="d-goo-c" cx="210" cy="70" r="12" />
        </g>
      </svg>
      <p className="absolute bottom-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        drag la grosse goutte
      </p>
    </div>
  );
}

export function AccordionDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".d-acc-body").forEach((b, i) => {
        gsap.to(b, {
          height: i === open ? b.scrollHeight : 0,
          opacity: i === open ? 1 : 0,
          duration: 0.45,
          ease: "power2.inOut",
          overwrite: true,
        });
      });
      gsap.utils.toArray<HTMLElement>(".d-acc-icon").forEach((ic, i) => {
        gsap.to(ic, {
          rotate: i === open ? 45 : 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    },
    { scope: root, dependencies: [open] }
  );
  const items = [
    ["Stratégie de marque", "Positionnement, plateforme de marque, naming."],
    ["Design d'interface", "UI kits, design system, prototypes haute-fidélité."],
    ["Motion & 3D", "GSAP, WebGL, transitions et micro-interactions."],
    ["Développement", "Next.js, headless CMS, intégration continue."],
  ];
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-1 px-5">
      {items.map(([t, d], i) => (
        <div key={t} className="border-b border-white/10">
          <button
            data-hover
            onClick={() => setOpen(i === open ? -1 : i)}
            className="flex w-full items-center justify-between py-2 text-left font-mono text-[11px] font-bold tracking-wide"
          >
            <span className={i === open ? "text-accent" : "text-white/70"}>
              {t}
            </span>
            <span className="d-acc-icon text-accent">+</span>
          </button>
          <div
            className="d-acc-body overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <p className="pb-2.5 text-[10px] leading-relaxed text-white/45">
              {d}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function NavShrinkDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const scroller = root.current!.querySelector<HTMLElement>(".d-ns-scroll")!;
      gsap.to(".d-ns-nav", {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "rgba(11,11,11,0.92)",
        ease: "none",
        scrollTrigger: {
          scroller,
          start: 10,
          end: 90,
          scrub: true,
        },
      });
      gsap.to(".d-ns-logo", {
        scale: 0.75,
        ease: "none",
        scrollTrigger: { scroller, start: 10, end: 90, scrub: true },
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative flex h-full flex-col overflow-hidden">
      <header className="d-ns-nav z-10 flex items-center justify-between border-b border-white/10 px-4 py-3.5">
        <span className="d-ns-logo origin-left text-sm font-black tracking-tight">
          IANSAN<span className="text-accent">®</span>
        </span>
        <nav className="flex gap-3 font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
          <span>travaux</span>
          <span>studio</span>
          <span className="text-accent">contact</span>
        </nav>
      </header>
      <div className="d-ns-scroll mini-scroll min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 rounded-md border border-white/10 bg-white/[0.03]" />
        ))}
      </div>
    </div>
  );
}

export function ToastDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [toasts, setToasts] = useState<number[]>([]);
  const nextId = useRef(0);
  const seen = useRef(new Set<number>());
  const dismiss = useRef<(id: number) => void>(() => {});
  useGSAP(
    (_, contextSafe) => {
      dismiss.current =
        contextSafe?.((id: number) => {
          const el = root.current!.querySelector(`[data-toast="${id}"]`);
          if (el)
            gsap.to(el, {
              x: 140,
              opacity: 0,
              duration: 0.35,
              ease: "power2.in",
              onComplete: () =>
                setToasts((t) => t.filter((x) => x !== id)),
            });
        }) ?? (() => {});
      gsap.utils.toArray<HTMLElement>(".d-toast").forEach((t) => {
        const id = Number(t.dataset.toast);
        if (!seen.current.has(id)) {
          seen.current.add(id);
          gsap.from(t, {
            x: 140,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          });
          window.setTimeout(() => dismiss.current(id), 2600);
        }
      });
    },
    { scope: root, dependencies: [toasts] }
  );
  return (
    <div ref={root} className="relative h-full">
      <div className="grid h-full place-items-center">
        <button
          data-hover
          onClick={() => setToasts((t) => [...t, nextId.current++])}
          className="rounded-full border border-accent/50 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
        >
          notifier
        </button>
      </div>
      <div className="pointer-events-none absolute right-3 top-3 flex w-44 flex-col gap-1.5">
        {toasts.map((id) => (
          <div
            key={id}
            data-toast={id}
            className="d-toast pointer-events-auto flex items-center gap-2 rounded-md border border-accent/40 bg-[#0b0b0b] px-3 py-2 shadow-lg"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="font-mono text-[9px] text-white/70">
              Message envoyé #{id + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DialogDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const tl = useRef<gsap.core.Timeline>(null);
  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(
          ".d-dlg-bg",
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        )
        .fromTo(
          ".d-dlg",
          { scale: 0.85, y: 30, autoAlpha: 0 },
          {
            scale: 1,
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "<0.05"
        );
    },
    { scope: root }
  );
  useGSAP(
    () => {
      if (open) tl.current?.play();
      else tl.current?.reverse();
    },
    { dependencies: [open] }
  );
  return (
    <div ref={root} className="relative h-full">
      <div className="grid h-full place-items-center">
        <button
          data-hover
          onClick={() => setOpen(true)}
          className="rounded-full bg-accent px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black"
        >
          ouvrir le dialog
        </button>
      </div>
      <div
        className={`absolute inset-0 ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <button
          aria-label="fermer"
          onClick={() => setOpen(false)}
          className="d-dlg-bg absolute inset-0 bg-black/60 opacity-0 backdrop-blur-sm"
        />
        <div className="d-dlg invisible absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-[#141414] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
            confirmation
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-white/60">
            Lancer l&apos;intégration de cet effet dans votre site ?
          </p>
          <div className="mt-3 flex gap-2">
            <button
              data-hover
              onClick={() => setOpen(false)}
              className="rounded-md bg-accent px-3 py-1.5 font-mono text-[9px] font-bold text-black"
            >
              CONFIRMER
            </button>
            <button
              data-hover
              onClick={() => setOpen(false)}
              className="rounded-md border border-white/15 px-3 py-1.5 font-mono text-[9px] text-white/50"
            >
              ANNULER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TooltipDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const tip = root.current!.querySelector(".d-tt")!;
      gsap.set(tip, { autoAlpha: 0, y: 8, scale: 0.9 });
      const show =
        contextSafe?.(() => {
          gsap.to(tip, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "back.out(2)",
          });
        }) ?? (() => {});
      const hide =
        contextSafe?.(() => {
          gsap.to(tip, { autoAlpha: 0, y: 8, scale: 0.9, duration: 0.25 });
        }) ?? (() => {});
      const host = root.current!.querySelector(".d-tt-host")!;
      host.addEventListener("mouseenter", show);
      host.addEventListener("mouseleave", hide);
      return () => {
        host.removeEventListener("mouseenter", show);
        host.removeEventListener("mouseleave", hide);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <span
        data-hover
        className="d-tt-host relative cursor-help border-b border-dashed border-accent/60 font-mono text-xs text-white/70"
      >
        survole-moi
        <span className="d-tt pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-accent/40 bg-[#141414] px-3 py-1.5 font-mono text-[9px] text-accent shadow-xl">
          propulsé par GSAP
        </span>
      </span>
    </div>
  );
}

export function StepperDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  useGSAP(
    () => {
      gsap.to(".d-stp-bar", {
        scaleX: step / 3,
        duration: 0.6,
        ease: "power3.inOut",
        transformOrigin: "left",
      });
      gsap.utils.toArray<HTMLElement>(".d-stp-dot").forEach((d, i) => {
        gsap.to(d, {
          scale: i <= step ? 1 : 0.7,
          backgroundColor:
            i <= step ? accentOf(d) : "rgba(255,255,255,0.15)",
          duration: 0.4,
          ease: "back.out(2)",
        });
      });
      gsap.utils.toArray<HTMLElement>(".d-stp-label").forEach((l, i) => {
        gsap.to(l, {
          opacity: i <= step ? 1 : 0.35,
          duration: 0.3,
        });
      });
    },
    { scope: root, dependencies: [step] }
  );
  const steps = ["PANIER", "LIVRAISON", "PAIEMENT", "MERCI"];
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-6 px-8">
      <div className="relative">
        <div className="h-px w-full bg-white/15" />
        <div className="d-stp-bar absolute inset-y-0 left-0 h-px w-full bg-accent" />
        <div className="absolute -top-1.5 flex w-full justify-between">
          {steps.map((s) => (
            <div key={s} className="d-stp-dot h-3 w-3 rounded-full bg-white/15" />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        {steps.map((s) => (
          <span
            key={s}
            className="d-stp-label font-mono text-[8px] uppercase tracking-[0.15em] text-white/70"
          >
            {s}
          </span>
        ))}
      </div>
      <button
        data-hover
        onClick={() => setStep((s) => (s + 1) % 4)}
        className="self-center rounded-full border border-white/20 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 hover:border-accent"
      >
        étape suivante →
      </button>
    </div>
  );
}

export function TimelineDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline(
        autoplay
          ? { repeat: -1, repeatDelay: 0.8 }
          : {
              scrollTrigger: {
                trigger: root.current,
                start: "top 90%",
                end: "top 30%",
                scrub: 1,
              },
            }
      );
      tl.fromTo(
        ".d-tl-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "none" }
      ).fromTo(
        ".d-tl-item",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, stagger: 0.25, duration: 0.4 },
        "<"
      );
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  const events = [
    ["2021", "Fondation du studio"],
    ["2022", "Premier prix FWA"],
    ["2023", "Ouverture bureau Tokyo"],
    ["2024", "40 projets livrés"],
  ];
  return (
    <div ref={root} className="flex h-full items-center px-8">
      <div className="relative pl-6">
        <div className="d-tl-line absolute bottom-1 left-0 top-1 w-px origin-top bg-accent" />
        {events.map(([y, t]) => (
          <div key={y} className="d-tl-item relative mb-3 last:mb-0">
            <span className="absolute -left-6 top-1 h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="font-mono text-[9px] text-accent">{y}</p>
            <p className="text-[11px] text-white/70">{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const quotes = [
    ["« Un studio qui fait du motion une langue. »", "— Marie D., CMO"],
    ["« Le site a doublé notre taux de conversion. »", "— Karim B., fondateur"],
    ["« Chaque scroll raconte quelque chose. »", "— Ana S., directrice édito"],
  ];
  useGSAP(
    () => {
      const isPaused = () =>
        root.current?.parentElement?.dataset.paused === "1";
      const iv = window.setInterval(() => {
        if (!isPaused()) setI((v) => (v + 1) % quotes.length);
      }, 2800);
      return () => window.clearInterval(iv);
    },
    { scope: root }
  );
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-tst",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    },
    { scope: root, dependencies: [i] }
  );
  return (
    <div ref={root} className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="d-tst">
        <p className="text-sm font-medium leading-relaxed text-white/85">
          {quotes[i][0]}
        </p>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
          {quotes[i][1]}
        </p>
      </div>
      <div className="flex gap-1.5">
        {quotes.map((_, d) => (
          <span
            key={d}
            className={`h-1 w-4 rounded-full transition-colors ${
              d === i ? "bg-accent" : "bg-white/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function PricingDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const cards = gsap.utils.toArray<HTMLElement>(".d-pr-card");
      const bound = cards.map((card) => {
        const enter =
          contextSafe?.(() => {
            gsap.to(card, {
              y: -8,
              scale: 1.05,
              duration: 0.4,
              ease: "power3.out",
            });
            gsap.to(
              cards.filter((c) => c !== card),
              { opacity: 0.35, duration: 0.4 }
            );
          }) ?? (() => {});
        const leave =
          contextSafe?.(() => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.4 });
            gsap.to(cards, { opacity: 1, duration: 0.4 });
          }) ?? (() => {});
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        return { card, enter, leave };
      });
      return () =>
        bound.forEach(({ card, enter, leave }) => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        });
    },
    { scope: root }
  );
  const plans = [
    ["STARTER", "2k€", "Site vitrine"],
    ["STUDIO", "6k€", "Site immersif"],
    ["SCALE", "12k€", "Plateforme"],
  ];
  return (
    <div ref={root} className="flex h-full items-end justify-center gap-2 px-4 pb-6 pt-8">
      {plans.map(([n, p, d]) => (
        <div
          key={n}
          data-hover
          className="d-pr-card w-1/3 cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-3 text-center"
        >
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-accent">
            {n}
          </p>
          <p className="mt-1 text-lg font-black">{p}</p>
          <p className="text-[9px] text-white/40">{d}</p>
        </div>
      ))}
    </div>
  );
}

export function CtaFillDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const btn = root.current!.querySelector<HTMLElement>(".d-cta")!;
      const dot = btn.querySelector(".d-cta-dot")!;
      const label = btn.querySelector(".d-cta-label")!;
      const enter =
        contextSafe?.((e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          gsap.set(dot, {
            x: e.clientX - r.left,
            y: e.clientY - r.top,
            scale: 0,
          });
          gsap.to(dot, { scale: 14, duration: 0.55, ease: "power3.out" });
          gsap.to(label, { color: "#000", duration: 0.3 });
        }) ?? (() => {});
      const leave =
        contextSafe?.(() => {
          gsap.to(dot, { scale: 0, duration: 0.4, ease: "power3.in" });
          gsap.to(label, { color: "#fff", duration: 0.3 });
        }) ?? (() => {});
      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);
      return () => {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button
        data-hover
        className="d-cta relative overflow-hidden rounded-full border border-accent/60 px-8 py-3"
      >
        <span className="d-cta-dot absolute left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full bg-accent" />
        <span className="d-cta-label relative font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
          Démarrer un projet
        </span>
      </button>
    </div>
  );
}

export function InputFloatDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const bound = gsap.utils
        .toArray<HTMLElement>(".d-in-wrap")
        .map((wrap) => {
          const input = wrap.querySelector("input")!;
          const label = wrap.querySelector(".d-in-label")!;
          const line = wrap.querySelector(".d-in-line")!;
          const up =
            contextSafe?.(() => {
              gsap.to(label, {
                y: -14,
                scale: 0.75,
                color: "#7ee787",
                duration: 0.3,
                ease: "power2.out",
              });
              gsap.to(line, {
                scaleX: 1,
                duration: 0.4,
                ease: "power3.out",
              });
            }) ?? (() => {});
          const down =
            contextSafe?.(() => {
              if (input.value) return;
              gsap.to(label, {
                y: 0,
                scale: 1,
                color: "rgba(255,255,255,0.4)",
                duration: 0.3,
              });
              gsap.to(line, { scaleX: 0, duration: 0.3 });
            }) ?? (() => {});
          input.addEventListener("focus", up);
          input.addEventListener("blur", down);
          return { input, up, down };
        });
      return () =>
        bound.forEach(({ input, up, down }) => {
          input.removeEventListener("focus", up);
          input.removeEventListener("blur", down);
        });
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full flex-col justify-center gap-6 px-8"
    >
      {["Votre nom", "Votre email"].map((ph) => (
        <div key={ph} className="d-in-wrap relative">
          <label className="d-in-label pointer-events-none absolute left-0 top-0 origin-left font-mono text-[11px] text-white/40">
            {ph}
          </label>
          <input
            type="text"
            aria-label={ph}
            className="w-full border-b border-white/15 bg-transparent pb-1.5 pt-0 font-mono text-[11px] text-white outline-none"
          />
          <div className="d-in-line absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent" />
        </div>
      ))}
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
        clique dans un champ
      </p>
    </div>
  );
}

export function LightboxDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const imgFor = (i: number) =>
    `bg-gradient-to-br ${["from-accent/70 to-black", "from-[#8a63ff]/70 to-black", "from-[#ff6b6b]/60 to-black"][i]}`;
  useGSAP(
    (_, contextSafe) => {
      if (zoom === null) return;
      const thumb = root.current!.querySelector<HTMLElement>(
        `[data-thumb="${zoom}"]`
      )!;
      const overlay = root.current!.querySelector<HTMLElement>(".d-lb-img")!;
      const vars = Flip.fit(overlay, thumb, { getVars: true });
      gsap.set(overlay, vars as gsap.TweenVars);
      gsap.to(overlay, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.55,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        ".d-lb-bg",
        { opacity: 0 },
        { opacity: 1, duration: 0.35 }
      );
      const close =
        contextSafe?.(() => {
          const back = Flip.fit(overlay, thumb, { getVars: true });
          gsap.to(".d-lb-bg", { opacity: 0, duration: 0.3 });
          gsap.to(overlay, {
            ...(back as gsap.TweenVars),
            duration: 0.45,
            ease: "power3.inOut",
            onComplete: () => setZoom(null),
          });
        }) ?? (() => {});
      const bg = root.current!.querySelector(".d-lb-bg")!;
      bg.addEventListener("click", close);
      return () => bg.removeEventListener("click", close);
    },
    { scope: root, dependencies: [zoom], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="relative h-full">
      <div className="flex h-full items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            data-hover
            data-thumb={i}
            onClick={() => setZoom(i)}
            className={`h-16 w-20 rounded-md ${imgFor(i)}`}
          />
        ))}
      </div>
      {zoom !== null && (
        <div className="absolute inset-0">
          <button
            aria-label="fermer"
            className="d-lb-bg absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div
            className={`d-lb-img pointer-events-none absolute left-1/2 top-1/2 h-40 w-56 -translate-x-1/2 -translate-y-1/2 rounded-lg ${imgFor(zoom)}`}
          />
        </div>
      )}
    </div>
  );
}

export function CardFanDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const cards = gsap.utils.toArray<HTMLElement>(".d-fan");
      gsap.set(cards, {
        rotate: (i) => (i - 1.5) * 2,
        x: (i) => (i - 1.5) * 6,
        transformOrigin: "50% 120%",
      });
      const open =
        contextSafe?.(() => {
          gsap.to(cards, {
            rotate: (i) => (i - 1.5) * 14,
            x: (i) => (i - 1.5) * 46,
            y: -12,
            duration: 0.6,
            ease: "back.out(1.5)",
            stagger: 0.03,
          });
        }) ?? (() => {});
      const close =
        contextSafe?.(() => {
          gsap.to(cards, {
            rotate: (i) => (i - 1.5) * 2,
            x: (i) => (i - 1.5) * 6,
            y: 0,
            duration: 0.5,
            ease: "power3.inOut",
          });
        }) ?? (() => {});
      const host = root.current!;
      host.addEventListener("mouseenter", open);
      host.addEventListener("mouseleave", close);
      return () => {
        host.removeEventListener("mouseenter", open);
        host.removeEventListener("mouseleave", close);
      };
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      data-hover
      className="relative grid h-full cursor-pointer place-items-center"
    >
      {["I", "II", "III", "IV"].map((c) => (
        <div
          key={c}
          className="d-fan absolute grid h-24 w-16 place-items-center rounded-lg border border-accent/30 bg-[#141414] font-mono text-[10px] text-accent shadow-xl"
        >
          {c}
        </div>
      ))}
      <p className="absolute bottom-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        survole l&apos;éventail
      </p>
    </div>
  );
}

export function SkeletonDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-sk-shine",
        { xPercent: -120 },
        {
          xPercent: 320,
          duration: 1.4,
          repeat: -1,
          ease: "power1.inOut",
          stagger: 0.12,
          repeatDelay: 0.4,
        }
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-2.5 px-8">
      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10">
        <div className="d-sk-shine absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>
      {[100, 75, 60].map((w) => (
        <div
          key={w}
          className="relative h-3 overflow-hidden rounded bg-white/10"
          style={{ width: `${w}%` }}
        >
          <div className="d-sk-shine absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>
      ))}
    </div>
  );
}

export function CoverFlowDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const track = root.current!.querySelector<HTMLElement>(".d-cf-track")!;
      const view = root.current!;
      const cards = gsap.utils.toArray<HTMLElement>(".d-cf-card");
      const step = 110;
      const x0 = view.clientWidth / 2 - 24 - step / 2;
      const apply = () => {
        const tx = gsap.getProperty(track, "x") as number;
        cards.forEach((c, i) => {
          const d = (i * step + tx + step / 2 - view.clientWidth / 2) / step;
          gsap.set(c, {
            rotateY: gsap.utils.clamp(-50, 50, -d * 38),
            z: -Math.abs(d) * 90,
            opacity: 1 - Math.min(Math.abs(d) * 0.35, 0.7),
          });
        });
      };
      gsap.set(track, { x: x0 });
      apply();
      const [drag] = Draggable.create(track, {
        type: "x",
        inertia: true,
        bounds: { minX: x0 - (cards.length - 1) * step, maxX: x0 },
        snap: {
          x: Array.from({ length: cards.length }, (_, i) => x0 - i * step),
        },
        onDrag: apply,
        onThrowUpdate: apply,
      });
      return () => drag.kill();
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="d-cf-view relative flex h-full flex-col justify-center overflow-hidden"
    >
      <div style={{ perspective: 700 }}>
        <div className="d-cf-track flex h-28 items-center gap-0 pl-6 will-change-transform">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`d-cf-card mr-2 grid h-24 w-24 shrink-0 place-items-center rounded-lg border border-white/15 font-mono text-[10px] ${
                i % 3 === 0
                  ? "bg-accent/25 text-accent"
                  : "bg-white/[0.06] text-white/50"
              }`}
            >
              COVER_{i + 1}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 self-center font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        drag — coverflow 3d
      </p>
    </div>
  );
}

export function ScrollSpyDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useGSAP(
    () => {
      const scroller = root.current!.querySelector<HTMLElement>(".d-spy-scroll")!;
      gsap.utils.toArray<HTMLElement>(".d-spy-sec").forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          scroller,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full gap-4 px-5 py-4">
      <div className="flex w-20 flex-col justify-center gap-3">
        {["intro", "work", "team", "fin"].map((s, i) => (
          <span
            key={s}
            className={`font-mono text-[9px] uppercase tracking-[0.15em] transition-colors ${
              i === active ? "text-accent" : "text-white/25"
            }`}
          >
            {String(i + 1).padStart(2, "0")} {s}
          </span>
        ))}
      </div>
      <div className="d-spy-scroll mini-scroll min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {["INTRO", "WORK", "TEAM", "FIN"].map((s, i) => (
          <div
            key={s}
            className={`d-spy-sec grid h-28 place-items-center rounded-lg border font-mono text-xs tracking-[0.3em] transition-colors ${
              i === active
                ? "border-accent/50 bg-accent/10 text-accent"
                : "border-white/10 bg-white/[0.03] text-white/40"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DrawerDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.set(".d-dr-panel", { y: 92 });
      const [drag] = Draggable.create(".d-dr-panel", {
        type: "y",
        bounds: { minY: 0, maxY: 92 },
        onDragEnd() {
          gsap.to(this.target, {
            y: this.y < 46 ? 0 : 92,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });
      return () => drag.kill();
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <p className="p-5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        drag la poignée ↑
      </p>
      <div className="d-dr-panel absolute inset-x-3 bottom-0 h-36 rounded-t-xl border border-white/15 bg-[#141414] p-3 will-change-transform">
        <div
          data-hover
          className="d-dr-handle mx-auto h-5 w-16 cursor-grab rounded-full"
        >
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/30" />
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          panneau
        </p>
        <p className="mt-1 text-[10px] text-white/50">
          Bottom sheet — drag, snap ouvert/fermé.
        </p>
      </div>
    </div>
  );
}

export function PullRefreshDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const refresh =
        contextSafe?.(() => {
          gsap
            .timeline()
            .to(".d-pr-arrow", { rotate: 360, duration: 0.6, ease: "power2.inOut" })
            .to(".d-pr-arrow", { rotate: 0, duration: 0 });
        }) ?? (() => {});
      const [drag] = Draggable.create(".d-pr-strip", {
        type: "y",
        bounds: { minY: 0, maxY: 80 },
        onDrag() {
          gsap.set(".d-pr-arrow", { rotate: this.y * 3 });
        },
        onDragEnd() {
          gsap.to(".d-pr-strip", { y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
          if (this.y > 60) refresh();
        },
      });
      return () => drag.kill();
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative flex h-full flex-col items-center overflow-hidden">
      <div
        data-hover
        className="d-pr-strip mt-6 flex cursor-grab flex-col items-center gap-1 will-change-transform"
      >
        <span className="d-pr-arrow text-xl text-accent">↓</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
          tire vers le bas
        </span>
      </div>
      <div className="mt-auto w-full border-t border-white/10 p-3">
        <p className="text-center font-mono text-[9px] text-white/30">
          pull-to-refresh mobile
        </p>
      </div>
    </div>
  );
}

export function RadialMenuDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const tl = useRef<gsap.core.Timeline>(null);
  useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true });
      gsap.utils.toArray<HTMLElement>(".d-rm-item").forEach((it, i) => {
        const a = (-90 + i * 45) * (Math.PI / 180);
        tl.current!.fromTo(
          it,
          { x: 0, y: 0, scale: 0, opacity: 0 },
          {
            x: Math.cos(a) * 62,
            y: Math.sin(a) * 62,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
          },
          i * 0.04
        );
      });
      tl.current.to(
        ".d-rm-btn",
        { rotate: 45, duration: 0.3, ease: "power2.out" },
        0
      );
    },
    { scope: root }
  );
  useGSAP(
    () => {
      if (open) tl.current?.play();
      else tl.current?.reverse();
    },
    { dependencies: [open] }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center">
      {["◱", "◲", "◳", "◰", "◎"].map((s) => (
        <button
          key={s}
          data-hover
          aria-hidden={!open}
          tabIndex={open ? 0 : -1}
          className="d-rm-item absolute grid h-9 w-9 place-items-center rounded-full border border-accent/40 bg-[#141414] text-sm text-accent opacity-0"
        >
          {s}
        </button>
      ))}
      <button
        data-hover
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="d-rm-btn relative z-10 grid h-12 w-12 place-items-center rounded-full bg-accent text-xl font-bold text-black"
      >
        +
      </button>
    </div>
  );
}

export function HoverScrambleDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const bound = gsap.utils
        .toArray<HTMLElement>(".d-hs-link")
        .map((link) => {
          const label = link.dataset.label ?? "";
          const enter =
            contextSafe?.(() => {
              gsap.to(link, {
                duration: 0.6,
                scrambleText: { text: label, chars: "01<>/" },
              });
            }) ?? (() => {});
          link.addEventListener("mouseenter", enter);
          return { link, enter };
        });
      return () =>
        bound.forEach(({ link, enter }) =>
          link.removeEventListener("mouseenter", enter)
        );
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      className="flex h-full flex-col items-center justify-center gap-2"
    >
      {["MANIFESTE", "PROJETS", "JOURNAL", "CONTACT"].map((s) => (
        <a
          key={s}
          data-hover
          data-label={s}
          className="d-hs-link cursor-pointer font-mono text-sm tracking-[0.25em] text-white/60 hover:text-accent"
        >
          {s}
        </a>
      ))}
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        survole les liens
      </p>
    </div>
  );
}

export function MagneticCharsDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const split = new SplitText(".d-mc", { type: "chars" });
      const movers = (split.chars as HTMLElement[]).map((c) => ({
        x: gsap.quickTo(c, "x", { duration: 0.4, ease: "power3" }),
        y: gsap.quickTo(c, "y", { duration: 0.4, ease: "power3" }),
        el: c,
      }));
      const onMove = (e: MouseEvent) => {
        movers.forEach(({ x, y, el }) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const dist = Math.hypot(dx, dy);
          const f = Math.max(0, 1 - dist / 140);
          x(dx * f * 0.3);
          y(dy * f * 0.3);
        });
      };
      const host = root.current!;
      host.addEventListener("mousemove", onMove);
      const onLeave = () =>
        movers.forEach(({ x, y }) => {
          x(0);
          y(0);
        });
      host.addEventListener("mouseleave", onLeave);
      return () => {
        host.removeEventListener("mousemove", onMove);
        host.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p className="d-mc cursor-default text-3xl font-black uppercase tracking-tight">
        Magnétique
      </p>
    </div>
  );
}

export function VelocityTextDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const proxy = { stretch: 0 };
      const stretchTo = gsap.quickTo(".d-vt", "scaleY", {
        duration: 0.4,
        ease: "power3",
      });
      const skewTo = gsap.quickTo(".d-vt", "skewY", {
        duration: 0.4,
        ease: "power3",
      });
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity() / 400;
          const s = gsap.utils.clamp(-12, 12, v);
          if (Math.abs(s) > Math.abs(proxy.stretch)) {
            proxy.stretch = s;
            stretchTo(1 + Math.abs(s) / 14);
            skewTo(s / 2);
          }
        },
      });
      const decay = () => {
        if (root.current?.parentElement?.dataset.paused === "1") return;
        proxy.stretch *= 0.9;
        stretchTo(1 + Math.abs(proxy.stretch) / 14);
        skewTo(proxy.stretch / 2);
      };
      gsap.ticker.add(decay);
      return () => gsap.ticker.remove(decay);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center overflow-hidden">
      <p className="d-vt text-4xl font-black uppercase tracking-tight will-change-transform">
        Élastique
      </p>
    </div>
  );
}

export function PinnedSwapDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  useGSAP(
    () => {
      const scroller = root.current!.querySelector<HTMLElement>(".d-ps-scroll")!;
      ScrollTrigger.create({
        scroller,
        start: 0,
        end: "max",
        onUpdate: (self) => setIdx(Math.min(2, Math.floor(self.progress * 3))),
      });
    },
    { scope: root }
  );
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-ps-word",
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
      );
    },
    { scope: root, dependencies: [idx] }
  );
  const words = ["CAPTURER", "SÉDUIRE", "CONVERTIR"];
  return (
    <div ref={root} className="flex h-full gap-4 px-6 py-4">
      <div className="flex flex-1 flex-col justify-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
          objectif
        </p>
        <div className="mt-2 h-10 overflow-hidden">
          <p key={idx} className="d-ps-word text-3xl font-black text-accent">
            {words[idx]}
          </p>
        </div>
        <p className="mt-2 font-mono text-[9px] text-white/30">
          {idx + 1} / 3 — scroll à droite
        </p>
      </div>
      <div className="d-ps-scroll mini-scroll w-28 space-y-2 overflow-y-auto pr-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 rounded-md border border-white/10 bg-white/[0.04]" />
        ))}
      </div>
    </div>
  );
}

export function BlurRevealDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const split = new SplitText(".d-blur", { type: "chars" });
      gsap.fromTo(
        split.chars,
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.04,
          ease: "power2.out",
          ...(autoplay
            ? { duration: 0.7, repeat: -1, repeatDelay: 1.2, yoyo: true }
            : {
                duration: 0.7,
                scrollTrigger: {
                  trigger: root.current,
                  start: "top 85%",
                },
              }),
        }
      );
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6">
      <p className="d-blur text-center text-2xl font-bold">
        La clarté vient du flou
      </p>
    </div>
  );
}

export function CursorLabelDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const badge = root.current!.querySelector(".d-cl")!;
      gsap.set(badge, { autoAlpha: 0, scale: 0.6 });
      const xTo = gsap.quickTo(badge, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(badge, "y", { duration: 0.35, ease: "power3" });
      const host = root.current!;
      const move = (e: MouseEvent) => {
        const r = host.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      const show =
        contextSafe?.(() => {
          gsap.to(badge, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(2)",
          });
        }) ?? (() => {});
      const hide =
        contextSafe?.(() => {
          gsap.to(badge, { autoAlpha: 0, scale: 0.6, duration: 0.25 });
        }) ?? (() => {});
      host.addEventListener("mousemove", move);
      host.addEventListener("mouseenter", show);
      host.addEventListener("mouseleave", hide);
      return () => {
        host.removeEventListener("mousemove", move);
        host.removeEventListener("mouseenter", show);
        host.removeEventListener("mouseleave", hide);
      };
    },
    { scope: root }
  );
  return (
    <div
      ref={root}
      data-hover
      className="relative grid h-full cursor-none place-items-center overflow-hidden bg-gradient-to-br from-accent/30 to-black"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        IMG_PROJET_01
      </p>
      <span className="d-cl pointer-events-none absolute left-0 top-0 -ml-8 -mt-8 grid h-16 w-16 place-items-center rounded-full bg-accent font-mono text-[9px] font-bold text-black">
        VOIR
      </span>
    </div>
  );
}

export function GridGlowDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const cells = gsap.utils.toArray<HTMLElement>(".d-gg");
      const onMove = (e: MouseEvent) => {
        cells.forEach((c) => {
          const r = c.getBoundingClientRect();
          const d = Math.hypot(
            e.clientX - (r.left + r.width / 2),
            e.clientY - (r.top + r.height / 2)
          );
          const f = Math.max(0, 1 - d / 130);
          gsap.set(c, {
            backgroundColor: `rgba(10,228,72,${f * 0.35})`,
            scale: 1 + f * 0.15,
          });
        });
      };
      const host = root.current!;
      host.addEventListener("mousemove", onMove);
      return () => host.removeEventListener("mousemove", onMove);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full grid-cols-8 place-content-center gap-1.5 px-6">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="d-gg aspect-square rounded-sm bg-white/[0.06] will-change-transform"
        />
      ))}
    </div>
  );
}

export function ScrollCounterDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const run = (el: HTMLElement, target: number, suffix: string) => {
        const counter = { v: 0 };
        return gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          snap: { v: 1 },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}${suffix}`;
          },
        });
      };
      const cells = gsap.utils.toArray<HTMLElement>(".d-sc-num");
      const targets = [98, 47, 250];
      const suffixes = ["", "%", "+"];
      if (autoplay) {
        cells.forEach((el, i) =>
          gsap
            .timeline({ repeat: -1, repeatDelay: 1 })
            .fromTo(el, { opacity: 0.4 }, { opacity: 1, duration: 0.2 })
            .add(run(el, targets[i], suffixes[i]), 0)
        );
      } else {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top 85%",
          once: true,
          onEnter: () =>
            cells.forEach((el, i) => run(el, targets[i], suffixes[i])),
        });
      }
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  const stats = [
    ["98", "score lighthouse"],
    ["47", "projets livrés"],
    ["250+", "heures de motion"],
  ];
  return (
    <div ref={root} className="flex h-full items-center justify-center gap-6">
      {stats.map(([, l]) => (
        <div key={l} className="text-center">
          <p className="d-sc-num font-mono text-2xl font-black text-accent">0</p>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-white/40">
            {l}
          </p>
        </div>
      ))}
    </div>
  );
}

export function NavHideDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const scroller = root.current!.querySelector<HTMLElement>(".d-nh-scroll")!;
      const yTo = gsap.quickTo(".d-nh-nav", "yPercent", {
        duration: 0.4,
        ease: "power3.out",
      });
      ScrollTrigger.create({
        scroller,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (self.direction === -1 || self.scroll() < 30) yTo(0);
          else if (self.direction === 1) yTo(-110);
        },
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <header className="d-nh-nav absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0b0b0b]/90 px-4 py-2.5 backdrop-blur will-change-transform">
        <span className="text-xs font-black">
          IANSAN<span className="text-accent">®</span>
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
          nav intelligente
        </span>
      </header>
      <div className="d-nh-scroll mini-scroll h-full space-y-2 overflow-y-auto p-4 pt-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-9 rounded-md border border-white/10 bg-white/[0.03]" />
        ))}
      </div>
      <p className="pointer-events-none absolute bottom-2 left-0 right-0 text-center font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
        scroll ↓ cache · ↑ remonte
      </p>
    </div>
  );
}

export function HighlightDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-hl",
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.3,
          duration: 0.7,
          ease: "power3.inOut",
          transformOrigin: "left",
          ...(autoplay
            ? { repeat: -1, repeatDelay: 1, yoyo: true }
            : {
                scrollTrigger: {
                  trigger: root.current,
                  start: "top 80%",
                  end: "top 40%",
                  scrub: 1,
                },
              }),
        }
      );
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6">
      <p className="text-center text-xl font-bold leading-relaxed">
        <span className="relative">
          <span className="d-hl absolute -inset-x-1 inset-y-0 scale-x-0 bg-accent/40" />
          <span className="relative">Le mouvement</span>
        </span>{" "}
        donne la voix,{" "}
        <span className="relative">
          <span className="d-hl absolute -inset-x-1 inset-y-0 scale-x-0 bg-accent/40" />
          <span className="relative">le scroll</span>
        </span>{" "}
        donne le rythme.
      </p>
    </div>
  );
}

export function ToggleDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-tg-knob", {
        x: on ? 26 : 0,
        duration: 0.45,
        ease: "back.out(2.5)",
      });
      gsap.to(".d-tg-track", {
        backgroundColor: on
          ? accentOf(root.current)
          : "rgba(255,255,255,0.12)",
        duration: 0.35,
      });
    },
    { scope: root, dependencies: [on] }
  );
  return (
    <div ref={root} className="flex h-full flex-col items-center justify-center gap-3">
      <button
        data-hover
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className="d-tg-track h-8 w-14 rounded-full p-1 transition-colors"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
      >
        <span className="d-tg-knob block h-6 w-6 rounded-full bg-white shadow" />
      </button>
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
        {on ? "activé" : "désactivé"}
      </p>
    </div>
  );
}

export function CheckDrawDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-ck-path", {
        drawSVG: checked ? "0% 100%" : "100% 100%",
        duration: 0.45,
        ease: "power2.inOut",
      });
      gsap.to(".d-ck-box", {
        borderColor: checked
          ? accentOf(root.current)
          : "rgba(255,255,255,0.25)",
        duration: 0.3,
      });
    },
    { scope: root, dependencies: [checked] }
  );
  return (
    <div ref={root} className="flex h-full items-center justify-center gap-3">
      <button
        data-hover
        role="checkbox"
        aria-checked={checked}
        onClick={() => setChecked((v) => !v)}
        className="d-ck-box grid h-9 w-9 place-items-center rounded-md border-2"
        style={{ borderColor: "rgba(255,255,255,0.25)" }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none">
          <path
            className="d-ck-path"
            d="M4 12.5 L10 18.5 L20 6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        J&apos;accepte le manifeste
      </p>
    </div>
  );
}

export function SegmentedDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState(0);
  const opts = ["jour", "semaine", "mois"];
  useGSAP(
    (_, contextSafe) => {
      const xTo = gsap.quickTo(".d-sg-pill", "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      const wTo = gsap.quickTo(".d-sg-pill", "width", {
        duration: 0.35,
        ease: "power3.out",
      });
      const move =
        contextSafe?.((i: number) => {
          const btn = root.current!.querySelectorAll<HTMLElement>(
            ".d-sg-opt"
          )[i];
          xTo(btn.offsetLeft);
          wTo(btn.offsetWidth);
        }) ?? (() => {});
      move(sel);
    },
    { scope: root, dependencies: [sel] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative flex rounded-full border border-white/15 bg-black/40 p-1">
        <span className="d-sg-pill absolute inset-y-1 left-0 rounded-full bg-accent" />
        {opts.map((o, i) => (
          <button
            key={o}
            data-hover
            onClick={() => setSel(i)}
            className={`d-sg-opt relative z-10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
              i === sel ? "text-black" : "text-white/50"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LikeBurstDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const btn = root.current!.querySelector(".d-lk")!;
      const burst =
        contextSafe?.(() => {
          gsap.fromTo(
            ".d-lk-heart",
            { scale: 0.7 },
            { scale: 1, duration: 0.5, ease: "elastic.out(1,0.4)" }
          );
          gsap.utils.toArray<HTMLElement>(".d-lk-p").forEach((p) => {
            const a = Math.random() * Math.PI * 2;
            const d = gsap.utils.random(26, 48);
            gsap.fromTo(
              p,
              { x: 0, y: 0, opacity: 1, scale: 1 },
              {
                x: Math.cos(a) * d,
                y: Math.sin(a) * d,
                opacity: 0,
                scale: 0.4,
                duration: 0.7,
                ease: "power2.out",
              }
            );
          });
        }) ?? (() => {});
      btn.addEventListener("click", burst);
      return () => btn.removeEventListener("click", burst);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button
        data-hover
        aria-label="Aimer"
        className="d-lk relative grid h-14 w-14 place-items-center rounded-full border border-accent/40 bg-accent/10"
      >
        <span className="d-lk-heart text-xl text-accent">♥</span>
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="d-lk-p pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-accent opacity-0"
          />
        ))}
      </button>
      <p className="absolute bottom-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        clique le cœur
      </p>
    </div>
  );
}

export function StarsDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const lit = hover || rating;
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".d-star").forEach((s, i) => {
        gsap.to(s, {
          scale: i < lit ? 1.15 : 1,
          color: i < lit ? accentOf(s) : "rgba(255,255,255,0.2)",
          duration: 0.3,
          delay: i * 0.04,
          ease: "back.out(3)",
        });
      });
    },
    { scope: root, dependencies: [lit] }
  );
  return (
    <div ref={root} className="flex h-full flex-col items-center justify-center gap-3">
      <div
        className="flex gap-1"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            data-hover
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => setRating(n)}
            className="d-star text-2xl"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            ★
          </button>
        ))}
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
        {rating ? `${rating}/5 — merci !` : "notez l'expérience"}
      </p>
    </div>
  );
}

export function PingDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-ping",
        { scale: 0.6, opacity: 0.8 },
        {
          scale: 2.4,
          opacity: 0,
          duration: 1.4,
          repeat: -1,
          ease: "power1.out",
          stagger: 0.5,
        }
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative">
        <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-accent font-mono text-[9px] font-bold text-black">
          3
        </span>
        <span className="d-ping absolute inset-0 rounded-full border-2 border-accent" />
        <span className="d-ping absolute inset-0 rounded-full border-2 border-accent" />
      </div>
      <p className="absolute bottom-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        badge de notification
      </p>
    </div>
  );
}

export function EqualizerDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".d-eq").forEach((bar) => {
        gsap.to(bar, {
          scaleY: () => gsap.utils.random(0.15, 1),
          duration: () => gsap.utils.random(0.25, 0.5),
          repeat: -1,
          repeatRefresh: true,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "bottom",
        });
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-end justify-center gap-1.5 pb-10">
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="d-eq h-16 w-1.5 rounded-full bg-accent will-change-transform"
          style={{ transform: "scaleY(0.2)" }}
        />
      ))}
      <p className="absolute bottom-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
        repeatRefresh — valeurs relancées
      </p>
    </div>
  );
}

export function InnerParallaxDemo({ autoplay }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-ip-img",
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          ...(autoplay
            ? { duration: 3, repeat: -1, yoyo: true }
            : {
                scrollTrigger: {
                  trigger: root.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }),
        }
      );
    },
    { scope: root, dependencies: [autoplay], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="flex h-full items-center justify-center">
      <div className="relative h-36 w-52 overflow-hidden rounded-lg border border-white/10">
        <div className="d-ip-img absolute -inset-y-8 inset-x-0 bg-gradient-to-b from-accent/50 via-[#8a63ff]/40 to-black" />
        <p className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/60">
          parallaxe interne
        </p>
      </div>
    </div>
  );
}

export function BorderGlowDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = root.current!.querySelector<HTMLElement>(".d-bg")!;
      const xTo = gsap.quickTo(el, "--gx", { duration: 0.3 });
      const yTo = gsap.quickTo(el, "--gy", { duration: 0.3 });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      el.addEventListener("mousemove", move);
      return () => el.removeEventListener("mousemove", move);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div
        data-hover
        className="d-bg relative rounded-xl p-px"
        style={{
          background:
            "radial-gradient(circle 90px at calc(var(--gx, -100) * 1px) calc(var(--gy, -100) * 1px), var(--accent), rgba(255,255,255,0.12) 70%)",
        }}
      >
        <div className="rounded-[11px] bg-[#0b0b0b] px-6 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
            bordure vivante
          </p>
          <p className="mt-1 text-[11px] text-white/50">
            Le glow suit le curseur le long du cadre.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ChatDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      tl.fromTo(
        ".d-chat",
        { y: 16, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.9,
          duration: 0.5,
          ease: "back.out(1.7)",
          transformOrigin: (i) => (i % 2 ? "bottom right" : "bottom left"),
        }
      ).to(".d-chat", { opacity: 0, y: -10, stagger: 0.08, duration: 0.4 }, "+=1.6");
    },
    { scope: root }
  );
  const msgs = [
    ["On veut un site qui impressionne.", false],
    ["Le catalogue a 337 effets prêts.", true],
    ["Et pour le motion ? Parlons-en.", false],
  ];
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-2 px-6">
      {msgs.map(([m, right], i) => (
        <div
          key={i}
          className={`d-chat max-w-[75%] rounded-xl px-3 py-2 text-[10px] leading-relaxed ${
            right
              ? "self-end rounded-br-sm bg-accent text-black"
              : "self-start rounded-bl-sm border border-white/10 bg-white/[0.06] text-white/70"
          }`}
        >
          {m}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vague 200 — composants UI supplémentaires                          */
/* ------------------------------------------------------------------ */

export function CmdPaletteDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const items = ["Accueil", "Projets", "Journal", "Contact", "Tarifs"];
  const shown = items.filter((i) =>
    i.toLowerCase().includes(q.toLowerCase())
  );
  useGSAP(
    () => {
      if (!open) return;
      gsap.fromTo(
        ".d-cmd",
        { y: -14, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" }
      );
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center">
      <button
        data-hover
        onClick={() => setOpen(true)}
        className="rounded-lg border border-white/15 px-4 py-2 font-mono text-xs text-white/60"
      >
        ⌘K — palette
      </button>
      {open && (
        <div className="absolute inset-0 z-10 pt-6">
          <button
            aria-label="Fermer"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="d-cmd relative mx-auto w-[85%] rounded-xl border border-white/15 bg-[#101010] p-2 shadow-2xl">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
              placeholder="rechercher…"
              aria-label="Rechercher une action"
              className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs outline-none placeholder:text-white/25 focus:border-accent"
            />
            <ul className="mini-scroll mt-2 max-h-24 space-y-0.5 overflow-y-auto">
              {shown.map((i) => (
                <li key={i}>
                  <button
                    data-hover
                    onClick={() => setOpen(false)}
                    className="w-full rounded-md px-3 py-1.5 text-left font-mono text-[10px] text-white/60 hover:bg-accent/15 hover:text-accent"
                  >
                    {i}
                  </button>
                </li>
              ))}
              {shown.length === 0 && (
                <li className="px-3 py-2 font-mono text-[10px] text-white/30">
                  aucun résultat
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function TabsDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const move = useRef<(el: HTMLElement) => void>(() => {});
  useGSAP(
    () => {
      const u = root.current!.querySelector<HTMLElement>(".d-tab-u")!;
      const xTo = gsap.quickTo(u, "x", { duration: 0.4, ease: "power3.out" });
      const wTo = gsap.quickTo(u, "width", {
        duration: 0.4,
        ease: "power3.out",
      });
      move.current = (el) => {
        xTo(el.offsetLeft);
        wTo(el.offsetWidth);
      };
      const first = root.current!.querySelector<HTMLElement>(".d-tab")!;
      gsap.set(u, { x: first.offsetLeft, width: first.offsetWidth });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative flex gap-1 rounded-full border border-white/10 bg-black/40 p-1">
        <span className="d-tab-u absolute bottom-1 top-1 rounded-full bg-accent/15" />
        {["Aperçu", "Code", "Réglages"].map((t, i) => (
          <button
            key={t}
            data-hover
            onClick={(e) => {
              setIdx(i);
              move.current(e.currentTarget);
            }}
            className={`d-tab relative rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
              idx === i ? "text-accent" : "text-white/50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RangeFillDemo() {
  const root = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const onInput = (v: number) => {
    gsap.set(fill.current, { scaleX: v / 100 });
    gsap.set(bubble.current, { left: `${v}%` });
    if (bubble.current) bubble.current.textContent = String(v);
  };
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="relative w-full">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            ref={fill}
            className="h-full w-full origin-left scale-x-[0.4] rounded-full bg-accent"
          />
        </div>
        <span
          ref={bubble}
          className="absolute -top-7 -translate-x-1/2 rounded-md bg-accent px-1.5 py-0.5 font-mono text-[9px] font-bold text-black"
          style={{ left: "40%" }}
        >
          40
        </span>
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={40}
          aria-label="Valeur"
          onChange={(e) => onInput(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}

export function OtpDemo() {
  const root = useRef<HTMLDivElement>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [v, setV] = useState("");
  useGSAP(
    (_, contextSafe) => {
      const done =
        contextSafe?.(() =>
          gsap.fromTo(
            ".d-otp",
            { scale: 1.2 },
            { scale: 1, duration: 0.35, stagger: 0.05, ease: "back.out(2)" }
          )
        ) ?? (() => {});
      if (v.length === 4) done();
    },
    { scope: root, dependencies: [v] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            value={v[i] ?? ""}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Chiffre ${i + 1}`}
            onChange={(e) => {
              const c = e.target.value.replace(/\D/g, "").slice(-1);
              const next = (v.slice(0, i) + c).padEnd(i, "").slice(0, 4);
              setV(next);
              if (c && i < 3) inputs.current[i + 1]?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                if (!v[i] && i > 0) {
                  setV(v.slice(0, i - 1));
                  inputs.current[i - 1]?.focus();
                } else setV(v.slice(0, i) + v.slice(i + 1));
              }
            }}
            className="d-otp h-11 w-10 rounded-lg border border-white/15 bg-black/40 text-center font-mono text-lg font-bold text-accent outline-none focus:border-accent"
          />
        ))}
      </div>
    </div>
  );
}

export function ChipInputDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [chips, setChips] = useState(["motion", "scroll"]);
  const [val, setVal] = useState("");
  const flip = useRef<ReturnType<typeof Flip.getState> | null>(null);
  useGSAP(
    () => {
      if (!flip.current) return;
      Flip.from(flip.current, { duration: 0.4, ease: "power2.out" });
      flip.current = null;
    },
    { scope: root, dependencies: [chips] }
  );
  const snap = () =>
    (flip.current = Flip.getState(
      root.current!.querySelectorAll(".d-chip")
    ));
  return (
    <div ref={root} className="grid h-full place-items-center px-4">
      <div className="w-full max-w-[260px] rounded-xl border border-white/15 bg-black/40 p-2">
        <div className="flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <button
              key={c}
              data-hover
              onClick={() => {
                snap();
                setChips((s) => s.filter((x) => x !== c));
              }}
              className="d-chip rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[9px] text-accent"
            >
              {c} ×
            </button>
          ))}
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && val.trim()) {
                snap();
                setChips((s) => [...s, val.trim()]);
                setVal("");
              }
            }}
            placeholder="+ tag ↵"
            aria-label="Ajouter un tag"
            className="min-w-[70px] flex-1 bg-transparent px-2 py-1 font-mono text-[10px] outline-none placeholder:text-white/25"
          />
        </div>
      </div>
    </div>
  );
}

export function CopyBtnDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  useGSAP(
    (_, contextSafe) => {
      const pop =
        contextSafe?.(() =>
          gsap.fromTo(
            ".d-copy",
            { scale: 0.85 },
            { scale: 1, duration: 0.4, ease: "back.out(3)" }
          )
        ) ?? (() => {});
      if (copied) pop();
    },
    { scope: root, dependencies: [copied] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button
        data-hover
        onClick={() => {
          navigator.clipboard?.writeText("npm i gsap").catch(() => {});
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
        className="d-copy flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 font-mono text-xs text-white/70"
      >
        <span className={copied ? "text-accent" : ""}>
          {copied ? "✓ copié" : "⧉ npm i gsap"}
        </span>
      </button>
    </div>
  );
}

export function LoadBarDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const bar = root.current!.querySelector(".d-load");
      const pct = root.current!.querySelector(".d-load-p");
      root.current!.addEventListener(
        "click",
        contextSafe?.(() => {
          const o = { v: 0 };
          gsap.to(o, {
            v: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              gsap.set(bar, { scaleX: o.v / 100 });
              if (pct) pct.textContent = `${Math.round(o.v)}%`;
            },
          });
        }) ?? (() => {})
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="grid h-full cursor-pointer place-items-center px-8">
      <div className="w-full">
        <div className="flex justify-between font-mono text-[9px] text-white/40">
          <span>cliquer pour charger</span>
          <span className="d-load-p text-accent">0%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="d-load h-full w-full origin-left scale-x-0 rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}

export function AvatarFanDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const open =
        contextSafe?.(() =>
          gsap.to(".d-av", {
            x: (i) => i * 34 - 68,
            duration: 0.5,
            ease: "back.out(2)",
          })
        ) ?? (() => {});
      const close =
        contextSafe?.(() =>
          gsap.to(".d-av", {
            x: (i) => i * -12,
            duration: 0.4,
            ease: "power3.out",
          })
        ) ?? (() => {});
      root.current!.addEventListener("mouseenter", open);
      root.current!.addEventListener("mouseleave", close);
      return () => {
        root.current?.removeEventListener("mouseenter", open);
        root.current?.removeEventListener("mouseleave", close);
      };
    },
    { scope: root }
  );
  const colors = ["#0ae448", "#ff4d6d", "#4da3ff", "#c17bff", "#ffb84d"];
  return (
    <div ref={root} data-hover className="grid h-full place-items-center">
      <div className="relative flex h-12 items-center">
        {colors.map((c, i) => (
          <span
            key={c}
            className="d-av absolute grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border-2 border-[#0b0b0b] font-mono text-[10px] font-bold text-black"
            style={{ background: c, left: "50%", zIndex: i }}
          >
            {String.fromCharCode(65 + i)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BadgeBumpDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(2);
  useGSAP(
    (_, contextSafe) => {
      const bump =
        contextSafe?.(() =>
          gsap.fromTo(
            ".d-badge",
            { scale: 1.6 },
            { scale: 1, duration: 0.45, ease: "elastic.out(1,0.4)" }
          )
        ) ?? (() => {});
      bump();
    },
    { scope: root, dependencies: [n] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button
        data-hover
        onClick={() => setN((x) => x + 1)}
        className="relative rounded-xl border border-white/15 px-5 py-3 font-mono text-xs text-white/70"
      >
        boîte
        <span className="d-badge absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-accent px-1 font-mono text-[10px] font-bold text-black">
          {n}
        </span>
      </button>
    </div>
  );
}

export function DropdownDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      if (!open) return;
      gsap.fromTo(
        ".d-drop",
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, ease: "power3.out" }
      );
      gsap.fromTo(
        ".d-drop-item",
        { y: -6, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.25, ease: "power2.out" }
      );
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative">
        <button
          data-hover
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border border-white/15 px-4 py-2 font-mono text-xs text-white/70"
        >
          menu {open ? "▴" : "▾"}
        </button>
        {open && (
          <ul className="d-drop absolute left-1/2 top-full z-10 mt-2 w-36 -translate-x-1/2 rounded-xl border border-white/15 bg-[#101010] p-1.5 shadow-2xl">
            {["Profil", "Réglages", "Facturation", "Déconnexion"].map((i) => (
              <li key={i} className="d-drop-item">
                <button
                  data-hover
                  onClick={() => setOpen(false)}
                  className="w-full rounded-md px-3 py-1.5 text-left font-mono text-[10px] text-white/60 hover:bg-accent/15 hover:text-accent"
                >
                  {i}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function MiniCarouselDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const n = 4;
  useGSAP(
    () => {
      gsap.to(".d-car-track", {
        xPercent: -100 * i,
        duration: 0.55,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        ".d-car-count",
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 }
      );
    },
    { scope: root, dependencies: [i] }
  );
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-3 px-8">
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="d-car-track flex will-change-transform">
          {[0, 1, 2, 3].map((s) => (
            <div
              key={s}
              className={`grid h-20 w-full shrink-0 place-items-center font-mono text-xs ${
                s % 2 ? "bg-accent/10 text-accent" : "bg-white/[0.04] text-white/50"
              }`}
            >
              SLIDE_{s + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button data-hover onClick={() => setI((x) => (x - 1 + n) % n)} className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-white/60" aria-label="Précédent">←</button>
        <span className="d-car-count font-mono text-[10px] text-accent">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button data-hover onClick={() => setI((x) => (x + 1) % n)} className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-white/60" aria-label="Suivant">→</button>
      </div>
    </div>
  );
}

export function QtyStepperDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState(1);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-qty",
        { yPercent: -80, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    },
    { scope: root, dependencies: [q] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="flex items-center gap-3 rounded-full border border-white/15 px-2 py-1.5">
        <button data-hover aria-label="Moins" onClick={() => setQ((x) => Math.max(0, x - 1))} className="grid h-7 w-7 place-items-center rounded-full border border-white/15 font-mono text-xs text-white/60">−</button>
        <span className="w-8 overflow-hidden text-center">
          <span key={q} className="d-qty block font-mono text-sm font-bold text-accent">{q}</span>
        </span>
        <button data-hover aria-label="Plus" onClick={() => setQ((x) => Math.min(9, x + 1))} className="grid h-7 w-7 place-items-center rounded-full border border-white/15 font-mono text-xs text-white/60">+</button>
      </div>
    </div>
  );
}

export function SubmitStateDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "load" | "done">("idle");
  useGSAP(
    (_, contextSafe) => {
      if (phase === "load") {
        gsap.to(".d-sub-spin", { rotation: 360, repeat: -1, duration: 0.8, ease: "none" });
        const t = window.setTimeout(
          contextSafe?.(() => setPhase("done")) ?? (() => {}),
          1500
        );
        return () => window.clearTimeout(t);
      }
      if (phase === "done") {
        gsap.fromTo(".d-sub-ok", { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
        const t = window.setTimeout(() => setPhase("idle"), 1500);
        return () => window.clearTimeout(t);
      }
    },
    { scope: root, dependencies: [phase], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button
        data-hover
        onClick={() => phase === "idle" && setPhase("load")}
        className={`w-36 rounded-full px-4 py-2.5 font-mono text-xs font-bold transition-colors ${
          phase === "done" ? "bg-accent text-black" : "border border-accent/50 text-accent"
        }`}
      >
        {phase === "idle" && "envoyer"}
        {phase === "load" && (
          <span className="d-sub-spin inline-block h-3.5 w-3.5 rounded-full border-2 border-accent border-t-transparent" />
        )}
        {phase === "done" && <span className="d-sub-ok inline-block">✓ reçu</span>}
      </button>
    </div>
  );
}

export function BannerDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);
  useGSAP(
    () => {
      if (show)
        gsap.fromTo(
          ".d-banner",
          { yPercent: -110 },
          { yPercent: 0, duration: 0.6, ease: "power4.out" }
        );
    },
    { scope: root, dependencies: [show] }
  );
  return (
    <div ref={root} className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden">
      {show ? (
        <div className="d-banner absolute inset-x-4 top-3 flex items-center justify-between rounded-lg bg-accent px-3 py-2 font-mono text-[10px] font-bold text-black">
          <span>−30% cette semaine ✦</span>
          <button
            data-hover
            aria-label="Fermer la bannière"
            onClick={() => {
              gsap.to(".d-banner", {
                yPercent: -120,
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => setShow(false),
              });
            }}
          >
            ×
          </button>
        </div>
      ) : (
        <button
          data-hover
          onClick={() => setShow(true)}
          className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] text-white/50"
        >
          rejouer
        </button>
      )}
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
        bandeau promo
      </p>
    </div>
  );
}

export function PlayMorphDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(true);
  useGSAP(
    (_, contextSafe) => {
      const to =
        contextSafe?.(() =>
          gsap.to(".d-play", {
            morphSVG: play
              ? "M5 3 L15 8 L5 13 Z"
              : "M4 3 H16 V13 H4 Z",
            duration: 0.45,
            ease: "power2.inOut",
          })
        ) ?? (() => {});
      to();
    },
    { scope: root, dependencies: [play] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button
        data-hover
        aria-label={play ? "Stop" : "Lecture"}
        onClick={() => setPlay((p) => !p)}
        className="grid h-14 w-14 place-items-center rounded-full border border-accent/40 bg-accent/10"
      >
        <svg viewBox="0 0 18 16" className="h-5 w-5">
          <path className="d-play" d="M5 3 L15 8 L5 13 Z" fill="var(--accent, #0ae448)" />
        </svg>
      </button>
    </div>
  );
}

export function PwdEyeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-eye-slash", {
        drawSVG: show ? "100% 0%" : "0% 100%",
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.fromTo(".d-pwd", { opacity: 0 }, { opacity: 1, duration: 0.3 });
    },
    { scope: root, dependencies: [show] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6">
      <div className="flex w-full max-w-[220px] items-center rounded-lg border border-white/15 bg-black/40 px-3 py-2">
        <input
          type={show ? "text" : "password"}
          defaultValue="s3cr3t!"
          readOnly
          aria-label="Mot de passe"
          className="d-pwd w-full bg-transparent font-mono text-xs text-accent outline-none"
        />
        <button
          data-hover
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Masquer" : "Afficher"}
          className="ml-2 shrink-0 text-white/50"
        >
          <svg viewBox="0 0 20 14" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 7 C5 1 15 1 19 7 C15 13 5 13 1 7 Z" />
            <circle cx="10" cy="7" r="2.5" />
            <line className="d-eye-slash" x1="3" y1="12" x2="17" y2="2" stroke="#0ae448" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function FormShakeDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const shake =
        contextSafe?.(() => {
          gsap.fromTo(
            ".d-form",
            { x: -8 },
            { x: 0, duration: 0.5, ease: "elastic.out(1,0.25)" }
          );
          gsap.fromTo(
            ".d-form input",
            { borderColor: "#ff4d6d" },
            { borderColor: "rgba(255,255,255,0.15)", duration: 1, ease: "power2.out" }
          );
        }) ?? (() => {});
      const btn = root.current!.querySelector(".d-form-btn")!;
      btn.addEventListener("click", shake);
      return () => btn.removeEventListener("click", shake);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="d-form flex w-full max-w-[240px] gap-2">
        <input
          placeholder="email — laisse vide"
          aria-label="Email"
          className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 font-mono text-[11px] outline-none"
        />
        <button
          data-hover
          className="d-form-btn shrink-0 rounded-lg bg-accent px-3 py-2 font-mono text-[10px] font-bold text-black"
        >
          OK
        </button>
      </div>
    </div>
  );
}

/* ---------- hover ---------- */

export function BorderTraceDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const enter =
        contextSafe?.(() =>
          gsap.to(".d-trace", { drawSVG: "100%", duration: 0.6, ease: "power2.inOut" })
        ) ?? (() => {});
      const leave =
        contextSafe?.(() =>
          gsap.to(".d-trace", { drawSVG: "0%", duration: 0.4, ease: "power2.in" })
        ) ?? (() => {});
      gsap.set(".d-trace", { drawSVG: "0%" });
      const btn = root.current!.querySelector(".d-trace-btn")!;
      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);
      return () => {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button data-hover className="d-trace-btn relative px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        survoler
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 120 40" preserveAspectRatio="none">
          <rect className="d-trace" x="1" y="1" width="118" height="38" rx="8" fill="none" stroke="var(--accent, #0ae448)" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

export function CharFlipDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const flip =
        contextSafe?.(() =>
          gsap.fromTo(
            ".d-cf-char",
            { rotationX: 0 },
            { rotationX: 360, duration: 0.7, stagger: 0.04, ease: "power2.inOut", transformPerspective: 400 }
          )
        ) ?? (() => {});
      const el = root.current!.querySelector(".d-cf-word")!;
      el.addEventListener("mouseenter", flip);
      return () => el.removeEventListener("mouseenter", flip);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p data-hover className="d-cf-word cursor-default text-3xl font-black uppercase tracking-tight">
        {"Retourner".split("").map((c, i) => (
          <span key={i} className="d-cf-char inline-block will-change-transform">
            {c}
          </span>
        ))}
      </p>
    </div>
  );
}

export function HoverClipDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!;
      const enter =
        contextSafe?.(() =>
          gsap.to(".d-hc-top", { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power3.out" })
        ) ?? (() => {});
      const leave =
        contextSafe?.(() =>
          gsap.to(".d-hc-top", { clipPath: "inset(0 100% 0 0)", duration: 0.5, ease: "power3.in" })
        ) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full place-items-center overflow-hidden">
      <div className="grid h-24 w-40 place-items-center rounded-xl border border-white/15 bg-white/[0.04] font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        état normal
      </div>
      <div
        className="d-hc-top absolute grid h-24 w-40 place-items-center rounded-xl bg-accent font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        état actif
      </div>
    </div>
  );
}

export function ArrowSlideDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const enter =
        contextSafe?.(() => {
          gsap.to(".d-ar-arrow", { x: 10, duration: 0.35, ease: "power3.out" });
          gsap.to(".d-ar-txt", { x: 4, duration: 0.35, ease: "power3.out" });
          gsap.to(".d-ar-ghost", { x: 10, opacity: 1, duration: 0.35, ease: "power3.out" });
        }) ?? (() => {});
      const leave =
        contextSafe?.(() => {
          gsap.to(".d-ar-arrow", { x: 0, duration: 0.35, ease: "power3.out" });
          gsap.to(".d-ar-txt", { x: 0, duration: 0.35, ease: "power3.out" });
          gsap.to(".d-ar-ghost", { x: -10, opacity: 0, duration: 0.25 });
        }) ?? (() => {});
      const el = root.current!.querySelector(".d-ar")!;
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <a data-hover className="d-ar flex cursor-pointer items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.15em] text-accent">
        <span className="d-ar-txt">Découvrir</span>
        <span className="d-ar-ghost opacity-0">→</span>
        <span className="d-ar-arrow">→</span>
      </a>
    </div>
  );
}

export function UnderlineGrowDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const links = gsap.utils.toArray<HTMLElement>(".d-ul");
      const fns = links.map((l) => {
        const u = l.querySelector(".d-ul-bar")!;
        const enter =
          contextSafe?.(() =>
            gsap.to(u, { scaleX: 1, duration: 0.35, ease: "power3.out" })
          ) ?? (() => {});
        const leave =
          contextSafe?.(() =>
            gsap.to(u, { scaleX: 0, duration: 0.3, ease: "power2.in" })
          ) ?? (() => {});
        l.addEventListener("mouseenter", enter);
        l.addEventListener("mouseleave", leave);
        return [l, enter, leave] as const;
      });
      return () =>
        fns.forEach(([l, e, lv]) => {
          l.removeEventListener("mouseenter", e);
          l.removeEventListener("mouseleave", lv);
        });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center justify-center gap-6">
      {["studio", "projets", "contact"].map((l) => (
        <a key={l} data-hover className="d-ul relative cursor-pointer font-mono text-xs uppercase tracking-[0.2em] text-white/70">
          {l}
          <span className="d-ul-bar absolute -bottom-1.5 left-0 h-px w-full origin-center scale-x-0 bg-accent" />
        </a>
      ))}
    </div>
  );
}

export function TiltGlareDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const card = root.current!.querySelector<HTMLElement>(".d-tg-card")!;
      const glare = root.current!.querySelector<HTMLElement>(".d-tg-glare")!;
      const onMove =
        contextSafe?.((e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, { rotateY: nx * 10, rotateX: -ny * 10, duration: 0.4 });
          gsap.to(glare, { xPercent: nx * 60, yPercent: ny * 60, opacity: 0.7, duration: 0.4 });
        }) ?? (() => {});
      const onLeave =
        contextSafe?.(() => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1,0.5)" });
          gsap.to(glare, { opacity: 0, duration: 0.4 });
        }) ?? (() => {});
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center [perspective:600px]">
      <div data-hover className="d-tg-card relative h-24 w-40 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-transparent will-change-transform">
        <span className="d-tg-glare pointer-events-none absolute -inset-1/2 opacity-0" style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.35), transparent 60%)" }} />
        <span className="absolute inset-0 grid place-items-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">glare + tilt</span>
      </div>
    </div>
  );
}

export function DockDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const icons = gsap.utils.toArray<HTMLElement>(".d-dock");
      const onMove =
        contextSafe?.((e: MouseEvent) => {
          icons.forEach((ic) => {
            const r = ic.getBoundingClientRect();
            const d = Math.abs(e.clientX - (r.left + r.width / 2));
            const s = gsap.utils.clamp(1, 1.8, 1.8 - d / 90);
            gsap.to(ic, { scale: s, y: -(s - 1) * 14, duration: 0.2 });
          });
        }) ?? (() => {});
      const onLeave =
        contextSafe?.(() =>
          gsap.to(icons, { scale: 1, y: 0, duration: 0.4, ease: "power3.out" })
        ) ?? (() => {});
      root.current!.addEventListener("mousemove", onMove);
      root.current!.addEventListener("mouseleave", onLeave);
      return () => {
        root.current?.removeEventListener("mousemove", onMove);
        root.current?.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="flex h-full items-end justify-center pb-8">
      <div className="flex items-end gap-2 rounded-2xl border border-white/15 bg-black/40 px-3 py-2">
        {["◐", "▲", "◆", "●", "■", "✦"].map((c, i) => (
          <i
            key={i}
            className="d-dock not-italic grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-sm text-accent will-change-transform"
          >
            {c}
          </i>
        ))}
      </div>
    </div>
  );
}

/* ---------- click ---------- */

export function RippleDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const rip =
        contextSafe?.((e: MouseEvent) => {
          const el = root.current!;
          const r = el.getBoundingClientRect();
          const s = document.createElement("span");
          s.className = "pointer-events-none absolute rounded-full bg-accent/40";
          const d = Math.max(r.width, r.height) * 2;
          Object.assign(s.style, {
            left: `${e.clientX - r.left}px`,
            top: `${e.clientY - r.top}px`,
            width: `${d}px`,
            height: `${d}px`,
            translate: "-50% -50%",
          });
          el.appendChild(s);
          gsap.fromTo(
            s,
            { scale: 0, opacity: 0.8 },
            { scale: 1, opacity: 0, duration: 0.7, ease: "power2.out", onComplete: () => s.remove() }
          );
        }) ?? (() => {});
      root.current!.addEventListener("click", rip);
      return () => root.current?.removeEventListener("click", rip);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center overflow-hidden">
      <span className="pointer-events-none rounded-full border border-white/15 px-5 py-2 font-mono text-xs text-white/60">
        cliquer — ripple
      </span>
    </div>
  );
}

export function HoldConfirmDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  useGSAP(
    (_, contextSafe) => {
      const btn = root.current!.querySelector(".d-hold")!;
      let tw: gsap.core.Tween | undefined;
      const down =
        contextSafe?.(() => {
          setDone(false);
          tw = gsap.to(".d-hold-fill", {
            scaleX: 1,
            duration: 1.2,
            ease: "none",
            onComplete: () => setDone(true),
          });
        }) ?? (() => {});
      const up =
        contextSafe?.(() => {
          tw?.kill();
          gsap.to(".d-hold-fill", { scaleX: 0, duration: 0.25 });
        }) ?? (() => {});
      btn.addEventListener("pointerdown", down);
      btn.addEventListener("pointerup", up);
      btn.addEventListener("pointerleave", up);
      return () => {
        btn.removeEventListener("pointerdown", down);
        btn.removeEventListener("pointerup", up);
        btn.removeEventListener("pointerleave", up);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button data-hover className="d-hold relative select-none overflow-hidden rounded-full border border-accent/50 px-6 py-2.5 font-mono text-xs text-accent">
        <span className="d-hold-fill absolute inset-0 origin-left scale-x-0 bg-accent/25" />
        <span className="relative">{done ? "✓ confirmé" : "maintenir 1,2s"}</span>
      </button>
    </div>
  );
}

export function ConfettiDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const boom =
        contextSafe?.(() => {
          const el = root.current!;
          const r = el.getBoundingClientRect();
          const colors = ["#0ae448", "#ff4d6d", "#4da3ff", "#c17bff", "#ffb84d", "#fff"];
          for (let i = 0; i < 26; i++) {
            const p = document.createElement("span");
            p.className = "pointer-events-none absolute block";
            const w = gsap.utils.random(4, 7);
            Object.assign(p.style, {
              left: `${r.width / 2}px`,
              top: `${r.height / 2}px`,
              width: `${w}px`,
              height: `${w * 1.6}px`,
              background: colors[i % colors.length],
            });
            el.appendChild(p);
            gsap.to(p, {
              physics2D: {
                velocity: gsap.utils.random(120, 420),
                angle: gsap.utils.random(-160, -20),
                gravity: 600,
              },
              rotation: gsap.utils.random(-360, 360),
              opacity: 0,
              duration: gsap.utils.random(1, 1.6),
              onComplete: () => p.remove(),
            });
          }
        }) ?? (() => {});
      root.current!.addEventListener("click", boom);
      return () => root.current?.removeEventListener("click", boom);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center overflow-hidden">
      <span className="pointer-events-none font-mono text-xs uppercase tracking-[0.3em] text-white/40">
        cliquer 🎉
      </span>
    </div>
  );
}

export function SunMoonDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [sun, setSun] = useState(true);
  useGSAP(
    (_, contextSafe) => {
      const go =
        contextSafe?.(() => {
          gsap.to(".d-sm", {
            morphSVG: sun ? "M8 3 A5 5 0 1 0 13 8 A4 4 0 1 1 8 3 Z" : "M3 8 A5 5 0 1 0 13 8 A5 5 0 1 0 3 8 Z",
            duration: 0.6,
            ease: "power2.inOut",
          });
          gsap.to(".d-sm-rays", { opacity: sun ? 1 : 0, scale: sun ? 1 : 0.6, duration: 0.4, transformOrigin: "center" });
        }) ?? (() => {});
      go();
    },
    { scope: root, dependencies: [sun] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button data-hover aria-label="Basculer thème" onClick={() => setSun((s) => !s)} className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/[0.04]">
        <svg viewBox="0 0 16 16" className="h-6 w-6">
          <path className="d-sm" d="M3 8 A5 5 0 1 0 13 8 A5 5 0 1 0 3 8 Z" fill="var(--accent, #0ae448)" />
          <g className="d-sm-rays" stroke="var(--accent, #0ae448)" strokeWidth="1.2">
            {[0, 45, 90, 135].map((a) => (
              <line key={a} x1="1" y1="8" x2="3" y2="8" transform={`rotate(${a} 8 8)`} />
            ))}
          </g>
        </svg>
      </button>
    </div>
  );
}

export function BookmarkDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(false);
  useGSAP(
    (_, contextSafe) => {
      const pop =
        contextSafe?.(() => {
          gsap.fromTo(".d-bm", { scale: 0.7 }, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.4)" });
          gsap.to(".d-bm-path", { fillOpacity: saved ? 1 : 0, duration: 0.25 });
        }) ?? (() => {});
      pop();
    },
    { scope: root, dependencies: [saved] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button data-hover aria-label="Sauvegarder" onClick={() => setSaved((s) => !s)} className="grid h-12 w-12 place-items-center rounded-xl border border-white/15">
        <svg viewBox="0 0 16 20" className="d-bm h-6 w-6">
          <path
            className="d-bm-path"
            d="M3 2 H13 V18 L8 14 L3 18 Z"
            fill="var(--accent, #0ae448)"
            fillOpacity="0"
            stroke="var(--accent, #0ae448)"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  );
}

export function DownloadArcDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  useGSAP(
    (_, contextSafe) => {
      const go =
        contextSafe?.(() => {
          const check = root.current!.querySelector(".d-dl-check");
          if (check) gsap.set(check, { drawSVG: "0%" });
          gsap.fromTo(
            ".d-dl-arc",
            { drawSVG: "0%" },
            {
              drawSVG: "100%",
              duration: 1.6,
              ease: "power1.inOut",
              onComplete: () => setDone(true),
            }
          );
        }) ?? (() => {});
      const btn = root.current!.querySelector(".d-dl-btn")!;
      btn.addEventListener("click", go);
      return () => btn.removeEventListener("click", go);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button data-hover aria-label="Télécharger" className="d-dl-btn relative grid h-16 w-16 place-items-center rounded-full">
        <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <circle className="d-dl-arc" cx="32" cy="32" r="28" fill="none" stroke="var(--accent, #0ae448)" strokeWidth="2" />
        </svg>
        {done ? (
          <svg viewBox="0 0 20 20" className="h-5 w-5">
            <path className="d-dl-check" d="M4 10 L8 14 L16 5" fill="none" stroke="#0ae448" strokeWidth="2" />
          </svg>
        ) : (
          <span className="font-mono text-xs text-accent">↓</span>
        )}
      </button>
    </div>
  );
}

export function MultiSelectDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState<number[]>([0]);
  const pop = useRef<(() => void) | undefined>(undefined);
  useGSAP(
    (_, contextSafe) => {
      pop.current = contextSafe?.(() =>
        gsap.fromTo(".d-ms-on", { scale: 0.9 }, { scale: 1, duration: 0.35, ease: "back.out(3)" })
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full flex-wrap content-center items-center justify-center gap-1.5 px-6">
      {["GSAP", "SVG", "3D", "Canvas", "Audio"].map((t, i) => {
        const active = on.includes(i);
        return (
          <button
            key={t}
            data-hover
            onClick={() => {
              setOn((s) => (active ? s.filter((x) => x !== i) : [...s, i]));
              pop.current?.();
            }}
            className={`${active ? "d-ms-on border-accent bg-accent/15 text-accent" : "border-white/15 text-white/45"} rounded-full border px-3 py-1.5 font-mono text-[10px] transition-colors`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export function MuteWaveDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(false);
  useGSAP(
    () => {
      if (muted) {
        gsap.to(".d-mw", { scaleY: 0.06, duration: 0.4, ease: "power3.inOut", stagger: 0.03 });
      } else {
        gsap.to(".d-mw", {
          scaleY: () => gsap.utils.random(0.2, 1),
          duration: 0.25,
          repeat: -1,
          repeatRefresh: true,
          ease: "sine.inOut",
          stagger: { each: 0.06, yoyo: true, repeat: -1 },
        });
      }
    },
    { scope: root, dependencies: [muted], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button data-hover aria-label={muted ? "Activer le son" : "Couper le son"} onClick={() => setMuted((m) => !m)} className="flex h-16 items-end gap-1.5">
        {[0.5, 0.9, 1, 0.7, 0.4].map((h, i) => (
          <span key={i} className="d-mw block w-1.5 rounded-full bg-accent" style={{ height: `${h * 48}px` }} />
        ))}
      </button>
    </div>
  );
}

export function ExpandCardDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [big, setBig] = useState(false);
  const state = useRef<ReturnType<typeof Flip.getState> | null>(null);
  useGSAP(
    () => {
      if (!state.current) return;
      Flip.from(state.current, { duration: 0.5, ease: "power3.inOut", absolute: true });
      state.current = null;
    },
    { scope: root, dependencies: [big] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button
        data-hover
        onClick={() => {
          state.current = Flip.getState(root.current!.querySelectorAll(".d-ex"));
          setBig((b) => !b);
        }}
        className={`d-ex overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] text-left transition-colors ${
          big ? "w-52 p-4" : "w-28 p-2"
        }`}
      >
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">Module</p>
        {big && (
          <p className="mt-2 text-[10px] leading-relaxed text-white/50">
            Détails dépliés — la carte grandit avec Flip.fit sur les contenus.
          </p>
        )}
        <p className="mt-1 font-mono text-[9px] text-white/30">{big ? "réduire ×" : "déplier +"}</p>
      </button>
    </div>
  );
}

/* ---------- loop ---------- */

export function DotsLoaderDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-dot", {
        y: -10,
        duration: 0.35,
        stagger: { each: 0.12, yoyo: true, repeat: -1 },
        ease: "power2.inOut",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center justify-center gap-2">
      {[0, 1, 2].map((i) => (
        <span key={i} className="d-dot h-3 w-3 rounded-full bg-accent" />
      ))}
    </div>
  );
}

export function ShapeCycleDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const shapes = [
        "M30 4 A26 26 0 1 0 30 56 A26 26 0 1 0 30 4 Z",
        "M30 6 L54 50 L6 50 Z",
        "M30 4 L52 17 L52 43 L30 56 L8 43 L8 17 Z",
      ];
      const tl = gsap.timeline({ repeat: -1 });
      shapes.concat(shapes[0]).slice(1).forEach((d) => {
        tl.to(".d-cyc", { morphSVG: d, duration: 0.9, ease: "power2.inOut" }).to({}, { duration: 0.6 });
      });
      gsap.to(".d-cyc-svg", { rotation: 360, repeat: -1, duration: 14, ease: "none", transformOrigin: "center" });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg className="d-cyc-svg h-20 w-20" viewBox="0 0 60 60">
        <path className="d-cyc" d="M30 4 A26 26 0 1 0 30 56 A26 26 0 1 0 30 4 Z" fill="none" stroke="var(--accent, #0ae448)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function ShineTextDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-shine", {
        backgroundPosition: "200% 0",
        duration: 2.2,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p
        className="d-shine bg-clip-text text-3xl font-black uppercase tracking-tight text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(255,255,255,0.35) 40%, var(--accent, #0ae448) 50%, rgba(255,255,255,0.35) 60%)",
          backgroundSize: "200% 100%",
        }}
      >
        Reflet premium
      </p>
    </div>
  );
}

export function FloatBobDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".d-bob").forEach((el, i) => {
        gsap.to(el, {
          y: gsap.utils.random(-14, -6),
          rotation: gsap.utils.random(-8, 8),
          duration: gsap.utils.random(1.4, 2.2),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center justify-center gap-6">
      <span className="d-bob grid h-12 w-12 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">✦</span>
      <span className="d-bob grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/[0.05] font-mono text-[9px] text-white/50">HERO</span>
      <span className="d-bob grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/40">◆</span>
    </div>
  );
}

export function MatrixRainDemo() {
  const root = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  useGSAP(
    () => {
      const c = cv.current!;
      const ctx = c.getContext("2d")!;
      const w = (c.width = c.offsetWidth);
      const h = (c.height = c.offsetHeight);
      const cols = Math.floor(w / 14);
      const y = Array.from({ length: cols }, () => Math.random() * h);
      const glyphs = "01アイウエオ<>/✦";
      const tick = () => {
        if (root.current?.parentElement?.dataset.paused === "1") return;
        ctx.fillStyle = "rgba(5,5,5,0.16)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = "11px monospace";
        ctx.fillStyle = accentOf(root.current);
        for (let i = 0; i < cols; i++) {
          const g = glyphs[(Math.random() * glyphs.length) | 0];
          ctx.fillText(g, i * 14, y[i]);
          y[i] = y[i] > h + 20 ? 0 : y[i] + 14;
        }
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="h-full overflow-hidden">
      <canvas ref={cv} className="h-full w-full" />
    </div>
  );
}

export function RadarDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-radar-sweep", { rotation: 360, repeat: -1, duration: 3, ease: "none", transformOrigin: "50% 50%" });
      gsap.to(".d-radar-blip", {
        opacity: 0,
        scale: 1.8,
        duration: 1.4,
        repeat: -1,
        stagger: 0.7,
        ease: "power2.out",
        transformOrigin: "center",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 100 100" className="h-32 w-32">
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.12)" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.08)" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(255,255,255,0.08)" />
        <line className="d-radar-sweep" x1="50" y1="50" x2="50" y2="4" stroke="var(--accent, #0ae448)" strokeWidth="1.5" />
        <circle className="d-radar-blip" cx="66" cy="34" r="3" fill="var(--accent, #0ae448)" />
        <circle className="d-radar-blip" cx="36" cy="62" r="3" fill="var(--accent, #0ae448)" />
      </svg>
    </div>
  );
}

export function WaveCircleDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-wc", {
        scaleY: () => gsap.utils.random(0.15, 1),
        duration: 0.3,
        repeat: -1,
        repeatRefresh: true,
        ease: "sine.inOut",
        stagger: { each: 0.05, yoyo: true, repeat: -1 },
        transformOrigin: "center",
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 100 100" className="h-32 w-32">
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x1 = +(50 + Math.cos(a) * 26).toFixed(2);
          const y1 = +(50 + Math.sin(a) * 26).toFixed(2);
          const x2 = +(50 + Math.cos(a) * 42).toFixed(2);
          const y2 = +(50 + Math.sin(a) * 42).toFixed(2);
          return (
            <line key={i} className="d-wc" x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent, #0ae448)" strokeWidth="2" strokeLinecap="round" />
          );
        })}
      </svg>
    </div>
  );
}

export function GradientSpinDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-grad", { rotation: 360, repeat: -1, duration: 3, ease: "none" });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative h-20 w-20 overflow-hidden rounded-full p-[3px]">
        <div
          className="d-grad absolute inset-[-50%]"
          style={{ background: "conic-gradient(var(--accent, #0ae448), transparent 30%, transparent)" }}
        />
        <div className="relative grid h-full w-full place-items-center rounded-full bg-[#0b0b0b] font-mono text-[9px] text-accent">
          SYNC
        </div>
      </div>
    </div>
  );
}

/* ---------- scroll (scroller interne) ---------- */

// Progress helper for inner-scroller demos: p ∈ [0,1] of the scrollTop range.
const scrollP = (el: HTMLElement) =>
  el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);

export function ScaleTitleDemo() {
  const root = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <h3
        ref={title}
        className="pointer-events-none absolute left-1/2 top-10 z-10 origin-top -translate-x-1/2 whitespace-nowrap text-3xl font-black uppercase tracking-tight text-accent will-change-transform"
      >
        Zoom out
      </h3>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          gsap.set(title.current, { scale: 1.5 - p * 0.9, opacity: 1 - p * 0.55 });
        }}
        className="mini-scroll h-full space-y-3 overflow-y-auto px-6 pt-24"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="h-10 rounded-lg border border-white/10 bg-white/[0.04]" />
        ))}
      </div>
    </div>
  );
}

export function ScrubNumberDemo() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="flex h-full flex-col px-6 py-4">
      <div className="flex items-baseline justify-between font-mono text-[10px] text-white/40">
        <span>scroll → valeur</span>
        <span ref={num} className="text-3xl font-black tabular-nums text-accent">0</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-accent" />
      </div>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          gsap.set(bar.current, { scaleX: p });
          if (num.current) num.current.textContent = String(Math.round(p * 128));
        }}
        className="mini-scroll mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="rounded border border-white/10 bg-white/[0.04] px-2 py-1.5 font-mono text-[9px] text-white/40">
            data_{String(i + 1).padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ParallaxColsDemo() {
  const root = useRef<HTMLDivElement>(null);
  const speeds = [-30, -10, -50];
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <div
        onScroll={(e) => {
          const p = e.currentTarget.scrollTop;
          root.current!.querySelectorAll<HTMLElement>(".d-pc").forEach((c, i) =>
            gsap.set(c, { y: p * (speeds[i] / 100) })
          );
        }}
        className="mini-scroll grid h-full grid-cols-3 gap-2 overflow-y-auto px-4 py-3"
      >
        {[0, 1, 2].map((col) => (
          <div key={col} className="d-pc space-y-2 will-change-transform" style={{ paddingTop: col * 14 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={`h-12 rounded-lg border ${(i + col) % 3 ? "border-white/10 bg-white/[0.04]" : "border-accent/30 bg-accent/10"}`} />
            ))}
          </div>
        ))}
      </div>
      <p className="pointer-events-none absolute inset-x-0 bottom-1 text-center font-mono text-[9px] text-white/30">
        colonnes à vitesses différentes
      </p>
    </div>
  );
}

export function DividerGrowDemo() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const lbl = useRef<HTMLSpanElement>(null);
  return (
    <div ref={root} className="flex h-full flex-col justify-center px-6">
      <span ref={lbl} className="text-center font-mono text-[9px] uppercase tracking-[0.3em] text-accent opacity-0">
        chapitre II
      </span>
      <div className="my-3 h-px w-full bg-white/10">
        <div ref={line} className="h-full w-full origin-center scale-x-0 bg-accent" />
      </div>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          gsap.set(line.current, { scaleX: p });
          gsap.set(lbl.current, { opacity: p > 0.55 ? 1 : 0, y: p > 0.55 ? 0 : 6 });
        }}
        className="mini-scroll h-16 space-y-2 overflow-y-auto"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-6 rounded bg-white/[0.04]" />
        ))}
      </div>
      <p className="mt-2 text-center font-mono text-[9px] text-white/30">scroll pour tracer le filet</p>
    </div>
  );
}

export function FanScrollDemo() {
  const root = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="relative flex h-full flex-col items-center">
      <div ref={cards} className="relative mt-4 h-24 w-40">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="d-fan absolute inset-x-6 top-0 h-20 rounded-lg border border-white/20 bg-[#111] font-mono text-[9px] text-accent"
            style={{ transformOrigin: "bottom center" }}
          >
            <span className="p-1.5 block">CARD_{i + 1}</span>
          </div>
        ))}
      </div>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          root.current!.querySelectorAll<HTMLElement>(".d-fan").forEach((c, i) =>
            gsap.set(c, {
              rotation: (i - 2) * 9 * p,
              y: -6 * Math.abs(i - 2) * p,
            })
          );
        }}
        className="mini-scroll mt-4 h-14 w-40 space-y-2 overflow-y-auto"
      >
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="h-5 rounded bg-white/[0.05]" />
        ))}
      </div>
      <p className="mt-1 font-mono text-[9px] text-white/30">scroll → éventail</p>
    </div>
  );
}

export function MarqueeDirDemo() {
  const root = useRef<HTMLDivElement>(null);
  const last = useRef(0);
  useGSAP(
    () => {
      gsap.set(".d-md", { xPercent: 0 });
      const tw = gsap.to(".d-md", { xPercent: -50, repeat: -1, duration: 9, ease: "none" });
      (root.current as unknown as { __tw?: gsap.core.Tween }).__tw = tw;
    },
    { scope: root }
  );
  const items = ["direction", "✦", "scroll", "✦", "sens", "✦"];
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-2">
      <div className="overflow-hidden">
        <div className="d-md flex w-max whitespace-nowrap will-change-transform">
          {[0, 1].map((c) => (
            <div key={c} className="flex">
              {items.map((it, i) => (
                <span key={i} className="mx-3 font-mono text-xs uppercase text-white/50">{it}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        onScroll={(e) => {
          const el = e.currentTarget;
          const dir = Math.sign(el.scrollTop - last.current) || 1;
          last.current = el.scrollTop;
          const tw = (root.current as unknown as { __tw?: gsap.core.Tween }).__tw;
          if (tw) gsap.to(tw, { timeScale: dir * 1.6, duration: 0.4 });
        }}
        className="mini-scroll h-14 space-y-2 overflow-y-auto px-6"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-5 rounded bg-white/[0.05]" />
        ))}
      </div>
      <p className="text-center font-mono text-[9px] text-white/30">↓ avant · ↑ arrière</p>
    </div>
  );
}

export function ZoomSectionDemo() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <div ref={panel} className="absolute inset-6 grid place-items-center rounded-2xl border border-accent/40 bg-accent/10 will-change-transform">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">SECTION</span>
      </div>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          const s = 0.75 + Math.sin(p * Math.PI) * 0.3;
          gsap.set(panel.current, { scale: s, opacity: 0.5 + Math.sin(p * Math.PI) * 0.5 });
        }}
        className="mini-scroll relative h-full space-y-3 overflow-y-auto px-8 py-4"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="h-9 rounded-lg border border-white/10" />
        ))}
      </div>
    </div>
  );
}

export function ImgRotateInDemo() {
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="flex h-full flex-col px-6 py-3">
      <div className="overflow-hidden rounded-xl">
        <div
          ref={img}
          className="grid h-24 place-items-center bg-gradient-to-br from-accent/30 to-accent/5 font-mono text-[10px] text-accent will-change-transform"
          style={{ transform: "rotate(8deg) scale(0.8)", opacity: 0.3 }}
        >
          IMG_ROLL
        </div>
      </div>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          gsap.set(img.current, { rotation: (1 - p) * 14, scale: 0.65 + p * 0.35, opacity: 0.2 + p * 0.8 });
        }}
        className="mini-scroll mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="h-5 rounded bg-white/[0.05]" />
        ))}
      </div>
    </div>
  );
}

export function VelocityScaleDemo() {
  const root = useRef<HTMLDivElement>(null);
  const el = useRef<HTMLDivElement>(null);
  const last = useRef(0);
  const v = useRef(0);
  useGSAP(
    () => {
      const tick = () => {
        v.current *= 0.9;
        gsap.set(el.current, { scaleY: 1 + Math.min(0.5, Math.abs(v.current) / 200), scaleX: 1 - Math.min(0.15, Math.abs(v.current) / 800) });
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full flex-col items-center px-8 py-3">
      <div ref={el} className="grid h-14 w-28 place-items-center rounded-xl border border-accent/40 bg-accent/10 font-mono text-[9px] text-accent will-change-transform">
        stretch
      </div>
      <div
        onScroll={(e) => {
          v.current = e.currentTarget.scrollTop - last.current;
          last.current = e.currentTarget.scrollTop;
        }}
        className="mini-scroll mt-3 w-full flex-1 space-y-2 overflow-y-auto"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="h-5 rounded bg-white/[0.05]" />
        ))}
      </div>
    </div>
  );
}

export function ClipCornerDemo() {
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="flex h-full flex-col px-6 py-3">
      <div
        ref={img}
        className="grid h-24 place-items-center rounded-xl bg-gradient-to-tr from-accent/25 to-white/[0.06] font-mono text-[10px] text-accent will-change-transform"
        style={{ clipPath: "inset(30% 20% 30% 20% round 12px)" }}
      >
        IMG_CORNER
      </div>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          const v = (1 - p) * 30;
          const h = (1 - p) * 20;
          gsap.set(img.current, { clipPath: `inset(${v}% ${h}% ${v}% ${h}% round 12px)` });
        }}
        className="mini-scroll mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="h-5 rounded bg-white/[0.05]" />
        ))}
      </div>
    </div>
  );
}

/* ---------- media ---------- */

export function ImgLoadDemo() {
  const root = useRef<HTMLDivElement>(null);
  const play = useRef<(() => void) | undefined>(undefined);
  useGSAP(
    (_, contextSafe) => {
      play.current = contextSafe?.(() => {
        gsap.fromTo(
          ".d-il",
          { filter: "blur(14px)", opacity: 0.35, scale: 1.06 },
          { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" }
        );
      });
      play.current?.();
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div className="d-il grid h-20 w-40 place-items-center rounded-xl bg-gradient-to-br from-accent/30 to-white/[0.05] font-mono text-[10px] text-accent">
          IMG_HQ.RAW
        </div>
        <button data-hover onClick={() => play.current?.()} className="mt-3 rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] text-white/50">
          rejouer le chargement
        </button>
      </div>
    </div>
  );
}

export function PhotoShuffleDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState([0, 1, 2]);
  useGSAP(
    (_, contextSafe) => {
      const shuffle =
        contextSafe?.(() => {
          const top = root.current!.querySelector(".d-ps-0")!;
          gsap.to(top, {
            x: 90,
            rotation: 12,
            duration: 0.35,
            ease: "power2.in",
            onComplete: () => {
              setOrder((o) => [o[1], o[2], o[0]]);
              gsap.set(top, { x: 0, rotation: 0 });
            },
          });
        }) ?? (() => {});
      root.current!.addEventListener("click", shuffle);
      return () => root.current?.removeEventListener("click", shuffle);
    },
    { scope: root }
  );
  const labels = ["NUIT", "BRUME", "AUBE"];
  const colors = ["from-accent/40", "from-[#4da3ff]/40", "from-[#ff4d6d]/40"];
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center">
      {order.map((id, pos) => (
        <div
          key={id}
          className={`d-ps-${pos} absolute h-24 w-36 rounded-xl border border-white/20 bg-gradient-to-br ${colors[id]} to-transparent font-mono text-[9px] text-white/60 will-change-transform`}
          style={{ transform: `rotate(${(pos - 1) * 5}deg) translateY(${pos * -3}px)`, zIndex: 3 - pos }}
        >
          <span className="p-2 block">{labels[id]}_{id}.RAW</span>
        </div>
      ))}
    </div>
  );
}

export function MaskShapeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const star = (r: number) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const rr = i % 2 ? r * 0.45 : r;
      const px = +(50 + Math.cos(a) * rr).toFixed(2);
      const py = +(50 + Math.sin(a) * rr).toFixed(2);
      return `${px}% ${py}%`;
    });
    return `polygon(${pts.join(",")})`;
  };
  return (
    <div ref={root} className="flex h-full flex-col px-6 py-3">
      <div
        ref={img}
        className="grid h-24 place-items-center rounded-xl bg-gradient-to-tr from-accent/35 to-[#4da3ff]/25 font-mono text-[10px] text-white/80 will-change-transform"
        style={{ clipPath: star(8) }}
      >
        ★
      </div>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          gsap.set(img.current, { clipPath: star(8 + p * 160) });
        }}
        className="mini-scroll mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="h-5 rounded bg-white/[0.05]" />
        ))}
      </div>
    </div>
  );
}

export function ThumbNavDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const grad = ["from-accent/40", "from-[#4da3ff]/40", "from-[#c17bff]/40"];
  useGSAP(
    () => {
      gsap.fromTo(".d-tn-main", { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
    },
    { scope: root, dependencies: [idx] }
  );
  return (
    <div ref={root} className="flex h-full flex-col items-center justify-center gap-3 px-8">
      <div key={idx} className={`d-tn-main grid h-20 w-44 place-items-center rounded-xl border border-white/15 bg-gradient-to-br ${grad[idx]} to-transparent font-mono text-[10px] text-white/70`}>
        IMG_{idx + 1}
      </div>
      <div className="flex gap-2">
        {grad.map((g, i) => (
          <button
            key={i}
            data-hover
            aria-label={`Image ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-9 w-12 rounded-lg border bg-gradient-to-br ${g} to-transparent transition-all ${
              idx === i ? "border-accent scale-105" : "border-white/15 opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function PanDragDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const d = Draggable.create(".d-pan", {
        type: "x,y",
        bounds: root.current!.querySelector(".d-pan-frame"),
        inertia: true,
        edgeResistance: 0.8,
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="d-pan-frame relative h-28 w-52 overflow-hidden rounded-xl border border-white/15">
        <div data-hover className="d-pan absolute -inset-14 grid cursor-grab place-items-center bg-gradient-to-br from-accent/25 via-white/[0.03] to-[#4da3ff]/25 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 active:cursor-grabbing">
          carte — dragge pour explorer
        </div>
      </div>
    </div>
  );
}

export function MosaicRevealDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      tl.to(".d-mos", {
        opacity: 0,
        duration: 0.45,
        stagger: { each: 0.06, from: "random" },
        ease: "power2.out",
      }).to(".d-mos", { opacity: 1, duration: 0.45, stagger: { each: 0.06, from: "random" } }, "+=0.8");
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative h-24 w-40 overflow-hidden rounded-xl">
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-accent/35 to-[#c17bff]/25 font-mono text-[10px] text-white/80">
          IMG_MOSAÏC
        </div>
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="d-mos bg-[#0b0b0b]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScrubFiltersDemo() {
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="flex h-full flex-col px-6 py-3">
      <div
        ref={img}
        className="grid h-24 place-items-center rounded-xl bg-gradient-to-br from-accent/35 to-[#ffb84d]/25 font-mono text-[10px] text-white/80"
        style={{ filter: "grayscale(1) blur(6px)" }}
      >
        IMG_COLOR
      </div>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          gsap.set(img.current, { filter: `grayscale(${1 - p}) blur(${(1 - p) * 6}px)` });
        }}
        className="mini-scroll mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="h-5 rounded bg-white/[0.05]" />
        ))}
      </div>
    </div>
  );
}

/* ---------- drag ---------- */

export function SwipeDeleteDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(["facture.pdf", "contrat_v2", "logo_final"]);
  useGSAP(
    () => {
      const ds = gsap.utils.toArray<HTMLElement>(".d-sd").map((row) =>
        Draggable.create(row, {
          type: "x",
          bounds: { minX: -80, maxX: 0 },
          onDrag() {
            gsap.set(row.querySelector(".d-sd-hint"), {
              opacity: Math.min(1, -this.x / 60),
            });
          },
          onDragEnd() {
            if (this.x < -55) {
              gsap.to(row, {
                x: -140,
                opacity: 0,
                duration: 0.35,
                ease: "power2.in",
                onComplete: () => {
                  const k = row.dataset.k;
                  gsap.set(row, { x: 0, opacity: 1 });
                  setRows((r) => r.filter((x) => x !== k));
                },
              });
            } else {
              gsap.to(row, { x: 0, duration: 0.4, ease: "elastic.out(1,0.6)" });
            }
          },
        })[0]
      );
      return () => ds.forEach((d) => d.kill());
    },
    { scope: root, dependencies: [rows], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-2 px-6">
      {rows.map((r) => (
        <div key={r} data-k={r} data-hover className="d-sd relative cursor-grab overflow-hidden rounded-lg border border-white/10 bg-[#101010] will-change-transform active:cursor-grabbing">
          <p className="px-3 py-2 font-mono text-[10px] text-white/60">{r}</p>
          <span className="d-sd-hint absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#ff4d6d] opacity-0">
            ✕ suppr.
          </span>
        </div>
      ))}
      {rows.length === 0 && (
        <p className="text-center font-mono text-[10px] text-white/30">tout est supprimé</p>
      )}
      <p className="text-center font-mono text-[9px] text-white/30">← tire une ligne à gauche</p>
    </div>
  );
}

export function SplitterDemo() {
  const root = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const frame = root.current!.querySelector<HTMLElement>(".d-split")!;
      const handle = root.current!.querySelector<HTMLElement>(".d-split-h")!;
      const d = Draggable.create(handle, {
        type: "x",
        bounds: { minX: -frame.clientWidth * 0.3, maxX: frame.clientWidth * 0.3 },
        onDrag() {
          const w = frame.clientWidth;
          gsap.set(left.current, { width: `${50 + (this.x / w) * 100}%` });
          gsap.set(handle, { x: 0 });
        },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="d-split relative flex h-24 w-full overflow-hidden rounded-xl border border-white/15">
        <div ref={left} className="grid w-1/2 place-items-center bg-accent/10 font-mono text-[9px] text-accent">ÉDITEUR</div>
        <div className="grid flex-1 place-items-center bg-white/[0.04] font-mono text-[9px] text-white/30">APERÇU</div>
        <div
          data-hover
          className="d-split-h absolute left-1/2 top-0 z-10 h-full w-2 -translate-x-1/2 cursor-col-resize bg-accent/70"
        />
      </div>
    </div>
  );
}

export function TinderDemo() {
  const root = useRef<HTMLDivElement>(null);
  const cards = ["MOTION", "EDITORIAL", "3D"];
  const [i, setI] = useState(0);
  useGSAP(
    () => {
      const el = root.current!.querySelector<HTMLElement>(".d-tin");
      if (!el) return;
      const d = Draggable.create(el, {
        type: "x,y",
        onDrag() {
          gsap.set(el, { rotation: this.x * 0.08 });
          gsap.set(el.querySelector(".d-tin-like"), { opacity: Math.max(0, this.x / 70) });
          gsap.set(el.querySelector(".d-tin-nope"), { opacity: Math.max(0, -this.x / 70) });
        },
        onDragEnd() {
          if (Math.abs(this.x) > 70) {
            gsap.to(el, {
              x: this.x * 4,
              opacity: 0,
              rotation: this.x * 0.3,
              duration: 0.4,
              ease: "power2.in",
              onComplete: () => setI((v) => v + 1),
            });
          } else {
            gsap.to(el, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
            gsap.set([el.querySelector(".d-tin-like"), el.querySelector(".d-tin-nope")], { opacity: 0 });
          }
        },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root, dependencies: [i], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      {i < cards.length ? (
        <div key={i} data-hover className="d-tin relative grid h-28 w-40 cursor-grab place-items-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-transparent font-mono text-xs font-bold text-white/80 will-change-transform active:cursor-grabbing">
          {cards[i]}
          <span className="d-tin-like absolute left-2 top-2 rounded border-2 border-accent px-1.5 font-mono text-[10px] text-accent opacity-0" style={{ transform: "rotate(-12deg)" }}>LIKE</span>
          <span className="d-tin-nope absolute right-2 top-2 rounded border-2 border-[#ff4d6d] px-1.5 font-mono text-[10px] text-[#ff4d6d] opacity-0" style={{ transform: "rotate(12deg)" }}>NOPE</span>
        </div>
      ) : (
        <button data-hover onClick={() => setI(0)} className="rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] text-white/50">
          pile terminée — rejouer
        </button>
      )}
    </div>
  );
}

export function WheelPickerDemo() {
  const root = useRef<HTMLDivElement>(null);
  const items = ["S", "M", "L", "XL", "XXL"];
  const rowH = 26;
  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".d-wp-item");
      const setCur = (idx: number) =>
        rows.forEach((r, ri) =>
          gsap.to(r, { opacity: ri === idx ? 1 : 0.3, scale: ri === idx ? 1.15 : 1, duration: 0.2 })
        );
      const track = root.current!.querySelector<HTMLElement>(".d-wp-track")!;
      gsap.set(track, { y: -2 * rowH });
      setCur(2);
      const d = Draggable.create(track, {
        type: "y",
        bounds: { minY: -4 * rowH, maxY: 0 },
        inertia: true,
        onDrag() {
          setCur(Math.round(-this.y / rowH));
        },
        onThrowUpdate() {
          setCur(Math.round(-this.y / rowH));
        },
        snap: { y: (v) => Math.round(v / rowH) * rowH },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div data-hover className="relative h-[86px] w-24 cursor-grab overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[30px] z-10 h-[26px] rounded-md border border-accent/40 bg-accent/5" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[30px] bg-gradient-to-b from-[#0b0b0b] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[30px] bg-gradient-to-t from-[#0b0b0b] to-transparent" />
        <div className="d-wp-track will-change-transform">
          {items.map((s, i) => (
            <p key={i} className="d-wp-item grid h-[26px] place-items-center font-mono text-sm font-bold text-accent">
              {s}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SortableDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(["idée", "maquette", "motion", "livraison"]);
  const flip = useRef<ReturnType<typeof Flip.getState> | null>(null);
  useGSAP(
    () => {
      if (flip.current) {
        Flip.from(flip.current, { duration: 0.35, ease: "power2.out" });
        flip.current = null;
      }
      const rows = gsap.utils.toArray<HTMLElement>(".d-sort");
      const ds = rows.map((row, ri) =>
        Draggable.create(row, {
          type: "y",
          bounds: { minY: -(ri * 37), maxY: (rows.length - 1 - ri) * 37 },
          onDrag() {
            gsap.set(row, { zIndex: 10, scale: 1.03 });
          },
          onDragEnd() {
            const moved = Math.round(this.y / 37);
            gsap.set(row, { zIndex: 0, scale: 1, y: 0 });
            if (moved !== 0) {
              flip.current = Flip.getState(
                root.current!.querySelectorAll(".d-sort")
              );
              setItems((arr) => {
                const next = [...arr];
                const [it] = next.splice(ri, 1);
                next.splice(Math.max(0, Math.min(next.length, ri + moved)), 0, it);
                return next;
              });
            }
          },
        })[0]
      );
      return () => ds.forEach((d) => d.kill());
    },
    { scope: root, dependencies: [items], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-1.5 px-8">
      {items.map((it) => (
        <div key={it} data-hover className="d-sort flex cursor-grab items-center gap-2 rounded-lg border border-white/10 bg-[#101010] px-3 py-2 font-mono text-[10px] text-white/60 will-change-transform active:cursor-grabbing">
          <span className="text-white/25">⠿</span> {it}
        </div>
      ))}
    </div>
  );
}

/* ---------- édito ---------- */

export function ReadBarDemo() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  return (
    <div ref={root} className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-4 pt-3">
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
        <span ref={pct} className="font-mono text-[9px] text-accent">0%</span>
      </div>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          gsap.set(bar.current, { scaleX: p });
          if (pct.current) pct.current.textContent = `${Math.round(p * 100)}%`;
        }}
        className="mini-scroll mt-2 min-h-0 flex-1 space-y-2.5 overflow-y-auto px-5 pb-4"
      >
        {[
          "Le mouvement est un langage. Chaque tween construit une phrase que le lecteur parcourt au rythme du scroll.",
          "Une interface qui respire explique son fonctionnement sans mode d'emploi — la transition est la documentation.",
          "La retenue signe le style : une intention par écran, jamais de bruit gratuit.",
          "Le scroll n'est pas une molette — c'est la voix du lecteur qui dicte le tempo du récit.",
        ].map((t, i) => (
          <p key={i} className="text-[10px] leading-relaxed text-white/55">{t}</p>
        ))}
      </div>
    </div>
  );
}

export function BigStatDemo() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  return (
    <div ref={root} className="flex h-full flex-col px-6 py-3">
      <div className="mt-1 text-center">
        <span ref={num} className="font-black tabular-nums text-6xl text-accent">0</span>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">projets livrés</p>
      </div>
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          if (p > 0.35 && !done.current) {
            done.current = true;
            const o = { v: 0 };
            gsap.to(o, {
              v: 148,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                if (num.current) num.current.textContent = String(Math.round(o.v));
              },
            });
          }
        }}
        className="mini-scroll mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-5 rounded bg-white/[0.05]" />
        ))}
      </div>
    </div>
  );
}

export function FootnoteDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useGSAP(
    () => {
      if (show)
        gsap.fromTo(".d-fn", { y: 6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(2)" });
    },
    { scope: root, dependencies: [show] }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center px-8">
      <p className="max-w-[240px] text-[11px] leading-relaxed text-white/60">
        Le scroll devient la voix du lecteur
        <button
          data-hover
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          className="mx-1 align-super font-mono text-[9px] text-accent"
        >
          ¹
        </button>
        et dicte le tempo du récit.
      </p>
      {show && (
        <div className="d-fn absolute left-1/2 top-6 w-52 -translate-x-1/2 rounded-lg border border-accent/30 bg-[#101010] p-2.5 font-mono text-[9px] leading-relaxed text-white/60">
          <span className="text-accent">¹</span> Comparer « scroll-driven » et
          « scroll-triggered » : lié à la position vs déclenché au passage.
        </div>
      )}
    </div>
  );
}

export function CiteMarkDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
      tl.set(".d-cite", { drawSVG: "0%" })
        .set(".d-cite-txt", { opacity: 0, y: 10 })
        .to(".d-cite", { drawSVG: "100%", duration: 1, ease: "power2.inOut" })
        .to(".d-cite-txt", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center justify-center gap-4 px-8">
      <svg viewBox="0 0 40 30" className="h-10 w-12 shrink-0">
        <path className="d-cite" d="M4 26 C4 12 10 6 18 4 L16 10 C12 12 10 15 10 26 Z M22 26 C22 12 28 6 36 4 L34 10 C30 12 28 15 28 26 Z" fill="none" stroke="var(--accent, #0ae448)" strokeWidth="1.5" />
      </svg>
      <p className="d-cite-txt max-w-[200px] text-[11px] font-semibold leading-snug text-white/75">
        La typographie est la voix du design.
      </p>
    </div>
  );
}

/* ---------- page ---------- */

export function CircleWipeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const flip = useRef(false);
  useGSAP(
    (_, contextSafe) => {
      const wipe =
        contextSafe?.((e: MouseEvent) => {
          const r = root.current!.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          const mask = root.current!.querySelector<HTMLElement>(".d-wipe")!;
          flip.current = !flip.current;
          const bg = flip.current ? "#0ae448" : "#4da3ff";
          const tl = gsap.timeline();
          tl.set(mask, {
            clipPath: `circle(0% at ${x}px ${y}px)`,
            background: bg,
          })
            .to(mask, {
              clipPath: `circle(150% at ${x}px ${y}px)`,
              duration: 0.65,
              ease: "power2.in",
              onComplete: () => setPage((p) => p + 1),
            })
            .to(mask, {
              clipPath: `circle(0% at ${x}px ${y}px)`,
              duration: 0.65,
              ease: "power2.out",
            });
        }) ?? (() => {});
      root.current!.addEventListener("click", wipe);
      return () => root.current?.removeEventListener("click", wipe);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center overflow-hidden">
      <p className="pointer-events-none font-mono text-xs uppercase tracking-[0.3em] text-white/60">
        PAGE_{String(page + 1).padStart(2, "0")} — cliquer
      </p>
      <div className="d-wipe pointer-events-none absolute inset-0" style={{ clipPath: "circle(0% at 0px 0px)" }} />
    </div>
  );
}

export function TopLoaderDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const go =
        contextSafe?.(() => {
          const bar = root.current!.querySelector(".d-top");
          const tl = gsap.timeline();
          tl.set(bar, { scaleX: 0, opacity: 1 })
            .to(bar, { scaleX: 0.35, duration: 0.4, ease: "power2.out" })
            .to(bar, { scaleX: 0.7, duration: 0.7, ease: "power1.inOut" })
            .to(bar, { scaleX: 1, duration: 0.3, ease: "power3.in" })
            .to(bar, { opacity: 0, duration: 0.4 }, "+=0.2");
        }) ?? (() => {});
      root.current!.addEventListener("click", go);
      return () => root.current?.removeEventListener("click", go);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative h-full cursor-pointer">
      <div className="absolute inset-x-0 top-0 h-[3px]">
        <div className="d-top h-full w-full origin-left scale-x-0 bg-accent opacity-0" />
      </div>
      <div className="grid h-full place-items-center">
        <p className="pointer-events-none font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          cliquer → naviguer
        </p>
      </div>
    </div>
  );
}

export function HeroEnterDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 });
      tl.set(".d-he-k", { opacity: 0, y: 8 })
        .set(".d-he-t", { opacity: 0, y: 24 })
        .set(".d-he-c", { opacity: 0 })
        .set(".d-he-i", { clipPath: "inset(0 0 100% 0)" })
        .to(".d-he-k", { opacity: 1, y: 0, duration: 0.4 })
        .to(".d-he-t", { opacity: 1, y: 0, duration: 0.55, ease: "power4.out" }, "-=0.15")
        .to(".d-he-c", { opacity: 1, duration: 0.35 }, "-=0.2")
        .to(".d-he-i", { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power3.inOut" }, "-=0.3");
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <p className="d-he-k font-mono text-[8px] uppercase tracking-[0.3em] text-accent">studio</p>
        <h3 className="d-he-t mt-1.5 text-2xl font-black uppercase">Motion first</h3>
        <span className="d-he-c mt-3 inline-block rounded-full bg-accent px-4 py-1.5 font-mono text-[9px] font-bold text-black">
          DÉMARRER
        </span>
        <div className="d-he-i mx-auto mt-3 h-10 w-32 rounded-lg bg-gradient-to-br from-accent/30 to-transparent" />
      </div>
    </div>
  );
}

export function DoorsDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-door-l", { xPercent: open ? -102 : 0, duration: 0.9, ease: "power4.inOut" });
      gsap.to(".d-door-r", { xPercent: open ? 102 : 0, duration: 0.9, ease: "power4.inOut" });
      gsap.to(".d-door-in", { opacity: open ? 1 : 0, scale: open ? 1 : 0.92, duration: 0.6, delay: open ? 0.3 : 0 });
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center overflow-hidden">
      <p className="d-door-in pointer-events-none font-mono text-xs uppercase tracking-[0.3em] text-accent opacity-0">
        bienvenue
      </p>
      <div className="d-door-l absolute inset-y-0 left-0 z-10 w-1/2 border-r border-accent/20 bg-[#101010]" />
      <div className="d-door-r absolute inset-y-0 right-0 z-10 w-1/2 border-l border-accent/20 bg-[#101010]" />
      <button
        data-hover
        onClick={() => setOpen((o) => !o)}
        className="relative z-20 rounded-full border border-accent/50 px-5 py-2 font-mono text-[10px] text-accent"
      >
        {open ? "fermer" : "entrer"}
      </button>
    </div>
  );
}

/* ---------- tools ---------- */

export function FpsDemo() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      let acc = 0;
      let frames = 0;
      const tick = (_t: number, dt: number) => {
        if (root.current?.parentElement?.dataset.paused === "1") return;
        acc += dt;
        frames++;
        if (acc > 500) {
          const fps = Math.round((frames * 1000) / acc);
          if (num.current) num.current.textContent = String(fps);
          gsap.set(bar.current, { scaleX: Math.min(1, fps / 60) });
          acc = 0;
          frames = 0;
        }
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="w-full text-center">
        <span ref={num} className="font-mono text-4xl font-black tabular-nums text-accent">--</span>
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">fps en direct</p>
        <div className="mx-auto mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}

export function UtilsDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(35);
  const clamp = gsap.utils.clamp(0, 50);
  const map = gsap.utils.mapRange(0, 100, 0, 360);
  const norm = gsap.utils.normalize(0, 100);
  const rows: [string, string][] = [
    ["clamp(0,50)", String(clamp(v))],
    ["mapRange→°", `${Math.round(map(v))}°`],
    ["normalize", norm(v).toFixed(2)],
  ];
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-2.5 px-8">
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        aria-label="Valeur d'entrée"
        onChange={(e) => setV(Number(e.target.value))}
        style={{ accentColor: "var(--accent, #0ae448)" }}
      />
      <p className="font-mono text-[10px] text-white/40">entrée: <span className="text-accent">{v}</span></p>
      {rows.map(([k, r]) => (
        <div key={k} className="flex justify-between rounded border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px]">
          <span className="text-white/45">gsap.utils.{k}</span>
          <span className="text-accent">{r}</span>
        </div>
      ))}
    </div>
  );
}

export function MarkersDemo() {
  const root = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const start = useRef<HTMLDivElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const st = scroller.current!;
      const b = box.current!;
      gsap.set(start.current, { top: b.offsetTop - st.clientHeight * 0.8 + 12 });
      gsap.set(end.current, { top: b.offsetTop + b.offsetHeight - st.clientHeight * 0.2 + 12 });
      const onScroll = () => {
        const p = gsap.utils.clamp(
          0,
          1,
          (st.scrollTop - (b.offsetTop - st.clientHeight * 0.8)) /
            (b.offsetTop + b.offsetHeight - st.clientHeight * 0.2 - (b.offsetTop - st.clientHeight * 0.8))
        );
        gsap.set(dot.current, { scale: 0.4 + p * 0.6, opacity: 0.4 + p * 0.6 });
      };
      st.addEventListener("scroll", onScroll);
      return () => st.removeEventListener("scroll", onScroll);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full flex-col px-4 py-3">
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
        markers: «top 80%» → «bottom 20%»
      </p>
      <div ref={scroller} className="mini-scroll relative min-h-0 flex-1 overflow-y-auto rounded-lg border border-white/10">
        <div className="space-y-3 px-3 py-3">
          {Array.from({ length: 3 }, (_, i) => <div key={i} className="h-8 rounded bg-white/[0.04]" />)}
          <div ref={box} className="grid h-10 place-items-center rounded border border-accent/30 bg-accent/5">
            <div ref={dot} className="h-4 w-4 rounded-full bg-accent" />
          </div>
          {Array.from({ length: 6 }, (_, i) => <div key={i} className="h-8 rounded bg-white/[0.04]" />)}
        </div>
        <div ref={start} className="pointer-events-none absolute inset-x-0 border-t border-dashed border-accent/60">
          <span className="absolute -top-2 right-1 bg-[#0b0b0b] px-1 font-mono text-[7px] text-accent">start</span>
        </div>
        <div ref={end} className="pointer-events-none absolute inset-x-0 border-t border-dashed border-[#ff4d6d]/60">
          <span className="absolute -top-2 right-1 bg-[#0b0b0b] px-1 font-mono text-[7px] text-[#ff4d6d]">end</span>
        </div>
      </div>
    </div>
  );
}

export function ObserverVizDemo() {
  const root = useRef<HTMLDivElement>(null);
  const dx = useRef<HTMLSpanElement>(null);
  const dy = useRef<HTMLSpanElement>(null);
  const ty = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const obs = Observer.create({
        target: root.current,
        type: "pointer",
        onMove: (self) => {
          if (dx.current) dx.current.textContent = String(Math.round(self.deltaX));
          if (dy.current) dy.current.textContent = String(Math.round(self.deltaY));
          if (ty.current) ty.current.textContent = self.isDragging ? "drag" : "move";
        },
      });
      return () => obs.kill();
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="grid h-full cursor-crosshair place-items-center">
      <div className="pointer-events-none space-y-1.5 font-mono text-[10px]">
        <p className="text-white/40">bouge / dragge dans la zone</p>
        {([["ΔX", dx], ["ΔY", dy], ["état", ty]] as const).map(([l, r]) => (
          <p key={l} className="flex w-40 justify-between rounded border border-white/10 bg-white/[0.04] px-3 py-1">
            <span className="text-white/45">{l}</span>
            <span ref={r} className="text-accent">0</span>
          </p>
        ))}
      </div>
    </div>
  );
}

/* ---------- page (vague 2) ---------- */

export function SplitScreenDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-ss-t", { yPercent: open ? -102 : 0, duration: 0.8, ease: "power4.inOut" });
      gsap.to(".d-ss-b", { yPercent: open ? 102 : 0, duration: 0.8, ease: "power4.inOut" });
      gsap.to(".d-ss-in", { opacity: open ? 1 : 0, duration: 0.5, delay: open ? 0.4 : 0 });
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center overflow-hidden">
      <p className="d-ss-in pointer-events-none font-mono text-xs uppercase tracking-[0.3em] text-accent opacity-0">
        nouvelle vue
      </p>
      <div className="d-ss-t absolute inset-x-0 top-0 z-10 h-1/2 border-b border-accent/20 bg-[#101010]" />
      <div className="d-ss-b absolute inset-x-0 bottom-0 z-10 h-1/2 border-t border-accent/20 bg-[#101010]" />
      <button data-hover onClick={() => setOpen((o) => !o)} className="relative z-20 rounded-full border border-accent/50 px-5 py-2 font-mono text-[10px] text-accent">
        {open ? "refermer" : "ouvrir"}
      </button>
    </div>
  );
}

export function GridWipeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  useGSAP(
    (_, contextSafe) => {
      const wipe =
        contextSafe?.(() => {
          const tiles = gsap.utils.toArray(".d-gw");
          const tl = gsap.timeline();
          tl.set(tiles, { opacity: 0 })
            .to(tiles, {
              opacity: 1,
              duration: 0.3,
              stagger: { each: 0.03, from: "random" },
            })
            .call(() => setPage((p) => p + 1))
            .to(tiles, {
              opacity: 0,
              duration: 0.3,
              stagger: { each: 0.03, from: "random" },
            }, "+=0.15");
        }) ?? (() => {});
      root.current!.addEventListener("click", wipe);
      return () => root.current?.removeEventListener("click", wipe);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center overflow-hidden">
      <p className="pointer-events-none font-mono text-xs uppercase tracking-[0.3em] text-white/60">
        PAGE_{String(page + 1).padStart(2, "0")}
      </p>
      <div className="pointer-events-none absolute inset-0 grid grid-cols-4 grid-rows-4">
        {Array.from({ length: 16 }, (_, i) => (
          <div key={i} className="d-gw bg-accent opacity-0" />
        ))}
      </div>
      <p className="pointer-events-none absolute bottom-3 font-mono text-[9px] text-white/30">cliquer → tuiles aléatoires</p>
    </div>
  );
}

export function PageLoaderDemo() {
  const root = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const play =
        contextSafe?.(() => {
          const o = { v: 0 };
          const tl = gsap.timeline();
          tl.set(".d-pl", { yPercent: 0 })
            .to(o, {
              v: 100,
              duration: 1.6,
              ease: "power2.inOut",
              onUpdate: () => {
                if (pct.current) pct.current.textContent = String(Math.round(o.v));
              },
            })
            .to(".d-pl", { yPercent: -102, duration: 0.7, ease: "power4.inOut" }, "+=0.25");
        }) ?? (() => {});
      root.current!.addEventListener("click", play);
      return () => root.current?.removeEventListener("click", play);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center overflow-hidden">
      <p className="pointer-events-none font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        cliquer → préchargement
      </p>
      <div className="d-pl absolute inset-0 z-10 grid place-items-center bg-[#101010]" style={{ transform: "translateY(102%)" }}>
        <span ref={pct} className="font-black tabular-nums text-5xl text-accent">0</span>
      </div>
    </div>
  );
}

export function SharedElementDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState(true);
  const state = useRef<ReturnType<typeof Flip.getState> | null>(null);
  useGSAP(
    () => {
      if (!state.current) return;
      Flip.from(state.current, { duration: 0.55, ease: "power3.inOut", absolute: true });
      state.current = null;
    },
    { scope: root, dependencies: [grid] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6">
      <div className="w-full">
        <button
          data-hover
          onClick={() => {
            state.current = Flip.getState(root.current!.querySelectorAll(".d-se"));
            setGrid((g) => !g);
          }}
          className="mb-3 rounded-full border border-white/15 px-4 py-1.5 font-mono text-[10px] text-white/60"
        >
          vue {grid ? "liste" : "grille"} ⇄
        </button>
        <div className={grid ? "grid grid-cols-3 gap-2" : "space-y-2"}>
          {["A", "B", "C"].map((k) => (
            <div key={k} className={`d-se grid place-items-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-xs text-accent ${grid ? "h-16" : "h-9"}`}>
              {k}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CurtainUpDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-cu", { yPercent: open ? -102 : 0, duration: 0.9, ease: "power4.inOut" });
      gsap.to(".d-cu-in", { opacity: open ? 1 : 0, y: open ? 0 : 12, duration: 0.5, delay: open ? 0.35 : 0 });
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center overflow-hidden">
      <p className="d-cu-in pointer-events-none font-mono text-xs uppercase tracking-[0.3em] text-accent opacity-0">
        révélé
      </p>
      <div className="d-cu absolute inset-0 z-10 grid place-items-center bg-accent">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-black">rideau</span>
      </div>
      <button data-hover onClick={() => setOpen((o) => !o)} className="relative z-20 rounded-full border border-white/20 px-5 py-2 font-mono text-[10px] text-white/70">
        {open ? "baisser" : "lever"}
      </button>
    </div>
  );
}

export function StackPushDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  useGSAP(
    (_, contextSafe) => {
      const push =
        contextSafe?.(() => {
          const incoming = root.current!.querySelector(".d-sp-in")!;
          const outgoing = root.current!.querySelector(".d-sp-out")!;
          const tl = gsap.timeline();
          tl.set(incoming, { xPercent: 100, opacity: 1 })
            .to(incoming, { xPercent: 0, duration: 0.6, ease: "power3.inOut" })
            .to(outgoing, { xPercent: -30, opacity: 0.3, duration: 0.6, ease: "power3.inOut" }, "<")
            .call(() => {
              setPage((p) => p + 1);
              gsap.set(outgoing, { xPercent: 0, opacity: 1 });
              gsap.set(incoming, { opacity: 0 });
            });
        }) ?? (() => {});
      root.current!.addEventListener("click", push);
      return () => root.current?.removeEventListener("click", push);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center overflow-hidden">
      <div className="d-sp-out absolute inset-0 grid place-items-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">PAGE_{String(page + 1).padStart(2, "0")}</p>
      </div>
      <div className="d-sp-in absolute inset-0 grid place-items-center bg-[#101010] opacity-0" />
      <p className="pointer-events-none absolute bottom-3 font-mono text-[9px] text-white/30">cliquer → push latéral</p>
    </div>
  );
}

/* ---------- tools (vague 2) ---------- */

export function ReducedMotionDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [rm, setRm] = useState(false);
  useGSAP(
    () => {
      if (rm) {
        // état final direct, zéro mouvement — le contrat prefers-reduced-motion
        gsap.set(".d-rm-dot", { x: 55 });
        return;
      }
      gsap.fromTo(
        ".d-rm-dot",
        { x: 0 },
        { x: 110, repeat: -1, yoyo: true, duration: 0.9, ease: "power2.inOut" }
      );
    },
    { scope: root, dependencies: [rm], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="w-full">
        <div className="relative h-8 w-full overflow-hidden rounded-full border border-white/10">
          <span className="d-rm-dot absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-accent" />
        </div>
        <button
          data-hover
          onClick={() => setRm((r) => !r)}
          className={`mx-auto mt-3 block rounded-full border px-4 py-1.5 font-mono text-[9px] ${rm ? "border-[#ff4d6d]/50 text-[#ff4d6d]" : "border-white/15 text-white/60"}`}
        >
          {rm ? "reduce ON — état direct" : "reduce OFF — mouvement"}
        </button>
        <p className="mt-2 text-center font-mono text-[9px] text-white/30">
          gsap.matchMedia → prefers-reduced-motion
        </p>
      </div>
    </div>
  );
}

export function StaggerLabDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(0);
  const modes = ["start", "center", "edges", "random"] as const;
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-sl2",
        { scale: 0.15, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: { each: 0.04, from: modes[mode] === "start" ? 0 : modes[mode] },
        }
      );
    },
    { scope: root, dependencies: [mode] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div className="mx-auto grid w-36 grid-cols-6 gap-1">
          {Array.from({ length: 36 }, (_, i) => (
            <span key={`${mode}-${i}`} className="d-sl2 h-5 w-5 rounded bg-accent/70" />
          ))}
        </div>
        <button
          data-hover
          onClick={() => setMode((m) => (m + 1) % modes.length)}
          className="mt-4 rounded-full border border-white/15 px-4 py-1.5 font-mono text-[10px] text-accent"
        >
          from: {modes[mode]}
        </button>
      </div>
    </div>
  );
}

export function LabelJumpDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true });
      tl.current
        .addLabel("intro")
        .to(".d-lj", { x: 60, duration: 0.7, ease: "power2.out" })
        .addLabel("spin")
        .to(".d-lj", { rotation: 360, duration: 0.8, ease: "power1.inOut" })
        .addLabel("grow")
        .to(".d-lj", { scale: 1.5, duration: 0.6, ease: "back.out(2)" })
        .addLabel("fin");
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <span className="d-lj inline-block h-10 w-10 rounded-lg bg-accent" />
        <div className="mt-5 flex gap-1.5">
          {["intro", "spin", "grow", "fin"].map((l) => (
            <button
              key={l}
              data-hover
              onClick={() => tl.current?.play(l)}
              className="rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] text-white/60"
            >
              ▶ {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InvalidateDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (key === 0) return;
      gsap.fromTo(
        box.current,
        { x: 0 },
        {
          x: () => gsap.utils.random(60, 130) * (Math.random() > 0.5 ? 1 : -1),
          duration: 0.6,
          ease: "power3.inOut",
        }
      );
    },
    { scope: root, dependencies: [key] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div ref={box} className="mx-auto h-10 w-10 rounded-lg bg-accent will-change-transform" />
        <button
          data-hover
          onClick={() => setKey((k) => k + 1)}
          className="mt-4 rounded-full border border-white/15 px-4 py-1.5 font-mono text-[10px] text-accent"
        >
          ↻ relancer (valeur aléatoire)
        </button>
        <p className="mt-2 font-mono text-[9px] text-white/30">
          fonction-based value recalculée au replay
        </p>
      </div>
    </div>
  );
}

export function TickerUtilDemo() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [lag, setLag] = useState(true);
  useGSAP(
    () => {
      gsap.ticker.lagSmoothing(lag ? 500 : 0);
      let n = 0;
      const tick = () => {
        n++;
        if (count.current && n % 30 === 0) count.current.textContent = String(n);
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500);
      };
    },
    { scope: root, dependencies: [lag], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <span ref={count} className="font-black tabular-nums text-4xl text-accent">0</span>
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">ticks gsap</p>
        <button
          data-hover
          onClick={() => setLag((l) => !l)}
          className="mt-3 rounded-full border border-white/15 px-4 py-1.5 font-mono text-[9px] text-white/60"
        >
          lagSmoothing: {lag ? "ON" : "OFF"}
        </button>
        <p className="mt-1.5 font-mono text-[9px] text-white/30">
          anti-saut après un lag (tab inactive…)
        </p>
      </div>
    </div>
  );
}

export function KillDemo() {
  const root = useRef<HTMLDivElement>(null);
  const alive = useRef<HTMLSpanElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [relance, setRelance] = useState(0);
  useGSAP(
    () => {
      const tw = gsap.to(box.current, {
        x: 80,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "sine.inOut",
      });
      let n = 0;
      const tick = () => {
        if (alive.current && n++ % 30 === 0)
          alive.current.textContent = String(gsap.getTweensOf(box.current).length);
      };
      gsap.ticker.add(tick);
      return () => {
        tw.kill();
        gsap.ticker.remove(tick);
      };
    },
    { scope: root, dependencies: [relance], revertOnUpdate: true }
  );
  const killNow = () => {
    gsap.killTweensOf(box.current);
    gsap.set(box.current, { x: 0 });
    if (alive.current) alive.current.textContent = "0";
  };
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="w-full text-center">
        <div className="relative mx-auto h-8 w-40 rounded-full border border-white/10">
          <div ref={box} className="absolute left-1 top-1 h-6 w-6 rounded-full bg-accent" />
        </div>
        <p className="mt-3 font-mono text-[10px] text-white/50">
          tweens actifs : <span ref={alive} className="text-accent">1</span>
        </p>
        <div className="mt-2 flex justify-center gap-2">
          <button
            data-hover
            onClick={killNow}
            className="rounded-full border border-[#ff4d6d]/50 px-4 py-1.5 font-mono text-[9px] text-[#ff4d6d]"
          >
            killTweensOf(box)
          </button>
          <button
            data-hover
            onClick={() => setRelance((k) => k + 1)}
            className="rounded-full border border-white/15 px-4 py-1.5 font-mono text-[9px] text-white/60"
          >
            relancer
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- édito (vague 2) ---------- */

export function TocSpyDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const secs = ["Genèse", "Méthode", "Résultats"];
  return (
    <div ref={root} className="flex h-full gap-3 px-5 py-3">
      <nav className="flex w-24 shrink-0 flex-col justify-center gap-2">
        {secs.map((s, i) => (
          <span
            key={s}
            className={`border-l-2 pl-2 font-mono text-[9px] transition-all ${
              active === i ? "border-accent text-accent" : "border-white/10 text-white/35"
            }`}
          >
            {s}
          </span>
        ))}
      </nav>
      <div
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round((el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)) * 2);
          setActive(Math.min(2, Math.max(0, idx)));
        }}
        className="mini-scroll min-h-0 flex-1 space-y-4 overflow-y-auto pr-1"
      >
        {secs.map((s) => (
          <section key={s} className="space-y-1.5">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/70">{s}</h4>
            <div className="h-3 rounded bg-white/[0.05]" />
            <div className="h-3 w-4/5 rounded bg-white/[0.05]" />
            <div className="h-3 w-3/5 rounded bg-white/[0.05]" />
          </section>
        ))}
      </div>
    </div>
  );
}

export function WordMaskDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const split = new SplitText(".d-wm", { type: "words" });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
      tl.fromTo(
        split.words,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, stagger: 0.08, ease: "power4.out" }
      ).to(split.words, { yPercent: -110, duration: 0.5, stagger: 0.04, ease: "power3.in" }, "+=1.6");
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6">
      <p className="d-wm overflow-hidden text-center text-2xl font-bold leading-snug">
        Chaque mot arrive dans son propre masque
      </p>
    </div>
  );
}

export function MarginNoteDemo() {
  const root = useRef<HTMLDivElement>(null);
  const note = useRef<HTMLDivElement>(null);
  const shown = useRef(false);
  return (
    <div ref={root} className="flex h-full gap-3 px-5 py-3">
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          if (p > 0.4 && !shown.current) {
            shown.current = true;
            gsap.fromTo(note.current, { x: 16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
          } else if (p <= 0.4) shown.current = false;
        }}
        className="mini-scroll min-h-0 flex-1 space-y-3 overflow-y-auto text-[10px] leading-relaxed text-white/55"
      >
        <p>Le design éditorial emprunte aux livres : marges généreuses, notes, filets.</p>
        <p>Scroll un peu plus bas — une note surgit en marge au bon moment.</p>
        <p>Elle glisse depuis la droite, comme une annotation du typographe.</p>
        <p>Puis elle repart si tu remontes — la mise en page répond à la lecture.</p>
      </div>
      <div ref={note} className="w-20 shrink-0 self-center border-l-2 border-accent pl-2 font-mono text-[8px] leading-snug text-accent opacity-0">
        NOTE<br />les marges respirent
      </div>
    </div>
  );
}

export function ChapterNumDemo() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(1);
  useGSAP(
    () => {
      gsap.fromTo(num.current, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power4.out" });
    },
    { scope: root, dependencies: [n] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div className="overflow-hidden">
          <span
            ref={num}
            className="block text-7xl font-black text-transparent"
            style={{ WebkitTextStroke: "1.5px var(--accent, #0ae448)" }}
          >
            {String(n).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">chapitre</p>
        <button
          data-hover
          onClick={() => setN((x) => (x % 9) + 1)}
          className="mt-3 rounded-full border border-white/15 px-4 py-1 font-mono text-[9px] text-white/60"
        >
          chapitre suivant →
        </button>
      </div>
    </div>
  );
}

export function CaptionSlideDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const enter =
        contextSafe?.(() => {
          gsap.to(".d-cap", { y: 0, duration: 0.45, ease: "power3.out" });
          gsap.to(".d-cap-img", { scale: 1.05, duration: 0.6, ease: "power2.out" });
        }) ?? (() => {});
      const leave =
        contextSafe?.(() => {
          gsap.to(".d-cap", { y: "100%", duration: 0.35, ease: "power3.in" });
          gsap.to(".d-cap-img", { scale: 1, duration: 0.5 });
        }) ?? (() => {});
      const el = root.current!.querySelector(".d-cap-frame")!;
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div data-hover className="d-cap-frame relative h-24 w-44 overflow-hidden rounded-xl border border-white/15">
        <div className="d-cap-img absolute inset-0 bg-gradient-to-br from-accent/30 to-[#4da3ff]/20 will-change-transform" />
        <div className="d-cap absolute inset-x-0 bottom-0 bg-black/75 px-2.5 py-1.5 font-mono text-[9px] text-accent" style={{ transform: "translateY(100%)" }}>
          Série « Nuit » — IMG_047
        </div>
      </div>
    </div>
  );
}

/* ---------- drag (vague 2) ---------- */

export function DragUploadDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [dropped, setDropped] = useState(false);
  useGSAP(
    () => {
      const zone = root.current!.querySelector(".d-du-zone")!;
      const file = root.current!.querySelector<HTMLElement>(".d-du-file");
      if (!file) return;
      gsap.set(file, { x: -90 });
      const d = Draggable.create(file, {
        type: "x,y",
        onDrag() {
          const zr = zone.getBoundingClientRect();
          const fr = file.getBoundingClientRect();
          const inside =
            fr.left + fr.width / 2 > zr.left &&
            fr.left + fr.width / 2 < zr.right &&
            fr.top + fr.height / 2 > zr.top &&
            fr.top + fr.height / 2 < zr.bottom;
          gsap.to(zone, {
            borderColor: inside ? "rgba(10,228,72,0.9)" : "rgba(255,255,255,0.2)",
            scale: inside ? 1.05 : 1,
            duration: 0.2,
          });
        },
        onDragEnd() {
          const zr = zone.getBoundingClientRect();
          const fr = file.getBoundingClientRect();
          const inside =
            fr.left + fr.width / 2 > zr.left &&
            fr.left + fr.width / 2 < zr.right &&
            fr.top + fr.height / 2 > zr.top &&
            fr.top + fr.height / 2 < zr.bottom;
          if (inside) {
            gsap.to(file, { opacity: 0, scale: 0.5, duration: 0.3, onComplete: () => setDropped(true) });
          } else {
            gsap.to(file, { x: -90, y: 0, duration: 0.5, ease: "elastic.out(1,0.6)" });
          }
        },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root, dependencies: [dropped], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center">
      <div className="d-du-zone grid h-24 w-40 place-items-center rounded-xl border-2 border-dashed border-white/20 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
        {dropped ? <span className="text-accent">✓ reçu !</span> : "zone de dépôt"}
      </div>
      {!dropped && (
        <div data-hover className="d-du-file absolute left-1/2 top-1/2 grid h-11 w-14 -translate-y-1/2 cursor-grab place-items-center rounded-lg border border-accent/50 bg-[#101010] font-mono text-[8px] text-accent active:cursor-grabbing">
          📄 doc.pdf
        </div>
      )}
      {dropped && (
        <button data-hover onClick={() => setDropped(false)} className="absolute bottom-3 rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] text-white/50">
          rejouer
        </button>
      )}
    </div>
  );
}

export function SnapGridDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const cell = 28;
      const d = Draggable.create(".d-sg", {
        type: "x,y",
        bounds: root.current!.querySelector(".d-sg-frame"),
        inertia: true,
        snap: {
          x: (v) => Math.round(v / cell) * cell,
          y: (v) => Math.round(v / cell) * cell,
        },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div
        className="d-sg-frame relative h-32 w-44 overflow-hidden rounded-xl border border-white/15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div data-hover className="d-sg absolute left-1 top-1 grid h-7 w-7 cursor-grab place-items-center rounded-md bg-accent font-mono text-[10px] font-bold text-black active:cursor-grabbing">
          ⌖
        </div>
      </div>
    </div>
  );
}

export function BoundBallDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const ball = root.current!.querySelector<HTMLElement>(".d-bb")!;
      const frame = root.current!.querySelector<HTMLElement>(".d-bb-frame")!;
      const d = Draggable.create(ball, {
        type: "x,y",
        bounds: frame,
        inertia: true,
        edgeResistance: 0.9,
        onDragEnd() {
          const maxY = frame.clientHeight - ball.offsetHeight;
          gsap.to(ball, {
            y: maxY,
            duration: 1.1,
            ease: "bounce.out",
          });
        },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="d-bb-frame relative h-32 w-44 overflow-hidden rounded-xl border border-white/15 bg-white/[0.03]">
        <div data-hover className="d-bb absolute left-3 top-3 h-9 w-9 cursor-grab rounded-full bg-accent will-change-transform active:cursor-grabbing" />
        <span className="pointer-events-none absolute bottom-1.5 right-2 font-mono text-[8px] text-white/30">lance-la → gravité</span>
      </div>
    </div>
  );
}

export function DragValueDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(50);
  useGSAP(
    () => {
      const bar = root.current!.querySelector<HTMLElement>(".d-dv-bar")!;
      const max = bar.parentElement!.clientHeight * 0.8;
      const d = Draggable.create(bar, {
        type: "y",
        bounds: { minY: -max, maxY: 0 },
        onDrag() {
          setV(Math.round((this.y / -max) * 100));
        },
      });
      gsap.set(bar, { y: -max / 2 });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center justify-center gap-4">
      <div className="relative h-28 w-6 overflow-hidden rounded-full border border-white/15 bg-white/[0.04]">
        <div
          className="absolute bottom-0 w-full bg-accent/30"
          style={{ height: `${v}%` }}
        />
        <div data-hover className="d-dv-bar absolute -bottom-2 h-5 w-full cursor-grab rounded-full bg-accent active:cursor-grabbing" />
      </div>
      <span className="w-10 font-mono text-xl font-black tabular-nums text-accent">{v}%</span>
    </div>
  );
}

export function HueDragDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(140);
  useGSAP(
    () => {
      const rail = root.current!.querySelector<HTMLElement>(".d-hd-rail")!;
      const d = Draggable.create(".d-hd", {
        type: "x",
        bounds: rail,
        onDrag() {
          setH(Math.round((this.x / rail.clientWidth) * 360));
        },
      });
      gsap.set(".d-hd", { x: (140 / 360) * rail.clientWidth });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="w-full text-center">
        <div
          className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-white/20 transition-colors"
          style={{ background: `hsl(${h} 90% 55%)` }}
        />
        <div
          className="d-hd-rail relative h-3 rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(0 80% 55%), hsl(60 80% 55%), hsl(120 80% 55%), hsl(180 80% 55%), hsl(240 80% 55%), hsl(300 80% 55%), hsl(360 80% 55%))" }}
        >
          <div data-hover className="d-hd absolute -top-1.5 h-6 w-6 -translate-x-1/2 cursor-grab rounded-full border-2 border-white bg-white shadow active:cursor-grabbing" />
        </div>
        <p className="mt-3 font-mono text-[9px] text-white/40">hue: {h}° — drag</p>
      </div>
    </div>
  );
}

/* ---------- média (vague 2) ---------- */

export function VideoScrubDemo() {
  const root = useRef<HTMLDivElement>(null);
  const playhead = useRef<HTMLDivElement>(null);
  const tEl = useRef<HTMLSpanElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const [playing, setPlaying] = useState(false);
  const DUR = 12;
  useGSAP(
    () => {
      const o = { t: 0 };
      tween.current = gsap.to(o, {
        t: DUR,
        duration: DUR,
        ease: "none",
        paused: true,
        repeat: -1,
        onUpdate: () => {
          gsap.set(playhead.current, { scaleX: o.t / DUR });
          if (tEl.current) tEl.current.textContent = `0:${String(Math.floor(o.t)).padStart(2, "0")}`;
        },
        onRepeat: () => { o.t = 0; },
      });
      return () => tween.current?.kill();
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-2.5 px-6">
      <div className="grid h-16 place-items-center rounded-lg bg-gradient-to-br from-white/[0.06] to-transparent font-mono text-[9px] text-white/40">
        {playing ? "▶ lecture" : "❚❚ pause"} — vidéo mock
      </div>
      <div
        data-hover
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const p = (e.clientX - r.left) / r.width;
          tween.current?.progress(p).play();
          setPlaying(true);
        }}
        className="group relative h-1.5 cursor-pointer rounded-full bg-white/10"
      >
        <div ref={playhead} className="h-full w-full origin-left scale-x-0 rounded-full bg-accent" />
      </div>
      <div className="flex items-center justify-between font-mono text-[9px] text-white/40">
        <button
          data-hover
          onClick={() => {
            const np = !playing;
            setPlaying(np);
            if (np) tween.current?.play();
            else tween.current?.pause();
          }}
          className="text-accent"
        >
          {playing ? "pause" : "play"}
        </button>
        <span ref={tEl}>0:00</span>
      </div>
    </div>
  );
}

export function GalleryFilterDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState<"all" | "a" | "b">("all");
  const items = [
    { id: "1", c: "a", label: "PHOTO" },
    { id: "2", c: "b", label: "VIDÉO" },
    { id: "3", c: "a", label: "PHOTO" },
    { id: "4", c: "b", label: "VIDÉO" },
    { id: "5", c: "a", label: "PHOTO" },
    { id: "6", c: "b", label: "VIDÉO" },
  ];
  const flip = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const shown = items.filter((i) => cat === "all" || i.c === cat);
  useGSAP(
    () => {
      if (!flip.current) return;
      Flip.from(flip.current, {
        duration: 0.5,
        ease: "power3.inOut",
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.7, duration: 0.3 }),
      });
      flip.current = null;
    },
    { scope: root, dependencies: [cat] }
  );
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-3 px-6">
      <div className="flex gap-1.5">
        {(["all", "a", "b"] as const).map((c) => (
          <button
            key={c}
            data-hover
            onClick={() => {
              flip.current = Flip.getState(root.current!.querySelectorAll(".d-gf"));
              setCat(c);
            }}
            className={`rounded-full border px-3 py-1 font-mono text-[9px] ${cat === c ? "border-accent bg-accent/15 text-accent" : "border-white/15 text-white/45"}`}
          >
            {c === "all" ? "tous" : c === "a" ? "photos" : "vidéos"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {shown.map((i) => (
          <div
            key={i.id}
            className={`d-gf grid h-14 place-items-center rounded-lg border font-mono text-[8px] ${
              i.c === "a" ? "border-accent/30 bg-accent/10 text-accent" : "border-[#4da3ff]/30 bg-[#4da3ff]/10 text-[#4da3ff]"
            }`}
          >
            {i.label}_{i.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ZoomCursorDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const frame = root.current!.querySelector<HTMLElement>(".d-zc")!;
      const img = frame.querySelector<HTMLElement>(".d-zc-img")!;
      const onMove =
        contextSafe?.((e: MouseEvent) => {
          const r = frame.getBoundingClientRect();
          const px = ((e.clientX - r.left) / r.width) * 100;
          const py = ((e.clientY - r.top) / r.height) * 100;
          gsap.to(img, { transformOrigin: `${px}% ${py}%`, scale: 2, duration: 0.4, ease: "power2.out" });
        }) ?? (() => {});
      const onLeave =
        contextSafe?.(() => gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" })) ?? (() => {});
      frame.addEventListener("mousemove", onMove);
      frame.addEventListener("mouseleave", onLeave);
      return () => {
        frame.removeEventListener("mousemove", onMove);
        frame.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div data-hover className="d-zc relative h-24 w-44 cursor-zoom-in overflow-hidden rounded-xl border border-white/15">
        <div className="d-zc-img absolute inset-0 grid place-items-center bg-gradient-to-br from-accent/30 via-white/[0.05] to-[#c17bff]/25 font-mono text-[9px] text-white/60 will-change-transform">
          IMG_ZOOM — le zoom suit ta loupe
        </div>
      </div>
    </div>
  );
}

export function PlaylistDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const tracks = ["intro_ambient", "main_theme", "outro_calm"];
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tw = gsap.fromTo(bar.current, { scaleX: 0 }, {
        scaleX: 1,
        duration: 4,
        ease: "none",
        onComplete: () => setCur((c) => (c + 1) % tracks.length),
      });
      return () => tw.kill();
    },
    { scope: root, dependencies: [cur], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-2 px-6">
      {tracks.map((t, i) => (
        <button
          key={t}
          data-hover
          onClick={() => setCur(i)}
          className={`flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-[10px] transition-colors ${
            i === cur ? "border-accent/50 bg-accent/10 text-accent" : "border-white/10 text-white/45"
          }`}
        >
          <span>{i === cur ? "▶" : "·"} {t}.mp3</span>
          <span className="text-[8px]">{i === cur ? "en cours" : ""}</span>
        </button>
      ))}
      <div className="h-0.5 overflow-hidden rounded-full bg-white/10">
        <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}

export function MediaFocusDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const cards = gsap.utils.toArray<HTMLElement>(".d-mf");
      const onEnter =
        contextSafe?.((e: MouseEvent) => {
          const me = e.currentTarget as HTMLElement;
          cards.forEach((c) => {
            gsap.to(c, {
              scale: c === me ? 1.06 : 0.94,
              filter: c === me ? "blur(0px)" : "blur(2px) grayscale(0.6)",
              opacity: c === me ? 1 : 0.5,
              duration: 0.35,
              ease: "power2.out",
            });
          });
        }) ?? (() => {});
      const onLeave =
        contextSafe?.(() =>
          cards.forEach((c) => gsap.to(c, { scale: 1, filter: "blur(0px) grayscale(0)", opacity: 1, duration: 0.35 }))
        ) ?? (() => {});
      cards.forEach((c) => c.addEventListener("mouseenter", onEnter));
      root.current!.addEventListener("mouseleave", onLeave);
      return () => {
        cards.forEach((c) => c.removeEventListener("mouseenter", onEnter));
        root.current?.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center justify-center gap-2 px-4">
      {["A", "B", "C"].map((k) => (
        <div
          key={k}
          data-hover
          className={`d-mf grid h-20 w-16 place-items-center rounded-lg border font-mono text-[9px] will-change-transform ${
            k === "B" ? "border-accent/40 bg-accent/10 text-accent" : "border-white/15 bg-white/[0.05] text-white/40"
          }`}
        >
          IMG_{k}
        </div>
      ))}
    </div>
  );
}

/* ---------- ui (vague 3) ---------- */

export function SearchExpandDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-se-in", {
        width: open ? 150 : 0,
        opacity: open ? 1 : 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
      gsap.to(".d-se-ic", { rotation: open ? 90 : 0, duration: 0.3 });
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="flex items-center gap-1.5 rounded-full border border-white/15 py-1.5 pl-3 pr-2">
        <input
          placeholder="rechercher…"
          className="d-se-in w-0 bg-transparent font-mono text-[11px] text-white/80 opacity-0 outline-none placeholder:text-white/25"
        />
        <button
          data-hover
          onClick={() => setOpen((o) => !o)}
          className="d-se-ic grid h-7 w-7 place-items-center rounded-full bg-accent font-mono text-xs text-black"
        >
          ⌕
        </button>
      </div>
    </div>
  );
}

export function HamburgerDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-hb-t", { y: open ? 5 : 0, rotation: open ? 45 : 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(".d-hb-m", { opacity: open ? 0 : 1, scaleX: open ? 0 : 1, duration: 0.2 });
      gsap.to(".d-hb-b", { y: open ? -5 : 0, rotation: open ? -45 : 0, duration: 0.3, ease: "power2.inOut" });
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button
        data-hover
        onClick={() => setOpen((o) => !o)}
        className="grid h-11 w-11 place-items-center gap-0 rounded-xl border border-white/15"
        aria-label="menu"
      >
        <span className="flex h-4 w-5 flex-col justify-between">
          <span className="d-hb-t block h-0.5 w-full rounded bg-accent" />
          <span className="d-hb-m block h-0.5 w-full rounded bg-accent" />
          <span className="d-hb-b block h-0.5 w-full rounded bg-accent" />
        </span>
      </button>
    </div>
  );
}

export function ContextMenuDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  useGSAP(
    () => {
      if (!menu) return;
      gsap.fromTo(
        ".d-cm",
        { scale: 0.6, opacity: 0, transformOrigin: "top left" },
        { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" }
      );
      gsap.fromTo(".d-cm-i", { x: -8, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.04, duration: 0.2, delay: 0.06 });
    },
    { scope: root, dependencies: [menu] }
  );
  return (
    <div
      ref={root}
      data-hover
      onContextMenu={(e) => {
        e.preventDefault();
        const r = e.currentTarget.getBoundingClientRect();
        setMenu({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onClick={() => setMenu(null)}
      className="relative grid h-full cursor-context-menu place-items-center"
    >
      <p className="pointer-events-none font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        clic droit ici →
      </p>
      {menu && (
        <div
          className="d-cm absolute z-10 w-32 overflow-hidden rounded-lg border border-white/15 bg-[#161616] py-1 shadow-xl"
          style={{ left: menu.x, top: menu.y }}
        >
          {["Ouvrir", "Renommer", "Dupliquer", "Supprimer"].map((i) => (
            <div key={i} className="d-cm-i px-3 py-1.5 font-mono text-[10px] text-white/60">
              {i}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PwdMeterDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [len, setLen] = useState(0);
  const level = len === 0 ? 0 : len < 5 ? 1 : len < 9 ? 2 : 3;
  const labels = ["vide", "faible", "moyen", "fort"];
  const colors = ["#333", "#ff4d6d", "#ffb020", "#0ae448"];
  useGSAP(
    () => {
      gsap.to(".d-pm-bar", {
        width: `${level * 25 + (level ? len % 5 : 0)}%`,
        backgroundColor: colors[level],
        duration: 0.35,
        ease: "power2.out",
      });
    },
    { scope: root, dependencies: [len] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="w-full">
        <input
          type="password"
          placeholder="mot de passe…"
          onChange={(e) => setLen(e.target.value.length)}
          className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 font-mono text-[11px] text-white/80 outline-none placeholder:text-white/25"
        />
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="d-pm-bar h-full w-0 rounded-full" />
        </div>
        <p className="mt-1.5 font-mono text-[9px]" style={{ color: colors[level] }}>
          {labels[level]}
        </p>
      </div>
    </div>
  );
}

const TS_ROWS = [
  { n: "Aurora", s: 88 },
  { n: "Blitz", s: 41 },
  { n: "Comet", s: 73 },
  { n: "Drift", s: 56 },
];
export function TableSortDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [asc, setAsc] = useState(true);
  const flip = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const rows = [...TS_ROWS].sort((a, b) => (asc ? a.s - b.s : b.s - a.s));
  useGSAP(
    () => {
      if (!flip.current) return;
      Flip.from(flip.current, { duration: 0.45, ease: "power3.inOut", absolute: true });
      flip.current = null;
    },
    { scope: root, dependencies: [asc] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6">
      <div className="w-full">
        <button
          data-hover
          onClick={() => {
            flip.current = Flip.getState(root.current!.querySelectorAll(".d-ts"));
            setAsc((a) => !a);
          }}
          className="mb-2 flex w-full justify-between rounded-t-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-white/50"
        >
          <span>projet</span>
          <span className="text-accent">score {asc ? "↑" : "↓"}</span>
        </button>
        <div className="space-y-1">
          {rows.map((r) => (
            <div key={r.n} className="d-ts flex justify-between rounded-md border border-white/10 px-3 py-1.5 font-mono text-[11px]">
              <span className="text-white/70">{r.n}</span>
              <span className="text-accent tabular-nums">{r.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotifBellDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(3);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-nb-panel", {
        opacity: open ? 1 : 0,
        y: open ? 0 : -8,
        duration: 0.3,
        ease: "power3.out",
      });
    },
    { scope: root, dependencies: [open] }
  );
  useGSAP(
    () => {
      const badge = root.current!.querySelector(".d-nb-badge");
      if (!badge) return;
      gsap.fromTo(badge, { scale: 1.7 }, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.4)" });
      gsap.fromTo(".d-nb-icon", { rotation: -14 }, { rotation: 0, duration: 0.6, ease: "elastic.out(1,0.3)" });
    },
    { scope: root, dependencies: [n] }
  );
  const bump = () => setN((x) => x + 1);
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative">
        <button
          data-hover
          onClick={() => {
            setOpen((o) => !o);
            setN(0);
          }}
          className="d-nb-icon grid h-11 w-11 place-items-center rounded-full border border-white/15 text-base"
        >
          🔔
          {n > 0 && (
            <span className="d-nb-badge absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent font-mono text-[9px] font-bold text-black">
              {n}
            </span>
          )}
        </button>
        <div className="d-nb-panel pointer-events-none absolute -left-16 top-14 w-44 rounded-xl border border-white/15 bg-[#161616] p-2 opacity-0 shadow-xl">
          {["Nouveau follower", "Build réussi", "Mention @iansan"].map((t) => (
            <p key={t} className="rounded-md px-2 py-1.5 font-mono text-[9px] text-white/55">
              {t}
            </p>
          ))}
        </div>
      </div>
      <button data-hover onClick={bump} className="absolute bottom-3 rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] text-white/50">
        + notification
      </button>
    </div>
  );
}

/* ---------- hover (vague 3) ---------- */

export function StrikeDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const links = gsap.utils.toArray<HTMLElement>(".d-st");
      const enters = links.map((el) =>
        contextSafe?.(() => {
          const l = el.querySelector(".d-st-l");
          gsap.fromTo(l, { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1, duration: 0.3, ease: "power2.out" });
        })
      );
      const leaves = links.map((el) =>
        contextSafe?.(() => {
          const l = el.querySelector(".d-st-l");
          gsap.to(l, { scaleX: 0, transformOrigin: "100% 50%", duration: 0.3, ease: "power2.in" });
        })
      );
      links.forEach((el, i) => {
        el.addEventListener("mouseenter", enters[i]!);
        el.addEventListener("mouseleave", leaves[i]!);
      });
      return () => links.forEach((el, i) => {
        el.removeEventListener("mouseenter", enters[i]!);
        el.removeEventListener("mouseleave", leaves[i]!);
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full flex-col items-center justify-center gap-3">
      {["Ancienne offre", "Prix barré", "Lien obsolète"].map((t) => (
        <span key={t} data-hover className="d-st relative font-mono text-sm text-white/70">
          {t}
          <span className="d-st-l absolute left-0 top-1/2 h-px w-full scale-x-0 bg-accent" />
        </span>
      ))}
    </div>
  );
}

export function BgSlideDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!.querySelector(".d-bg")!;
      const enter =
        contextSafe?.(() => {
          gsap.to(".d-bg-fill", { xPercent: 0, duration: 0.35, ease: "power3.out" });
          gsap.to(".d-bg-txt", { color: "#000", duration: 0.25 });
        }) ?? (() => {});
      const leave =
        contextSafe?.(() => {
          gsap.to(".d-bg-fill", { xPercent: -102, duration: 0.35, ease: "power3.in" });
          gsap.to(".d-bg-txt", { color: "rgba(255,255,255,0.75)", duration: 0.25 });
        }) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <span data-hover className="d-bg relative overflow-hidden rounded-full border border-accent/50 px-8 py-3">
        <span className="d-bg-fill absolute inset-0 -translate-x-full bg-accent" />
        <span className="d-bg-txt relative font-mono text-xs uppercase tracking-[0.3em] text-white/75">explorer</span>
      </span>
    </div>
  );
}

export function IconSwapDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!.querySelector(".d-is")!;
      const enter =
        contextSafe?.(() => {
          gsap.to(".d-is-a", { yPercent: -110, duration: 0.3, ease: "power2.in" });
          gsap.fromTo(".d-is-b", { yPercent: 110 }, { yPercent: 0, duration: 0.35, ease: "back.out(1.7)", delay: 0.08 });
        }) ?? (() => {});
      const leave =
        contextSafe?.(() => {
          gsap.to(".d-is-a", { yPercent: 0, duration: 0.3, ease: "back.out(1.7)" });
          gsap.to(".d-is-b", { yPercent: 110, duration: 0.25, ease: "power2.in" });
        }) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button data-hover className="d-is flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-2.5">
        <span className="relative grid h-4 w-4 place-items-center overflow-hidden">
          <span className="d-is-a absolute text-xs">→</span>
          <span className="d-is-b absolute translate-y-full text-xs text-accent">↗</span>
        </span>
        <span className="font-mono text-[11px] text-white/70">voir le projet</span>
      </button>
    </div>
  );
}

export function SweepHoverDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!.querySelector(".d-sw")!;
      const enter =
        contextSafe?.(() => {
          gsap.fromTo(".d-sw-shine", { xPercent: -160 }, { xPercent: 160, duration: 0.7, ease: "power2.inOut" });
        }) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      return () => el.removeEventListener("mouseenter", enter);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div data-hover className="d-sw relative h-24 w-44 overflow-hidden rounded-xl border border-white/15 bg-white/[0.04]">
        <div className="d-sw-shine absolute inset-y-0 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <p className="absolute inset-0 grid place-items-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
          card premium
        </p>
      </div>
    </div>
  );
}

export function BlurTextDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const split = new SplitText(".d-bt", { type: "chars" });
      const el = root.current!.querySelector(".d-bt")!;
      const enter =
        contextSafe?.(() =>
          gsap.to(split.chars, {
            filter: "blur(4px)",
            opacity: 0.35,
            y: -3,
            stagger: { each: 0.03, from: "center" },
            duration: 0.3,
          })
        ) ?? (() => {});
      const leave =
        contextSafe?.(() =>
          gsap.to(split.chars, {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            stagger: { each: 0.03, from: "edges" },
            duration: 0.35,
            ease: "power2.out",
          })
        ) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        split.revert();
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p data-hover className="d-bt cursor-default text-3xl font-black tracking-tight">
        DISSOLVE
      </p>
    </div>
  );
}

/* ---------- click (vague 3) ---------- */

export function CoinFlipDemo() {
  const root = useRef<HTMLDivElement>(null);
  const spins = useRef(0);
  const [face, setFace] = useState("FACE");
  useGSAP(
    (_, contextSafe) => {
      const flip =
        contextSafe?.(() => {
          spins.current += 4 + (Math.random() > 0.5 ? 1 : 0);
          gsap.to(".d-cf", {
            rotationY: spins.current * 180,
            duration: 1.4,
            ease: "power3.out",
            onComplete: () => setFace(spins.current % 2 === 0 ? "FACE" : "PILE"),
          });
        }) ?? (() => {});
      root.current!.addEventListener("click", flip);
      return () => root.current?.removeEventListener("click", flip);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="grid h-full cursor-pointer place-items-center" style={{ perspective: "400px" }}>
      <div className="text-center">
        <div className="d-cf relative mx-auto h-16 w-16" style={{ transformStyle: "preserve-3d" }}>
          <span className="absolute inset-0 grid place-items-center rounded-full bg-accent font-mono text-[10px] font-bold text-black" style={{ backfaceVisibility: "hidden" }}>
            IANSAN
          </span>
          <span className="absolute inset-0 grid place-items-center rounded-full bg-[#4da3ff] font-mono text-[10px] font-bold text-black" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            STUDIO
          </span>
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">{face}</p>
        <p className="font-mono text-[8px] text-white/30">cliquer pour lancer</p>
      </div>
    </div>
  );
}

const DICE: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[30, 30], [70, 30], [30, 70], [70, 70]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[28, 25], [72, 25], [28, 50], [72, 50], [28, 75], [72, 75]],
};
export function DiceRollDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(4);
  useGSAP(
    (_, contextSafe) => {
      const roll =
        contextSafe?.(() => {
          const nv = 1 + Math.floor(Math.random() * 6);
          gsap.to(".d-dr", {
            rotation: "+=360",
            scale: 1.15,
            duration: 0.6,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1,
            onComplete: () => setV(nv),
          });
        }) ?? (() => {});
      root.current!.addEventListener("click", roll);
      return () => root.current?.removeEventListener("click", roll);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="grid h-full cursor-pointer place-items-center">
      <div className="text-center">
        <div className="d-dr relative h-16 w-16 rounded-xl border border-accent/40 bg-[#141414]">
          {DICE[v].map(([x, y], i) => (
            <span
              key={i}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">cliquer → lancer</p>
      </div>
    </div>
  );
}

export function PulseRingDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [rings, setRings] = useState<{ id: number; x: number; y: number }[]>([]);
  const n = useRef(0);
  const seen = useRef(new Set<number>());
  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".d-pring");
      rings.forEach((r, i) => {
        if (seen.current.has(r.id) || !els[i]) return;
        seen.current.add(r.id);
        gsap.fromTo(
          els[i],
          { scale: 0.1, opacity: 0.9 },
          {
            scale: 3.2,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            onComplete: () => setRings((rs) => rs.filter((x) => x.id !== r.id)),
          }
        );
      });
    },
    { scope: root, dependencies: [rings] }
  );
  return (
    <div
      ref={root}
      data-hover
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setRings((rs) => [...rs, { id: ++n.current, x: e.clientX - r.left, y: e.clientY - r.top }]);
      }}
      className="relative grid h-full cursor-pointer place-items-center overflow-hidden"
    >
      <p className="pointer-events-none font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        cliquer → onde
      </p>
      {rings.map((r) => (
        <span
          key={r.id}
          className="d-pring pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}

const SPAWN_ICONS = ["◆", "★", "●", "▲", "✦"];
export function ClickSpawnDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<{ id: number; x: number; y: number; i: number }[]>([]);
  const n = useRef(0);
  const seen = useRef(new Set<number>());
  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".d-cs");
      items.forEach((it, i) => {
        if (seen.current.has(it.id) || !els[i]) return;
        seen.current.add(it.id);
        gsap.to(els[i], {
          y: -70,
          x: gsap.utils.random(-25, 25),
          rotation: gsap.utils.random(-90, 90),
          opacity: 0,
          scale: 0.4,
          duration: 1.1,
          ease: "power1.out",
          onComplete: () => setItems((xs) => xs.filter((x) => x.id !== it.id)),
        });
      });
    },
    { scope: root, dependencies: [items] }
  );
  return (
    <div
      ref={root}
      data-hover
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setItems((it) => [
          ...it,
          { id: ++n.current, x: e.clientX - r.left, y: e.clientY - r.top, i: n.current % SPAWN_ICONS.length },
        ]);
      }}
      className="relative grid h-full cursor-pointer place-items-center overflow-hidden"
    >
      <p className="pointer-events-none font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        cliquer → particule
      </p>
      {items.map((it) => (
        <span
          key={it.id}
          className="d-cs pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-sm text-accent"
          style={{ left: it.x, top: it.y }}
        >
          {SPAWN_ICONS[it.i]}
        </span>
      ))}
    </div>
  );
}

export function LockUnlockDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-lu-sh", { rotation: open ? -38 : 0, svgOrigin: "10 14", duration: 0.45, ease: "back.out(2)" });
      gsap.to(".d-lu-body", { fill: open ? "#0ae448" : "#ffffff33", duration: 0.3 });
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button data-hover onClick={() => setOpen((o) => !o)} className="text-center">
        <svg viewBox="0 0 40 44" className="mx-auto h-16 w-16">
          <path
            className="d-lu-sh"
            d="M10 18V12a10 10 0 0 1 20 0v6"
            fill="none"
            stroke="#0ae448"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <rect className="d-lu-body" x="6" y="18" width="28" height="22" rx="4" fill="#ffffff33" />
          <circle cx="20" cy="28" r="2.5" fill="#0ae448" />
        </svg>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
          {open ? "déverrouillé" : "verrouillé"}
        </p>
      </button>
    </div>
  );
}

/* ---------- loop (vague 3) ---------- */

export function BreatheDemo() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      let inhale = true;
      gsap.to(".d-br", {
        scale: 1.45,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        onRepeat: () => {
          inhale = !inhale;
          if (label.current) label.current.textContent = inhale ? "inspire" : "expire";
        },
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div className="d-br mx-auto h-16 w-16 scale-75 rounded-full border-2 border-accent/60 bg-accent/10 will-change-transform" />
        <span ref={label} className="mt-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
          expire
        </span>
      </div>
    </div>
  );
}

export function ScanLineDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-sl3",
        { top: "4%" },
        { top: "92%", duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true }
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div
        className="relative h-28 w-44 overflow-hidden rounded-xl border border-white/15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,228,72,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(10,228,72,0.07) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <span className="d-sl3 absolute inset-x-2 h-0.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(10,228,72,0.6)]" />
        <p className="absolute bottom-1.5 w-full text-center font-mono text-[8px] uppercase tracking-[0.3em] text-white/30">
          scan en cours…
        </p>
      </div>
    </div>
  );
}

export function RingLoaderDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-rl-svg", { rotation: 360, duration: 1.4, ease: "none", repeat: -1 });
      gsap.fromTo(
        ".d-rl-c",
        { drawSVG: "8%" },
        { drawSVG: "80%", duration: 0.9, ease: "power2.inOut", repeat: -1, yoyo: true }
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg className="d-rl-svg h-14 w-14" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="15" fill="none" stroke="#ffffff15" strokeWidth="3" />
        <circle className="d-rl-c" cx="20" cy="20" r="15" fill="none" stroke="#0ae448" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function TickClockDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-tc-s", { rotation: 360, duration: 60, ease: "steps(60)", repeat: -1 });
      gsap.to(".d-tc-m", { rotation: 360, duration: 600, ease: "steps(60)", repeat: -1 });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative h-20 w-20 rounded-full border border-white/15 bg-white/[0.03]">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-1 w-px bg-white/25"
            style={{ transform: `rotate(${i * 30}deg) translateY(-9px)`, transformOrigin: "0 0" }}
          />
        ))}
        <span
          className="d-tc-m absolute bottom-1/2 left-1/2 h-6 w-0.5 -translate-x-1/2 rounded bg-white/60"
          style={{ transformOrigin: "50% 100%", rotate: "40deg" }}
        />
        <span
          className="d-tc-s absolute bottom-1/2 left-1/2 h-8 w-px -translate-x-1/2 rounded bg-accent"
          style={{ transformOrigin: "50% 100%" }}
        />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </div>
    </div>
  );
}

/* ---------- scroll (vague 3) ---------- */

export function DrawScrollDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => gsap.set(".d-ds-path", { drawSVG: "0%" }), { scope: root });
  return (
    <div ref={root} className="relative h-full">
      <svg viewBox="0 0 200 300" className="absolute left-3 top-0 h-full w-12">
        <path
          className="d-ds-path"
          d="M24 10 C 150 50, 30 100, 100 150 S 160 250, 90 295"
          fill="none"
          stroke="#0ae448"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <div
        onScroll={(e) => gsap.set(root.current!.querySelector(".d-ds-path"), { drawSVG: `${scrollP(e.currentTarget) * 100}%` })}
        className="mini-scroll h-full space-y-24 overflow-y-auto pl-16 pr-4 pt-6"
      >
        {["Départ", "Montée", "Virage", "Arrivée"].map((t) => (
          <p key={t} className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
            {t} — le fil se dessine au scroll
          </p>
        ))}
        <div className="h-16" />
      </div>
    </div>
  );
}

export function ScrollFlipDemo() {
  const root = useRef<HTMLDivElement>(null);
  const onScroll = (e: ReactUIEvent<HTMLDivElement>) => {
    const frame = e.currentTarget.getBoundingClientRect();
    root.current!.querySelectorAll<HTMLElement>(".d-sf").forEach((c) => {
      const r = c.getBoundingClientRect();
      const p = gsap.utils.clamp(0, 1, (frame.bottom - r.top) / (frame.height * 0.55));
      gsap.set(c, { rotationX: (1 - p) * -65, opacity: 0.15 + p * 0.85 });
    });
  };
  return (
    <div ref={root} className="h-full">
      <div
        onScroll={onScroll}
        className="mini-scroll h-full space-y-3 overflow-y-auto px-6 py-4"
        style={{ perspective: "500px" }}
      >
        <p className="py-6 text-center font-mono text-[9px] text-white/30">↓ scroll ↓</p>
        {["Carte 01", "Carte 02", "Carte 03", "Carte 04", "Carte 05"].map((t) => (
          <div
            key={t}
            className="d-sf grid h-16 place-items-center rounded-xl border border-accent/25 bg-accent/[0.06] font-mono text-[10px] text-accent will-change-transform"
          >
            {t}
          </div>
        ))}
        <div className="h-10" />
      </div>
    </div>
  );
}

export function WordFocusDemo() {
  const root = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLElement[]>([]);
  useGSAP(
    () => {
      const split = new SplitText(".d-wf", { type: "words" });
      words.current = split.words as HTMLElement[];
      gsap.set(words.current, { opacity: 0.18 });
      return () => split.revert();
    },
    { scope: root }
  );
  const onScroll = (e: ReactUIEvent<HTMLDivElement>) => {
    const idx = Math.floor(scrollP(e.currentTarget) * words.current.length);
    words.current.forEach((w, i) => gsap.set(w, { opacity: i <= idx ? 1 : 0.18 }));
  };
  return (
    <div ref={root} className="h-full">
      <div onScroll={onScroll} className="mini-scroll h-full overflow-y-auto px-6 py-4">
        <div className="h-8" />
        <p className="d-wf text-base font-semibold leading-relaxed">
          Le scroll allume chaque mot à mesure que tu lis — la lecture devient une progression visible,
          comme si le texte répondait à ton rythme.
        </p>
        <div className="h-40" />
      </div>
    </div>
  );
}

/* ---------- media (vague 3) ---------- */

export function ImgMarqueeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tw = useRef<gsap.core.Tween | null>(null);
  useGSAP(
    (_, contextSafe) => {
      tw.current = gsap.to(".d-im", { xPercent: -50, duration: 14, ease: "none", repeat: -1 });
      const el = root.current!;
      const slow = contextSafe?.(() => gsap.to(tw.current, { timeScale: 0.12, duration: 0.4 }));
      const fast = contextSafe?.(() => gsap.to(tw.current, { timeScale: 1, duration: 0.4 }));
      el.addEventListener("mouseenter", slow!);
      el.addEventListener("mouseleave", fast!);
      return () => {
        el.removeEventListener("mouseenter", slow!);
        el.removeEventListener("mouseleave", fast!);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative flex h-full items-center overflow-hidden">
      <div className="d-im flex w-max gap-2 will-change-transform">
        {[...Array(2)].map((_, k) =>
          ["IMG_A", "IMG_B", "IMG_C", "IMG_D", "IMG_E", "IMG_F"].map((t, i) => (
            <div
              key={`${k}-${i}`}
              className={`grid h-20 w-28 shrink-0 place-items-center rounded-lg border font-mono text-[8px] ${
                i % 2 ? "border-[#4da3ff]/30 bg-[#4da3ff]/10 text-[#4da3ff]" : "border-accent/30 bg-accent/10 text-accent"
              }`}
            >
              {t}
            </div>
          ))
        )}
      </div>
      <p className="pointer-events-none absolute bottom-2 w-full text-center font-mono text-[8px] text-white/30">
        survoler → ralenti
      </p>
    </div>
  );
}

const MASONRY = [52, 34, 44, 60, 30, 48, 38, 56];
export function MasonryFlipDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);
  const flip = useRef<ReturnType<typeof Flip.getState> | null>(null);
  useGSAP(
    () => {
      if (!flip.current) return;
      Flip.from(flip.current, { duration: 0.55, ease: "power3.inOut", absolute: true });
      flip.current = null;
    },
    { scope: root, dependencies: [wide] }
  );
  return (
    <div ref={root} className="flex h-full flex-col justify-center gap-2.5 px-6">
      <button
        data-hover
        onClick={() => {
          flip.current = Flip.getState(root.current!.querySelectorAll(".d-mf2"));
          setWide((w) => !w);
        }}
        className="self-start rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] text-accent"
      >
        {wide ? "3 colonnes" : "2 colonnes"} ⇄
      </button>
      <div className="flex flex-wrap gap-1.5">
        {MASONRY.map((h, i) => (
          <div
            key={i}
            className="d-mf2 grid place-items-center rounded-lg border border-white/15 bg-white/[0.04] font-mono text-[8px] text-white/40"
            style={{ width: wide ? "31.5%" : "48.5%", height: h * 1.6 }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SplitImageDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!.querySelector(".d-si")!;
      const enter =
        contextSafe?.(() =>
          gsap.to(".d-si-s", {
            xPercent: (i) => (i % 2 ? 16 : -16),
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.03,
          })
        ) ?? (() => {});
      const leave =
        contextSafe?.(() => gsap.to(".d-si-s", { xPercent: 0, duration: 0.5, ease: "elastic.out(1,0.7)" })) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div data-hover className="d-si relative h-24 w-44 overflow-hidden rounded-xl">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="d-si-s absolute inset-x-0 will-change-transform"
            style={{
              top: `${i * 25}%`,
              height: "25%",
              backgroundImage: "linear-gradient(120deg, #0ae448 0%, #4da3ff 55%, #c17bff 100%)",
              backgroundSize: "100% 400%",
              backgroundPosition: `0 ${(i / 3) * 100}%`,
            }}
          />
        ))}
        <p className="pointer-events-none absolute inset-0 grid place-items-center bg-black/25 font-mono text-[9px] uppercase tracking-[0.25em] text-white/80">
          image éclatée
        </p>
      </div>
    </div>
  );
}

export function WipeImageDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [b, setB] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-wi-top", {
        clipPath: b ? "inset(0% 0% 0% 100%)" : "inset(0% 0% 0% 0%)",
        duration: 0.7,
        ease: "power3.inOut",
      });
    },
    { scope: root, dependencies: [b] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div data-hover onClick={() => setB((x) => !x)} className="relative h-24 w-44 cursor-pointer overflow-hidden rounded-xl border border-white/15">
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#c17bff]/40 to-[#4da3ff]/30 font-mono text-[9px] text-white/70">
          V2 — nouvelle image
        </div>
        <div
          className="d-wi-top absolute inset-0 grid place-items-center bg-gradient-to-br from-accent/40 to-accent/10 font-mono text-[9px] text-white/70"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          V1 — image actuelle
        </div>
      </div>
    </div>
  );
}

/* ---------- édito (vague 3) ---------- */

export function CharCountDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [len, setLen] = useState(0);
  const MAX = 160;
  const over = len > MAX;
  useGSAP(
    () => {
      gsap.to(".d-cc-bar", {
        width: `${Math.min(100, (len / MAX) * 100)}%`,
        backgroundColor: over ? "#ff4d6d" : "#0ae448",
        duration: 0.25,
      });
      gsap.to(".d-cc-n", { color: over ? "#ff4d6d" : "#0ae448", duration: 0.25 });
    },
    { scope: root, dependencies: [len] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-7">
      <div className="w-full">
        <textarea
          rows={3}
          placeholder="Rédige ton message…"
          onChange={(e) => setLen(e.target.value.length)}
          className="w-full resize-none rounded-lg border border-white/15 bg-transparent p-2.5 font-mono text-[10px] text-white/80 outline-none placeholder:text-white/25"
        />
        <div className="mt-1.5 flex items-center justify-between">
          <div className="h-0.5 w-2/3 overflow-hidden rounded-full bg-white/10">
            <div className="d-cc-bar h-full w-0 rounded-full" />
          </div>
          <span className="d-cc-n font-mono text-[9px] tabular-nums text-accent">
            {len}/{MAX}
          </span>
        </div>
      </div>
    </div>
  );
}

export function InlineExpandDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const flip = useRef<ReturnType<typeof Flip.getState> | null>(null);
  useGSAP(
    () => {
      if (!flip.current) return;
      Flip.from(flip.current, { duration: 0.5, ease: "power3.inOut", absolute: true });
      flip.current = null;
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6">
      <p className="text-[10px] leading-relaxed text-white/60">
        Le reportage s&apos;ouvre sur une image
        <button
          data-hover
          onClick={() => {
            flip.current = Flip.getState(root.current!.querySelector(".d-ie"));
            setOpen((o) => !o);
          }}
          className={`d-ie mx-1 rounded bg-gradient-to-r from-accent/40 to-[#4da3ff]/40 align-middle font-mono text-[8px] text-accent ${
            open ? "block h-16 w-full" : "inline-block h-4 w-12"
          }`}
        >
          {open ? "réduire" : "IMG"}
        </button>
        qui s&apos;étend dans le flux du texte — le paragraphe se réorganise autour d&apos;elle sans saut brutal.
      </p>
    </div>
  );
}

export function ListMarkerDemo() {
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef(new Set<number>());
  const onScroll = (e: ReactUIEvent<HTMLDivElement>) => {
    const sc = e.currentTarget;
    const line = sc.scrollTop + sc.clientHeight * 0.85;
    sc.querySelectorAll<HTMLElement>(".d-lm").forEach((li, i) => {
      if (shown.current.has(i) || li.offsetTop > line) return;
      shown.current.add(i);
      gsap.to(li, { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(li.querySelector(".d-lm-m"), { scaleX: 1, duration: 0.35, ease: "power2.out" });
    });
  };
  return (
    <div ref={root} className="h-full">
      <div onScroll={onScroll} className="mini-scroll h-full space-y-3 overflow-y-auto px-6 py-4">
        <div className="h-6" />
        {["Recherche", "Wireframes", "Direction artistique", "Prototype", "Tests usagers", "Livraison"].map((t) => (
          <div key={t} className="d-lm flex -translate-x-4 items-center gap-2.5 opacity-0">
            <span className="d-lm-m h-px w-5 origin-left scale-x-0 bg-accent" />
            <span className="font-mono text-[11px] text-white/70">{t}</span>
          </div>
        ))}
        <div className="h-10" />
      </div>
    </div>
  );
}

const DATES = ["12 MAI", "03 JUIN", "27 AOÛT", "09 OCT"];
export function DateStampDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-ds",
        { scale: 2.4, opacity: 0, rotation: -20 },
        { scale: 1, opacity: 1, rotation: -8, duration: 0.35, ease: "power4.in" }
      );
      gsap.fromTo(root.current, { x: 3 }, { x: 0, duration: 0.3, ease: "elastic.out(1,0.3)", delay: 0.32 });
    },
    { scope: root, dependencies: [i] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div className="d-ds rounded border-2 border-accent px-4 py-2 font-mono text-sm font-bold uppercase tracking-[0.2em] text-accent">
          Publié · {DATES[i]}
        </div>
        <button
          data-hover
          onClick={() => setI((x) => (x + 1) % DATES.length)}
          className="mt-4 rounded-full border border-white/15 px-4 py-1.5 font-mono text-[9px] text-white/60"
        >
          tamponner →
        </button>
      </div>
    </div>
  );
}

/* ---------- page (vague 3) ---------- */

export function BlurTransitionDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useGSAP(
    (_, contextSafe) => {
      const go =
        contextSafe?.(() => {
          const out = root.current!.querySelector(".d-bt2-out")!;
          const into = root.current!.querySelector(".d-bt2-in")!;
          const tl = gsap.timeline();
          tl.to(out, { filter: "blur(14px)", scale: 0.92, opacity: 0, duration: 0.45, ease: "power2.in" })
            .call(() => setP((x) => x + 1))
            .fromTo(
              into,
              { filter: "blur(14px)", scale: 1.06, opacity: 0 },
              { filter: "blur(0px)", scale: 1, opacity: 1, duration: 0.55, ease: "power2.out" }
            )
            .set(out, { filter: "blur(0px)", scale: 1, opacity: 1 });
        }) ?? (() => {});
      root.current!.addEventListener("click", go);
      return () => root.current?.removeEventListener("click", go);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center overflow-hidden">
      <div className="d-bt2-out absolute inset-0 grid place-items-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">VUE_{String((p % 2) + 1).padStart(2, "0")}</p>
      </div>
      <div className="d-bt2-in pointer-events-none absolute inset-0 grid place-items-center opacity-0">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">VUE_{String(((p + 1) % 2) + 1).padStart(2, "0")}</p>
      </div>
      <p className="pointer-events-none absolute bottom-3 font-mono text-[9px] text-white/30">cliquer → flou de transition</p>
    </div>
  );
}

const PAGES_RS = [
  ["Accueil", "Portfolio", "Studio"],
  ["Journal", "Archives", "Contact"],
];
export function RouteStaggerDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-rs",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out" }
      );
    },
    { scope: root, dependencies: [p] }
  );
  const go = () => {
    gsap.to(".d-rs", {
      y: -18,
      opacity: 0,
      stagger: 0.05,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => setP((x) => (x + 1) % 2),
    });
  };
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="space-y-2.5 text-center">
        {PAGES_RS[p].map((t) => (
          <p key={`${p}-${t}`} className="d-rs font-mono text-sm uppercase tracking-[0.3em] text-white/70">
            {t}
          </p>
        ))}
        <button data-hover onClick={go} className="mt-4 rounded-full border border-white/15 px-4 py-1.5 font-mono text-[9px] text-accent">
          changer de vue →
        </button>
      </div>
    </div>
  );
}

export function DiagonalWipeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useGSAP(
    (_, contextSafe) => {
      const go =
        contextSafe?.(() => {
          const tl = gsap.timeline();
          tl.fromTo(".d-dw", { xPercent: -170 }, { xPercent: 0, duration: 0.5, ease: "power3.inOut" })
            .call(() => setP((x) => x + 1))
            .to(".d-dw", { xPercent: 170, duration: 0.5, ease: "power3.inOut" }, "+=0.05");
        }) ?? (() => {});
      root.current!.addEventListener("click", go);
      return () => root.current?.removeEventListener("click", go);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center overflow-hidden">
      <p className="pointer-events-none font-mono text-xs uppercase tracking-[0.3em] text-white/60">
        SCÈNE_{String(p + 1).padStart(2, "0")}
      </p>
      <div
        className="d-dw pointer-events-none absolute -left-1/3 top-0 h-[140%] w-[170%] -translate-y-[15%] bg-accent"
        style={{ transform: "translateX(-170%) skewX(-14deg)" }}
      />
      <p className="pointer-events-none absolute bottom-3 font-mono text-[9px] text-white/30">cliquer → balayage diagonal</p>
    </div>
  );
}

/* ---------- drag (vague 3) ---------- */

export function DragPathDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tween = gsap.to(".d-dp-dot", {
        motionPath: {
          path: "#d-dp-path",
          align: "#d-dp-path",
          alignOrigin: [0.5, 0.5],
        },
        duration: 1,
        ease: "none",
        paused: true,
        immediateRender: true,
      });
      const d = Draggable.create(".d-dp-proxy", {
        type: "x",
        trigger: ".d-dp-dot",
        bounds: { minX: 0, maxX: 160 },
        onDrag() {
          tween.progress(this.x / 160);
        },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center">
      <svg viewBox="0 0 200 120" className="h-28 w-48">
        <path id="d-dp-path" d="M16 90 C 60 10, 140 110, 184 30" fill="none" stroke="#ffffff22" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
      <div data-hover className="d-dp-dot absolute left-[16%] top-[75%] h-5 w-5 cursor-grab rounded-full bg-accent will-change-transform active:cursor-grabbing" />
      <div className="d-dp-proxy absolute h-px w-px" />
      <p className="absolute bottom-3 font-mono text-[8px] uppercase tracking-[0.3em] text-white/30">tire le point le long du rail</p>
    </div>
  );
}

export function SwipeTabsDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(0);
  const w = useRef(0);
  useGSAP(
    () => {
      const frame = root.current!.querySelector<HTMLElement>(".d-st2-frame")!;
      w.current = frame.clientWidth;
      const d = Draggable.create(".d-st2-track", {
        type: "x",
        inertia: true,
        bounds: { minX: -w.current * 2, maxX: 0 },
        snap: { x: (v: number) => Math.round(v / w.current) * w.current },
        onThrowComplete() {
          setTab(Math.round(-this.x / w.current));
        },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full flex-col items-center justify-center gap-3">
      <div className="d-st2-frame w-44 overflow-hidden rounded-xl border border-white/15">
        <div className="d-st2-track flex w-max will-change-transform">
          {["Écran A", "Écran B", "Écran C"].map((t, i) => (
            <div key={t} className="grid h-20 w-44 shrink-0 place-items-center font-mono text-[10px]" style={{ color: ["#0ae448", "#4da3ff", "#c17bff"][i] }}>
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${tab === i ? "w-4 bg-accent" : "w-1.5 bg-white/20"}`} />
        ))}
      </div>
      <p className="font-mono text-[8px] text-white/30">glisser ↔</p>
    </div>
  );
}

export function StripDragDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const frame = root.current!.querySelector<HTMLElement>(".d-sd-frame")!;
      const strip = root.current!.querySelector<HTMLElement>(".d-sd-strip")!;
      const d = Draggable.create(strip, {
        type: "x",
        inertia: true,
        bounds: { minX: frame.clientWidth - strip.scrollWidth - 8, maxX: 0 },
        edgeResistance: 0.8,
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="flex h-full items-center">
      <div className="d-sd-frame w-full overflow-hidden">
        <div className="d-sd-strip flex w-max gap-2 px-2 will-change-transform">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              data-hover
              className={`grid h-20 w-24 shrink-0 cursor-grab place-items-center rounded-lg border font-mono text-[9px] active:cursor-grabbing ${
                i % 2 ? "border-white/15 bg-white/[0.05] text-white/45" : "border-accent/30 bg-accent/10 text-accent"
              }`}
            >
              CARD_{i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MagnetSnapDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const ball = root.current!.querySelector<HTMLElement>(".d-ms")!;
      const anchors = gsap.utils.toArray<HTMLElement>(".d-ms-a");
      const origin = ball.getBoundingClientRect();
      const oc = { x: origin.left + origin.width / 2, y: origin.top + origin.height / 2 };
      const d = Draggable.create(ball, {
        type: "x,y",
        inertia: true,
        bounds: root.current,
        onDragEnd() {
          const bc = ball.getBoundingClientRect();
          const c = { x: bc.left + bc.width / 2, y: bc.top + bc.height / 2 };
          const best = anchors.reduce<{ x: number; y: number; d: number } | null>((acc, a) => {
            const r = a.getBoundingClientRect();
            const ac = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
            const dd = Math.hypot(ac.x - c.x, ac.y - c.y);
            return !acc || dd < acc.d ? { x: ac.x - oc.x, y: ac.y - oc.y, d: dd } : acc;
          }, null);
          if (best) gsap.to(ball, { x: best.x, y: best.y, duration: 0.5, ease: "back.out(1.8)" });
        },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative h-full">
      <div className="absolute top-6 flex w-full justify-around px-8">
        {["A", "B", "C"].map((t) => (
          <div key={t} className="d-ms-a grid h-10 w-10 place-items-center rounded-full border border-dashed border-white/25 font-mono text-[9px] text-white/40">
            {t}
          </div>
        ))}
      </div>
      <div data-hover className="d-ms absolute bottom-8 left-1/2 h-8 w-8 -translate-x-1/2 cursor-grab rounded-full bg-accent will-change-transform active:cursor-grabbing" />
      <p className="absolute bottom-2 w-full text-center font-mono text-[8px] text-white/30">relâche près d&apos;un ancrage</p>
    </div>
  );
}

/* ---------- tools (vague 3) ---------- */

export function TweenControlsDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tw = useRef<gsap.core.Tween | null>(null);
  useGSAP(
    () => {
      tw.current = gsap.to(".d-tc2", { x: 130, repeat: -1, yoyo: true, duration: 1, ease: "power1.inOut" });
      return () => tw.current?.kill();
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6">
      <div className="w-full">
        <div className="relative h-7 rounded-full border border-white/10">
          <div className="d-tc2 absolute left-1 top-1 h-5 w-5 rounded-full bg-accent" />
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {(["play", "pause", "reverse", "restart"] as const).map((c) => (
            <button
              key={c}
              data-hover
              onClick={() => tw.current?.[c]()}
              className="rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] text-white/60"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TimeScaleDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [ts, setTs] = useState(1);
  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ repeat: -1 })
        .to(".d-ts2", { x: 120, duration: 1, ease: "power1.inOut" })
        .to(".d-ts2", { rotation: 180, duration: 0.8, ease: "power2.inOut" })
        .to(".d-ts2", { x: 0, rotation: 0, duration: 1.2, ease: "power1.inOut" });
      return () => tl.current?.kill();
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="w-full">
        <div className="relative h-7 rounded-full border border-white/10">
          <div className="d-ts2 absolute left-1 top-1 h-5 w-5 rounded bg-accent" />
        </div>
        <input
          type="range"
          min={10}
          max={300}
          value={ts * 100}
          onChange={(e) => {
            const v = Number(e.target.value) / 100;
            setTs(v);
            tl.current?.timeScale(v);
          }}
          className="mt-3 w-full accent-[#0ae448]"
        />
        <p className="text-center font-mono text-[10px] text-accent">timeScale ×{ts.toFixed(1)}</p>
      </div>
    </div>
  );
}

export function TimelineScrubDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [prog, setProg] = useState(0);
  const [playing, setPlaying] = useState(false);
  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, onUpdate: () => setProg(Math.round((tl.current?.progress() ?? 0) * 100)) })
        .to(".d-tl", { x: 60, y: -30, duration: 1, ease: "power2.inOut" })
        .to(".d-tl", { x: 120, y: 0, duration: 1, ease: "power2.inOut" })
        .to(".d-tl", { x: 60, y: 25, rotation: 180, duration: 1, ease: "power2.inOut" })
        .to(".d-tl", { x: 0, y: 0, rotation: 360, duration: 1, ease: "power2.inOut" });
      return () => tl.current?.kill();
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="w-full">
        <div className="relative h-16 rounded-xl border border-white/10">
          <div className="d-tl absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md bg-accent will-change-transform" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={prog}
          onChange={(e) => {
            const v = Number(e.target.value);
            setPlaying(false);
            tl.current?.pause();
            tl.current?.progress(v / 100);
          }}
          className="mt-3 w-full accent-[#0ae448]"
        />
        <div className="flex items-center justify-between">
          <button
            data-hover
            onClick={() => {
              const np = !playing;
              setPlaying(np);
              if (np) tl.current?.play();
              else tl.current?.pause();
            }}
            className="font-mono text-[9px] text-accent"
          >
            {playing ? "pause" : "▶ play"}
          </button>
          <span className="font-mono text-[9px] tabular-nums text-white/40">{prog}%</span>
        </div>
      </div>
    </div>
  );
}

export function QuickSetterDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const qx = gsap.quickTo(".d-qs-a", "x", { duration: 0.45, ease: "power3" });
      const b = root.current!.querySelector<HTMLElement>(".d-qs-b")!;
      const onMove =
        contextSafe?.((e: MouseEvent) => {
          const r = root.current!.getBoundingClientRect();
          const x = e.clientX - r.left - 10;
          qx(x);
          gsap.set(b, { x });
        }) ?? (() => {});
      root.current!.addEventListener("mousemove", onMove);
      return () => root.current?.removeEventListener("mousemove", onMove);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative h-full cursor-crosshair">
      <div className="absolute left-0 top-1/3 flex w-full items-center gap-2 px-3">
        <span className="w-16 text-right font-mono text-[8px] text-white/40">quickTo</span>
        <div className="d-qs-a h-4 w-4 rounded-full bg-accent" />
      </div>
      <div className="absolute left-0 top-2/3 flex w-full items-center gap-2 px-3">
        <span className="w-16 text-right font-mono text-[8px] text-white/40">gsap.set</span>
        <div className="d-qs-b h-4 w-4 rounded-full bg-white/50" />
      </div>
      <p className="absolute bottom-3 w-full text-center font-mono text-[8px] text-white/30">
        bouge la souris — fluide vs instantané
      </p>
    </div>
  );
}

/* ---------- ui (vague 4) ---------- */

export function RatingInputDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState(0);
  const [hoverN, setHoverN] = useState(0);
  const shown = hoverN || rating;
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div className="flex gap-1.5" onMouseLeave={() => setHoverN(0)}>
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              data-hover
              onMouseEnter={() => setHoverN(i)}
              onClick={() => {
                setRating(i);
                gsap.fromTo(
                  root.current!.querySelectorAll(".d-ri")[i - 1],
                  { scale: 1.6, rotation: -12 },
                  { scale: 1, rotation: 0, duration: 0.5, ease: "elastic.out(1,0.4)" }
                );
              }}
              className={`d-ri text-2xl transition-colors ${i <= shown ? "text-accent" : "text-white/15"}`}
            >
              ★
            </button>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] text-white/40">{rating ? `${rating}/5` : "note…"}</p>
      </div>
    </div>
  );
}

export function ConfirmInlineDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const timer = useRef<gsap.core.Tween | null>(null);
  const click = () => {
    timer.current?.kill();
    if (step === 0) {
      setStep(1);
      timer.current = gsap.delayedCall(2.5, () => setStep(0));
    } else if (step === 1) {
      setStep(2);
      timer.current = gsap.delayedCall(1.6, () => setStep(0));
    }
  };
  useGSAP(() => () => timer.current?.kill(), { scope: root });
  const styles = [
    "border-white/15 text-white/60",
    "border-[#ff4d6d]/60 bg-[#ff4d6d]/10 text-[#ff4d6d]",
    "border-accent/60 bg-accent/10 text-accent",
  ];
  const labels = ["Supprimer", "Confirmer ?", "✓ Supprimé"];
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button data-hover onClick={click} className={`d-ci rounded-full border px-6 py-2.5 font-mono text-[11px] transition-colors ${styles[step]}`}>
        {labels[step]}
      </button>
    </div>
  );
}

export function TreeViewDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);
  useGSAP(
    () => {
      const sub = root.current!.querySelector<HTMLElement>(".d-tv2")!;
      gsap.to(sub, { height: open ? sub.scrollHeight : 0, duration: 0.4, ease: "power3.inOut" });
      gsap.to(".d-tv2-caret", { rotation: open ? 90 : 0, duration: 0.25 });
      gsap.fromTo(".d-tv2-i", { x: -8, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, duration: 0.3, delay: open ? 0.12 : 0 });
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-10">
      <div className="w-full font-mono text-[11px]">
        <button data-hover onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-2 py-1 text-left text-white/80">
          <span className="d-tv2-caret inline-block text-accent">▸</span> 📁 components
        </button>
        <div className="d-tv2 overflow-hidden" style={{ height: "auto" }}>
          {["Button.tsx", "Card.tsx", "Modal.tsx"].map((f) => (
            <p key={f} className="d-tv2-i py-1 pl-7 text-white/45">
              📄 {f}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FileListDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<{ id: number; name: string; done: boolean }[]>([]);
  const n = useRef(0);
  const seen = useRef(new Set<number>());
  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".d-fl");
      files.forEach((f, i) => {
        if (seen.current.has(f.id) || !rows[i]) return;
        seen.current.add(f.id);
        gsap.fromTo(rows[i], { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
        gsap.fromTo(
          rows[i].querySelector(".d-fl-bar"),
          { width: "0%" },
          {
            width: "100%",
            duration: 1.4,
            ease: "power1.inOut",
            onComplete: () =>
              setFiles((fs) => fs.map((x) => (x.id === f.id ? { ...x, done: true } : x))),
          }
        );
      });
    },
    { scope: root, dependencies: [files] }
  );
  return (
    <div ref={root} className="flex h-full flex-col items-center justify-center gap-2.5 px-8">
      <div className="w-full space-y-1.5">
        {files.length === 0 && <p className="py-4 text-center font-mono text-[9px] text-white/30">aucun fichier</p>}
        {files.map((f) => (
          <div key={f.id} className="d-fl rounded-lg border border-white/10 px-3 py-2">
            <div className="flex justify-between font-mono text-[9px]">
              <span className="text-white/60">📄 {f.name}</span>
              <span className={f.done ? "text-accent" : "text-white/35"}>{f.done ? "✓" : "…"}</span>
            </div>
            <div className="mt-1 h-0.5 rounded-full bg-white/10">
              <div className={`d-fl-bar h-full w-0 rounded-full ${f.done ? "bg-accent" : "bg-accent/60"}`} />
            </div>
          </div>
        ))}
      </div>
      <button
        data-hover
        onClick={() => setFiles((fs) => [...fs, { id: ++n.current, name: `export_${n.current}.mp4`, done: false }])}
        className="rounded-full border border-white/15 px-4 py-1.5 font-mono text-[9px] text-accent"
      >
        + envoyer un fichier
      </button>
    </div>
  );
}

export function EmptyStateDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);
  useGSAP(
    () => {
      if (filled) {
        gsap.fromTo(".d-es-item", { y: 14, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.45, ease: "back.out(1.6)" });
      } else {
        gsap.to(".d-es-dot", { y: -6, repeat: -1, yoyo: true, stagger: 0.25, duration: 0.9, ease: "sine.inOut" });
      }
    },
    { scope: root, dependencies: [filled], revertOnUpdate: true }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      {!filled ? (
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/20">
            {[0, 1, 2].map((i) => (
              <span key={i} className="d-es-dot h-1.5 w-1.5 rounded-full bg-white/25" />
            ))}
          </div>
          <p className="font-mono text-[10px] text-white/45">C&apos;est vide ici</p>
          <button data-hover onClick={() => setFilled(true)} className="mt-3 rounded-full border border-accent/50 px-4 py-1.5 font-mono text-[9px] text-accent">
            + ajouter des items
          </button>
        </div>
      ) : (
        <div className="w-full max-w-40 space-y-1.5">
          {["Hero section", "Menu mobile", "Footer"].map((t) => (
            <div key={t} className="d-es-item rounded-lg border border-accent/25 bg-accent/[0.06] px-3 py-2 font-mono text-[9px] text-accent">
              ✓ {t}
            </div>
          ))}
          <button data-hover onClick={() => setFilled(false)} className="w-full pt-1 text-center font-mono text-[9px] text-white/40">
            ↺ vider
          </button>
        </div>
      )}
    </div>
  );
}

export function ProfilePopDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const card = root.current!.querySelector(".d-pp-card")!;
      let call: gsap.core.Tween | null = null;
      const enter =
        contextSafe?.(() => {
          call?.kill();
          call = gsap.delayedCall(0.35, () =>
            gsap.fromTo(card, { opacity: 0, y: 8, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.8)" })
          );
        }) ?? (() => {});
      const leave =
        contextSafe?.(() => {
          call?.kill();
          gsap.to(card, { opacity: 0, y: 8, scale: 0.92, duration: 0.2 });
        }) ?? (() => {});
      const av = root.current!.querySelector(".d-pp")!;
      av.addEventListener("mouseenter", enter);
      av.addEventListener("mouseleave", leave);
      return () => {
        av.removeEventListener("mouseenter", enter);
        av.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative">
        <div data-hover className="d-pp grid h-11 w-11 place-items-center rounded-full bg-accent font-mono text-xs font-bold text-black">
          IA
        </div>
        <div className="d-pp-card pointer-events-none absolute -top-24 left-1/2 w-40 -translate-x-1/2 rounded-xl border border-white/15 bg-[#161616] p-3 opacity-0 shadow-xl">
          <p className="font-mono text-[10px] font-bold text-white/80">Iansan Studio</p>
          <p className="mt-0.5 font-mono text-[8px] text-white/40">@iansan · Motion design</p>
          <p className="mt-1.5 font-mono text-[8px] text-accent">● en ligne</p>
        </div>
        <p className="absolute -bottom-8 w-40 -translate-x-1/2 text-center font-mono text-[8px] text-white/30">survole l&apos;avatar</p>
      </div>
    </div>
  );
}

/* ---------- hover (vague 4) ---------- */

export function WobbleIconDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      CustomWiggle.create("wob-ic", { wiggles: 5, type: "anticipate" });
      const el = root.current!.querySelector(".d-wi2")!;
      const enter =
        contextSafe?.(() => gsap.fromTo(".d-wi2-i", { rotation: -10 }, { rotation: 0, duration: 0.8, ease: "wob-ic" })) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      return () => el.removeEventListener("mouseenter", enter);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <button data-hover className="d-wi2 grid h-12 w-12 place-items-center rounded-xl border border-white/15 text-lg">
        <span className="d-wi2-i inline-block">🔔</span>
      </button>
    </div>
  );
}

export function TrackingOutDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!.querySelector(".d-to")!;
      const enter = contextSafe?.(() => gsap.to(".d-to", { letterSpacing: "0.5em", duration: 0.5, ease: "power3.out" })) ?? (() => {});
      const leave = contextSafe?.(() => gsap.to(".d-to", { letterSpacing: "0em", duration: 0.45, ease: "power3.inOut" })) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p data-hover className="d-to cursor-default text-2xl font-black uppercase text-white/80">
        Espacer
      </p>
    </div>
  );
}

export function RevealActionsDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!.querySelector(".d-ra")!;
      const enter =
        contextSafe?.(() => {
          gsap.to(".d-ra-btns", { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" });
          gsap.to(".d-ra-txt", { x: -6, duration: 0.3 });
        }) ?? (() => {});
      const leave =
        contextSafe?.(() => {
          gsap.to(".d-ra-btns", { x: 16, opacity: 0, duration: 0.25 });
          gsap.to(".d-ra-txt", { x: 0, duration: 0.3 });
        }) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center px-6">
      <div data-hover className="d-ra relative flex w-full items-center overflow-hidden rounded-xl border border-white/15 px-4 py-3">
        <span className="d-ra-txt font-mono text-[11px] text-white/70">document_final.pdf</span>
        <span className="d-ra-btns ml-auto flex translate-x-4 gap-1.5 opacity-0">
          {["✎", "⬇", "✕"].map((i) => (
            <span key={i} className="grid h-6 w-6 place-items-center rounded-md border border-white/15 text-[9px] text-accent">
              {i}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export function DashedRunDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tw = useRef<gsap.core.Tween | null>(null);
  useGSAP(
    (_, contextSafe) => {
      tw.current = gsap.to(".d-dashed", { strokeDashoffset: -40, duration: 1.4, ease: "none", repeat: -1, paused: true });
      const el = root.current!.querySelector(".d-dr2")!;
      const enter = contextSafe?.(() => tw.current?.play()) ?? (() => {});
      const leave =
        contextSafe?.(() => {
          tw.current?.pause();
          gsap.to(".d-dashed", { strokeDashoffset: 0, duration: 0.4 });
        }) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div data-hover className="d-dr2 relative px-8 py-3.5">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 36">
          <rect className="d-dashed" x="1" y="1" width="98" height="34" rx="8" fill="none" stroke="#0ae448" strokeWidth="1.5" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">sélection</span>
      </div>
    </div>
  );
}

export function TextFillXDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const el = root.current!.querySelector(".d-tf")!;
      const enter =
        contextSafe?.(() => gsap.to(".d-tf", { backgroundPosition: "0% 0", duration: 0.6, ease: "power2.out" })) ?? (() => {});
      const leave =
        contextSafe?.(() => gsap.to(".d-tf", { backgroundPosition: "100% 0", duration: 0.6, ease: "power2.in" })) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p
        data-hover
        className="d-tf cursor-default bg-clip-text text-3xl font-black uppercase text-transparent"
        style={{
          backgroundImage: "linear-gradient(90deg, #0ae448 50%, #ffffff22 50%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "100% 0",
        }}
      >
        remplir
      </p>
    </div>
  );
}

/* ---------- click (vague 4) ---------- */

export function DialClickDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [lvl, setLvl] = useState(0);
  useGSAP(
    () => {
      gsap.to(".d-dc", { rotation: lvl * 45, duration: 0.5, ease: "back.out(1.8)" });
    },
    { scope: root, dependencies: [lvl] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <button data-hover onClick={() => setLvl((l) => (l + 1) % 4)} className="relative block h-20 w-20 rounded-full border border-white/20 bg-white/[0.04]">
          <span className="d-dc absolute inset-0 block will-change-transform">
            <span className="absolute left-1/2 top-1.5 h-3 w-1 -translate-x-1/2 rounded bg-accent" />
          </span>
        </button>
        <div className="mt-2.5 flex justify-center gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`h-1 w-3 rounded-full ${i <= lvl ? "bg-accent" : "bg-white/15"}`} />
          ))}
        </div>
        <p className="mt-1.5 font-mono text-[9px] text-white/40">niveau {lvl + 1}/4</p>
      </div>
    </div>
  );
}

export function PinDropDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [pins, setPins] = useState<{ id: number; x: number; y: number }[]>([]);
  const n = useRef(0);
  const seen = useRef(new Set<number>());
  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".d-pd");
      pins.forEach((p, i) => {
        if (seen.current.has(p.id) || !els[i]) return;
        seen.current.add(p.id);
        gsap.fromTo(els[i], { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "bounce.out" });
        gsap.fromTo(
          els[i].querySelector(".d-pd-r"),
          { scale: 0.2, opacity: 0.8 },
          { scale: 2.4, opacity: 0, duration: 1, ease: "power2.out", delay: 0.45 }
        );
      });
    },
    { scope: root, dependencies: [pins] }
  );
  return (
    <div
      ref={root}
      data-hover
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPins((ps) => [...ps.slice(-4), { id: ++n.current, x: e.clientX - r.left, y: e.clientY - r.top }]);
      }}
      className="relative h-full cursor-crosshair overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {pins.map((p) => (
        <span key={p.id} className="d-pd pointer-events-none absolute -translate-x-1/2 -translate-y-full" style={{ left: p.x, top: p.y }}>
          <span className="d-pd-r absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 rounded-full border border-accent" />
          <span className="text-lg leading-none text-accent">📍</span>
        </span>
      ))}
      <p className="pointer-events-none absolute bottom-2 w-full text-center font-mono text-[8px] text-white/30">
        cliquer pour poser un repère
      </p>
    </div>
  );
}

export function FlashSnapDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const snap =
        contextSafe?.(() => {
          const tl = gsap.timeline();
          tl.fromTo(".d-fs-flash", { opacity: 0 }, { opacity: 1, duration: 0.06 })
            .to(".d-fs-flash", { opacity: 0, duration: 0.5, ease: "power2.out" })
            .fromTo(".d-fs-frame", { scale: 0.94, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
        }) ?? (() => {});
      const btn = root.current!.querySelector(".d-fs-btn")!;
      btn.addEventListener("click", snap);
      return () => btn.removeEventListener("click", snap);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="relative grid h-full place-items-center overflow-hidden">
      <div className="d-fs-frame grid h-24 w-40 place-items-center rounded-lg border border-white/15 bg-gradient-to-br from-white/[0.07] to-transparent font-mono text-[9px] text-white/40">
        viseur
      </div>
      <div className="d-fs-flash pointer-events-none absolute inset-0 bg-white opacity-0" />
      <button data-hover className="d-fs-btn absolute bottom-3 h-8 w-8 rounded-full border-2 border-white/40 bg-white/10" aria-label="photo" />
    </div>
  );
}

export function RadioPopDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState(1);
  useGSAP(
    () => {
      gsap.fromTo(".d-rp-dot", { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
    },
    { scope: root, dependencies: [sel] }
  );
  return (
    <div ref={root} className="flex h-full flex-col items-center justify-center gap-2">
      {["Standard", "Pro", "Studio"].map((t, i) => (
        <button
          key={t}
          data-hover
          onClick={() => setSel(i)}
          className="flex w-36 items-center gap-2.5 rounded-lg border border-white/10 px-3 py-2 text-left"
        >
          <span className={`grid h-4 w-4 place-items-center rounded-full border ${sel === i ? "border-accent" : "border-white/25"}`}>
            {sel === i && <span className="d-rp-dot h-2 w-2 rounded-full bg-accent" />}
          </span>
          <span className={`font-mono text-[10px] ${sel === i ? "text-accent" : "text-white/50"}`}>{t}</span>
        </button>
      ))}
    </div>
  );
}

export function SizeSelectDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState(1);
  const ind = useRef<HTMLSpanElement>(null);
  const pick = (i: number) => {
    const btn = root.current!.querySelectorAll<HTMLElement>(".d-ss2")[i];
    gsap.to(ind.current, { x: btn.offsetLeft, width: btn.offsetWidth, duration: 0.35, ease: "power3.inOut" });
    setSel(i);
  };
  useGSAP(
    () => {
      const btn = root.current!.querySelectorAll<HTMLElement>(".d-ss2")[sel];
      gsap.set(ind.current, { x: btn.offsetLeft, width: btn.offsetWidth });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative flex rounded-full border border-white/15 p-1">
        <span ref={ind} className="absolute left-0 top-1 h-[calc(100%-8px)] rounded-full bg-accent/20" />
        {["S", "M", "L", "XL"].map((t, i) => (
          <button
            key={t}
            data-hover
            onClick={() => pick(i)}
            className={`d-ss2 relative z-10 px-4 py-1.5 font-mono text-[11px] ${sel === i ? "text-accent" : "text-white/45"}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- drag (vague 4) ---------- */

export function KnobValueDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(40);
  useGSAP(
    () => {
      const proxy = root.current!.querySelector<HTMLElement>(".d-kv-proxy")!;
      const d = Draggable.create(proxy, {
        type: "y",
        trigger: ".d-kv",
        bounds: { minY: -100, maxY: 0 },
        onDrag() {
          const val = Math.round(-this.y);
          setV(val);
          gsap.set(".d-kv-needle", { rotation: -135 + val * 2.7 });
        },
      });
      gsap.set(proxy, { y: -v });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div data-hover className="d-kv relative mx-auto h-20 w-20 cursor-ns-resize rounded-full border-2 border-white/20 bg-white/[0.05]">
          <span className="d-kv-needle absolute inset-0 block will-change-transform" style={{ rotate: "-27deg" }}>
            <span className="absolute left-1/2 top-1.5 h-4 w-1 -translate-x-1/2 rounded bg-accent" />
          </span>
          <span className="absolute inset-0 grid place-items-center font-mono text-[9px] text-white/40">{v}</span>
        </div>
        <div className="d-kv-proxy absolute h-px w-px" />
        <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.3em] text-white/30">glisser ↕</p>
      </div>
    </div>
  );
}

export function BoxResizeDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const box = root.current!.querySelector<HTMLElement>(".d-br2")!;
      const d = Draggable.create(".d-br2-h", {
        type: "x,y",
        onDrag() {
          gsap.set(box, {
            width: gsap.utils.clamp(70, 190, 120 + this.x),
            height: gsap.utils.clamp(50, 130, 70 + this.y),
          });
        },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="d-br2 relative h-[70px] w-[120px] rounded-lg border border-accent/40 bg-accent/[0.07]">
        <span className="absolute left-2 top-1.5 font-mono text-[8px] text-accent/70">panneau</span>
        <div data-hover className="d-br2-h absolute -bottom-1.5 -right-1.5 h-5 w-5 cursor-nwse-resize rounded-md border border-accent bg-[#0a0a0a] text-center text-[9px] leading-4 text-accent">
          ⤡
        </div>
      </div>
    </div>
  );
}

export function ArcSliderDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(30);
  useGSAP(
    () => {
      gsap.set(".d-as-h", { rotation: -135 + v * 2.7 });
      const d = Draggable.create(".d-as-h", {
        type: "rotation",
        bounds: { minRotation: -135, maxRotation: 135 },
        onDrag() {
          setV(Math.round((this.rotation + 135) / 2.7));
        },
      });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <path d="M15 82 A 42 42 0 1 1 85 82" fill="none" stroke="#ffffff18" strokeWidth="4" strokeLinecap="round" />
          <path d="M15 82 A 42 42 0 1 1 85 82" fill="none" stroke="#0ae448" strokeWidth="4" strokeLinecap="round" strokeDasharray="210" strokeDashoffset={210 - (v / 100) * 210} />
        </svg>
        <div className="d-as-h absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-grab will-change-transform active:cursor-grabbing" style={{ transformOrigin: "50% 50%" }}>
          <span className="absolute -top-[42px] left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-[#0a0a0a]" />
        </div>
        <p className="absolute inset-0 grid place-items-center pt-2 font-mono text-sm font-bold text-accent">{v}</p>
      </div>
      <p className="absolute bottom-3 w-full text-center font-mono text-[8px] text-white/30">tourne la molette</p>
    </div>
  );
}

export function ScrubNumDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(64);
  useGSAP(
    () => {
      const proxy = root.current!.querySelector<HTMLElement>(".d-sn-proxy")!;
      const d = Draggable.create(proxy, {
        type: "x",
        trigger: ".d-sn",
        bounds: { minX: 0, maxX: 200 },
        onDrag() {
          setV(Math.round(this.x / 2));
        },
      });
      gsap.set(proxy, { x: v * 2 });
      return () => d.forEach((x) => x.kill());
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <p data-hover className="d-sn cursor-ew-resize select-none font-mono text-4xl font-black tabular-nums text-accent">
          {v}<span className="text-base text-white/40">px</span>
        </p>
        <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.3em] text-white/30">glisser ↔ pour ajuster</p>
        <div className="d-sn-proxy absolute h-px w-px" />
      </div>
    </div>
  );
}

/* ---------- loop (vague 4) ---------- */

const FLICKER = [1, 0.4, 1, 0.9, 0.2, 1, 0.7, 1, 1, 0.5, 1];
export function NeonFlickerDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
      FLICKER.forEach((o) => {
        tl.to(".d-nf", { opacity: o, duration: 0.06 });
      });
      tl.set(".d-nf", { opacity: 1 });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <p className="d-nf text-4xl font-black tracking-widest text-accent" style={{ textShadow: "0 0 18px rgba(10,228,72,0.7), 0 0 40px rgba(10,228,72,0.35)" }}>
        NÉON
      </p>
    </div>
  );
}

const WAVE_A = "M0 30 C 30 8, 55 8, 80 30 S 130 52, 160 30 S 215 8, 240 30";
const WAVE_B = "M0 30 C 30 52, 55 52, 80 30 S 130 8, 160 30 S 215 52, 240 30";
export function SineWaveDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-sw2", {
        attr: { d: WAVE_B },
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 240 60" className="h-16 w-56">
        <path className="d-sw2" d={WAVE_A} fill="none" stroke="#0ae448" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function LiquidFillDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-lf-w", { rotation: 360, duration: 5, ease: "none", repeat: -1 });
      gsap.fromTo(
        ".d-lf-w",
        { yPercent: 42 },
        { yPercent: -38, duration: 6, ease: "sine.inOut", repeat: -1, repeatDelay: 0.6 }
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border border-accent/40">
        <div className="d-lf-w absolute -left-1/2 -top-[130%] h-[200%] w-[200%] rounded-[38%] bg-accent/25 will-change-transform" />
        <p className="absolute inset-0 grid place-items-center font-mono text-[9px] text-white/60">72%</p>
      </div>
    </div>
  );
}

export function BorderRunDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".d-brn", { rotation: 360, duration: 4, ease: "none", repeat: -1 });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="relative overflow-hidden rounded-xl p-px">
        <div
          className="d-brn absolute left-1/2 top-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ background: "conic-gradient(from 0deg, transparent 0%, #0ae448 18%, transparent 38%)" }}
        />
        <div className="relative grid h-24 w-44 place-items-center rounded-[11px] bg-[#0c0c0c] font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
          bordure vivante
        </div>
      </div>
    </div>
  );
}

export function EcgLineDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".d-ecg",
        { drawSVG: "0% 22%" },
        { drawSVG: "78% 100%", duration: 1.6, ease: "none", repeat: -1 }
      );
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <svg viewBox="0 0 220 60" className="h-14 w-52">
        <path
          className="d-ecg"
          d="M0 30 L60 30 L72 30 L80 12 L88 48 L96 4 L104 52 L112 30 L160 30 L170 30 L178 20 L186 40 L194 30 L220 30"
          fill="none"
          stroke="#0ae448"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ---------- scroll (vague 4) ---------- */

const BG_ZONES = ["#0a0a0a", "#0a1a10", "#0a1024", "#1a0a18"];
export function ScrollBgDemo() {
  const root = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="h-full transition-colors duration-500" style={{ background: BG_ZONES[0] }}>
      <div
        onScroll={(e) => {
          const idx = Math.min(3, Math.floor(scrollP(e.currentTarget) * 4));
          gsap.to(root.current, { backgroundColor: BG_ZONES[idx], duration: 0.6 });
        }}
        className="mini-scroll h-full overflow-y-auto"
      >
        {["Base", "Nature", "Nuit", "Aube"].map((t, i) => (
          <div key={t} className="grid h-28 place-items-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: ["#ffffff55", "#0ae448", "#4da3ff", "#c17bff"][i] }}>
              zone_{t}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MediaShrinkDemo() {
  const root = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="h-full overflow-hidden">
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          gsap.set(root.current!.querySelector(".d-msk"), {
            scale: 1 - p * 0.32,
            borderRadius: `${p * 18}px`,
            y: p * 14,
          });
        }}
        className="mini-scroll h-full overflow-y-auto"
      >
        <div className="d-msk grid h-32 place-items-center bg-gradient-to-br from-accent/40 to-[#4da3ff]/30 font-mono text-[9px] text-white/70 will-change-transform">
          media plein cadre → carte
        </div>
        <div className="space-y-2 px-6 py-4">
          <div className="h-3 rounded bg-white/[0.06]" />
          <div className="h-3 w-4/5 rounded bg-white/[0.06]" />
          <div className="h-3 w-3/5 rounded bg-white/[0.06]" />
          <div className="h-16" />
        </div>
      </div>
    </div>
  );
}

export function SectionTiltDemo() {
  const root = useRef<HTMLDivElement>(null);
  const onScroll = (e: ReactUIEvent<HTMLDivElement>) => {
    const sc = e.currentTarget;
    const card = sc.querySelector<HTMLElement>(".d-st3");
    if (!card) return;
    const p = gsap.utils.clamp(0, 1, sc.scrollTop / 140);
    gsap.set(card, { rotationX: p * -14, opacity: 1 - p * 0.4, transformOrigin: "50% 100%" });
  };
  return (
    <div ref={root} className="h-full">
      <div onScroll={onScroll} className="mini-scroll h-full overflow-y-auto" style={{ perspective: "600px" }}>
        <div className="d-st3 grid h-28 place-items-center border-b border-white/10 bg-[#111] font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 will-change-transform">
          section qui bascule
        </div>
        <div className="grid h-28 place-items-center font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          section suivante
        </div>
        <div className="h-16" />
      </div>
    </div>
  );
}

/* ---------- media (vague 4) ---------- */

export function Product360Demo() {
  const root = useRef<HTMLDivElement>(null);
  const [deg, setDeg] = useState(0);
  useGSAP(
    (_, contextSafe) => {
      const qy = gsap.quickTo(".d-360", "rotationY", { duration: 0.4, ease: "power2" });
      const el = root.current!.querySelector<HTMLElement>(".d-360-f")!;
      const onMove =
        contextSafe?.((e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const p = (e.clientX - r.left) / r.width;
          qy(p * 340 - 170);
          setDeg(Math.round(p * 360));
        }) ?? (() => {});
      el.addEventListener("mousemove", onMove);
      return () => el.removeEventListener("mousemove", onMove);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div data-hover className="d-360-f grid h-28 w-44 cursor-ew-resize place-items-center rounded-xl border border-white/15" style={{ perspective: "500px" }}>
        <div className="d-360 grid h-16 w-16 place-items-center rounded-lg bg-gradient-to-br from-accent/60 to-[#4da3ff]/50 font-mono text-[8px] text-black/70 will-change-transform" style={{ transformStyle: "preserve-3d" }}>
          PRODUIT
        </div>
        <p className="absolute bottom-1.5 font-mono text-[8px] text-white/30">↔ {deg}°</p>
      </div>
    </div>
  );
}

export function VideoHoverDemo() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const tw = useRef<gsap.core.Tween | null>(null);
  const [on, setOn] = useState(false);
  useGSAP(
    (_, contextSafe) => {
      tw.current = gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: 5, ease: "none", paused: true, repeat: -1 });
      const el = root.current!.querySelector(".d-vh")!;
      const enter =
        contextSafe?.(() => {
          setOn(true);
          tw.current?.play();
          gsap.to(".d-vh-poster", { opacity: 0, duration: 0.3 });
          gsap.to(".d-vh-live", { opacity: 1, duration: 0.3 });
        }) ?? (() => {});
      const leave =
        contextSafe?.(() => {
          setOn(false);
          tw.current?.pause();
          gsap.to(".d-vh-poster", { opacity: 1, duration: 0.3 });
          gsap.to(".d-vh-live", { opacity: 0, duration: 0.3 });
        }) ?? (() => {});
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div data-hover className="d-vh relative h-24 w-44 overflow-hidden rounded-xl border border-white/15">
        <div className="d-vh-poster absolute inset-0 grid place-items-center bg-[#141414] font-mono text-xs text-white/40">▶ preview</div>
        <div className="d-vh-live absolute inset-0 bg-gradient-to-br from-accent/25 via-[#4da3ff]/20 to-[#c17bff]/25 opacity-0" />
        <span className={`absolute left-2 top-1.5 font-mono text-[8px] ${on ? "text-[#ff4d6d]" : "text-white/30"}`}>
          {on ? "● LIVE" : "○ pause"}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
          <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}

export function FocusPullDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState(true);
  useGSAP(
    () => {
      gsap.to(".d-fp-f", { filter: front ? "blur(0px)" : "blur(5px)", scale: front ? 1 : 0.96, duration: 0.5 });
      gsap.to(".d-fp-b", { filter: front ? "blur(5px)" : "blur(0px)", opacity: front ? 0.4 : 1, duration: 0.5 });
    },
    { scope: root, dependencies: [front] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div data-hover onClick={() => setFront((f) => !f)} className="relative h-28 w-44 cursor-pointer overflow-hidden rounded-xl border border-white/15">
        <p className="d-fp-b absolute inset-0 grid place-items-center bg-gradient-to-b from-white/[0.06] to-transparent font-mono text-[10px] text-white/70 will-change-[filter]">
          ARRIÈRE-PLAN
        </p>
        <span className="d-fp-f absolute bottom-3 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-accent will-change-[filter]" />
      </div>
      <p className="absolute bottom-3 font-mono text-[8px] text-white/30">cliquer → bascule de mise au point</p>
    </div>
  );
}

const GRADES: [string, string][] = [
  ["normal", "none"],
  ["noir", "grayscale(1) contrast(1.15)"],
  ["chaud", "sepia(0.45) saturate(1.5)"],
  ["froid", "hue-rotate(35deg) saturate(0.85)"],
];
export function ColorGradeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [g, setG] = useState(0);
  useGSAP(
    () => {
      gsap.to(".d-cg", { filter: GRADES[g][1], duration: 0.6, ease: "power2.inOut" });
    },
    { scope: root, dependencies: [g] }
  );
  return (
    <div ref={root} className="flex h-full flex-col items-center justify-center gap-3">
      <div className="d-cg h-20 w-44 rounded-xl bg-gradient-to-br from-accent/50 via-[#4da3ff]/40 to-[#c17bff]/50 will-change-[filter]" />
      <div className="flex gap-1.5">
        {GRADES.map(([name], i) => (
          <button
            key={name}
            data-hover
            onClick={() => setG(i)}
            className={`rounded-full border px-3 py-1 font-mono text-[9px] ${g === i ? "border-accent text-accent" : "border-white/15 text-white/45"}`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- édito (vague 4) ---------- */

export function FloatFigureDemo() {
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef(false);
  return (
    <div ref={root} className="h-full">
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          const fig = root.current!.querySelector(".d-ff");
          if (p > 0.25 && !shown.current) {
            shown.current = true;
            gsap.fromTo(fig, { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
          }
        }}
        className="mini-scroll h-full overflow-y-auto px-5 py-4 text-[9.5px] leading-relaxed text-white/55"
      >
        <p>Le texte coule autour de la figure flottante — la mise en page classique des magazines.</p>
        <figure className="d-ff float-left mb-2 mr-3 mt-1 w-2/5 opacity-0">
          <div className="h-14 rounded-lg bg-gradient-to-br from-accent/40 to-[#4da3ff]/30" />
          <figcaption className="mt-1 font-mono text-[7px] uppercase tracking-wider text-white/35">fig. 01 — atelier</figcaption>
        </figure>
        <p>Scroll pour la révéler : l&apos;image glisse en place pendant que les lignes l&apos;enveloppent, sans couper le rythme de lecture.</p>
        <p className="mt-2">C&apos;est le « pull figure » des mises en page éditoriales — l&apos;illustration s&apos;insère dans le flux.</p>
        <div className="h-14" />
      </div>
    </div>
  );
}

export function BigNumbersDemo() {
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef(new Set<number>());
  const items = ["Idéation", "Prototype", "Production"];
  const onScroll = (e: ReactUIEvent<HTMLDivElement>) => {
    const sc = e.currentTarget;
    const line = sc.scrollTop + sc.clientHeight * 0.9;
    sc.querySelectorAll<HTMLElement>(".d-bn").forEach((li, i) => {
      if (shown.current.has(i) || li.offsetTop > line) return;
      shown.current.add(i);
      gsap.fromTo(li.querySelector(".d-bn-n"), { x: -30, opacity: 0 }, { x: 0, opacity: 0.16, duration: 0.6, ease: "power3.out" });
      gsap.fromTo(li.querySelector(".d-bn-t"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 });
    });
  };
  return (
    <div ref={root} className="h-full">
      <div onScroll={onScroll} className="mini-scroll h-full space-y-2 overflow-y-auto px-6 py-4">
        <div className="h-6" />
        {items.map((t, i) => (
          <div key={t} className="d-bn relative flex h-14 items-center overflow-hidden rounded-lg">
            <span className="d-bn-n absolute -left-1 font-black text-6xl text-accent opacity-0">0{i + 1}</span>
            <span className="d-bn-t relative pl-16 font-mono text-[11px] text-white/70 opacity-0">{t}</span>
          </div>
        ))}
        <div className="h-12" />
      </div>
    </div>
  );
}

export function EndMarkDemo() {
  const root = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  return (
    <div ref={root} className="h-full">
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          const mark = root.current!.querySelector(".d-em");
          if (p > 0.97 && !done.current) {
            done.current = true;
            gsap.fromTo(mark, { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2.5)" });
          } else if (p <= 0.97 && done.current) {
            done.current = false;
            gsap.to(mark, { scale: 0, duration: 0.25 });
          }
        }}
        className="mini-scroll h-full space-y-3 overflow-y-auto px-6 py-4 text-[9.5px] leading-relaxed text-white/50"
      >
        <p>Les articles de magazine se terminent par un signe de fin — le « end mark ».</p>
        <p>Il signale au lecteur que le texte est achevé, comme un point final cérémoniel.</p>
        <p>Scroll tout en bas pour le voir apparaître avec un petit impact.</p>
        <div className="h-16" />
        <p className="text-center text-white/30">— fin de l&apos;article —</p>
        <div className="d-em mx-auto grid h-6 w-6 scale-0 place-items-center rounded bg-accent font-mono text-[10px] font-bold text-black">■</div>
      </div>
    </div>
  );
}

export function TitleTrackDemo() {
  const root = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="h-full">
      <div
        onScroll={(e) => {
          const p = scrollP(e.currentTarget);
          gsap.set(root.current!.querySelector(".d-tt"), { letterSpacing: `${p * 0.35}em`, opacity: 1 - p * 0.3 });
        }}
        className="mini-scroll h-full overflow-y-auto px-6 py-4"
      >
        <p className="d-tt pt-6 text-center text-2xl font-black uppercase will-change-[letter-spacing]">Manifeste</p>
        <div className="mt-6 space-y-2">
          <div className="h-3 rounded bg-white/[0.05]" />
          <div className="h-3 w-4/5 rounded bg-white/[0.05]" />
          <div className="h-3 w-3/5 rounded bg-white/[0.05]" />
        </div>
        <div className="h-28" />
      </div>
    </div>
  );
}

export function ReadTimeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  useGSAP(
    () => {
      const o = { v: 0 };
      const num = root.current!.querySelector(".d-rt-n")!;
      const tl = gsap.timeline({ onComplete: () => setDone(true) });
      tl.fromTo(".d-rt-c", { drawSVG: "0%" }, { drawSVG: "75%", duration: 1.4, ease: "power2.inOut" })
        .to(o, {
          v: 3,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => (num.textContent = `${Math.round(o.v)} MIN`),
        }, 0);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="flex items-center gap-3 rounded-full border border-white/15 px-4 py-2">
        <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#ffffff18" strokeWidth="3" />
          <circle className="d-rt-c" cx="18" cy="18" r="14" fill="none" stroke="#0ae448" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div>
          <p className="d-rt-n font-mono text-[11px] font-bold text-accent">0 MIN</p>
          <p className="font-mono text-[8px] text-white/40">{done ? "temps de lecture" : "estimation…"}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- page (vague 4) ---------- */

export function PageTurnDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useGSAP(
    (_, contextSafe) => {
      const go =
        contextSafe?.(() => {
          const top = root.current!.querySelector(".d-pt")!;
          gsap
            .timeline()
            .to(top, { rotationY: -160, duration: 0.8, ease: "power2.in", transformOrigin: "left center" })
            .call(() => setP((x) => x + 1))
            .set(top, { rotationY: 0 });
        }) ?? (() => {});
      root.current!.addEventListener("click", go);
      return () => root.current?.removeEventListener("click", go);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center" style={{ perspective: "800px" }}>
      <div className="absolute grid h-28 w-40 place-items-center rounded-r-lg border border-white/15 bg-[#101010]">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">PAGE_{(p % 3) + 2}</p>
      </div>
      <div className="d-pt absolute grid h-28 w-40 place-items-center rounded-r-lg border border-white/20 bg-[#1a1a1a] shadow-lg will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">PAGE_{(p % 3) + 1}</p>
      </div>
      <p className="pointer-events-none absolute bottom-3 font-mono text-[9px] text-white/30">cliquer → tourner la page</p>
    </div>
  );
}

export function StaticZapDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useGSAP(
    (_, contextSafe) => {
      const go =
        contextSafe?.(() => {
          const tiles = gsap.utils.toArray(".d-sz");
          const tl = gsap.timeline();
          tl.to(tiles, { opacity: () => Math.random() * 0.9 + 0.1, duration: 0.07, repeat: 5, repeatRefresh: true })
            .call(() => setP((x) => x + 1))
            .to(tiles, { opacity: 0, duration: 0.3, stagger: { each: 0.02, from: "random" } });
        }) ?? (() => {});
      root.current!.addEventListener("click", go);
      return () => root.current?.removeEventListener("click", go);
    },
    { scope: root }
  );
  return (
    <div ref={root} data-hover className="relative grid h-full cursor-pointer place-items-center overflow-hidden">
      <p className="pointer-events-none font-mono text-xs uppercase tracking-[0.3em] text-white/60">
        CANAL_{String(p + 1).padStart(2, "0")}
      </p>
      <div className="pointer-events-none absolute inset-0 grid grid-cols-6 grid-rows-4">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="d-sz opacity-0" style={{ background: i % 3 ? "#0ae448" : "#333" }} />
        ))}
      </div>
      <p className="pointer-events-none absolute bottom-3 font-mono text-[9px] text-white/30">cliquer → parasite</p>
    </div>
  );
}

export function IntroLogoDemo() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe) => {
      const play =
        contextSafe?.(() => {
          const tl = gsap.timeline();
          tl.fromTo(".d-il-m", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, ease: "power2.inOut" })
            .fromTo(".d-il-t span", { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.35 }, "-=0.3");
        }) ?? (() => {});
      play();
      const btn = root.current!.querySelector(".d-il-b")!;
      btn.addEventListener("click", play);
      return () => btn.removeEventListener("click", play);
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <svg viewBox="0 0 60 40" className="mx-auto h-10 w-14">
          <path className="d-il-m" d="M8 32 L30 8 L52 32 M20 32 L40 32" fill="none" stroke="#0ae448" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="d-il-t mt-2 font-mono text-xs font-bold tracking-[0.4em]">
          {"IANSAN".split("").map((c, i) => (
            <span key={i} className="inline-block">{c}</span>
          ))}
        </p>
        <button data-hover className="d-il-b mt-3 rounded-full border border-white/15 px-4 py-1 font-mono text-[9px] text-white/50">
          ↻ rejouer l&apos;intro
        </button>
      </div>
    </div>
  );
}

export function NextProjectDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useGSAP(
    () => {
      gsap.to(".d-np", { height: open ? "100%" : "30%", duration: 0.6, ease: "power3.inOut" });
      gsap.to(".d-np-in", { opacity: open ? 1 : 0, y: open ? 0 : 16, duration: 0.4, delay: open ? 0.3 : 0 });
    },
    { scope: root, dependencies: [open] }
  );
  return (
    <div ref={root} className="relative h-full overflow-hidden">
      <div className="grid h-full place-items-center pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">fin du projet actuel ↓</p>
      </div>
      <div
        data-hover
        onClick={() => setOpen((o) => !o)}
        className="d-np absolute inset-x-0 bottom-0 cursor-pointer border-t border-accent/40 bg-[#101510]"
        style={{ height: "30%" }}
      >
        <p className="pt-3 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
          {open ? "fermer ↑" : "projet suivant ↑"}
        </p>
        <div className="d-np-in pointer-events-none mt-6 text-center opacity-0">
          <p className="text-xl font-black uppercase tracking-tight text-accent">Nova / Brand film</p>
          <p className="mt-1 font-mono text-[9px] text-white/40">2025 — motion · identité</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- tools (vague 4) ---------- */

const DIST_MODES = ["center", "edges", "start", "random"] as const;
export function DistributeVizDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(0);
  useGSAP(
    () => {
      gsap.to(".d-dv2", {
        height: gsap.utils.distribute({ base: 18, amount: 70, from: DIST_MODES[mode], ease: "power1.out" }),
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { scope: root, dependencies: [mode] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div className="flex h-24 items-end gap-1.5">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="d-dv2 w-4 rounded-t bg-accent/70" style={{ height: 20 }} />
          ))}
        </div>
        <button data-hover onClick={() => setMode((m) => (m + 1) % DIST_MODES.length)} className="mt-3 rounded-full border border-white/15 px-4 py-1.5 font-mono text-[9px] text-accent">
          from: {DIST_MODES[mode]}
        </button>
      </div>
    </div>
  );
}

export function WrapUtilDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const wrapped = gsap.utils.wrap(0, 6);
  useGSAP(
    () => {
      gsap.to(".d-wu-dot", { x: wrapped(i) * 26, duration: 0.4, ease: "power3.out" });
    },
    { scope: root, dependencies: [i] }
  );
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div className="relative flex gap-2 rounded-full border border-white/15 px-2 py-2.5">
          {Array.from({ length: 6 }, (_, k) => (
            <span key={k} className={`h-4 w-4 rounded-full ${k === wrapped(i) ? "bg-accent/30" : "bg-white/10"}`} />
          ))}
          <span className="d-wu-dot absolute left-2 top-2.5 h-4 w-4 rounded-full border-2 border-accent" />
        </div>
        <div className="mt-3 flex justify-center gap-2">
          <button data-hover onClick={() => setI((x) => x - 1)} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] text-white/60">←</button>
          <button data-hover onClick={() => setI((x) => x + 1)} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] text-white/60">→</button>
        </div>
        <p className="mt-2 font-mono text-[8px] text-white/35">index {i} → wrap(0,6) = {wrapped(i)}</p>
      </div>
    </div>
  );
}

export function LerpColorDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0.5);
  const lerp = gsap.utils.interpolate("#0ae448", "#c17bff");
  const col = lerp(p);
  return (
    <div ref={root} className="grid h-full place-items-center px-8">
      <div className="w-full text-center">
        <div className="mx-auto h-12 w-12 rounded-xl border border-white/15 transition-colors duration-150" style={{ background: col }} />
        <input type="range" min={0} max={100} value={p * 100} onChange={(e) => setP(Number(e.target.value) / 100)} className="mt-4 w-full accent-[#0ae448]" />
        <p className="mt-1 font-mono text-[9px] text-white/45">interpolate(t={p.toFixed(2)}) → <span style={{ color: col }}>{col}</span></p>
      </div>
    </div>
  );
}

export function MapRangeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(50);
  const W = 176;
  const out = gsap.utils.mapRange(0, W, 30, W - 30, v);
  return (
    <div ref={root} className="grid h-full place-items-center px-6">
      <div className="w-full space-y-4">
        <div>
          <p className="mb-1 font-mono text-[8px] uppercase text-white/40">entrée 0→{W}</p>
          <input type="range" min={0} max={W} value={v} onChange={(e) => setV(Number(e.target.value))} className="w-full accent-[#0ae448]" />
        </div>
        <div>
          <p className="mb-1 font-mono text-[8px] uppercase text-white/40">sortie mapRange 30→{W - 30}</p>
          <div className="relative h-1.5 rounded-full bg-white/10">
            <span className="absolute -top-1 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-accent transition-all duration-75" style={{ left: out }} />
          </div>
        </div>
        <p className="text-center font-mono text-[9px] text-accent tabular-nums">{Math.round(v)} → {Math.round(out)}</p>
      </div>
    </div>
  );
}

export function RandomVizDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [snap, setSnap] = useState(false);
  const gen = () => {
    gsap.to(root.current!.querySelectorAll(".d-rv"), {
      height: () => gsap.utils.random(14, 90, snap ? 15 : 1),
      duration: 0.45,
      ease: "power2.out",
    });
  };
  return (
    <div ref={root} className="grid h-full place-items-center">
      <div className="text-center">
        <div className="flex h-24 items-end gap-1">
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="d-rv w-3 rounded-t bg-accent/70" style={{ height: 14 + ((i * 37) % 70) }} />
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          <button data-hover onClick={gen} className="rounded-full border border-accent/50 px-4 py-1.5 font-mono text-[9px] text-accent">
            random(14,90{snap ? ",15" : ""})
          </button>
          <button data-hover onClick={() => setSnap((s) => !s)} className={`rounded-full border px-3 py-1.5 font-mono text-[9px] ${snap ? "border-accent text-accent" : "border-white/15 text-white/45"}`}>
            snap
          </button>
        </div>
      </div>
    </div>
  );
}

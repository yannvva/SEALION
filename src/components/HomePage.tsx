"use client";

import {
  Component,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  SplitText,
  ScrollSmoother,
} from "@/lib/gsap";
import Cursor from "./Cursor";
import Preloader from "./Preloader";
import Magnetic from "./Magnetic";
import Decode from "./Decode";
import dynamic from "next/dynamic";
import DrawSection from "./DrawSection";
import Playground from "./Playground";
import CardStack from "./CardStack";
import ClipReveal from "./ClipReveal";
import MorphSection from "./MorphSection";
import FlipDemo from "./FlipDemo";

import {
  EditorialSpread,
  MediaStrip,
  FaqSection,
  VoicesSection,
  OffersSection,
} from "./Showcase";

// The catalog pulls ~19k lines of demo code plus the Motion runtime — split it
// out of the initial chunk so the hero/preloader parse and paint first.
const Catalog = dynamic(() => import("./catalog/Catalog"), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});

const NAV = [
  { label: "CATALOGUE", href: "#catalog" },
  { label: "PLUGINS", href: "#plugins" },
  { label: "SCROLL", href: "#work" },
  { label: "VECTEUR", href: "#vector" },
  { label: "LAB", href: "#lab" },
];

const MARQUEE_ITEMS = [
  "SCROLL-RÉACTIF",
  "VÉLOCITÉ",
  "SKEW",
  "TIMESCALE",
  "IANSAN",
  "GSAP 3.15",
];

const PLUGINS: [string, string][] = [
  ["ScrollTrigger", "tout piloté par le scroll"],
  ["SplitText", "chirurgie char / mot / ligne"],
  ["ScrambleText", "texte FX façon décodage"],
  ["DrawSVG", "contours qui se dessinent"],
  ["MotionPath", "animer le long d'un tracé"],
  ["Physics2D", "explosions vélocité + gravité"],
  ["Draggable + Inertia", "physique du lancer"],
  ["MorphSVG", "métamorphose tracé-à-tracé"],
  ["Flip", "changements de layout animés"],
];

const CARDS = [
  {
    title: "Preloader & décodage",
    desc: "Compteur, barre de progression et rideau chorégraphiés en une timeline — plus ScrambleText qui décode les labels.",
    tag: "timeline",
  },
  {
    title: "Curseur magnétique",
    desc: "Un point + un anneau traînant pilotés par gsap.quickTo() — suivi du pointeur beurre à 60fps, zéro re-render.",
    tag: "quickTo",
  },
  {
    title: "Tilt 3D",
    desc: "Ces cartes pivotent en perspective vers votre curseur et reviennent avec un ease élastique.",
    tag: "transformPerspective",
  },
  {
    title: "Scroll épinglé",
    desc: "Plus bas, le scroll vertical détourne une piste horizontale pendant qu'une barre suit en direct.",
    tag: "pin + scrub",
  },
];

const PANELS = [
  { n: "01", title: "Pin", text: "La section se verrouille au viewport pendant que vous continuez à scroller." },
  { n: "02", title: "Translation", text: "La piste glisse horizontalement d'exactement scrollWidth − viewport." },
  { n: "03", title: "Scrub", text: "scrub: 1 colle la scrollbar à l'animation avec lissage." },
  { n: "04", title: "Libération", text: "En fin de plage, le pin se relâche et la page reprend son cours." },
];

const STATS = [
  { value: 60, suffix: "fps", label: "cible de fluidité" },
  { value: 15, suffix: "+", label: "années de GSAP" },
  { value: 12, suffix: "M", label: "sites utilisant GSAP" },
];

function scrambleIn(e: ReactMouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  gsap.to(el, {
    duration: 0.6,
    scrambleText: {
      text: el.dataset.text ?? el.textContent ?? "",
      chars: "<>/#",
    },
    overwrite: true,
  });
}

function Hero({ active }: { active: boolean }) {
  const root = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!active) return;

      const split = new SplitText(".hero-title", { type: "chars" });
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-nav", { y: -32, opacity: 0, duration: 0.8 })
        .from(
          split.chars,
          { yPercent: 120, rotateX: -50, stagger: 0.045, duration: 1.1 },
          0.15
        )
        .from(".hero-tagline", { opacity: 0, duration: 0.4 }, "-=0.6")
        .to(
          ".hero-tagline",
          {
            duration: 1.6,
            scrambleText: {
              text: "MOTION SYSTEM // GSAP 3.15 // ALL PLUGINS UNLOCKED",
              chars: "01<>/",
            },
          },
          "<"
        )
        .from(".hero-sub", { y: 28, opacity: 0, duration: 0.8 }, "-=1.2")
        .from(
          ".hero-cta",
          { y: 24, opacity: 0, stagger: 0.12, duration: 0.6 },
          "-=0.5"
        )
        .from(
          ".hero-badge",
          { scale: 0, rotate: -180, duration: 0.9, ease: "back.out(1.6)" },
          "-=0.5"
        );

      gsap.to(".hero-badge svg", {
        rotate: 360,
        duration: 14,
        repeat: -1,
        ease: "none",
      });

      const tx = gsap.quickTo(".hero-title", "x", {
        duration: 0.9,
        ease: "power3",
      });
      const ty = gsap.quickTo(".hero-title", "y", {
        duration: 0.9,
        ease: "power3",
      });
      const gx = gsap.quickTo(".hero-grid", "x", {
        duration: 1.4,
        ease: "power2",
      });
      const gy = gsap.quickTo(".hero-grid", "y", {
        duration: 1.4,
        ease: "power2",
      });

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        tx(nx * -28);
        ty(ny * -16);
        gx(nx * 48);
        gy(ny * 48);
      };
      window.addEventListener("mousemove", onMove);

      gsap.to(".hero-inner", {
        yPercent: -18,
        opacity: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root, dependencies: [active] }
  );

  const scramble = contextSafe?.(scrambleIn);

  return (
    <section
      ref={root}
      className="relative flex min-h-screen flex-col overflow-hidden px-6 md:px-12"
    >
      <div className="hero-grid bg-grid pointer-events-none absolute -inset-24 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <nav className="hero-nav relative z-10 flex items-center justify-between py-6">
        <span className="font-mono text-sm tracking-[0.3em] text-accent">
          IANSAN®
        </span>
        <div className="hidden gap-8 font-mono text-xs text-white/60 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-text={n.label}
              onMouseEnter={scramble}
              className="transition-colors hover:text-accent"
            >
              {n.label}
            </a>
          ))}
        </div>
        <span className="font-mono text-xs text-white/50">GSAP × NEXT.JS</span>
      </nav>

      <div className="hero-inner relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="hero-title overflow-hidden pb-3 text-[clamp(4rem,16vw,14rem)] font-black leading-none tracking-tight will-change-transform">
          IANSAN
        </h1>
        <p className="hero-tagline font-mono text-xs tracking-[0.25em] text-accent md:text-sm">
          SYSTÈME DE MOTION // GSAP 3.15 // TOUS PLUGINS DÉBLOQUÉS
        </p>
        <p className="hero-sub mt-6 max-w-xl text-balance text-sm text-white/60 md:text-base">
          Un catalogue vivant d&apos;effets GSAP — prévisualisez chacun
          ci-dessous, ouvrez le vrai code, sélectionnez vos préférés et je les
          intègre dans votre projet.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Magnetic>
            <a
              href="#catalog"
              className="hero-cta block rounded-full bg-accent px-7 py-3 font-mono text-sm font-bold text-black"
            >
              PARCOURIR LES EFFETS ↓
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://gsap.com/docs/v3/"
              target="_blank"
              rel="noreferrer"
              className="hero-cta block rounded-full border border-white/20 px-7 py-3 font-mono text-sm text-white/80 transition-colors hover:border-accent hover:text-accent"
            >
              DOCS
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="hero-badge absolute bottom-24 right-10 hidden h-28 w-28 md:block">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path
              id="circlePath"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            />
          </defs>
          <text className="fill-white/60 font-mono text-[10px] tracking-[0.2em]">
            <textPath href="#circlePath">
              SCROLL • POUR • EXPLORER • SCROLL •
            </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}

function VelocityMarquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current!.querySelector(".marquee-track")!;
      const tween = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: "none",
      });
      const skew = gsap.quickTo(track, "skewX", {
        duration: 0.5,
        ease: "power2",
      });
      let boost = 0;

      ScrollTrigger.create({
        onUpdate: (self) => {
          boost = gsap.utils.clamp(-12, 12, self.getVelocity() / -250);
        },
      });

      const tick = () => {
        boost = gsap.utils.interpolate(boost, 0, 0.06);
        tween.timeScale(1 + boost);
        skew(gsap.utils.clamp(-15, 15, boost * 2.2));
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root }
  );

  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      ref={root}
      className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-5"
    >
      <div className="marquee-track flex w-max items-center whitespace-nowrap will-change-transform">
        {row.map((item, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-6 font-mono text-sm uppercase tracking-[0.3em] text-white/40"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function PluginIndex() {
  const root = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.from(".pi-row", {
        y: 40,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root }
  );

  const scramble = contextSafe?.(scrambleIn);

  return (
    <section ref={root} id="plugins" className="relative px-6 py-28 md:px-12">
      <div
        aria-hidden
        data-speed="1.15"
        className="pointer-events-none absolute right-[8%] top-10 h-16 w-16 rounded-full border border-accent/25"
      />
      <div
        aria-hidden
        data-speed="0.85"
        className="pointer-events-none absolute left-[6%] top-2/3 h-2 w-2 rounded-full bg-accent/40"
      />
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        <Decode text="INDEX DES PLUGINS" />
      </p>
      <h2 className="mt-4 text-4xl font-bold md:text-5xl">
        <Decode text="Chaque plugin premium, un seul import." />
      </h2>
      <div className="mt-12 border-t border-white/10">
        {PLUGINS.map(([name, desc], i) => (
          <div
            key={name}
            className="pi-row group flex items-baseline justify-between gap-4 border-b border-white/10 py-5"
          >
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-xs text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                data-text={name}
                onMouseEnter={scramble}
                data-hover
                className="text-xl font-semibold transition-transform duration-300 group-hover:translate-x-2 group-hover:text-accent md:text-2xl"
              >
                {name}
              </span>
            </div>
            <span className="hidden font-mono text-xs text-white/40 sm:block">
              {desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TiltCards() {
  const root = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.from(".tilt-card", {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tilt-grid", start: "top 80%" },
      });
    },
    { scope: root }
  );

  const tilt = contextSafe?.((e: ReactMouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: nx * 14,
      rotateX: -ny * 14,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power2.out",
    });
  });
  const untilt = contextSafe?.((e: ReactMouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.9,
      ease: "elastic.out(1,0.5)",
    });
  });

  return (
    <section ref={root} className="relative px-6 py-28 md:px-12">
      <div
        aria-hidden
        data-speed="1.1"
        data-lag="0.4"
        className="pointer-events-none absolute right-[10%] top-16 h-8 w-8 rotate-45 border border-white/20"
      />
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        <Decode text="SUR CETTE PAGE" />
      </p>
      <h2 className="mt-4 max-w-2xl text-4xl font-bold md:text-5xl">
        <Decode text="Chaque effet tient en un appel GSAP." />
      </h2>
      <div className="tilt-grid mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 [perspective:1200px]">
        {CARDS.map((c) => (
          <article
            key={c.title}
            onMouseMove={tilt}
            onMouseLeave={untilt}
            data-hover
            className="tilt-card rounded-2xl border border-white/10 bg-white/[0.03] p-6 will-change-transform"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              {c.tag}
            </span>
            <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {c.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HorizontalScroll() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;

      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(".h-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" className="relative overflow-hidden">
      <div
        ref={track}
        className="flex h-screen w-max items-center gap-8 px-12"
      >
        <div className="w-[70vw] shrink-0 md:w-[38vw]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Section épinglée
          </p>
          <h2 className="mt-4 text-5xl font-black leading-tight md:text-6xl">
            Continuez de scroller —<br />
            on part de côté.
          </h2>
        </div>
        {PANELS.map((p) => (
          <article
            key={p.n}
            data-hover
            className="flex h-[62vh] w-[75vw] shrink-0 flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 md:w-[32vw]"
          >
            <span className="font-mono text-6xl font-black text-white/10">
              {p.n}
            </span>
            <div>
              <h3 className="text-3xl font-bold text-accent">{p.title}</h3>
              <p className="mt-3 max-w-sm text-white/60">{p.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="absolute bottom-8 left-12 right-12 h-px bg-white/15">
        <div className="h-bar h-full w-full origin-left scale-x-0 bg-accent" />
      </div>
    </section>
  );
}

function ScrubText() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(".scrub-text", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative px-6 py-40 md:px-12">
      <div
        aria-hidden
        data-speed="0.8"
        className="pointer-events-none absolute left-[12%] top-24 h-24 w-24 rounded-full border border-white/10"
      />
      <div
        aria-hidden
        data-speed="1.2"
        className="pointer-events-none absolute bottom-16 right-[15%] h-3 w-3 rounded-full bg-accent/50"
      />
      <p className="scrub-text mx-auto max-w-4xl text-center text-3xl font-semibold leading-snug md:text-5xl">
        L&apos;animation n&apos;est pas une décoration — c&apos;est la façon dont
        une interface s&apos;explique. GSAP donne le vocabulaire ; le scroll lui
        donne une voix.
      </p>
    </section>
  );
}

function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value);
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grid gap-10 border-y border-white/10 px-6 py-20 text-center md:grid-cols-3 md:px-12"
    >
      {STATS.map((s, i) => (
        <div key={s.label} data-speed={i === 1 ? "1.05" : "0.97"}>
          <p className="text-6xl font-black text-accent md:text-7xl">
            <span className="stat-num" data-value={s.value}>
              0
            </span>
            {s.suffix}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            {s.label}
          </p>
        </div>
      ))}
    </section>
  );
}

function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-title", {
        yPercent: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.to(".footer-glow", {
        scale: 1.25,
        opacity: 0.5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: root }
  );

  return (
    <footer
      ref={root}
      className="relative flex flex-col items-center overflow-hidden px-6 py-32 text-center"
    >
      <div className="footer-glow pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
      <h2 className="footer-title relative text-5xl font-black md:text-7xl">
        À vous de jouer.
      </h2>
      <p className="relative mt-6 max-w-md text-white/55">
        Tout ici fonctionne avec{" "}
        <span className="text-accent">gsap</span>,{" "}
        <span className="text-accent">ScrollTrigger</span>,{" "}
        <span className="text-accent">SplitText</span>,{" "}
        <span className="text-accent">ScrambleText</span>,{" "}
        <span className="text-accent">DrawSVG</span>,{" "}
        <span className="text-accent">MotionPath</span>,{" "}
        <span className="text-accent">Physics2D</span> et{" "}
        <span className="text-accent">Inertia</span> — gratuits dans gsap@3.15.
      </p>
      <Magnetic>
        <a
          href="#top"
          className="relative mt-10 block rounded-full border border-white/20 px-8 py-3 font-mono text-sm text-white/80 transition-colors hover:border-accent hover:text-accent"
        >
          RETOUR EN HAUT ↑
        </a>
      </Magnetic>
      <p className="relative mt-16 font-mono text-xs text-white/30">
        IANSAN® — construit avec Next.js + GSAP
      </p>
    </footer>
  );
}

// A crash in one section must not take the whole page down — the section
// degrades to a thin notice while the rest keeps animating.
class SectionBoundary extends Component<
  { name: string; children: ReactNode },
  { crashed: boolean }
> {
  state = { crashed: false };
  static getDerivedStateFromError() {
    return { crashed: true };
  }
  componentDidCatch(err: unknown) {
    console.error(`[section ${this.props.name}]`, err);
  }
  render() {
    if (this.state.crashed) {
      return (
        <div className="grid place-items-center px-6 py-16 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          {this.props.name} — section indisponible
        </div>
      );
    }
    return this.props.children;
  }
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const smoother = reduced
        ? null
        : ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.15,
            effects: true,
            // normalizeScroll is on by default since 3.13 and would swallow
            // wheel events inside nested scrollers — the modal column and the
            // internal-scroller demos. Let them scroll natively.
            normalizeScroll: { allowNestedScroll: true },
          });
      if (reduced) {
        const wrap = document.getElementById("smooth-wrapper");
        if (wrap) wrap.style.overflow = "visible";
      }
      ScrollTrigger.refresh();

      const links = gsap.utils.toArray<HTMLAnchorElement>('a[href^="#"]');
      const onClick = (e: Event) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute(
          "href"
        );
        if (!href) return;
        if (smoother) {
          smoother.scrollTo(href, true);
        } else {
          document
            .querySelector(href)
            ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        }
      };
      links.forEach((l) => l.addEventListener("click", onClick));
      return () =>
        links.forEach((l) => l.removeEventListener("click", onClick));
    },
    { scope: root }
  );

  // hold the scroll while the preloader runs — with a safety net: if the
  // reveal callback never fires, release the page instead of leaving it frozen
  useEffect(() => {
    ScrollSmoother.get()?.paused(!loaded);
    document.body.style.overflow = loaded ? "" : "hidden";
    const failsafe = loaded
      ? undefined
      : setTimeout(() => setLoaded(true), 6000);
    return () => {
      clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <div ref={root}>
      <Cursor />
      <Preloader onReveal={() => setLoaded(true)} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="top">
            <SectionBoundary name="hero">
              <Hero active={loaded} />
            </SectionBoundary>
            <SectionBoundary name="marquee">
              <VelocityMarquee />
            </SectionBoundary>
            <SectionBoundary name="catalogue">
              <Catalog />
            </SectionBoundary>
            <SectionBoundary name="plugins">
              <PluginIndex />
            </SectionBoundary>
            <SectionBoundary name="tilt">
              <TiltCards />
            </SectionBoundary>
            <SectionBoundary name="scroll épinglé">
              <HorizontalScroll />
            </SectionBoundary>
            <SectionBoundary name="vectoriel">
              <DrawSection />
            </SectionBoundary>
            <SectionBoundary name="immersion">
              <ClipReveal />
            </SectionBoundary>
            <SectionBoundary name="pile">
              <CardStack />
            </SectionBoundary>
            <SectionBoundary name="manifeste">
              <ScrubText />
            </SectionBoundary>
            <SectionBoundary name="éditorial">
              <EditorialSpread />
            </SectionBoundary>
            <SectionBoundary name="travaux">
              <MediaStrip />
            </SectionBoundary>
            <SectionBoundary name="morph">
              <MorphSection />
            </SectionBoundary>
            <SectionBoundary name="flip">
              <FlipDemo />
            </SectionBoundary>
            <SectionBoundary name="faq">
              <FaqSection />
            </SectionBoundary>
            <SectionBoundary name="voix">
              <VoicesSection />
            </SectionBoundary>
            <SectionBoundary name="offres">
              <OffersSection />
            </SectionBoundary>
            <SectionBoundary name="labo">
              <Playground />
            </SectionBoundary>
            <SectionBoundary name="stats">
              <Stats />
            </SectionBoundary>
            <SectionBoundary name="footer">
              <Footer />
            </SectionBoundary>
          </main>
        </div>
      </div>
    </div>
  );
}

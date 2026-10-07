"use client";

import {
  Component,
  memo,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";
import { EFFECTS, CATS, type Effect, type EffectCat } from "@/effects/registry";
import Decode from "@/components/Decode";

// id → position in EFFECTS, built once — indexOf inside the render loop was O(n²)
const EFFECT_INDEX = new Map(EFFECTS.map((e, i) => [e.id, i]));

// Lazy-mounts the demo only when the card approaches the viewport, then pauses
// every GSAP animation targeting it while off-screen — 337 demos mounting at
// once (SplitText, ScrollTriggers, Draggables) would otherwise stall the load.
function DemoFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current!;
    const mountIO = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const r = el.getBoundingClientRect();
          el.dataset.paused =
            r.top > window.innerHeight + 80 || r.bottom < -80 ? "1" : "";
          setLive(true);
          mountIO.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    mountIO.observe(el);
    const pauseIO = new IntersectionObserver(
      ([entry]) => {
        const paused = !entry.isIntersecting;
        el.dataset.paused = paused ? "1" : "";
        gsap.globalTimeline
          .getChildren(true, true, true)
          .forEach((anim) => {
            const targets =
              typeof (anim as gsap.core.Tween).targets === "function"
                ? ((anim as gsap.core.Tween).targets() as unknown[])
                : [];
            const inside = targets.some(
              (t) => t instanceof Element && el.contains(t)
            );
            if (inside) {
              if (paused) anim.pause();
              else anim.resume();
            }
          });
      },
      { rootMargin: "80px" }
    );
    pauseIO.observe(el);
    return () => {
      mountIO.disconnect();
      pauseIO.disconnect();
    };
  }, []);
  return (
    <div ref={ref} className="h-full w-full">
      {live ? children : null}
    </div>
  );
}

// A single misbehaving demo must not take down the whole catalog — without a
// boundary, a layout-effect throw inside any card unmounts the entire page.
class DemoBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="grid h-full place-items-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
            démo hors-ligne
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const EffectCard = memo(function EffectCard({
  effect,
  index,
  selected,
  fav,
  onSelect,
  onFav,
  onOpen,
}: {
  effect: Effect;
  index: number;
  selected: boolean;
  fav: boolean;
  onSelect: () => void;
  onFav: () => void;
  onOpen: () => void;
}) {
  const { Demo } = effect;
  return (
    <article
      className={`fx-card group relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.02] transition-colors ${
        selected ? "border-accent/70" : "border-white/10 hover:border-white/25"
      }`}
    >
      <div className="flex items-start justify-between px-4 pt-4">
        <div>
          <h3 className="font-semibold">
            <span className="mr-2 font-mono text-[10px] text-white/30">
              N°{String(index + 1).padStart(2, "0")}
            </span>
            {effect.name}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            {effect.plugin}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={onFav}
            aria-pressed={fav}
            aria-label={
              fav
                ? `Retirer ${effect.name} des favoris`
                : `Ajouter ${effect.name} aux favoris`
            }
            data-hover
            className={`grid h-7 w-7 place-items-center rounded-full border text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              fav
                ? "border-accent bg-accent/15 text-accent"
                : "border-white/15 text-white/30 hover:border-accent hover:text-accent"
            }`}
          >
            ♥
          </button>
          <button
            onClick={onSelect}
            aria-pressed={selected}
            aria-label={
              selected
                ? `Retirer ${effect.name} de la sélection`
                : `Ajouter ${effect.name} à la sélection`
            }
            data-hover
            className={`grid h-7 w-7 place-items-center rounded-full border font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              selected
                ? "border-accent bg-accent text-black"
                : "border-white/25 text-white/40 hover:border-accent hover:text-accent"
            }`}
          >
            {selected ? "✓" : "+"}
          </button>
        </div>
      </div>

      <div className="relative mx-4 mt-3 h-44 overflow-hidden rounded-xl border border-white/5 bg-black/30">
        <DemoFrame>
          <DemoBoundary>
            <Demo />
          </DemoBoundary>
        </DemoFrame>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 px-4 pb-4">
        <p className="text-xs leading-snug text-white/45">{effect.blurb}</p>
        <button
          onClick={onOpen}
          data-hover
          aria-label={`Agrandir ${effect.name} en plein écran`}
          className="shrink-0 rounded-md border border-white/15 px-2 py-1 font-mono text-[10px] text-white/50 transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {"{ }"}
        </button>
      </div>

      <span className="pointer-events-none absolute right-4 top-12 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
        {CATS.find((c) => c.id === effect.cat)?.label ?? effect.cat}
      </span>
    </article>
  );
}, (prev, next) =>
  prev.effect.id === next.effect.id &&
  prev.index === next.index &&
  prev.selected === next.selected &&
  prev.fav === next.fav
);

const CODE_TOKEN =
  /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(const|let|var|new|return|import|from|function|if|else|for|of|in|true|false|type)\b|\b(\d+(?:\.\d+)?)\b|(\.\w+)(?=\()/g;

// Lightweight tokenizer — strings green, comments dimmed, methods bright.
function CodeBlock({ code }: { code: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of code.matchAll(CODE_TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) parts.push(code.slice(last, idx));
    const cls = m[1]
      ? "italic text-white/30"
      : m[2]
        ? "text-accent"
        : m[3]
          ? "text-[#c586ff]"
          : m[4]
            ? "text-[#e8b86d]"
            : "text-white";
    parts.push(
      <span key={i++} className={cls}>
        {m[0]}
      </span>
    );
    last = idx + m[0].length;
  }
  parts.push(code.slice(last));
  return <code>{parts}</code>;
}

// Per-effect playground tweaks — color, text, edited code and playback speed
// live in `customs` on the Catalog so they survive modal navigation.
interface Custom {
  color?: string;
  text?: string;
  code?: string;
  speed?: number;
  params?: Record<string, number | string>;
}

const DEFAULT_COLOR = "#0ae448";
const SWATCHES = [DEFAULT_COLOR, "#ff4d6d", "#4da3ff", "#c17bff", "#ffb84d"];

function EffectModal({
  effect,
  index,
  pos,
  total,
  selected,
  fav,
  custom,
  onSelect,
  onFav,
  onCustom,
  onResetCustom,
  onClose,
  onPrev,
  onNext,
}: {
  effect: Effect;
  index: number;
  pos: number;
  total: number;
  selected: boolean;
  fav: boolean;
  custom: Custom;
  onSelect: () => void;
  onFav: () => void;
  onCustom: (patch: Custom) => void;
  onResetCustom: () => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { Demo } = effect;

  const color = custom.color ?? DEFAULT_COLOR;
  const text = custom.text;
  const speed = custom.speed ?? 1;
  const editing = editingId === effect.id;
  const dirty =
    custom.color != null ||
    custom.text != null ||
    custom.code != null ||
    custom.speed != null ||
    (custom.params != null && Object.keys(custom.params).length > 0);

  // resolved param values (registry default ← user override) — drive both
  // the demo via props and the displayed/copied code via %%key%% substitution
  const params: Record<string, number | string> = {};
  effect.params?.forEach(
    (p) => (params[p.key] = custom.params?.[p.key] ?? p.def)
  );
  const deferredParams = useDeferredValue(params);
  const code = (custom.code ?? effect.code).replace(
    /%%(\w+)%%/g,
    (_, k: string) => String(params[k] ?? `%%${k}%%`)
  );
  // remount the demo only when typing settles, so each keystroke doesn't
  // restart the animation mid-word
  const deferredText = useDeferredValue(text);

  // stable callback refs — the keydown listener binds once and always sees
  // the latest closures, so navigating doesn't churn focus or body overflow
  const cb = useRef({ onClose, onPrev, onNext });
  useEffect(() => {
    cb.current = { onClose, onPrev, onNext };
  });

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      // inside a field, arrows move the caret — they must not swap effects
      const typing =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement;
      if (e.key === "Escape") {
        cb.current.onClose();
      } else if (e.key === "ArrowLeft" && !typing) {
        cb.current.onPrev();
      } else if (e.key === "ArrowRight" && !typing) {
        cb.current.onNext();
      } else if (e.key === "Tab") {
        const list = [
          ...root.current!.querySelectorAll<HTMLElement>(
            "button, a[href], input, textarea, [tabindex]"
          ),
        ].filter(
          (el) => el.tabIndex !== -1 && el.offsetParent !== null
        );
        if (!list.length) return;
        const first = list[0];
        const lastEl = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          lastEl.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      smoother?.paused(false);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevFocus?.focus?.();
    };
  }, []);

  useGSAP(
    () => {
      gsap.from(".fx-modal-backdrop", { opacity: 0, duration: 0.3 });
      gsap.from(".fx-modal-panel", {
        opacity: 0,
        scale: 0.94,
        y: 24,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".fx-m-body, .fx-m-demo",
        { opacity: 0, x: 18 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
      );
      gsap.to(".fx-m-title", {
        duration: 0.6,
        scrambleText: { text: effect.name, chars: "01<>/" },
      });
    },
    { scope: root, dependencies: [effect.id] }
  );

  // applies the speed slider to every top-level animation whose targets live
  // inside the demo — re-applied on a tick so animations spawned later
  // (interval-driven demos) pick it up too
  useEffect(() => {
    const apply = () => {
      const el = demoRef.current; // re-read — the div remounts on text commit
      if (!el) return;
      gsap.globalTimeline.getChildren(false, true, true).forEach((anim) => {
        const targets =
          typeof (anim as gsap.core.Tween).targets === "function"
            ? ((anim as gsap.core.Tween).targets() as unknown[])
            : [];
        if (targets.some((t) => t instanceof Element && el.contains(t)))
          anim.timeScale(speed);
      });
    };
    apply();
    const iv = window.setInterval(apply, 800);
    return () => window.clearInterval(iv);
  }, [speed, effect.id]);

  const copyCode = () => {
    // the copied snippet carries the user's tweaks: color is substituted
    // inline, the rest rides along as a settings comment
    const params: string[] = [];
    if (custom.color) params.push(`couleur: ${color}`);
    if (custom.speed != null) params.push(`vitesse: ×${speed}`);
    if (custom.text)
      params.push(`texte: "${custom.text.replaceAll("\n", "\\n")}"`);
    const header = params.length
      ? `// réglages — ${params.join(" · ")}\n\n`
      : "";
    navigator.clipboard.writeText(
      header + code.replaceAll(DEFAULT_COLOR, color)
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[80] flex p-3 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={effect.name}
    >
      <button
        tabIndex={-1}
        aria-label="Fermer"
        onClick={onClose}
        className="fx-modal-backdrop absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <div className="fx-modal-panel relative mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0b] shadow-[0_60px_140px_-30px_rgba(0,0,0,0.9)] md:flex-row">
        <div className="bg-grid relative flex min-h-[38vh] flex-1 items-center justify-center md:min-h-0">
          <p className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: color }}
            />
            aperçu live
          </p>
          <p className="pointer-events-none absolute right-5 top-5 font-mono text-[10px] tracking-[0.3em] text-white/30">
            {String(pos + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
          {/* --accent is re-defined here so every accent-* utility,
              var(--accent) fill/stroke and getComputedStyle read inside the
              demo recolors instantly — no remount needed */}
          <div
            ref={demoRef}
            key={`${effect.id}|${deferredText ?? ""}|${JSON.stringify(deferredParams)}`}
            className="fx-m-demo absolute inset-10 bottom-20 md:inset-x-14 md:top-14 md:bottom-24"
            style={{ "--accent": color } as CSSProperties}
          >
            <DemoBoundary>
              <Demo autoplay text={deferredText} params={deferredParams} />
            </DemoBoundary>
          </div>

          <div className="absolute inset-x-4 bottom-3 z-10 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-white/10 bg-black/60 px-3 py-2 backdrop-blur">
            <div className="flex items-center gap-1.5">
              {SWATCHES.map((c) => (
                <button
                  key={c}
                  data-hover
                  aria-label={`Couleur ${c}`}
                  onClick={() => onCustom({ color: c })}
                  style={{ background: c }}
                  className={`h-5 w-5 rounded-full transition-transform hover:scale-110 ${
                    color === c
                      ? "ring-2 ring-white/80 ring-offset-2 ring-offset-black"
                      : "opacity-70"
                  }`}
                />
              ))}
              <label
                data-hover
                aria-label="Couleur personnalisée"
                className="relative grid h-5 w-5 cursor-pointer place-items-center overflow-hidden rounded-full border border-dashed border-white/30 font-mono text-[9px] text-white/50"
              >
                +
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onCustom({ color: e.target.value })}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </label>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                vitesse
              </span>
              <input
                type="range"
                min={0.25}
                max={2.5}
                step={0.05}
                value={speed}
                aria-label="Vitesse de lecture"
                onChange={(e) =>
                  onCustom({ speed: Number(e.target.value) })
                }
                className="w-20 md:w-28"
                style={{ accentColor: color }}
              />
              <span className="w-8 font-mono text-[9px] text-white/50">
                ×{speed.toFixed(2).replace(/\.?0+$/, "")}
              </span>
            </div>
            {dirty && (
              <button
                onClick={onResetCustom}
                data-hover
                aria-label="Réinitialiser les réglages"
                className="rounded-full border border-white/20 px-2 py-0.5 font-mono text-[9px] text-white/50 hover:border-accent hover:text-accent"
              >
                ↺ reset
              </button>
            )}
          </div>
        </div>

        <div className="flex min-h-0 w-full flex-1 flex-col border-t border-white/10 md:w-[400px] md:flex-none md:border-l md:border-t-0">
          <div
            key={effect.id}
            className="fx-m-body mini-scroll flex min-h-0 flex-1 flex-col overflow-y-auto p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-white/30">
                  N°{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="fx-m-title mt-1 text-3xl font-bold">
                  {effect.name}
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                    {effect.plugin}
                  </span>
                  <span className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                    {CATS.find((c) => c.id === effect.cat)?.label ?? effect.cat}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button
                  onClick={onFav}
                  aria-pressed={fav}
                  aria-label={
                    fav
                      ? `Retirer ${effect.name} des favoris`
                      : `Ajouter ${effect.name} aux favoris`
                  }
                  data-hover
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    fav
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-white/20 text-white/40 hover:border-accent hover:text-accent"
                  }`}
                >
                  ♥
                </button>
                <button
                  ref={closeBtn}
                  onClick={onClose}
                  data-hover
                  aria-label="Fermer"
                  className="rounded-full border border-white/20 px-3 py-1 font-mono text-xs text-white/60 hover:border-accent hover:text-accent"
                >
                  ESC
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/55">
              {effect.blurb}
            </p>

            {effect.textParam && (
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                  contenu
                  {effect.textParam.csv && (
                    <span className="ml-1 normal-case tracking-normal text-white/25">
                      — séparés par des virgules
                    </span>
                  )}
                </p>
                {effect.textParam.multi ? (
                  <textarea
                    value={text ?? ""}
                    aria-label="Contenu personnalisé de la démo"
                    placeholder={effect.textParam.def}
                    onChange={(e) =>
                      onCustom({ text: e.target.value || undefined })
                    }
                    rows={3}
                    spellCheck={false}
                    className="mini-scroll mt-2 w-full resize-none rounded-lg border border-white/15 bg-black/40 px-3 py-2 font-mono text-xs text-white/80 outline-none placeholder:text-white/25 focus:border-accent"
                  />
                ) : (
                  <input
                    value={text ?? ""}
                    aria-label="Contenu personnalisé de la démo"
                    placeholder={effect.textParam.def}
                    onChange={(e) =>
                      onCustom({ text: e.target.value || undefined })
                    }
                    spellCheck={false}
                    className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 font-mono text-xs text-white/80 outline-none placeholder:text-white/25 focus:border-accent"
                  />
                )}
              </div>
            )}

            {effect.params && effect.params.length > 0 && (
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                  paramètres
                </p>
                <div className="mt-2 space-y-3 rounded-xl border border-white/10 bg-black/30 p-3">
                  {effect.params.map((p) =>
                    p.options ? (
                      <div key={p.key}>
                        <p className="font-mono text-[10px] text-white/45">
                          {p.label}
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {p.options.map((o) => (
                            <button
                              key={o}
                              data-hover
                              aria-pressed={params[p.key] === o}
                              onClick={() =>
                                onCustom({
                                  params: {
                                    ...(custom.params ?? {}),
                                    [p.key]: o,
                                  },
                                })
                              }
                              className={`rounded-full border px-2 py-0.5 font-mono text-[9px] transition-colors ${
                                params[p.key] === o
                                  ? "border-accent bg-accent/15 text-accent"
                                  : "border-white/15 text-white/45 hover:border-accent hover:text-accent"
                              }`}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <label key={p.key} className="block">
                        <span className="flex items-baseline justify-between font-mono text-[10px]">
                          <span className="text-white/45">{p.label}</span>
                          <span className="tabular-nums text-accent">
                            {params[p.key]}
                            {p.unit ?? ""}
                          </span>
                        </span>
                        <input
                          type="range"
                          min={p.min}
                          max={p.max}
                          step={p.step}
                          value={Number(params[p.key])}
                          aria-label={p.label}
                          onChange={(e) =>
                            onCustom({
                              params: {
                                ...(custom.params ?? {}),
                                [p.key]: Number(e.target.value),
                              },
                            })
                          }
                          className="mt-1 w-full"
                          style={{ accentColor: color }}
                        />
                      </label>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                implémentation
              </p>
              <div className="flex gap-1.5">
                <button
                  onClick={() =>
                    setEditingId(editing ? null : effect.id)
                  }
                  data-hover
                  className={`rounded-md border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] transition-colors ${
                    editing
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-white/15 text-white/40 hover:border-accent hover:text-accent"
                  }`}
                >
                  {editing ? "aperçu" : "éditer"}
                </button>
                {custom.code != null && custom.code !== effect.code && (
                  <button
                    onClick={() => onCustom({ code: undefined })}
                    data-hover
                    className="rounded-md border border-white/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-white/40 hover:border-accent hover:text-accent"
                  >
                    reset
                  </button>
                )}
                <button
                  onClick={copyCode}
                  data-hover
                  className={`rounded-md border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] transition-colors ${
                    copied
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-white/15 text-white/40 hover:border-accent hover:text-accent"
                  }`}
                >
                  {copied ? "copié ✓" : "copier"}
                </button>
              </div>
            </div>
            {editing ? (
              <textarea
                value={code}
                onChange={(e) => onCustom({ code: e.target.value })}
                spellCheck={false}
                aria-label="Modifier le code"
                className="mini-scroll mt-2 h-64 w-full resize-none overflow-auto rounded-xl border border-accent/40 bg-black/60 p-4 font-mono text-[11px] leading-relaxed text-white/80 outline-none"
              />
            ) : (
              <pre className="mini-scroll mt-2 max-h-64 overflow-auto rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-[11px] leading-relaxed text-white/60">
                <CodeBlock code={code} />
              </pre>
            )}

            <div className="mt-auto pt-6">
              <button
                onClick={onSelect}
                data-hover
                className={`w-full rounded-full px-6 py-3 font-mono text-xs font-bold transition-colors ${
                  selected
                    ? "border border-accent/50 bg-accent/10 text-accent hover:bg-accent/20"
                    : "bg-accent text-black hover:opacity-90"
                }`}
              >
                {selected ? "✓ DANS LA SÉLECTION" : "+ AJOUTER À LA SÉLECTION"}
              </button>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={onPrev}
                    data-hover
                    aria-label="Effet précédent"
                    className="rounded-full border border-white/20 px-3.5 py-1.5 font-mono text-[10px] text-white/60 transition-colors hover:border-accent hover:text-accent"
                  >
                    ← PRÉC
                  </button>
                  <button
                    onClick={onNext}
                    data-hover
                    aria-label="Effet suivant"
                    className="rounded-full border border-white/20 px-3.5 py-1.5 font-mono text-[10px] text-white/60 transition-colors hover:border-accent hover:text-accent"
                  >
                    SUIV →
                  </button>
                </div>
                <p className="hidden font-mono text-[9px] tracking-[0.15em] text-white/25 sm:block">
                  ← → naviguer · esc fermer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectionTray({
  selected,
  onClear,
}: {
  selected: Set<string>;
  onClear: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        root.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }
      );
    },
    { scope: root }
  );

  const copy = () => {
    navigator.clipboard.writeText(
      `Intègre ces effets GSAP dans mon site : ${[...selected].join(", ")}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      ref={root}
      className="fixed bottom-5 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-center gap-3 rounded-full border border-accent/40 bg-[#0b0b0b]/95 py-2 pl-5 pr-2 backdrop-blur"
    >
      <p className="min-w-0 flex-1 truncate font-mono text-xs text-white/70">
        <span className="text-accent">{selected.size}</span> sélectionnés —{" "}
        {[...selected]
          .map((id) => EFFECTS.find((e) => e.id === id)?.name ?? id)
          .join(", ")}
      </p>
      <button
        onClick={copy}
        data-hover
        className="shrink-0 rounded-full bg-accent px-4 py-2 font-mono text-[10px] font-bold text-black"
      >
        {copied ? "COPIÉ ✓" : "COPIER LE PROMPT"}
      </button>
      <button
        onClick={onClear}
        data-hover
        aria-label="Vider la sélection"
        className="shrink-0 rounded-full border border-white/20 px-3 py-2 font-mono text-[10px] text-white/50 hover:border-accent"
      >
        ✕
      </button>
    </div>
  );
}

function FavoritesDrawer({
  favs,
  selected,
  modalOpen,
  onFav,
  onSelect,
  onOpen,
  onClose,
}: {
  favs: Set<string>;
  selected: Set<string>;
  modalOpen: boolean;
  onFav: (id: string) => void;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const list = EFFECTS.filter((e) => favs.has(e.id));
  const cb = useRef(onClose);
  useEffect(() => {
    cb.current = onClose;
  }, [onClose]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".fav-back",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        ".fav-panel",
        { xPercent: 105 },
        { xPercent: 0, duration: 0.55, ease: "power4.out" }
      );
      closeBtn.current?.focus();
    },
    { scope: root }
  );

  // Escape closes the drawer — but not while the modal sits above it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !modalOpen) cb.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label="Mes favoris"
    >
      <button
        tabIndex={-1}
        aria-label="Fermer"
        onClick={onClose}
        className="fav-back absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <aside className="fav-panel absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-white/15 bg-[#0b0b0b]">
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            favoris · {favs.size}
          </p>
          <button
            ref={closeBtn}
            onClick={onClose}
            data-hover
            aria-label="Fermer les favoris"
            className="rounded-full border border-white/20 px-3 py-1 font-mono text-xs text-white/60 hover:border-accent hover:text-accent"
          >
            ESC
          </button>
        </header>

        <div className="mini-scroll flex-1 space-y-3 overflow-y-auto p-4">
          {list.map((e) => {
            const { Demo } = e;
            return (
              <div
                key={e.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <div className="relative h-24 border-b border-white/5 bg-black/30">
                  <DemoFrame>
                    <DemoBoundary>
                      <Demo />
                    </DemoBoundary>
                  </DemoFrame>
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{e.name}</p>
                    <p className="truncate font-mono text-[9px] uppercase tracking-[0.15em] text-accent">
                      {e.plugin}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      onClick={() => onOpen(e.id)}
                      data-hover
                      aria-label={`Ouvrir ${e.name} en plein écran`}
                      className="rounded-md border border-white/15 px-2 py-1 font-mono text-[10px] text-white/50 transition-colors hover:border-accent hover:text-accent"
                    >
                      {"{ }"}
                    </button>
                    <button
                      onClick={() => onSelect(e.id)}
                      data-hover
                      aria-pressed={selected.has(e.id)}
                      aria-label={
                        selected.has(e.id)
                          ? `Retirer ${e.name} de la sélection`
                          : `Ajouter ${e.name} à la sélection`
                      }
                      className={`grid h-7 w-7 place-items-center rounded-full border font-mono text-xs transition-colors ${
                        selected.has(e.id)
                          ? "border-accent bg-accent text-black"
                          : "border-white/20 text-white/40 hover:border-accent hover:text-accent"
                      }`}
                    >
                      {selected.has(e.id) ? "✓" : "+"}
                    </button>
                    <button
                      onClick={() => onFav(e.id)}
                      data-hover
                      aria-label={`Retirer ${e.name} des favoris`}
                      className="grid h-7 w-7 place-items-center rounded-full border border-accent/50 text-xs text-accent transition-colors hover:bg-accent/15"
                    >
                      ♥
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {list.length === 0 && (
            <p className="grid place-items-center py-16 text-center font-mono text-xs leading-relaxed text-white/35">
              Aucun favori pour l&apos;instant.
              <br />
              Clique ♥ sur une carte du catalogue.
            </p>
          )}
        </div>

        {list.length > 0 && (
          <footer className="border-t border-white/10 p-4">
            <button
              onClick={() =>
                list.forEach((e) => !selected.has(e.id) && onSelect(e.id))
              }
              data-hover
              className="w-full rounded-full bg-accent px-5 py-2.5 font-mono text-[10px] font-bold text-black transition-opacity hover:opacity-90"
            >
              + TOUT AJOUTER À LA SÉLECTION
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}

const STORAGE_KEY = "iansan-selection";
const CUSTOMS_KEY = "iansan-customs";
const FAVS_KEY = "iansan-favorites";
type FilterId = EffectCat | "all" | "fav";

export default function Catalog() {
  const root = useRef<HTMLElement>(null);
  const [cat, setCat] = useState<FilterId>("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const [favOpen, setFavOpen] = useState(false);
  const [customs, setCustoms] = useState<Record<string, Custom>>({});
  // portals need document.body — only exists after client mount
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const setCustom = (id: string, patch: Custom) =>
    setCustoms((c) => ({ ...c, [id]: { ...c[id], ...patch } }));

  const needle = q.trim().toLowerCase();
  const visible = EFFECTS.filter(
    (e) =>
      (cat === "all" ||
        (cat === "fav" ? favs.has(e.id) : e.cat === cat)) &&
      (!needle ||
        `${e.name} ${e.plugin} ${e.blurb}`.toLowerCase().includes(needle))
  );
  const openEffect = EFFECTS.find((e) => e.id === openId) ?? null;
  const openIdx = openEffect
    ? visible.findIndex((e) => e.id === openEffect.id)
    : -1;
  const step = (dir: number) => {
    const list = openIdx >= 0 ? visible : EFFECTS;
    const i = openIdx >= 0 ? openIdx : 0;
    setOpenId(list[(i + dir + list.length) % list.length].id);
  };

  const countFor = (c: FilterId) =>
    c === "all"
      ? EFFECTS.length
      : c === "fav"
        ? favs.size
        : EFFECTS.filter((e) => e.cat === c).length;

  // hydrate the saved selection after mount (localStorage isn't available
  // during SSR, so this must not run in the initial render)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- portal/document gate must flip after mount to avoid SSR mismatch
    setMounted(true);
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]"
      );
      if (Array.isArray(saved)) {
        setSelected(
          new Set(
            saved.filter(
              (id): id is string =>
                typeof id === "string" && EFFECTS.some((e) => e.id === id)
            )
          )
        );
      }
      const savedCustoms: unknown = JSON.parse(
        localStorage.getItem(CUSTOMS_KEY) ?? "{}"
      );
      if (savedCustoms && typeof savedCustoms === "object") {
        setCustoms(savedCustoms as Record<string, Custom>);
      }
      const savedFavs: unknown = JSON.parse(
        localStorage.getItem(FAVS_KEY) ?? "[]"
      );
      if (Array.isArray(savedFavs)) {
        setFavs(
          new Set(
            savedFavs.filter(
              (id): id is string =>
                typeof id === "string" && EFFECTS.some((e) => e.id === id)
            )
          )
        );
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]));
    } catch {}
  }, [selected]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMS_KEY, JSON.stringify(customs));
    } catch {}
  }, [customs]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVS_KEY, JSON.stringify([...favs]));
    } catch {}
  }, [favs]);

  // "/" focuses the search anywhere on the page — except while the modal is
  // open, where it would steal focus into an input hidden behind the overlay
  useEffect(() => {
    if (openId) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (
        e.key === "/" &&
        !(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  // filtering changes the grid's height — stale trigger positions below it
  // would misfire, so recompute after every category or search change
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [cat, needle]);

  // while the modal covers the screen, freeze the grid's ~100 demos — resume
  // only the ones we paused (DemoFrame may have already frozen offscreen ones)
  const pausedByModal = useRef<gsap.core.Animation[]>([]);
  useEffect(() => {
    if (openId) {
      gsap.globalTimeline
        .getChildren(true, true, true)
        .forEach((anim) => {
          const targets =
            typeof (anim as gsap.core.Tween).targets === "function"
              ? ((anim as gsap.core.Tween).targets() as unknown[])
              : [];
          if (
            targets.some(
              (t) => t instanceof Element && root.current!.contains(t)
            ) &&
            !anim.paused()
          ) {
            anim.pause();
            pausedByModal.current.push(anim);
          }
        });
    } else {
      pausedByModal.current.forEach((a) => a.resume());
      pausedByModal.current = [];
    }
  }, [openId]);

  const toggle = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const toggleFav = (id: string) =>
    setFavs((s) => {
      const next = new Set(s);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  useGSAP(
    () => {
      gsap.from(".fx-card", {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".fx-grid", start: "top 85%" },
      });
    },
    { scope: root, dependencies: [cat], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="catalog" className="px-6 py-28 md:px-12">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        <Decode text="CATALOGUE D'EFFETS" />
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
        <Decode text="Choisissez un effet. Je l'intègre à votre site." />
      </h2>
      <p className="mt-4 max-w-xl text-sm text-white/55">
        Chaque tuile est une démo live — survolez, cliquez, draggez
        à l&apos;intérieur. <span className="text-accent">{"{ }"}</span> pour le
        vrai code, <span className="text-accent">+</span> pour composer votre
        sélection, puis envoyez-moi la liste.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-2">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            data-hover
            className={`rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              cat === c.id
                ? "border-accent bg-accent/10 text-accent"
                : "border-white/15 text-white/50 hover:border-white/40"
            }`}
          >
            {c.label} · {countFor(c.id)}
          </button>
        ))}
        <input
          ref={searchRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setQ("")}
          placeholder="rechercher… ( / )"
          aria-label="Rechercher un effet"
          className="ml-auto w-44 rounded-full border border-white/15 bg-transparent px-4 py-1.5 font-mono text-[10px] text-white/70 outline-none placeholder:text-white/25 focus:border-accent"
        />
      </div>

      {(cat !== "all" || needle) && (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
          {visible.length} résultat{visible.length > 1 ? "s" : ""}
          {needle && (
            <>
              {" "}
              pour « <span className="text-accent">{q}</span> »
            </>
          )}
        </p>
      )}

      <div className="fx-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((e) => (
          <EffectCard
            key={e.id}
            effect={e}
            index={EFFECT_INDEX.get(e.id) ?? 0}
            selected={selected.has(e.id)}
            fav={favs.has(e.id)}
            onSelect={() => toggle(e.id)}
            onFav={() => toggleFav(e.id)}
            onOpen={() => setOpenId(e.id)}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <div className="mt-8 grid place-items-center rounded-xl border border-dashed border-white/10 py-16 text-center">
          <p className="font-mono text-xs text-white/40">
            {cat === "fav" && !needle
              ? "Aucun favori — clique ♥ sur une carte pour l'épingler."
              : `Aucun effet pour « ${q} » dans ${CATS.find((c) => c.id === cat)?.label}`}
          </p>
          <button
            data-hover
            onClick={() => {
              setQ("");
              setCat("all");
            }}
            className="mt-3 rounded-full border border-accent/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
          >
            réinitialiser
          </button>
        </div>
      )}

      {openEffect &&
        createPortal(
          <EffectModal
            effect={openEffect}
            index={EFFECT_INDEX.get(openEffect.id) ?? 0}
            pos={openIdx >= 0 ? openIdx : (EFFECT_INDEX.get(openEffect.id) ?? 0)}
            total={openIdx >= 0 ? visible.length : EFFECTS.length}
            selected={selected.has(openEffect.id)}
            fav={favs.has(openEffect.id)}
            onFav={() => toggleFav(openEffect.id)}
            custom={customs[openEffect.id] ?? {}}
            onCustom={(patch) => setCustom(openEffect.id, patch)}
            onResetCustom={() =>
              setCustoms((c) => ({ ...c, [openEffect.id]: {} }))
            }
            onSelect={() => toggle(openEffect.id)}
            onClose={() => setOpenId(null)}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />,
          document.body
        )}

      {selected.size > 0 &&
        createPortal(
          <SelectionTray
            selected={selected}
            onClear={() => setSelected(new Set())}
          />,
          document.body
        )}

      {mounted &&
        createPortal(
        <button
          onClick={() => setFavOpen(true)}
          data-hover
          aria-label={`Ouvrir mes favoris (${favs.size})`}
          className="fixed right-0 top-1/2 z-[55] -translate-y-1/2 rounded-l-xl border border-r-0 border-white/15 bg-[#0b0b0b]/95 px-2.5 py-5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 backdrop-blur transition-colors hover:border-accent hover:text-accent [writing-mode:vertical-rl]"
        >
          <span className="text-accent">♥</span> favoris · {favs.size}
        </button>,
        document.body
      )}

      {favOpen &&
        createPortal(
          <FavoritesDrawer
            favs={favs}
            selected={selected}
            modalOpen={openEffect != null}
            onFav={toggleFav}
            onSelect={toggle}
            onOpen={(id) => setOpenId(id)}
            onClose={() => setFavOpen(false)}
          />,
          document.body
        )}
    </section>
  );
}

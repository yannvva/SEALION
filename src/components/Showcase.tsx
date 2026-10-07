"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import Decode from "@/components/Decode";

// ————————————————————————————————————————————————
// Page-scale versions of the catalogue patterns — the same techniques,
// applied to real editorial content instead of demo tiles.
// ————————————————————————————————————————————————

export function EditorialSpread() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const split = new SplitText(".ed-title", { type: "lines", mask: "lines" });
      gsap.from(split.lines, {
        yPercent: 110,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".ed-title", start: "top 80%" },
      });
      gsap.from(".ed-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.fromTo(
        ".ed-col",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ed-body", start: "top 75%" },
        }
      );
      gsap
        .timeline({ repeat: -1 })
        .to(".ed-words", { yPercent: -25, duration: 0.6, ease: "power3.inOut" }, "+=1.6")
        .to(".ed-words", { yPercent: -50, duration: 0.6, ease: "power3.inOut" }, "+=1.6")
        .to(".ed-words", { yPercent: -75, duration: 0.6, ease: "power3.inOut" }, "+=1.6")
        .set(".ed-words", { yPercent: 0 }, "+=0.6");
    },
    { scope: root }
  );
  return (
    <section
      ref={root}
      className="relative border-y border-white/10 px-6 py-16 md:px-12 md:py-20"
    >
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span className="text-accent">N°02 — LE MANIFESTE</span>
        <span>Édition permanente</span>
      </div>
      <div className="ed-rule mt-6 h-px w-full bg-white/20" />

      <h2 className="ed-title mt-8 text-[clamp(2.2rem,5.5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight">
        Le mouvement est une grammaire — pas un ornement
      </h2>

      <div className="ed-body mt-10 grid gap-8 md:grid-cols-12">
        <div className="ed-col md:col-span-4">
          <p className="text-[15px] leading-relaxed text-white/70">
            <span className="float-left mr-3 mt-1 text-7xl font-black leading-[0.8] text-accent">
              C
            </span>
            haque interface raconte quelque chose avant même qu&apos;on la lise.
            Un menu qui glisse dit l&apos;ordre. Une carte qui rebondit dit la
            matière. Chez IANSAN, le motion n&apos;arrive jamais après le design
            — il est le design.
          </p>
        </div>
        <div className="ed-col md:col-span-4">
          <p className="text-[15px] leading-relaxed text-white/55">
            Nous construisons des sites comme des films : un plan séquence
            d&apos;ouverture, des transitions qui guident le regard, des pauses
            qui laissent respirer le contenu. La retenue signe le style — une
            intention par écran, jamais de bruit gratuit.
          </p>
        </div>
        <div className="ed-col border-l border-accent/40 pl-6 md:col-span-4">
          <p className="text-2xl font-bold leading-snug">
            «&nbsp;Créer des{" "}
            <span className="relative inline-block h-[1.15em] w-[8ch] overflow-hidden align-bottom">
              <span className="ed-words block">
                {["récits", "interfaces", "histoires", "récits"].map(
                  (w, i) => (
                    <span key={i} className="block text-accent">
                      {w}
                    </span>
                  )
                )}
              </span>
            </span>
            <br />
            qui se parcourent.&nbsp;»
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            — manifeste IANSAN
          </p>
        </div>
      </div>
    </section>
  );
}

export function MediaStrip() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.to(".ms-burns", {
        scale: 1.15,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.from(".ms-cap", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root }
  );
  const tiles = [
    { speed: "0.88", grad: "from-accent/50 to-black", label: "PROJET_01 — Aurora" },
    { speed: "1.0", grad: "from-[#8a63ff]/50 to-black", label: "PROJET_02 — Nébuleuse", burns: true },
    { speed: "1.12", grad: "from-[#ff6b6b]/40 to-black", label: "PROJET_03 — Solaire" },
  ];
  return (
    <section ref={root} className="relative overflow-hidden py-16 md:py-20">
      <p className="px-6 font-mono text-xs uppercase tracking-[0.3em] text-accent md:px-12">
        <Decode text="TRAVAUX SÉLECTIONNÉS" />
      </p>
      <div className="mx-auto mt-8 flex max-w-4xl justify-center gap-4 px-6 md:px-12">
        {tiles.map((t, i) => (
          <figure
            key={t.label}
            data-speed={t.speed}
            className={`relative aspect-[16/11] w-1/3 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${t.grad} ${
              i === 1 ? "-mt-8" : i === 2 ? "mt-8" : ""
            }`}
          >
            <div
              className={`absolute inset-0 ${t.burns ? "ms-burns will-change-transform" : ""}`}
            />
            <figcaption className="ms-cap absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
              {t.label}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 px-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 md:px-12">
        data-speed — parallaxe native du ScrollSmoother actif sur cette page
      </p>
    </section>
  );
}

export function FaqSection() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".faq-body").forEach((b, i) => {
        gsap.to(b, {
          height: i === open ? b.scrollHeight : 0,
          opacity: i === open ? 1 : 0,
          duration: 0.5,
          ease: "power3.inOut",
          overwrite: true,
        });
      });
      gsap.utils.toArray<HTMLElement>(".faq-icon").forEach((ic, i) => {
        gsap.to(ic, { rotate: i === open ? 45 : 0, duration: 0.4 });
      });
    },
    { scope: root, dependencies: [open] }
  );
  const faqs = [
    [
      "Combien de temps pour un site immersif ?",
      "6 à 10 semaines selon l'ampleur : cadrage, design, intégration GSAP/WebGL, recette. Un moodboard animé arrive dès la semaine 2.",
    ],
    [
      "Le catalogue d'effets est-il réutilisable ?",
      "Oui — c'est le principe. Chaque effet listé plus haut est un composant prêt à l'emploi : vous sélectionnez, nous l'intégrons à votre charte.",
    ],
    [
      "GSAP seul, ou avec WebGL ?",
      "GSAP pilote tout : DOM, SVG, canvas. Pour les scènes 3D nous couplons Three.js, synchronisé sur le même ticker.",
    ],
    [
      "Et les performances ?",
      "Transforms only, pause hors viewport, prefers-reduced-motion respecté — les mêmes règles que ce catalogue. Score Lighthouse ≥ 90.",
    ],
    [
      "Le site est-il éditable ensuite ?",
      "CMS headless (Sanity, Payload) ou édition directe — on livre la doc motion pour que vos équipes gardent la cohérence.",
    ],
  ];
  return (
    <section ref={root} className="px-6 py-16 md:px-12 md:py-20">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            <Decode text="QUESTIONS FRÉQUENTES" />
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Ce qu&apos;on nous demande.
          </h2>
          <p className="mt-4 text-sm text-white/50">
            Le pattern « accordéon » du catalogue — hauteur mesurée, icône qui
            pivote — en vraie grandeur.
          </p>
        </div>
        <div className="md:col-span-8">
          {faqs.map(([question, answer], i) => (
            <div key={question} className="border-b border-white/10">
              <button
                data-hover
                onClick={() => setOpen(i === open ? -1 : i)}
                aria-expanded={i === open}
                className="flex w-full items-center justify-between gap-6 py-4 text-left"
              >
                <span
                  className={`text-base font-medium transition-colors md:text-lg ${
                    i === open ? "text-accent" : "text-white/80"
                  }`}
                >
                  {question}
                </span>
                <span className="faq-icon shrink-0 text-2xl font-light text-accent">
                  +
                </span>
              </button>
              <div
                className="faq-body overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <p className="max-w-2xl pb-6 leading-relaxed text-white/55">
                  {answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VoicesSection() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const quotes = [
    [
      "« IANSAN a transformé notre catalogue produit en expérience. Le panier moyen a progressé de 38%. »",
      "Élise M. — directrice e-commerce, Maison Verne",
    ],
    [
      "« On ne parle plus du site, on le fait scroller en réunion. C'est devenu notre meilleur commercial. »",
      "Théo R. — fondateur, Orbital Studio",
    ],
    [
      "« Le manifeste du site a fédéré nos équipes avant même le lancement. Le motion comme langue, vraiment. »",
      "Nadia K. — dir. communication, Helios Group",
    ],
  ];
  useGSAP(
    () => {
      const iv = window.setInterval(
        () => setI((v) => (v + 1) % quotes.length),
        4200
      );
      return () => window.clearInterval(iv);
    },
    { scope: root }
  );
  useGSAP(
    () => {
      gsap.fromTo(
        ".voice",
        { opacity: 0, y: 24, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".voice-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 4.2,
          ease: "none",
          transformOrigin: "left",
        }
      );
    },
    { scope: root, dependencies: [i] }
  );
  return (
    <section
      ref={root}
      className="border-y border-white/10 bg-white/[0.02] px-6 py-16 md:px-12 md:py-20"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        <Decode text="ILS RACONTENT" />
      </p>
      <div className="voice mx-auto mt-8 max-w-3xl text-center">
        <p className="text-xl font-medium leading-snug md:text-2xl">
          {quotes[i][0]}
        </p>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          {quotes[i][1]}
        </p>
      </div>
      <div className="mx-auto mt-8 h-px w-40 overflow-hidden bg-white/10">
        <div className="voice-bar h-full w-full scale-x-0 bg-accent" />
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {quotes.map((_, d) => (
          <button
            key={d}
            data-hover
            aria-label={`Témoignage ${d + 1}`}
            onClick={() => setI(d)}
            className={`h-1.5 rounded-full transition-all ${
              d === i ? "w-8 bg-accent" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export function OffersSection() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    (_, contextSafe) => {
      gsap.from(".offer", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".offers", start: "top 80%" },
      });
      const cards = gsap.utils.toArray<HTMLElement>(".offer");
      const bound = cards.map((card) => {
        const enter =
          contextSafe?.(() => {
            gsap.to(card, { y: -10, duration: 0.4, ease: "power3.out" });
            gsap.to(
              cards.filter((c) => c !== card),
              { opacity: 0.45, duration: 0.4 }
            );
          }) ?? (() => {});
        const leave =
          contextSafe?.(() => {
            gsap.to(card, { y: 0, duration: 0.4 });
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
  const offers = [
    {
      n: "VITRINE",
      p: "à partir de 4k€",
      d: "Site 3-5 pages, animations d'entrée, responsive.",
      items: ["Design + intégration", "Motion léger", "CMS optionnel"],
    },
    {
      n: "IMMERSIF",
      p: "à partir de 12k€",
      d: "Scroll experience complète, transitions de page, catalogue d'effets.",
      items: ["ScrollSmoother + pin", "SplitText & morphs", "Transitions signature"],
      hot: true,
    },
    {
      n: "SUR MESURE",
      p: "devis",
      d: "WebGL, 3D temps réel, design system motion complet.",
      items: ["Three.js couplé GSAP", "Design system animé", "Accompagnement 6 mois"],
    },
  ];
  return (
    <section ref={root} className="px-6 py-16 md:px-12 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        <Decode text="OFFRES" />
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-bold md:text-4xl">
        Trois façons de travailler ensemble.
      </h2>
      <div className="offers mt-10 grid gap-5 md:grid-cols-3">
        {offers.map((o) => (
          <article
            key={o.n}
            data-hover
            className={`offer relative rounded-2xl border p-6 will-change-transform ${
              o.hot
                ? "border-accent/60 bg-accent/[0.06]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            {o.hot && (
              <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black">
                le plus choisi
              </span>
            )}
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {o.n}
            </h3>
            <p className="mt-3 text-2xl font-black">{o.p}</p>
            <p className="mt-2 text-sm text-white/50">{o.d}</p>
            <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-5">
              {o.items.map((it) => (
                <li
                  key={it}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <span className="text-accent">✦</span> {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

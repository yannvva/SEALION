import type { ComponentType } from "react";
import {
  SplitRevealDemo,
  ScrambleDemo,
  MarqueeDemo,
  MagneticDemo,
  TiltDemo,
  BurstDemo,
  DragThrowDemo,
  FlipMiniDemo,
  CursorFollowDemo,
  DrawDemo,
  OrbitDemo,
  MorphDemo,
  StackSimDemo,
  ClipRevealDemo,
  StaggerWaveDemo,
  CounterDemo,
  TextFadeDemo,
  ElasticDemo,
  HorizontalMiniDemo,
  ScrollToDemo,
  ObserverGaugeDemo,
  DragSpinDemo,
  WiggleDemo,
  BounceDemo,
  EaseLabDemo,
  PhysicsFallDemo,
  LinesRevealDemo,
  ChoreoDemo,
  TrailDemo,
  ParallaxDemo,
  SmootherDemo,
  EaseReverseDemo,
  HoverPreviewDemo,
  BentoScrubDemo,
  StaggerInDemo,
  CurveSwipeDemo,
  CanvasMorphDemo,
  HorizontalTextDemo,
  WaypointsDemo,
  LoopPanelsDemo,
  FooterBounceDemo,
  ScrollProgressDemo,
  MaskScrollDemo,
  PinIndicatorDemo,
  LoopSectionsDemo,
  WormDemo,
  TypewriterDemo,
  CustomEaseDemo,
  KeyframesDemo,
  TextFillDemo,
  ImageSeqDemo,
  DevtoolsDemo,
  PathHelperDemo,
  MatchMediaDemo,
  EditorialTitleDemo,
  WordRotatorDemo,
  LetterWaveDemo,
  DropCapDemo,
  PullQuoteDemo,
  OutlineFillDemo,
  ColumnRevealDemo,
  SectionWipeDemo,
  CurtainColsDemo,
  ZoomThroughDemo,
  CrossfadeDemo,
  PinRotateDemo,
  BlindsDemo,
  KenBurnsDemo,
  VelocitySkewDemo,
  HoverDistortDemo,
  BeforeAfterDemo,
  ImageTrailDemo,
  RollLinkDemo,
  MenuOverlayDemo,
  MouseParallaxDemo,
  OdometerDemo,
  StickyMediaDemo,
  VelocityMarqueeDemo,
  CircularTextDemo,
  GlitchDemo,
  RepelGridDemo,
  ProgressRingDemo,
  CardFlipDemo,
  PillNavDemo,
  CornerRevealDemo,
  TextScatterDemo,
  ElasticLineDemo,
  SpotlightDemo,
  SplitFlapDemo,
  DragSliderDemo,
  FlipListDemo,
  TextWaveDemo,
  ScrollZoomDemo,
  SnapScrollDemo,
  CubeDemo,
  GooeyDemo,
  AccordionDemo,
  NavShrinkDemo,
  ToastDemo,
  DialogDemo,
  TooltipDemo,
  StepperDemo,
  TimelineDemo,
  TestimonialsDemo,
  PricingDemo,
  CtaFillDemo,
  InputFloatDemo,
  LightboxDemo,
  CardFanDemo,
  SkeletonDemo,
  CoverFlowDemo,
  ScrollSpyDemo,
  DrawerDemo,
  PullRefreshDemo,
  RadialMenuDemo,
  HoverScrambleDemo,
  MagneticCharsDemo,
  VelocityTextDemo,
  PinnedSwapDemo,
  BlurRevealDemo,
  CursorLabelDemo,
  GridGlowDemo,
  ScrollCounterDemo,
  NavHideDemo,
  HighlightDemo,
  ToggleDemo,
  CheckDrawDemo,
  SegmentedDemo,
  LikeBurstDemo,
  StarsDemo,
  PingDemo,
  EqualizerDemo,
  InnerParallaxDemo,
  BorderGlowDemo,
  ChatDemo,
  CmdPaletteDemo,
  TabsDemo,
  RangeFillDemo,
  OtpDemo,
  ChipInputDemo,
  CopyBtnDemo,
  LoadBarDemo,
  AvatarFanDemo,
  BadgeBumpDemo,
  DropdownDemo,
  MiniCarouselDemo,
  QtyStepperDemo,
  SubmitStateDemo,
  BannerDemo,
  PlayMorphDemo,
  PwdEyeDemo,
  FormShakeDemo,
  BorderTraceDemo,
  CharFlipDemo,
  HoverClipDemo,
  ArrowSlideDemo,
  UnderlineGrowDemo,
  TiltGlareDemo,
  DockDemo,
  RippleDemo,
  HoldConfirmDemo,
  ConfettiDemo,
  SunMoonDemo,
  BookmarkDemo,
  DownloadArcDemo,
  MultiSelectDemo,
  MuteWaveDemo,
  ExpandCardDemo,
  DotsLoaderDemo,
  ShapeCycleDemo,
  ShineTextDemo,
  FloatBobDemo,
  MatrixRainDemo,
  RadarDemo,
  WaveCircleDemo,
  GradientSpinDemo,
  ScaleTitleDemo,
  ScrubNumberDemo,
  ParallaxColsDemo,
  DividerGrowDemo,
  FanScrollDemo,
  MarqueeDirDemo,
  ZoomSectionDemo,
  ImgRotateInDemo,
  VelocityScaleDemo,
  ClipCornerDemo,
  ImgLoadDemo,
  PhotoShuffleDemo,
  MaskShapeDemo,
  ThumbNavDemo,
  PanDragDemo,
  MosaicRevealDemo,
  ScrubFiltersDemo,
  SwipeDeleteDemo,
  SplitterDemo,
  TinderDemo,
  WheelPickerDemo,
  SortableDemo,
  ReadBarDemo,
  BigStatDemo,
  FootnoteDemo,
  CiteMarkDemo,
  CircleWipeDemo,
  TopLoaderDemo,
  HeroEnterDemo,
  DoorsDemo,
  FpsDemo,
  UtilsDemo,
  MarkersDemo,
  ObserverVizDemo,
  SplitScreenDemo,
  GridWipeDemo,
  PageLoaderDemo,
  SharedElementDemo,
  CurtainUpDemo,
  StackPushDemo,
  ReducedMotionDemo,
  StaggerLabDemo,
  LabelJumpDemo,
  InvalidateDemo,
  TickerUtilDemo,
  KillDemo,
  TocSpyDemo,
  WordMaskDemo,
  MarginNoteDemo,
  ChapterNumDemo,
  CaptionSlideDemo,
  DragUploadDemo,
  SnapGridDemo,
  BoundBallDemo,
  DragValueDemo,
  HueDragDemo,
  VideoScrubDemo,
  GalleryFilterDemo,
  ZoomCursorDemo,
  PlaylistDemo,
  MediaFocusDemo,
  SearchExpandDemo,
  HamburgerDemo,
  ContextMenuDemo,
  PwdMeterDemo,
  TableSortDemo,
  NotifBellDemo,
  StrikeDemo,
  BgSlideDemo,
  IconSwapDemo,
  SweepHoverDemo,
  BlurTextDemo,
  CoinFlipDemo,
  DiceRollDemo,
  PulseRingDemo,
  ClickSpawnDemo,
  LockUnlockDemo,
  BreatheDemo,
  ScanLineDemo,
  RingLoaderDemo,
  TickClockDemo,
  DrawScrollDemo,
  ScrollFlipDemo,
  WordFocusDemo,
  ImgMarqueeDemo,
  MasonryFlipDemo,
  SplitImageDemo,
  WipeImageDemo,
  CharCountDemo,
  InlineExpandDemo,
  ListMarkerDemo,
  DateStampDemo,
  BlurTransitionDemo,
  RouteStaggerDemo,
  DiagonalWipeDemo,
  DragPathDemo,
  SwipeTabsDemo,
  StripDragDemo,
  MagnetSnapDemo,
  TweenControlsDemo,
  TimeScaleDemo,
  TimelineScrubDemo,
  QuickSetterDemo,
  RatingInputDemo,
  ConfirmInlineDemo,
  TreeViewDemo,
  FileListDemo,
  EmptyStateDemo,
  ProfilePopDemo,
  WobbleIconDemo,
  TrackingOutDemo,
  RevealActionsDemo,
  DashedRunDemo,
  TextFillXDemo,
  DialClickDemo,
  PinDropDemo,
  FlashSnapDemo,
  RadioPopDemo,
  SizeSelectDemo,
  KnobValueDemo,
  BoxResizeDemo,
  ArcSliderDemo,
  ScrubNumDemo,
  NeonFlickerDemo,
  SineWaveDemo,
  LiquidFillDemo,
  BorderRunDemo,
  EcgLineDemo,
  ScrollBgDemo,
  MediaShrinkDemo,
  SectionTiltDemo,
  Product360Demo,
  VideoHoverDemo,
  FocusPullDemo,
  ColorGradeDemo,
  FloatFigureDemo,
  BigNumbersDemo,
  EndMarkDemo,
  TitleTrackDemo,
  ReadTimeDemo,
  PageTurnDemo,
  StaticZapDemo,
  IntroLogoDemo,
  NextProjectDemo,
  DistributeVizDemo,
  WrapUtilDemo,
  LerpColorDemo,
  MapRangeDemo,
  RandomVizDemo,
  type DemoProps,
} from "./demos";
import {
  MSpringDemo,
  MDragDemo,
  MVariantsDemo,
  MPresenceDemo,
  MScrollDemo,
  MMvColorDemo,
  MLayoutDemo,
  MInViewDemo,
  MSequenceDemo,
  MCursorDemo,
  MMorphDemo,
  MCounterDemo,
} from "./motion-demos";

export type EffectCat =
  | "hover"
  | "click"
  | "drag"
  | "loop"
  | "scroll"
  | "page"
  | "tools"
  | "edito"
  | "media"
  | "ui"
  | "motion";

export interface Effect {
  id: string;
  name: string;
  plugin: string;
  cat: EffectCat;
  blurb: string;
  code: string;
  /** When set, the modal shows a text field that feeds Demo's `text` prop. */
  textParam?: {
    def: string;
    /** textarea, "\n" becomes <br/> */
    multi?: boolean;
    /** value is a comma-separated list */
    csv?: boolean;
  };
  /** Slider / select tweaks shown in the modal — `%%key%%` placeholders in
   * `code` get substituted, and the values feed Demo's `params` prop. */
  params?: EffectParam[];
  Demo: ComponentType<DemoProps>;
}

export interface EffectParam {
  /** matches the %%key%% placeholder in `code` and Demo's params lookup */
  key: string;
  label: string;
  def: number | string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  /** option pills instead of a slider (e.g. eases) */
  options?: string[];
}

export const EFFECTS: Effect[] = [
  {
    id: "split-reveal",
    name: "Char reveal",
    plugin: "SplitText",
    cat: "loop",
    blurb: "Titre découpé en caractères, révélé en cascade.",
    code: `const split = new SplitText(".title", { type: "chars" });
gsap.from(split.chars, {
  yPercent: %%decalage%%,
  stagger: %%stagger%%,
  duration: %%duree%%,
  ease: "%%ease%%",
});`,
    textParam: { def: "REVEAL" },
    params: [
      { key: "decalage", label: "décalage", def: 120, min: 20, max: 200, step: 5, unit: "%" },
      { key: "stagger", label: "cascade", def: 0.05, min: 0, max: 0.2, step: 0.005, unit: "s" },
      { key: "duree", label: "durée", def: 0.7, min: 0.2, max: 2, step: 0.05, unit: "s" },
      { key: "ease", label: "ease", def: "power4.out", options: ["power4.out", "back.out(2)", "elastic.out(1,0.4)", "bounce.out", "steps(8)"] },
    ],
    Demo: SplitRevealDemo,
  },
  {
    id: "scramble",
    name: "Decode text",
    plugin: "ScrambleText",
    cat: "loop",
    blurb: "Les caractères cyclent à travers des glyphes avant de se figer.",
    code: `gsap.to(".label", {
  duration: %%vitesse%%,
  scrambleText: {
    text: "DECODED",
    chars: "01<>/",
  },
});`,
    params: [
      { key: "vitesse", label: "durée / mot", def: 0.9, min: 0.3, max: 2, step: 0.05, unit: "s" },
    ],
    textParam: { def: "DECODE,CIPHER,SIGNAL,VECTOR", csv: true },
    Demo: ScrambleDemo,
  },
  {
    id: "marquee",
    name: "Infinite marquee",
    plugin: "core",
    cat: "loop",
    blurb: "Défilement continu — un seul tween en boucle, xPercent -50.",
    code: `gsap.to(".track", {
  xPercent: -50,
  repeat: -1,
  duration: %%duree%%,
  ease: "none",
});`,
    params: [
      { key: "duree", label: "durée", def: 7, min: 2, max: 30, step: 0.5, unit: "s" },
    ],
    textParam: { def: "motion ✦ gsap", csv: true },
    Demo: MarqueeDemo,
  },
  {
    id: "magnetic",
    name: "Magnetic button",
    plugin: "quickTo",
    cat: "hover",
    blurb: "L'élément gravite vers le curseur puis revient élastiquement.",
    code: `const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
el.addEventListener("mousemove", (e) => {
  const r = el.getBoundingClientRect();
  xTo((e.clientX - (r.left + r.width / 2)) * %%force%%);
  yTo((e.clientY - (r.top + r.height / 2)) * %%force%%);
});`,
    params: [
      { key: "force", label: "attraction", def: 0.55, min: 0.1, max: 0.9, step: 0.05 },
    ],
    Demo: MagneticDemo,
  },
  {
    id: "tilt-3d",
    name: "3D tilt",
    plugin: "core",
    cat: "hover",
    blurb: "Rotation en perspective suivant le pointeur, retour élastique.",
    code: `gsap.to(card, {
  rotateY: nx * %%amplitude%%,
  rotateX: -ny * %%amplitude%%,
  transformPerspective: 900,
  duration: 0.5,
  ease: "power2.out",
});
// on leave: ease "elastic.out(1, 0.5)" back to 0`,
    params: [
      { key: "amplitude", label: "amplitude", def: 18, min: 4, max: 30, step: 1, unit: "°" },
    ],
    Demo: TiltDemo,
  },
  {
    id: "physics-burst",
    name: "Particle burst",
    plugin: "Physics2D",
    cat: "click",
    blurb: "Le clic génère des particules avec vélocité, angle et gravité.",
    code: `for (let i = 0; i < %%particules%%; i++) {
  gsap.to(particle, {
    physics2D: {
      velocity: gsap.utils.random(%%velocite%% / 5, %%velocite%%),
      angle: gsap.utils.random(0, 360),
      gravity: %%gravite%%,
    },
    opacity: 0,
    onComplete: () => particle.remove(),
  });
}`,
    params: [
      { key: "particules", label: "particules", def: 16, min: 4, max: 60, step: 2 },
      { key: "velocite", label: "vélocité", def: 380, min: 100, max: 900, step: 20 },
      { key: "gravite", label: "gravité", def: 700, min: 200, max: 1500, step: 50 },
    ],
    Demo: BurstDemo,
  },
  {
    id: "drag-throw",
    name: "Throw physics",
    plugin: "Draggable + Inertia",
    cat: "drag",
    blurb: "Saisir et lancer — inertie, friction et rebond sur les bords.",
    code: `Draggable.create(".orb", {
  type: "x,y",
  inertia: true,          // InertiaPlugin
  bounds: container,
  edgeResistance: 0.75,
});`,
    Demo: DragThrowDemo,
  },
  {
    id: "flip-layout",
    name: "Layout flip",
    plugin: "Flip",
    cat: "click",
    blurb: "Le changement d'état anime chaque élément entre les layouts.",
    code: `const state = Flip.getState(".item");
setLayout("list"); // React swaps the classes
Flip.from(state, {
  duration: 0.9,
  ease: "power3.inOut",
  absolute: true,
  stagger: 0.03,
});`,
    Demo: FlipMiniDemo,
  },
  {
    id: "cursor-follow",
    name: "Cursor follower",
    plugin: "quickTo",
    cat: "hover",
    blurb: "Élément traînant qui suit le pointeur à 60fps.",
    code: `const xTo = gsap.quickTo(".dot", "x", { duration: 0.35 });
const yTo = gsap.quickTo(".dot", "y", { duration: 0.35 });
window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});`,
    Demo: CursorFollowDemo,
  },
  {
    id: "draw-path",
    name: "Stroke draw",
    plugin: "DrawSVG",
    cat: "loop",
    blurb: "Les contours SVG se tracent seuls — signatures, HUDs, icônes.",
    code: `gsap.fromTo(".path",
  { drawSVG: "0%" },
  { drawSVG: "100%", duration: 2, ease: "power2.inOut" }
);
// or scrub it: scrollTrigger: { scrub: true }`,
    Demo: DrawDemo,
  },
  {
    id: "orbit",
    name: "Path orbit",
    plugin: "MotionPath",
    cat: "loop",
    blurb: "L'élément parcourt n'importe quel tracé SVG, aligné à la courbe.",
    code: `gsap.to(".orb", {
  motionPath: {
    path: "#route",
    align: "#route",
    alignOrigin: [0.5, 0.5],
  },
  duration: 4,
  repeat: -1,
  ease: "none",
});`,
    Demo: OrbitDemo,
  },
  {
    id: "morph",
    name: "Shape morph",
    plugin: "MorphSVG",
    cat: "loop",
    blurb: "N'importe quel tracé fond dans un autre — sans correspondre les points.",
    code: `gsap.to("#shapeA", {
  morphSVG: "#shapeB",   // or pass the d string directly
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});`,
    Demo: MorphDemo,
  },
  {
    id: "stack-cards",
    name: "Card stack",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Section épinglée — les cartes montent et s'empilent au scroll.",
    code: `const tl = gsap.timeline({
  scrollTrigger: { trigger: section, pin: true, scrub: 1 },
});
cards.forEach((card, i) => {
  if (!i) return;
  tl.fromTo(card, { yPercent: 110 }, { yPercent: 0 });
  tl.to(cards[i - 1], { scale: 0.9 }, "<");
});`,
    Demo: StackSimDemo,
  },
  {
    id: "clip-reveal",
    name: "Clip reveal",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Le panneau se démasque via clip-path animé + zoom interne.",
    code: `gsap.fromTo(".panel",
  { clipPath: "inset(18% 22% round 24px)" },
  {
    clipPath: "inset(0% 0% round 0px)",
    scrollTrigger: { trigger: section, scrub: true },
  }
);`,
    Demo: ClipRevealDemo,
  },
  {
    id: "horizontal",
    name: "Horizontal scroll",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Le scroll vertical pilote une piste horizontale, section épinglée.",
    code: `gsap.to(".track", {
  x: () => -(track.scrollWidth - innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: section,
    pin: true,
    scrub: 1,
    end: () => "+=" + (track.scrollWidth - innerWidth),
  },
});`,
    Demo: HorizontalMiniDemo,
  },
  {
    id: "stagger-wave",
    name: "Grid wave",
    plugin: "core",
    cat: "loop",
    blurb: "Stagger 2D qui rayonne depuis le centre d'une grille.",
    code: `gsap.to(".dot", {
  scale: 0.2,
  repeat: -1,
  yoyo: true,
  stagger: {
    each: 0.05,
    grid: [5, 5],
    from: "center",
  },
});`,
    Demo: StaggerWaveDemo,
  },
  {
    id: "counter",
    name: "Count-up",
    plugin: "core",
    cat: "loop",
    blurb: "Valeur tweenée avec snap — stats, loaders, HUDs.",
    code: `const o = { v: 0 };
gsap.to(o, {
  v: %%cible%%,
  duration: %%duree%%,
  ease: "power2.out",
  onUpdate: () => {
    el.textContent = Math.round(o.v) + "%";
  },
});
// or: gsap.to(el, { innerText: %%cible%%, snap: { innerText: 1 } })`,
    params: [
      { key: "cible", label: "cible", def: 100, min: 10, max: 999, step: 1 },
      { key: "duree", label: "durée", def: 2, min: 0.5, max: 6, step: 0.1, unit: "s" },
    ],
    Demo: CounterDemo,
  },
  {
    id: "text-scrub",
    name: "Word scrub",
    plugin: "SplitText + ScrollTrigger",
    cat: "scroll",
    blurb: "La position de scroll illumine les mots un par un.",
    code: `const split = new SplitText(".copy", { type: "words" });
gsap.fromTo(split.words,
  { opacity: 0.12 },
  {
    opacity: 1,
    stagger: 0.05,
    scrollTrigger: { trigger: section, scrub: true },
  }
);`,
    textParam: { def: "Words lit in sequence, one by one" },
    Demo: TextFadeDemo,
  },
  {
    id: "elastic",
    name: "Elastic hover",
    plugin: "core",
    cat: "hover",
    blurb: "Ease à dépassement puis stabilisation — feedback gelée.",
    code: `gsap.to(el, {
  scale: %%ampleur%%,
  duration: 0.9,
  ease: "elastic.out(1, 0.3)",
});`,
    params: [
      { key: "ampleur", label: "ampleur", def: 1.2, min: 1.05, max: 1.6, step: 0.05 },
    ],
    Demo: ElasticDemo,
  },
  {
    id: "scroll-to",
    name: "Scroll to",
    plugin: "ScrollToPlugin",
    cat: "click",
    blurb: "Scroll animé vers n'importe quelle cible — ancres de nav, carrousels.",
    code: `gsap.to(scroller, {
  scrollTo: { y: target.offsetTop - 24 },
  duration: 0.9,
  ease: "power2.inOut",
});
// window: gsap.to(window, { scrollTo: "#section" })`,
    Demo: ScrollToDemo,
  },
  {
    id: "observer-gauge",
    name: "Gesture gauge",
    plugin: "Observer",
    cat: "drag",
    blurb: "Entrées pointeur/molette unifiées, normalisées en valeurs.",
    code: `Observer.create({
  target: el,
  type: "pointer",
  onDrag: (self) => {
    value = gsap.utils.clamp(0, 100, value + self.deltaX * 0.4);
    gsap.to(fill, { scaleX: value / 100 });
  },
});`,
    Demo: ObserverGaugeDemo,
  },
  {
    id: "drag-spin",
    name: "Spin knob",
    plugin: "Draggable + Inertia",
    cat: "drag",
    blurb: "Drag rotatif avec inertie — cadrans, molettes, roues.",
    code: `Draggable.create(".knob", {
  type: "rotation",
  inertia: true,
});
// also: snap: (r) => Math.round(r / 30) * 30`,
    Demo: DragSpinDemo,
  },
  {
    id: "wiggle",
    name: "Wiggle shake",
    plugin: "CustomWiggle",
    cat: "click",
    blurb: "Ease oscillante pour shakes, alertes, feedback ludique.",
    code: `CustomWiggle.create("wiggle", {
  wiggles: %%wiggles%%,
  type: "easeOut",
});
gsap.fromTo(el,
  { rotation: -%%amplitude%% },
  { rotation: 0, duration: 1.3, ease: "wiggle" }
);`,
    params: [
      { key: "wiggles", label: "oscillations", def: 7, min: 3, max: 15, step: 1 },
      { key: "amplitude", label: "amplitude", def: 25, min: 5, max: 45, step: 1, unit: "°" },
    ],
    Demo: WiggleDemo,
  },
  {
    id: "bounce",
    name: "True bounce",
    plugin: "CustomBounce",
    cat: "loop",
    blurb: "Rebond physique + squash automatique, configurable.",
    code: `CustomBounce.create("myBounce", {
  strength: %%force%%,
  squash: 3,
});
// creates "myBounce" + "myBounce-squash" eases
tl.set(ball, { y: -%%hauteur%% })
  .to(ball, { y: 0, ease: "myBounce" }, 0)
  .to(ball, { scaleX: 1.4, scaleY: 0.6,
              ease: "myBounce-squash" }, 0);`,
    params: [
      { key: "force", label: "rebond", def: 0.65, min: 0.3, max: 0.95, step: 0.05 },
      { key: "hauteur", label: "hauteur", def: 70, min: 30, max: 140, step: 5, unit: "px" },
    ],
    Demo: BounceDemo,
  },
  {
    id: "ease-lab",
    name: "Ease lab",
    plugin: "core + EasePack",
    cat: "loop",
    blurb: "Chaque ease a sa personnalité — comparez-les côte à côte.",
    code: `// 40+ built-in eases, all chainable:
gsap.to(el, { x: dist, ease: "elastic.out(1,0.35)" });
gsap.to(el, { x: dist, ease: "back.out(2.5)" });
gsap.to(el, { x: dist, ease: "steps(9)" });
gsap.to(el, { x: dist, ease: "rough({strength:3})" }); // EasePack`,
    Demo: EaseLabDemo,
  },
  {
    id: "physics-props",
    name: "Prop physics",
    plugin: "PhysicsProps",
    cat: "loop",
    blurb: "Vélocité, accélération et friction sur TOUTE propriété.",
    code: `gsap.to(el, {
  physicsProps: {
    x: { velocity: 120, friction: 0.01 },
    y: { velocity: -80, acceleration: 420 },
    rotation: { velocity: 340, friction: 0.02 },
  },
  duration: 2.4,
});`,
    Demo: PhysicsFallDemo,
  },
  {
    id: "lines-reveal",
    name: "Masked lines",
    plugin: "SplitText",
    cat: "loop",
    blurb: "Révélation ligne par ligne avec masques overflow auto.",
    code: `const split = new SplitText(".copy", {
  type: "lines",
  mask: "lines",   // auto overflow-hidden wrappers
});
gsap.from(split.lines, {
  yPercent: 110,
  stagger: 0.12,
  ease: "power4.out",
});`,
    textParam: { def: "Masked lines revealed one by one" },
    Demo: LinesRevealDemo,
  },
  {
    id: "choreo",
    name: "Choreography",
    plugin: "timeline",
    cat: "loop",
    blurb: "Mouvements séquencés via le paramètre de position.",
    code: `const tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power2.inOut" },
});
tl.to(box, { x: 90 })
  .to(box, { y: 50 })
  .to(box, { x: 0 })
  .to(box, { y: 0 })
  .to(box, { rotation: 360, scale: 0.55 }, "-=0.1");`,
    Demo: ChoreoDemo,
  },
  {
    id: "trail",
    name: "Cursor trail",
    plugin: "core",
    cat: "hover",
    blurb: "Le pointeur génère des particules qui s'estompent sur son passage.",
    code: `onMouseMove: spawn a node, then:
gsap.to(p, {
  scale: 0,
  opacity: 0,
  duration: 0.8,
  onComplete: () => p.remove(),
});`,
    Demo: TrailDemo,
  },
  {
    id: "parallax",
    name: "Layer parallax",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Profondeur via des couches qui défilent à vitesses différentes.",
    code: `gsap.utils.toArray(".layer").forEach((el, i) => {
  gsap.to(el, {
    y: () => -depth[i] * scrollDist,
    ease: "none",
    scrollTrigger: { trigger: section, scrub: true },
  });
});`,
    Demo: ParallaxDemo,
  },
  {
    id: "smoother",
    name: "Butter scroll",
    plugin: "ScrollSmoother",
    cat: "page",
    blurb: "Scroll à inertie sur toute la page + parallaxe data-speed. EN DIRECT sur cette page — sentez le scroll.",
    code: `// wraps your markup: #smooth-wrapper > #smooth-content
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.2,
  effects: true, // data-speed / data-lag attrs
});`,
    Demo: SmootherDemo,
  },

  /* ---------- recreations of the official demos.gsap.com demos ---------- */
  {
    id: "ease-reverse",
    name: "Orchestrated menu",
    plugin: "easeReverse",
    cat: "click",
    blurb: "Les items du menu arrivent en cascade puis se replient en ease miroir — cliquez pour basculer.",
    code: `const tl = gsap.timeline({
  paused: true,
  defaults: {
    ease: "power4.out",
    easeReverse: "power2.in", // different ease when reversed
  },
}).to(".item", { yPercent: 0, opacity: 1, stagger: 0.07 });

open ? tl.reverse() : tl.play();`,
    Demo: EaseReverseDemo,
  },
  {
    id: "hover-preview",
    name: "Hover preview",
    plugin: "quickTo",
    cat: "hover",
    blurb: "Visuel flottant qui suit le curseur entre les liens, s'incline avec la vélocité.",
    code: `const xTo = gsap.quickTo(".panel", "x", { duration: 0.45, ease: "power3" });
const yTo = gsap.quickTo(".panel", "y", { duration: 0.45, ease: "power3" });
const rTo = gsap.quickTo(".panel", "rotation", { duration: 0.6 });

onMouseMove: xTo(mx); yTo(my); rTo(clamp(-18, 18, velocityX));
onMouseEnter: gsap.to(".panel", { scale: 1, ease: "back.out(2)" });`,
    Demo: HoverPreviewDemo,
  },
  {
    id: "bento-scrub",
    name: "Bento gallery",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Les tuiles bento se matérialisent en stagger aléatoire, liées au scroll.",
    code: `gsap.from(".tile", {
  scale: 0.25, opacity: 0, yPercent: 30,
  stagger: { each: 0.12, from: "random" },
  ease: "none",
  scrollTrigger: {
    trigger: ".bento",
    start: "top 95%", end: "top 40%", scrub: 1,
  },
});`,
    Demo: BentoScrubDemo,
  },
  {
    id: "stagger-in",
    name: "Stagger in",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Les items de liste entrent en cascade avec flou — le reveal de scroll classique, bien fait.",
    code: `gsap.from(".row", {
  y: 30, opacity: 0, filter: "blur(6px)",
  duration: 0.55, stagger: 0.12, ease: "power3.out",
  scrollTrigger: { trigger: ".list", start: "top 85%" },
});`,
    Demo: StaggerInDemo,
  },
  {
    id: "curve-swipe",
    name: "Curve swipe",
    plugin: "MorphSVG",
    cat: "page",
    blurb: "Bord SVG courbé qui balaie la page — le wipe de transition signature.",
    code: `const tl = gsap.timeline();
tl.to("#wipe", { morphSVG: "M0 0 H100 V72 Q50 96 0 72 Z", ease: "power2.in" })
  .to("#wipe", { morphSVG: "M0 0 H100 V100 Q50 100 0 100 Z" })
  // swap page content while covered
  .to("#wipe", { morphSVG: "M0 0 H100 V26 Q50 46 0 26 Z", ease: "power1.in" })
  .to("#wipe", { morphSVG: "M0 0 H100 V0 Q50 0 0 0 Z", ease: "power3.out" });`,
    Demo: CurveSwipeDemo,
  },
  {
    id: "canvas-morph",
    name: "Canvas morphs",
    plugin: "gsap.ticker",
    cat: "loop",
    blurb: "90 particules canvas tweenées entre formes — cercle, triangle, étoile, hexagone.",
    code: `const pts = Array.from({ length: 90 }, () => ({ x: 100, y: 100 }));

gsap.to(pts, {
  x: (i) => target[i].x,  // function-based values on plain objects
  y: (i) => target[i].y,
  duration: 1.5, ease: "power3.inOut",
  stagger: { each: 0.004, from: "random" },
});

gsap.ticker.add(() => { /* ctx.stroke path through pts */ });`,
    Demo: CanvasMorphDemo,
  },
  {
    id: "horizontal-text",
    name: "Horizontal text",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Bande de texte géante qui glisse horizontalement, liée au scroll.",
    code: `gsap.fromTo(".strip", { xPercent: 5 }, {
  xPercent: -45,
  ease: "none",
  scrollTrigger: {
    trigger: ".wrap",
    start: "top bottom", end: "bottom top",
    scrub: true,
  },
});`,
    textParam: { def: "HORIZONTAL ✦ SCROLL ✦ TEXT ✦ DRIFT" },
    Demo: HorizontalTextDemo,
  },
  {
    id: "waypoints",
    name: "Path waypoints",
    plugin: "MotionPath",
    cat: "loop",
    blurb: "Un voyageur suit une courbe ; les balises s'allument à son passage.",
    code: `// place markers along the path
const rawPath = MotionPathPlugin.getRawPath(path);
dots.forEach((d, i) => {
  const pos = MotionPathPlugin.getPositionOnPath(rawPath, (i + 1) / 5);
  gsap.set(d, { attr: { cx: pos.x, cy: pos.y } });
});

gsap.to(".ball", {
  motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
  duration: 5, repeat: -1, ease: "none",
  onUpdate() { /* flash waypoint when progress crosses it */ },
});`,
    Demo: WaypointsDemo,
  },
  {
    id: "loop-panels",
    name: "Loop panels",
    plugin: "infinite loop",
    cat: "loop",
    blurb: "Carrousel infini sans couture — piste dupliquée qui boucle à -50%.",
    code: `// duplicate the track content once
gsap.to(".track", {
  xPercent: -50,
  duration: 14,
  repeat: -1,
  ease: "none",
});
// for draggable infinite loops see gsap.utils.wrap + the
// horizontalLoop() helper from gsap.com/docs/v3/HelperFunctions`,
    Demo: LoopPanelsDemo,
  },
  {
    id: "footer-bounce",
    name: "Footer bounce",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Le footer surgit avec un dépassement élastique à l'arrivée.",
    code: `const tl = gsap.timeline({ paused: true })
  .fromTo(".footer", { yPercent: 140 },
    { yPercent: 0, duration: 1.2, ease: "elastic.out(1, 0.55)" });

ScrollTrigger.create({
  trigger: ".page-end", start: "top 88%",
  onEnter: () => tl.play(0),
  onLeaveBack: () => tl.pause(0),
});`,
    Demo: FooterBounceDemo,
  },
  {
    id: "scroll-progress",
    name: "Scroll progress",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Barre de progression liée au scroll — ici sur un scroller interne, transposable aux pages.",
    code: `// page-level version:
gsap.to(".progress", {
  scaleX: 1, ease: "none",
  scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
});
// the card version reads a nested scroller's scrollTop
// and gsap.set(bar, { scaleX: p }) — same idea`,
    Demo: ScrollProgressDemo,
  },
  {
    id: "mask-scroll",
    name: "Mask reveal",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Image dévoilée par un cercle clip-path qui s'étend, liée au scroll.",
    code: `gsap.fromTo(".img",
  { clipPath: "circle(16% at 50% 50%)", scale: 1.4 },
  {
    clipPath: "circle(75% at 50% 50%)", scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".wrap", start: "top 95%", end: "top 35%",
      scrub: 1,
    },
  });`,
    Demo: MaskScrollDemo,
  },
  {
    id: "pin-indicator",
    name: "Side indicator",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Des points latéraux suivent la progression dans les sections épinglées. Draggez la colonne.",
    code: `// per pinned section:
ScrollTrigger.create({
  trigger: section, start: "top center", end: "bottom center",
  onToggle: (self) =>
    dot.classList.toggle("active", self.isActive),
});`,
    Demo: PinIndicatorDemo,
  },
  {
    id: "loop-sections",
    name: "Loop sections",
    plugin: "infinite loop",
    cat: "loop",
    blurb: "Boucle verticale infinie — les sections s'enchaînent sans couture.",
    code: `// duplicate column content once
gsap.to(".column", {
  yPercent: -50,
  duration: 10,
  repeat: -1,
  ease: "none",
});`,
    Demo: LoopSectionsDemo,
  },
  {
    id: "worm",
    name: "Scroll worm",
    plugin: "DrawSVG + ScrollTrigger",
    cat: "scroll",
    blurb: "Le ver signature de gsap.com — une ligne sinueuse tracée au scroll.",
    code: `gsap.fromTo(".worm",
  { drawSVG: "0% 0%" },
  {
    drawSVG: "0% 100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".wrap",
      start: "top bottom", end: "bottom top",
      scrub: true,
    },
  });`,
    Demo: WormDemo,
  },
  {
    id: "typewriter",
    name: "Typewriter",
    plugin: "TextPlugin",
    cat: "loop",
    blurb: "Frappe caractère par caractère avec curseur clignotant.",
    code: `const tl = gsap.timeline({ repeat: -1 });
["build the web", "animate everything"].forEach((w) => {
  tl.to(".text", { text: w, duration: w.length * %%vitesse%%, ease: "none" })
    .to({}, { duration: %%pause%% })
    .to(".text", { text: "", duration: 0.35 });
});
gsap.to(".caret", { opacity: 0, repeat: -1, yoyo: true, duration: 0.45, ease: "steps(1)" });`,
    textParam: {
      def: "build the web,animate everything,gsap rocks",
      csv: true,
    },
    params: [
      { key: "vitesse", label: "vitesse / char", def: 0.07, min: 0.02, max: 0.2, step: 0.01, unit: "s" },
      { key: "pause", label: "pause", def: 1.2, min: 0.2, max: 3, step: 0.1, unit: "s" },
    ],
    Demo: TypewriterDemo,
  },
  {
    id: "custom-ease",
    name: "Custom ease",
    plugin: "CustomEase",
    cat: "loop",
    blurb: "Dessinez n'importe quel bezier — le point suit votre courbe.",
    code: `// draw a curve in the browser editor or write the path
CustomEase.create("hop", "M0,0 C0.14,0 0.26,0.99 0.5,0.99 C0.7,0.99 0.8,0.3 1,0.3");

gsap.to(".dot", { x: 168, duration: 1.4, ease: "hop" });
// CustomEase.getSVGData("hop") exports the curve`,
    Demo: CustomEaseDemo,
  },
  {
    id: "keyframes",
    name: "Keyframes",
    plugin: "core",
    cat: "loop",
    blurb: "Tableaux de waypoints — chaque segment a sa durée et son ease.",
    code: `gsap.to(".box", {
  keyframes: [
    { x: 60, duration: 0.4 },
    { y: 40, duration: 0.35 },
    { x: -60, duration: 0.4 },
    { rotation: 360, scale: 0.55, duration: 0.5 },
    { x: 0, y: 0, rotation: 0, scale: 1 },
  ],
  repeat: -1,
  ease: "power1.inOut", // default between keyframes
});`,
    Demo: KeyframesDemo,
  },
  {
    id: "text-fill",
    name: "Text fill",
    plugin: "clip-path + ScrollTrigger",
    cat: "scroll",
    blurb: "Le titre se remplit de couleur au scroll — texte dupliqué + clip.",
    code: `gsap.fromTo(".fill",
  { clipPath: "inset(0% 100% 0% 0%)" },
  {
    clipPath: "inset(0% 0% 0% 0%)",
    ease: "none",
    scrollTrigger: { trigger: ".wrap", start: "top 95%", end: "top 45%", scrub: 1 },
  });`,
    textParam: { def: "VELOCITY" },
    Demo: TextFillDemo,
  },
  {
    id: "image-seq",
    name: "Scroll sequence",
    plugin: "canvas + ScrollTrigger",
    cat: "scroll",
    blurb: "Séquence canvas image par image liée au scroll — style AirPods.",
    code: `// scrub a progress object, draw the frame in onUpdate
const o = { frame: 0 };
gsap.to(o, {
  frame: 1,
  ease: "none",
  onUpdate: () => drawFrame(ctx, o.frame), // render loop
  scrollTrigger: {
    trigger: ".wrap", start: "top bottom", end: "bottom top", scrub: true,
  },
});`,
    Demo: ImageSeqDemo,
  },
  {
    id: "devtools",
    name: "Mini devtools",
    plugin: "timeline control",
    cat: "tools",
    blurb: "Un scrubber fonctionnel — draggez la tête de lecture, pause/reprise. Le vrai GSDevTools le fait page entière en dev.",
    code: `// production-safe version shown in the card:
const tl = gsap.timeline({ paused: true });
slider.oninput = () => tl.progress(slider.value / 100).pause();

// the real plugin (dev only, never ship):
import { GSDevTools } from "gsap/GSDevTools";
if (process.env.NODE_ENV === "development") {
  GSDevTools.create({ animation: tl });
}`,
    Demo: DevtoolsDemo,
  },
  {
    id: "path-helper",
    name: "Path editor",
    plugin: "MotionPathHelper",
    cat: "tools",
    blurb: "Ouvre un éditeur bezier live sur n'importe quel tracé. Super-pouvoir en dev.",
    code: `import { MotionPathHelper } from "gsap/MotionPathHelper";
gsap.registerPlugin(MotionPathPlugin, MotionPathHelper);

// call once — a draggable point editor appears on the path
MotionPathHelper.editPath("#trajectory");`,
    Demo: PathHelperDemo,
  },
  {
    id: "matchmedia",
    name: "Responsive",
    plugin: "core",
    cat: "tools",
    blurb: "Animations pilotées par la taille de l'élément — cette carte ne s'anime qu'au-delà de 460px. Ouvrez-la dans la modale !",
    code: `// la carte réagit à SA largeur, pas au viewport :
const ro = new ResizeObserver(([e]) => {
  tween?.kill();
  if (e.contentRect.width >= 460) {
    tween = gsap.to(dot, { x: max, repeat: -1, yoyo: true });
  }
});
ro.observe(card);

// équivalent viewport natif :
// gsap.matchMedia(card).add("(min-width: 460px)", () => tween)`,
    Demo: MatchMediaDemo,
  },

  /* ---------- templates éditoriaux — magazine texte ---------- */
  {
    id: "editorial-title",
    name: "Titre éditorial",
    plugin: "SplitText",
    cat: "edito",
    blurb: "Masthead de magazine : lignes masquées qui se révèlent en cascade.",
    code: `const split = new SplitText(".title", {
  type: "lines",
  mask: "lines", // overflow masks automatiques
});
gsap.from(split.lines, {
  yPercent: 115,
  stagger: 0.12,
  duration: 0.9,
  ease: "power4.out",
});`,
    textParam: { def: "Le sens\ndu mouvement", multi: true },
    Demo: EditorialTitleDemo,
  },
  {
    id: "word-rotator",
    name: "Rotateur de mots",
    plugin: "core",
    cat: "edito",
    blurb: "Le mot clé du titre défile en boucle — 'Créer des récits / interfaces / mondes'.",
    code: `const words = gsap.utils.toArray(".word");
gsap.set(words, { yPercent: 100 });
gsap.set(words[0], { yPercent: 0 });

const tl = gsap.timeline({ repeat: -1 });
words.forEach((_, i) => {
  const next = words[(i + 1) % words.length];
  tl.to(words[i], { yPercent: -100, ease: "power3.in" })
    .fromTo(next, { yPercent: 100 }, { yPercent: 0, ease: "power3.out" }, "<")
    .to({}, { duration: 1.2 }); // pause de lecture
});`,
    textParam: { def: "récits,interfaces,émotions,mondes", csv: true },
    Demo: WordRotatorDemo,
  },
  {
    id: "letter-wave",
    name: "Vague de lettres",
    plugin: "SplitText",
    cat: "edito",
    blurb: "Au survol, chaque lettre ondule une par une — titre vivant.",
    code: `const split = new SplitText(".title", { type: "chars" });

el.addEventListener("mouseenter", () => {
  gsap.fromTo(split.chars, { y: 0 }, {
    y: -14,
    duration: 0.35,
    ease: "sine.out",
    stagger: { each: 0.035, yoyo: true, repeat: 1 },
  });
});`,
    textParam: { def: "Survolez" },
    Demo: LetterWaveDemo,
  },
  {
    id: "drop-cap",
    name: "Lettrine",
    plugin: "ScrollTrigger",
    cat: "edito",
    blurb: "Lettre capitale géante + paragraphe révélé — ouverture d'article magazine.",
    code: `const tl = gsap.timeline({
  scrollTrigger: { trigger: ".article", start: "top 80%" },
});
tl.from(".drop-cap", {
  scale: 3, opacity: 0, rotate: -8, ease: "power3.out",
}).from(".para-line", {
  opacity: 0, x: -14, stagger: 0.08,
}, "-=0.2");`,
    Demo: DropCapDemo,
  },
  {
    id: "pull-quote",
    name: "Citation encadrée",
    plugin: "DrawSVG",
    cat: "edito",
    blurb: "Trait dessiné puis citation qui monte — le pull-quote de magazine.",
    code: `const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
tl.fromTo(".rule",
  { drawSVG: "0% 0%" },
  { drawSVG: "0% 100%", ease: "power2.inOut" })
  .from(".quote", { opacity: 0, y: 16, ease: "power3.out" }, "-=0.3")
  .from(".sig", { opacity: 0 }, "-=0.1");`,
    textParam: {
      def: "L'animation n'est pas un ornement,\nc'est une grammaire.",
      multi: true,
    },
    Demo: PullQuoteDemo,
  },
  {
    id: "outline-fill",
    name: "Contour rempli",
    plugin: "clip-path + ScrollTrigger",
    cat: "edito",
    blurb: "Texte en contour qui se remplit de couleur au scroll — titre de rubrique.",
    code: `// deux copies superposées : contour + remplie
gsap.fromTo(".fill",
  { clipPath: "inset(0% 100% 0% 0%)" },
  {
    clipPath: "inset(0% 0% 0% 0%)",
    ease: "none",
    scrollTrigger: { trigger: ".wrap", scrub: 1 },
  });`,
    textParam: { def: "Édito" },
    Demo: OutlineFillDemo,
  },
  {
    id: "column-reveal",
    name: "Colonnes article",
    plugin: "ScrollTrigger",
    cat: "edito",
    blurb: "Trois colonnes de chapô révélées avec filets verticaux — mise en page magazine.",
    code: `gsap.from(".col", {
  yPercent: 40, opacity: 0,
  stagger: 0.18,
  ease: "power3.out",
  scrollTrigger: { trigger: ".article", start: "top 85%" },
});
gsap.from(".rule", {
  scaleY: 0, transformOrigin: "top",
  scrollTrigger: { trigger: ".article", start: "top 80%" },
});`,
    Demo: ColumnRevealDemo,
  },

  /* ---------- transitions de sections & effets média ---------- */
  {
    id: "section-wipe",
    name: "Wipe de section",
    plugin: "clip-path",
    cat: "page",
    blurb: "Les sections se recouvrent par clip-path + zoom interne — transition entre chapitres.",
    code: `// chaque nouvelle section passe par-dessus la précédente
gsap.fromTo(".slide",
  { clipPath: "inset(100% 0% 0% 0%)" },
  { clipPath: "inset(0% 0% 0% 0%)", ease: "power4.inOut" });
gsap.fromTo(".slide .inner",
  { scale: 1.35 }, { scale: 1, ease: "power3.out" }, "<");
// version scroll : mettre ce tween dans une timeline
// avec scrollTrigger: { pin: true, scrub: 1 }`,
    Demo: SectionWipeDemo,
  },
  {
    id: "curtain-cols",
    name: "Rideau de colonnes",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Cinq colonnes se relèvent depuis les bords pour dévoiler l'image.",
    code: `gsap.to(".col", {
  scaleY: 0,
  stagger: { each: 0.08, from: "edges" },
  ease: "power3.inOut",
  scrollTrigger: {
    trigger: ".scene", start: "top 90%", end: "top 35%", scrub: 1,
  },
});`,
    Demo: CurtainColsDemo,
  },
  {
    id: "zoom-through",
    name: "Traversée zoom",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Le cadre grandit en traversant l'écran pendant que le contenu dézoome.",
    code: `const tl = gsap.timeline({
  scrollTrigger: { trigger: ".scene", scrub: 1 },
});
tl.fromTo(".frame", { scale: 0.55, rotate: -4 },
  { scale: 1.05, rotate: 0, ease: "power2.inOut" })
  .fromTo(".inner", { scale: 1.6 }, { scale: 1 }, "<");`,
    Demo: ZoomThroughDemo,
  },
  {
    id: "crossfade",
    name: "Fondu enchaîné",
    plugin: "timeline",
    cat: "loop",
    blurb: "Diaporama en fondu avec compteur — transition douce entre visuels.",
    code: `const tl = gsap.timeline({ repeat: -1 });
slides.forEach((_, i) => {
  const next = (i + 1) % slides.length;
  tl.to({}, { duration: 1.4 })           // temps d'exposition
    .to(slides[i], { opacity: 0 })
    .to(slides[next], { opacity: 1 }, "<")
    .to(".count", { innerText: next + 1, snap: { innerText: 1 } }, "<");
});`,
    Demo: CrossfadeDemo,
  },
  {
    id: "pin-rotate",
    name: "Rotation épinglée",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Élément qui tourne 360° pendant le scroll — moulin, roue, astre.",
    code: `gsap.to(".windmill", {
  rotate: 360,
  ease: "none",
  scrollTrigger: {
    trigger: ".scene",
    start: "top bottom", end: "bottom top",
    scrub: 1,
  },
});`,
    Demo: PinRotateDemo,
  },
  {
    id: "blinds",
    name: "Stores photo",
    plugin: "ScrollTrigger",
    cat: "media",
    blurb: "Image révélée par des lamelles horizontales qui s'ouvrent depuis le centre.",
    code: `gsap.to(".blind", {
  scaleX: 0,
  stagger: { each: 0.07, from: "center" },
  ease: "power3.inOut",
  scrollTrigger: { trigger: ".figure", scrub: 1 },
});`,
    Demo: BlindsDemo,
  },
  {
    id: "ken-burns",
    name: "Ken Burns",
    plugin: "core",
    cat: "media",
    blurb: "Zoom + panoramique lent sur la photo — l'effet documentaire classique.",
    code: `gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "none" } })
  .fromTo(".img",
    { scale: 1.15, xPercent: -4, yPercent: -3 },
    { scale: 1.35, xPercent: 4, yPercent: 3, duration: 9 });`,
    Demo: KenBurnsDemo,
  },
  {
    id: "velocity-skew",
    name: "Skew vélocité",
    plugin: "ScrollTrigger + quickTo",
    cat: "media",
    blurb: "L'image s'incline avec la vitesse du scroll puis se redresse.",
    code: `const skewTo = gsap.quickTo(".img", "skewY", { duration: 0.5 });
const clamp = gsap.utils.clamp(-10, 10);
let cur = 0;

ScrollTrigger.create({
  onUpdate: (self) => { cur = clamp(self.getVelocity() / -400); },
});
gsap.ticker.add(() => { cur *= 0.9; skewTo(cur); });`,
    Demo: VelocitySkewDemo,
  },
  {
    id: "hover-distort",
    name: "Photo réactive",
    plugin: "core",
    cat: "media",
    blurb: "Survol : zoom interne, N&B → couleur, légende qui monte.",
    code: `el.addEventListener("mouseenter", () => {
  gsap.to(img, { scale: 1.15, filter: "grayscale(0%)",
                 duration: 0.7, ease: "power3.out" });
  gsap.to(cap, { y: 0, opacity: 1 });
});
// mouseleave : retour scale 1 + grayscale(85%)`,
    Demo: HoverDistortDemo,
  },
  {
    id: "before-after",
    name: "Avant / Après",
    plugin: "quickSetter",
    cat: "media",
    blurb: "Comparateur à rideau — le pointeur révèle la version 'après'.",
    code: `const setClip = gsap.quickSetter(".after", "clipPath");
const setLeft = gsap.quickSetter(".handle", "left", "%");

onPointerMove: const p = (x - rect.left) / rect.width * 100;
setClip(\`inset(0% \${100 - p}% 0% 0%)\`);
setLeft(p);`,
    Demo: BeforeAfterDemo,
  },
  {
    id: "image-trail",
    name: "Traînée d'images",
    plugin: "core",
    cat: "media",
    blurb: "Des vignettes naissent le long du curseur et s'envolent — signature awwwards.",
    code: `// throttle ~70ms : spawn une vignette au passage du curseur
gsap.fromTo(tile, { scale: 0, rotate: rand(-14, 14) },
  { scale: 1, duration: 0.4, ease: "back.out(2)" });
gsap.to(tile, { scale: 0, opacity: 0, y: -30, delay: 0.5,
  onComplete: () => tile.remove() });`,
    Demo: ImageTrailDemo,
  },

  /* ---------- navigation, curseur & divers ---------- */
  {
    id: "roll-link",
    name: "Lien roulant",
    plugin: "core",
    cat: "hover",
    blurb: "Le label roule verticalement au survol — le lien de nav signature awwwards.",
    code: `// deux copies empilées dans un conteneur overflow-hidden
gsap.to(".roll-inner", {
  yPercent: -100,
  duration: 0.45,
  ease: "power3.inOut",
});
// mouseleave : retour à yPercent 0`,
    textParam: { def: "ACCUEIL,TRAVAUX,STUDIO", csv: true },
    Demo: RollLinkDemo,
  },
  {
    id: "menu-overlay",
    name: "Menu overlay",
    plugin: "timeline",
    cat: "page",
    blurb: "Panneau plein écran qui descend, liens qui montent en cascade — cliquez.",
    code: `gsap.set(".overlay", { yPercent: -100 });
gsap.set(".link", { yPercent: 120 });

const tl = gsap.timeline({ paused: true })
  .to(".overlay", { yPercent: 0, ease: "power4.inOut" })
  .to(".link", { yPercent: 0, stagger: 0.06, ease: "power3.out" }, "-=0.15");

open ? tl.play() : tl.reverse();`,
    textParam: { def: "Manifeste,Projets,Journal,Contact", csv: true },
    Demo: MenuOverlayDemo,
  },
  {
    id: "mouse-parallax",
    name: "Parallaxe souris",
    plugin: "quickTo",
    cat: "hover",
    blurb: "Couches de profondeur qui suivent le curseur à des intensités différentes.",
    code: `const layers = gsap.utils.toArray(".layer");
const setters = layers.map((l, i) => ({
  x: gsap.quickTo(l, "x", { duration: 0.6 }),
  y: gsap.quickTo(l, "y", { duration: 0.6 }),
  depth: (i + 1) * 12,
}));
onPointerMove: setters.forEach(s => { s.x(nx * s.depth); s.y(ny * s.depth); });`,
    Demo: MouseParallaxDemo,
  },
  {
    id: "odometer",
    name: "Odomètre",
    plugin: "core",
    cat: "loop",
    blurb: "Compteur mécanique : chaque chiffre roule dans sa colonne.",
    code: `// colonne de chiffres 0-9 dans un overflow-hidden
// position = -index * 10% de la colonne
gsap.to(".col", {
  yPercent: -digit * 10,
  duration: 0.9,
  ease: "power3.inOut",
});`,
    Demo: OdometerDemo,
  },
  {
    id: "sticky-media",
    name: "Média collant",
    plugin: "core",
    cat: "scroll",
    blurb: "La liste défile, le visuel sticky change à chaque étape — scroll la colonne.",
    code: `onScroll: idx = floor(progress * rows.length);
imgs.forEach((img, i) =>
  gsap.to(img, { opacity: i === idx ? 1 : 0 })
);
// version page : ScrollTrigger.create par section
// + onToggle -> swap d'image`,
    Demo: StickyMediaDemo,
  },
  {
    id: "velocity-marquee",
    name: "Marquee vélocité",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Le défilement accélère avec la vitesse du scroll — timeScale piloté.",
    code: `const tween = gsap.to(".track", {
  xPercent: -50, repeat: -1, duration: 10, ease: "none",
});
ScrollTrigger.create({
  onUpdate: (self) => {
    boost = clamp(-8, 8, self.getVelocity() / -300);
  },
});
gsap.ticker.add(() => {
  boost *= 0.94;
  tween.timeScale(1 + Math.abs(boost));
});`,
    textParam: { def: "vitesse,✦,scroll,✦,inertie,✦", csv: true },
    Demo: VelocityMarqueeDemo,
  },
  {
    id: "circular-text",
    name: "Texte circulaire",
    plugin: "core",
    cat: "loop",
    blurb: "Texte sur tracé circulaire en rotation — badge, sceau, tampon.",
    code: `// <textPath> sur un cercle, puis :
gsap.to(".badge", {
  rotate: 360,
  duration: 14,
  repeat: -1,
  ease: "none",
});`,
    Demo: CircularTextDemo,
  },
  {
    id: "glitch",
    name: "Glitch",
    plugin: "clip-path",
    cat: "loop",
    blurb: "Copies découpées au clip-path qui sautent aléatoirement — effet signal.",
    code: `// 2 copies superposées au texte de base
for (let s = 0; s < 4; s++) {
  tl.set(copy, {
    clipPath: \`inset(\${rand(0,80)}% 0 \${rand(0,80)}% 0)\`,
    x: rand(-8, 8),
  }).to({}, { duration: 0.05 });
}
tl.set(copy, { clipPath: "inset(0 0 0 0)", x: 0 });`,
    textParam: { def: "Signal" },
    Demo: GlitchDemo,
  },
  {
    id: "repel-grid",
    name: "Grille répulsive",
    plugin: "quickTo",
    cat: "hover",
    blurb: "Les points fuient le curseur dans un rayon donné — champ de force.",
    code: `const setters = dots.map(d => ({
  x: gsap.quickTo(d, "x", { duration: 0.5 }),
  y: gsap.quickTo(d, "y", { duration: 0.5 }),
}));
onPointerMove: if (dist < R) {
  const f = (R - dist) / R * 26;
  s.x(dx / dist * f); s.y(dy / dist * f);
}`,
    Demo: RepelGridDemo,
  },
  {
    id: "progress-ring",
    name: "Anneau de progression",
    plugin: "DrawSVG + ScrollTrigger",
    cat: "scroll",
    blurb: "Cercle SVG qui se remplit au scroll avec compteur — chargement, skills.",
    code: `gsap.fromTo(".ring",
  { drawSVG: "0%" },
  { drawSVG: "100%", ease: "none",
    scrollTrigger: { trigger: ".wrap", scrub: 1 } });
gsap.fromTo(".val", { innerText: 0 },
  { innerText: 100, snap: { innerText: 1 },
    scrollTrigger: { trigger: ".wrap", scrub: 1 } });`,
    Demo: ProgressRingDemo,
  },
  {
    id: "card-flip",
    name: "Carte 3D flip",
    plugin: "core",
    cat: "click",
    blurb: "Rotation 180° recto/verso avec preserve-3d — cliquez la carte.",
    code: `// faces avec backface-visibility:hidden, verso pré-tourné
gsap.to(".card", {
  rotateY: flipped ? 180 : 0,
  duration: 0.8,
  ease: "power3.inOut",
});`,
    Demo: CardFlipDemo,
  },
  {
    id: "pill-nav",
    name: "Pilule nav",
    plugin: "quickTo",
    cat: "hover",
    blurb: "Indicateur glissant qui suit le lien survolé — nav pill classique.",
    code: `const xTo = gsap.quickTo(".pill", "x", { duration: 0.4 });
const wTo = gsap.quickTo(".pill", "width", { duration: 0.4 });

link.onmouseenter = () => {
  xTo(link.offsetLeft);
  wTo(link.offsetWidth);
};`,
    Demo: PillNavDemo,
  },
  {
    id: "corner-reveal",
    name: "Reveal diagonal",
    plugin: "clip-path + ScrollTrigger",
    cat: "scroll",
    blurb: "Le panneau se dévoile en diagonale depuis le coin — wipe polygonal.",
    code: `gsap.fromTo(".panel",
  { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%)" },
  { clipPath: "polygon(0% 0%, 200% 0%, 0% 200%)",
    ease: "none",
    scrollTrigger: { trigger: ".wrap", scrub: 1 } });`,
    Demo: CornerRevealDemo,
  },
  {
    id: "text-scatter",
    name: "Dispersion",
    plugin: "SplitText",
    cat: "click",
    blurb: "Les lettres explosent puis se reforment élastiquement — cliquez.",
    code: `const split = new SplitText(".title", { type: "chars" });
tl.to(split.chars, {
  x: () => rand(-90, 90), y: () => rand(-70, 70),
  rotation: () => rand(-120, 120), opacity: 0,
  stagger: { each: 0.015, from: "random" },
}).to(split.chars, {
  x: 0, y: 0, rotation: 0, opacity: 1,
  ease: "elastic.out(1,0.6)",
  stagger: { each: 0.02, from: "center" },
});`,
    textParam: { def: "Disperser" },
    Demo: TextScatterDemo,
  },
  {
    id: "elastic-line",
    name: "Ligne élastique",
    plugin: "Draggable",
    cat: "drag",
    blurb: "Tirez le point, la courbe se tend — relâchez, elle claque en élastique.",
    code: `const pos = { x: 0, y: 0 };
const render = () =>
  path.setAttribute("d",
    \`M 20 60 Q \${160 + pos.x} \${60 + pos.y} 300 60\`);

Draggable.create(".dot", {
  onDrag() { pos.x = this.x; pos.y = this.y; render(); },
  onDragEnd() {
    gsap.to(pos, { x: 0, y: 0,
      ease: "elastic.out(1,0.2)", onUpdate: render });
  },
});`,
    Demo: ElasticLineDemo,
  },
  {
    id: "spotlight",
    name: "Projecteur curseur",
    plugin: "quickTo + CSS mask",
    cat: "hover",
    blurb: "Un faisceau suit le curseur et révèle le calque lumineux sous le calque sombre.",
    code: `const xTo = gsap.quickTo(mask, "--sx", { duration: 0.45 });
const yTo = gsap.quickTo(mask, "--sy", { duration: 0.45 });
// CSS : calc(var(--sx) * 1px)

el.onmousemove = (e) => {
  xTo(e.clientX - rect.left);
  yTo(e.clientY - rect.top);
};

// mask-image: radial-gradient(
//   circle 62px at var(--sx) var(--sy), #000 30%, transparent 78%)`,
    Demo: SpotlightDemo,
  },
  {
    id: "split-flap",
    name: "Split-flap",
    plugin: "core",
    cat: "loop",
    blurb: "Tableau de gare : chaque cellule roule son alphabet avant de se caler sur la lettre.",
    code: `// chaque cellule = colonne de lettres défilantes
// qui s'arrête sur la lettre cible
cells.forEach((cell, i) => {
  col.innerHTML = shuffledLetters + word[i];
  gsap.fromTo(col, { y: 0 }, {
    y: -7 * cellHeight,
    duration: 0.85,
    delay: i * 0.07,
    ease: "power3.inOut",
  });
});`,
    Demo: SplitFlapDemo,
  },
  {
    id: "drag-slider",
    name: "Slider inertie",
    plugin: "Draggable + Inertia",
    cat: "drag",
    blurb: "Carrousel horizontal à lancer — momentum, rebond aux bords et snap sur chaque slide.",
    code: `Draggable.create(".track", {
  type: "x",
  inertia: true,
  bounds: { minX, maxX: 0 },
  edgeResistance: 0.85,
  snap: { x: [0, -step, -2 * step /* ... */] },
});`,
    Demo: DragSliderDemo,
  },
  {
    id: "flip-list",
    name: "Liste FLIP",
    plugin: "Flip",
    cat: "click",
    blurb: "Ajoutez/retirez des items — la liste se réordonne en douceur, entrants en back.out.",
    code: `// avant la mutation React :
state = Flip.getState(".item");
setItems(next);

// dans useGSAP (deps: items) :
Flip.from(state, {
  duration: 0.5, absolute: true,
  onEnter: (els) => gsap.fromTo(els,
    { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1 }),
  onLeave: (els) => gsap.to(els, { opacity: 0 }),
});`,
    Demo: FlipListDemo,
  },
  {
    id: "text-wave",
    name: "Texte sur courbe",
    plugin: "attr + textPath",
    cat: "loop",
    blurb: "Le texte épouse une courbe SVG qui ondule — titres organiques, rubans animés.",
    code: `// le path et le textPath partagent la même structure
gsap.to(".path", {
  attr: { d: "M 10 70 Q 85 15 160 70 T 310 70" },
  duration: 2.2, repeat: -1, yoyo: true,
  ease: "sine.inOut",
});
// <textPath href="#path">LE SENS DU MOUVEMENT</textPath>`,
    Demo: TextWaveDemo,
  },
  {
    id: "scroll-zoom",
    name: "Zoom plein cadre",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "La miniature grandit jusqu'à occuper tout l'écran — transition image galerie → immersif.",
    code: `gsap.fromTo(".img",
  { scale: 0.3, borderRadius: "24px" },
  { scale: 1, borderRadius: "0px",
    ease: "none",
    scrollTrigger: {
      trigger: ".wrap",
      start: "top 95%", end: "top 40%",
      scrub: 1,
    } });`,
    Demo: ScrollZoomDemo,
  },
  {
    id: "snap-scroll",
    name: "Scroll aimanté",
    plugin: "ScrollTrigger snap",
    cat: "scroll",
    blurb: "Le scroller se cale tout seul sur la section la plus proche — pages chapitrées.",
    code: `ScrollTrigger.create({
  scroller: innerScroller, // ou la page entière
  start: 0, end: "max",
  snap: {
    snapTo: 1 / (sections - 1),
    duration: { min: 0.15, max: 0.5 },
    ease: "power2.out",
  },
});`,
    Demo: SnapScrollDemo,
  },
  {
    id: "cube-3d",
    name: "Cube 3D",
    plugin: "core + preserve-3d",
    cat: "click",
    blurb: "Cube de services qui pivote face par face — alternative spectaculaire aux tabs.",
    code: `// faces : rotateY(i*90deg) translateZ(w/2)
// conteneur : transform-style: preserve-3d

gsap.to(".cube", {
  rotateY: "-=90",
  duration: 0.9,
  ease: "power3.inOut",
});`,
    Demo: CubeDemo,
  },
  {
    id: "gooey",
    name: "Gouttes gooey",
    plugin: "Draggable + SVG filter",
    cat: "drag",
    blurb: "Des blobs fusionnent comme du liquide — feGaussianBlur + feColorMatrix, l'un est draggable.",
    code: `<filter id="goo">
  <feGaussianBlur stdDeviation="9" />
  <feColorMatrix values="1 0 0 0 0 0 1 0 0 0
    0 0 1 0 0 0 0 0 19 -9" />
</filter>

Draggable.create(".blob", { type: "x,y", bounds: wrap });
// les blobs sous ce filtre fusionnent visuellement`,
    Demo: GooeyDemo,
  },
  {
    id: "accordion",
    name: "Accordéon FAQ",
    plugin: "core",
    cat: "ui",
    blurb: "Questions/réponses qui se déplient en hauteur mesurée — indispensable page services ou FAQ.",
    code: `bodies.forEach((b, i) => {
  gsap.to(b, {
    height: i === open ? b.scrollHeight : 0,
    opacity: i === open ? 1 : 0,
    duration: 0.45, ease: "power2.inOut",
  });
});`,
    Demo: AccordionDemo,
  },
  {
    id: "nav-shrink",
    name: "Header condensé",
    plugin: "ScrollTrigger",
    cat: "ui",
    blurb: "La barre de nav se condense et s'opacifie au scroll — scroll la liste pour voir.",
    code: `gsap.to(".nav", {
  paddingTop: 5, paddingBottom: 5,
  backgroundColor: "rgba(11,11,11,0.92)",
  ease: "none",
  scrollTrigger: { scroller, start: 10, end: 90, scrub: true },
});`,
    Demo: NavShrinkDemo,
  },
  {
    id: "toasts",
    name: "Notifications",
    plugin: "core",
    cat: "ui",
    blurb: "Pile de toasts qui glissent en back.out puis se retirent — feedback après action.",
    code: `// entrée
gsap.from(toast, { x: 140, opacity: 0,
  duration: 0.5, ease: "back.out(1.7)" });

// sortie auto après délai
gsap.to(toast, { x: 140, opacity: 0,
  ease: "power2.in",
  onComplete: () => removeToast(id) });`,
    Demo: ToastDemo,
  },
  {
    id: "dialog",
    name: "Dialog",
    plugin: "timeline",
    cat: "ui",
    blurb: "Modale de confirmation : backdrop fade + panneau en back.out. Cliquez pour ouvrir.",
    code: `const tl = gsap.timeline({ paused: true })
  .fromTo(".bg", { opacity: 0 }, { opacity: 1 })
  .fromTo(".panel", { scale: 0.85, autoAlpha: 0 },
    { scale: 1, autoAlpha: 1, ease: "back.out(1.7)" });

open ? tl.play() : tl.reverse();`,
    Demo: DialogDemo,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    plugin: "core",
    cat: "ui",
    blurb: "Infobulle qui bondit en back.out au survol — micro-interaction de base partout.",
    code: `el.onmouseenter = () =>
  gsap.to(".tip", { autoAlpha: 1, y: 0, scale: 1,
    duration: 0.35, ease: "back.out(2)" });

el.onmouseleave = () =>
  gsap.to(".tip", { autoAlpha: 0, y: 8, duration: 0.25 });`,
    Demo: TooltipDemo,
  },
  {
    id: "stepper",
    name: "Stepper",
    plugin: "core",
    cat: "ui",
    blurb: "Barre de progression par étapes — checkout, onboarding, formulaires multi-étapes.",
    code: `gsap.to(".bar", {
  scaleX: step / (steps - 1),
  transformOrigin: "left",
  duration: 0.6, ease: "power3.inOut",
});
// dots : scale + couleur selon étape atteinte`,
    Demo: StepperDemo,
  },
  {
    id: "timeline",
    name: "Frise chronologique",
    plugin: "ScrollTrigger",
    cat: "ui",
    blurb: "Ligne verticale qui se dessine + événements qui glissent — page histoire/about.",
    code: `tl.fromTo(".line", { scaleY: 0 },
    { scaleY: 1, ease: "none" })
  .fromTo(".item", { opacity: 0, x: -16 },
    { opacity: 1, x: 0, stagger: 0.25 });
// scrubbé au scroll ou autoplay`,
    Demo: TimelineDemo,
  },
  {
    id: "testimonials",
    name: "Témoignages",
    plugin: "core",
    cat: "ui",
    blurb: "Citations qui défilent en fondu avec indicateurs — section social proof classique.",
    code: `// au changement d'index (deps React) :
gsap.fromTo(".quote",
  { opacity: 0, y: 14 },
  { opacity: 1, y: 0, duration: 0.6,
    ease: "power3.out" });`,
    Demo: TestimonialsDemo,
  },
  {
    id: "pricing",
    name: "Grille tarifaire",
    plugin: "core",
    cat: "ui",
    blurb: "Les cartes de prix s'élèvent au survol et les voisines s'estompent — focus visuel.",
    code: `card.onmouseenter = () => {
  gsap.to(card, { y: -8, scale: 1.05 });
  gsap.to(siblings, { opacity: 0.35 });
};`,
    Demo: PricingDemo,
  },
  {
    id: "cta-fill",
    name: "CTA remplissage",
    plugin: "core",
    cat: "ui",
    blurb: "Un cercle naît sous le curseur et remplit le bouton — le CTA signature des studios.",
    code: `btn.onmouseenter = (e) => {
  const r = btn.getBoundingClientRect();
  gsap.set(dot, { x: e.clientX - r.left,
                 y: e.clientY - r.top, scale: 0 });
  gsap.to(dot, { scale: 14, duration: 0.55,
                 ease: "power3.out" });
};`,
    Demo: CtaFillDemo,
  },
  {
    id: "input-float",
    name: "Label flottant",
    plugin: "core",
    cat: "ui",
    blurb: "Label qui flotte au focus + souligné qui grandit — formulaires premium.",
    code: `input.onfocus = () => {
  gsap.to(label, { y: -14, scale: 0.75,
    color: accent, duration: 0.3 });
  gsap.to(line, { scaleX: 1, duration: 0.4 });
};
// blur : on ne redescend que si le champ est vide`,
    Demo: InputFloatDemo,
  },
  {
    id: "lightbox",
    name: "Lightbox FLIP",
    plugin: "Flip.fit",
    cat: "ui",
    blurb: "La miniature grandit en overlay — l'équivalent GSAP du layoutId de Framer Motion.",
    code: `// overlay déjà positionné au centre en CSS
const vars = Flip.fit(overlay, thumb, { getVars: true });
gsap.set(overlay, vars);           // match la miniature
gsap.to(overlay, { x: 0, y: 0,
  scaleX: 1, scaleY: 1,
  duration: 0.55, ease: "power3.inOut" });`,
    Demo: LightboxDemo,
  },
  {
    id: "card-fan",
    name: "Éventail de cartes",
    plugin: "core",
    cat: "ui",
    blurb: "Un paquet qui s'éventaille au survol — previews de projets, deck de services.",
    code: `host.onmouseenter = () =>
  gsap.to(".card", {
    rotate: (i) => (i - 1.5) * 14,
    x: (i) => (i - 1.5) * 46,
    y: -12, transformOrigin: "50% 120%",
    ease: "back.out(1.5)", stagger: 0.03,
  });`,
    Demo: CardFanDemo,
  },
  {
    id: "skeleton",
    name: "Skeleton shimmer",
    plugin: "core",
    cat: "ui",
    blurb: "Reflet qui balaie les blocs de chargement — état de chargement perçu comme rapide.",
    code: `gsap.fromTo(".shine",
  { xPercent: -120 },
  { xPercent: 320,
    duration: 1.4, repeat: -1,
    ease: "power1.inOut", repeatDelay: 0.4 });`,
    Demo: SkeletonDemo,
  },
  {
    id: "coverflow",
    name: "Coverflow 3D",
    plugin: "Draggable + Inertia",
    cat: "drag",
    blurb: "Carrousel en perspective : drag inertie + snap, chaque cover pivote selon sa distance au centre.",
    code: `Draggable.create(track, {
  type: "x", inertia: true,
  snap: { x: snapPositions },
  onDrag: apply, onThrowUpdate: apply,
});

// par carte : distance au centre →
gsap.set(card, {
  rotateY: clamp(-50, 50, -d * 38),
  z: -Math.abs(d) * 90,
});`,
    Demo: CoverFlowDemo,
  },
  {
    id: "scroll-spy",
    name: "Scroll spy",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "La nav latérale s'allume selon la section visible — pages longues, docs, menus ancrés.",
    code: `sections.forEach((sec, i) => {
  ScrollTrigger.create({
    trigger: sec,
    scroller, // ou la page
    start: "top 55%", end: "bottom 55%",
    onToggle: (self) => self.isActive && setActive(i),
  });
});`,
    Demo: ScrollSpyDemo,
  },
  {
    id: "drawer",
    name: "Tiroir bottom-sheet",
    plugin: "Draggable",
    cat: "drag",
    blurb: "Panneau qui se tire du bas avec snap ouvert/fermé — menus mobiles, fiches produit.",
    code: `gsap.set(panel, { y: 92 }); // fermé

Draggable.create(panel, {
  type: "y", bounds: { minY: 0, maxY: 92 },
  onDragEnd() {
    gsap.to(this.target, {
      y: this.y < 46 ? 0 : 92, // snap le plus proche
      duration: 0.5, ease: "power3.out",
    });
  },
});`,
    Demo: DrawerDemo,
  },
  {
    id: "pull-refresh",
    name: "Pull-to-refresh",
    plugin: "Draggable",
    cat: "drag",
    blurb: "Tirez vers le bas, la flèche tourne — relâchez, retour élastique + action. Pattern mobile.",
    code: `Draggable.create(strip, {
  type: "y", bounds: { minY: 0, maxY: 80 },
  onDrag() {
    gsap.set(arrow, { rotate: this.y * 3 });
  },
  onDragEnd() {
    gsap.to(strip, { y: 0, ease: "elastic.out(1,0.4)" });
    if (this.y > 60) refresh();
  },
});`,
    Demo: PullRefreshDemo,
  },
  {
    id: "radial-menu",
    name: "Menu radial",
    plugin: "timeline",
    cat: "click",
    blurb: "Bouton + qui déploie des actions en arc de cercle — menu flottant, FAB spectaculaire.",
    code: `items.forEach((it, i) => {
  const a = (-90 + i * 45) * Math.PI / 180;
  tl.fromTo(it, { scale: 0, x: 0, y: 0 }, {
    x: Math.cos(a) * 62, y: Math.sin(a) * 62,
    scale: 1, ease: "back.out(2)",
  }, i * 0.04);
});
open ? tl.play() : tl.reverse();`,
    Demo: RadialMenuDemo,
  },
  {
    id: "hover-scramble",
    name: "Scramble au survol",
    plugin: "ScrambleText",
    cat: "hover",
    blurb: "Le lien se décode en glyphes au survol — nav cyber-sécurité, portfolio tech.",
    code: `link.onmouseenter = () =>
  gsap.to(link, {
    duration: 0.6,
    scrambleText: { text: label, chars: "01<>/" },
  });`,
    Demo: HoverScrambleDemo,
  },
  {
    id: "magnetic-chars",
    name: "Lettres magnétiques",
    plugin: "SplitText + quickTo",
    cat: "hover",
    blurb: "Chaque lettre gravite vers le curseur selon sa distance — titre qui vit sous la main.",
    code: `const split = new SplitText("h1", { type: "chars" });
const movers = split.chars.map(c => ({
  x: gsap.quickTo(c, "x", { duration: 0.4 }),
  y: gsap.quickTo(c, "y", { duration: 0.4 }),
}));

onmousemove = (e) => movers.forEach(({x, y, el}) => {
  const d = distTo(e, center(el));
  const f = Math.max(0, 1 - d / 140);
  x(dx * f * 0.3); y(dy * f * 0.3);
});`,
    Demo: MagneticCharsDemo,
  },
  {
    id: "velocity-text",
    name: "Texte élastique",
    plugin: "ScrollTrigger + quickTo",
    cat: "scroll",
    blurb: "Le titre s'étire et s'incline avec la vitesse du scroll puis se stabilise.",
    code: `ScrollTrigger.create({
  onUpdate: (self) => {
    const v = clamp(-12, 12, self.getVelocity() / 400);
    scaleYTo(1 + Math.abs(v) / 14);
    skewYTo(v / 2);
  },
});
// + decay via gsap.ticker`,
    Demo: VelocityTextDemo,
  },
  {
    id: "pinned-swap",
    name: "Swap épinglé",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Le mot-clé change à chaque tiers du scroll — storytelling par objectifs, étapes.",
    code: `ScrollTrigger.create({
  scroller, start: 0, end: "max",
  onUpdate: (self) =>
    setIdx(Math.floor(self.progress * steps)),
});
// puis à chaque idx : gsap.fromTo(mot, {yPercent:60}, …)`,
    Demo: PinnedSwapDemo,
  },
  {
    id: "blur-reveal",
    name: "Révélation floue",
    plugin: "SplitText",
    cat: "scroll",
    blurb: "Chaque caractère passe du flou au net en cascade — titres cinématographiques.",
    code: `const split = new SplitText("h2", { type: "chars" });
gsap.from(split.chars, {
  opacity: 0, filter: "blur(10px)", y: 20,
  stagger: 0.04, ease: "power2.out",
  scrollTrigger: { trigger: "h2", start: "top 85%" },
});`,
    Demo: BlurRevealDemo,
  },
  {
    id: "cursor-label",
    name: "Badge curseur",
    plugin: "quickTo",
    cat: "hover",
    blurb: "Un badge « VOIR » suit le curseur sur le visuel — le hover de galerie awwwards.",
    code: `const xTo = gsap.quickTo(badge, "x", { duration: 0.35 });
const yTo = gsap.quickTo(badge, "y", { duration: 0.35 });

img.onmousemove = (e) => { xTo(e.offsetX); yTo(e.offsetY); };
img.onmouseenter = () =>
  gsap.to(badge, { autoAlpha: 1, scale: 1, ease: "back.out(2)" });`,
    Demo: CursorLabelDemo,
  },
  {
    id: "grid-glow",
    name: "Grille lumineuse",
    plugin: "core",
    cat: "hover",
    blurb: "Les cellules s'illuminent dans le rayon du curseur — fond interactif, hero tech.",
    code: `onmousemove = (e) => cells.forEach((c) => {
  const d = dist(e, center(c));
  const f = Math.max(0, 1 - d / 130);
  gsap.set(c, {
    backgroundColor: \`rgba(10,228,72,\${f * 0.35})\`,
    scale: 1 + f * 0.15,
  });
});`,
    Demo: GridGlowDemo,
  },
  {
    id: "scroll-counter",
    name: "Compteur au scroll",
    plugin: "ScrollTrigger",
    cat: "scroll",
    blurb: "Les stats se déclenchent à l'entrée du viewport, une seule fois — section chiffres.",
    code: `ScrollTrigger.create({
  trigger: ".stats", start: "top 85%", once: true,
  onEnter: () =>
    gsap.to(counter, {
      v: target, snap: { v: 1 }, duration: 1.6,
      onUpdate: () => el.textContent = Math.round(counter.v),
    }),
});`,
    Demo: ScrollCounterDemo,
  },
  {
    id: "nav-hide",
    name: "Nav intelligente",
    plugin: "ScrollTrigger",
    cat: "ui",
    blurb: "Le header disparaît au scroll descendant, remonte au scroll ascendant — lisibilité maximale.",
    code: `const yTo = gsap.quickTo(nav, "yPercent", { duration: 0.4 });

ScrollTrigger.create({
  onUpdate: (self) => {
    if (self.direction === -1 || self.scroll() < 30) yTo(0);
    else if (self.direction === 1) yTo(-110);
  },
});`,
    Demo: NavHideDemo,
  },
  {
    id: "highlight",
    name: "Surlignage marqueur",
    plugin: "ScrollTrigger",
    cat: "edito",
    blurb: "Un surligneur balaie les mots clés au scroll — emphase éditoriale façon magazine.",
    code: `gsap.to(".hl", {
  scaleX: 1, transformOrigin: "left",
  stagger: 0.3, ease: "power3.inOut",
  scrollTrigger: { trigger: ".texte", scrub: 1 },
});`,
    Demo: HighlightDemo,
  },
  {
    id: "toggle",
    name: "Interrupteur",
    plugin: "core",
    cat: "click",
    blurb: "Switch animé : le curseur rebondit en back.out, la piste change de couleur.",
    code: `gsap.to(".knob", { x: on ? 26 : 0,
  duration: 0.45, ease: "back.out(2.5)" });
gsap.to(".track", {
  backgroundColor: on ? accent : "rgba(255,255,255,0.12)",
});`,
    Demo: ToggleDemo,
  },
  {
    id: "check-draw",
    name: "Coche dessinée",
    plugin: "DrawSVG",
    cat: "click",
    blurb: "La coche se trace à l'intérieur de la case — formulaires, listes, validation.",
    code: `gsap.to(".check-path", {
  drawSVG: checked ? "0% 100%" : "100% 100%",
  duration: 0.45, ease: "power2.inOut",
});`,
    Demo: CheckDrawDemo,
  },
  {
    id: "segmented",
    name: "Contrôle segmenté",
    plugin: "quickTo",
    cat: "click",
    blurb: "Pilule qui glisse sous l'option active — tabs iOS, périodes, vues.",
    code: `const xTo = gsap.quickTo(pill, "x", { duration: 0.35 });
const wTo = gsap.quickTo(pill, "width", { duration: 0.35 });

onClick = (i) => {
  xTo(btn[i].offsetLeft);
  wTo(btn[i].offsetWidth);
};`,
    Demo: SegmentedDemo,
  },
  {
    id: "like-burst",
    name: "Like + burst",
    plugin: "core",
    cat: "click",
    blurb: "Le cœur rebondit en élastique et des particules rayonnent — micro-interaction sociale.",
    code: `gsap.fromTo(heart, { scale: 0.7 },
  { scale: 1, ease: "elastic.out(1,0.4)" });

particles.forEach((p) => {
  const a = Math.random() * Math.PI * 2;
  gsap.fromTo(p, { x: 0, y: 0, opacity: 1 },
    { x: cos(a) * d, y: sin(a) * d, opacity: 0 });
});`,
    Demo: LikeBurstDemo,
  },
  {
    id: "stars",
    name: "Notation étoiles",
    plugin: "core",
    cat: "click",
    blurb: "Les étoiles se remplissent en cascade au survol/clic — notation de produit, avis.",
    code: `stars.forEach((s, i) => {
  gsap.to(s, {
    scale: i < rating ? 1.15 : 1,
    color: i < rating ? accent : dim,
    delay: i * 0.04, ease: "back.out(3)",
  });
});`,
    Demo: StarsDemo,
  },
  {
    id: "ping",
    name: "Ping notification",
    plugin: "core",
    cat: "loop",
    blurb: "Anneaux qui s'étendent depuis le badge — notification vivante, compteur d'alertes.",
    code: `gsap.fromTo(".ring", { scale: 0.6, opacity: 0.8 }, {
  scale: 2.4, opacity: 0,
  duration: 1.4, repeat: -1,
  stagger: 0.5, ease: "power1.out",
});`,
    Demo: PingDemo,
  },
  {
    id: "equalizer",
    name: "Égaliseur",
    plugin: "core",
    cat: "loop",
    blurb: "Barres qui dansent avec repeatRefresh — valeurs re-randomisées à chaque cycle.",
    code: `bars.forEach((bar) => {
  gsap.to(bar, {
    scaleY: () => gsap.utils.random(0.15, 1),
    duration: () => gsap.utils.random(0.25, 0.5),
    repeat: -1, repeatRefresh: true, yoyo: true,
    transformOrigin: "bottom",
  });
});`,
    Demo: EqualizerDemo,
  },
  {
    id: "inner-parallax",
    name: "Parallaxe interne",
    plugin: "ScrollTrigger",
    cat: "media",
    blurb: "L'image plus grande que son cadre glisse à l'intérieur au scroll — profondeur subtile.",
    code: `gsap.fromTo(".img", { yPercent: -12 }, {
  yPercent: 12, ease: "none",
  scrollTrigger: {
    trigger: ".frame",
    start: "top bottom", end: "bottom top",
    scrub: true,
  },
});`,
    Demo: InnerParallaxDemo,
  },
  {
    id: "border-glow",
    name: "Bordure glow",
    plugin: "quickTo + CSS",
    cat: "hover",
    blurb: "Le cadre s'illumine localement sous le curseur — cards bento premium.",
    code: `// p-px + radial-gradient en fond de border
const xTo = gsap.quickTo(card, "--gx", { duration: 0.3 });
const yTo = gsap.quickTo(card, "--gy", { duration: 0.3 });
// CSS : calc(var(--gx) * 1px)

card.onmousemove = (e) => {
  xTo(e.clientX - r.left); yTo(e.clientY - r.top);
};`,
    Demo: BorderGlowDemo,
  },
  {
    id: "chat",
    name: "Bulles de chat",
    plugin: "timeline",
    cat: "loop",
    blurb: "Messages qui bondissent depuis leur coin — widget conversationnel, hero produit.",
    code: `tl.fromTo(".msg", { y: 16, opacity: 0, scale: 0.9 }, {
  y: 0, opacity: 1, scale: 1,
  stagger: 0.9, ease: "back.out(1.7)",
  transformOrigin: (i) => i % 2
    ? "bottom right" : "bottom left",
});`,
    Demo: ChatDemo,
  },
  {
    id: "cmd-palette",
    name: "Palette ⌘K",
    plugin: "fromTo + focus",
    cat: "ui",
    blurb: "Commande rapide qui surgit avec back.out — overlay, recherche filtrée en direct.",
    code: `gsap.fromTo(".palette",
  { y: -14, opacity: 0, scale: 0.96 },
  { y: 0, opacity: 1, scale: 1,
    duration: 0.3, ease: "back.out(1.8)" });`,
    Demo: CmdPaletteDemo,
  },
  {
    id: "tabs-slide",
    name: "Tabs glissantes",
    plugin: "quickTo",
    cat: "ui",
    blurb: "Soulignement qui glisse et se redimensionne vers l'onglet actif — navigation de panneau.",
    code: `const xTo = gsap.quickTo(".underline", "x", {
  duration: 0.4, ease: "power3.out" });
const wTo = gsap.quickTo(".underline", "width", {
  duration: 0.4, ease: "power3.out" });

tab.onclick = () => {
  xTo(tab.offsetLeft);
  wTo(tab.offsetWidth);
};`,
    Demo: TabsDemo,
  },
  {
    id: "range-fill",
    name: "Slider remplissage",
    plugin: "gsap.set",
    cat: "ui",
    blurb: "Piste qui se remplit en scaleX + bulle de valeur qui suit le pouce.",
    code: `input.oninput = () => {
  const v = input.value;
  gsap.set(".fill", { scaleX: v / 100 });
  gsap.set(".bubble", { left: v + "%" });
};`,
    Demo: RangeFillDemo,
  },
  {
    id: "otp-input",
    name: "Champ OTP",
    plugin: "stagger + back",
    cat: "ui",
    blurb: "4 cases auto-focus, backspace intelligent, pop de confirmation quand le code est complet.",
    code: `input.onchange = () => {
  const next = value.slice(0, i) + char;
  if (char && i < 3) inputs[i + 1].focus();
};
// code complet → pop
gsap.fromTo(".otp", { scale: 1.2 },
  { scale: 1, stagger: 0.05, ease: "back.out(2)" });`,
    Demo: OtpDemo,
  },
  {
    id: "chip-input",
    name: "Chips + Flip",
    plugin: "Flip",
    cat: "ui",
    blurb: "Tags qui se réorganisent en douceur à l'ajout/suppression — saisie multi-valeurs.",
    code: `const state = Flip.getState(".chip");
// → muter le DOM
Flip.from(state, {
  duration: 0.4, ease: "power2.out" });`,
    Demo: ChipInputDemo,
  },
  {
    id: "copy-confirm",
    name: "Bouton copier",
    plugin: "fromTo + clipboard",
    cat: "ui",
    blurb: "Feedback instantané « ✓ copié » avec pop élastique — pattern docs/CLI.",
    code: `btn.onclick = () => {
  navigator.clipboard.writeText(cmd);
  gsap.fromTo(".btn", { scale: 0.92 },
    { scale: 1, ease: "back.out(3)" });
};`,
    Demo: CopyBtnDemo,
  },
  {
    id: "load-bar",
    name: "Barre de chargement",
    plugin: "object tween",
    cat: "ui",
    blurb: "Progression pilotée par un objet { v } tweené — scaleX + % synchronisés.",
    code: `const o = { v: 0 };
gsap.to(o, { v: 100, duration: 1.8,
  ease: "power2.inOut",
  onUpdate: () => {
    gsap.set(".bar", { scaleX: o.v / 100 });
    pct.textContent = Math.round(o.v) + "%";
  }});`,
    Demo: LoadBarDemo,
  },
  {
    id: "avatar-fan",
    name: "Avatars éventail",
    plugin: "function-based x",
    cat: "ui",
    blurb: "Pile d'avatars qui s'écarte au survol — position calculée par index.",
    code: `el.onmouseenter = () =>
  gsap.to(".av", {
    x: (i) => i * 34 - 68,
    ease: "back.out(2)" });
el.onmouseleave = () =>
  gsap.to(".av", { x: (i) => i * -12 });`,
    Demo: AvatarFanDemo,
  },
  {
    id: "badge-bump",
    name: "Badge notif",
    plugin: "elastic scale",
    cat: "ui",
    blurb: "Le compteur bondit en elastic à chaque incrément — micro-feedback panier/messages.",
    code: `gsap.fromTo(".badge", { scale: 1.6 },
  { scale: 1, duration: 0.45,
    ease: "elastic.out(1,0.4)" });`,
    Demo: BadgeBumpDemo,
  },
  {
    id: "dropdown-anim",
    name: "Menu dropdown",
    plugin: "stagger y",
    cat: "ui",
    blurb: "Panneau qui descend + items en cascade — navigation contextuelle.",
    code: `gsap.fromTo(".menu", { y: -8, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.25 });
gsap.fromTo(".item", { y: -6, opacity: 0 },
  { y: 0, opacity: 1, stagger: 0.04 });`,
    Demo: DropdownDemo,
  },
  {
    id: "mini-carousel",
    name: "Carrousel x%",
    plugin: "xPercent",
    cat: "ui",
    blurb: "Piste translate -100% par slide + compteur qui se met à jour.",
    code: `gsap.to(".track", {
  xPercent: -100 * index,
  duration: 0.55, ease: "power3.inOut" });`,
    Demo: MiniCarouselDemo,
  },
  {
    id: "qty-stepper",
    name: "Stepper quantité",
    plugin: "keyed re-render",
    cat: "ui",
    blurb: "Chiffre qui défile verticalement à chaque +/− — panier, formulaires.",
    code: `// key={q} → remount du chiffre, puis :
gsap.fromTo(".qty",
  { yPercent: -80, opacity: 0 },
  { yPercent: 0, opacity: 1,
    duration: 0.35, ease: "power3.out" });`,
    Demo: QtyStepperDemo,
  },
  {
    id: "submit-state",
    name: "Bouton 3 états",
    plugin: "rotation + scale",
    cat: "ui",
    blurb: "idle → spinner → succès ✓ — le bouton formulaire complet.",
    code: `gsap.to(".spin", { rotation: 360,
  repeat: -1, ease: "none", duration: 0.8 });
// succès :
gsap.fromTo(".ok", { scale: 0 },
  { scale: 1, ease: "back.out(3)" });`,
    Demo: SubmitStateDemo,
  },
  {
    id: "banner-slide",
    name: "Bannière promo",
    plugin: "yPercent",
    cat: "ui",
    blurb: "Bandeau qui descend en power4 + sortie animée — header marketing.",
    code: `gsap.fromTo(".banner", { yPercent: -110 },
  { yPercent: 0, duration: 0.6, ease: "power4.out" });
// fermeture :
gsap.to(".banner", { yPercent: -120,
  ease: "power3.in" });`,
    Demo: BannerDemo,
  },
  {
    id: "play-morph",
    name: "Play ↔ stop",
    plugin: "MorphSVG",
    cat: "ui",
    blurb: "Triangle lecture qui se métamorphose en carré stop — lecteur média minimal.",
    code: `gsap.to(".icon", {
  morphSVG: playing ? TRIANGLE : SQUARE,
  duration: 0.45, ease: "power2.inOut" });`,
    Demo: PlayMorphDemo,
  },
  {
    id: "pwd-eye",
    name: "Œil mot de passe",
    plugin: "DrawSVG",
    cat: "ui",
    blurb: "La barre « masqué » se trace sur la pupille — toggle show/hide élégant.",
    code: `gsap.to(".slash", {
  drawSVG: visible ? "100% 0%" : "0% 100%",
  duration: 0.3 });`,
    Demo: PwdEyeDemo,
  },
  {
    id: "form-shake",
    name: "Erreur shake",
    plugin: "elastic x",
    cat: "ui",
    blurb: "Le formulaire tremble latéralement en elastic + bordure rouge qui s'estompe.",
    code: `gsap.fromTo(".form", { x: -8 },
  { x: 0, duration: 0.5,
    ease: "elastic.out(1,0.25)" });
gsap.to("input", { borderColor: RED });`,
    Demo: FormShakeDemo,
  },
  {
    id: "border-trace",
    name: "Contour tracé",
    plugin: "DrawSVG",
    cat: "hover",
    blurb: "Le cadre du bouton se dessine au survol, s'efface au départ — CTA signature.",
    code: `btn.onmouseenter = () =>
  gsap.to("rect", { drawSVG: "100%",
    duration: 0.6, ease: "power2.inOut" });
btn.onmouseleave = () =>
  gsap.to("rect", { drawSVG: "0%" });`,
    Demo: BorderTraceDemo,
  },
  {
    id: "char-flip",
    name: "Flip caractères",
    plugin: "rotationX",
    cat: "hover",
    blurb: "Chaque lettre bascule 360° en cascade — wordmark de nav spectaculaire.",
    code: `el.onmouseenter = () =>
  gsap.fromTo(".char", { rotationX: 0 },
    { rotationX: 360, stagger: 0.04,
      transformPerspective: 400,
      ease: "power2.inOut" });`,
    Demo: CharFlipDemo,
  },
  {
    id: "hover-clip",
    name: "Voile clip-path",
    plugin: "clipPath inset",
    cat: "hover",
    blurb: "Un second état balaie la carte en inset() — hover de card bicolore.",
    code: `el.onmouseenter = () =>
  gsap.to(".top", {
    clipPath: "inset(0 0% 0 0)",
    ease: "power3.out" });
// départ : inset(0 100% 0 0) en power3.in`,
    Demo: HoverClipDemo,
  },
  {
    id: "arrow-slide",
    name: "Flèche glissante",
    plugin: "x + ghost",
    cat: "hover",
    blurb: "Lien « découvrir » — la flèche glisse pendant qu'un fantôme entre par la gauche.",
    code: `el.onmouseenter = () => {
  gsap.to(".arrow", { x: 10 });
  gsap.to(".ghost", { x: 10, opacity: 1 });
};`,
    Demo: ArrowSlideDemo,
  },
  {
    id: "underline-grow",
    name: "Souligné centré",
    plugin: "scaleX",
    cat: "hover",
    blurb: "Filet qui pousse depuis le centre sous chaque lien de nav.",
    code: `// transform-origin: center; scaleX: 0
link.onmouseenter = () =>
  gsap.to(bar, { scaleX: 1,
    duration: 0.35, ease: "power3.out" });`,
    Demo: UnderlineGrowDemo,
  },
  {
    id: "tilt-glare",
    name: "Tilt + halo",
    plugin: "perspective + gradient",
    cat: "hover",
    blurb: "Carte 3D + reflet radial qui suit le curseur — card produit premium.",
    code: `card.onmousemove = (e) => {
  gsap.to(card, { rotateY: nx * 10,
    rotateX: -ny * 10, duration: 0.4 });
  gsap.to(".glare", { xPercent: nx * 60,
    yPercent: ny * 60, opacity: 0.7 });
};`,
    Demo: TiltGlareDemo,
  },
  {
    id: "dock-magnify",
    name: "Dock macOS",
    plugin: "distance scale",
    cat: "hover",
    blurb: "Les icônes grossissent selon leur distance au curseur — dock signature.",
    code: `dock.onmousemove = (e) =>
  icons.forEach((ic) => {
    const d = Math.abs(e.clientX - center(ic));
    const s = gsap.utils.clamp(1, 1.8,
      1.8 - d / 90);
    gsap.to(ic, { scale: s,
      y: -(s - 1) * 14, duration: 0.2 });
  });`,
    Demo: DockDemo,
  },
  {
    id: "ripple",
    name: "Ripple Material",
    plugin: "scale + spawn",
    cat: "click",
    blurb: "Onde qui naît au point de clic et s'étend — feedback tactile universel.",
    code: `el.onclick = (e) => {
  const s = document.createElement("span");
  s.style.cssText = circleAt(e.clientX, e.clientY);
  el.appendChild(s);
  gsap.fromTo(s, { scale: 0, opacity: 0.8 },
    { scale: 1, opacity: 0, duration: 0.7,
      onComplete: () => s.remove() });
};`,
    Demo: RippleDemo,
  },
  {
    id: "hold-confirm",
    name: "Maintenir confirmé",
    plugin: "press & fill",
    cat: "click",
    blurb: "Remplissage pendant 1,2 s — annulé si on relâche : suppression sûre.",
    code: `btn.onpointerdown = () =>
  tw = gsap.to(".fill", { scaleX: 1,
    duration: 1.2, ease: "none",
    onComplete: confirm });
["pointerup","pointerleave"].forEach(e =>
  btn.addEventListener(e, () => {
    tw.kill();
    gsap.to(".fill", { scaleX: 0 });
  }));`,
    Demo: HoldConfirmDemo,
  },
  {
    id: "confetti",
    name: "Confettis 2D",
    plugin: "Physics2D",
    cat: "click",
    blurb: "Explosion de particules colorées avec gravité — célébration, succès.",
    code: `gsap.to(p, {
  physics2D: {
    velocity: gsap.utils.random(120, 420),
    angle: gsap.utils.random(-160, -20),
    gravity: 600 },
  rotation: gsap.utils.random(-360, 360),
  opacity: 0,
  onComplete: () => p.remove() });`,
    Demo: ConfettiDemo,
  },
  {
    id: "sun-moon",
    name: "Soleil ↔ lune",
    plugin: "MorphSVG",
    cat: "click",
    blurb: "Toggle de thème : le disque se creuse en croissant, les rayons s'effacent.",
    code: `gsap.to(".icon", {
  morphSVG: sun ? CRESCENT : CIRCLE,
  duration: 0.6, ease: "power2.inOut" });
gsap.to(".rays", { opacity: sun ? 1 : 0,
  scale: sun ? 1 : 0.6 });`,
    Demo: SunMoonDemo,
  },
  {
    id: "bookmark-pop",
    name: "Marque-page",
    plugin: "fillOpacity + elastic",
    cat: "click",
    blurb: "Le bookmark se remplit et bondit — sauvegarde d'article/produit.",
    code: `gsap.fromTo(".bm", { scale: 0.7 },
  { scale: 1, ease: "elastic.out(1,0.4)" });
gsap.to(".path", {
  fillOpacity: saved ? 1 : 0 });`,
    Demo: BookmarkDemo,
  },
  {
    id: "download-arc",
    name: "Téléchargement",
    plugin: "DrawSVG × 2",
    cat: "click",
    blurb: "Anneau de progression qui se trace puis coche finale — file download.",
    code: `gsap.fromTo(".arc", { drawSVG: "0%" },
  { drawSVG: "100%", duration: 1.6,
    onComplete: () =>
      gsap.to(".check", { drawSVG: "100%" }) });`,
    Demo: DownloadArcDemo,
  },
  {
    id: "multi-select",
    name: "Tags sélection",
    plugin: "back scale",
    cat: "click",
    blurb: "Chips on/off avec pop — filtres de catalogue, sélection de centres d'intérêt.",
    code: `chip.onclick = () => {
  toggle(chip);
  gsap.fromTo(".on", { scale: 0.9 },
    { scale: 1, ease: "back.out(3)" });
};`,
    Demo: MultiSelectDemo,
  },
  {
    id: "mute-wave",
    name: "Mute animé",
    plugin: "repeatRefresh",
    cat: "click",
    blurb: "Les barres d'onde vivantes s'effondrent en silence — bouton audio.",
    code: `// actif : valeurs re-randomisées par cycle
gsap.to(".bar", {
  scaleY: () => gsap.utils.random(0.2, 1),
  repeat: -1, repeatRefresh: true,
  stagger: { each: 0.06, yoyo: true,
    repeat: -1 } });
// mute : scaleY → 0.06`,
    Demo: MuteWaveDemo,
  },
  {
    id: "expand-card",
    name: "Carte Flip",
    plugin: "Flip",
    cat: "click",
    blurb: "La tuile devient panneau détaillé — transition de layout absolue.",
    code: `btn.onclick = () => {
  const state = Flip.getState(".card");
  expand();
  Flip.from(state, { duration: 0.5,
    ease: "power3.inOut", absolute: true });
};`,
    Demo: ExpandCardDemo,
  },
  {
    id: "dots-loader",
    name: "Loader 3 points",
    plugin: "stagger yoyo",
    cat: "loop",
    blurb: "Points qui bondissent en vague — indicateur de frappe/chargement.",
    code: `gsap.to(".dot", { y: -10, duration: 0.35,
  stagger: { each: 0.12,
    yoyo: true, repeat: -1 },
  ease: "power2.inOut" });`,
    Demo: DotsLoaderDemo,
  },
  {
    id: "shape-cycle",
    name: "Formes en cycle",
    plugin: "MorphSVG",
    cat: "loop",
    blurb: "Cercle → triangle → hexagone en boucle pendant que le SVG tourne lentement.",
    code: `const tl = gsap.timeline({ repeat: -1 });
shapes.forEach((d) => {
  tl.to(".shape", { morphSVG: d,
    duration: 0.9, ease: "power2.inOut" })
    .to({}, { duration: 0.6 });
});
gsap.to("svg", { rotation: 360, repeat: -1 });`,
    Demo: ShapeCycleDemo,
  },
  {
    id: "shine-text",
    name: "Texte reflet",
    plugin: "backgroundPosition",
    cat: "loop",
    blurb: "Bande lumineuse qui balaie le texte en gradient — titre premium/signature.",
    code: `// background-clip: text; gradient 200%
gsap.to(".shine", {
  backgroundPosition: "200% 0",
  duration: 2.2, repeat: -1, ease: "none" });`,
    Demo: ShineTextDemo,
  },
  {
    id: "float-bob",
    name: "Objets flottants",
    plugin: "random yoyo",
    cat: "loop",
    blurb: "Éléments de hero qui flottent à des rythmes désynchronisés.",
    code: `els.forEach((el, i) =>
  gsap.to(el, {
    y: gsap.utils.random(-14, -6),
    rotation: gsap.utils.random(-8, 8),
    duration: gsap.utils.random(1.4, 2.2),
    repeat: -1, yoyo: true,
    ease: "sine.inOut", delay: i * 0.3 }));`,
    Demo: FloatBobDemo,
  },
  {
    id: "matrix-rain",
    name: "Pluie matrix",
    plugin: "canvas + ticker",
    cat: "loop",
    blurb: "Colonnes de glyphes qui tombent — fond cyber/terminal, piloté par gsap.ticker.",
    code: `const tick = () => {
  ctx.fillStyle = "rgba(5,5,5,0.16)";
  ctx.fillRect(0, 0, w, h);
  cols.forEach((_, i) => {
    ctx.fillText(glyph(), i * 14, y[i]);
    y[i] = y[i] > h ? 0 : y[i] + 14;
  });
};
gsap.ticker.add(tick);
// cleanup : gsap.ticker.remove(tick)`,
    Demo: MatrixRainDemo,
  },
  {
    id: "radar",
    name: "Radar ping",
    plugin: "rotation + pulse",
    cat: "loop",
    blurb: "Balayage circulaire + blips qui pulsent — HUD, carte de présence.",
    code: `gsap.to(".sweep", { rotation: 360,
  repeat: -1, duration: 3, ease: "none",
  transformOrigin: "50% 50%" });
gsap.to(".blip", { opacity: 0, scale: 1.8,
  repeat: -1, stagger: 0.7 });`,
    Demo: RadarDemo,
  },
  {
    id: "wave-circle",
    name: "Anneau d'ondes",
    plugin: "repeatRefresh",
    cat: "loop",
    blurb: "24 rayons qui dansent autour du centre — visualiseur audio circulaire.",
    code: `gsap.to(".ray", {
  scaleY: () => gsap.utils.random(0.15, 1),
  duration: 0.3, repeat: -1,
  repeatRefresh: true,
  stagger: { each: 0.05, yoyo: true,
    repeat: -1 } });`,
    Demo: WaveCircleDemo,
  },
  {
    id: "gradient-spin",
    name: "Anneau conique",
    plugin: "conic + rotation",
    cat: "loop",
    blurb: "Dégradé conique en rotation derrière un noyau — badge sync/live.",
    code: `// conteneur conic-gradient → inner bg plein
gsap.to(".grad", { rotation: 360,
  repeat: -1, duration: 3, ease: "none" });`,
    Demo: GradientSpinDemo,
  },
  {
    id: "scale-title",
    name: "Titre dézoom",
    plugin: "scrollTop → scale",
    cat: "scroll",
    blurb: "Le titre rétrécit et s'estompe à mesure qu'on défile — hero qui s'efface.",
    code: `el.onscroll = () => {
  const p = el.scrollTop /
    (el.scrollHeight - el.clientHeight);
  gsap.set(".title", {
    scale: 1.5 - p * 0.9,
    opacity: 1 - p * 0.55 });
};`,
    Demo: ScaleTitleDemo,
  },
  {
    id: "scrub-number",
    name: "Chiffre scrubé",
    plugin: "scrollTop → valeur",
    cat: "scroll",
    blurb: "Un compteur lié directement à la position de scroll — data story.",
    code: `el.onscroll = () => {
  const p = scrollP(el);
  gsap.set(".bar", { scaleX: p });
  num.textContent = Math.round(p * 128);
};`,
    Demo: ScrubNumberDemo,
  },
  {
    id: "parallax-cols",
    name: "Colonnes parallaxe",
    plugin: "vitesses ×3",
    cat: "scroll",
    blurb: "Trois colonnes qui glissent à des vitesses différentes — galerie masonry.",
    code: `el.onscroll = () => {
  const p = el.scrollTop;
  cols.forEach((c, i) =>
    gsap.set(c, { y: p * speeds[i] / 100 }));
};`,
    Demo: ParallaxColsDemo,
  },
  {
    id: "divider-grow",
    name: "Filet chapitre",
    plugin: "scrollTop → scaleX",
    cat: "scroll",
    blurb: "Le filet se trace depuis le centre, le label du chapitre apparaît — séparateur édito.",
    code: `el.onscroll = () => {
  const p = scrollP(el);
  gsap.set(".line", { scaleX: p });
  gsap.set(".label", {
    opacity: p > 0.55 ? 1 : 0 });
};`,
    Demo: DividerGrowDemo,
  },
  {
    id: "fan-scroll",
    name: "Éventail scroll",
    plugin: "scrollTop → rotation",
    cat: "scroll",
    blurb: "Les cartes s'ouvrent en éventail depuis le bas à mesure du scroll.",
    code: `el.onscroll = () => {
  const p = scrollP(el);
  cards.forEach((c, i) =>
    gsap.set(c, {
      rotation: (i - 2) * 9 * p,
      y: -6 * Math.abs(i - 2) * p }));
};`,
    Demo: FanScrollDemo,
  },
  {
    id: "marquee-dir",
    name: "Marquee directionnel",
    plugin: "timeScale ±",
    cat: "scroll",
    blurb: "Le ruban change de sens selon la direction du scroll — nav immersive.",
    code: `const tw = gsap.to(".track",
  { xPercent: -50, repeat: -1, ease: "none" });
el.onscroll = () => {
  const dir = Math.sign(
    el.scrollTop - last) || 1;
  gsap.to(tw, { timeScale: dir * 1.6 });
};`,
    Demo: MarqueeDirDemo,
  },
  {
    id: "zoom-section",
    name: "Section pulsée",
    plugin: "sin(progress)",
    cat: "scroll",
    blurb: "Le panneau gonfle au milieu du scroll puis se dégonfle — focus séquentiel.",
    code: `el.onscroll = () => {
  const p = scrollP(el);
  const s = 0.75 + Math.sin(p * PI) * 0.3;
  gsap.set(".panel", { scale: s,
    opacity: 0.5 + Math.sin(p * PI) * 0.5 });
};`,
    Demo: ZoomSectionDemo,
  },
  {
    id: "img-rotate-in",
    name: "Image roll-in",
    plugin: "rotation + scale",
    cat: "scroll",
    blurb: "Le visuel se redresse et se stabilise à mesure du scroll — reveal éditorial.",
    code: `el.onscroll = () => {
  const p = scrollP(el);
  gsap.set(".img", {
    rotation: (1 - p) * 8,
    scale: 0.8 + p * 0.2,
    opacity: 0.3 + p * 0.7 });
};`,
    Demo: ImgRotateInDemo,
  },
  {
    id: "velocity-scale",
    name: "Stretch vélocité",
    plugin: "ticker decay",
    cat: "scroll",
    blurb: "L'élément s'étire verticalement selon la vitesse de scroll, puis décroit.",
    code: `el.onscroll = () => {
  v = el.scrollTop - last;
  last = el.scrollTop;
};
gsap.ticker.add(() => {
  v *= 0.9; // decay
  gsap.set(el, {
    scaleY: 1 + Math.min(0.5, |v| / 200) });
});`,
    Demo: VelocityScaleDemo,
  },
  {
    id: "clip-corner",
    name: "Coin épinglé",
    plugin: "clipPath scrub",
    cat: "scroll",
    blurb: "Le masque inset s'ouvre depuis les coins à mesure du scroll — reveal doux.",
    code: `el.onscroll = () => {
  const p = scrollP(el);
  gsap.set(".img", {
    clipPath: \`inset(\${(1-p)*30}% \${(1-p)*20}% …)\` });
};`,
    Demo: ClipCornerDemo,
  },
  {
    id: "img-load",
    name: "Blur-up image",
    plugin: "filter blur",
    cat: "media",
    blurb: "Image floue qui devient nette — le pattern de chargement progressif.",
    code: `gsap.fromTo(".img",
  { filter: "blur(14px)", opacity: 0.35,
    scale: 1.06 },
  { filter: "blur(0px)", opacity: 1,
    scale: 1, duration: 1.1 });`,
    Demo: ImgLoadDemo,
  },
  {
    id: "photo-shuffle",
    name: "Pile de photos",
    plugin: "throw + reorder",
    cat: "media",
    blurb: "Clic → la photo du dessus part et passe derrière — galerie de pile.",
    code: `gsap.to(top, { x: 90, rotation: 12,
  ease: "power2.in",
  onComplete: () => {
    reorder(); // top → arrière
    gsap.set(top, { x: 0, rotation: 0 });
  }});`,
    Demo: PhotoShuffleDemo,
  },
  {
    id: "mask-shape",
    name: "Masque étoile",
    plugin: "polygon scrub",
    cat: "media",
    blurb: "L'étoile grandit au scroll jusqu'à découvrir l'image — reveal figuré.",
    code: `el.onscroll = () => {
  const p = scrollP(el);
  gsap.set(".img", {
    clipPath: star(8 + p * 160) });
};`,
    Demo: MaskShapeDemo,
  },
  {
    id: "thumb-nav",
    name: "Vignettes nav",
    plugin: "fromTo swap",
    cat: "media",
    blurb: "Vignettes cliquables qui rechargent le visuel principal — galerie produit.",
    code: `gsap.fromTo(".main",
  { opacity: 0, scale: 0.97 },
  { opacity: 1, scale: 1, duration: 0.4 });
// key={idx} → remount + replay`,
    Demo: ThumbNavDemo,
  },
  {
    id: "pan-drag",
    name: "Carte à pan",
    plugin: "Draggable + inertia",
    cat: "media",
    blurb: "Grande image qu'on explore à la souris — map, artwork zoomé.",
    code: `Draggable.create(".pan", {
  type: "x,y",
  bounds: frame,
  inertia: true,
  edgeResistance: 0.8 });`,
    Demo: PanDragDemo,
  },
  {
    id: "mosaic-reveal",
    name: "Mosaïque",
    plugin: "stagger random",
    cat: "media",
    blurb: "12 tuiles qui s'ouvrent dans un ordre aléatoire — reveal de grille.",
    code: `tl.to(".tile", { opacity: 0,
  stagger: { each: 0.06, from: "random" } })
  .to(".tile", { opacity: 1,
    stagger: { each: 0.06, from: "random" } });`,
    Demo: MosaicRevealDemo,
  },
  {
    id: "scrub-filters",
    name: "Filtres scrubés",
    plugin: "filter props",
    cat: "media",
    blurb: "N&B + flou qui se dissipent au scroll — l'image « arrive au monde ».",
    code: `el.onscroll = () => {
  const p = scrollP(el);
  gsap.set(".img", {
    filter: \`grayscale(\${1-p})
      blur(\${(1-p)*6}px)\` });
};`,
    Demo: ScrubFiltersDemo,
  },
  {
    id: "swipe-delete",
    name: "Swipe supprimer",
    plugin: "Draggable x",
    cat: "drag",
    blurb: "Ligne qu'on tire à gauche : seuil → suppression animée, sinon retour élastique.",
    code: `Draggable.create(row, { type: "x",
  bounds: { minX: -80, maxX: 0 },
  onDragEnd() {
    if (this.x < -55) remove(row);
    else gsap.to(row, { x: 0,
      ease: "elastic.out(1,0.6)" });
  }});`,
    Demo: SwipeDeleteDemo,
  },
  {
    id: "splitter",
    name: "Séparateur",
    plugin: "Draggable x",
    cat: "drag",
    blurb: "Handle qui redimensionne les deux panneaux — éditeur, dashboard.",
    code: `Draggable.create(".handle", {
  type: "x",
  onDrag() {
    gsap.set(".left", {
      width: 50 + this.x / W * 100 + "%" });
    gsap.set(this.target, { x: 0 });
  }});`,
    Demo: SplitterDemo,
  },
  {
    id: "tinder",
    name: "Cartes swipe",
    plugin: "Draggable + rotation",
    cat: "drag",
    blurb: "Carte qu'on jette à droite (LIKE) ou à gauche (NOPE) — pile de choix.",
    code: `Draggable.create(card, {
  onDrag() {
    gsap.set(card, { rotation: this.x * 0.08 });
    gsap.set(".like", { opacity: this.x / 70 });
  },
  onDragEnd() {
    if (Math.abs(this.x) > 70) throwOut();
    else gsap.to(card, { x:0, rotation:0,
      ease: "elastic.out(1,0.5)" });
  }});`,
    Demo: TinderDemo,
  },
  {
    id: "wheel-picker",
    name: "Picker iOS",
    plugin: "Draggable + snap",
    cat: "drag",
    blurb: "Roue de tailles avec inertie et aimantation par rangée — sélecteur natif-like.",
    code: `Draggable.create(track, { type: "y",
  inertia: true,
  snap: { y: (v) =>
    Math.round(v / rowH) * rowH },
  onDrag() {
    setCur(Math.round(-this.y / rowH));
  }});`,
    Demo: WheelPickerDemo,
  },
  {
    id: "sortable",
    name: "Liste triable",
    plugin: "Draggable + Flip",
    cat: "drag",
    blurb: "Lignes qu'on réordonne à la main, les voisines glissent via Flip.",
    code: `Draggable.create(row, { type: "y",
  onDragEnd() {
    const moved = Math.round(this.y / 37);
    const state = Flip.getState(".row");
    reorder(i, i + moved);
    Flip.from(state, { duration: 0.35 });
  }});`,
    Demo: SortableDemo,
  },
  {
    id: "read-bar",
    name: "Progression lecture",
    plugin: "scrollTop → scaleX",
    cat: "edito",
    blurb: "Barre fine en haut + % — l'indicateur d'article indispensable.",
    code: `el.onscroll = () => {
  const p = el.scrollTop /
    (el.scrollHeight - el.clientHeight);
  gsap.set(".bar", { scaleX: p });
};`,
    Demo: ReadBarDemo,
  },
  {
    id: "big-stat",
    name: "Chiffre géant",
    plugin: "compteur seuil",
    cat: "edito",
    blurb: "La stat démarre quand on l'atteint au scroll — section chiffres magazine.",
    code: `el.onscroll = () => {
  if (scrollP(el) > 0.35 && !done) {
    done = true;
    gsap.to(o, { v: 148,
      onUpdate: render });
  }
};`,
    Demo: BigStatDemo,
  },
  {
    id: "footnote",
    name: "Note de bas",
    plugin: "back pop",
    cat: "edito",
    blurb: "Appel de note ¹ → tooltip académique au survol — article long, documentation.",
    code: `ref.onmouseenter = () => {
  show();
  gsap.fromTo(".fn", { y: 6, opacity: 0 },
    { y: 0, opacity: 1, ease: "back.out(2)" });
};`,
    Demo: FootnoteDemo,
  },
  {
    id: "cite-mark",
    name: "Guillemets tracés",
    plugin: "DrawSVG",
    cat: "edito",
    blurb: "Les « » géants se dessinent puis la citation apparaît — pull-quote vivant.",
    code: `tl.set(".quote", { drawSVG: "0%" })
  .to(".quote", { drawSVG: "100%",
    duration: 1, ease: "power2.inOut" })
  .to(".txt", { opacity: 1, y: 0 });`,
    Demo: CiteMarkDemo,
  },
  {
    id: "circle-wipe",
    name: "Transition cercle",
    plugin: "clipPath circle",
    cat: "page",
    blurb: "Le disque s'ouvre depuis le point de clic — changement de vue spectaculaire.",
    code: `mask.style.clipPath =
  \`circle(0% at \${x}px \${y}px)\`;
tl.to(mask, {
  clipPath: \`circle(150% at \${x}px \${y}px)\`,
  ease: "power2.in" })
  .call(changePage)
  .to(mask, { clipPath: "circle(0%)" ,
    ease: "power2.out" });`,
    Demo: CircleWipeDemo,
  },
  {
    id: "top-loader",
    name: "Loader de route",
    plugin: "timeline échelonnée",
    cat: "page",
    blurb: "Barre fine en haut qui progresse par à-coups — navigation style SPA.",
    code: `tl.set(bar, { scaleX: 0, opacity: 1 })
  .to(bar, { scaleX: 0.35 })
  .to(bar, { scaleX: 0.7, duration: 0.7 })
  .to(bar, { scaleX: 1, ease: "power3.in" })
  .to(bar, { opacity: 0 }, "+=0.2");`,
    Demo: TopLoaderDemo,
  },
  {
    id: "hero-enter",
    name: "Entrée de hero",
    plugin: "timeline",
    cat: "page",
    blurb: "Kicker → titre → CTA → visuel : la séquence d'accueil en une timeline.",
    code: `tl.to(".kicker", { opacity: 1, y: 0 })
  .to(".title", { opacity: 1, y: 0,
    ease: "power4.out" }, "-=0.15")
  .to(".cta", { opacity: 1 }, "-=0.2")
  .to(".visual", {
    clipPath: "inset(0 0 0% 0)",
    ease: "power3.inOut" }, "-=0.3");`,
    Demo: HeroEnterDemo,
  },
  {
    id: "doors",
    name: "Portes d'entrée",
    plugin: "xPercent ×2",
    cat: "page",
    blurb: "Deux panneaux qui s'ouvrent en coulissant — transition de page cérémonielle.",
    code: `gsap.to(".door-l", {
  xPercent: open ? -102 : 0,
  ease: "power4.inOut", duration: 0.9 });
gsap.to(".door-r", {
  xPercent: open ? 102 : 0, ... });`,
    Demo: DoorsDemo,
  },
  {
    id: "fps-meter",
    name: "Compteur FPS",
    plugin: "gsap.ticker",
    cat: "tools",
    blurb: "Mesure réelle des images/seconde via le ticker — audit de performance live.",
    code: `gsap.ticker.add((t, dt) => {
  acc += dt; frames++;
  if (acc > 500) {
    fps = frames * 1000 / acc;
    acc = frames = 0;
  }
});
// cleanup : gsap.ticker.remove(fn)`,
    Demo: FpsDemo,
  },
  {
    id: "gsap-utils",
    name: "Boîte utils",
    plugin: "gsap.utils",
    cat: "tools",
    blurb: "clamp / mapRange / normalize appliqués en direct à un slider — les helpers stars.",
    code: `const clamp = gsap.utils.clamp(0, 50);
const map = gsap.utils.mapRange(0, 100, 0, 360);
const norm = gsap.utils.normalize(0, 100);

clamp(v); map(v); norm(v);`,
    Demo: UtilsDemo,
  },
  {
    id: "markers-viz",
    name: "Markers visuels",
    plugin: "offsetTop calc",
    cat: "tools",
    blurb: "Start/end en pointillés positionnés par offsetTop — debug ScrollTrigger pédagogique.",
    code: `// start "top 80%" :
gsap.set(".start", {
  top: box.offsetTop - H * 0.8 });
// fin "bottom 20%" :
gsap.set(".end", {
  top: box.offsetTop + H2 - H * 0.2 });`,
    Demo: MarkersDemo,
  },
  {
    id: "observer-viz",
    name: "Observer live",
    plugin: "Observer",
    cat: "tools",
    blurb: "ΔX / ΔY / état affichés en direct — instrumentation du plugin Observer.",
    code: `Observer.create({
  target: zone,
  type: "pointer",
  onMove: (self) => {
    dx = self.deltaX;
    dy = self.deltaY;
    state = self.isDragging
      ? "drag" : "move";
  }});`,
    Demo: ObserverVizDemo,
  },
  {
    id: "split-screen",
    name: "Écran coupé",
    plugin: "yPercent ×2",
    cat: "page",
    blurb: "La page se coupe horizontalement en deux moitiés qui s'évacuent — révélation théâtrale.",
    code: `gsap.to(".top", { yPercent: open ? -102 : 0,
  duration: 0.8, ease: "power4.inOut" });
gsap.to(".bottom", { yPercent: open ? 102 : 0, ... });`,
    Demo: SplitScreenDemo,
  },
  {
    id: "grid-wipe",
    name: "Transition tuiles",
    plugin: "stagger random",
    cat: "page",
    blurb: "16 tuiles qui se remplissent dans un ordre aléatoire — changement de vue en mosaïque.",
    code: `tl.to(".tile", { opacity: 1,
  stagger: { each: 0.03, from: "random" } })
  .call(changePage)
  .to(".tile", { opacity: 0,
    stagger: { each: 0.03, from: "random" } });`,
    Demo: GridWipeDemo,
  },
  {
    id: "page-loader",
    name: "Préchargeur %",
    plugin: "compteur + sortie",
    cat: "page",
    blurb: "0→100% en chiffres géants puis le panneau sort — le preloader signature.",
    code: `tl.to(o, { v: 100, duration: 1.6,
  ease: "power2.inOut",
  onUpdate: () => pct.textContent = ~~o.v })
  .to(".loader", { yPercent: -102,
    ease: "power4.inOut" }, "+=0.25");`,
    Demo: PageLoaderDemo,
  },
  {
    id: "shared-element",
    name: "Élément partagé",
    plugin: "Flip",
    cat: "page",
    blurb: "Grille ↔ liste : les cartes volent entre les deux layouts — shared-element transition.",
    code: `const state = Flip.getState(".item");
toggleLayout();
Flip.from(state, { duration: 0.55,
  ease: "power3.inOut", absolute: true });`,
    Demo: SharedElementDemo,
  },
  {
    id: "curtain-up",
    name: "Rideau levé",
    plugin: "yPercent",
    cat: "page",
    blurb: "Le panneau plein cadre se lève comme un rideau de théâtre — révélation solennelle.",
    code: `gsap.to(".curtain", {
  yPercent: open ? -102 : 0,
  duration: 0.9, ease: "power4.inOut" });`,
    Demo: CurtainUpDemo,
  },
  {
    id: "stack-push",
    name: "Push latéral",
    plugin: "xPercent ×2",
    cat: "page",
    blurb: "La nouvelle vue pousse l'ancienne sur le côté — navigation mobile classique.",
    code: `tl.set(next, { xPercent: 100 })
  .to(next, { xPercent: 0, ease: "power3.inOut" })
  .to(current, { xPercent: -30, opacity: 0.3 },
    "<");`,
    Demo: StackPushDemo,
  },
  {
    id: "reduced-motion",
    name: "Reduced motion",
    plugin: "gsap.matchMedia",
    cat: "tools",
    blurb: "Le toggle montre les deux comportements — animation complète vs état final direct.",
    code: `const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: reduce)",
  () => {
    // cleanup auto — état final, zéro anim
    gsap.set(el, { x: finalX });
  });
mm.add("(prefers-reduced-motion: no-preference)",
  () => {
    gsap.to(el, { x: 110, repeat: -1, yoyo: true });
  });`,
    Demo: ReducedMotionDemo,
  },
  {
    id: "stagger-lab",
    name: "Labo stagger",
    plugin: "stagger.from",
    cat: "tools",
    blurb: "Comparez from: start / center / edges / random sur la même grille — stagger en action.",
    code: `gsap.fromTo(".cell", { scale: 0.15 },
  { scale: 1, stagger: {
    each: 0.04,
    from: "center" // start | edges | random
  }});`,
    Demo: StaggerLabDemo,
  },
  {
    id: "label-jump",
    name: "Labels de timeline",
    plugin: "addLabel + play",
    cat: "tools",
    blurb: "Sautez à n'importe quel repère — intro, spin, grow : la timeline devient un chapitre.",
    code: `tl.addLabel("intro")
  .to(el, { x: 60 })
  .addLabel("spin")
  .to(el, { rotation: 360 });

tl.play("spin"); // saute au repère`,
    Demo: LabelJumpDemo,
  },
  {
    id: "invalidate-replay",
    name: "Valeur relancée",
    plugin: "function-based",
    cat: "tools",
    blurb: "À chaque replay, la valeur de fin est recalculée — destination différente à chaque fois.",
    code: `gsap.to(el, {
  x: () => gsap.utils.random(60, 130)
    * (Math.random() > 0.5 ? 1 : -1),
  // recalculé à chaque démarrage
  duration: 0.6 });`,
    Demo: InvalidateDemo,
  },
  {
    id: "ticker-lag",
    name: "lagSmoothing",
    plugin: "gsap.ticker",
    cat: "tools",
    blurb: "Anti-saut après un lag (onglet inactif) — lagSmoothing on/off en direct.",
    code: `gsap.ticker.lagSmoothing(500);
// 0 = chaque frame compte (saut brutal)
// 500 = plafonne le delta (reprise douce)
gsap.ticker.add(tick);
// cleanup : gsap.ticker.remove(tick)`,
    Demo: TickerUtilDemo,
  },
  {
    id: "kill-tween",
    name: "Kill propre",
    plugin: "killTweensOf",
    cat: "tools",
    blurb: "Compteur de tweens vivants + kill ciblé — la bonne hygiène mémoire GSAP.",
    code: `gsap.killTweensOf(box);
// vérifier :
gsap.getTweensOf(box).length; // → 0
// reset visuel :
gsap.set(box, { x: 0 });`,
    Demo: KillDemo,
  },
  {
    id: "toc-spy",
    name: "Sommaire actif",
    plugin: "scrollTop → index",
    cat: "edito",
    blurb: "Le sommaire latéral s'allume selon la section lue — article long, docs.",
    code: `el.onscroll = () => {
  const p = el.scrollTop /
    (el.scrollHeight - el.clientHeight);
  setActive(Math.round(p * (n - 1)));
};`,
    Demo: TocSpyDemo,
  },
  {
    id: "word-mask",
    name: "Mots masqués",
    plugin: "SplitText words",
    cat: "edito",
    blurb: "Chaque mot monte dans son propre masque — la révélation de titre la plus utilisée.",
    code: `const split = new SplitText(".title",
  { type: "words" });
tl.fromTo(split.words, { yPercent: 110 },
  { yPercent: 0, stagger: 0.08,
    ease: "power4.out" });`,
    Demo: WordMaskDemo,
  },
  {
    id: "margin-note",
    name: "Note en marge",
    plugin: "scrollTop → trigger",
    cat: "edito",
    blurb: "Annotation latérale qui glisse à l'arrivée au scroll — notes typographiques d'article.",
    code: `el.onscroll = () => {
  if (scrollP(el) > 0.4 && !shown)
    gsap.fromTo(".note", { x: 16, opacity: 0 },
      { x: 0, opacity: 1, ease: "power3.out" });
};`,
    Demo: MarginNoteDemo,
  },
  {
    id: "chapter-num",
    name: "Numéro chapitre",
    plugin: "outline + slide",
    cat: "edito",
    blurb: "Gros chiffre en contour qui monte dans son masque — séparateur de chapitres.",
    code: `// WebkitTextStroke: 1.5px accent
gsap.fromTo(".num",
  { yPercent: 60, opacity: 0 },
  { yPercent: 0, opacity: 1,
    ease: "power4.out" });`,
    Demo: ChapterNumDemo,
  },
  {
    id: "caption-slide",
    name: "Légende photo",
    plugin: "y + zoom interne",
    cat: "edito",
    blurb: "La légende monte depuis le bas pendant que l'image zoome — crédit photo au survol.",
    code: `frame.onmouseenter = () => {
  gsap.to(".cap", { y: 0, ease: "power3.out" });
  gsap.to(".img", { scale: 1.05 });
};`,
    Demo: CaptionSlideDemo,
  },
  {
    id: "drag-upload",
    name: "Zone de dépôt",
    plugin: "Draggable + hitTest",
    cat: "drag",
    blurb: "Le fichier qu'on tire dans la zone qui s'allume — upload drag & drop complet.",
    code: `Draggable.create(file, {
  onDrag() {
    inside = hitTest(zone);
    gsap.to(zone, {
      borderColor: inside ? ACCENT : BASE,
      scale: inside ? 1.05 : 1 });
  },
  onDragEnd() { if (inside) drop(); } });`,
    Demo: DragUploadDemo,
  },
  {
    id: "snap-grid",
    name: "Snap grille",
    plugin: "Draggable + snap",
    cat: "drag",
    blurb: "La pièce s'aimante à la grille 28px à chaque relâche — éditeur, tableur.",
    code: `Draggable.create(".piece", {
  bounds: frame,
  inertia: true,
  snap: {
    x: (v) => Math.round(v / 28) * 28,
    y: (v) => Math.round(v / 28) * 28,
  }});`,
    Demo: SnapGridDemo,
  },
  {
    id: "bound-ball",
    name: "Balle confinée",
    plugin: "Draggable + bounce",
    cat: "drag",
    blurb: "Lancez la balle, les bords la contiennent, la gravité la rappelle au sol.",
    code: `Draggable.create(ball, {
  bounds: frame, inertia: true,
  edgeResistance: 0.9,
  onDragEnd() {
    gsap.to(ball, { y: maxY,
      ease: "bounce.out" });
  }});`,
    Demo: BoundBallDemo,
  },
  {
    id: "drag-value",
    name: "Fader vertical",
    plugin: "Draggable y",
    cat: "drag",
    blurb: "Curseur vertical qui règle une valeur — console de mixage, contrôle fin.",
    code: `Draggable.create(fader, { type: "y",
  bounds: { minY: -max, maxY: 0 },
  onDrag() {
    value = this.y / -max * 100;
  }});`,
    Demo: DragValueDemo,
  },
  {
    id: "hue-drag",
    name: "Picker de teinte",
    plugin: "Draggable x",
    cat: "drag",
    blurb: "Curseur sur le dégradé arc-en-ciel — la couleur suit en direct. Color picker réel.",
    code: `Draggable.create(knob, { type: "x",
  bounds: rail,
  onDrag() {
    hue = this.x / rail.clientWidth * 360;
  }});`,
    Demo: HueDragDemo,
  },
  {
    id: "video-scrub",
    name: "Scrub vidéo",
    plugin: "progress()",
    cat: "media",
    blurb: "Barre cliquable + play/pause sur un tween de lecture — lecteur média maison.",
    code: `const o = { t: 0 };
const tw = gsap.to(o, { t: DUR, paused: true,
  repeat: -1, ease: "none",
  onUpdate: render });

bar.onclick = (e) =>
  tw.progress(posInBar(e)).play();`,
    Demo: VideoScrubDemo,
  },
  {
    id: "gallery-filter",
    name: "Filtre galerie",
    plugin: "Flip + onEnter",
    cat: "media",
    blurb: "Photos/vidéos : les vignettes se réorganisent, entrées et sorties animées.",
    code: `const state = Flip.getState(".item");
setFilter(cat);
Flip.from(state, { duration: 0.5,
  absolute: true,
  onEnter: (els) => gsap.fromTo(els,
    { scale: 0.7 }, { scale: 1 }),
  onLeave: (els) => gsap.to(els,
    { scale: 0.7 }) });`,
    Demo: GalleryFilterDemo,
  },
  {
    id: "zoom-cursor",
    name: "Loupe zoom",
    plugin: "transformOrigin",
    cat: "media",
    blurb: "Le zoom suit le pointeur — loupe produit e-commerce.",
    code: `frame.onmousemove = (e) => {
  const p = posInFrame(e);
  gsap.to(img, {
    transformOrigin: \`\${p.x}% \${p.y}%\`,
    scale: 2, duration: 0.4 });
};`,
    Demo: ZoomCursorDemo,
  },
  {
    id: "playlist",
    name: "File lecture",
    plugin: "progress bar",
    cat: "media",
    blurb: "Pistes qui s'enchaînent avec barre de progression — playlist, file d'attente.",
    code: `gsap.fromTo(".bar", { scaleX: 0 },
  { scaleX: 1, duration: 4, ease: "none",
    onComplete: () =>
      setCur((c) => (c + 1) % n) });`,
    Demo: PlaylistDemo,
  },
  {
    id: "media-focus",
    name: "Focus photo",
    plugin: "filter + scale",
    cat: "media",
    blurb: "La photo survolée se détache pendant que les voisines floutent — galerie avec hiérarchie.",
    code: `cards.forEach((c) =>
  gsap.to(c, {
    scale: c === me ? 1.06 : 0.94,
    filter: c === me
      ? "blur(0px)"
      : "blur(2px) grayscale(0.6)",
    opacity: c === me ? 1 : 0.5 }));`,
    Demo: MediaFocusDemo,
  },
  {
    id: "search-expand",
    name: "Recherche extensible",
    plugin: "width + rotation",
    cat: "ui",
    blurb: "La loupe qui déploie le champ — header compact, barre de recherche escamotable.",
    code: `gsap.to(".input", {
  width: open ? 150 : 0,
  opacity: open ? 1 : 0,
  duration: 0.4, ease: "power3.inOut" });
gsap.to(".icon", { rotation: open ? 90 : 0 });`,
    Demo: SearchExpandDemo,
  },
  {
    id: "hamburger-x",
    name: "Burger → croix",
    plugin: "rotation + y",
    cat: "ui",
    blurb: "Les trois barres se fondent en croix — le toggle de menu universel.",
    code: `gsap.to(".top", { y: open ? 5 : 0,
  rotation: open ? 45 : 0 });
gsap.to(".mid", { opacity: open ? 0 : 1 });
gsap.to(".bot", { y: open ? -5 : 0,
  rotation: open ? -45 : 0 });`,
    Demo: HamburgerDemo,
  },
  {
    id: "context-menu",
    name: "Menu contextuel",
    plugin: "scale + stagger",
    cat: "ui",
    blurb: "Clic droit → menu qui jaillit depuis le pointeur avec items en cascade.",
    code: `onContextMenu: setMenu({x, y});
gsap.fromTo(".menu", { scale: 0.6, opacity: 0,
  transformOrigin: "top left" },
  { scale: 1, opacity: 1, ease: "back.out(2)" });
gsap.fromTo(".item", { x: -8, opacity: 0 },
  { x: 0, opacity: 1, stagger: 0.04 });`,
    Demo: ContextMenuDemo,
  },
  {
    id: "pwd-meter",
    name: "Jauge de force",
    plugin: "width + color",
    cat: "ui",
    blurb: "La barre de force qui change de couleur à la frappe — faible → fort.",
    code: `gsap.to(".bar", {
  width: level * 25 + "%",
  backgroundColor: colors[level],
  duration: 0.35 });`,
    Demo: PwdMeterDemo,
  },
  {
    id: "table-sort",
    name: "Tri de tableau",
    plugin: "Flip",
    cat: "ui",
    blurb: "Les lignes volent vers leur nouvelle position au tri — data table animée.",
    code: `const state = Flip.getState(".row");
setAsc(!asc);
Flip.from(state, { duration: 0.45,
  ease: "power3.inOut", absolute: true });`,
    Demo: TableSortDemo,
  },
  {
    id: "notif-bell",
    name: "Cloche notif",
    plugin: "elastic badge",
    cat: "ui",
    blurb: "Badge qui rebondit à chaque notification + panneau qui glisse — pattern cloche.",
    code: `gsap.fromTo(".badge", { scale: 1.7 },
  { scale: 1, ease: "elastic.out(1,0.4)" });
gsap.fromTo(".bell", { rotation: -14 },
  { rotation: 0, ease: "elastic.out(1,0.3)" });`,
    Demo: NotifBellDemo,
  },
  {
    id: "strike-through",
    name: "Barré animé",
    plugin: "scaleX directionnel",
    cat: "hover",
    blurb: "Le filet raye le texte en entrant par la gauche et ressort par la droite.",
    code: `enter: gsap.fromTo(".line",
  { scaleX: 0, transformOrigin: "0 50%" },
  { scaleX: 1 });
leave: gsap.to(".line", { scaleX: 0,
  transformOrigin: "100% 50%" });`,
    Demo: StrikeDemo,
  },
  {
    id: "bg-slide",
    name: "Fond coulissant",
    plugin: "xPercent + color",
    cat: "hover",
    blurb: "Le fond accent glisse sous le texte qui vire au noir — CTA magnétique classique.",
    code: `enter: gsap.to(".fill", { xPercent: 0,
    ease: "power3.out" });
  gsap.to(".txt", { color: "#000" });
leave: gsap.to(".fill", { xPercent: -102 });`,
    Demo: BgSlideDemo,
  },
  {
    id: "icon-swap",
    name: "Icône permutée",
    plugin: "yPercent ±110",
    cat: "hover",
    blurb: "La flèche sort par le haut et sa variante remonte — micro-interaction de bouton.",
    code: `enter: gsap.to(".a", { yPercent: -110 });
  gsap.fromTo(".b", { yPercent: 110 },
    { yPercent: 0, ease: "back.out(1.7)" });
leave: // chemin inverse`,
    Demo: IconSwapDemo,
  },
  {
    id: "sweep-hover",
    name: "Balayage lumière",
    plugin: "xPercent gradient",
    cat: "hover",
    blurb: "Un reflet traverse la carte au survol — premium sweep déclenché au pointer.",
    code: `enter: gsap.fromTo(".shine",
  { xPercent: -160 },
  { xPercent: 160, duration: 0.7,
    ease: "power2.inOut" });`,
    Demo: SweepHoverDemo,
  },
  {
    id: "blur-text",
    name: "Texte dissous",
    plugin: "SplitText + blur",
    cat: "hover",
    blurb: "Les caractères se floutent depuis le centre puis se reformaient par les bords.",
    code: `const split = new SplitText(".t",
  { type: "chars" });
enter: gsap.to(split.chars,
  { filter: "blur(4px)", opacity: 0.35,
    stagger: { each: 0.03, from: "center" } });`,
    Demo: BlurTextDemo,
  },
  {
    id: "coin-flip",
    name: "Pile ou face",
    plugin: "rotationY 3D",
    cat: "click",
    blurb: "La pièce tourne en 3D et le résultat dépend du nombre de demi-tours.",
    code: `spins += 4 + (rand ? 1 : 0);
gsap.to(".coin", {
  rotationY: spins * 180,
  duration: 1.4, ease: "power3.out",
  onComplete: () =>
    face = spins % 2 ? "PILE" : "FACE" });`,
    Demo: CoinFlipDemo,
  },
  {
    id: "dice-roll",
    name: "Lancer de dé",
    plugin: "rotation +=360",
    cat: "click",
    blurb: "Le dé tourne, rebondit, et les points changent à l'atterrissage.",
    code: `gsap.to(".die", {
  rotation: "+=360", scale: 1.15,
  yoyo: true, repeat: 1,
  onComplete: () => setV(1 + ~~(Math.random()*6)) });`,
    Demo: DiceRollDemo,
  },
  {
    id: "pulse-ring",
    name: "Onde au clic",
    plugin: "scale + fade",
    cat: "click",
    blurb: "Chaque clic émet un anneau qui s'étend et s'éteint — radar, carte interactive.",
    code: `gsap.fromTo(ring, { scale: 0.1, opacity: .9 },
  { scale: 3.2, opacity: 0, duration: 0.9,
    onComplete: () => removeRing(id) });`,
    Demo: PulseRingDemo,
  },
  {
    id: "click-spawn",
    name: "Particule émise",
    plugin: "spawn + drift",
    cat: "click",
    blurb: "Le clic fait naître une forme qui dérive en tournant — feedback ludique.",
    code: `gsap.to(particle, {
  y: -70, x: random(-25, 25),
  rotation: random(-90, 90),
  opacity: 0, scale: 0.4,
  onComplete: () => remove(id) });`,
    Demo: ClickSpawnDemo,
  },
  {
    id: "lock-unlock",
    name: "Cadenas animé",
    plugin: "svgOrigin",
    cat: "click",
    blurb: "L'anse pivote autour de sa charnière — SVG animé avec svgOrigin précis.",
    code: `gsap.to(".shackle", {
  rotation: open ? -38 : 0,
  svgOrigin: "10 14",
  ease: "back.out(2)" });`,
    Demo: LockUnlockDemo,
  },
  {
    id: "breathe",
    name: "Respiration",
    plugin: "sine yoyo",
    cat: "loop",
    blurb: "Cercle qui gonfle et dégonfle au rythme inspire/expire — apps bien-être.",
    code: `gsap.to(".dot", { scale: 1.45,
  duration: 2.6, ease: "sine.inOut",
  repeat: -1, yoyo: true,
  onRepeat: () => swapLabel() });`,
    Demo: BreatheDemo,
  },
  {
    id: "scan-line",
    name: "Ligne de scan",
    plugin: "top loop",
    cat: "loop",
    blurb: "Le faisceau lumineux balaie le cadre en yoyo — analyse, radar, terminal.",
    code: `gsap.fromTo(".beam", { top: "4%" },
  { top: "92%", duration: 1.8,
    ease: "sine.inOut",
    repeat: -1, yoyo: true });`,
    Demo: ScanLineDemo,
  },
  {
    id: "ring-loader",
    name: "Spinner arc",
    plugin: "DrawSVG + rotation",
    cat: "loop",
    blurb: "L'arc qui grandit et rétrécit en tournant — loader SVG classique.",
    code: `gsap.to(svg, { rotation: 360,
  repeat: -1, duration: 1.4, ease: "none" });
gsap.fromTo(arc, { drawSVG: "8%" },
  { drawSVG: "80%", yoyo: true, repeat: -1 });`,
    Demo: RingLoaderDemo,
  },
  {
    id: "tick-clock",
    name: "Horloge à ticks",
    plugin: "ease steps()",
    cat: "loop",
    blurb: "La trotteuse avance par saccades grâce à l'ease steps — horloge réaliste.",
    code: `gsap.to(".sec", { rotation: 360,
  duration: 60, ease: "steps(60)",
  repeat: -1 });
// 60 sauts de 6° = un tick par seconde`,
    Demo: TickClockDemo,
  },
  {
    id: "draw-scroll",
    name: "Trait au scroll",
    plugin: "DrawSVG + scroll",
    cat: "scroll",
    blurb: "Le fil SVG se dessine au fur et à mesure de la lecture — storytelling linéaire.",
    code: `scroller.onscroll = () =>
  gsap.set(path, {
    drawSVG: \`\${scrollP(el) * 100}%\`
  });`,
    Demo: DrawScrollDemo,
  },
  {
    id: "scroll-flip",
    name: "Cartes basculantes",
    plugin: "rotationX scroll",
    cat: "scroll",
    blurb: "Chaque carte se redresse depuis l'horizontale à son entrée — défilement 3D.",
    code: `onScroll: p = clamp(0, 1,
  (frameBottom - cardTop) / (h * 0.55));
gsap.set(card, {
  rotationX: (1 - p) * -65,
  opacity: 0.15 + p * 0.85 });`,
    Demo: ScrollFlipDemo,
  },
  {
    id: "word-focus",
    name: "Lecture éclairée",
    plugin: "SplitText + scroll",
    cat: "scroll",
    blurb: "Les mots s'allument un à un au scroll — la lecture suit ton doigt.",
    code: `const split = new SplitText(".p",
  { type: "words" });
onScroll: idx = scrollP * words.length;
words.forEach((w, i) =>
  gsap.set(w, { opacity: i <= idx ? 1 : 0.18 }));`,
    Demo: WordFocusDemo,
  },
  {
    id: "img-marquee",
    name: "Ruban d'images",
    plugin: "xPercent + timeScale",
    cat: "media",
    blurb: "Défilement infini qui ralentit au survol — bandeau logos, portfolio strip.",
    code: `const tw = gsap.to(".track",
  { xPercent: -50, repeat: -1, ease: "none" });
enter: gsap.to(tw, { timeScale: 0.12 });
leave: gsap.to(tw, { timeScale: 1 });`,
    Demo: ImgMarqueeDemo,
  },
  {
    id: "masonry-flip",
    name: "Masonry refondu",
    plugin: "Flip",
    cat: "media",
    blurb: "Le passage 2↔3 colonnes réorganise les vignettes en vol — galerie responsive.",
    code: `const state = Flip.getState(".item");
setCols(2 | 3);
Flip.from(state, { duration: 0.55,
  ease: "power3.inOut", absolute: true });`,
    Demo: MasonryFlipDemo,
  },
  {
    id: "split-image",
    name: "Image éclatée",
    plugin: "strips xPercent",
    cat: "media",
    blurb: "Au survol, l'image se fracture en bandes qui glissent en alternance.",
    code: `enter: gsap.to(".strip", {
  xPercent: (i) => i % 2 ? 16 : -16,
  stagger: 0.03, ease: "power3.out" });
leave: gsap.to(".strip", { xPercent: 0,
  ease: "elastic.out(1,0.7)" });`,
    Demo: SplitImageDemo,
  },
  {
    id: "wipe-image",
    name: "Avant balayé",
    plugin: "clipPath inset",
    cat: "media",
    blurb: "Le calque supérieur s'efface d'un bord à l'autre — comparaison de visuels.",
    code: `gsap.to(".top", {
  clipPath: show
    ? "inset(0% 0% 0% 100%)"
    : "inset(0% 0% 0% 0%)",
  duration: 0.7, ease: "power3.inOut" });`,
    Demo: WipeImageDemo,
  },
  {
    id: "char-count",
    name: "Compteur live",
    plugin: "width + color",
    cat: "edito",
    blurb: "Jauge de saisie qui vire au rouge à l'approche de la limite — tweet, bio.",
    code: `onChange: setLen(v.length);
gsap.to(".bar", {
  width: min(100, len/MAX*100) + "%",
  backgroundColor: over ? RED : ACCENT });`,
    Demo: CharCountDemo,
  },
  {
    id: "inline-expand",
    name: "Figure insérée",
    plugin: "Flip",
    cat: "edito",
    blurb: "La vignette inline s'étend en figure pleine largeur — le texte se réorganise.",
    code: `const state = Flip.getState(".fig");
setOpen(!open);
Flip.from(state, { duration: 0.5,
  absolute: true, ease: "power3.inOut" });`,
    Demo: InlineExpandDemo,
  },
  {
    id: "list-marker",
    name: "Puces tracées",
    plugin: "scroll + scaleX",
    cat: "edito",
    blurb: "Les items arrivent avec leur filet à l'entrée du viewport — sommaire, plan.",
    code: `onScroll: if (li.top < line) {
  gsap.to(li, { x: 0, opacity: 1 });
  gsap.to(li.marker, { scaleX: 1 });
} // révélé une seule fois`,
    Demo: ListMarkerDemo,
  },
  {
    id: "date-stamp",
    name: "Tampon de date",
    plugin: "scale impact",
    cat: "edito",
    blurb: "Le tampon claque sur la page avec légère rotation — visa, date de publication.",
    code: `gsap.fromTo(".stamp",
  { scale: 2.4, opacity: 0, rotation: -20 },
  { scale: 1, opacity: 1, rotation: -8,
    duration: 0.35, ease: "power4.in" });`,
    Demo: DateStampDemo,
  },
  {
    id: "blur-transition",
    name: "Fondu flouté",
    plugin: "filter blur",
    cat: "page",
    blurb: "La vue sort en se floutant pendant que la suivante se précise — transition douce.",
    code: `tl.to(out, { filter: "blur(14px)",
    scale: 0.92, opacity: 0 })
  .call(swapPage)
  .fromTo(in_, { filter: "blur(14px)",
    scale: 1.06, opacity: 0 },
    { filter: "blur(0px)", scale: 1 });`,
    Demo: BlurTransitionDemo,
  },
  {
    id: "route-stagger",
    name: "Cascade de sortie",
    plugin: "stagger out/in",
    cat: "page",
    blurb: "Les éléments sortent en cascade avant que la nouvelle vue n'entre — route change.",
    code: `gsap.to(".el", { y: -18, opacity: 0,
  stagger: 0.05, ease: "power2.in",
  onComplete: () => {
    swap();
    gsap.fromTo(".el", { y: 18, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07 });
  }});`,
    Demo: RouteStaggerDemo,
  },
  {
    id: "diagonal-wipe",
    name: "Balayage biais",
    plugin: "skew + xPercent",
    cat: "page",
    blurb: "Un panneau incliné traverse l'écran — changement de scène dynamique.",
    code: `tl.fromTo(".panel", { xPercent: -170 },
  { xPercent: 0, ease: "power3.inOut" })
  .call(swapScene)
  .to(".panel", { xPercent: 170 });
// .panel { transform: skewX(-14deg) }`,
    Demo: DiagonalWipeDemo,
  },
  {
    id: "drag-path",
    name: "Drag sur rail",
    plugin: "MotionPath + Draggable",
    cat: "drag",
    blurb: "Le point suit un chemin courbe pendant le drag — proxy draggable → progress.",
    code: `const tween = gsap.to(".dot", {
  motionPath: { path: "#rail",
    align: "#rail", alignOrigin: [0.5,0.5] },
  paused: true });
Draggable.create(proxy, { type: "x",
  trigger: ".dot",
  onDrag() { tween.progress(this.x/160); } });`,
    Demo: DragPathDemo,
  },
  {
    id: "swipe-tabs",
    name: "Onglets glissés",
    plugin: "Draggable + snap",
    cat: "drag",
    blurb: "Swipe horizontal entre panneaux avec aimantation — navigation mobile native.",
    code: `Draggable.create(track, { type: "x",
  inertia: true,
  bounds: { minX: -W*2, maxX: 0 },
  snap: { x: (v) => Math.round(v/W) * W },
  onThrowComplete: () =>
    tab = Math.round(-this.x / W) });`,
    Demo: SwipeTabsDemo,
  },
  {
    id: "strip-drag",
    name: "Strip libre",
    plugin: "Draggable + inertia",
    cat: "drag",
    blurb: "La bande de cartes se tire librement avec inertie — carrousel tactile fluide.",
    code: `Draggable.create(strip, { type: "x",
  inertia: true, edgeResistance: 0.8,
  bounds: {
    minX: frameW - stripW,
    maxX: 0 } });`,
    Demo: StripDragDemo,
  },
  {
    id: "magnet-snap",
    name: "Aimant de dépôt",
    plugin: "Draggable + nearest",
    cat: "drag",
    blurb: "La bille se colle à l'ancrage le plus proche au relâche — snap magnétique.",
    code: `Draggable.create(ball, {
  type: "x,y", bounds: frame,
  onDragEnd() {
    const target = nearestAnchor(ball);
    gsap.to(ball, { x: target.dx,
      y: target.dy, ease: "back.out(1.8)" });
  }});`,
    Demo: MagnetSnapDemo,
  },
  {
    id: "tween-controls",
    name: "Pupitre tween",
    plugin: "play/pause/reverse",
    cat: "tools",
    blurb: "play · pause · reverse · restart — les 4 commandes de base sur un tween vivant.",
    code: `const tw = gsap.to(".dot",
  { x: 130, yoyo: true, repeat: -1 });

tw.play(); tw.pause();
tw.reverse(); tw.restart();`,
    Demo: TweenControlsDemo,
  },
  {
    id: "timescale",
    name: "timeScale",
    plugin: "tl.timeScale",
    cat: "tools",
    blurb: "Le slider accélère ou ralentit toute la timeline — ×0.1 à ×3 en direct.",
    code: `tl.timeScale(v);
// ×0.5 = moitié vitesse
// ×3   = triple vitesse
// négatif = lecture inversée !`,
    Demo: TimeScaleDemo,
  },
  {
    id: "timeline-scrub",
    name: "Tête de lecture",
    plugin: "tl.progress()",
    cat: "tools",
    blurb: "Le slider pilote le playhead de la timeline — scrub manuel précis.",
    code: `const tl = gsap.timeline({ paused: true,
  onUpdate: () =>
    ui.value = tl.progress() * 100 });

slider.oninput = (v) =>
  tl.progress(v / 100);`,
    Demo: TimelineScrubDemo,
  },
  {
    id: "quick-setter",
    name: "quickTo vs set",
    plugin: "gsap.quickTo",
    cat: "tools",
    blurb: "Deux billes suivent le curseur : l'une lissée par quickTo, l'autre brute.",
    code: `const qx = gsap.quickTo(ball, "x",
  { duration: 0.45, ease: "power3" });

onmousemove: qx(e.clientX); // fluide
// vs gsap.set(ball, {x}) // téléporté`,
    Demo: QuickSetterDemo,
  },
  {
    id: "rating-input",
    name: "Note étoiles",
    plugin: "elastic scale",
    cat: "ui",
    blurb: "Notation 5 étoiles avec aperçu au survol et impact élastique au clic.",
    code: `stars.map(i =>
  <Star filled={i <= (hover || rating)}
    onClick={() => {
      setRating(i);
      gsap.fromTo(star, { scale: 1.6 },
        { scale: 1, ease: "elastic.out(1,0.4)" });
    }} />)`,
    Demo: RatingInputDemo,
  },
  {
    id: "confirm-inline",
    name: "Suppr. 2 temps",
    plugin: "state machine",
    cat: "ui",
    blurb: "Supprimer → Confirmer ? → Supprimé : la confirmation destructrice en deux clics.",
    code: `if (step === 0) {
  setStep(1);
  timer = gsap.delayedCall(2.5,
    () => setStep(0)); // auto-réarme
} else confirm();`,
    Demo: ConfirmInlineDemo,
  },
  {
    id: "tree-view",
    name: "Arborescence",
    plugin: "height auto",
    cat: "ui",
    blurb: "Dossier qui déploie ses enfants avec chevron rotatif — explorateur de fichiers.",
    code: `gsap.to(sub, {
  height: open ? sub.scrollHeight : 0,
  duration: 0.4, ease: "power3.inOut" });
gsap.to(caret, { rotation: open ? 90 : 0 });`,
    Demo: TreeViewDemo,
  },
  {
    id: "file-list",
    name: "File d'envoi",
    plugin: "progress queue",
    cat: "ui",
    blurb: "Chaque fichier arrive avec sa barre de progression — upload manager.",
    code: `gsap.fromTo(row, { x: -16, opacity: 0 },
  { x: 0, opacity: 1 });
gsap.fromTo(row.bar, { width: "0%" },
  { width: "100%", duration: 1.4,
    onComplete: () => markDone(id) });`,
    Demo: FileListDemo,
  },
  {
    id: "empty-state",
    name: "État vide",
    plugin: "bob + pop",
    cat: "ui",
    blurb: "Illustration flottante + items qui naissent au premier ajout — empty state vivant.",
    code: `// vide : les points respirent
gsap.to(".dot", { y: -6, yoyo: true,
  repeat: -1, stagger: 0.25 });
// rempli : entrée en cascade
gsap.fromTo(".item", { y: 14, scale: 0.9 },
  { y: 0, scale: 1, ease: "back.out(1.6)" });`,
    Demo: EmptyStateDemo,
  },
  {
    id: "profile-pop",
    name: "Carte profil",
    plugin: "delayedCall",
    cat: "ui",
    blurb: "Le hover card avec délai d'intention — survole l'avatar, attends, la fiche surgit.",
    code: `enter: call = gsap.delayedCall(0.35,
  () => gsap.fromTo(card,
    { opacity: 0, y: 8, scale: 0.92 },
    { opacity: 1, scale: 1,
      ease: "back.out(1.8)" }));
leave: call.kill(); hide();`,
    Demo: ProfilePopDemo,
  },
  {
    id: "wobble-icon",
    name: "Icône tremblante",
    plugin: "CustomWiggle",
    cat: "hover",
    blurb: "L'icône tremble de façon organique au survol — wiggle dédié, pas de simple rotation.",
    code: `CustomWiggle.create("wob",
  { wiggles: 5, type: "anticipate" });
enter: gsap.fromTo(icon, { rotation: -10 },
  { rotation: 0, duration: 0.8,
    ease: "wob" });`,
    Demo: WobbleIconDemo,
  },
  {
    id: "tracking-out",
    name: "Tracking exp.",
    plugin: "letterSpacing",
    cat: "hover",
    blurb: "Le titre s'espace progressivement — tension typographique au survol.",
    code: `enter: gsap.to(".title", {
  letterSpacing: "0.5em",
  duration: 0.5, ease: "power3.out" });`,
    Demo: TrackingOutDemo,
  },
  {
    id: "reveal-actions",
    name: "Actions cachées",
    plugin: "x + fade",
    cat: "hover",
    blurb: "Les boutons d'action glissent depuis la droite — lignes de tableau, listes de fichiers.",
    code: `enter: gsap.to(".btns", { x: 0,
    opacity: 1, ease: "power3.out" });
  gsap.to(".label", { x: -6 });
leave: gsap.to(".btns", { x: 16, opacity: 0 });`,
    Demo: RevealActionsDemo,
  },
  {
    id: "dashed-run",
    name: "Fourmis SVG",
    plugin: "dashoffset loop",
    cat: "hover",
    blurb: "Le contour pointillé défile comme des fourmis — sélection active façon Photoshop.",
    code: `const tw = gsap.to(rect, {
  strokeDashoffset: -40, repeat: -1,
  ease: "none", paused: true });
enter: tw.play();
leave: tw.pause(); reset();`,
    Demo: DashedRunDemo,
  },
  {
    id: "text-fill-x",
    name: "Remplissage texte",
    plugin: "bg-position",
    cat: "hover",
    blurb: "Le dégradé se déplace dans le texte clippé — remplissage gauche→droite au survol.",
    code: `// background-clip: text
// gradient 50% accent / 50% faint
enter: gsap.to(el, {
  backgroundPosition: "0% 0",
  duration: 0.6 });`,
    Demo: TextFillXDemo,
  },
  {
    id: "dial-click",
    name: "Cadran clics",
    plugin: "rotation step",
    cat: "click",
    blurb: "Chaque clic avance le cadran d'un cran — sélecteur de niveau rotatif.",
    code: `gsap.to(".needle", {
  rotation: lvl * 45,
  duration: 0.5, ease: "back.out(1.8)" });`,
    Demo: DialClickDemo,
  },
  {
    id: "pin-drop",
    name: "Épingle carte",
    plugin: "bounce + ripple",
    cat: "click",
    blurb: "Le repère tombe du ciel avec rebond puis ondule — carte interactive.",
    code: `gsap.fromTo(pin, { y: -60, opacity: 0 },
  { y: 0, opacity: 1, ease: "bounce.out" });
gsap.fromTo(ring, { scale: 0.2 },
  { scale: 2.4, opacity: 0, delay: 0.45 });`,
    Demo: PinDropDemo,
  },
  {
    id: "flash-snap",
    name: "Flash photo",
    plugin: "opacity flash",
    cat: "click",
    blurb: "L'écran flash blanc + le cadre se recompose — capture d'écran, obturateur.",
    code: `tl.to(".flash", { opacity: 1,
    duration: 0.06 })
  .to(".flash", { opacity: 0,
    duration: 0.5 })
  .fromTo(".frame", { scale: 0.94 },
    { scale: 1 }, 0);`,
    Demo: FlashSnapDemo,
  },
  {
    id: "radio-pop",
    name: "Radio pop",
    plugin: "back.out scale",
    cat: "click",
    blurb: "Le point radio naît avec un dépassement — micro-interaction de formulaire.",
    code: `gsap.fromTo(".dot", { scale: 0 },
  { scale: 1, duration: 0.4,
    ease: "back.out(3)" });`,
    Demo: RadioPopDemo,
  },
  {
    id: "size-select",
    name: "Pilule taille",
    plugin: "x + width",
    cat: "click",
    blurb: "L'indicateur glisse et se redimensionne sous l'option choisie — S/M/L/XL.",
    code: `pick: gsap.to(ind, {
  x: btn.offsetLeft,
  width: btn.offsetWidth,
  duration: 0.35, ease: "power3.inOut" });`,
    Demo: SizeSelectDemo,
  },
  {
    id: "knob-value",
    name: "Molette valeur",
    plugin: "Draggable y→rotation",
    cat: "drag",
    blurb: "Drag vertical qui fait tourner l'aiguille — potard audio, contrôle fin.",
    code: `Draggable.create(proxy, { type: "y",
  trigger: knob,
  bounds: { minY: -100, maxY: 0 },
  onDrag() {
    v = -this.y;
    gsap.set(needle,
      { rotation: -135 + v * 2.7 });
  }});`,
    Demo: KnobValueDemo,
  },
  {
    id: "box-resize",
    name: "Poignée 2D",
    plugin: "Draggable x,y",
    cat: "drag",
    blurb: "Le coin tire la boîte en deux dimensions — redimensionnement direct.",
    code: `Draggable.create(handle, {
  type: "x,y",
  onDrag() {
    gsap.set(box, {
      w: clamp(70, 190, 120 + this.x),
      h: clamp(50, 130, 70 + this.y) });
  }});`,
    Demo: BoxResizeDemo,
  },
  {
    id: "arc-slider",
    name: "Slider circulaire",
    plugin: "Draggable rotation",
    cat: "drag",
    blurb: "La molette tourne autour de l'arc — type rotation de Draggable en action.",
    code: `Draggable.create(handle, {
  type: "rotation",
  bounds: { minRotation: -135,
    maxRotation: 135 },
  onDrag() {
    v = (this.rotation + 135) / 2.7;
  }});`,
    Demo: ArcSliderDemo,
  },
  {
    id: "scrub-num",
    name: "Nombre scrubbable",
    plugin: "Draggable trigger",
    cat: "drag",
    blurb: "Glisser horizontalement sur la valeur pour l'ajuster — pattern Figma/inspecteur.",
    code: `Draggable.create(proxy, { type: "x",
  trigger: ".value",
  bounds: { minX: 0, maxX: 200 },
  onDrag() { v = this.x / 2; }});`,
    Demo: ScrubNumDemo,
  },
  {
    id: "neon-flicker",
    name: "Néon défectueux",
    plugin: "opacity steps",
    cat: "loop",
    blurb: "Le tube clignote de façon irrégulière puis se stabilise — enseigne, glitch lumineux.",
    code: `const tl = gsap.timeline({
  repeat: -1, repeatDelay: 1.6 });
[1,.4,1,.9,.2,1,...].forEach((o) =>
  tl.to(".neon", { opacity: o,
    duration: 0.06 }));`,
    Demo: NeonFlickerDemo,
  },
  {
    id: "sine-wave",
    name: "Onde sinus",
    plugin: "attr d morph",
    cat: "loop",
    blurb: "Le chemin SVG ondule entre deux formes — attr plugin sur l'attribut d.",
    code: `gsap.to(path, {
  attr: { d: WAVE_B },
  duration: 1.8, ease: "sine.inOut",
  repeat: -1, yoyo: true });`,
    Demo: SineWaveDemo,
  },
  {
    id: "liquid-fill",
    name: "Remplissage liquide",
    plugin: "rotation + yPercent",
    cat: "loop",
    blurb: "L'eau monte dans le cercle avec surface ondulante — jauge organique.",
    code: `gsap.to(wave, { rotation: 360,
  repeat: -1, duration: 5, ease: "none" });
gsap.fromTo(wave, { yPercent: 42 },
  { yPercent: -38, duration: 6,
    repeat: -1 });`,
    Demo: LiquidFillDemo,
  },
  {
    id: "border-run",
    name: "Bordure conique",
    plugin: "conic rotation",
    cat: "loop",
    blurb: "Le gradient conique tourne derrière le cadre — bordure énergique permanente.",
    code: `gsap.to(".spin", { rotation: 360,
  repeat: -1, duration: 4, ease: "none" });
// conic-gradient(from 0deg,
//   transparent, accent 18%, transparent)`,
    Demo: BorderRunDemo,
  },
  {
    id: "ecg-line",
    name: "Tracé ECG",
    plugin: "DrawSVG segment",
    cat: "loop",
    blurb: "Le segment lumineux parcourt le tracé cardiaque — monitoring, dashboard santé.",
    code: `gsap.fromTo(path,
  { drawSVG: "0% 22%" },
  { drawSVG: "78% 100%",
    duration: 1.6, ease: "none",
    repeat: -1 });`,
    Demo: EcgLineDemo,
  },
  {
    id: "scroll-bg",
    name: "Fond par zone",
    plugin: "backgroundColor",
    cat: "scroll",
    blurb: "Chaque section teinte le fond de la page — chapitres colorés.",
    code: `onScroll: idx = floor(scrollP * 4);
gsap.to(frame, {
  backgroundColor: zones[idx],
  duration: 0.6 });`,
    Demo: ScrollBgDemo,
  },
  {
    id: "media-shrink",
    name: "Média rétracté",
    plugin: "scale + radius",
    cat: "scroll",
    blurb: "Le visuel plein cadre se replie en carte arrondie au scroll — hero Apple-style.",
    code: `onScroll: gsap.set(media, {
  scale: 1 - p * 0.32,
  borderRadius: p * 18,
  y: p * 14 });`,
    Demo: MediaShrinkDemo,
  },
  {
    id: "section-tilt",
    name: "Section basculée",
    plugin: "rotationX scroll",
    cat: "scroll",
    blurb: "La section qui sort bascule vers l'arrière en perdant opacité — transition 3D.",
    code: `onScroll: p = clamp(0,1,scrollTop/140);
gsap.set(card, {
  rotationX: p * -14,
  opacity: 1 - p * 0.4,
  transformOrigin: "50% 100%" });`,
    Demo: SectionTiltDemo,
  },
  {
    id: "product-360",
    name: "Vue 360°",
    plugin: "quickTo rotationY",
    cat: "media",
    blurb: "La souris fait pivoter le produit — spin e-commerce piloté par le pointeur.",
    code: `const qy = gsap.quickTo(el,
  "rotationY", { duration: 0.4 });
onmousemove: p = x / width;
qy(p * 340 - 170);`,
    Demo: Product360Demo,
  },
  {
    id: "video-hover",
    name: "Aperçu vidéo",
    plugin: "crossfade + play",
    cat: "media",
    blurb: "Le poster s'efface et la lecture démarre au survol — preview Netflix-style.",
    code: `enter: tw.play();
  gsap.to(poster, { opacity: 0 });
  gsap.to(live, { opacity: 1 });
leave: tw.pause(); reverse;`,
    Demo: VideoHoverDemo,
  },
  {
    id: "focus-pull",
    name: "Mise au point",
    plugin: "blur swap",
    cat: "media",
    blurb: "La netteté bascule du premier plan vers l'arrière — rack focus cinéma.",
    code: `gsap.to(front, { filter:
    front ? "blur(0px)" : "blur(5px)" });
gsap.to(back, { filter:
    front ? "blur(5px)" : "blur(0px)" });`,
    Demo: FocusPullDemo,
  },
  {
    id: "color-grade",
    name: "Étalonnage",
    plugin: "filter presets",
    cat: "media",
    blurb: "Cycles de presets de filtre — noir, chaud, froid — comme un LUT instantané.",
    code: `gsap.to(img, {
  filter: presets[g],
  duration: 0.6, ease: "power2.inOut" });
// grayscale / sepia / hue-rotate`,
    Demo: ColorGradeDemo,
  },
  {
    id: "float-figure",
    name: "Figure flottante",
    plugin: "scroll reveal",
    cat: "edito",
    blurb: "L'image flottée dans le texte se révèle au scroll — mise en page magazine.",
    code: `if (scrollP > 0.25 && !shown)
  gsap.fromTo(fig, { x: -18, opacity: 0 },
    { x: 0, opacity: 1,
      ease: "power3.out" });`,
    Demo: FloatFigureDemo,
  },
  {
    id: "big-numbers",
    name: "Grands numéros",
    plugin: "scroll stagger",
    cat: "edito",
    blurb: "Numérotation géante en filigrane qui glisse derrière chaque étape.",
    code: `reveal: gsap.fromTo(num,
  { x: -30, opacity: 0 },
  { x: 0, opacity: 0.16,
    ease: "power3.out" });`,
    Demo: BigNumbersDemo,
  },
  {
    id: "end-mark",
    name: "Signe de fin",
    plugin: "back.out scale",
    cat: "edito",
    blurb: "Le carré de fin d'article claque à la dernière ligne — signature typographique.",
    code: `if (scrollP > 0.97 && !done)
  gsap.fromTo(mark,
    { scale: 0, rotation: -30 },
    { scale: 1, rotation: 0,
      ease: "back.out(2.5)" });`,
    Demo: EndMarkDemo,
  },
  {
    id: "title-track",
    name: "Titre étiré",
    plugin: "letterSpacing scroll",
    cat: "edito",
    blurb: "Le tracking du titre s'élargit avec la descente — titre qui respire au scroll.",
    code: `onScroll: gsap.set(title, {
  letterSpacing: p * 0.35 + "em",
  opacity: 1 - p * 0.3 });`,
    Demo: TitleTrackDemo,
  },
  {
    id: "read-time",
    name: "Temps de lecture",
    plugin: "DrawSVG + count",
    cat: "edito",
    blurb: "L'anneau se remplit pendant que les minutes comptent — badge read-time animé.",
    code: `tl.fromTo(ring, { drawSVG: "0%" },
  { drawSVG: "75%", duration: 1.4 })
  .to(o, { v: 3, onUpdate: () =>
    label = ~~o.v + " MIN" }, 0);`,
    Demo: ReadTimeDemo,
  },
  {
    id: "page-turn",
    name: "Page tournée",
    plugin: "rotationY origin",
    cat: "page",
    blurb: "La feuille pivote sur sa tranche gauche — livre, album, flipbook.",
    code: `tl.to(top, { rotationY: -160,
  transformOrigin: "left center",
  duration: 0.8, ease: "power2.in" })
  .call(nextPage)
  .set(top, { rotationY: 0 });`,
    Demo: PageTurnDemo,
  },
  {
    id: "static-zap",
    name: "Parasite TV",
    plugin: "repeatRefresh",
    cat: "page",
    blurb: "Les tuiles flashent en désordre avant la bascule — transition statique/glitch.",
    code: `tl.to(tiles, {
  opacity: () => Math.random()*0.9 + 0.1,
  duration: 0.07, repeat: 5,
  repeatRefresh: true }) // valeurs
  // recalculées à chaque boucle
  .to(tiles, { opacity: 0 });`,
    Demo: StaticZapDemo,
  },
  {
    id: "intro-logo",
    name: "Logo tracé",
    plugin: "DrawSVG intro",
    cat: "page",
    blurb: "La marque se dessine puis le nom arrive en cascade — intro de site signature.",
    code: `tl.fromTo(mark, { drawSVG: "0%" },
  { drawSVG: "100%", duration: 1 })
  .fromTo(chars, { opacity: 0, y: 8 },
    { opacity: 1, y: 0, stagger: 0.05 });`,
    Demo: IntroLogoDemo,
  },
  {
    id: "next-project",
    name: "Projet suivant",
    plugin: "height takeover",
    cat: "page",
    blurb: "La bande du bas s'ouvre en pleine page — footer portfolio 'next project'.",
    code: `gsap.to(teaser, {
  height: open ? "100%" : "30%",
  duration: 0.6, ease: "power3.inOut" });
gsap.to(content, { opacity: open ? 1 : 0,
  delay: open ? 0.3 : 0 });`,
    Demo: NextProjectDemo,
  },
  {
    id: "distribute-viz",
    name: "distribute()",
    plugin: "gsap.utils",
    cat: "tools",
    blurb: "Hauteurs réparties selon from — visualise l'utilitaire distribute en direct.",
    code: `gsap.to(".bar", {
  height: gsap.utils.distribute({
    base: 18, amount: 70,
    from: "center", ease: "power1.out" }) });`,
    Demo: DistributeVizDemo,
  },
  {
    id: "wrap-util",
    name: "wrap()",
    plugin: "gsap.utils",
    cat: "tools",
    blurb: "L'index boucle proprement aux bornes — carrousels infinis sans modulo maison.",
    code: `const wrap = gsap.utils.wrap(0, 6);
wrap(7)  // → 1
wrap(-1) // → 5

dot.x = wrap(index) * 26;`,
    Demo: WrapUtilDemo,
  },
  {
    id: "lerp-color",
    name: "interpolate()",
    plugin: "gsap.utils",
    cat: "tools",
    blurb: "Le slider interpole entre deux couleurs — lerp couleur natif GSAP.",
    code: `const lerp = gsap.utils.interpolate(
  "#0ae448", "#c17bff");
const col = lerp(t); // hex interpolé`,
    Demo: LerpColorDemo,
  },
  {
    id: "map-range",
    name: "mapRange()",
    plugin: "gsap.utils",
    cat: "tools",
    blurb: "Projection d'une plage sur une autre — l'outil de mapping le plus utilisé.",
    code: `const map = gsap.utils.mapRange(
  0, W, 30, W - 30);
output = map(input);
// utile en chaine : pipe(normalize,
//   mapRange, snap)`,
    Demo: MapRangeDemo,
  },
  {
    id: "random-viz",
    name: "random()",
    plugin: "gsap.utils",
    cat: "tools",
    blurb: "Distribution aléatoire avec option snap — histogramme vivant des tirages.",
    code: `gsap.to(".bar", {
  height: () => gsap.utils.random(
    14, 90, snap ? 15 : 1),
  duration: 0.45 });
// évalué par cible`,
    Demo: RandomVizDemo,
  },
  {
    id: "m-spring",
    name: "Tap élastique",
    plugin: "spring",
    cat: "motion",
    blurb: "whileHover/whileTap avec ressort physique — la signature Motion : stiffness + damping.",
    code: `<motion.button
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.82, rotate: -3 }}
  transition={{ type: "spring",
    stiffness: 500, damping: 12 }}
/>`,
    Demo: MSpringDemo,
  },
  {
    id: "m-drag",
    name: "Carte inertie",
    plugin: "drag",
    cat: "motion",
    blurb: "Drag natif avec contraintes, élasticité et momentum — zéro plugin à installer.",
    code: `<motion.div
  drag
  dragConstraints={frameRef}
  dragElastic={0.35}
  dragMomentum
  whileDrag={{ scale: 1.08 }}
/>`,
    Demo: MDragDemo,
  },
  {
    id: "m-variants",
    name: "Cascade variants",
    plugin: "staggerChildren",
    cat: "motion",
    blurb: "Le parent orchestre, les enfants exécutent — variants déclaratifs + stagger.",
    code: `<motion.ul variants={{
  show: { transition: {
    staggerChildren: 0.07 } }}}>
  <motion.li variants={{
    hidden: { y: 18, opacity: 0 },
    show: { y: 0, opacity: 1 } }} />
</motion.ul>`,
    Demo: MVariantsDemo,
  },
  {
    id: "m-presence",
    name: "Sortie animée",
    plugin: "AnimatePresence",
    cat: "motion",
    blurb: "Les items supprimés s'animent avant de quitter le DOM — exit impossible en CSS pur.",
    code: `<AnimatePresence>
  {items.map((i) =>
    <motion.div key={i}
      layout
      exit={{ x: -50, opacity: 0 }} />)}
</AnimatePresence>`,
    Demo: MPresenceDemo,
  },
  {
    id: "m-scroll",
    name: "Progression MV",
    plugin: "useScroll",
    cat: "motion",
    blurb: "scrollYProgress du conteneur transformé en largeur — hook de scroll Motion.",
    code: `const { scrollYProgress } =
  useScroll({ container: ref });
const w = useTransform(scrollYProgress,
  [0, 1], ["2%", "100%"]);
<motion.div style={{ width: w }} />`,
    Demo: MScrollDemo,
  },
  {
    id: "m-mv-color",
    name: "Couleur pilotée",
    plugin: "useMotionValue",
    cat: "motion",
    blurb: "Le pointeur pilote une MotionValue → hue interpolée → template CSS. Zéro re-render.",
    code: `const x = useMotionValue(0.5);
const hue = useTransform(x, [0,1], [0,360]);
const bg = useMotionTemplate
  \`hsl(\${hue} 85% 55%)\`;
<motion.div style={{ background: bg }} />`,
    Demo: MMvColorDemo,
  },
  {
    id: "m-layout",
    name: "Pilule layout",
    plugin: "layoutId",
    cat: "motion",
    blurb: "Un seul layoutId partagé — Motion anime le déplacement entre positions tout seul.",
    code: `{tab === i &&
  <motion.span layoutId="pill"
    className="pill" />}
// Motion calcule et anime
// la transition automatiquement`,
    Demo: MLayoutDemo,
  },
  {
    id: "m-inview",
    name: "Entrée viewport",
    plugin: "whileInView",
    cat: "motion",
    blurb: "Reveal au scroll natif — whileInView + viewport root sur le mini-scroller.",
    code: `<motion.div
  initial={{ opacity: 0, y: 26 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ root: scrollRef,
    amount: 0.55 }}
/>`,
    Demo: MInViewDemo,
  },
  {
    id: "m-sequence",
    name: "Séquence await",
    plugin: "useAnimate",
    cat: "motion",
    blurb: "animate() en async/await — séquençage impératif lisible, équivalent timeline.",
    code: `const [scope, animate] = useAnimate();
await animate(".box", { x: 90 });
await animate(".box",
  { rotate: 180, borderRadius: "50%" });
await animate(".box", { x: 0 });`,
    Demo: MSequenceDemo,
  },
  {
    id: "m-cursor",
    name: "Curseur ressort",
    plugin: "useSpring",
    cat: "motion",
    blurb: "Le point suit la souris avec un lag physique — useSpring sur une MotionValue.",
    code: `const mx = useMotionValue(0);
const sx = useSpring(mx,
  { stiffness: 300, damping: 22 });
<motion.div style={{ x: sx, y: sy }} />`,
    Demo: MCursorDemo,
  },
  {
    id: "m-morph",
    name: "Blob keyframes",
    plugin: "animate keyframes",
    cat: "motion",
    blurb: "borderRadius en keyframes + rotation infinie — blob organique déclaratif.",
    code: `<motion.div
  animate={{
    borderRadius: ["28% 72%…","62% 38%…"],
    rotate: [0, 180, 360] }}
  transition={{ duration: 7,
    repeat: Infinity }} />`,
    Demo: MMorphDemo,
  },
  {
    id: "m-counter",
    name: "Compteur MV",
    plugin: "animate()",
    cat: "motion",
    blurb: "animate() pilote une MotionValue affichée directement — compteur sans setState.",
    code: `const mv = useMotionValue(0);
const n = useTransform(mv, Math.round);
animate(mv, 128, { duration: 1.6 });
<motion.p>{n}</motion.p>`,
    Demo: MCounterDemo,
  },
];

export const CATS: { id: EffectCat | "all" | "fav"; label: string }[] = [
  { id: "all", label: "TOUS" },
  { id: "fav", label: "FAVORIS" },
  { id: "ui", label: "COMPOSANTS" },
  { id: "edito", label: "ÉDITO" },
  { id: "media", label: "MÉDIA" },
  { id: "hover", label: "SURVOL" },
  { id: "click", label: "CLIC" },
  { id: "drag", label: "DRAG" },
  { id: "loop", label: "BOUCLE" },
  { id: "scroll", label: "SCROLL" },
  { id: "page", label: "PAGE" },
  { id: "tools", label: "OUTILS" },
  { id: "motion", label: "MOTION" },
];

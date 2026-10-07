"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Decode({
  text,
  className,
  chars = "01<>/_",
}: {
  text: string;
  className?: string;
  chars?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.to(ref.current, {
        duration: 1.3,
        scrambleText: { text, chars, speed: 0.4 },
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

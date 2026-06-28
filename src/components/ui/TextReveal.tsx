"use client";

import { useRef, useEffect } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  splitBy?: "words" | "chars";
}

export function TextReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const units =
      splitBy === "chars"
        ? children.split("")
        : children.split(" ");

    el.innerHTML = units
      .map(
        (unit, i) =>
          `<span class="inline-block overflow-hidden${splitBy === "words" && i < units.length - 1 ? " mr-[0.25em]" : ""}"><span class="reveal-unit inline-block translate-y-full">${unit === " " ? "&nbsp;" : unit}</span></span>`
      )
      .join("");

    gsap.to(el.querySelectorAll(".reveal-unit"), {
      y: 0,
      duration: 1,
      stagger: splitBy === "chars" ? 0.02 : 0.06,
      delay,
      ease: "power4.out",
    });
  }, [children, delay, splitBy]);

  return (
    <Tag
      ref={ref as never}
      className={className}
    />
  );
}

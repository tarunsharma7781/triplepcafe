"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function useGsapContext(scope: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {}, scope);
    return () => ctx.revert();
  }, [scope]);
}

export { gsap, ScrollTrigger };

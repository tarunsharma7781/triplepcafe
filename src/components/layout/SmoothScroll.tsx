"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // TEMPORARILY DISABLED to debug Android Canvas issue
  return <>{children}</>;
}

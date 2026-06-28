"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CursorFollower } from "@/components/layout/CursorFollower";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { SignatureCoffee } from "@/components/sections/SignatureCoffee";
import { InteractiveMenu } from "@/components/sections/InteractiveMenu";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Location } from "@/components/sections/Location";

const Experience3D = dynamic(
  () =>
    import("@/components/sections/Experience3D").then((m) => m.Experience3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-espresso-950">
        <div className="h-12 w-12 animate-pulse rounded-full border border-gold-500/20" />
      </div>
    ),
  }
);

export function HomePage() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <CursorFollower />
          <div className="noise-overlay" aria-hidden />
          <Navigation />
          <main>
            <Hero />
            <Experience3D />
            <Story />
            <SignatureCoffee />
            <InteractiveMenu />
            <Gallery />
            <Testimonials />
            <Location />
          </main>
          <Footer />
        </SmoothScroll>
      )}
    </>
  );
}

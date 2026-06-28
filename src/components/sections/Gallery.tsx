"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { galleryImages } from "@/lib/data/gallery";

const aspectClasses = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".gallery-item");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: i * 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden bg-espresso-950 section-padding"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-[10px] tracking-[0.5em] text-gold-500/70 uppercase">
              Gallery
            </span>
            <h2 className="mt-4 font-display text-5xl text-cream-100 md:text-6xl">
              Moments
            </h2>
          </div>
          <p className="max-w-xs text-sm text-beige-300/50">
            Glimpses into the ritual — the pour, the pause, the presence.
          </p>
        </div>

        <div className="masonry-grid">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item masonry-item group relative overflow-hidden rounded-2xl"
              data-cursor="pointer"
            >
              <div
                className={`gallery-img relative ${aspectClasses[image.aspect]} overflow-hidden`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  unoptimized={image.src.startsWith("/")}
                />
                <div className="absolute inset-0 bg-espresso-950/0 transition-colors duration-500 group-hover:bg-espresso-950/30" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-[10px] tracking-[0.3em] text-cream-100/80 uppercase">
                    {image.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

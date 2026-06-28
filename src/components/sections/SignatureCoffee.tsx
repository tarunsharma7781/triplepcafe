"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { signatureCoffees } from "@/lib/data/coffees";

export function SignatureCoffee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".coffee-card");
    gsap.fromTo(cards,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-espresso-950 section-padding"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-[10px] tracking-[0.5em] text-gold-500/70 uppercase">
              Signature Collection
            </span>
            <h2 className="mt-4 font-display text-5xl text-cream-100 md:text-6xl">
              The Pour
            </h2>
          </div>
          <p className="max-w-xs text-sm text-beige-300/50">
            Discover a curated selection of handcrafted drinks, each prepared with precision, premium ingredients, and a commitment to exceptional taste.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {signatureCoffees.map((coffee, i) => (
            <motion.article
              key={coffee.id}
              className="coffee-card group relative cursor-pointer"
              whileHover={{ y: -13, boxShadow: "0 24px 48px rgba(201,169,98,0.18)" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              data-cursor="pointer"
            >
              <div className="gradient-border relative overflow-hidden rounded-2xl glass-panel">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />

                <motion.div
                  className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle at 50% 100%, rgba(201,169,98,0.15) 0%, transparent 60%)" }}
                />

                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={coffee.image}
                    alt={coffee.name}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-hover:brightness-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
                  />
                </div>

                <div className="relative z-20 p-6">
                  <span className="text-[9px] tracking-[0.4em] text-gold-500/70 uppercase">
                    {coffee.roast}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-cream-100">
                    {coffee.name}
                  </h3>
                  <p className="mt-1 text-xs text-beige-300/50">{coffee.origin}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {coffee.notes.map((note) => (
                      <span
                        key={note}
                        className="rounded-full border border-cream-100/10 px-3 py-1 text-[9px] tracking-wider text-beige-300/60 uppercase"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <span className="font-display text-2xl text-gold-500">
                      {coffee.price}
                    </span>
                  </div>
                </div>
              </div>

              <span className="absolute -top-3 -right-3 font-display text-6xl text-cream-100/[0.03]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

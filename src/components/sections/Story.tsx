"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { ImageReveal } from "@/components/ui/ImageReveal";

export function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".story-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });

      gsap.from(".story-block", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
        },
      });

      statRefs.current.forEach((stat) => {
        if (!stat) return;
        gsap.from(stat, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
          },
        });
      });

      if (lineRef.current) {
        gsap.to(lineRef.current, {
          height: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-espresso-900 section-padding"
    >
      <div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-gold-500/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="story-line mb-16 h-px w-full bg-gradient-to-r from-gold-500/60 via-beige-300/20 to-transparent" />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="story-block lg:col-span-5">
            <span className="text-[10px] tracking-[0.5em] text-gold-500/70 uppercase">
              Our Story
            </span>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-cream-100">
              More Than
              <br />
              <span className="italic text-beige-300/50">Coffee</span>
            </h2>
          </div>

          <div className="story-block lg:col-span-7 flex items-center">
          </div>
        </div>

        <div className="relative mt-24 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 hidden h-0 w-px -translate-x-1/2 bg-gradient-to-b from-gold-500/40 via-beige-300/10 to-transparent lg:block"
          />

          <div className="story-block">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
              <ImageReveal
                src="/story-image.jpg"
                alt="Our Cafe"
                className="h-full w-full"
              />
              {/* Hover zoom overlay */}
              <div
                className="absolute inset-0 rounded-2xl transition-all duration-700 ease-out"
                style={{ background: "rgba(201,169,98,0)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(201,169,98,0.08)";
                  const img = (e.currentTarget as HTMLDivElement).previousElementSibling?.querySelector("img");
                  if (img) (img as HTMLElement).style.transform = "scale(1.05)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(201,169,98,0)";
                  const img = (e.currentTarget as HTMLDivElement).previousElementSibling?.querySelector("img");
                  if (img) (img as HTMLElement).style.transform = "scale(1)";
                }}
              />
              {/* Glass reflection */}
              <div className="pointer-events-none absolute inset-0 translate-x-[-100%] rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[100%]" />
            </div>
            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="font-display text-lg text-cream-100">Our Cafe</p>
              <p className="mt-1 text-[10px] tracking-[0.45em] text-gold-500/70 uppercase">Brighton, Australia</p>
            </div>
            <blockquote className="mt-8 font-display text-2xl italic leading-snug text-cream-100/90 md:text-3xl">
              &ldquo;Great coffee begins with great people.&rdquo;
            </blockquote>
            <cite className="mt-4 block text-[10px] tracking-[0.4em] text-gold-500/60 not-italic uppercase">
              — Triple Point
            </cite>
          </div>

          <div className="story-block flex flex-col justify-start pt-16">
            <p className="text-lg leading-relaxed text-beige-300/70 md:text-xl">
              Since opening in 2023, Triple Point has been dedicated to serving carefully crafted coffee in a welcoming space where every cup is prepared with attention to detail and every guest feels at home.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-8">
              {[
                { icon: "✦", label: "Specialty Coffee" },
                { icon: "✦", label: "Freshly Brewed" },
                { icon: "✦", label: "Handcrafted Daily" },
                { icon: "✦", label: "Open Since 2023" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => { statRefs.current[i] = el; }}
                  className="glass-panel rounded-2xl p-6"
                >
                  <span className="font-display text-4xl text-gold-500 md:text-5xl">
                    {stat.icon}
                  </span>
                  <p className="mt-2 text-[10px] tracking-[0.3em] text-beige-300/50 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-sm leading-relaxed text-beige-300/40">
              From the first grind to the final pour, every detail reflects our passion for creating memorable coffee experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

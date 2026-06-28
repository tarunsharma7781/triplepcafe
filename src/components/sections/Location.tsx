"use client";

import { useRef, useEffect } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";

const hours = [
  { day: "Monday – Friday", time: "8:30 AM – 4:00 PM" },
  { day: "Saturday – Sunday", time: "10:00 AM – 5:00 PM" },
];

export function Location() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      ".location-block",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="relative overflow-hidden bg-espresso-950 section-padding"
    >
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gold-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="text-[10px] tracking-[0.5em] text-gold-500/70 uppercase">
            Visit Us
          </span>
          <h2 className="mt-4 font-display text-5xl text-cream-100 md:text-6xl">
            Find Your Table
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">

          {/* Map */}
          <div className="location-block gradient-border group overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,169,98,0.12)]">
            <iframe
              title="Triple Point Coffee Brighton"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.3856768327!2d-0.13954682313995!3d50.82780597166235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875850561b70fd9%3A0xc2d82f8b8e1e8f1e!2s53%20Gardner%20St%2C%20Brighton%20BN1%201UP%2C%20UK!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk"
              className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              style={{
                height: "100%",
                minHeight: "600px",
                filter: "brightness(0.82) contrast(1.18) saturate(1.05)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-6">

            {/* Address */}
            <div className="location-block glass-panel rounded-3xl p-8 md:p-10">
              <h3 className="font-display text-2xl text-cream-100">Triple Point Coffee</h3>
              <address className="mt-6 space-y-2 text-sm not-italic text-beige-300/60">
                <p>53 Gardner Street</p>
                <p>Brighton BN1 1UP</p>
                <p>United Kingdom</p>
                <p className="pt-3">
                  <a
                    href="https://instagram.com/triplepoint_coffee"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-gold-500"
                    data-cursor="pointer"
                  >
                    @triplepoint_coffee
                  </a>
                </p>
              </address>
            </div>

            {/* Hours */}
            <div className="location-block glass-panel rounded-3xl p-8 md:p-10">
              <h3 className="text-[10px] tracking-[0.4em] text-gold-500/70 uppercase">
                Open Daily
              </h3>
              <ul className="mt-6 space-y-4">
                {hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between border-b border-cream-100/5 pb-3 text-sm"
                  >
                    <span className="text-beige-300/50">{h.day}</span>
                    <span className="text-cream-100">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reserve */}
            <div className="location-block glass-panel rounded-3xl p-8 md:p-10">
              <h3 className="text-[10px] tracking-[0.4em] text-gold-500/70 uppercase">
                Reserve a Table
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-beige-300/50">
                Book your visit and enjoy specialty coffee crafted with care in the heart of Brighton.
              </p>
              <div className="mt-6">
                <MagneticButton href="mailto:hello@triplepoint.coffee?subject=Table%20Reservation">
                  Reserve Now
                </MagneticButton>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

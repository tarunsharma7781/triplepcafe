"use client";

import { testimonials } from "@/lib/data/testimonials";

function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <div className="glass-panel-gold mx-4 w-[380px] shrink-0 rounded-2xl p-8 md:w-[420px]">
      <div className="mb-6 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-1 w-4 rounded-full bg-gold-500/40" />
        ))}
      </div>
      <blockquote className="font-display text-xl leading-relaxed text-cream-100/90 italic md:text-2xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/10 font-display text-sm text-gold-500">
          {author.charAt(0)}
        </div>
        <div>
          <p className="text-sm text-cream-100">{author}</p>
          <p className="text-[10px] tracking-[0.2em] text-beige-300/50 uppercase">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden bg-espresso-900 py-24">
      <div className="mb-12 text-center">
        <span className="text-[10px] tracking-[0.5em] text-gold-500/70 uppercase">
          Testimonials
        </span>
        <h2 className="mt-4 font-display text-4xl text-cream-100 md:text-5xl">
          Voices of the Room
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-espresso-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-espresso-900 to-transparent" />

        <div className="marquee-track hover:[animation-play-state:paused]">
          {doubled.map((t, i) => (
            <TestimonialCard
              key={`${t.id}-${i}`}
              quote={t.quote}
              author={t.author}
              role={t.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

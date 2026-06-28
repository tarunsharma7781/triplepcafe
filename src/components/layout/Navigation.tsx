"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#story", label: "Story" },
  { href: "#experience", label: "Experience" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Visit" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 px-6 py-5 md:px-10"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-3 transition-all duration-700 ${
          scrolled ? "glass-panel mt-2" : ""
        }`}
      >
        <a
          href="#"
          className="group flex items-center gap-3"
          data-cursor="pointer"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/30 text-[10px] tracking-widest text-gold-500">
            TP
          </span>
          <span className="hidden font-display text-lg tracking-wide text-cream-100 sm:block">
            Triple Point
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-[11px] tracking-[0.25em] text-beige-300/80 uppercase transition-colors hover:text-cream-100"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#visit"
          className="rounded-full border border-gold-500/30 px-5 py-2 text-[10px] tracking-[0.3em] text-gold-500 uppercase transition-all hover:border-gold-500/60 hover:bg-gold-500/10"
          data-cursor="pointer"
        >
          Reserve
        </a>
      </nav>
    </motion.header>
  );
}

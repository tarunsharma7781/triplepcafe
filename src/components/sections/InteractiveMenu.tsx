"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  menuCategories,
  menuItems,
  type MenuCategory,
} from "@/lib/data/menu";

export function InteractiveMenu() {
  const [active, setActive] = useState<MenuCategory>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    active === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === active);

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-espresso-900 section-padding"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-[10px] tracking-[0.5em] text-gold-500/70 uppercase">
            The Menu
          </span>
          <h2 className="mt-4 font-display text-5xl text-cream-100 md:text-6xl">
            Curated Selection
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActive(cat.id);
                setExpanded(null);
              }}
              className="relative rounded-full px-6 py-2.5 text-[10px] tracking-[0.3em] uppercase transition-colors"
              data-cursor="pointer"
            >
              {active === cat.id && (
                <motion.span
                  layoutId="menu-pill"
                  className="absolute inset-0 rounded-full border border-gold-500/30 bg-gold-500/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  active === cat.id ? "text-gold-500" : "text-beige-300/50"
                }`}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        <motion.div
          className="mt-12 space-y-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const isOpen = expanded === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="gradient-border overflow-hidden rounded-2xl glass-panel"
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-8"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-display text-xl text-cream-100 md:text-2xl">
                        {item.name}
                      </span>
                      {item.highlight && (
                        <span className="rounded-full border border-gold-500/20 px-3 py-0.5 text-[8px] tracking-[0.3em] text-gold-500 uppercase">
                          {item.highlight}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-display text-lg text-gold-500">
                        {item.price}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-100/10 text-cream-100/40"
                      >
                        +
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-cream-100/5 px-6 pb-6 md:px-8 md:pb-8">
                          <p className="text-sm leading-relaxed text-beige-300/60">
                            {item.description}
                          </p>
                          <p className="mt-4 text-[9px] tracking-[0.4em] text-beige-300/30 uppercase">
                            {item.category.replace("-", " ")}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

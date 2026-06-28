"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/triplepoint_coffee",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/triplepoint_coffee",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@triplepoint_coffee",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
];

const toastMessages: Record<string, string> = {
  Privacy: "Privacy Policy — Coming Soon",
  Terms: "Terms & Conditions — Coming Soon",
  Careers: "Careers — Coming Soon",
};

function Toast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center gap-3 rounded-2xl px-5 py-4"
      style={{
        background: "rgba(26,22,18,0.88)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(201,169,98,0.25)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <span className="text-sm text-gold-500">✦</span>
      <span className="text-[11px] tracking-[0.15em] text-cream-100">{message}</span>
    </motion.div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((link: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(toastMessages[link]);
    timerRef.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <footer className="relative border-t border-cream-100/5 bg-espresso-950">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 font-display text-sm text-gold-500">
                TP
              </span>
              <span className="font-display text-2xl text-cream-100">
                Triple Point
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-beige-300/40">
              Precision roasted. Thoughtfully served. A coffee experience
              designed for those who notice the details.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.4em] text-gold-500/70 uppercase">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-beige-300/50">
              Origin stories, new roasts, and early access to cupping events.
            </p>
            {submitted ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-sm text-gold-500"
              >
                Welcome to the inner circle.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-full border border-cream-100/10 bg-espresso-900/50 px-5 py-3 text-sm text-cream-100 placeholder:text-beige-300/30 outline-none transition-colors focus:border-gold-500/30"
                />
                <button
                  type="submit"
                  className="rounded-full bg-cream-100 px-6 py-3 text-[10px] tracking-[0.3em] text-espresso-950 uppercase transition-all hover:shadow-[0_0_30px_var(--gold-glow)]"
                  data-cursor="pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.4em] text-gold-500/70 uppercase">
              Connect
            </h3>
            <div className="mt-6 flex gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-cream-100/10 text-cream-100/70 transition-colors duration-300 hover:border-gold-500/40 hover:text-gold-500"
                  whileHover={{ y: -4, boxShadow: "0 8px 24px var(--gold-glow)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  data-cursor="pointer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-cream-100/5 pt-8 md:flex-row">
          <p className="text-[10px] tracking-[0.3em] text-beige-300/30 uppercase">
            © {new Date().getFullYear()} Triple Point Coffee
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Careers"].map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => showToast(link)}
                className="text-[10px] tracking-[0.3em] text-beige-300/30 uppercase transition-colors hover:text-beige-300/60"
                data-cursor="pointer"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[9999]">
        <AnimatePresence mode="wait">
          {toast && <Toast key={toast} message={toast} />}
        </AnimatePresence>
      </div>
    </footer>
  );
}

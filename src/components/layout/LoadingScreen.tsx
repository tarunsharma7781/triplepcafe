"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + Math.random() * 18 + 4;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-espresso-950"
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      >
        <div className="relative mb-12">
          <motion.div
            className="h-16 w-16 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at 40% 35%, #5c4536 0%, #3d2f24 40%, #2a221c 70%, #1a1612 100%)",
              boxShadow: "inset -4px -6px 12px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,255,255,0.08)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-gold-500/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.p
          className="font-display text-3xl tracking-[0.35em] text-cream-100 uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Triple Point
        </motion.p>

        <motion.p
          className="mt-2 text-xs tracking-[0.5em] text-beige-300/60 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Coffee
        </motion.p>

        <div className="mt-16 h-px w-48 overflow-hidden bg-espresso-700">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-gold-500 to-transparent"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <motion.span
          className="mt-4 font-mono text-[10px] tracking-widest text-beige-300/40"
          key={Math.floor(progress)}
        >
          {Math.min(Math.floor(progress), 100).toString().padStart(3, "0")}
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
}

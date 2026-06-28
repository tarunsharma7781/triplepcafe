"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    };

    const onLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const base =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-[11px] tracking-[0.3em] uppercase transition-all duration-500";
  const variants = {
    primary:
      "bg-cream-100 text-espresso-950 hover:shadow-[0_0_40px_var(--gold-glow)]",
    ghost:
      "border border-cream-100/20 text-cream-100 hover:border-gold-500/40 hover:text-gold-500",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-gold-400/0 via-gold-400/30 to-gold-400/0"
          style={{ backgroundSize: "200% 100%" }}
          animate={{ backgroundPosition: ["200% center", "-200% center"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        data-cursor="pointer"
        style={{ transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)" }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      data-cursor="pointer"
      style={{ transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)" }}
    >
      {content}
    </button>
  );
}

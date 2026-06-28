"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";

function CoffeeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; rotation: number; rotSpeed: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      }));
    };

    const drawBean = (x: number, y: number, size: number, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = "#5c4536";
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 1.4, size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#3d2f24";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(size * 0.5, 0, 0, size);
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) { p.x -= dx * 0.002; p.y -= dy * 0.002; }
        p.x += p.speedX; p.y += p.speedY; p.rotation += p.rotSpeed;
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;
        drawBean(p.x, p.y, p.size, p.opacity, p.rotation);
      });
      animationId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    resize(); init(); animate();
    window.addEventListener("resize", () => { resize(); init(); });
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" aria-hidden />;
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.setProperty("--parallax-x", `${x}px`);
      el.style.setProperty("--parallax-y", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-20 md:pb-28"
      style={{ "--parallax-x": "0px", "--parallax-y": "0px" } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(92,69,54,0.35)_0%,transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(201,169,98,0.08)_0%,transparent_40%),linear-gradient(180deg,var(--espresso-950)_0%,var(--espresso-900)_100%)]"
        style={{ transform: "translate(var(--parallax-x), var(--parallax-y))", transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)" }}
      />

      <CoffeeParticles />

      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(201,169,98,0.25) 0%, transparent 70%)",
          transform: "translate(calc(-50% + var(--parallax-x)), calc(-50% + var(--parallax-y)))",
        }}
      />

      <div className="section-padding relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span className="h-px w-12 bg-gold-500/50" />
          <span className="text-[10px] tracking-[0.5em] text-gold-500/80 uppercase">
            Est. 2023 · Specialty Coffee
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <TextReveal
            as="h1"
            className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.9] tracking-tight text-cream-100"
            delay={1.5}
          >
            Triple Point
          </TextReveal>
        </div>

        <div className="mt-4 overflow-hidden md:ml-[20%]">
          <TextReveal
            as="p"
            className="font-display text-[clamp(1.5rem,4vw,3rem)] italic text-beige-300/70 leading-[1.1]"
            delay={2.1}
          >
            Where Every Cup
          </TextReveal>
          <TextReveal
            as="p"
            className="font-display text-[clamp(1.5rem,4vw,3rem)] italic text-beige-300/70 leading-[1.1]"
            delay={2.2}
          >
            Becomes a Memory
          </TextReveal>
        </div>

        <motion.p
          className="mt-10 max-w-md text-sm leading-relaxed tracking-wide text-beige-300/60 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        >
          Every cup is brewed with intention, every detail refined, creating an experience you&apos;ll remember long after the last sip.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.8 }}
        >
          <MagneticButton href="#menu" variant="primary">Explore Menu</MagneticButton>
          <MagneticButton href="#visit" variant="ghost">Book a Table</MagneticButton>
        </motion.div>

        <motion.div
          className="absolute right-8 bottom-32 hidden flex-col items-center gap-3 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
        >
          <span className="text-[9px] tracking-[0.4em] text-beige-300/40 [writing-mode:vertical-lr]">SCROLL</span>
          <motion.span
            className="block h-16 w-px bg-gradient-to-b from-gold-500/60 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}

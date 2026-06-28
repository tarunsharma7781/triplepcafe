"use client";

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

/* ─── Mouse tracker shared ref ─── */
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

function CoffeeCup() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/cup_of_cappuccino.glb");
  const cloned = useMemo(() => scene.clone(), [scene]);

  useFrame(() => {
    if (!groupRef.current) return;
    mouse.tx += (mouse.x - mouse.tx) * 0.06;
    mouse.ty += (mouse.y - mouse.ty) * 0.06;
    groupRef.current.rotation.y = mouse.tx * 0.5;
    groupRef.current.rotation.x = -mouse.ty * 0.25;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.5}>
        <primitive
          object={cloned}
          scale={8}
          position={[0, -0.6, 0]}
          rotation={[0, -Math.PI / 5, 0]}
          castShadow
          receiveShadow
        />
      </Float>
    </group>
  );
}

useGLTF.preload("/cup_of_cappuccino.glb");

function Steam() {
  const count = 120;
  const ref = useRef<THREE.Points>(null);

  const [positions, meta] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const m = Array.from({ length: count }, (_, i) => ({
      speed: 0.004 + Math.random() * 0.006,
      xOff: (Math.random() - 0.5) * 0.35,
      zOff: (Math.random() - 0.5) * 0.35,
      phase: Math.random() * Math.PI * 2,
      life: Math.random(),
    }));
    m.forEach((p, i) => {
      pos[i * 3] = p.xOff;
      pos[i * 3 + 1] = 0.5 + p.life * 1.2;
      pos[i * 3 + 2] = p.zOff;
    });
    return [pos, m];
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    meta.forEach((p, i) => {
      p.life += p.speed;
      const drift = mouse.tx * 0.3;
      arr[i * 3] = p.xOff + Math.sin(p.life * 4 + p.phase) * 0.08 + drift * p.life;
      arr[i * 3 + 1] = 0.45 + p.life * 1.4;
      arr[i * 3 + 2] = p.zOff + Math.cos(p.life * 3 + p.phase) * 0.06;
      if (p.life > 1) {
        p.life = 0;
        p.xOff = (Math.random() - 0.5) * 0.3;
        p.zOff = (Math.random() - 0.5) * 0.3;
      }
    });
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#f5f0e8"
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Beans() {
  const groupRef = useRef<THREE.Group>(null);
  const beans = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        angle: (i / 10) * Math.PI * 2,
        radius: 1.3 + (i % 3) * 0.18,
        y: (Math.random() - 0.5) * 0.7,
        speed: 0.12 + (i % 5) * 0.025,
        scale: 0.07 + (i % 3) * 0.025,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const b = beans[i];
      const parallaxX = mouse.tx * 0.15;
      const parallaxY = mouse.ty * 0.1;
      child.position.x = Math.cos(t * b.speed + b.angle) * b.radius + parallaxX;
      child.position.z = Math.sin(t * b.speed + b.angle) * b.radius;
      child.position.y = b.y + Math.sin(t * 0.7 + b.phase) * 0.12 - parallaxY;
      child.rotation.x = t * 0.4 + b.phase;
      child.rotation.z = t * 0.25;
    });
  });

  return (
    <group ref={groupRef}>
      {beans.map((b, i) => (
        <mesh key={i} scale={b.scale}>
          <sphereGeometry args={[1, 12, 8]} />
          <meshStandardMaterial
            color="#2a1506"
            roughness={0.55}
            metalness={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

function GoldenGlow() {
  return (
    <>
      <pointLight position={[0, 0.5, 1.5]} intensity={3} color="#c9a962" distance={5} decay={2} />
      <pointLight position={[-2, 1, -1]} intensity={1.2} color="#d4af37" distance={6} decay={2} />
      <ambientLight intensity={0.35} color="#f5e6c8" />
      <spotLight position={[0, 6, 3]} angle={0.35} penumbra={1} intensity={4} color="#fff8e7" />
    </>
  );
}

function Scene() {
  return (
    <Suspense fallback={null}>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.7}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
        makeDefault
      />
      <GoldenGlow />
      <CoffeeCup />
      <Steam />
      <Beans />
      <ContactShadows position={[0, -0.68, 0]} opacity={0.5} scale={4} blur={2} far={2} color="#0a0806" frames={1} />
    </Suspense>
  );
}

export function Experience3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // On mobile Lenis can prevent IntersectionObserver from firing
    // Use a simple scroll listener as fallback
    const el = containerRef.current;
    if (!el) return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.1) {
        setInView(true);
        window.removeEventListener("scroll", check, true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.01, rootMargin: "200px" }
    );
    observer.observe(el);
    window.addEventListener("scroll", check, { passive: true, capture: true });
    // Also check immediately in case already in view
    check();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", check, true);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => gsap.to(mouse, { x: 0, y: 0, duration: 1.5, ease: "power3.out" });
    const el = containerRef.current;
    el?.addEventListener("mousemove", onMove);
    el?.addEventListener("mouseleave", onLeave);
    return () => {
      el?.removeEventListener("mousemove", onMove);
      el?.removeEventListener("mouseleave", onLeave);
    };
  }, [inView]);

  return (
    <section
      id="experience"
      className="relative min-h-screen overflow-hidden bg-espresso-950"
    >
      <div className="section-padding relative z-10 mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center">
        <div className="lg:w-2/5">
          <span className="text-[10px] tracking-[0.5em] text-gold-500/70 uppercase">
            Immersive
          </span>
          <h2 className="mt-4 font-display text-5xl leading-tight text-cream-100 md:text-6xl lg:text-7xl">
            Every Visit,
            <br />
            <span className="text-gradient-gold">A Quiet Ritual</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-beige-300/60">
            Every cup is prepared with patience, precision, and purpose.
            From the first aroma to the final sip, every detail is designed
            to slow time down and make every visit memorable.
          </p>
        </div>

        <div ref={containerRef} className="relative flex-1" style={{ height: "clamp(300px, 50vh, 70vh)" }}>
          {/* Outer glass container */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(201,169,98,0.06) 0%, rgba(26,22,18,0.4) 50%, rgba(10,8,6,0.7) 100%)",
              backdropFilter: "blur(32px)",
              border: "1px solid rgba(201,169,98,0.12)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.5)",
              overflow: "hidden",
              borderRadius: "1.5rem",
            }}
          >
            {/* Golden glow behind cup */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "55%",
                height: "55%",
                background: "radial-gradient(circle, rgba(201,169,98,0.22) 0%, rgba(201,169,98,0.08) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {inView ? (
              <Canvas
                camera={{ position: [0, 0.4, 3.8], fov: 42 }}
                dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "default",
                  preserveDrawingBuffer: false,
                  failIfMajorPerformanceCaveat: false,
                }}
                style={{
                  background: "transparent",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              >
                <Scene />
              </Canvas>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 animate-pulse rounded-full border border-gold-500/30" />
              </div>
            )}

            {/* Bottom hint text */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
              <p className="text-[9px] tracking-[0.45em] text-beige-300/40 uppercase whitespace-nowrap">
                Move your cursor to explore craftsmanship
              </p>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-px w-4 rounded-full bg-gold-500/30"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

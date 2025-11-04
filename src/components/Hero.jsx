import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const MagneticButton = ({ children, href }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.2);
    y.set(dy * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const ButtonTag = href ? 'a' : 'button';

  return (
    <motion.div style={{ x: springX, y: springY }} onMouseMove={handleMouseMove} onMouseLeave={reset} ref={ref} className="inline-block">
      <ButtonTag href={href} className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-emerald-300 text-gray-900 font-semibold shadow-lg shadow-sky-500/20 dark:shadow-emerald-500/10 hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-300">
        <span className="absolute inset-0 rounded-xl bg-white/30 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition pointer-events-none" />
        {children}
      </ButtonTag>
    </motion.div>
  );
};

const Counter = ({ from = 0, to = 100, duration = 1.2 }) => {
  const { current: start } = useRef(performance.now());
  const value = useMotionValue(from);
  const progress = useSpring(value, { stiffness: 120, damping: 20 });

  React.useEffect(() => {
    let raf = 0;
    const tick = (t) => {
      const elapsed = (t - start) / 1000;
      const p = Math.min(1, elapsed / duration);
      const v = Math.floor(from + (to - from) * p);
      value.set(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration, start, value]);

  const [display, setDisplay] = React.useState(from);
  React.useEffect(() => progress.on('change', (v) => setDisplay(Math.round(v))), [progress]);

  return <span>{display}</span>;
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] grid place-items-center overflow-hidden bg-gradient-to-br from-black via-slate-900 to-slate-800 dark:from-black dark:via-slate-900 dark:to-slate-800">
      <div className="absolute inset-0">
        {/* Spline cover background (auto-enhanced asset) */}
        <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Non-blocking gradient overlays */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(0,201,255,0.15),transparent),radial-gradient(800px_400px_at_80%_60%,rgba(146,254,157,0.15),transparent)]" />

      <motion.div style={{ y: y1 }} className="absolute -top-16 right-10 w-72 h-72 rounded-full bg-gradient-to-tr from-[#00C9FF] to-[#92FE9D] opacity-20 blur-3xl pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute top-40 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-[#92FE9D] to-[#00C9FF] opacity-20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
          Full‑Stack Mobile Developer
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-4 text-lg sm:text-xl text-slate-200">
          Kotlin & Flutter specialist crafting high‑performance apps with delightful, Apple‑inspired interactions.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }} className="mt-8 flex items-center justify-center gap-4">
          <MagneticButton href="#projects">View Projects</MagneticButton>
          <MagneticButton href="#contact">Get in Touch</MagneticButton>
        </motion.div>

        <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10 text-white">
            <div className="text-3xl font-bold"><Counter to={5} />+ yrs</div>
            <div className="text-sm text-slate-200/80">Experience</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10 text-white">
            <div className="text-3xl font-bold"><Counter to={25} />+</div>
            <div className="text-sm text-slate-200/80">Projects shipped</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10 text-white">
            <div className="text-3xl font-bold"><Counter to={10} />+</div>
            <div className="text-sm text-slate-200/80">Happy clients</div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="flex flex-col items-center text-slate-300">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <span className="mt-2 h-8 w-[2px] bg-gradient-to-b from-white/60 to-transparent rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

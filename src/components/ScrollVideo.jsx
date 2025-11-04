import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Scroll-animated video reveal with play/pause on visibility
const ScrollVideo = () => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 12]);
  const shadow = useTransform(scrollYProgress, [0, 1], [0.15, 0.35]);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIntersecting(entry.isIntersecting);
      },
      { root: null, threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isIntersecting) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isIntersecting]);

  return (
    <section ref={ref} aria-labelledby="demo-video-title" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 id="demo-video-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center">
          Scroll‑Animated Demo Video
        </motion.h2>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-300">Auto‑plays when visible. Subtle scale, rounded corners, and depth ramp in as you scroll.</p>

        <motion.div style={{ scale }} className="mt-10 relative">
          <motion.div
            style={{ borderRadius: radius, boxShadow: shadow.to((s) => `0 20px 60px rgba(0,0,0,${s})`) }}
            className="overflow-hidden border border-black/5 dark:border-white/10 bg-black/80 backdrop-blur"
          >
            <video
              ref={videoRef}
              src="https://cdn.coverr.co/videos/coverr-coding-on-a-laptop-4095/1080p.mp4"
              className="w-full h-auto"
              playsInline
              muted
              loop
              preload="metadata"
              aria-label="Demo reel showing app interactions"
            />
          </motion.div>
          {/* Floating caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur border border-black/5 dark:border-white/10 text-sm text-gray-900 dark:text-white"
          >
            Built with Kotlin, Flutter, and delightful motion.
          </motion.div>
        </motion.div>
      </div>

      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_80%,rgba(0,201,255,0.12),transparent),radial-gradient(800px_400px_at_80%_20%,rgba(146,254,157,0.12),transparent)]" />
    </section>
  );
};

export default ScrollVideo;

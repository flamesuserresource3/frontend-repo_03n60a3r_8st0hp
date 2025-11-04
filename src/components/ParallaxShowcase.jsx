import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Advanced parallax band with multi‑depth layers and interactive cards
const ParallaxShowcase = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Layered parallax speeds
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFg = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <section ref={ref} aria-labelledby="parallax-title" className="relative py-28 overflow-hidden">
      {/* Background gradients (do not block interactions) */}
      <motion.div style={{ y: yBg1 }} aria-hidden className="pointer-events-none absolute -top-32 -left-24 w-[42rem] h-[42rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,201,255,0.14),transparent)] blur-3xl" />
      <motion.div style={{ y: yBg2 }} aria-hidden className="pointer-events-none absolute -bottom-40 -right-24 w-[42rem] h-[42rem] rounded-full bg-[radial-gradient(closest-side,rgba(146,254,157,0.14),transparent)] blur-3xl" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <motion.h2 id="parallax-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Deep Parallax Experiments
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="mt-2 text-gray-600 dark:text-gray-300">
            Layers glide at different speeds while cards subtly rotate and scale as you scroll.
          </motion.p>
        </div>

        <motion.div style={{ scale }} className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { title: 'Kotlin KMM', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop', badge: 'Android' },
            { title: 'Flutter Motion', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop', badge: 'Flutter' },
            { title: 'CI/CD Automation', img: 'https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1200&auto=format&fit=crop', badge: 'DevOps' },
          ].map((c, i) => (
            <motion.article
              key={c.title}
              style={{ y: yFg, rotate }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-sm"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={c.img} alt={c.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/70 text-white text-xs px-2 py-1 backdrop-blur-sm">{c.badge}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{c.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Performance‑oriented builds with smooth animations and rock‑solid architecture.</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxShowcase;

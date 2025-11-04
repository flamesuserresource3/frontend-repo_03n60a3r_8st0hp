import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: 'Wellness Coach',
    desc: 'Flutter app with gRPC backend and Firebase auth.',
    tech: ['Flutter', 'Dart', 'gRPC', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?q=80&w=1200&auto=format&fit=crop',
    category: 'Flutter',
  },
  {
    id: 2,
    title: 'FinTrack',
    desc: 'Kotlin Multiplatform finance manager with offline sync.',
    tech: ['Kotlin', 'SQLDelight', 'KMM'],
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop',
    category: 'Kotlin',
  },
  {
    id: 3,
    title: 'Foodie Delivery',
    desc: 'Flutter + Node.js real‑time delivery with Mapbox.',
    tech: ['Flutter', 'Node.js', 'WebSocket'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop',
    category: 'Flutter',
  },
  {
    id: 4,
    title: 'IoT Home',
    desc: 'Android Kotlin app controlling IoT devices via MQTT.',
    tech: ['Kotlin', 'MQTT', 'Spring Boot'],
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
    category: 'Kotlin',
  },
];

const TiltCard = ({ children }) => {
  const [style, setStyle] = useState({ transform: 'rotateX(0) rotateY(0)' });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -10;
    const ry = ((x - rect.width / 2) / rect.width) * 10;
    setStyle({ transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)` });
  };

  const reset = () => setStyle({ transform: 'rotateX(0) rotateY(0) scale(1)' });

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ perspective: '1000px' }}
      className="group"
    >
      <div style={{ transformStyle: 'preserve-3d', transition: 'transform 200ms ease' }} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
        <div style={{ transform: 'translateZ(35px)' }} className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Flutter', 'Kotlin'];

  const filtered = useMemo(() => {
    if (filter === 'All') return projectsData;
    return projectsData.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-b from-transparent to-slate-900/20 dark:to-black/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Featured Projects
        </motion.h2>

        <div className="mt-6 flex items-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm transition border ${
                filter === f
                  ? 'bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] text-gray-900 border-transparent'
                  : 'bg-white/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-black/5 dark:border-white/10 hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((p) => (
            <motion.article
              key={p.id}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className=""
            >
              <TiltCard>
                <div className="relative">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white border border-white/10">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

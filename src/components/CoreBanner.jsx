import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Rocket } from 'lucide-react';

export default function CoreBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <section ref={ref} id="core-banner" className="relative overflow-hidden py-20">
      <motion.div style={{ y, opacity }} className="mx-auto max-w-6xl px-6">
        <div className="relative isolate overflow-hidden rounded-3xl border border-gray-200/70 bg-white/80 p-10 shadow-xl backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200/70 backdrop-blur dark:bg-white/10 dark:text-gray-200 dark:ring-white/10">
                <Rocket className="h-4 w-4" /> Core Project
              </span>
              <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">Realtime Commerce Platform for Mobile</h3>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                A production-ready mobile experience powered by Kotlin + Flutter frontends and a Golang backend with gRPC and GraphQL. Offline-first sync, live updates, and a modular architecture.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Kotlin', 'Flutter', 'gRPC', 'GraphQL', 'REST', 'Room', 'Bloc'].map((t) => (
                  <span key={t} className="rounded-full border border-gray-200/70 bg-white px-2.5 py-1 text-xs text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-gray-200">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm"
                >
                  Explore Case Study <ExternalLink className="h-4 w-4" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 px-4 py-2 text-sm text-gray-700 dark:border-white/10 dark:text-gray-200">
                  Get in touch
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200/70 shadow-sm dark:border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1557825835-70d97c4aa567?q=80&w=1600&auto=format&fit=crop"
                  alt="Core Project Preview"
                  className="h-full w-full object-cover"
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute -inset-x-10 -top-10 h-40 bg-gradient-to-b from-sky-400/10 via-transparent to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

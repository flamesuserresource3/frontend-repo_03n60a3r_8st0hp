import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Network, Database, Server, Smartphone } from 'lucide-react';

const categories = [
  {
    title: 'Mobile',
    icon: Smartphone,
    items: ['Kotlin', 'Flutter', 'Jetpack Compose', 'XML'],
  },
  {
    title: 'Networking',
    icon: Network,
    items: ['Dio', 'Retrofit', 'Ktor', 'gRPC', 'GraphQL', 'REST API'],
  },
  {
    title: 'State Management',
    icon: Layers,
    items: ['Bloc', 'Cubit'],
  },
  {
    title: 'Database',
    icon: Database,
    items: ['Room'],
  },
  {
    title: 'Backend',
    icon: Server,
    items: ['Golang'],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 22 } },
};

export default function TechStack() {
  return (
    <section id="tech" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Tech Stack Mastery</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Technologies I use to build robust, scalable mobile experiences.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map(({ title, icon: Icon, items }) => (
            <motion.div key={title} variants={item} className="rounded-2xl border border-gray-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] text-gray-900">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-medium">{title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((chip) => (
                  <span key={chip} className="rounded-full border border-gray-200/70 bg-white px-2.5 py-1 text-xs text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-gray-200">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sky-400/10 via-transparent to-transparent blur-2xl" />
    </section>
  );
}

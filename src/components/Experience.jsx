import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    role: 'Senior Mobile Engineer',
    company: 'NovaTech Labs',
    url: 'https://example.com',
    period: '2022 — Present',
    location: 'Remote',
    achievements: [
      'Led Kotlin Multiplatform modules shared across Android & iOS',
      'Shipped Flutter feature flags pipeline reducing release risk by 40%',
      'Optimized cold start by 28% via lazy feature loading & baseline profiles',
    ],
    stack: ['Kotlin', 'Flutter', 'KMP', 'Compose', 'Swift', 'CI/CD'],
  },
  {
    role: 'Mobile Developer',
    company: 'Pixel Foundry',
    url: 'https://example.com',
    period: '2020 — 2022',
    location: 'Berlin, DE',
    achievements: [
      'Built real‑time collaboration with WebSockets & Firestore',
      'Implemented offline‑first sync with conflict resolution',
      'Introduced motion design system with Lottie + MotionLayout',
    ],
    stack: ['Flutter', 'Dart', 'Android', 'Firebase', 'Lottie'],
  },
  {
    role: 'Junior Android Engineer',
    company: 'AppWorks',
    url: 'https://example.com',
    period: '2018 — 2020',
    location: 'Warsaw, PL',
    achievements: [
      'Migrated legacy app to MVVM with coroutines & Flow',
      'Increased unit test coverage from 18% → 65%',
      'Set up fastlane for automated store deployments',
    ],
    stack: ['Kotlin', 'Coroutines', 'Flow', 'MVVM', 'Fastlane'],
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
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Experience</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">A few highlights from recent roles and projects.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 rounded-full border border-gray-200/60 bg-white/70 px-4 py-2 text-sm shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <Briefcase className="h-4 w-4" />
            <span>7+ years building mobile products</span>
          </div>
        </div>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative border-s border-gray-200 dark:border-white/10"
        >
          {experiences.map((exp, idx) => (
            <motion.li key={idx} variants={item} className="ms-6 pb-10 last:pb-0">
              <span className="absolute -start-3 mt-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0a0c12]">
                <Briefcase className="h-3.5 w-3.5" />
              </span>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="text-lg font-medium leading-tight">
                  {exp.role} ·{' '}
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4 hover:text-sky-600 dark:hover:text-sky-400"
                  >
                    {exp.company}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-white/10 dark:text-gray-300">
                  <Calendar className="h-3.5 w-3.5" /> {exp.period}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-white/10 dark:text-gray-300">
                  <MapPin className="h-3.5 w-3.5" /> {exp.location}
                </span>
              </div>

              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-600 dark:text-gray-300">
                {exp.achievements.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {exp.stack.map((chip, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-gray-200/70 bg-white px-2.5 py-1 text-xs text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>

      {/* soft gradient accent */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-40 bg-gradient-to-b from-sky-400/10 via-transparent to-transparent blur-2xl" />
    </section>
  );
}

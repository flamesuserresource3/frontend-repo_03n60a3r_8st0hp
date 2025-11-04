import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar, Hero, Projects, ParallaxShowcase, ScrollVideo, Contact, Splash } from './components';

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return true;
    const seen = localStorage.getItem('seen_splash');
    return seen !== '1';
  });

  const reduceMotion = useMemo(
    () => (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || false,
    []
  );

  useEffect(() => {
    if (!showSplash) localStorage.setItem('seen_splash', '1');
  }, [showSplash]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: reduceMotion ? 0.15 : 0.4, ease: 'easeInOut' } },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#05060a] dark:text-white selection:bg-sky-300/40">
      {/* Subtle cosmic background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_10%_10%,rgba(0,201,255,0.08),transparent),radial-gradient(900px_450px_at_90%_70%,rgba(146,254,157,0.08),transparent)]" />

      <Navbar />

      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div key="splash" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Splash onOpen={() => setShowSplash(false)} />
          </motion.div>
        ) : (
          <motion.main key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Hero />
            <Projects />
            <ParallaxShowcase />
            <ScrollVideo />
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

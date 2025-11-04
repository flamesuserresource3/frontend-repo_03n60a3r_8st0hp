import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Splash from './components/Splash';

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0b0c10] dark:text-white selection:bg-sky-300/40">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.02, filter: 'blur(2px)' }} transition={{ duration: 0.6 }}>
            <Splash onOpen={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div key="main" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <Navbar />
            <main>
              <Hero />
              <Projects />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

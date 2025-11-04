import React from 'react';
import { Navbar, Hero, Projects, ParallaxShowcase } from './components';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0b0c10] dark:text-white selection:bg-sky-300/40">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <ParallaxShowcase />
      </main>
    </div>
  );
}

export default App;

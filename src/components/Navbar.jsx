import React, { useEffect, useState } from 'react';
import { Moon, Sun, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = localStorage.getItem('theme');
    const shouldDark = initial ? initial === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', shouldDark);
    setIsDark(shouldDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 bg-white/80 dark:bg-black/30 border-b border-black/5 dark:border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight text-gray-900 dark:text-white text-lg">Kotlin • Flutter • Full‑Stack</a>
        <div className="hidden md:flex items-center gap-6">
          <a href="#projects" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Projects</a>
          <a href="#contact" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Contact</a>
          <a href="mailto:hello@example.com" aria-label="Email" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"><Mail size={18} /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"><Github size={18} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"><Linkedin size={18} /></a>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-gray-900 dark:text-gray-100 hover:scale-105 transition">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

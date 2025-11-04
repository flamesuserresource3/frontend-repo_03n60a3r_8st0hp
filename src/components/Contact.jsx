import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || !form.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Contact
        </motion.h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Have a project in mind? I’d love to hear about it.</p>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-6"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                <input id="name" name="name" value={form.name} onChange={onChange} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-transparent px-3 py-2 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-300" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                <input id="email" name="email" value={form.email} onChange={onChange} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-transparent px-3 py-2 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-300" />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={onChange} rows={5} className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-transparent px-3 py-2 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-300" />
            </div>
            <div className="mt-6">
              <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] text-gray-900 font-semibold shadow hover:scale-[1.01] transition">
                <Send size={18} /> Send Message
              </button>
              {status === 'success' && (
                <span role="status" className="ml-3 text-sm text-emerald-500">Message sent!</span>
              )}
              {status === 'error' && (
                <span role="alert" className="ml-3 text-sm text-rose-500">Please fill all fields correctly.</span>
              )}
            </div>
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Let’s build something great</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Available for freelance, contract, or full‑time roles. Based in EU, working worldwide.</p>
              <div className="mt-6 flex items-center gap-4">
                <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-black/10"><Mail size={18} /> Email</a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-black/10"><Github size={18} /> GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-black/10"><Linkedin size={18} /> LinkedIn</a>
              </div>
            </div>
            <footer className="pt-10 text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} — Kotlin & Flutter Specialist</footer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

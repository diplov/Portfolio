import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalData } from '../data/personalData';
import ThemeToggle from './ThemeToggle';


const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const pos = window.scrollY + 120;
      for (const link of navLinks) {
        const id = link.href.replace('#', '');
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const initials = personalData.name.split(' ').slice(0, 2).map(w => w[0]).join('');

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'dark:bg-[rgba(2,4,9,0.92)] bg-[rgba(240,244,255,0.92)] backdrop-blur-xl border-b dark:border-[rgba(0,255,247,0.12)] border-[rgba(0,80,200,0.15)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 hex-border bg-[rgba(0,255,247,0.08)] border border-[rgba(0,255,247,0.4)] flex items-center justify-center">
            <span className="font-['Orbitron'] text-sm font-bold neon-text-cyan">{initials}</span>
          </div>
          <div>
            <div className="font-['Orbitron'] text-xs font-bold text-white tracking-widest leading-tight">
              {personalData.name.split(' ')[0].toUpperCase()}
            </div>
            <div className="font-['Share_Tech_Mono'] text-[10px] text-[#00fff7] tracking-widest">
              SOFTWARE ENGINEER
            </div>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = active === id;
            return (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 font-['Orbitron'] text-[10px] tracking-widest transition-all duration-300 ${
                  isActive ? 'text-[#00fff7] dark:text-[#00fff7]' : 'text-[rgba(10,22,40,0.6)] dark:text-[rgba(220,235,255,0.7)] hover:text-[#0055cc] dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 border border-[rgba(0,255,247,0.3)] bg-[rgba(0,255,247,0.05)]"
                    style={{ clipPath: 'polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)' }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </button>
            );
          })}
        </div>

        {/* Status indicator */}
      {/* Status indicator + Theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 border border-[rgba(0,255,247,0.2)] bg-[rgba(0,255,247,0.04)]" style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00fff7] pulse-ring" />
            <span className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.7)] tracking-widest">ONLINE</span>
          </div>
          {/* <ThemeToggle /> */}
        </div>

        {/* Mobile menu btn */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={menuOpen ? { rotate: i === 1 ? 90 : i === 0 ? 45 : -45, y: i === 0 ? 8 : i === 2 ? -8 : 0, opacity: i === 1 ? 0 : 1 } : { rotate: 0, y: 0, opacity: 1 }}
              className="w-5 h-0.5 bg-[#00fff7]"
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[rgba(2,4,9,0.98)] border-b border-[rgba(0,255,247,0.12)] px-6 pb-4"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-3 font-['Orbitron'] text-xs tracking-widest text-[#e2eaf2] font-bold hover:text-[#00fff7] border-b border-[rgba(0,255,247,0.05)] transition-colors"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

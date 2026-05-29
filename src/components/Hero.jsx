import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import RotatingShape from './3d/RotatingShape';
import { personalData } from '../data/personalData';

const TYPED_STRINGS = [
  'Software Engineer',
  'Full Stack Developer',
  'UI/UX Craftsman',
  'Problem Solver',
];

function useTypingEffect(strings, speed = 80, pause = 1800) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx % strings.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx(i => i + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx]);

  return text;
}

export default function Hero() {
  const typed = useTypingEffect(TYPED_STRINGS);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D bg */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <RotatingShape />
        </Canvas>
      </div>

      {/* Horizontal scan lines */}
      <div className="absolute inset-0 z-0 pointer-events-none scan-line" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Status bar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-3 py-1 border border-[rgba(0,255,247,0.3)] bg-[rgba(0,255,247,0.05)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00fff7] pulse-ring" />
                <span className="font-['Share_Tech_Mono'] text-[10px] text-[#00fff7] tracking-widest">SYSTEM ACTIVE</span>
              </div>
              <span className="font-['Share_Tech_Mono'] text-[10px] text-white font-semibold">
                {time.toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-['Share_Tech_Mono'] text-sm text-[#00fff7] tracking-[0.3em] mb-3"
            >
              &gt; HELLO, I'M
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              data-text={personalData.name.toUpperCase()}
              className="glitch font-['Orbitron'] text-4xl md:text-6xl font-black mb-4 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #00fff7 0%, #bf00ff 50%, #00fff7 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradShift 4s ease infinite',
              }}
            >
              {personalData.name.toUpperCase()}
            </motion.h1>

            <style>{`
              @keyframes gradShift {
                0%,100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
            `}</style>

            {/* Typed role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <span className="font-['Share_Tech_Mono'] text-lg md:text-2xl text-white font-bold">
                &lt;{typed}<span className="neon-text-cyan">_</span>&gt;
              </span>
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-[#e2eaf2] font-semibold text-base max-w-lg mb-10 leading-relaxed"
            >
              {personalData.summary?.substring(0, 180)}...
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={scrollToContact}
                className="cyber-btn px-8 py-3 bg-[rgba(0,255,247,0.08)] border border-[rgba(0,255,247,0.5)] text-[#00fff7] hover:bg-[rgba(0,255,247,0.15)] hover:shadow-[0_0_20px_rgba(0,255,247,0.3)] transition-all duration-300"
                style={{ clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
              >
                INITIALIZE CONTACT
              </button>
              {/* <a
                href={personalData.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn px-8 py-3 border border-[rgba(191,0,255,0.5)] text-[#bf00ff] font-bold hover:bg-[rgba(191,0,255,0.08)] hover:shadow-[0_0_20px_rgba(191,0,255,0.3)] transition-all duration-300"
                style={{ clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 100%, 12px 100%)' }}
              >
                VIEW PORTFOLIO
              </a> */}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-8 mt-12 pt-8 border-t border-[rgba(0,255,247,0.1)]"
            >
              {[
                { val: '2+', label: 'YEARS EXP' },
                { val: '10+', label: 'PROJECTS' },
                { val: '3', label: 'CERTS' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-['Orbitron'] text-2xl font-bold neon-text-cyan">{s.val}</div>
                  <div className="font-['Share_Tech_Mono'] text-[10px] text-white font-semibold tracking-widest">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side decorative panel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="hidden lg:block relative"
          >
            <div className="relative cyber-card corner-accent rounded-none p-8 float-anim"
              style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)' }}>
              <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.9)] tracking-widest mb-4">// PROFILE DATA</div>
              {[
                { k: 'NAME', v: personalData.name },
                { k: 'ROLE', v: personalData.title || 'Software Engineer' },
                { k: 'LOCATION', v: personalData.location || 'Nepal' },
                { k: 'STATUS', v: 'AVAILABLE FOR HIRE' },
                { k: 'SPECIALIZATION', v: 'Full Stack Dev' },
              ].map(({ k, v }, i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-3 py-3 border-b border-[rgba(0,255,247,0.06)]"
                >
                  <span className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.9)] tracking-widest min-w-[100px]">{k}:</span>
                  <span className="font-['Rajdhani'] text-sm text-white font-bold">{v}</span>
                </motion.div>
              ))}
              <div className="mt-4 pt-4">
                <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.9)] mb-2 tracking-widest">SKILL MATRIX</div>
                {[
                  { label: 'Frontend', pct: 90 },
                  { label: 'Backend', pct: 85 },
                  { label: 'Database', pct: 80 },
                ].map(({ label, pct }) => (
                  <div key={label} className="mb-2">
                    <div className="flex justify-between text-[10px] font-['Share_Tech_Mono'] text-white font-semibold mb-1">
                      <span>{label}</span><span>{pct}%</span>
                    </div>
                    <div className="h-1 bg-[rgba(0,255,247,0.1)] w-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#00fff7] to-[#bf00ff]"
                        style={{ boxShadow: '0 0 8px rgba(0,255,247,0.6)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40"
      >
        <span className="font-['Share_Tech_Mono'] text-[10px] tracking-widest text-[#00fff7]">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#00fff7] to-transparent" />
      </motion.div>
    </section>
  );
}

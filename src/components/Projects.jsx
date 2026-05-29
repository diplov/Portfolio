import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../data/personalData';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function Projects() {
  const [hovered, setHovered] = useState(null);

  // NEW COLOR PALETTE (more modern & readable)
  const colors = [
    { border: '#ff3366', glow: 'rgba(255,51,102,0.4)', text: '#ff3366' },     // Neon Pink
    { border: '#ff6600', glow: 'rgba(255,102,0,0.4)', text: '#ff6600' },       // Vivid Orange
    { border: '#00ccff', glow: 'rgba(0,204,255,0.4)', text: '#00ccff' },       // Electric Cyan
    { border: '#9933ff', glow: 'rgba(153,51,255,0.4)', text: '#9933ff' },      // Bright Purple
    { border: '#00ff88', glow: 'rgba(0,255,136,0.4)', text: '#00ff88' },       // Neon Green
    { border: '#ffcc00', glow: 'rgba(255,204,0,0.4)', text: '#ffcc00' },       // Bright Yellow
  ];

  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-['Share_Tech_Mono'] text-xs text-[rgba(0,255,247,0.9)] tracking-[0.4em] mb-3">// MODULE_05</div>
          <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold text-white section-title-line">KEY PROJECTS</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {personalData.projects?.map((project, i) => {
            const c = colors[i % colors.length];
            const isHov = hovered === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="cyber-card relative overflow-hidden"
                style={{
                  borderColor: isHov ? c.border : 'rgba(200,216,232,0.06)',
                  boxShadow: isHov ? `0 0 30px ${c.glow}, inset 0 0 30px rgba(0,0,0,0.5)` : 'none',
                  transform: isHov ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.35s ease',
                }}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${c.border}, transparent)`, opacity: isHov ? 1 : 0.3 }} />

                {/* Index */}
                <div className="absolute top-4 right-4 font-['Orbitron'] text-4xl font-black opacity-10 text-white">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="p-6">
                  {/* Project name */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-2 h-2 mt-2 flex-shrink-0" style={{ background: c.border, boxShadow: `0 0 8px ${c.border}` }} />
                    <h3 className="font-['Orbitron'] text-base font-bold text-white leading-tight">
                      {project.name}
                    </h3>
                  </div>

                  {/* Tech stack */}
                  <div className="font-['Share_Tech_Mono'] text-[10px] tracking-wider mb-4 pl-5" style={{ color: c.text }}>
                    {project.tech}
                  </div>

                  {/* Description */}
                  <p className="text-[#e2eaf2] font-semibold font-['Rajdhani'] text-sm leading-relaxed pl-5 mb-6">
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3 pl-5">
                    <button
                      className="flex items-center gap-2 px-4 py-2 font-['Share_Tech_Mono'] text-[10px] tracking-wider border transition-all duration-300 hover:scale-105"
                      style={{
                        borderColor: `${c.border}50`,
                        color: c.text,
                        background: `${c.border}08`,
                        clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${c.border}20`; e.currentTarget.style.boxShadow = `0 0 12px ${c.glow}`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = `${c.border}08`; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <FiGithub size={12} /> SOURCE
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 font-['Share_Tech_Mono'] text-[10px] tracking-wider border transition-all duration-300 hover:scale-105"
                      style={{
                        borderColor: `${c.border}50`,
                        color: c.text,
                        background: `${c.border}08`,
                        clipPath: 'polygon(0% 0%, calc(100% - 6px) 0%, 100% 100%, 6px 100%)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${c.border}20`; e.currentTarget.style.boxShadow = `0 0 12px ${c.glow}`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = `${c.border}08`; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <FiExternalLink size={12} /> DEPLOY
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../data/personalData';

const categories = [
  { key: 'frontend', label: 'FRONTEND', color: '#00fff7', glow: 'rgba(0,255,247,0.4)' },
  { key: 'backend', label: 'BACKEND', color: '#00ff88', glow: 'rgba(0,255,136,0.4)' },
  { key: 'database', label: 'DATABASE', color: '#bf00ff', glow: 'rgba(191,0,255,0.4)' },
  { key: 'languages', label: 'LANGUAGES', color: '#ffd700', glow: 'rgba(255,215,0,0.4)' },
  { key: 'other', label: 'OTHER', color: '#ff6b6b', glow: 'rgba(255,107,107,0.4)' },
];

export default function Skills() {
  const [active, setActive] = useState('frontend');
  const cat = categories.find(c => c.key === active);
  const skills = personalData.skills?.[active] || [];

  return (
    <section id="skills" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-['Share_Tech_Mono'] text-xs text-[rgba(0,255,247,0.9)] tracking-[0.4em] mb-3">// MODULE_03</div>
          <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold text-white section-title-line">TECHNICAL SKILLS</h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              data-active={active === c.key}
              className="skills-category-btn px-5 py-2 font-['Orbitron'] text-[10px] tracking-widest transition-all duration-300"
              style={{
                border: `1px solid ${active === c.key ? c.color : 'rgba(200,216,232,0.1)'}`,
                background: active === c.key ? `${c.color}14` : 'transparent',
                color: active === c.key ? c.color : 'rgba(220,235,255,0.85)',
                boxShadow: active === c.key ? `0 0 16px ${c.glow}` : 'none',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              }}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="cyber-card p-8"
          style={{ borderColor: `${cat.color}30` }}
        >
          <div className="font-['Share_Tech_Mono'] text-[10px] mb-6" style={{ color: `${cat.color}80` }}>
            // {cat.label}_STACK.init()
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="skill-chip px-4 py-2 font-['Share_Tech_Mono'] text-xs tracking-wider transition-all duration-200"
                style={{
                  border: `1px solid ${cat.color}30`,
                  background: `${cat.color}08`,
                  color: cat.color,
                  clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                  boxShadow: `0 0 0 transparent`,
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 14px ${cat.glow}`; e.currentTarget.style.borderColor = cat.color; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${cat.color}30`; }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All skills matrix */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((c, ci) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActive(c.key)}
              className="cyber-card p-4 text-center group"
              style={{ cursor: 'pointer', borderColor: active === c.key ? `${c.color}50` : undefined }}
            >
              <div className="skill-matrix-number font-['Orbitron'] text-2xl font-bold mb-1">
                {personalData.skills?.[c.key]?.length || 0}
              </div>
              <div className="skill-matrix-label font-['Share_Tech_Mono'] text-[9px] tracking-widest">
                {c.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
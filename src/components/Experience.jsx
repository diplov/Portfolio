import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalData } from '../data/personalData';

export default function Experience() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-['Share_Tech_Mono'] text-xs text-[rgba(0,255,247,0.9)] tracking-[0.4em] mb-3">// MODULE_04</div>
          <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold text-white section-title-line">WORK EXPERIENCE</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00fff7] via-[rgba(0,255,247,0.3)] to-transparent hidden md:block" />

          <div className="space-y-6">
            {personalData.experience?.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 w-5 h-5 -translate-x-1/2 hidden md:block">
                  <div className="w-full h-full border border-[#00fff7] bg-[#020409] rotate-45"
                    style={{ boxShadow: i === expanded ? '0 0 12px #00fff7' : 'none' }} />
                  {i === expanded && (
                    <div className="absolute inset-1.5 bg-[#00fff7]" style={{ boxShadow: '0 0 8px #00fff7' }} />
                  )}
                </div>

                <div
                  className="cyber-card p-6 cursor-pointer"
                  style={{ borderColor: i === expanded ? 'rgba(0,255,247,0.4)' : undefined }}
                  onClick={() => setExpanded(expanded === i ? -1 : i)}
                >
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="font-['Orbitron'] text-base font-bold text-white mb-1">{exp.title}</div>
                      <div className="font-['Share_Tech_Mono'] text-sm neon-text-cyan">{exp.company}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-['Share_Tech_Mono'] text-[10px] px-3 py-1 border border-[rgba(0,255,247,0.2)] text-[#00fff7] tracking-wider">
                        {exp.period}
                      </span>
                      <div className={`w-4 h-4 border border-[rgba(0,255,247,0.4)] flex items-center justify-center transition-transform duration-300 ${expanded === i ? 'rotate-180' : ''}`}>
                        <div className="w-1.5 h-1.5 border-b border-r border-[#00fff7] rotate-45 -translate-y-0.5" />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-5 border-t border-[rgba(0,255,247,0.1)]">
                          <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.85)] tracking-widest mb-3">// RESPONSIBILITIES</div>
                          <ul className="space-y-2">
                            {exp.responsibilities?.map((r, j) => (
                              <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.05 }}
                                className="flex items-start gap-3 text-[#e2eaf2] font-bold font-['Rajdhani'] text-sm"
                              >
                                <span className="text-[#00fff7] mt-0.5 flex-shrink-0">▸</span>
                                {r}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

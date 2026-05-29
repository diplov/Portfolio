import React from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../data/personalData';
import { FiAward, FiBookOpen, FiCode, FiCpu } from 'react-icons/fi';

const SectionHeader = ({ tag, title }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mb-16"
  >
    <div className="font-['Share_Tech_Mono'] text-xs text-[rgba(0,255,247,0.9)] tracking-[0.4em] mb-3">{tag}</div>
    <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold text-white section-title-line">{title}</h2>
  </motion.div>
);

export default function About() {
  const stats = [
    { icon: <FiCode size={20} />, value: '2+', label: 'Years Experience' },
    { icon: <FiBookOpen size={20} />, value: '3', label: 'Certifications' },
    { icon: <FiAward size={20} />, value: '1', label: 'Awards Won' },
    { icon: <FiCpu size={20} />, value: '10+', label: 'Projects Built' },
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="// MODULE_02" title="ABOUT ME" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="cyber-card corner-accent p-8 mb-6 relative">
              <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.85)] tracking-widest mb-4">// WHO_AM_I.exe</div>
              <p className="text-[#e2eaf2] font-bold leading-relaxed font-['Rajdhani'] text-base">
                {personalData.summary}
              </p>
            </div>

            {/* Education */}
            <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.85)] tracking-widest mb-4">// EDUCATION_LOG</div>
            <div className="space-y-3">
              {personalData.education?.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="cyber-card p-5 flex items-start gap-4"
                >
                  <div className="mt-1 w-2 h-2 bg-[#00fff7] flex-shrink-0" style={{ boxShadow: '0 0 8px #00fff7' }} />
                  <div>
                    <div className="font-['Orbitron'] text-sm font-semibold text-white">{edu.degree}</div>
                    <div className="text-[#e2eaf2] font-semibold text-sm font-['Rajdhani']">{edu.institution}</div>
                    <div className="font-['Share_Tech_Mono'] text-[10px] text-[#00fff7] mt-1">{edu.period}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="cyber-card p-5 text-center"
                >
                  <div className="flex justify-center neon-text-cyan mb-2">{s.icon}</div>
                  <div className="font-['Orbitron'] text-2xl font-bold neon-text-cyan">{s.value}</div>
                  <div className="font-['Share_Tech_Mono'] text-[10px] text-white font-semibold tracking-wider mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div className="cyber-card p-6 mb-4">
              <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.85)] tracking-widest mb-4">// ACHIEVEMENTS_DB</div>
              <ul className="space-y-2">
                {personalData.achievements?.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#e2eaf2] font-bold font-['Rajdhani'] text-sm">
                    <span className="text-[#ffd700] mt-0.5">▸</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Training */}
            <div className="cyber-card p-6">
              <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.85)] tracking-widest mb-4">// TRAINING_&_CERTS</div>
              <ul className="space-y-2">
                {personalData.training?.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#e2eaf2] font-bold font-['Rajdhani'] text-sm">
                    <span className="text-[#bf00ff] mt-0.5">▸</span>
                    <span><span className="text-white">{t.name}</span> — {t.organization}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

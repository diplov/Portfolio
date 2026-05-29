import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../data/personalData';
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiSend } from 'react-icons/fi';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = form;
    if (!name || !email || !message) return;

    // Build mailto URL
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:${personalData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Show success message
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const contactItems = [
    { icon: <FiMail size={16} />, label: 'EMAIL', value: personalData.email, href: `mailto:${personalData.email}` },
    { icon: <FiPhone size={16} />, label: 'PHONE', value: personalData.phone, href: `tel:${personalData.phone}` },
    { icon: <FiMapPin size={16} />, label: 'LOCATION', value: personalData.location, href: null },
    { icon: <FiGlobe size={16} />, label: 'PORTFOLIO', value: 'OPEN PORTFOLIO', href: personalData.portfolioUrl },
  ];

  const inputClass = (field) => `
    w-full bg-[rgba(0,0,0,0.4)] border font-['Share_Tech_Mono'] text-sm text-white font-bold
    px-4 py-3 outline-none transition-all duration-300 tracking-wider placeholder-[rgba(200,216,232,0.2)]
    ${focused === field
      ? 'border-[rgba(0,255,247,0.6)] shadow-[0_0_15px_rgba(0,255,247,0.15)]'
      : 'border-[rgba(0,255,247,0.12)] hover:border-[rgba(0,255,247,0.25)]'}
  `;

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-['Share_Tech_Mono'] text-xs text-[rgba(0,255,247,0.9)] tracking-[0.4em] mb-3">// MODULE_06</div>
          <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold text-white section-title-line">GET IN TOUCH</h2>
          <p className="mt-6 text-white font-semibold font-['Rajdhani'] max-w-lg">
            Open for collaborations, opportunities, and interesting conversations. Ping me anytime.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="cyber-card flex items-center gap-4 p-4 group"
              >
                <div className="w-10 h-10 border border-[rgba(0,255,247,0.3)] flex items-center justify-center text-[#00fff7] flex-shrink-0 group-hover:bg-[rgba(0,255,247,0.08)] transition-all">
                  {item.icon}
                </div>
                <div>
                  <div className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(0,255,247,0.85)] tracking-[0.3em] mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="font-['Rajdhani'] text-sm text-white font-bold hover:text-[#00fff7] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-['Rajdhani'] text-sm text-white font-bold">{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Decorative terminal block */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="cyber-card p-6 mt-6 scan-line"
            >
              <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.85)] mb-3">// TERMINAL</div>
              <div className="font-['Share_Tech_Mono'] text-xs space-y-1">
                <div className="text-[#00fff7]">$ whoami</div>
                <div className="text-[#e2eaf2] font-semibold pl-2">{personalData.name}</div>
                <div className="text-[#00fff7] mt-2">$ status</div>
                <div className="text-[rgba(0,255,136,0.8)] pl-2">● AVAILABLE_FOR_HIRE</div>
                <div className="text-[#00fff7] mt-2">$ contact --init</div>
                <div className="text-white font-semibold pl-2 typing-cursor">Awaiting message</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="cyber-card corner-accent p-8">
              <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.85)] tracking-widest mb-6">// SEND_MESSAGE.exe</div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="font-['Orbitron'] text-2xl neon-text-cyan mb-3">MESSAGE SENT</div>
                  <div className="font-['Share_Tech_Mono'] text-sm text-[#00fff7]">Transmission complete. Will respond shortly.</div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(0,255,247,0.85)] tracking-widest block mb-1.5">NAME_INPUT</label>
                    <input
                      type="text"
                      required
                      placeholder="YOUR NAME"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('name')}
                    />
                  </div>
                  <div>
                    <label className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(0,255,247,0.85)] tracking-widest block mb-1.5">EMAIL_INPUT</label>
                    <input
                      type="email"
                      required
                      placeholder="YOUR EMAIL"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('email')}
                    />
                  </div>
                  <div>
                    <label className="font-['Share_Tech_Mono'] text-[9px] text-[rgba(0,255,247,0.85)] tracking-widest block mb-1.5">MESSAGE_INPUT</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="YOUR MESSAGE"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('message') + ' resize-none'}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 font-['Orbitron'] text-xs tracking-widest text-[#00fff7] border border-[rgba(0,255,247,0.4)] bg-[rgba(0,255,247,0.05)] hover:bg-[rgba(0,255,247,0.12)] hover:shadow-[0_0_20px_rgba(0,255,247,0.3)] transition-all duration-300 flex items-center justify-center gap-3"
                    style={{ clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
                  >
                    <FiSend size={14} /> TRANSMIT MESSAGE
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-[rgba(0,255,247,0.08)] flex flex-wrap justify-between items-center gap-4"
        >
          <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(200,216,232,0.8)] tracking-widest">
            © {new Date().getFullYear()} {personalData.name?.toUpperCase()} — ALL SYSTEMS OPERATIONAL
          </div>
          <div className="font-['Share_Tech_Mono'] text-[10px] text-[rgba(0,255,247,0.3)] tracking-widest">
            CRAFTED WITH ♥ + CODE
          </div>
        </motion.div>
      </div>
    </section>
  );
}
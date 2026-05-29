import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import MagicalCursor from './components/MagicalCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen dark:bg-[#020409] bg-[#eef2fc]">
        {/* Magical cursor - always on top */}
        <MagicalCursor />

        {/* Particle background */}
        <div className="fixed inset-0 z-0">
          <ParticleBackground />
        </div>

        {/* Grid overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none vignette-overlay"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,4,9,0.85) 100%)'
            }}
          />
        {/* Vignette */}
        <div className="fixed inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,4,9,0.85) 100%)' }} />

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

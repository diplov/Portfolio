import React, { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 18;

export default function MagicalCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // All state in refs — zero React re-renders
    const mouse = { x: -200, y: -200 };
    const trail = Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }));
    const sparks = [];
    let hue = 180;
    let isPointer = false;
    let isClicking = false;
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Spawn sparks
      for (let i = 0; i < 2; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1.5,
          life: 1,
          size: Math.random() * 3 + 1,
          hue,
        });
      }
      hue = (hue + 1) % 360;

      // Detect clickable — temporarily unhide canvas so elementFromPoint works on elements beneath
      canvas.style.display = 'none';
      const el = document.elementFromPoint(e.clientX, e.clientY);
      canvas.style.display = '';

      if (el) {
        const tag = el.tagName.toLowerCase();
        isPointer =
          tag === 'a' || tag === 'button' ||
          !!el.closest('a') || !!el.closest('button') ||
          el.getAttribute('role') === 'button' ||
          window.getComputedStyle(el).cursor === 'pointer';
      }
    };

    const onDown = () => { isClicking = true; };
    const onUp   = () => { isClicking = false; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update trail
      trail.unshift({ x: mouse.x, y: mouse.y });
      if (trail.length > TRAIL_LENGTH) trail.pop();

      // Draw trail orbs
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        const ratio = 1 - i / trail.length;
        const size = ratio * (isPointer ? 10 : 6);
        const alpha = ratio * 0.7;
        const h = (hue - i * 8 + 360) % 360;
        ctx.beginPath();
        ctx.arc(t.x, t.y, Math.max(size, 0.1), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h}, 100%, 65%, ${alpha})`;
        ctx.shadowBlur = 0;
        ctx.fill();
      }

      // Cursor ring
      const { x: mx, y: my } = mouse;
      const ringSize = isClicking ? 14 : isPointer ? 22 : 18;

      ctx.beginPath();
      ctx.arc(mx, my, ringSize, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue}, 100%, 70%, 0.9)`;
      ctx.lineWidth = 2;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(mx, my, 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue}, 100%, 90%)`;
      ctx.shadowBlur = 20;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.fill();

      // Pointer sparkle rays
      if (isPointer) {
        const now = Date.now() * 0.002;
        for (let r = 0; r < 6; r++) {
          const angle = (r / 6) * Math.PI * 2 + now;
          ctx.beginPath();
          ctx.moveTo(mx + Math.cos(angle) * 22, my + Math.sin(angle) * 22);
          ctx.lineTo(mx + Math.cos(angle) * 30, my + Math.sin(angle) * 30);
          ctx.strokeStyle = `hsla(${hue}, 100%, 70%, 0.5)`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 6;
          ctx.stroke();
        }
      }

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08;
        s.life -= 0.035;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(s.size * s.life, 0.1), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 100%, 70%, ${s.life})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsl(${s.hue}, 100%, 70%)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(animId);
    };
  }, []); // empty deps — runs once, never re-mounts

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
}
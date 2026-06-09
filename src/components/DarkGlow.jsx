import { useEffect, useRef } from 'react';

export default function DarkGlow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;
    let isDark = document.documentElement.classList.contains('dark');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isDark) {
        t += 0.003;
        const x1 = canvas.width * 0.25 + Math.sin(t) * 80;
        const y1 = canvas.height * 0.35 + Math.cos(t * 0.7) * 50;
        const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, 250);
        g1.addColorStop(0, 'rgba(255,111,94,0.12)');
        g1.addColorStop(1, 'rgba(255,111,94,0)');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const x2 = canvas.width * 0.75 + Math.cos(t * 0.8) * 80;
        const y2 = canvas.height * 0.65 + Math.sin(t * 1.1) * 50;
        const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, 200);
        g2.addColorStop(0, 'rgba(245,178,62,0.09)');
        g2.addColorStop(1, 'rgba(245,178,62,0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}

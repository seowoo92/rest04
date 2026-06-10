import { useTheme } from '../context/ThemeContext';

export default function DarkGlow() {
  const { dark } = useTheme();
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '500px',
          borderRadius: '50%',
          left: '15%',
          top: '15%',
          background: dark
            ? 'radial-gradient(ellipse at center, rgba(255,111,94,0.18), transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(255,111,94,0.22), transparent 70%)',
          animation: 'glowFloat1 14s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '420px',
          borderRadius: '50%',
          right: '10%',
          bottom: '15%',
          background: dark
            ? 'radial-gradient(ellipse at center, rgba(245,178,62,0.14), transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(245,178,62,0.18), transparent 70%)',
          animation: 'glowFloat2 18s ease-in-out infinite',
        }}
      />
    </div>
  );
}

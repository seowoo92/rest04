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
          width: '380px',
          height: '320px',
          borderRadius: '50%',
          left: '0%',
          top: '5%',
          background: dark
            ? 'radial-gradient(ellipse at center, rgba(255,111,94,0.22), transparent 65%)'
            : 'radial-gradient(ellipse at center, rgba(255,111,94,0.26), transparent 65%)',
          animation: 'glowFloat1 7s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '340px',
          height: '280px',
          borderRadius: '50%',
          right: '2%',
          bottom: '8%',
          background: dark
            ? 'radial-gradient(ellipse at center, rgba(245,178,62,0.18), transparent 65%)'
            : 'radial-gradient(ellipse at center, rgba(245,178,62,0.22), transparent 65%)',
          animation: 'glowFloat2 9s ease-in-out infinite',
        }}
      />
    </div>
  );
}

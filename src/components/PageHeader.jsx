import { useTheme } from '../context/ThemeContext';

export default function PageHeader({ category, title, bgText }) {
  const { dark } = useTheme();
  return (
    <div
      className="pt-16 pb-0 w-full overflow-hidden relative"
      style={{ backgroundColor: 'var(--bg)', height: '128px' }}
    >
      <span
        className="font-bold text-6xl whitespace-nowrap pointer-events-none select-none"
        style={{
          position: 'absolute',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: dark ? 'rgba(255,255,255,0.07)' : 'rgba(42,45,67,0.09)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {bgText}
      </span>
      <div style={{ position: 'absolute', top: '50%', left: '32px', transform: 'translateY(-50%)' }}>
        <p
          className="text-sm font-bold uppercase mb-2"
          style={{
            color: '#FF6F5E',
            letterSpacing: '2px',
            opacity: 0,
            animation: 'fadeSlideUp 0.4s ease forwards',
          }}
        >
          {category}
        </p>
        <h1
          className="text-3xl font-bold"
          style={{
            color: 'var(--text)',
            opacity: 0,
            animation: 'fadeSlideUp 0.4s 0.15s ease both',
          }}
        >
          {title}
        </h1>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '0.5px', background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(42,45,67,0.12)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '32px', width: '40px', height: '2px', background: '#F5B23E' }} />
    </div>
  );
}

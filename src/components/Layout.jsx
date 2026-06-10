import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import DarkGlow from './DarkGlow';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ title, children }) {
  const { dark, toggleDark } = useTheme();
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/' && <DarkGlow />}
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar dark={dark} toggleDark={toggleDark} />
        <main
          className="min-h-screen"
          style={{ paddingTop: '64px' }}
        >
          {children ?? (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
              <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                {title}
              </h1>
              <p style={{ color: 'var(--text)', opacity: 0.5 }}>준비 중입니다.</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

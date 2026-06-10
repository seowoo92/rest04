import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  {
    label: '회사소개',
    submenu: [
      { label: 'CEO 인사말', to: '/about/ceo' },
      { label: '비전·가치', to: '/about/vision' },
      { label: '연혁', to: '/about/history' },
      { label: '브랜드 소개', to: '/about/brand' },
    ],
  },
  {
    label: '서비스',
    submenu: [
      { label: '이용 방법', to: '/services/how' },
      { label: '전체보기', to: '/services' },
    ],
  },
  {
    label: '게시판',
    submenu: [
      { label: '공지사항', to: '/board/notice' },
      { label: '자유게시판', to: '/board/free' },
    ],
  },
  {
    label: '이용후기',
    submenu: [
      { label: '이용후기', to: '/reviews' },
    ],
  },
  {
    label: '문의하기',
    submenu: [
      { label: '문의하기', to: '/contact' },
    ],
  },
];

export default function Navbar({ dark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMobile = (label) => {
    setExpandedMobile(prev => (prev === label ? null : label));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}
      style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid var(--divider)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0" style={{ textDecoration: 'none' }}>
            <svg viewBox="0 0 34 28" width="34" height="28" fill="none">
              <circle cx="14" cy="14" r="10" fill="#FF6F5E" />
              <circle cx="24" cy="20" r="7" fill="#F5B23E" />
            </svg>
            <span
              className="text-xl"
              style={{
                fontFamily: "'IBM Plex Sans KR', system-ui, sans-serif",
                fontWeight: 700,
                color: 'var(--text)',
              }}
            >
              곁에
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map(item => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={{ color: 'var(--text)', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--coral)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
                >
                  {item.label}
                  <ChevronDown
                    size={12}
                    style={{
                      transform: activeMenu === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>

                {/* Dropdown */}
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: activeMenu === item.label
                      ? 'translateX(-50%) translateY(0px)'
                      : 'translateX(-50%) translateY(-6px)',
                    opacity: activeMenu === item.label ? 1 : 0,
                    pointerEvents: activeMenu === item.label ? 'auto' : 'none',
                    transition: 'opacity 0.18s ease, transform 0.18s ease',
                    zIndex: 100,
                    minWidth: '160px',
                  }}
                >
                  {/* Caret */}
                  <div style={{
                    width: 0, height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderBottom: `6px solid var(--divider)`,
                    margin: '0 auto',
                    position: 'relative',
                    top: '1px',
                  }} />
                  <div style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--divider)',
                    borderRadius: '12px',
                    padding: '4px 0',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                    overflow: 'hidden',
                    textAlign: 'center',
                  }}>
                    {item.submenu.map(sub => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center justify-center text-sm transition-colors duration-150"
                        style={{ padding: '12px 20px', color: 'var(--text)', textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--divider)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2 rounded-full transition-colors duration-200"
              style={{ color: 'var(--text)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--divider)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="다크/라이트 모드 전환"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{ color: 'var(--text)', opacity: 0.6 }}>
                  <User size={13} />
                  <span className="max-w-[120px] truncate">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-75"
                  style={{ border: '1px solid var(--divider)', color: 'var(--text)', background: 'none', cursor: 'pointer' }}
                >
                  <LogOut size={14} /> 로그아웃
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
                style={{ backgroundColor: 'var(--coral)', color: '#ffffff', textDecoration: 'none' }}
              >
                <LogIn size={14} /> 로그인
              </Link>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleDark}
              className="p-2 rounded-full"
              style={{ color: 'var(--text)' }}
              aria-label="테마 전환"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => { setMobileOpen(o => !o); setExpandedMobile(null); }}
              className="p-2 rounded-full"
              style={{ color: 'var(--text)' }}
              aria-label="메뉴"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4"
          style={{ borderTop: '1px solid var(--divider)', backgroundColor: 'var(--card)' }}
        >
          {menuItems.map(item => (
            <div key={item.label} style={{ borderBottom: '1px solid var(--divider)' }}>
              <button
                onClick={() => toggleMobile(item.label)}
                className="w-full flex items-center justify-between py-3 text-sm font-medium"
                style={{ color: 'var(--text)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  style={{
                    transform: expandedMobile === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: 'var(--text)',
                    opacity: 0.5,
                  }}
                />
              </button>
              <div
                style={{
                  overflow: 'hidden',
                  maxHeight: expandedMobile === item.label ? `${item.submenu.length * 44}px` : '0',
                  transition: 'max-height 0.25s ease',
                }}
              >
                <div className="pl-3 pb-2 flex flex-col gap-0.5">
                  {item.submenu.map(sub => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 text-sm"
                      style={{ color: 'var(--text)', opacity: 0.65, textDecoration: 'none' }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {user ? (
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs px-1" style={{ color: 'var(--text)', opacity: 0.5 }}>
                <User size={12} />
                <span className="truncate">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full py-2.5 rounded-full text-sm font-semibold flex items-center justify-center gap-1.5"
                style={{ border: '1px solid var(--divider)', color: 'var(--text)', background: 'none', cursor: 'pointer' }}
              >
                <LogOut size={14} /> 로그아웃
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--coral)', textDecoration: 'none' }}
            >
              <LogIn size={14} /> 로그인
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

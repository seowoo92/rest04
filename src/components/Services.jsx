import { Link } from 'react-router-dom';
import { Sofa, Lightbulb, Bug, Package, Sparkles, HelpCircle } from 'lucide-react';

const CORAL   = { iconBg: 'rgba(255,111,94,0.12)',  iconColor: '#FF6F5E' };
const MUSTARD = { iconBg: 'rgba(245,178,62,0.12)', iconColor: '#F5B23E' };

const services = [
  { icon: Sofa,       title: '가구 조립',       desc: '복잡한 조립, 대신 해드려요',       ...CORAL },
  { icon: Lightbulb,  title: '전구·조명 교체',  desc: '높은 곳도 걱정 없이',             ...MUSTARD },
  { icon: Bug,        title: '벌레 처치',        desc: '무서운 순간, 바로 출동',           ...CORAL },
  { icon: Package,    title: '무거운 짐 옮기기', desc: '혼자 들기 버거운 짐',              ...MUSTARD },
  { icon: Sparkles,   title: '간단 청소',        desc: '손이 필요한 집안일',               ...CORAL },
  { icon: HelpCircle, title: '기타 생활 도움',   desc: '잠깐의 손이 필요한 모든 일',       ...MUSTARD },
];

export default function Services() {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="services"
      className="py-24"
      style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--divider)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--coral)' }}
          >
            OUR SERVICE
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: 'var(--text)', letterSpacing: '-0.5px' }}
          >
            이런 도움을 드려요
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
          {services.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.title}
                onClick={scrollToContact}
                className="flex flex-col gap-4 p-6 rounded-2xl text-left transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)', color: 'var(--text)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,111,94,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--divider)'; }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: s.iconBg }}
                >
                  <Icon size={20} style={{ color: s.iconColor }} />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>
                    {s.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text)', opacity: 0.58 }}>
                    {s.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link
            to="/services"
            className="px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              border: '1.5px solid var(--coral)',
              color: 'var(--coral)',
              backgroundColor: 'transparent',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--coral)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--coral)';
            }}
          >
            서비스 전체보기
          </Link>
        </div>
      </div>
    </section>
  );
}

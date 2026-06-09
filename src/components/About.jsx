import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Heart } from 'lucide-react';

const values = [
  {
    icon: Zap,
    title: '빠른 연결',
    desc: '필요한 순간, 가까운 헬퍼와 바로 매칭',
  },
  {
    icon: ShieldCheck,
    title: '검증된 헬퍼',
    desc: '신원과 후기를 확인한 믿을 수 있는 분들',
  },
  {
    icon: Heart,
    title: '혼자여도 든든하게',
    desc: '작은 일도 부담 없이 맡기세요',
  },
];

const pillNav = [
  { label: 'CEO 인사말', to: '/about/ceo' },
  { label: '비전·가치', to: '/about/vision' },
  { label: '연혁', to: '/about/history' },
  { label: '브랜드 소개', to: '/about/brand' },
];

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center py-24 text-center scroll-mt-16"
      style={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--divider)',
        borderBottom: '1px solid var(--divider)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 w-full">

        {/* ① 라벨 + 제목 + 소개 */}
        <div className="pb-4">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--coral)' }}
          >
            ABOUT US
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mt-2 mb-4"
            style={{ color: 'var(--text)', letterSpacing: '-0.5px' }}
          >
            혼자여도 든든하게, 곁에
          </h2>
          <p
            className="text-base leading-relaxed mb-2"
            style={{ color: 'var(--text)', opacity: 0.65 }}
          >
            혼자 사는 것이 불편하지 않도록,
            <br />
            잠깐의 도움이 필요한 모든 순간에 가장 가까운 헬퍼를 연결합니다.
          </p>
        </div>

        {/* ② 핵심가치 카드 3개 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          {values.map(v => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="p-8 rounded-2xl flex flex-col gap-4 text-left transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,111,94,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--divider)'; }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(245,178,62,0.12)' }}
                >
                  <Icon size={20} style={{ color: '#F5B23E' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>
                    {v.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ③ 알약 버튼 4개 */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {pillNav.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm"
              style={{
                border: '1.5px solid var(--divider)',
                color: 'var(--text)',
                backgroundColor: 'transparent',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--coral)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--coral)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text)';
                e.currentTarget.style.borderColor = 'var(--divider)';
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

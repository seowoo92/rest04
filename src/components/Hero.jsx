import { useState, useEffect } from 'react';
import { Sofa, Lightbulb, Bug, Package, Star, ChevronRight } from 'lucide-react';
import { helpers } from '../data/helpers';
import heroImage from '../assets/hero.jpg';

const situations = [
  { id: 0, icon: Sofa, label: '가구 조립이 막막할 때', helperIndex: 0 },
  { id: 1, icon: Lightbulb, label: '전구가 나갔을 때', helperIndex: 1 },
  { id: 2, icon: Bug, label: '벌레가 나왔을 때', helperIndex: 2 },
  { id: 3, icon: Package, label: '무거운 짐을 옮길 때', helperIndex: 3 },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={11}
          fill={i <= Math.round(rating) ? '#FBBF24' : 'transparent'}
          color="#FBBF24"
        />
      ))}
      <span className="ml-1 text-xs font-medium" style={{ color: 'var(--text)' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIdx(prev => (prev + 1) % situations.length);
        setVisible(true);
      }, 280);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSituationClick = (i) => {
    setVisible(false);
    setTimeout(() => {
      setActiveIdx(i);
      setVisible(true);
    }, 180);
  };

  const situation = situations[activeIdx];
  const helper = helpers[situation.helperIndex];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative flex items-center"
      style={{
        minHeight: 'calc(100vh - 64px)',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.4)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col gap-7">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium w-fit"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            >
              혼자 사는 당신을 위한 생활 도움 매칭
            </div>

            <h1
              className="text-5xl sm:text-6xl font-bold leading-tight"
              style={{ color: '#fff', letterSpacing: '-1.5px' }}
            >
              혼자여도,
              <br />
              <span style={{ color: 'var(--coral)' }}>곁에</span>
            </h1>

            <p
              className="text-lg leading-relaxed"
              style={{ color: '#fff', opacity: 0.82 }}
            >
              가구 조립부터 벌레 처치까지 — 잠깐의 도움이 필요한 순간,
              <br className="hidden sm:block" />
              가까운 헬퍼가 곁에 있어요.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-3 rounded-full font-semibold text-white text-sm transition-opacity duration-200 hover:opacity-85"
                style={{ backgroundColor: 'var(--coral)' }}
              >
                도움 요청하기
              </button>
              <button
                onClick={() => scrollTo('services')}
                className="px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  color: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }}
              >
                서비스 보기
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              {situations.map((s, i) => {
                const Icon = s.icon;
                const isActive = activeIdx === i;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSituationClick(i)}
                    className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-xs font-medium text-left transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? 'var(--coral)' : 'var(--card)',
                      color: isActive ? '#fff' : 'var(--text)',
                      border: isActive ? 'none' : '1px solid var(--divider)',
                    }}
                  >
                    <Icon size={15} style={{ flexShrink: 0 }} />
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--divider)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0px)' : 'translateY(6px)',
                transition: 'opacity 0.28s ease, transform 0.28s ease',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                    style={{ backgroundColor: 'var(--coral)' }}
                  >
                    {helper.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text)' }}>
                      {helper.name}
                    </p>
                    <StarRating rating={helper.rating} />
                  </div>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: 'rgba(255,111,94,0.1)',
                    color: 'var(--coral)',
                  }}
                >
                  {helper.distance} 근처
                </span>
              </div>

              <p className="text-xs mb-2" style={{ color: 'var(--text)', opacity: 0.5 }}>
                가능한 도움
              </p>
              <div className="flex flex-wrap gap-1.5">
                {helper.skills.map(skill => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: 'var(--divider)', color: 'var(--text)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div
                className="mt-4 flex items-center justify-between pt-3"
                style={{ borderTop: '1px solid var(--divider)' }}
              >
                <p className="text-xs" style={{ color: 'var(--text)', opacity: 0.45 }}>
                  지금 바로 매칭 가능
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: '#22c55e' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  온라인
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { Armchair, Lightbulb, Bug, PackageOpen, Sparkles, CircleHelp } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const CORAL  = { bg: 'rgba(255,111,94,0.1)',  color: '#FF6F5E' };
const MUSTARD = { bg: 'rgba(245,178,62,0.1)', color: '#F5B23E' };

const services = [
  { icon: Armchair,    title: '가구 조립',       desc: '복잡한 조립, 대신 해드려요',    ...CORAL },
  { icon: Lightbulb,   title: '전구·조명 교체',  desc: '높은 곳도 걱정 없이',           ...MUSTARD },
  { icon: Bug,         title: '벌레 처치',        desc: '무서운 순간, 바로 출동',        ...CORAL },
  { icon: PackageOpen, title: '무거운 짐 옮기기', desc: '혼자 들기 버거운 짐',           ...MUSTARD },
  { icon: Sparkles,    title: '간단 청소',        desc: '손이 필요한 집안일',            ...CORAL },
  { icon: CircleHelp,  title: '기타 생활 도움',   desc: '잠깐의 손이 필요한 모든 일',    ...MUSTARD },
];

export default function ServicesPage() {
  return (
    <Layout>
      <PageHeader category="서비스" title="서비스 전체보기" bgText="OUR SERVICE" />

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">

        {/* 서비스 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, desc, bg, color }) => (
            <div
              key={title}
              className="rounded-2xl p-8 flex flex-col"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
            >
              <div
                className="p-3 rounded-xl w-fit mb-4"
                style={{ backgroundColor: bg }}
              >
                <Icon size={28} style={{ color }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: 'var(--text)', opacity: 0.7 }}
              >
                {desc}
              </p>
              <Link
                to="/contact"
                className="mt-4 text-sm font-medium transition-opacity duration-200"
                style={{ color: '#2A2D43', opacity: 0.5, textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; }}
              >
                문의하기 →
              </Link>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="mt-16 text-center">
          <p
            className="text-lg mb-4"
            style={{ color: 'var(--text)', opacity: 0.7 }}
          >
            필요한 도움이 없으신가요?
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-full px-8 py-3 font-medium text-white"
            style={{ backgroundColor: 'var(--coral)', textDecoration: 'none' }}
          >
            직접 문의하기
          </Link>
        </div>

      </div>
    </Layout>
  );
}

import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const brandColors = [
  { hex: '#FF6F5E', name: '코랄', desc: '따뜻함과 친근함', border: false },
  { hex: '#F5B23E', name: '머스타드', desc: '밝음과 활기', border: false },
  { hex: '#2A2D43', name: '다크 네이비', desc: '신뢰와 안정', border: false },
  { hex: '#FAF6F0', name: '아이보리', desc: '편안함과 여유', border: true },
];

export default function AboutBrand() {
  return (
    <Layout>
      <PageHeader category="회사소개" title="브랜드 소개" bgText="BRAND" />

      <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">

        {/* 슬로건 섹션 */}
        <div
          className="text-center py-20"
          style={{ borderBottom: '1px solid var(--divider)' }}
        >
          <p
            className="text-xs font-bold tracking-widest uppercase mb-6"
            style={{ color: 'var(--coral)' }}
          >
            SLOGAN
          </p>
          <p
            className="text-5xl font-bold leading-tight pb-8"
            style={{ color: 'var(--text)' }}
          >
            혼자여도, 곁에
          </p>
        </div>

        {/* 브랜드 네임 섹션 */}
        <div
          className="py-16"
          style={{ borderBottom: '1px solid var(--divider)' }}
        >
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: 'var(--coral)' }}
          >
            BRAND NAME
          </p>
          <p className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            곁에
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--text)', opacity: 0.7 }}
          >
            '곁에 있다'는 말처럼, 필요한 순간 가장 가까운 곳에서 함께한다는 의미를 담았습니다.
          </p>
        </div>

        {/* 로고 + 브랜드 컬러 섹션 */}
        <div
          className="flex flex-col md:flex-row justify-between items-start py-16"
          style={{ borderBottom: '1px solid var(--divider)' }}
        >
          {/* 왼쪽 — 로고 */}
          <div className="flex-shrink-0 max-w-xs">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: 'var(--coral)' }}
            >
              LOGO
            </p>
            <svg viewBox="0 0 34 28" width={80} height={66} fill="none">
              <circle cx="14" cy="14" r="10" fill="#FF6F5E" />
              <circle cx="24" cy="20" r="7" fill="#F5B23E" />
            </svg>
            <p
              className="text-sm leading-relaxed mt-4 max-w-xs"
              style={{ color: 'var(--text)', opacity: 0.7 }}
            >
              두 원이 겹치는 형태<br /><span style={{ whiteSpace: 'nowrap' }}>도움을 주는 사람과 받는 사람이 가까이 연결되는 순간을 표현합니다.</span>
            </p>
          </div>

          {/* 오른쪽 — 브랜드 컬러 */}
          <div className="ml-16">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: 'var(--coral)' }}
            >
              BRAND COLOR
            </p>
            <div className="flex flex-col gap-4">
              {brandColors.map(({ hex, name, desc, border }) => (
                <div key={hex} className="flex items-center gap-4">
                  <div
                    className="rounded-xl flex-shrink-0"
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: hex,
                      border: border ? '1px solid var(--divider)' : 'none',
                    }}
                  />
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                      {name}
                      <span
                        className="ml-2 font-normal"
                        style={{ color: 'var(--text)', opacity: 0.5 }}
                      >
                        {hex}
                      </span>
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text)', opacity: 0.6 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 브랜드 철학 섹션 */}
        <div className="py-24 text-center">
          <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
            우리는 혼자 사는 것이 불편하지 않도록,
          </p>
          <p className="text-2xl font-bold mt-3" style={{ color: 'var(--text)' }}>
            가장 가까운 곳에서 손을 내밀며,
          </p>
          <p className="text-2xl font-bold mt-3" style={{ color: 'var(--text)', opacity: 0.8 }}>
            작은 도움이 일상이 되는 세상을,
          </p>
          <p className="text-3xl font-bold mt-3" style={{ color: '#FF6F5E' }}>
            만들어갑니다
          </p>
        </div>

      </div>
    </Layout>
  );
}

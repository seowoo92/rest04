import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const groups = [
  {
    year: '2026',
    planned: false,
    dotColor: '#FF6F5E',
    lineColor: '#FF6F5E',
    periodColor: '#FF6F5E',
    items: [
      { period: '06월', content: '곁에 법인 설립' },
      { period: '06월', content: '서비스 베타 오픈 (서울 강남구)' },
      { period: '하반기', content: '서울 전역 서비스 확대' },
    ],
  },
  {
    year: '2027',
    planned: true,
    dotColor: '#F5B23E',
    lineColor: '#F5B23E',
    periodColor: '#F5B23E',
    items: [
      { period: '상반기', content: '수도권 전역 서비스 확대' },
      { period: '하반기', content: '헬퍼 인증 프로그램 런칭' },
    ],
  },
];

export default function AboutHistory() {
  return (
    <Layout>
      <PageHeader category="회사소개" title="연혁" bgText="HISTORY" />

      <div className="max-w-2xl mx-auto px-6 pt-16 pb-24">
        <div className="relative flex flex-col gap-16">

          {/* 왼쪽 세로선 */}
          <div
            className="absolute top-0 bottom-0 left-0"
            style={{ width: '1px', background: 'var(--divider)' }}
          />

          {groups.map((group) => (
            <div key={group.year} className="relative pl-8">

              {/* 도트 */}
              <div
                className="absolute rounded-full"
                style={{
                  left: '-4px',
                  top: '6px',
                  width: '8px',
                  height: '8px',
                  background: group.dotColor,
                }}
              />

              {/* 연도 헤더 */}
              <div className="flex items-center mb-1">
                <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                  {group.year}
                </span>
                {group.planned && (
                  <span
                    className="text-xs rounded-full px-2 py-0.5 text-white ml-2"
                    style={{ backgroundColor: '#F5B23E' }}
                  >
                    계획
                  </span>
                )}
              </div>

              {/* 포인트 라인 */}
              <div
                className="rounded mb-6"
                style={{ width: '24px', height: '2px', background: group.lineColor }}
              />

              {/* 항목 목록 */}
              <div
                className="flex flex-col gap-6"
                style={group.planned ? { opacity: 0.6 } : undefined}
              >
                {group.items.map((item, i) => (
                  <div key={i}>
                    <p
                      className="text-xs font-bold mb-1"
                      style={{ color: group.periodColor }}
                    >
                      {item.period}
                    </p>
                    <p className="text-base" style={{ color: 'var(--text)' }}>
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    </Layout>
  );
}

import { Link } from 'react-router-dom';
import { MessageCircle, Users, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const steps = [
  {
    num: '01',
    numColor: 'rgba(255,111,94,0.08)',
    iconBg: '#FF6F5E',
    icon: MessageCircle,
    labelColor: '#FF6F5E',
    title: '도움 요청',
    lines: [
      '필요한 도움을 선택하고 지역과 내용을 알려주세요.',
      '원하는 날짜와 시간도 함께 입력하면 더 빠르게 연결돼요.',
    ],
  },
  {
    num: '02',
    numColor: 'rgba(245,178,62,0.08)',
    iconBg: '#F5B23E',
    icon: Users,
    labelColor: '#F5B23E',
    title: '헬퍼 매칭',
    lines: [
      '가까운 헬퍼를 빠르게 찾아 연결해 드려요.',
      '헬퍼의 프로필, 후기, 별점을 미리 확인할 수 있어요.',
    ],
  },
  {
    num: '03',
    numColor: 'rgba(42,45,67,0.05)',
    iconBg: '#2A2D43',
    icon: CheckCircle,
    labelColor: '#2A2D43',
    title: '도움 완료',
    lines: [
      '헬퍼가 방문해 안전하게 도움을 드립니다.',
      '완료 후 후기를 남겨 다른 이웃에게 도움을 줄 수 있어요.',
    ],
  },
];

export default function ServicesHow() {
  return (
    <Layout>
      <PageHeader category="서비스" title="이용 방법" bgText="HOW TO USE" />

      <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">

        {/* 스텝 카드 */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative overflow-hidden p-10 flex flex-row items-center gap-8"
                style={i < steps.length - 1 ? { borderBottom: '1px solid var(--divider)' } : undefined}
              >
                {/* 배경 대형 번호 */}
                <span
                  style={{
                    position: 'absolute',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '7rem',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: step.numColor,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {step.num}
                </span>

                {/* 아이콘 박스 */}
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    backgroundColor: step.iconBg,
                  }}
                >
                  <Icon size={22} color="white" />
                </div>

                {/* 텍스트 */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p
                    className="text-xs font-bold tracking-widest mb-2"
                    style={{ color: step.labelColor }}
                  >
                    STEP {step.num}
                  </p>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                    {step.title}
                  </h3>
                  {step.lines.map((line, j) => (
                    <p
                      key={j}
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text)', opacity: 0.7 }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg mb-4" style={{ color: 'var(--text)', opacity: 0.7 }}>
            지금 바로 도움을 요청해보세요.
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-full px-8 py-3 font-medium text-white"
            style={{ backgroundColor: '#FF6F5E', textDecoration: 'none' }}
          >
            도움 요청하기
          </Link>
        </div>

      </div>
    </Layout>
  );
}

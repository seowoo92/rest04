import { Zap, ShieldCheck, Heart } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const values = [
  {
    icon: Zap,
    title: '빠른 연결',
    tagline: '필요한 순간, 바로 곁에',
    desc: '도움이 필요한 순간 망설임 없이 요청할 수 있도록, 가장 빠르게 연결합니다.',
  },
  {
    icon: ShieldCheck,
    title: '검증된 신뢰',
    tagline: '믿고 맡길 수 있는 헬퍼',
    desc: '신원 확인과 후기 시스템으로 안심하고 문을 열 수 있는 환경을 만듭니다.',
  },
  {
    icon: Heart,
    title: '부담 없는 도움',
    tagline: '작은 일도 당당하게',
    desc: '크든 작든 도움을 요청하는 일이 자연스러운 일상이 되도록 함께합니다.',
  },
];

export default function AboutVision() {
  return (
    <Layout>
      <PageHeader category="회사소개" title="비전·가치" bgText="VISION & VALUES" />

      <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">

        {/* 비전 파트 */}
        <div className="mb-20">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: 'var(--coral)' }}
          >
            VISION
          </p>
          <blockquote
            className="pl-6"
            style={{ borderLeft: '4px solid #F5B23E' }}
          >
            <p
              className="text-4xl font-bold leading-snug"
              style={{ color: 'var(--text)' }}
            >
              1인 가구 누구나,<br />혼자여도 불편하지 않은 세상
            </p>
            <p
              className="text-base leading-relaxed mt-4"
              style={{ color: 'var(--text)', opacity: 0.7 }}
            >
              가구 조립부터 벌레 처치까지, 생활 속 작은 불편함을 혼자 감당하지 않아도 되는 세상.<br />
              곁에는 그 세상을 만들어가고 있습니다.
            </p>
          </blockquote>
        </div>

        {/* 가치 파트 */}
        <div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-6"
            style={{ color: 'var(--coral)' }}
          >
            VALUES
          </p>
          <div className="flex flex-col gap-6">
            {values.map(({ icon: Icon, title, tagline, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-8 flex gap-6 items-start"
                style={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--divider)',
                }}
              >
                <div
                  className="p-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'rgba(245,178,62,0.12)' }}
                >
                  <Icon size={22} style={{ color: '#F5B23E' }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: 'var(--text)' }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm mb-3"
                    style={{ color: 'var(--coral)' }}
                  >
                    {tagline}
                  </p>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--text)', opacity: 0.7 }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}

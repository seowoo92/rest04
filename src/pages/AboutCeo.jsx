import { User } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

export default function AboutCeo() {
  return (
    <Layout>
      <PageHeader category="회사소개" title="CEO 인사말" bgText="CEO MESSAGE" />

      {/* 본문 */}
      <div className="pt-20 pb-24">
        <div className="max-w-5xl mx-auto px-6">

          {/* 2컬럼: 왼쪽 사진 / 오른쪽 텍스트 */}
          <div className="flex flex-col md:flex-row gap-12">

            {/* 왼쪽 - 사진 + 이름/직책 */}
            <div className="w-full md:w-80 flex-shrink-0">
              <div
                className="h-auto rounded-2xl flex flex-col items-center justify-center gap-3"
                style={{
                  alignSelf: 'stretch',
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--divider)',
                }}
              >
                <User size={64} style={{ color: 'var(--divider)' }} />
                <p className="text-sm" style={{ color: 'var(--text)', opacity: 0.4 }}>
                  사진 준비 중
                </p>
              </div>
              <p className="mt-1 text-sm text-left" style={{ color: 'var(--text)', opacity: 0.6 }}>
                김서우 (Seowoo Kim) / 대표
              </p>
            </div>

            {/* 오른쪽 - 인사말 */}
            <div className="flex-1">
              <p className="leading-relaxed mb-6" style={{ color: 'var(--text)', opacity: 0.82 }}>
                안녕하세요. 대표이사 김서우입니다.<br /><br />
                혼자 살며 '이럴 때 누가 잠깐만 도와줬으면' 했던 순간들이 곁에를 만들었습니다.<br />
                무거운 가구를 혼자 옮기다 허리를 다칠 뻔했던 날,<br />
                밤늦게 벌레가 나와 도움을 요청할 곳이 없었던 날<br />
                작은 불편함이 쌓여 외로움이 되는 순간을 저도 경험했습니다.
              </p>
              <p className="leading-relaxed mb-6" style={{ color: 'var(--text)', opacity: 0.82 }}>
                곁에는 단순한 심부름 서비스가 아닙니다.<br />
                가장 가까운 이웃이 잠깐 손을 내미는 것처럼,<br />
                필요한 순간에 부담 없이 도움을 주고받을 수 있는 연결을 만들고 싶었습니다.
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text)', opacity: 0.82 }}>
                누구나 혼자여도 든든하게 살 수 있도록,<br />
                가장 가까운 곳에서 곁에 있겠습니다.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

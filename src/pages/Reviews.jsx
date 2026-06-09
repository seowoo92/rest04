import { useState } from 'react';
import { Star } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { reviews } from '../data/reviews';

const TABS = ['전체', '가구 조립', '벌레 처치', '짐 옮기기', '전구 교체', '간단 청소', '기타 생활 도움'];

const ratingDist = [
  { star: 5, count: 4, pct: 67 },
  { star: 4, count: 2, pct: 33 },
  { star: 3, count: 0, pct: 0 },
  { star: 2, count: 0, pct: 0 },
  { star: 1, count: 0, pct: 0 },
];

const AVATAR_COLORS = ['#FF6F5E', '#F5B23E', '#7B68EE', '#9FC8DC'];

const BADGE_STYLES = {
  '가구 조립':     { backgroundColor: 'rgba(245,178,62,0.15)',  color: '#c8880a' },
  '벌레 처치':     { backgroundColor: 'rgba(255,111,94,0.15)',  color: '#e04030' },
  '짐 옮기기':     { backgroundColor: 'rgba(42,45,67,0.10)',    color: '#2A2D43' },
  '전구 교체':     { backgroundColor: 'rgba(159,200,220,0.20)', color: '#4a7d96' },
  '간단 청소':     { backgroundColor: 'rgba(74,181,119,0.15)',  color: '#2e8a57' },
  '기타 생활 도움': { backgroundColor: 'var(--divider)',          color: 'var(--text)' },
};

function getBadgeStyle(type) {
  return BADGE_STYLES[type] ?? { backgroundColor: 'var(--divider)', color: 'var(--text)' };
}

function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? '#FBBF24' : 'transparent'}
          color="#FBBF24"
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState('전체');

  const filtered = activeTab === '전체'
    ? reviews
    : reviews.filter(r => r.type === activeTab);

  return (
    <Layout>
      <PageHeader category="이용후기" title="곁에를 경험한 분들" bgText="REVIEWS" />

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">

        {/* 평균 별점 섹션 */}
        <div
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 rounded-2xl p-10 mb-12"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
        >
          {/* 왼쪽 — 평균 별점 */}
          <div className="flex flex-col items-center">
            <p className="text-6xl font-bold mb-2" style={{ color: 'var(--text)' }}>4.9</p>
            <StarRow rating={5} size={24} />
            <p className="text-sm mt-2" style={{ color: 'var(--text)', opacity: 0.6 }}>
              총 {reviews.length}개의 후기
            </p>
          </div>

          {/* 오른쪽 — 별점 분포 */}
          <div className="flex flex-col gap-2 w-full max-w-xs">
            {ratingDist.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm w-4 text-right" style={{ color: 'var(--text)', opacity: 0.6 }}>
                  {star}
                </span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--divider)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: '#F5B23E' }}
                  />
                </div>
                <span className="text-sm w-4" style={{ color: 'var(--text)', opacity: 0.6 }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 필터 탭 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(tab => {
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
                style={
                  active
                    ? { backgroundColor: '#FF6F5E', color: '#fff', border: '1px solid #FF6F5E' }
                    : { backgroundColor: 'transparent', color: 'var(--text)', border: '1px solid var(--divider)' }
                }
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.borderColor = '#FF6F5E';
                    e.currentTarget.style.color = '#FF6F5E';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255,111,94,0.2)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.borderColor = 'var(--divider)';
                    e.currentTarget.style.color = 'var(--text)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 후기 카드 그리드 */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map((review, idx) => (
              <div
                key={review.id}
                className="rounded-2xl p-8 flex flex-col"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
              >
                {/* 상단 */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: AVATAR_COLORS[idx % 4] }}
                    >
                      {review.initial}
                    </div>
                    <div>
                      <p className="font-bold mb-0.5" style={{ color: 'var(--text)' }}>
                        {review.name}
                      </p>
                      <StarRow rating={review.rating} size={14} />
                    </div>
                  </div>
                  <span
                    className="text-xs rounded-full px-3 py-1 flex-shrink-0"
                    style={getBadgeStyle(review.type)}
                  >
                    {review.type}
                  </span>
                </div>

                {/* 후기 내용 */}
                <p
                  className="text-base leading-relaxed mb-6 flex-1"
                  style={{ color: 'var(--text)', wordBreak: 'keep-all' }}
                >
                  {review.content}
                </p>

                {/* 날짜 */}
                <p className="text-sm" style={{ color: 'var(--text)', opacity: 0.5 }}>
                  {review.date}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20" style={{ color: 'var(--text)', opacity: 0.4 }}>
            해당 카테고리의 후기가 없습니다.
          </div>
        )}

      </div>
    </Layout>
  );
}

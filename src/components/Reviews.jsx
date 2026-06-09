import { Star } from 'lucide-react';
import { reviews } from '../data/reviews';

const AVATAR_COLORS = ['#FF6F5E', '#F5B23E', '#7B68EE', '#9FC8DC'];

const BADGE_STYLES = {
  '가구 조립':     { backgroundColor: 'rgba(245,178,62,0.15)',  color: '#c8880a' },
  '벌레 처치':     { backgroundColor: 'rgba(255,111,94,0.15)',  color: '#e04030' },
  '짐 옮기기':     { backgroundColor: 'rgba(42,45,67,0.10)',    color: '#2A2D43' },
  '전구 교체':     { backgroundColor: 'rgba(159,200,220,0.20)', color: '#4a7d96' },
  '간단 청소':     { backgroundColor: 'rgba(245,178,62,0.15)',  color: '#c8880a' },
  '기타 생활 도움': { backgroundColor: 'var(--divider)',          color: 'var(--text)', opacity: 0.7 },
};

function getBadgeStyle(type) {
  return BADGE_STYLES[type] ?? { backgroundColor: 'var(--divider)', color: 'var(--text)' };
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={13}
          fill={i <= Math.round(rating) ? '#FBBF24' : 'transparent'}
          color="#FBBF24"
        />
      ))}
      <span className="ml-1 text-xs font-semibold" style={{ color: 'var(--text)' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="py-24"
      style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--divider)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--coral)' }}
          >
            REVIEWS
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: 'var(--text)', letterSpacing: '-0.5px' }}
          >
            곁에를 경험한 분들
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl flex flex-col gap-4"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: AVATAR_COLORS[idx % 4] }}
                  >
                    {review.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text)' }}>
                      {review.name}
                    </p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <span
                  className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium"
                  style={getBadgeStyle(review.type)}
                >
                  {review.type}
                </span>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text)', opacity: 0.78 }}
              >
                {review.content}
              </p>

              <p className="text-xs" style={{ color: 'var(--text)', opacity: 0.38 }}>
                {review.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

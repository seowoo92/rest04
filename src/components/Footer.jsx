import { MapPin, Phone, Mail } from 'lucide-react';

const FOOTER_BG = '#1A1C2E';
const FOOTER_MUTED = 'rgba(245,241,234,0.55)';
const FOOTER_BORDER = '#2E3148';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: FOOTER_BG, color: '#F5F1EA' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 34 28" width="34" height="28" fill="none">
              <circle cx="14" cy="14" r="10" fill="#FF6F5E" />
              <circle cx="24" cy="20" r="7" fill="#F5B23E" />
            </svg>
            <span
              className="text-xl"
              style={{
                fontFamily: "'IBM Plex Sans KR', system-ui, sans-serif",
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              곁에
            </span>
          </div>

          <div className="flex flex-col gap-2.5 mt-4">
            <div className="flex items-start gap-2.5 text-sm" style={{ color: FOOTER_MUTED }}>
              <MapPin size={14} style={{ marginTop: 2, flexShrink: 0 }} />
              <span>서울특별시 강남구 테헤란로 123, 서우타워 99F</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm" style={{ color: FOOTER_MUTED }}>
              <Phone size={14} style={{ flexShrink: 0 }} />
              <span>02-1234-7777</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm" style={{ color: FOOTER_MUTED }}>
              <Mail size={14} style={{ flexShrink: 0 }} />
              <span>contact@together.com</span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs"
          style={{ borderTop: `1px solid ${FOOTER_BORDER}`, color: FOOTER_MUTED }}
        >
          <div className="flex items-center gap-5">
            <button
              className="transition-opacity hover:opacity-80"
              style={{ color: FOOTER_MUTED, background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit' }}
            >
              개인정보처리방침
            </button>
            <span style={{ color: FOOTER_BORDER }}>|</span>
            <button
              className="transition-opacity hover:opacity-80"
              style={{ color: FOOTER_MUTED, background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit' }}
            >
              이용약관
            </button>
          </div>
          <p>ⓒ 2026 곁에. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

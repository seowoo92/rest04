import { useState } from 'react';
import { MapPin, Phone, Mail, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { submitContactForm } from '../utils/submitContact';

const contactItems = [
  { icon: MapPin, label: '주소', value: '서울특별시 강남구 테헤란로 123, 서우타워 99F' },
  { icon: Phone,  label: '전화', value: '02-1234-7777' },
  { icon: Mail,   label: '이메일', value: 'contact@together.com' },
];

const faqs = [
  {
    q: '서비스 이용 요금은 어떻게 되나요?',
    a: '도움 종류와 소요 시간에 따라 다르며, 요청 후 헬퍼와 협의하여 결정됩니다. 매칭 전 예상 비용을 미리 안내해 드립니다.',
  },
  {
    q: '헬퍼는 어떻게 검증되나요?',
    a: '모든 헬퍼는 신원 확인과 인터뷰를 거쳐 등록됩니다. 실제 이용 후기와 별점을 확인하고 선택하실 수 있습니다.',
  },
  {
    q: '얼마나 빨리 연결되나요?',
    a: '평균 30분 이내 가까운 헬퍼와 연결됩니다. 지역과 시간대에 따라 다소 차이가 있을 수 있습니다.',
  },
  {
    q: '서비스 가능 지역은 어디인가요?',
    a: '현재 서울 강남구를 중심으로 서비스 중이며, 서울 전역으로 확대 예정입니다.',
  },
  {
    q: '취소나 환불은 어떻게 하나요?',
    a: '헬퍼 방문 전까지 취소 가능합니다. 자세한 환불 정책은 이용약관을 참고해 주세요.',
  },
];

const HELP_TYPES = ['가구 조립', '전구·조명 교체', '벌레 처치', '무거운 짐 옮기기', '간단 청소', '기타 생활 도움'];

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid var(--divider)',
  backgroundColor: 'var(--bg)',
  color: 'var(--text)',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'inherit',
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', helpType: '', area: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm(form);
      setSubmitted(true);
      setForm({ name: '', phone: '', helpType: '', area: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = i => setOpenFaq(prev => (prev === i ? null : i));

  return (
    <Layout>
      <PageHeader category="문의하기" title="도움이 필요하신가요?" bgText="CONTACT" />

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">

        {/* 상단 2컬럼 */}
        <div className="flex flex-col md:flex-row gap-16">

          {/* 왼쪽 — 연락처 */}
          <div className="flex-shrink-0 md:w-72">
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              곁에에 문의하세요
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text)', opacity: 0.7 }}>
              언제든지 편하게 연락주세요.<br />빠르게 답변 드리겠습니다.
            </p>

            <div className="flex flex-col gap-6">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: 'rgba(245,178,62,0.1)' }}
                  >
                    <Icon size={20} style={{ color: '#F5B23E' }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold tracking-wider mb-1"
                      style={{ color: 'var(--text)', opacity: 0.5 }}
                    >
                      {label}
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 운영시간 박스 */}
            <div
              className="mt-8 rounded-xl p-5"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
            >
              <p
                className="text-xs font-bold tracking-wider mb-3"
                style={{ color: 'var(--text)', opacity: 0.5 }}
              >
                운영시간
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                월 - 금 / 09:00 - 18:00
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--text)', opacity: 0.6 }}>
                토 - 일 / 휴무
              </p>
            </div>
          </div>

          {/* 오른쪽 — 문의 폼 */}
          <div
            className="flex-1 rounded-2xl p-8"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
                <CheckCircle size={48} style={{ color: '#FF6F5E' }} />
                <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                  문의가 접수되었습니다!
                </p>
                <p className="text-sm" style={{ color: 'var(--text)', opacity: 0.6 }}>
                  빠른 시일 내에 답변 드리겠습니다.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm font-medium"
                  style={{ color: '#FF6F5E', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  다시 문의하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold mb-1.5 block" style={{ color: 'var(--text)', opacity: 0.6 }}>
                      이름
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="홍길동"
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold mb-1.5 block" style={{ color: 'var(--text)', opacity: 0.6 }}>
                      연락처
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="010-0000-0000"
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold mb-1.5 block" style={{ color: 'var(--text)', opacity: 0.6 }}>
                      도움 종류
                    </label>
                    <select
                      name="helpType"
                      value={form.helpType}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    >
                      <option value="">선택해주세요</option>
                      {HELP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold mb-1.5 block" style={{ color: 'var(--text)', opacity: 0.6 }}>
                      지역
                    </label>
                    <input
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      placeholder="서울 강남구"
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold mb-1.5 block" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    내용
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="도움이 필요한 내용을 자세히 적어주세요."
                    rows={5}
                    required
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl py-3 font-medium text-white transition-opacity duration-200"
                  style={{
                    backgroundColor: '#FF6F5E',
                    opacity: submitting ? 0.7 : 1,
                    border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                  }}
                >
                  {submitting ? '제출 중...' : '도움 요청하기'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ 섹션 */}
        <div className="mt-20">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: 'var(--coral)' }}
          >
            FAQ
          </p>
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
            자주 묻는 질문
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--divider)',
                    borderLeft: isOpen ? '2px solid #FF6F5E' : '1px solid var(--divider)',
                  }}
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    <span className="text-sm font-medium pr-4" style={{ color: 'var(--text)' }}>
                      {faq.q}
                    </span>
                    {isOpen
                      ? <ChevronUp size={18} style={{ color: '#FF6F5E', flexShrink: 0 }} />
                      : <ChevronDown size={18} style={{ color: 'var(--text)', opacity: 0.4, flexShrink: 0 }} />
                    }
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text)', opacity: 0.7 }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </Layout>
  );
}

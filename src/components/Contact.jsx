import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../utils/submitContact';

const helpTypes = ['가구 조립', '전구 교체', '벌레 처치', '짐 옮기기', '청소', '기타'];

const inputStyle = {
  backgroundColor: 'var(--bg)',
  border: '1.5px solid var(--divider)',
  color: 'var(--text)',
  borderRadius: '12px',
  padding: '10px 16px',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
};

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    helpType: '',
    region: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitContactForm(form);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24"
      style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--divider)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--coral)' }}
          >
            CONTACT
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: 'var(--text)', letterSpacing: '-0.5px' }}
          >
            도움이 필요하신가요?
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div
              className="p-12 rounded-2xl text-center"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: 'rgba(255,111,94,0.12)' }}
              >
                <CheckCircle size={30} style={{ color: 'var(--coral)' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                신청이 접수되었습니다.
              </h3>
              <p className="text-sm" style={{ color: 'var(--text)', opacity: 0.65 }}>
                가까운 헬퍼를 찾아 곧 연락드릴게요!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl flex flex-col gap-5"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    이름
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="홍길동"
                    style={inputStyle}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    연락처
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="010-0000-0000"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    도움 종류
                  </label>
                  <select
                    name="helpType"
                    value={form.helpType}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  >
                    <option value="">선택해 주세요</option>
                    {helpTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text)', opacity: 0.6 }}>
                    지역
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    required
                    placeholder="서울 강남구"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: 'var(--text)', opacity: 0.6 }}>
                  내용
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="필요한 도움에 대해 간략히 적어주세요."
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full font-semibold text-white text-sm flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-85 mt-1"
                style={{ backgroundColor: 'var(--coral)', opacity: loading ? 0.7 : 1 }}
              >
                <Send size={15} />
                {loading ? '전송 중...' : '도움 요청하기'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

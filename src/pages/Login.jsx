import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Mail, Lock, LogIn } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { signIn, signUp, signInWithKakao } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSubmitting(true)

    const { error: err } = mode === 'login'
      ? await signIn(email, password)
      : await signUp(email, password)

    setSubmitting(false)

    if (err) {
      const msg = err.message.includes('Invalid login')
        ? '이메일 또는 비밀번호가 올바르지 않습니다.'
        : err.message.includes('already registered')
        ? '이미 가입된 이메일입니다.'
        : err.message
      setError(msg)
      return
    }

    if (mode === 'signup') {
      setMessage('이메일로 인증 메일을 발송했습니다. 확인 후 로그인해주세요.')
      setMode('login')
      setEmail('')
      setPassword('')
    } else {
      navigate(from, { replace: true })
    }
  }

  const handleKakao = async () => {
    const { error: err } = await signInWithKakao()
    if (err) setError(err.message)
  }

  const switchMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login')
    setError('')
    setMessage('')
  }

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div
          className="w-full max-w-md rounded-2xl p-8 sm:p-10"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--divider)' }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6" style={{ textDecoration: 'none' }}>
              <svg viewBox="0 0 34 28" width="30" height="24" fill="none">
                <circle cx="14" cy="14" r="10" fill="#FF6F5E" />
                <circle cx="24" cy="20" r="7" fill="#F5B23E" />
              </svg>
              <span className="text-lg font-bold" style={{ color: 'var(--text)', fontFamily: "'IBM Plex Sans KR', system-ui" }}>곁에</span>
            </Link>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
              {mode === 'login' ? '로그인' : '회원가입'}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text)', opacity: 0.5 }}>
              {mode === 'login' ? '계정으로 로그인하세요' : '새 계정을 만드세요'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm" style={{ backgroundColor: '#FFE4E1', color: '#B91C1C' }}>
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 rounded-xl text-sm" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text)', opacity: 0.35, pointerEvents: 'none' }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="이메일"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--divider)',
                  color: 'var(--text)',
                }}
              />
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text)', opacity: 0.35, pointerEvents: 'none' }} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
                minLength={mode === 'signup' ? 6 : undefined}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--divider)',
                  color: 'var(--text)',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white mt-1 flex items-center justify-center gap-2 transition-opacity"
              style={{ backgroundColor: '#FF6F5E', opacity: submitting ? 0.65 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
            >
              <LogIn size={15} />
              {submitting ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--divider)' }} />
            <span className="text-xs" style={{ color: 'var(--text)', opacity: 0.4 }}>또는</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--divider)' }} />
          </div>

          <button
            onClick={handleKakao}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
            style={{ backgroundColor: '#FEE500', color: '#191919', cursor: 'pointer', border: 'none' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M9 1.5C4.86 1.5 1.5 4.08 1.5 7.26C1.5 9.3 2.79 11.1 4.77 12.18L4.02 15.06C3.96 15.27 4.2 15.45 4.38 15.33L7.8 13.02C8.19 13.05 8.59 13.08 9 13.08C13.14 13.08 16.5 10.5 16.5 7.26C16.5 4.08 13.14 1.5 9 1.5Z" fill="#191919"/>
            </svg>
            카카오로 시작하기
          </button>

          <p className="text-center mt-5 text-sm" style={{ color: 'var(--text)', opacity: 0.5 }}>
            {mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}{' '}
            <button
              onClick={switchMode}
              className="font-semibold"
              style={{ color: '#FF6F5E', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {mode === 'login' ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>
      </section>
    </Layout>
  )
}

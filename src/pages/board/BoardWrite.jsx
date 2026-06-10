import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Save, X } from 'lucide-react'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function BoardWrite() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, profile, isAdmin } = useAuth()

  const isNotice = location.pathname.startsWith('/board/notice')
  const isEdit = Boolean(id)
  const category = isNotice ? 'notice' : 'free'
  const listPath = isNotice ? '/board/notice' : '/board/free'

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Auth guard
  useEffect(() => {
    if (!user) { navigate('/login', { state: { from: location.pathname } }); return }
    if (isNotice && !isAdmin) { navigate('/board/notice'); return }
  }, [user, isAdmin, isNotice, navigate, location.pathname])

  // Load existing post for edit
  useEffect(() => {
    if (!isEdit) return
    supabase.from('r04_posts').select('*').eq('id', id).single().then(({ data }) => {
      if (data) { setTitle(data.title); setContent(data.content) }
    })
  }, [isEdit, id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) { setError('제목과 내용을 입력해주세요.'); return }
    setSubmitting(true)
    setError('')

    let err
    if (isEdit) {
      ;({ error: err } = await supabase
        .from('r04_posts')
        .update({ title: title.trim(), content: content.trim(), updated_at: new Date().toISOString() })
        .eq('id', id))
    } else {
      const authorName = profile?.nickname || user?.email?.split('@')[0] || '회원'
      ;({ error: err } = await supabase
        .from('r04_posts')
        .insert({ category, title: title.trim(), content: content.trim(), author_id: user.id, author_name: authorName }))
    }

    setSubmitting(false)
    if (err) { setError(err.message); return }
    navigate(listPath)
  }

  const header = isNotice
    ? { category: '게시판', title: isEdit ? '공지 수정' : '공지 작성', bgText: 'NOTICE' }
    : { category: '게시판', title: isEdit ? '글 수정' : '글쓰기', bgText: 'BOARD' }

  return (
    <Layout>
      <PageHeader {...header} />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--divider)', backgroundColor: 'var(--card)' }}>
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)', opacity: 0.55 }}>제목</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                maxLength={100}
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--divider)', color: 'var(--text)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)', opacity: 0.55 }}>내용</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                required
                rows={12}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--divider)', color: 'var(--text)', lineHeight: '1.75' }}
              />
            </div>

            {error && (
              <p className="text-sm" style={{ color: '#DC2626' }}>{error}</p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(listPath)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium"
                style={{ border: '1px solid var(--divider)', color: 'var(--text)', background: 'none', cursor: 'pointer' }}
              >
                <X size={14} /> 취소
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity"
                style={{ backgroundColor: '#FF6F5E', opacity: submitting ? 0.65 : 1, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                <Save size={14} /> {submitting ? '저장 중...' : '저장'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}

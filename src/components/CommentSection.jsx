import { useState, useEffect } from 'react'
import { Trash2, MessageSquare } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function fmt(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  const sameDay = d.toDateString() === now.toDateString()
  if (sameDay) {
    return d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`
}

export default function CommentSection({ postId }) {
  const { user, profile, isAdmin, isLoggedIn } = useAuth()
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    const { data } = await supabase
      .from('r04_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    setComments(data || [])
  }

  useEffect(() => { load() }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitting(true)
    const authorName = profile?.nickname || user?.email?.split('@')[0] || '회원'
    await supabase.from('r04_comments').insert({
      post_id: postId,
      content: content.trim(),
      author_id: user.id,
      author_name: authorName,
      is_answer: false,
    })
    setContent('')
    setSubmitting(false)
    load()
  }

  const handleDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return
    await supabase.from('r04_comments').delete().eq('id', commentId)
    load()
  }

  return (
    <div className="mt-6 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--divider)', backgroundColor: 'var(--card)' }}>
      {/* 헤더 */}
      <div className="flex items-center gap-2 px-6 py-4" style={{ borderBottom: '1px solid var(--divider)' }}>
        <MessageSquare size={15} style={{ color: '#FF6F5E' }} />
        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          댓글 {comments.length}
        </span>
      </div>

      {/* 댓글 목록 */}
      {comments.length === 0 ? (
        <div className="py-10 text-center text-sm" style={{ color: 'var(--text)', opacity: 0.35 }}>
          첫 댓글을 남겨보세요.
        </div>
      ) : (
        <ul>
          {comments.map((c, i) => {
            const canDelete = user && (user.id === c.author_id || isAdmin)
            return (
              <li
                key={c.id}
                style={{ borderBottom: i < comments.length - 1 ? '1px solid var(--divider)' : 'none' }}
              >
                <div className="px-6 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* 아바타 */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: c.is_answer ? '#FF6F5E' : '#F5B23E' }}
                      >
                        {c.author_name?.[0] || '?'}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                            {c.author_name}
                          </span>
                          {c.is_answer && (
                            <span className="text-xs px-1.5 py-0.5 rounded font-medium"
                              style={{ backgroundColor: '#FF6F5E18', color: '#FF6F5E' }}>
                              답변
                            </span>
                          )}
                        </div>
                        <span className="text-xs" style={{ color: 'var(--text)', opacity: 0.4 }}>
                          {fmt(c.created_at)}
                        </span>
                      </div>
                    </div>
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="flex-shrink-0 p-1 rounded transition-opacity hover:opacity-60"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', opacity: 0.35 }}
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-7 whitespace-pre-wrap" style={{ color: 'var(--text)', opacity: 0.8 }}>
                    {c.content}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {/* 입력 폼 */}
      <div style={{ borderTop: '1px solid var(--divider)' }}>
        {isLoggedIn ? (
          <form onSubmit={handleSubmit} className="flex gap-3 px-6 py-4">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="댓글을 입력하세요"
              rows={2}
              maxLength={500}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--divider)', color: 'var(--text)', lineHeight: '1.75' }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e) }
              }}
            />
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="self-end px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity"
              style={{ backgroundColor: '#FF6F5E', opacity: (submitting || !content.trim()) ? 0.5 : 1, border: 'none', cursor: (submitting || !content.trim()) ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}
            >
              {submitting ? '등록 중' : '등록'}
            </button>
          </form>
        ) : (
          <div className="px-6 py-4 text-sm text-center" style={{ color: 'var(--text)', opacity: 0.4 }}>
            로그인 후 댓글을 작성할 수 있습니다.
          </div>
        )}
      </div>
    </div>
  )
}

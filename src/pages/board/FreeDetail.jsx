import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Pencil, Trash2 } from 'lucide-react'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import CommentSection from '../../components/CommentSection'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

function fmt(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`
}

export default function FreeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('r04_posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => { setPost(data); setLoading(false) })
  }, [id])

  const isOwner = user && post && (user.id === post.author_id || isAdmin)

  const handleDelete = async () => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return
    await supabase.from('r04_posts').delete().eq('id', id)
    navigate('/board/free')
  }

  return (
    <Layout>
      <PageHeader category="게시판" title="자유게시판" bgText="BOARD" />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="py-24 text-center text-sm" style={{ color: 'var(--text)', opacity: 0.4 }}>불러오는 중...</div>
        ) : !post ? (
          <div className="py-24 text-center text-sm" style={{ color: 'var(--text)', opacity: 0.4 }}>게시글을 찾을 수 없습니다.</div>
        ) : (
          <article className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--divider)', backgroundColor: 'var(--card)' }}>
            <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid var(--divider)' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{post.title}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm font-medium" style={{ color: '#FF6F5E' }}>{post.author_name || '익명'}</span>
                    <span className="text-sm" style={{ color: 'var(--text)', opacity: 0.4 }}>{fmt(post.created_at)}</span>
                  </div>
                </div>
                {isOwner && (
                  <div className="flex gap-2 flex-shrink-0 mt-1">
                    <button
                      onClick={() => navigate(`/board/free/${id}/edit`)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ border: '1px solid var(--divider)', color: 'var(--text)', background: 'none', cursor: 'pointer' }}
                    >
                      <Pencil size={12} /> 수정
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ border: '1px solid #FCA5A5', color: '#DC2626', background: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={12} /> 삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="px-8 py-8">
              <p className="text-sm leading-8 whitespace-pre-wrap" style={{ color: 'var(--text)', opacity: 0.85 }}>
                {post.content}
              </p>
            </div>
          </article>
        )}

        {post && <CommentSection postId={id} />}

        <div className="mt-6">
          <button
            onClick={() => navigate('/board/free')}
            className="flex items-center gap-1 text-sm transition-opacity hover:opacity-70"
            style={{ color: 'var(--text)', opacity: 0.5, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ChevronLeft size={15} /> 목록으로
          </button>
        </div>
      </section>
    </Layout>
  )
}

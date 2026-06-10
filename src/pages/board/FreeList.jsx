import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, ChevronRight } from 'lucide-react'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

function fmt(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`
}

export default function FreeList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    supabase
      .from('r04_posts')
      .select('id, title, author_name, created_at')
      .eq('category', 'free')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setPosts(data || []); setLoading(false) })
  }, [])

  const handleWrite = () => {
    if (!user) {
      navigate('/login', { state: { from: '/board/free' } })
      return
    }
    navigate('/board/free/write')
  }

  return (
    <Layout>
      <PageHeader category="게시판" title="자유게시판" bgText="BOARD" />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleWrite}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: '#FF6F5E', border: 'none', cursor: 'pointer' }}
          >
            <Plus size={15} /> 글쓰기
          </button>
        </div>

        {loading ? (
          <div className="py-24 text-center text-sm" style={{ color: 'var(--text)', opacity: 0.4 }}>불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="py-24 text-center text-sm" style={{ color: 'var(--text)', opacity: 0.4 }}>첫 번째 글을 작성해보세요.</div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--divider)' }}>
            {/* Header row */}
            <div className="hidden sm:grid grid-cols-[3rem_1fr_7rem_7rem] px-6 py-2.5 text-xs font-medium"
              style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--divider)', color: 'var(--text)', opacity: 0.5 }}>
              <span className="text-center">번호</span>
              <span>제목</span>
              <span className="text-center">작성자</span>
              <span className="text-center">날짜</span>
            </div>

            {posts.map((p, i) => (
              <Link
                key={p.id}
                to={`/board/free/${p.id}`}
                className="grid sm:grid-cols-[3rem_1fr_7rem_7rem] items-center px-6 py-4 transition-colors"
                style={{
                  borderBottom: i < posts.length - 1 ? '1px solid var(--divider)' : 'none',
                  backgroundColor: 'var(--card)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card)'}
              >
                <span className="hidden sm:block text-center text-xs" style={{ color: 'var(--text)', opacity: 0.35 }}>
                  {posts.length - i}
                </span>
                <span className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{p.title}</span>
                <span className="hidden sm:block text-center text-xs truncate" style={{ color: 'var(--text)', opacity: 0.5 }}>
                  {p.author_name || '익명'}
                </span>
                <span className="hidden sm:block text-center text-xs" style={{ color: 'var(--text)', opacity: 0.4 }}>
                  {fmt(p.created_at)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}

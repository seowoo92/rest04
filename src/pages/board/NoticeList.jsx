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

export default function NoticeList() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    supabase
      .from('r04_posts')
      .select('id, title, created_at')
      .eq('category', 'notice')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setNotices(data || []); setLoading(false) })
  }, [])

  return (
    <Layout>
      <PageHeader category="게시판" title="공지사항" bgText="NOTICE" />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isAdmin && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate('/board/notice/write')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#FF6F5E', border: 'none', cursor: 'pointer' }}
            >
              <Plus size={15} /> 글쓰기
            </button>
          </div>
        )}

        {loading ? (
          <div className="py-24 text-center text-sm" style={{ color: 'var(--text)', opacity: 0.4 }}>불러오는 중...</div>
        ) : notices.length === 0 ? (
          <div className="py-24 text-center text-sm" style={{ color: 'var(--text)', opacity: 0.4 }}>등록된 공지사항이 없습니다.</div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--divider)' }}>
            {notices.map((n, i) => (
              <Link
                key={n.id}
                to={`/board/notice/${n.id}`}
                className="flex items-center justify-between px-6 py-4 transition-colors"
                style={{
                  borderBottom: i < notices.length - 1 ? '1px solid var(--divider)' : 'none',
                  backgroundColor: 'var(--card)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card)'}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                    style={{ backgroundColor: '#FF6F5E18', color: '#FF6F5E' }}>
                    공지
                  </span>
                  <span className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{n.title}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <span className="text-xs" style={{ color: 'var(--text)', opacity: 0.4 }}>{fmt(n.created_at)}</span>
                  <ChevronRight size={13} style={{ color: 'var(--text)', opacity: 0.3 }} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}

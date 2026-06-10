import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, redirectURL } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (user) => {
    if (!user) return setProfile(null)
    const { data } = await supabase
      .from('r04_profiles')
      .select('id, nickname, role')
      .eq('id', user.id)
      .maybeSingle()

    if (data) { setProfile(data); return }

    // 최초 로그인 시 프로필 생성
    const m = user.user_metadata || {}
    const nickname =
      m.nickname || m.name || m.full_name || m.preferred_username ||
      user.email?.split('@')[0] || '회원'
    const { data: created } = await supabase
      .from('r04_profiles')
      .insert({ id: user.id, nickname })
      .select('id, nickname, role')
      .single()
    setProfile(created ?? { id: user.id, nickname, role: 'user' })
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      loadProfile(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess)
      loadProfile(sess?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [loadProfile])

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  const signUp = (email, password, nickname) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname: nickname || email.split('@')[0] },
        emailRedirectTo: redirectURL(),
      },
    })

  const signInWithKakao = () =>
    supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: redirectURL() },
    })

  const signOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user ?? null,
      profile,
      isAdmin: profile?.role === 'admin',
      isLoggedIn: !!session,
      loading,
      signIn,
      signUp,
      signInWithKakao,
      signOut,
      reloadProfile: () => loadProfile(session?.user ?? null),
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

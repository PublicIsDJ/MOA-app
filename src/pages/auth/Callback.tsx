import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../shared/lib/supabase'

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)
        if (error) throw error
        if (!cancelled) {
          navigate('/cards', { replace: true })
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message ?? '인증 처리 중 오류가 발생했습니다.')
        }
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [navigate])

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 18, marginBottom: 8 }}>로그인 처리 중…</h1>
      <p>잠시만 기다려 주세요.</p>
      {error && (
        <p style={{ color: 'crimson', marginTop: 12 }}>
          {error}
        </p>
      )}
    </div>
  )
}

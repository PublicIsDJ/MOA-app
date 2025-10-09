import { supabase } from '../../../shared/lib/supabase'

type Props = {
  label?: string
}

export function KakaoLoginButton({ label = '카카오로 로그인' }: Props) {
  async function handleClick() {
    const redirectTo = `${window.location.origin}/auth/callback`
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
          scopes: 'profile_nickname profile_image account_email', // MARK: - 인증 요청 시, 필수 스코프 지정
        },
      })
      if (error) throw error
      if (data?.url) {
        window.location.assign(data.url)
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Kakao OAuth start failed:', err)
      alert(err?.message ?? '로그인 시작 중 오류가 발생했습니다.')
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: '#FEE500',
        color: '#000',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: '8px 12px',
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  )
}

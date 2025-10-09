import { supabase } from '../../../shared/lib/supabase'

type Props = {
  label?: string
  onSignedOut?: () => void
}

export function SignOutButton({ label = '로그아웃', onSignedOut }: Props) {
  async function handleClick() {
    await supabase.auth.signOut()
    onSignedOut?.()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: '#fff',
        color: '#111827',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: '8px 12px',
        fontWeight: 500,
      }}
    >
      {label}
    </button>
  )
}


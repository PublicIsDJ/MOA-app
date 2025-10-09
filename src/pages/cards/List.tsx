import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { cardRegistry } from '../../features/cards/cards-mission/config/registry'
import { useAuth, KakaoLoginButton, SignOutButton } from '../../features/auth'

export function CardsListPage() {
  const slugs = useMemo(() => Object.keys(cardRegistry).sort(), [])
  const { user } = useAuth()

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h1 style={{ fontSize: 20 }}>카드 미션 목록</h1>
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#6b7280' }}>
                {user.email ?? user.user_metadata?.name ?? user.id.slice(0, 8)} 님
              </span>
              <SignOutButton />
            </div>
          ) : (
            <KakaoLoginButton />
          )}
        </div>
      </div>
      {slugs.length === 0 ? (
        <p>등록된 카드가 없습니다.</p>
      ) : (
        <ul style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
          {slugs.map((slug) => (
            <li key={slug} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>{slug}</div>
              <Link to={`/cards/${slug}`} style={{ color: '#2563eb' }}>
                열기
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 16 }}>
        <Link to="/cards/CD-001" style={{ color: '#2563eb' }}>
          첫 카드로 이동
        </Link>
      </div>
    </div>
  )
}

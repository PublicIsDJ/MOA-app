import  { Suspense, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { cardRegistry } from '../../features/cards/cards-mission/config/registry'
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary'

export function MissionPage() {
  const { slug } = useParams()
  const key = useMemo(() => (slug ? slug.toUpperCase() : ''), [slug])
  const Comp = key ? cardRegistry[key] : undefined

  if (!Comp) {
    return (
      <div style={{ padding: 16 }}>
        <p>존재하지 않는 카드입니다.</p>
        <Link to="/cards/CD-001">첫 카드로 이동</Link>
      </div>
    )
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>슬러그: {key}</div>
      <ErrorBoundary fallback={<div style={{ color: 'crimson' }}>컴포넌트를 불러오는 중 오류가 발생했습니다.</div>}>
        <Suspense fallback={<div>로딩 중…</div>}>
          <Comp />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

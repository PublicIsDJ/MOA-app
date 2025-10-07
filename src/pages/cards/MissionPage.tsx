import React, { Suspense, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { cardRegistry } from '../../features/cards/cards-mission/config/registry'

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
    <Suspense fallback={<div style={{ padding: 16 }}>로딩 중…</div>}>
      <Comp />
    </Suspense>
  )
}

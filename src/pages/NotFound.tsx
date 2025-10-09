import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>페이지를 찾을 수 없습니다.</h1>
      <Link to="/cards" style={{ color: '#2563eb' }}>
        카드 목록으로 이동
      </Link>
    </div>
  )
}


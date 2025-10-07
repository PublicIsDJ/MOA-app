import { Link } from 'react-router-dom'
import { missions } from '../../features/cards/lib/missions'

export function CardsIndexPage() {
  return (
    <div style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>카드덱 미션</h1>
      <p style={{ color: '#555', marginBottom: 16 }}>
        총 15장의 미션 카드입니다. 항목을 클릭해 상세 페이지로 이동하세요.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {missions.map((m) => (
          <li
            key={m.id}
            style={{
              marginBottom: 8,
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 12,
            }}
          >
            <Link to={`/cards/${m.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{m.title}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{m.category}</div>
                </div>
                <div style={{ color: '#2563eb' }}>자세히 보기 →</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


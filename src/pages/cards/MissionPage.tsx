import React, { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMissionById } from '../../features/cards/lib/missions'

export function MissionPage() {
  const { cardId } = useParams()
  const mission = useMemo(() => (cardId ? getMissionById(cardId) : undefined), [cardId])
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  if (!mission) {
    return (
      <div style={{ padding: 16 }}>
        <p>존재하지 않는 카드입니다.</p>
        <Link to="/cards">목록으로 돌아가기</Link>
      </div>
    )
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 백엔드 연동 시 API 저장
    alert('임시 저장: ' + (input || '(내용 없음)'))
    setInput('')
  }

  return (
    <div style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer' }}
      >
        ← 뒤로
      </button>
      <h1 style={{ marginTop: 8, marginBottom: 4 }}>{mission.title}</h1>
      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>{mission.category}</div>
      <p style={{ marginBottom: 16 }}>{mission.description}</p>

      <form onSubmit={onSubmit}>
        <label htmlFor="mission-input" style={{ fontWeight: 600 }}>
          미션 입력
        </label>
        <textarea
          id="mission-input"
          placeholder="미션 수행 내용을 자유롭게 기록하세요. (백엔드 연동 전 임시 저장)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          style={{ width: '100%', padding: 8, marginTop: 8, borderRadius: 6, border: '1px solid #e5e7eb' }}
        />
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button
            type="submit"
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 12px',
              cursor: 'pointer',
            }}
          >
            저장(임시)
          </button>
          <Link to="/cards" style={{ alignSelf: 'center', color: '#374151' }}>
            목록으로
          </Link>
        </div>
      </form>
    </div>
  )
}


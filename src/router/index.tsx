import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MissionPage } from '../pages/cards/MissionPage'
import { CardsListPage } from '../pages/cards/List'
import { AuthCallbackPage } from '../pages/auth/Callback'
import { NotFoundPage } from '../pages/NotFound'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cards" replace />} /> {/*TODO: - 해당 라우트 변경(임시 테스트용 페이지) */}
        <Route path="/cards" element={<CardsListPage />} /> {/*TODO: - 해당 라우트 삭제(임시 테스트용 페이지) */}
        <Route path="/cards/:slug" element={<MissionPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

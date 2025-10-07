import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MissionPage } from '../../pages/cards/MissionPage'
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cards/CD-001" replace />} />
        <Route path="/cards/:slug" element={<MissionPage />} />
        <Route path="*" element={<Navigate to="/cards/CD-001" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

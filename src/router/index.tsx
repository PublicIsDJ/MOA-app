import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CardsIndexPage } from '../pages/cards'
import { MissionPage } from '../pages/cards/MissionPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cards" replace />} />
      <Route path="/cards" element={<CardsIndexPage />} />
      <Route path="/cards/:cardId" element={<MissionPage />} />
      <Route path="*" element={<Navigate to="/cards" replace />} />
    </Routes>
  )
}


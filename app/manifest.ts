// TITLE: PWA 설정

import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MOA',
    short_name: 'MOA',
    description: '카드로 시작하는 재미있는 뇌 건강 습관',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4466D1',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}
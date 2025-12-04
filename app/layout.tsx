import type { Metadata, Viewport } from "next";
import { Container } from "@/shared/ui/container";
import "./globals.css";

// MARK: PWA 메타데이터
export const metadata: Metadata = {
  title: 'MOA',
  description: '카드로 시작하는 재미있는 뇌 건강 습관',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MOA',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

// MARK: 뷰포트 설정 (PWA 최적화)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#4466D1',
}

// MARK: 레이아웃 형식을 고정 (모바일 규격: max-width 430px)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* 모바일 규격 컨테이너 - 중앙 정렬 */}
        <div className="mx-auto max-w-[430px] min-h-screen bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
          <Container>
            {children}
          </Container>
        </div>
      </body>
    </html>
  );
}
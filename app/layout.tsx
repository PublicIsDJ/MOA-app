import type { Metadata } from "next";
import { Container } from "@/shared/ui/container";
import "./globals.css";

export const metadata: Metadata = {
  title: 'MOA',
  description: '카드로 시작하는 재미있는 뇌 건강 습관',
}

// MARK: 레이아웃 형식을 고정(ex. 양 옆 패딩 16px)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Container>
            {children}
        </Container>
      </body>
    </html>
  );
}
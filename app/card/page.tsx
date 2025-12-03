'use client';

import { Container } from "@/shared/ui/container";
import { ThemeCardGrid } from "@/features/card/ui/theme-card";
import { BottomNavigation } from "@/shared/ui/bottom-nav";
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';

export default function CardPage() {
  const { isChecking } = useAuthGuard();

  if (isChecking) return <AuthLoading />;

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F0F0] full-bleed pb-[60px]">
      <div className="flex-1 flex items-center justify-center">
        <Container>
          <h1 className="text-2xl font-bold mb-6 text-black">어떤 테마로 시작해볼까요?</h1>
          <ThemeCardGrid />
        </Container>
      </div>
      <BottomNavigation />
    </div>
  );
}


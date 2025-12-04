'use client';

import { ThemeCardGrid } from "@/features/card/ui/theme-card";
import { BottomNavigation } from "@/shared/ui/bottom-nav";
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';

export default function CardPage() {
  const { isChecking } = useAuthGuard();

  if (isChecking) return <AuthLoading />;

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#EDEDED] full-bleed pb-[88px]">
      <div className="w-full max-w-[430px] flex flex-col flex-1">
        <div className="flex-1 flex items-center justify-center px-2">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-6 text-black">어떤 테마로 시작해볼까요?</h1>
            <ThemeCardGrid />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}


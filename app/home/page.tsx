import { Container } from "@/shared/ui/container";
import { ThemeCardGrid } from "@/features/home/ui/theme-card";
import { BottomNavigation } from "@/shared/ui/bottom-nave";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F0F0F0] full-bleed">
      <div className="flex-1 flex items-center justify-center">
        <Container>
          <h1 className="text-2xl font-bold mb-6">어떤 테마로 시작해볼까요?</h1>
          <ThemeCardGrid />
        </Container>
      </div>
      <BottomNavigation />
    </div>
  );
}


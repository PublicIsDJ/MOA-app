'use client';

import { Container } from "@/shared/ui/container";
import { BottomNavigation } from "@/shared/ui/bottom-nave";

export default function ProfilePage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F0F0F0] full-bleed">
                <div className="flex-1 flex items-center justify-center">
                <Container>
                    <h1 className="text-2xl font-bold mb-6">프로필페이지</h1>
                </Container>
                </div>
                <BottomNavigation />
        </div>
    );
}
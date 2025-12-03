'use client';

import { usePathname } from "next/navigation";
import { AuthHeader, HeaderWithBefore } from "@/features/auth/ui/auth-header";
import { Container } from "@/shared/ui/container";
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';

export default function CardsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isChecking } = useAuthGuard();
    const pathname = usePathname();
    const isFirstCard = pathname?.endsWith('/cd-006');

    if (isChecking) return <AuthLoading />;

    return (
        <div className="min-h-screen flex flex-col bg-white full-bleed pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom) + 2rem)' }}>
            <Container>
                {isFirstCard ? (
                    <AuthHeader title="시간" className="py-[11px]" fallbackPath="/card" />
                ) : (
                    <HeaderWithBefore title="시간" className="py-[11px]" fallbackPath="/card"/>
                )}
                <div className="flex-1">{children}</div>
            </Container>
        </div>
    );
}


'use client';

import { usePathname } from "next/navigation";
import { AuthHeader,HeaderWithBefore } from "@/features/auth/ui/auth-header";
import { Container } from "@/shared/ui/container";
export default function CardsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isFirstCard = pathname?.endsWith('/cd-006');

    return (
        <div className="min-h-screen flex flex-col bg-white full-bleed pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom) + 2rem)' }}>
            <Container>
                {isFirstCard ? (
                    <AuthHeader title="시간" className="py-[11px]" />
                ) : (
                    <HeaderWithBefore title="시간" className="py-[11px]" fallbackPath="/time"/>
                )}
                <div className="flex-1">{children}</div>
            </Container>
        </div>
    );
}


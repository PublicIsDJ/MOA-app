import { AuthHeader } from "@/features/auth/ui/auth-header";
import { Container } from "@/shared/ui/container";

export default function CardsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-white full-bleed pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom) + 2rem)' }}>
            <Container>
                <AuthHeader title='나' className="py-[11px]"/>
                <div className="flex-1">
                    {children}
                </div>
            </Container>
        </div>
    );
}


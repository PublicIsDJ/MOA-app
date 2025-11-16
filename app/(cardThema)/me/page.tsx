'use client';

import { useRouter } from 'next/navigation';
import { Container } from "@/shared/ui/container";
import { BottomNavigation } from "@/shared/ui/bottom-nav";
import { CardListItem } from "@/features/cardThema/me/ui/card-list-item";


const cards = [
    { title: '내가 태어난 날', icon: '/cards-me/birth.svg', route: '/me/cd-001' },
    { title: '나의 이름', icon: '/cards-me/name.svg', route: '/me/cd-002' },
    { title: '나의 기질', icon: '/cards-me/feature.svg', route: '/me/cd-003' },
    { title: '나의 입맛', icon: '/cards-me/sound.svg', route: '/me/cd-004' },
    { title: '나의 소리', icon: '/cards-me/taste.svg', route: '/me/cd-005' }
];

export default function MeCardsPage() {
    const router = useRouter();

    const handleCardClick = (route: string) => {
        router.push(route);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F0F0F0] full-bleed">
            <div className="flex-1 flex items-center justify-center">
                <Container>
                    <h1 className="text-2xl font-bold mb-6">나 테마</h1>
                    <div className="flex flex-col gap-4">
                        {cards.map((card, index) => (
                            <CardListItem
                                key={index}
                                title={card.title}
                                icon={card.icon}
                                onClick={() => handleCardClick(card.route)}
                                delay={index * 100}
                            />
                        ))}
                    </div>
                </Container>
            </div>
            <BottomNavigation />
        </div>
    );
}
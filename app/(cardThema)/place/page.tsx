'use client';

import { useRouter } from 'next/navigation';
import { Container } from "@/shared/ui/container";
import { BottomNavigation } from "@/shared/ui/bottom-nav";
import { CardListItem } from "@/features/cardThema/me/ui/card-list-item";


const cards = [
    { title: '내가 좋아하는 공간', icon: '/cards-place/favorite.svg', route: '/place/cd-011' },
    { title: '나의 여행지', icon: '/cards-place/travle.svg', route: '/place/cd-012' },
    { title: '나만의 영화관', icon: '/cards-place/movie.svg', route: '/place/cd-013' },
    { title: '무인도에 간다면', icon: '/cards-place/island.svg', route: '/place/cd-014' },
    { title: '나의 마지막', icon: '/cards-place/my-last.svg', route: '/place/cd-015' }
];

export default function MeCardsPage() {
    const router = useRouter();

    const handleCardClick = (route: string) => {
        router.push(route);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F0F0F0] full-bleed pb-[60px]">
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
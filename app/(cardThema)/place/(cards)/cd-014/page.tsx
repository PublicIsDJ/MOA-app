'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { IslandForm } from '@/widgets/cardThema/place/island-form';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialIslandData, type IslandData } from '@/features/cardThema/place/types';

const QR_CODE = 'CD-014';

export default function GoingToIsland() {
    const router = useRouter();
    const [formData, setFormData] = useState<IslandData>(initialIslandData);
    const [cardId, setCardId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCardId = async () => {
            try {
                const card = await scanQrCode(QR_CODE);
                setCardId(card.id);
            } catch (error) {
                console.error('카드 조회 실패:', error);
            }
        };

        fetchCardId();
    }, []);

    const handleNext = async () => {
        if (!cardId) {
            console.error('카드 ID를 찾을 수 없습니다');
            router.push('/place/cd-015');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/place/cd-015');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/place/cd-015');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={4}
                totalCards={5}
                title='무인도에 간다면'
                description='무인도에 간다면 무슨일이 생길까요?'
                frontImage='/cards-place/island.svg'
            />

            <section className='card-input-form gap-6'>
                <IslandForm data={formData} onChange={setFormData} />
            </section>
            <footer className='w-full flex gap-5 mt-6 pb-4'>
                <Button
                    status='inactive'
                    className='flex-1 py-[19px] rounded-[12px]'
                    onClick={() => router.push('/place/cd-013')}
                    disabled={isLoading}
                >
                    이전으로
                </Button>
                <Button
                    className='flex-1 py-[19px] rounded-[12px]'
                    onClick={handleNext}
                    disabled={isLoading}
                >
                    {isLoading ? '저장 중...' : '다음으로'}
                </Button>
            </footer>
        </>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { BodyForm } from '@/features/cardThema/time/ui/body-form';
import { Button } from '@/shared/ui/button';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialBodyData, type BodyData } from '@/features/cardThema/time/types';

const QR_CODE = 'CD-007';

export default function CardOfBodyPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<BodyData>(initialBodyData);
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
            router.push('/time/cd-008');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/time/cd-008');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/time/cd-008');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={2}
                totalCards={5}
                title='나의 몸'
                description='나의 몸에는 어떤 흔적들이 있나요?'
                frontImage='/cards-time/body.svg'
            />
            <BodyForm data={formData} onChange={setFormData} />
            <Button
                className='py-[19px] rounded-[12px] mt-5'
                onClick={handleNext}
                disabled={isLoading}
            >
                {isLoading ? '저장 중...' : '다음카드'}
            </Button>
        </>
    );
}
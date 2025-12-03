'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { BirthForm } from '@/features/cardThema/me/ui/birth-form';
import { Button } from '@/shared/ui/button';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialBirthData, type BirthData } from '@/features/cardThema/me/types';

const QR_CODE = 'CD-001';

export default function CardOfBirthPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<BirthData>(initialBirthData);
    const [cardId, setCardId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 카드 UUID 조회
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
            router.push('/me/cd-002');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/me/cd-002');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/me/cd-002');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={1}
                totalCards={5}
                title='내가 태어난 날'
                description='내가 태어난 날은 어떤일이 있었나요?'
                frontImage='/cards-me/birth.svg'
            />
            <BirthForm data={formData} onChange={setFormData} />
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
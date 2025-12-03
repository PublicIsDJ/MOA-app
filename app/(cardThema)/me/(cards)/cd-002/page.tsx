'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { NameForm } from '@/features/cardThema/me/ui/name-form';
import { Button } from '@/shared/ui/button';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialNameData, type NameData } from '@/features/cardThema/me/types';

const QR_CODE = 'CD-002';

export default function CardOfNamePage() {
    const router = useRouter();
    const [formData, setFormData] = useState<NameData>(initialNameData);
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
            router.push('/me/cd-003');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/me/cd-003');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/me/cd-003');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={2}
                totalCards={5}
                title='나의 이름'
                description='나의 이름에는 어떤 의미가 있나요?'
                frontImage='/cards-me/name.svg'
            />
            <NameForm data={formData} onChange={setFormData} />
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
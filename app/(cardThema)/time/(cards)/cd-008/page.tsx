'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { RythmForm } from '@/features/cardThema/time/ui/rythm-form';
import { Button } from '@/shared/ui/button';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialRythmData, type RythmData } from '@/features/cardThema/time/types';

const QR_CODE = 'CD-008';

export default function CardOfRythmPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<RythmData>(initialRythmData);
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
            router.push('/time/cd-009');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/time/cd-009');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/time/cd-009');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={3}
                totalCards={5}
                title='나의 리듬'
                description='내 삶의 리듬은 무엇인가요?'
                frontImage='/cards-time/rythm.svg'
            />
            <RythmForm data={formData} onChange={setFormData} />
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
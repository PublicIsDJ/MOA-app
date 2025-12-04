'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import TalentForm from '@/widgets/cardThema/time/talent-form';
import { Button } from '@/shared/ui/button';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialStageData, type StageData } from '@/features/cardThema/time/types';

const QR_CODE = 'CD-010';

export default function CardOfStage() {
    const router = useRouter();
    const [formData, setFormData] = useState<StageData>(initialStageData);
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

    const handleComplete = async () => {
        if (!cardId) {
            console.error('카드 ID를 찾을 수 없습니다');
            router.push('/home');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/home');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/home');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={5}
                totalCards={5}
                title='나의 무대'
                description='내가 제일 자신 있는 것은 무엇인가요?'
                frontImage='/cards-time/stage.svg'
            />

            <TalentForm data={formData} onChange={setFormData} />

            <footer className='w-full flex gap-4 mt-6 pb-4'>
                <Button
                    status='inactive'
                    className='py-[19px] rounded-[12px]'
                    onClick={() => router.push('/time/cd-009')}
                >
                    이전으로
                </Button>
                <Button
                    className='py-[19px] rounded-[12px]'
                    onClick={handleComplete}
                    disabled={isLoading}
                >
                    {isLoading ? '저장 중...' : '완료'}
                </Button>
            </footer>
        </>
    );
}

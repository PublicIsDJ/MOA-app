'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { MyLastForm } from '@/widgets/cardThema/place/my-last-form';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialMyLastData, type MyLastData } from '@/features/cardThema/place/types';

const QR_CODE = 'CD-015';

export default function MyLastPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<MyLastData>(initialMyLastData);
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
                title='나의 마지막'
                description='나의 마지막은 어떤 모습 일까요?'
                frontImage='/cards-place/my-last.svg'
            />

            <section className='card-input-form gap-6'>
                <MyLastForm data={formData} onChange={setFormData} />
            </section>
            <footer className='w-full flex gap-5 mt-6 pb-4'>
                <Button
                    status='inactive'
                    className='flex-1 py-[19px] rounded-[12px]'
                    onClick={() => router.push('/place/cd-014')}
                    disabled={isLoading}
                >
                    이전으로
                </Button>
                <Button
                    className='flex-1 py-[19px] rounded-[12px]'
                    onClick={handleComplete}
                    disabled={isLoading}
                >
                    {isLoading ? '저장 중...' : '완료하기'}
                </Button>
            </footer>
        </>
    );
}

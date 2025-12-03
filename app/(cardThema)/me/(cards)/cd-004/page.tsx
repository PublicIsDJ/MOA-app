'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { InputBox } from '@/shared/ui/input-box';
import { Button } from '@/shared/ui/button';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialTasteData, type TasteData } from '@/features/cardThema/me/types';

const QR_CODE = 'CD-004';

export default function CardOfTastePage() {
    const router = useRouter();
    const [formData, setFormData] = useState<TasteData>(initialTasteData);
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
            router.push('/me/cd-005');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/me/cd-005');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/me/cd-005');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={4}
                totalCards={5}
                title='나의 입맛'
                description='나는 어떤 음식을 좋아하나요?'
                frontImage='/cards-me/taste.svg'
            />

            {/* TODO: feature or widget로 분리 */}
            <main className='flex-1 flex flex-col gap-8 bg-[#F6F6F6] rounded-[20px] px-6 py-10'>

                <section className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>어제 먹었던 음식은?</label>
                    <InputBox
                        placeholder='내가 어제 먹었던 음식을 적어주세요'
                        className='bg-white py-3 rounded-[12px]'
                        value={formData.yesterdayFood}
                        onChange={(e) => setFormData(prev => ({ ...prev, yesterdayFood: e.target.value }))}
                    />
                </section>

                <section className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>내일은 무엇을 먹을까요?</label>
                    <InputBox
                        placeholder='내일 무엇을 먹을지 적어주세요'
                        className='bg-white py-3 rounded-[12px]'
                        value={formData.tomorrowFood}
                        onChange={(e) => setFormData(prev => ({ ...prev, tomorrowFood: e.target.value }))}
                    />
                </section>
            </main>

            <footer className='w-full flex gap-5 mt-5'>
                <Button status='inactive' className='flex-1 py-[19px] rounded-[12px]' onClick={() => router.back()}>이전으로</Button>
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
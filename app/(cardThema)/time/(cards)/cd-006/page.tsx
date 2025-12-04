'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { TIME_SEASON } from '@/features/cardThema/time/constant/season';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialSeasonData, type SeasonData } from '@/features/cardThema/time/types';

const QR_CODE = 'CD-006';

export default function CardOfFeaturePage() {
    const router = useRouter();
    const [formData, setFormData] = useState<SeasonData>(initialSeasonData);
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
            router.push('/time/cd-007');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/time/cd-007');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/time/cd-007');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={1}
                totalCards={5}
                title='좋아하는 계절'
                description='내가 좋아하는 계절이 있나요?'
                frontImage='/cards-time/season.svg'
            />
            <div className='flex-1 flex flex-col gap-6 bg-[#F6F6F6] rounded-[20px] px-5 py-8'>
                <section>
                    <h1 className='text-lg font-semibold mb-4'>내가 좋아하는 계절은?</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        {TIME_SEASON.season.map((item, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => setFormData({ ...formData, season: index })}
                                className={`w-full aspect-[149/80] rounded-[12px] flex flex-col items-center justify-center gap-1 transition-all ${
                                    formData.season === index
                                        ? 'bg-[#4466D1] text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <p className='text-2xl'>{item.icon}</p>
                                <p className='font-medium'>{item.title}</p>
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h1 className='text-lg font-semibold mb-4'>그 계절에 내가 가장 좋아하는 맛은?</h1>
                    <div className='grid grid-cols-3 gap-3'>
                        {TIME_SEASON.taste.map((item, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => setFormData({ ...formData, taste: index })}
                                className={`w-full aspect-[149/80] rounded-[12px] flex flex-col items-center justify-center gap-1 transition-all ${
                                    formData.taste === index
                                        ? 'bg-[#4466D1] text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <p className='text-2xl'>{item.icon}</p>
                                <p className='font-medium'>{item.title}</p>
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            <footer className='w-full flex gap-4 mt-5'>
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

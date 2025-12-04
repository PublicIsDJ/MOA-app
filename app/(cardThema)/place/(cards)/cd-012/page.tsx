'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { TravelSelect } from '@/features/cardThema/place/ui/travel-select';
import { InputBox } from '@/shared/ui/input-box';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialTravelData, type TravelData } from '@/features/cardThema/place/types';

const QR_CODE = 'CD-012';

const fields: Array<{
    key: keyof Pick<TravelData, 'bestTrip' | 'worstTrip'>;
    label: string;
    placeholder: string;
}> = [
    { key: 'bestTrip', label: '최고의 여행지는?', placeholder: '내 최고의 여행지는 어디인가요?' },
    { key: 'worstTrip', label: '최악의 여행지는?', placeholder: '내 최악의 여행지는 어디인가요?' }
];

export default function MyTravelPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<TravelData>(initialTravelData);
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
            router.push('/place/cd-013');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/place/cd-013');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/place/cd-013');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={2}
                totalCards={5}
                title='나의 여행지'
                description='나는 어떤 여행을 좋아하나요?'
                frontImage='/cards-place/travle.svg'
            />

            <section id='place-travel-form' className='card-input-form'>
                <TravelSelect
                    value={formData.travelStyle}
                    onChange={(value) => setFormData({ ...formData, travelStyle: value })}
                />

                {fields.map((item) => (
                    <section key={item.key} className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-700'>{item.label}</label>
                        <InputBox
                            placeholder={item.placeholder}
                            value={formData[item.key]}
                            onChange={(e) => setFormData({ ...formData, [item.key]: e.target.value })}
                            className='py-[12px] rounded-[12px] bg-white'
                        />
                    </section>
                ))}
            </section>

            <footer className='w-full flex gap-5 mt-6 pb-4'>
                <Button
                    status='inactive'
                    className='flex-1 py-[19px] rounded-[12px]'
                    onClick={() => router.push('/place/cd-011')}
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

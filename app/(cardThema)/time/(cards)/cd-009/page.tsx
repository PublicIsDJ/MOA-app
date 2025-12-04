'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { FriendForm } from '@/features/cardThema/time/ui/friend-form';
import { TIME_FRIEND_WITH } from '@/features/cardThema/time/constant/friend';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialFriendData, type FriendData } from '@/features/cardThema/time/types';

const QR_CODE = 'CD-009';

export default function CardOfFriendPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<FriendData>(initialFriendData);
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
            router.push('/time/cd-010');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/time/cd-010');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/time/cd-010');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={4}
                totalCards={5}
                title='나의 지인'
                description='나의 지인들을 누가 있을까요?'
                frontImage='/cards-time/friend.svg'
            />
            <div className='flex-1 flex flex-col gap-6 bg-[#F6F6F6] rounded-[20px] px-5 py-8'>
                <FriendForm data={formData} onChange={setFormData} />

                <section>
                    <h1 className='text-lg font-semibold mb-4'>지인과 하고 싶은 것은?</h1>
                    <div className='grid grid-cols-3 gap-3'>
                        {TIME_FRIEND_WITH.map((item, index) => {
                            const isSelected = formData.wantToDo === index;
                            return (
                                <button
                                    key={index}
                                    type='button'
                                    onClick={() => setFormData({ ...formData, wantToDo: index })}
                                    className={`aspect-[98/72] flex flex-col items-center justify-center rounded-[12px] transition-all ${
                                        isSelected
                                            ? 'bg-[#4466D1] text-white'
                                            : 'bg-white text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    <p className='text-xl'>{item.icon}</p>
                                    <p className='font-medium text-xs'>{item.title}</p>
                                </button>
                            );
                        })}
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

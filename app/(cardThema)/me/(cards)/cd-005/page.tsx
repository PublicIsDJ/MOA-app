'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { MY_FEATURES } from '@/features/cardThema/me/constants/sound';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialSoundData, type SoundData } from '@/features/cardThema/me/types';

const QR_CODE = 'CD-005';

export default function CardOfSoundPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<SoundData>(initialSoundData);
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
            router.push('/me');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/me');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/me');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={5}
                totalCards={5}
                title='나의 소리'
                description='나는 어떤 소리를 좋아하나요?'
                frontImage='/cards-me/sound.svg'
            />

            <main className='flex-1 flex flex-col gap-8 bg-[#F6F6F6] rounded-[20px] px-2 py-10'>
                {/* MARK: 목소리 톤 */}
                <section>
                    <h1 className='text-lg font-semibold mb-4'>나의 목소리 톤은?</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        {MY_FEATURES.voice.map((data, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => setFormData(prev => ({ ...prev, voice: index }))}
                                className={`aspect-[149/80] flex flex-col items-center justify-center py-2 px-[14px] rounded-[12px] transition-all ${
                                    formData.voice === index
                                        ? 'bg-[#4466D1] text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <p className='text-2xl'>{data.icon}</p>
                                <p className='font-medium text-sm'>{data.name}</p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* MARK: 자연의 소리 */}
                <section>
                    <h1 className='text-lg font-semibold mb-4'>내가 좋아하는 자연의 소리는?</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        {MY_FEATURES.nature.map((data, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => setFormData(prev => ({ ...prev, nature: index }))}
                                className={`aspect-[149/80] flex flex-col items-center justify-center py-2 px-[14px] rounded-[12px] transition-all ${
                                    formData.nature === index
                                        ? 'bg-[#4466D1] text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <p className='text-2xl'>{data.icon}</p>
                                <p className='font-medium text-sm'>{data.name}</p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* MARK: 일상의 소리 */}
                <section>
                    <h1 className='text-lg font-semibold mb-4'>내가 좋아하는 일상의 소리는?</h1>
                    <div className='grid grid-cols-3 gap-3'>
                        {MY_FEATURES.general.map((data, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => setFormData(prev => ({ ...prev, general: index }))}
                                className={`aspect-[98/72] flex flex-col items-center justify-center py-2 px-[14px] rounded-[12px] transition-all ${
                                    formData.general === index
                                        ? 'bg-[#4466D1] text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <p className='text-xl'>{data.icon}</p>
                                <p className='font-medium text-xs'>{data.name}</p>
                            </button>
                        ))}
                    </div>
                </section>

            </main>

            <footer className='w-full flex gap-5 mt-5 mb-25'>
                <Button status='inactive' className='flex-1 py-[19px] rounded-[12px]' onClick={() => router.back()}>이전으로</Button>
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
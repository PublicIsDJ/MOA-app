'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { MY_FEATURES } from '@/features/cardThema/me/constants/features';
import { Button } from '@/shared/ui/button';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialFeatureData, type FeatureData } from '@/features/cardThema/me/types';

const QR_CODE = 'CD-003';

export default function CardOfFeaturePage() {
    const router = useRouter();
    const [formData, setFormData] = useState<FeatureData>(initialFeatureData);
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
            router.push('/me/cd-004');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/me/cd-004');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/me/cd-004');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={3}
                totalCards={5}
                title='나의 기질'
                description='나는 어떤 성격을 가지고 있나요?'
                frontImage='/cards-me/feature.svg'
            />
            {/* MARK: 입력 폼 */}
            {/* TODO: feature or widget로 분리 */}
            <div className='flex-1 flex flex-col gap-8 bg-[#F6F6F6] rounded-[20px] px-6 py-10'>
                {/* MARK: 자연 */}
                <section>
                    <h1 className='text-lg font-semibold mb-4'>자연에 비유한 나의 성격은?</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        {MY_FEATURES.nature.map((item, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => setFormData(prev => ({ ...prev, nature: index }))}
                                className={`w-full aspect-[149/80] rounded-[12px] flex flex-col items-center justify-center gap-1 transition-all ${
                                    formData.nature === index
                                        ? 'bg-[#4466D1] text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <p className='text-2xl'>{item.icon}</p>
                                <p className='font-medium'>{item.title}</p>
                                <p className={`text-xs ${formData.nature === index ? 'text-white/80' : 'text-gray-500'}`}>
                                    {item.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* MARK: 동물 */}
                <section>
                    <h1 className='text-lg font-semibold mb-4'>동물에 비유한 나의 성격은?</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        {MY_FEATURES.personal.map((item, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => setFormData(prev => ({ ...prev, personal: index }))}
                                className={`w-full aspect-[149/80] rounded-[12px] flex flex-col items-center justify-center gap-1 transition-all ${
                                    formData.personal === index
                                        ? 'bg-[#4466D1] text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <p className='text-2xl'>{item.icon}</p>
                                <p className='font-medium'>{item.title}</p>
                                <p className={`text-xs ${formData.personal === index ? 'text-white/80' : 'text-gray-500'}`}>
                                    {item.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* MARK: 색상 */}
                <section>
                    <h1 className='text-lg font-semibold mb-4'>색 · 형태로 표현해보면?</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        {MY_FEATURES.color.map((item, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => setFormData(prev => ({ ...prev, color: index }))}
                                className={`w-full aspect-[149/80] rounded-[12px] flex flex-col items-center justify-center gap-1 transition-all ${
                                    formData.color === index
                                        ? 'bg-[#4466D1] text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <p className='text-2xl'>{item.icon}</p>
                                <p className='font-medium'>{item.title}</p>
                                <p className={`text-xs ${formData.color === index ? 'text-white/80' : 'text-gray-500'}`}>
                                    {item.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* MARK: 일상소품 */}
                <section>
                    <h1 className='text-lg font-semibold mb-4'>일상소품으로 표현해보면?</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        {MY_FEATURES.object.map((item, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => setFormData(prev => ({ ...prev, object: index }))}
                                className={`w-full aspect-[149/80] rounded-[12px] flex flex-col items-center justify-center gap-1 transition-all ${
                                    formData.object === index
                                        ? 'bg-[#4466D1] text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <p className='text-2xl'>{item.icon}</p>
                                <p className='font-medium'>{item.title}</p>
                                <p className={`text-xs ${formData.object === index ? 'text-white/80' : 'text-gray-500'}`}>
                                    {item.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            <footer className='w-full flex gap-4 mt-5'>
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
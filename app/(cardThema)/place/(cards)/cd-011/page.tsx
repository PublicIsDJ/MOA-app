'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { HomeSelect } from '@/features/cardThema/place/ui/home-select';
import { OutsideSelect } from '@/features/cardThema/place/ui/outside-select';
import { InputBox } from '@/shared/ui/input-box';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialFavoriteData, type FavoriteData } from '@/features/cardThema/place/types';

const QR_CODE = 'CD-011';

export default function MyFavoritePlace() {
    const router = useRouter();
    const [formData, setFormData] = useState<FavoriteData>(initialFavoriteData);
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
            router.push('/place/cd-012');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/place/cd-012');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/place/cd-012');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={1}
                totalCards={5}
                title='내가 좋아하는 공간'
                description='내가 좋아하는 공간이 있나요?'
                frontImage='/cards-place/favorite.svg'
            />

            <section id='place-favorite-form' className='card-input-form'>
                <HomeSelect
                    value={formData.home}
                    onChange={(value) => setFormData({ ...formData, home: value })}
                />
                <OutsideSelect
                    value={formData.outside}
                    onChange={(value) => setFormData({ ...formData, outside: value })}
                />
                <section className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>좋아하는 나만의 장소는?</label>
                    <InputBox
                        placeholder='나만의 장소는 어디인가요?'
                        value={formData.myPlace}
                        onChange={(e) => setFormData({ ...formData, myPlace: e.target.value })}
                        className='py-[12px] rounded-[12px] bg-white'
                    />
                </section>
                <section className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>그 이유는?</label>
                    <InputBox
                        placeholder='특별한 이유가 있나요?'
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className='py-[12px] rounded-[12px] bg-white'
                    />
                </section>
            </section>

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
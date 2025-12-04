'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { MovieForm } from '@/features/cardThema/place/ui/movie-form';
import { createActivity } from '@/features/activity';
import { scanQrCode } from '@/features/card';
import { initialMovieData, type MovieData } from '@/features/cardThema/place/types';

const QR_CODE = 'CD-013';

export default function MyMovie() {
    const router = useRouter();
    const [formData, setFormData] = useState<MovieData>(initialMovieData);
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
            router.push('/place/cd-014');
            return;
        }

        setIsLoading(true);
        try {
            await createActivity({
                cardId,
                activityResult: formData,
            });
            router.push('/place/cd-014');
        } catch (error) {
            console.error('활동 저장 실패:', error);
            router.push('/place/cd-014');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CardDetailView
                cardNumber={3}
                totalCards={5}
                title='나만의 영화관'
                description='기억에 남는 영화가 있나요??'
                frontImage='/cards-place/movie.svg'
            />

            <section className='card-input-form gap-6'>
                <MovieForm data={formData} onChange={setFormData} />
            </section>
            <footer className='w-full flex gap-5 mt-6 pb-4'>
                <Button
                    status='inactive'
                    className='flex-1 py-[19px] rounded-[12px]'
                    onClick={() => router.push('/place/cd-012')}
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

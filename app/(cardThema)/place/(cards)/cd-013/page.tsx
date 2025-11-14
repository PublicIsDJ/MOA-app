'use client';

import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/features/cardThema/me/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { MovieForm } from '@/features/cardThema/place/ui/movie-form';

export default function MyMovie() {
    const router = useRouter();

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
                <MovieForm/>
            </section>
            <footer className='w-full flex gap-5 mt-5 mb-10'>
                <Button
                    status='inactive'
                    className='flex-1 py-[19px] rounded-[12px]'
                    onClick={() => router.back()}
                >
                    이전으로
                </Button>
                <Button
                    className='flex-1 py-[19px] rounded-[12px]'
                    onClick={() => router.push('/place/cd-014')}
                >
                    다음으로
                </Button>
            </footer>
        </>
    );
};
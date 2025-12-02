'use client';

import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { MovieForm } from '@/features/cardThema/place/ui/movie-form';
import { IslandForm } from '@/widgets/cardThema/place/island-form';

export default function GoingToIsland() {
    const router = useRouter();
    return (
        <>
            <CardDetailView
                cardNumber={4}
                totalCards={5}
                title='무인도에 간다면'
                description='무인도에 간다면 무슨일이 생길까요?'
                frontImage='/cards-place/island.svg'
            />

            <section className='card-input-form gap-6'>
                <IslandForm/>
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
                    onClick={() => router.push('/place/cd-015')}
                >
                    다음으로
                </Button>
            </footer>
        </>
    );
};
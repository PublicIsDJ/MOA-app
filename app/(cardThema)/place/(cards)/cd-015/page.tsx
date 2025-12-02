'use client';

import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { MyLastForm } from '@/widgets/cardThema/place/my-last-form';

export default function MyLastPage() {
    const router = useRouter();
    return (
        <>
            <CardDetailView
                cardNumber={5}
                totalCards={5}
                title='나의 마지막'
                description='나의 마지막은 어떤 모습 일까요?'
                frontImage='/cards-place/my-last.svg'
            />

            <section className='card-input-form gap-6'>
                <MyLastForm/>
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
                    onClick={() => router.push('/home')}
                >
                    완료하기
                </Button>
            </footer>
        </>
    );
};
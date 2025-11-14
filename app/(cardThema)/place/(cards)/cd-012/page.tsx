'use client';

import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/features/cardThema/me/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { TravelSelect } from '@/features/cardThema/place/ui/travel-select';
import { InputBox } from '@/shared/ui/input-box';

const fileds = [
    {label: "최고의 여행지는?", placeholder: '내 최고의 여행지는 어디인가요?'},
    {label: "최악의 여행지는?", placeholder: '내 최악의 여행지는 어디인가요?'}
];

export default function MyTravelPage() {
    const router = useRouter();
    return (
        <>
            <CardDetailView
                cardNumber={2}
                totalCards={5}
                title='나의 여행지'
                description='나는 어떤 여행을 좋아하나요?'
                frontImage='/cards-place/travle.svg'
            />

            {/* MARK: 입력 폼 */}
            {/* TODO: feature or widget으로 분리 */}
            <section id='place-travel-form' className='card-input-form'>
                <TravelSelect />

                {fileds.map((item, index) => (
                    <section key={index} className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-700'>{item.label}</label>
                        <InputBox
                            placeholder={item.placeholder}
                            className='py-[12px] rounded-[12px] bg-white'
                        />
                    </section>
                ))}
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
                    onClick={() => router.push('/place/cd-013')}
                >
                    다음으로
                </Button>
            </footer>
        </>
    );
};
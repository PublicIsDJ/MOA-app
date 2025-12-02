'use client';

import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { InputBox } from '@/shared/ui/input-box';
import { Button } from '@/shared/ui/button';
// import { MY_FEATURES } from '@/features/cardThema/me/constants/taste';

export default function CardOfTastePage() {
    const router = useRouter();
    return (
        <>
            <CardDetailView
                cardNumber={4}
                totalCards={5}
                title='나의 입맛'
                description='나는 어떤 음식을 좋아하나요?'
                frontImage='/cards-me/taste.svg'
            />

            {/* TODO: feature or widget로 분리 */}
            <main className='flex-1 flex flex-col gap-8 bg-[#F6F6F6] rounded-[20px] px-6 py-10'>

                <section className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>어제 먹었던 음식은?</label>
                    <InputBox placeholder='내가 어제 먹었던 음식을 적어주세요' className='bg-white py-3 rounded-[12px]'/>
                </section>

                <section className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>내일은 무엇을 먹을까요?</label>
                    <InputBox placeholder='내일 무엇을 먹을지 적어주세요' className='bg-white py-3 rounded-[12px]'/>
                </section>
            </main>

            <footer className='w-full flex gap-5 mt-5'>
                <Button status='inactive' className='flex-1 py-[19px] rounded-[12px]' onClick={()=>router.back()}>이전으로</Button>
                <Button className='flex-1 py-[19px] rounded-[12px]' onClick={()=>router.push('/me/cd-005')}>다음으로</Button>
            </footer>
        </>

    );
}
'use client';

import { CardDetailView } from '@/features/cardThema/me/ui/card-detail-view';
import TalentForm from '@/widgets/cardThema/time/talent-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';

export default function CardOfStage() {
    const router = useRouter();
    return (
        <>
            <CardDetailView
                cardNumber={5}
                totalCards={5}
                title='나의 무대'
                description='내가 제일 자신 있는 것은 무엇인가요?'
                frontImage='/cards-time/stage.svg'
            />
            
            <TalentForm/>

            <footer className='w-full flex gap-4 mb-10 mt-5'>
                <Button status='inactive' className='py-[19px] rounded-[12px]' onClick={()=>router.push('/time/cd-009')}>이전으로</Button>
                <Button className='py-[19px] rounded-[12px]' onClick={()=>router.push('/home')}>완료</Button>
            </footer>
        </>
    )
}
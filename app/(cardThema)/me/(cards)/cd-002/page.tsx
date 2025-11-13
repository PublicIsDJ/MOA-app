'use client';

import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/features/cardThema/me/ui/card-detail-view';
import { NameForm } from '@/features/cardThema/me/ui/name-form';
import { Button } from '@/shared/ui/button';

export default function CardOfNamePage() {
    const router = useRouter();
    return (
        <>
        <CardDetailView
            cardNumber={2}
            totalCards={5}
            title='나의 이름'
            description='나의 이름에는 어떤 의미가 있나요?'
            frontImage='/cards-me/name.svg'
        />
        <NameForm/>
        <Button
            className='py-[19px] rounded-[12px] mt-5'
            onClick={()=>router.push('/me/cd-003')}
        >다음카드</Button>
        </>
    );
}
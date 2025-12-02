'use client';

import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { BirthForm } from '@/features/cardThema/me/ui/birth-form';
import { Button } from '@/shared/ui/button';

export default function CardOfBirthPage() {
  const router = useRouter();
  return (
    <>
    <CardDetailView
      cardNumber={1}
      totalCards={5}
      title='내가 태어난 날'
      description='내가 태어난 날은 어떤일이 있었나요?'
      frontImage='/cards-me/birth.svg'
    />
    <BirthForm/>
    <Button
      className='py-[19px] rounded-[12px] mt-5'
      onClick={()=>router.push('/me/cd-002')}
    >다음카드</Button>
    </>
  );
}
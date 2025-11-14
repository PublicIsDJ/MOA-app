'use client';

import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/features/cardThema/me/ui/card-detail-view';
import { BirthForm } from '@/features/cardThema/me/ui/birth-form';
import { Button } from '@/shared/ui/button';

export default function CardOfStagePage() {
  const router = useRouter();
  return (
    <>
    <CardDetailView
      cardNumber={1}
      totalCards={5}
      title='좋아하는 계절'
      description='내가 좋아하는 계절이 있나요?'
      frontImage='/cards-time/stage.svg'
    />
    <BirthForm/>
    <Button
      className='py-[19px] rounded-[12px] mt-5'
      onClick={()=>router.push('/me/cd-002')}
    >다음카드</Button>
    </>
  );
}
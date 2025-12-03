'use client';

import { useRouter } from 'next/navigation';
import { CardDetailView } from '@/shared/ui/card-detail-view';
import { Button } from '@/shared/ui/button';
import { HomeSelect } from '@/features/cardThema/place/ui/home-select';
import { OutsideSelect } from '@/features/cardThema/place/ui/outside-select';
import { InputBox } from '@/shared/ui/input-box';

const fileds = [
    {label:'좋아하는 나만의 장소는?', placeholder: '나만의 장소는 어디인가요?'},
    {label:'그 이유는?', placeholder: '특별한 이유가 있나요?'},
];

export default function MyFavoritePlace() {
    const router = useRouter();
    return (
        <>
            <CardDetailView
                cardNumber={1}
                totalCards={5}
                title='내가 좋아하는 공간'
                description='내가 좋아하는 공간이 있나요?'
                frontImage='/cards-place/favorite.svg'
            />
            {/* MARK: 입력 폼 */}
            {/* TODO: feature or widget으로 분리*/}

            <section id='place-favorite-form' className='card-input-form'>
                <HomeSelect/>
                <OutsideSelect/>
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

            
            <Button
                className='py-[19px] rounded-[12px] mt-5'
                onClick={()=>router.push('/place/cd-012')}
            >다음카드</Button>
        </>
    );
};
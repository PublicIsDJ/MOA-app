'use client';

import { MyLastTextField } from '@/features/cardThema/place/ui/mylast-text-field';
import { MyFuneral } from '@/features/cardThema/place/ui/my-funeral';
import { OrganDonation } from '@/features/cardThema/place/ui/organ-donation';

export function MyLastForm() {
    return (
        <div className='flex flex-col gap-6'>
            {/* MARK: 텍스트 질문 (3개) */}
            <MyLastTextField />

            {/* MARK: 장례식 모습 */}
            <MyFuneral />

            {/* MARK: 장기기증 여부 */}
            <OrganDonation />
        </div>
    );
}

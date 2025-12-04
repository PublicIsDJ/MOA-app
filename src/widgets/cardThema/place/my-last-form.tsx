'use client';

import { MyLastTextField } from '@/features/cardThema/place/ui/mylast-text-field';
import { MyFuneral } from '@/features/cardThema/place/ui/my-funeral';
import { OrganDonation } from '@/features/cardThema/place/ui/organ-donation';
import type { MyLastData } from '@/features/cardThema/place/types';

interface MyLastFormProps {
    data: MyLastData;
    onChange: (data: MyLastData) => void;
}

export function MyLastForm({ data, onChange }: MyLastFormProps) {
    return (
        <div className='flex flex-col gap-6'>
            {/* MARK: 텍스트 질문 (3개) */}
            <MyLastTextField
                data={data}
                onChange={onChange}
            />

            {/* MARK: 장례식 모습 */}
            <MyFuneral
                value={data.funeral}
                customText={data.funeralCustom}
                onChange={(value) => onChange({ ...data, funeral: value })}
                onCustomTextChange={(text) => onChange({ ...data, funeralCustom: text })}
            />

            {/* MARK: 장기기증 여부 */}
            <OrganDonation
                value={data.organDonation}
                onChange={(value) => onChange({ ...data, organDonation: value })}
            />
        </div>
    );
}

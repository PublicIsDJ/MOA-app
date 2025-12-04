'use client';

import { InputBox } from '@/shared/ui/input-box';
import type { MyLastData } from '../types';

const myLastFields = [
    { key: 'lastMeal', label: '마지막 식사로 먹고 싶은 것은?', placeholder: '마지막 식사를 적어주세요' },
    { key: 'lastPlace', label: '마지막으로 가고 싶은 곳은?', placeholder: '마지막으로 가고 싶은 곳을 적어주세요' },
    { key: 'lastPerson', label: '마지막으로 만나고 싶은 사람은?', placeholder: '마지막으로 만나고 싶은 사람을 적어주세요' },
];

interface MyLastTextFieldProps {
    data: MyLastData;
    onChange: (data: MyLastData) => void;
}

export function MyLastTextField({ data, onChange }: MyLastTextFieldProps) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <>
            {myLastFields.map((field) => (
                <section key={field.key} className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>{field.label}</label>
                    <InputBox
                        className='py-[12px] rounded-[12px] bg-white'
                        placeholder={field.placeholder}
                        value={data[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                </section>
            ))}
        </>
    );
}
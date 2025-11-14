'use client';

import { MY_LAST } from "../constants/my-last";
import { InputBox } from '@/shared/ui/input-box';

export function MyLastTextField() {
    return (
        <>
            {MY_LAST.question.map((item, index) => (
                <section key={index} className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>{item.label}</label>
                    <InputBox
                        className='py-[12px] rounded-[12px] bg-white'
                        placeholder={item.placeholder}
                    />
                </section>
            ))}
        </>
    );
}
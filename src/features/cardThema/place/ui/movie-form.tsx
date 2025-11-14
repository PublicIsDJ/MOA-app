'use client';

import { InputBox } from '@/shared/ui/input-box';
import { MOVIE } from '../constants/movie';

// TODO: props
// interface Props {}
export function MovieForm() {
    return (
        <>
            {MOVIE.map((item, index) => (
                <section key={index} className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>{item.question}</label>
                    <InputBox
                        placeholder={item.placeholder}
                        className='py-[12px] rounded-[12px] bg-white'
                    />
                </section>
            ))}
        </>
    );
}
'use client';

import { MY_LAST } from "../constants/my-last";

interface MyFuneralProps {
    value: number | null;
    customText: string;
    onChange: (value: number | null) => void;
    onCustomTextChange: (text: string) => void;
}

export function MyFuneral({ value, customText, onChange, onCustomTextChange }: MyFuneralProps) {
    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>내가 원하는 장례식의 모습은?</h1>
            <div className="grid grid-cols-3 gap-3 mb-4">
                {MY_LAST.funeral.map((item, index) => (
                    <button
                        key={index}
                        type='button'
                        onClick={() => onChange(index)}
                        className={`aspect-[98/72] flex flex-col items-center justify-center rounded-[12px] transition-all ${
                            value === index
                                ? 'bg-[#4466D1] text-white'
                                : 'bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        <p className='text-xl'>{item.icon}</p>
                        <p className='font-medium text-xs'>{item.name}</p>
                    </button>
                ))}
            </div>
            <textarea
                className='w-full aspect-[310/120] py-[12px] px-3 rounded-[12px] bg-white focus:outline-[#3E56F6] focus:transition-colors whitespace-pre resize-none'
                placeholder={"내가 원하는 장례식의 모습이 있다면\n자유롭게 작성해주셔도 좋아요"}
                value={customText}
                onChange={(e) => onCustomTextChange(e.target.value)}
            />
        </section>
    );
}
'use client';

import { ISLAND } from "../constants/island";

interface WithWhoProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

export function WithWho({ value, onChange }: WithWhoProps) {
    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>무인도에 함께 있고 싶은 단 한 존재는?</h1>
            <div className="grid grid-cols-2 gap-3">
                {ISLAND.withWho.map((item, index) => (
                    <button
                        key={index}
                        type='button'
                        onClick={() => onChange(index)}
                        className={`aspect-[149/80] flex flex-col items-center justify-center rounded-[12px] transition-all ${
                            value === index
                                ? 'bg-[#4466D1] text-white'
                                : 'bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        <p className='text-2xl'>{item.icon}</p>
                        <p className='font-medium text-sm'>{item.name}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}
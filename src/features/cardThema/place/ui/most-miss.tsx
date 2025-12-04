'use client';

import { ISLAND } from "../constants/island";

interface MostMissProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

export function MostMiss({ value, onChange }: MostMissProps) {
    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>무인도에서 가장 그리울 것은?</h1>
            <div className="grid grid-cols-3 gap-3">
                {ISLAND.mostMiss.map((item, index) => (
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
        </section>
    );
}
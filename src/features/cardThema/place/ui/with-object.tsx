'use client';

import { ISLAND } from "../constants/island";

interface WithObjectProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

export function WithObject({ value, onChange }: WithObjectProps) {
    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>무인도에 단 하나의 물건만 가져갈 수 있다면?</h1>
            <div className="grid grid-cols-3 gap-3">
                {ISLAND.object.map((item, index) => (
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
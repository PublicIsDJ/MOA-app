'use client';

import { FAVORITE_PLACE } from '../constants/favorite';

interface HomeSelectProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

export function HomeSelect({ value, onChange }: HomeSelectProps) {
    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>집에서 좋아하는 장소는?</h1>
            <div className="grid grid-cols-2 gap-3">
                {FAVORITE_PLACE.home.map((item, index) => (
                    <button
                        key={index}
                        type='button'
                        onClick={() => onChange(index)}
                        className={`w-full aspect-[149/80] rounded-[12px] flex flex-col items-center justify-center gap-1 transition-all ${
                            value === index
                                ? 'bg-[#4466D1] text-white'
                                : 'bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        <p className='text-2xl'>{item.icon}</p>
                        <p className='font-medium'>{item.title}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}
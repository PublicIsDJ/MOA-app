'use client';
import { useState } from 'react';
import { FAVORITE_PLACE } from '../constants/favorite';

// TODO: prop 정의(formData, upDatedField)
// interface Props {
//     formData:
// }

export function OutsideSelect() {
    const [selectedOutside, setSelectedOutside] = useState<number | null>(null);

    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>밖에서 좋아하는 장소는?</h1>
            <div className="grid grid-cols-2 gap-3">
                {FAVORITE_PLACE.outside.map((item, index) => (
                    <button
                        key={index}
                        type='button'
                        onClick={() => setSelectedOutside(index)}
                        className={`w-full aspect-[149/80] rounded-[12px] flex flex-col items-center justify-center gap-1 transition-all ${
                            selectedOutside === index
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
'use client';

import { ISLAND } from "../constants/island";
import { useState } from "react";
import { InputBox } from '@/shared/ui/input-box';

export function MostMiss() {
    const [selectedMiss, setSelectedMiss] = useState<number[]>([]);

    const handleSelect = (index: number) => {
        if (selectedMiss.includes(index)) {
            setSelectedMiss(selectedMiss.filter(i => i !== index));
        } else {
            setSelectedMiss([...selectedMiss, index]);
        }
    };

    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>무인도에서 가장 그리울 것은?</h1>
            <div className="grid grid-cols-3 gap-3 mb-4">
                {ISLAND.mostMiss.map((item, index) => (
                    <button
                        key={index}
                        type='button'
                        onClick={() => handleSelect(index)}
                        className={`aspect-[98/72] flex flex-col items-center justify-center rounded-[12px] transition-all ${
                            selectedMiss.includes(index)
                                ? 'bg-[#4466D1] text-white'
                                : 'bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        <p className='text-xl'>{item.icon}</p>
                        <p className='font-medium text-xs'>{item.name}</p>
                    </button>
                ))}
            </div>
            <InputBox
                className='py-[12px] rounded-[12px] bg-white'
                placeholder="선택지가 없다면 여기에 적어주세요!"
            />
        </section>
    );
}
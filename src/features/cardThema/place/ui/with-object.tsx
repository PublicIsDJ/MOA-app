'use client';

import { ISLAND } from "../constants/island";
import { useState } from "react";
import { InputBox } from '@/shared/ui/input-box';

export function WithObject() {
    const [selectedObject, setSelectedObject] = useState<number[]>([]);

    const handleSelect = (index: number) => {
        if (selectedObject.includes(index)) {
            setSelectedObject(selectedObject.filter(i => i !== index));
        } else {
            setSelectedObject([...selectedObject, index]);
        }
    };

    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>무인도에 단 하나의 물건만 가져갈 수 있다면?</h1>
            <div className="grid grid-cols-3 gap-3 mb-4">
                {ISLAND.object.map((item, index) => (
                    <button
                        key={index}
                        type='button'
                        onClick={() => handleSelect(index)}
                        className={`aspect-[98/72] flex flex-col items-center justify-center rounded-[12px] transition-all ${
                            selectedObject.includes(index)
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
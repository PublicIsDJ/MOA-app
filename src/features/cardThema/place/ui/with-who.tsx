'use client';

import { ISLAND } from "../constants/island";
import { useState } from "react";

export function WithWho() {
    const [selectedWho, setSelectedWho] = useState<number[]>([]);

    const handleSelect = (index: number) => {
        if (selectedWho.includes(index)) {
            setSelectedWho(selectedWho.filter(i => i !== index));
        } else {
            setSelectedWho([...selectedWho, index]);
        }
    };

    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>무인도에 함께 있고 싶은 단 한 존재는?</h1>
            <div className="grid grid-cols-2 gap-3">
                {ISLAND.withWho.map((item, index) => (
                    <button
                        key={index}
                        type='button'
                        onClick={() => handleSelect(index)}
                        className={`aspect-[149/80] flex flex-col items-center justify-center rounded-[12px] transition-all ${
                            selectedWho.includes(index)
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
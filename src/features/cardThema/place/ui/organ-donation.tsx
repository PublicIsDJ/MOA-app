'use client';

import { useState } from "react";
import { MY_LAST } from "../constants/my-last";

export function OrganDonation() {
    const [selectedDonation, setSelectedDonation] = useState<number | null>(null);

    const handleSelect = (index: number) => {
        setSelectedDonation(index);
    };

    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>나의 사후 기증 여부는?</h1>
            <div className="grid grid-cols-2 gap-3">
                {MY_LAST.organDonatino.map((item, index) => (
                    <button
                        key={index}
                        type='button'
                        onClick={() => handleSelect(index)}
                        className={`aspect-[149/80] flex flex-col items-center justify-center rounded-[12px] transition-all ${
                            selectedDonation === index
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
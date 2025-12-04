'use client';

import { MY_LAST } from "../constants/my-last";

interface OrganDonationProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

export function OrganDonation({ value, onChange }: OrganDonationProps) {
    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>나의 사후 기증 여부는?</h1>
            <div className="grid grid-cols-2 gap-3">
                {MY_LAST.organDonatino.map((item, index) => (
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
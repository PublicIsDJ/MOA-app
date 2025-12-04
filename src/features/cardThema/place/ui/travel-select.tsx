'use client';

import { MY_TRAVEL } from '../constants/travle';

interface TravelSelectProps {
    value: number[];
    onChange: (value: number[]) => void;
}

export function TravelSelect({ value, onChange }: TravelSelectProps) {
    const handleSelect = (index: number) => {
        if (value.includes(index)) {
            onChange(value.filter(i => i !== index));
        } else {
            onChange([...value, index]);
        }
    };

    return (
        <section>
            <h1 className='text-lg font-semibold mb-4'>나의 여행 스타일은? (중복 선택 가능)</h1>
            <div className="grid grid-cols-3 gap-3">
                {MY_TRAVEL.map((item, index) => (
                    <button
                        key={index}
                        type='button'
                        onClick={() => handleSelect(index)}
                        className={`aspect-[98/72] flex flex-col items-center justify-center rounded-[12px] transition-all ${
                            value.includes(index)
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


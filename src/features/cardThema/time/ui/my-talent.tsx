'use client';

import { TIME_STAGE as time} from '@/features/cardThema/time/constant/stage';
import { useState } from 'react';

export function TalentSelector() {
    // 임시 상태
    const [selectedTalent, setTalent] = useState<number | null>(null);

    // 임시 핸들러
    const handleSelect = (index: number) => {
        setTalent(index);
    };

    return (
        <>
        <div className='w-full grid grid-cols-2 gap-3'>
            {time.talent.map((item, idx) => (
                <button
                    key={idx}
                    type='button'
                    onClick={() => handleSelect(idx)}
                    className={`flex flex-col items-center justify-center py-[19px] rounded-[12px] transition-all ${
                        selectedTalent === idx
                            ? 'bg-[#4466D1] text-white'
                            : 'bg-white text-gray-900 hover:bg-gray-50'
                    }`}
                >
                    <p className='text-2xl'>{item.icon}</p>
                    <p className='font-medium text-sm'>{item.name}</p>
                </button>
            ))}
        </div>

        <textarea 
            className='w-full aspect-[310/108] resizen-none bg-white rounded-[12px] p-3 mt-6 focus:outline-[#3E56F6] focus:transition-colors'
            placeholder='내가 잘하는 것을 구체적으로 말해볼까요?'
        />
        </>
    );
}
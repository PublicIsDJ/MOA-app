'use client';

import { useState } from 'react';

const TALENTS = [
    { icon: '🎨', name: '예술' },
    { icon: '🎵', name: '음악' },
    { icon: '⚽', name: '운동' },
    { icon: '📚', name: '독서' },
    { icon: '🍳', name: '요리' },
    { icon: '✍️', name: '글쓰기' },
];

export function TalentSelector() {
    const [selectedTalent, setSelectedTalent] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-3 gap-3 mt-2">
            {TALENTS.map((talent, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedTalent(index)}
                    className={`aspect-[98/72] flex flex-col items-center justify-center rounded-[12px] transition-all ${
                        selectedTalent === index
                            ? 'bg-[#4466D1] text-white'
                            : 'bg-white text-gray-900 hover:bg-gray-50'
                    }`}
                >
                    <p className="text-xl">{talent.icon}</p>
                    <p className="font-medium text-xs">{talent.name}</p>
                </button>
            ))}
        </div>
    );
}


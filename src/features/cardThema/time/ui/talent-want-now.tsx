'use client';

import { TIME_STAGE } from '../constant/stage';

interface WantNowSelectorProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

export function WantNowSelector({ value, onChange }: WantNowSelectorProps) {
    return (
        <div className="grid grid-cols-3 gap-3 mt-2">
            {TIME_STAGE.talent.map((talent, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onChange(index)}
                    className={`aspect-[98/72] flex flex-col items-center justify-center rounded-[12px] transition-all ${
                        value === index
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
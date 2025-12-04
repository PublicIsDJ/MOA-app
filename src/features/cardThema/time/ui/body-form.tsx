'use client';

import type { BodyData } from '../types';

const bodyFields = [
    { key: 'scar', label: '나의 흉터, 수술자국 등을 적어주세요', placeholder: '편하게 원하는 만큼 적어주세요' },
    { key: 'scarStory', label: '그 흉터는 언제 생겼나요?', placeholder: '그 흉터는 어떤 의미로 남아있나요?' },
];

interface BodyFormProps {
    data: BodyData;
    onChange: (data: BodyData) => void;
}

export function BodyForm({ data, onChange }: BodyFormProps) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <div className="flex-1 flex flex-col gap-6 rounded-[20px] px-5 py-8 bg-[#F6F6F6]">
            {bodyFields.map((field) => (
                <div key={field.key} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    <textarea
                        placeholder={field.placeholder}
                        value={data[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="bg-white resize-none rounded-[12px] px-[12px] py-3 h-32"
                    />
                </div>
            ))}
        </div>
    );
}

'use client';

import type { RythmData } from '../types';

const rythmFields = [
    {
        label: '가장 크게 인생의 변화가 있던 시기는 언제인가요?',
        fields: [
            { key: 'bigChange', placeholder: '새로운 일에 뛰어든 때 (첫직장, 유학, 창업 등)' },
            { key: 'bigChangeSub', placeholder: '예상치 못한 큰 변화를 맞이했을 때' },
        ]
    },
    {
        label: '내 삶에서 가장 강한 울림이 있었다면 언제인가요?',
        fields: [
            { key: 'strongEcho', placeholder: '가장 큰 기쁨이나 슬픔' },
            { key: 'strongEchoSub', placeholder: '잊을 수 없는 사건, 사람' },
        ]
    },
];

interface RythmFormProps {
    data: RythmData;
    onChange: (data: RythmData) => void;
}

export function RythmForm({ data, onChange }: RythmFormProps) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <div className="flex-1 flex flex-col gap-6 rounded-[20px] px-2 py-10 bg-[#F6F6F6]">
            {rythmFields.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">{section.label}</label>
                    {section.fields.map((field) => (
                        <textarea
                            key={field.key}
                            placeholder={field.placeholder}
                            value={data[field.key] || ''}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="bg-white resize-none rounded-[12px] px-[12px] py-3 h-20"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
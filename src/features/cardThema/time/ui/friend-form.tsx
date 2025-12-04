'use client';

import type { FriendData } from '../types';

const friendFields = [
    { key: 'oldest', label: '내게 가장 오래된 사람은?', placeholder: '없다면 가장 오래된 이야기나 사진 속 인물을 떠올려 보세요!' },
    { key: 'recent', label: '가장 최근에 만난 사람은?', placeholder: '어디서, 어떤 이유로 만났나요?' },
    { key: 'petOwner', label: '반려동물을 키우는 사람은?', placeholder: '반려동물을 키우는 지인이 있나요?' },
    { key: 'liveAlone', label: '혼자 살고 있는 사람은?', placeholder: '혼자 살고있는 지인이 있나요?' },
    { key: 'boughtMeFood', label: '내게 밥을 사준 사람은?', placeholder: '누가 밥을 사줬나요?' },
    { key: 'iBoughtFood', label: '내가 밥을 사준 사람은?', placeholder: '누구에게 밥을 사줬나요?' },
];

interface FriendFormProps {
    data: FriendData;
    onChange: (data: FriendData) => void;
}

export function FriendForm({ data, onChange }: FriendFormProps) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <>
            {friendFields.map((field) => (
                <div key={field.key} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                        type="text"
                        placeholder={field.placeholder}
                        value={(data[field.key] as string) || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="bg-white rounded-[12px] px-[12px] py-3"
                    />
                </div>
            ))}
        </>
    );
}
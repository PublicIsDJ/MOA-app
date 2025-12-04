'use client';

import { InputBox } from '@/shared/ui/input-box';
import type { MovieData } from '../types';

const movieFields = [
    { key: 'lifeMovies', label: '내 인생 영화 세 편은?', placeholder: '나의 인생 영화를 적어주세요' },
    { key: 'cryMovie', label: '가장 많이 울었던 영화는?', placeholder: '나를 울렸던 영화가 있나요?' },
    { key: 'ownMovie', label: '소장하고 싶은 영화는?', placeholder: '간직하고 싶은 영화가 있나요?' },
    { key: 'musicMovie', label: '음악이 좋았던 영화는?', placeholder: '음악이 마음에 들었던 영화가 있나요?' },
    { key: 'bestScene', label: '최고의 명장면은?', placeholder: '영화 속 인상 깊었던 장면이 있나요?' },
];

interface MovieFormProps {
    data: MovieData;
    onChange: (data: MovieData) => void;
}

export function MovieForm({ data, onChange }: MovieFormProps) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <>
            {movieFields.map((field) => (
                <section key={field.key} className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-700'>{field.label}</label>
                    <InputBox
                        placeholder={field.placeholder}
                        value={data[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className='py-[12px] rounded-[12px] bg-white'
                    />
                </section>
            ))}
        </>
    );
}
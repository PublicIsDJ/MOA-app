'use client';

import { FormList } from "@/shared/ui/form-list";
import type { BirthData } from "../types";

const birthFields = [
    { key: 'birthday', label: "생일", placeholder: '생일은 언제인가요?' },
    { key: 'birthYear', label: "태어난 해", placeholder: '그 해, 나에게는 어떤 일이 있었나요?' },
    { key: 'birthSeason', label: "태어난 계절", placeholder: '태어난 계절은 언제인가요?' },
    { key: 'babyDream', label: "나의 태몽", placeholder: '나의 태몽은 무엇인가요?' },
    { key: 'zodiac', label: "나의 띠", placeholder: '내 띠는 무엇인가요?' }
];

interface BirthFormProps {
    data: BirthData;
    onChange: (data: BirthData) => void;
}

export function BirthForm({ data, onChange }: BirthFormProps) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <FormList
            fields={birthFields}
            values={data}
            onChange={handleChange}
        />
    );
}
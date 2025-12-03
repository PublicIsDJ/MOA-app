'use client';

import { FormList } from "@/shared/ui/form-list";
import type { NameData } from "../types";

const nameFields = [
    { key: 'name', label: "나의 이름은?", placeholder: '이름이 무엇인가요?' },
    { key: 'nameMeaning', label: "이름이 가진 의미", placeholder: '내 이름의 의미는 무엇인가요?' },
    { key: 'nameGiver', label: "이름을 지어준 사람", placeholder: '내 이름은 누가 지어줬나요?' },
    { key: 'nickname', label: "내가 좋아하는 나의 별명", placeholder: '내 별명은 무엇인가요?' },
    { key: 'nicknameGiver', label: "별명을 지어준 사람", placeholder: '내 별명은 누가 지어줬나요?' }
];

interface NameFormProps {
    data: NameData;
    onChange: (data: NameData) => void;
}

export function NameForm({ data, onChange }: NameFormProps) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <FormList
            fields={nameFields}
            values={data}
            onChange={handleChange}
        />
    );
}
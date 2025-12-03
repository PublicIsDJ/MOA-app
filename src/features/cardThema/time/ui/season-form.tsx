'use client';

import { FormList } from "@/shared/ui/form-list";

const tasteFields = [
    { key: 'freeText', label : "보기에 없는 경우에는 계절마다 \n내가 즐겨먹던 것을 자유롭게 적어보세요!", placeholder: '자유롭게 적어주세요' },
];

interface TasteFormProps {
    data: { freeText: string };
    onChange: (data: { freeText: string }) => void;
}

export function TasteForm({ data, onChange }: TasteFormProps) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <FormList
            fields={tasteFields}
            values={data}
            onChange={handleChange}
        />
    );
}
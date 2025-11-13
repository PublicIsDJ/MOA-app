'use client';

import { InputBox } from "@/shared/ui/input-box";

interface FormField {
    label: string;
    placeholder: string;
}

interface FormListProps {
    fields: FormField[];
    className?: string;
}

export function FormList({ fields, className = '' }: FormListProps) {
    return (
        <div className={`flex-1 flex flex-col gap-6 rounded-[20px] px-6 py-10 bg-[#F6F6F6] ${className}`}>
            {fields.map((field, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    <InputBox
                        placeholder={field.placeholder}
                        className="bg-white py-3 rounded-[12px]"
                    />
                </div>
            ))}
        </div>
    );
}


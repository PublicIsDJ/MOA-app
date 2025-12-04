'use client';

import { InputBox } from "@/shared/ui/input-box";

interface FormField {
    label: string;
    placeholder: string;
    key: string;
}

interface FormListProps {
    fields: FormField[];
    values: { [key: string]: string };
    onChange: (key: string, value: string) => void;
    className?: string;
}

export function FormList({ fields, values, onChange, className = '' }: FormListProps) {
    return (
        <div className={`flex-1 flex flex-col gap-6 rounded-[20px] px-5 py-8 bg-[#F6F6F6] ${className}`}>
            {fields.map((field) => (
                <div key={field.key} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                    <InputBox
                        placeholder={field.placeholder}
                        value={values[field.key] || ''}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        className="bg-white py-3 rounded-[12px]"
                    />
                </div>
            ))}
        </div>
    );
}

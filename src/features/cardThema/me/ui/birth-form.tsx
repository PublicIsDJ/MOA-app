import { FormList } from "@/shared/ui/form-list";

const birthFields = [
    { label: "생일", placeholder: '생일은 언제인가요?' },
    { label: "태어난 해", placeholder: '그 해, 나에게는 어떤 일이 있었나요?' },
    { label: "태어난 계절", placeholder: '태어난 계절은 언제인가요?' },
    { label: "나의 태몽", placeholder: '나의 태몽은 무엇인가요?' },
    { label: "나의 띠", placeholder: '내 띠는 무엇인가요?' }
];

export function BirthForm() {
    return <FormList fields={birthFields} />;
}
import { FormList } from "@/shared/ui/form-list";

const nameFields = [
    { label: "나의 이름은?", placeholder: '이름이 무엇인가요?' },
    { label: "이름이 가진 의미", placeholder: '내 이름의 의미는 무엇인가요?' },
    { label: "이름을 지어준 사람", placeholder: '내 이름은 누가 지어줬나요?' },
    { label: "내가 좋아하는 나의 별명", placeholder: '내 별명은 무엇인가요?' },
    { label: "별명을 지어준 사람", placeholder: '내 별명은 누가 지어줬나요?' }
];

export function NameForm() {
    return <FormList fields={nameFields} />;
}
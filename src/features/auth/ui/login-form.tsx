import { InputField } from '@/shared/ui/input-field';
import { LoginFormState } from '../login/types';

interface Props {
    formData: LoginFormState;
    onUpdatedField: (filed: keyof LoginFormState, value: any) => void;

}

export function LoginForm({ formData, onUpdatedField }: Props) {
    return (
        <>
            <div className='flex flex-col gap-[30px] w-full'>
                <InputField
                    placeholder='아이디 입력'
                />

                <InputField
                    placeholder='비밀번호 입력'
                />
            </div>
        </>
    );
}
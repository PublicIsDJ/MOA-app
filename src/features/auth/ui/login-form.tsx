import { InputField } from '@/shared/ui/input-field';
import { LoginFormState } from '../login/types';

interface Props {
    formData: LoginFormState;
    onUpdatedField: (field: keyof LoginFormState, value: string) => void;
}

export function LoginForm({ formData, onUpdatedField }: Props) {
    return (
        <div className='flex flex-col gap-[30px] w-full'>
            <InputField
                placeholder='아이디 입력'
                value={formData.userId}
                onChange={(e) => onUpdatedField('userId', e.target.value)}
            />

            <InputField
                type='password'
                placeholder='비밀번호 입력'
                value={formData.password}
                onChange={(e) => onUpdatedField('password', e.target.value)}
            />
        </div>
    );
}
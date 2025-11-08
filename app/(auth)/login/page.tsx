'use client'

import { LoginFormState, InitialLoginForm} from '@/features/auth/login/types';
import { useState, useCallback } from 'react';
import { LoginForm } from '@/features/auth/login/ui/login-form';
import { Button } from '@/shared/ui/button';

export default function LoginPage() {
    const [formData, setFormData] = useState<LoginFormState>(InitialLoginForm);
    const updateFormField = useCallback((field: keyof LoginFormState, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    return (
        <div className='w-full flex flex-col items-center mt-[142px]'>
            <h1 className='text-[#3E56F6] text-[48px] font-[700px] mb-[68px]'>MOA</h1>

            <section id='login-form' className='w-full'>
                <LoginForm formData={formData} onUpdatedField={updateFormField}/>
                <Button status="default" className='py-[12px] mt-[30px]'>로그인</Button>
            </section>

            {/* TODO: 회원 찾기 텍스트 버튼 구현 */}
            <section id='autho-text-btn' className='w-full'>

            </section>
        </div>
    );
};

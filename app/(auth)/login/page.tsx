'use client'

import { LoginFormState, InitialLoginForm} from '@/features/auth/login/types';
import { useState, useCallback } from 'react';
import { LoginForm } from '@/features/auth/ui/login-form';
import { Button } from '@/shared/ui/button';
import { TextRouter } from '@/features/auth/ui/text-router';
import Image from 'next/image';

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

            <TextRouter className='mt-[36px] mb-[72px]'/>

            <button
                type='button'
                className='w-full rounded-md py-[12px] flex items-center justify-center gap-2 bg-white border-[1px] border-[#D9D9D9]'
            >
                <div className='relative w-6 h-6'>
                    <Image
                        src='/ic_kakao.svg'
                        alt='카카오 로고'
                        fill
                        className='object-contain'
                    />
                </div>
                <p>카카오로 시작하기</p>
            </button>
        </div>
    );
};

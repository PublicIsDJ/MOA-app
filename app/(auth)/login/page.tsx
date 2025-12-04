'use client'

import { LoginFormState, InitialLoginForm } from '@/features/auth/login/types';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/features/auth/ui/login-form';
import { Button } from '@/shared/ui/button';
import { TextRouter } from '@/features/auth/ui/text-router';
import { login, getMe, isFirstLogin } from '@/features/auth/api/auth-api';
import { redirectToKakaoLogin } from '@/features/auth/api/kakao-auth';
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginFormState>(InitialLoginForm);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateFormField = useCallback((field: keyof LoginFormState, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setError(null); // 입력 시 에러 초기화
    }, []);

    // 로그인 버튼 활성화 조건
    const isFormValid = formData.userId.trim() && formData.password.trim();

    // 로그인 처리
    const handleLogin = async () => {
        if (!isFormValid || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            await login({
                userId: formData.userId.trim(),
                password: formData.password,
            });

            // 최초 로그인 여부 확인
            const user = await getMe();

            if (isFirstLogin(user)) {
                // 최초 로그인 → 정보 입력 페이지로
                router.push('/first-login');
            } else {
                // 기존 사용자 → 홈으로
                router.push('/home');
            }
        } catch (err: any) {
            console.error('로그인 실패:', err);

            // 에러 메시지 처리
            if (err.response?.status === 401) {
                setError('아이디 또는 비밀번호가 올바르지 않습니다.');
            } else if (err.response?.status === 404) {
                setError('존재하지 않는 계정입니다.');
            } else {
                setError('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-center py-10 px-2'>
            <h1 className='text-[#3E56F6] text-[48px] font-bold mb-12'>MOA</h1>

            <section id='login-form' className='w-full'>
                <LoginForm formData={formData} onUpdatedField={updateFormField}/>

                {/* 에러 메시지 */}
                {error && (
                    <p className='text-red-500 text-sm mt-3 text-center'>{error}</p>
                )}

                <Button
                    status={isFormValid ? 'default' : 'inactive'}
                    className='py-[12px] mt-[30px]'
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? '로그인 중...' : '로그인'}
                </Button>
            </section>

            <TextRouter className='mt-9 mb-16'/>

            <button
                type='button'
                onClick={redirectToKakaoLogin}
                className='w-full rounded-md py-[12px] flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#FDD800] transition-colors'
            >
                <div className='relative w-6 h-6'>
                    <Image
                        src='/ic_kakao.svg'
                        alt='카카오 로고'
                        fill
                        className='object-contain'
                    />
                </div>
                <p className='text-[#000000de] font-medium'>카카오로 시작하기</p>
            </button>
        </div>
    );
}

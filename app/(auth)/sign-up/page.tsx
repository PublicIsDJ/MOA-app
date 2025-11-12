'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { InputBox } from '@/shared/ui/input-box';
import { AuthHeader } from '@/features/auth/ui/auth-header';
import { SignUpFormState, InitialSignUpForm } from '@/features/auth/sign-up/types';

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<SignUpFormState>(InitialSignUpForm);

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    // MARK: 회원가입 처리
    const handleSignUp = async () => {
        console.log('회원가입 버튼 클릭됨', formData);

        // 유효성 검사
        if (!formData.userId || formData.userId.length < 4) {
            setError('아이디는 4자 이상 입력해주세요.');
            return;
        }
        if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
            setError('휴대폰 번호를 정확히 입력해주세요.');
            return;
        }
        if (!formData.password || formData.password.length < 8) {
            setError('비밀번호는 8자 이상 입력해주세요.');
            return;
        }
        if (formData.password !== formData.passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        setIsLoading(true);
        setError(null);

        // TODO: api 호출 처리
        alert('회원가입이 완료되었습니다!');
        router.push('/login');
    };

    return (
        <div className="relative min-h-screen flex flex-col items-start bg-white">
            {/* 헤더 */}
            <AuthHeader title="회원가입" className="mt-5" />

            {/* 회원가입 폼 */}
            <div className="flex flex-col justify-center mt-14 mb-7 w-full">
                <h1 className="text-xl font-bold text-gray-900 whitespace-pre">
                    {'회원가입을 위해\n정보를 입력해주세요'}
                </h1>
            </div>

            {/* MARK: 회원가입 폼 */}
            <div className="w-full flex flex-col gap-4">
                <div>
                    <p className='text-sm font-medium text-gray-700 mb-2'>아이디</p>
                    <div className='flex gap-2'>
                        <InputBox
                            name="userId"
                            placeholder="아이디 (4자 이상)"
                            type="text"
                            className='py-[12px] flex-3'
                            value={formData.userId}
                            onChange={(e) => handleInputChange('userId', e.target.value)}
                        />
                        <Button status='default' className='flex-1 transition-colors'>중복 확인</Button>
                    </div>

                </div>

                <div>
                    <p className='text-sm font-medium text-gray-700 mb-2'>휴대폰 번호</p>
                    <InputBox
                        name="phoneNumber"
                        placeholder="010-1234-5678"
                        type="tel"
                        className='py-[12px]'
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    />
                </div>

                <div>
                    <p className='text-sm font-medium text-gray-700 mb-2'>비밀번호</p>
                    <InputBox
                        name="password"
                        placeholder="비밀번호 (8자 이상)"
                        type="password"
                        className='py-[12px]'
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                </div>

                <div>
                    <p className='text-sm font-medium text-gray-700 mb-2'>비밀번호 확인</p>
                    <InputBox
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        type="password"
                        className='py-[12px]'
                        value={formData.passwordConfirm}
                        onChange={(e) => handleInputChange('passwordConfirm', e.target.value)}
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* MARK: 가입 버튼 */}
            <Button
                status="default"
                className="absolute bottom-5 w-full py-[12px] mt-[30px]"
                onClick={handleSignUp}
                disabled={isLoading}
            >
                {isLoading ? '가입 중...' : '가입하기'}
            </Button>
        </div>
    );
}

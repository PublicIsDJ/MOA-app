'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { AuthHeader } from '@/features/auth/ui/auth-header';
import { InputBox } from '@/shared/ui/input-box';
import { SignUpFormState, InitialSignUpForm } from '@/features/auth/sign-up/types';
import { register, login } from '@/features/auth/api/auth-api';

const TOTAL_STEPS = 3;

export default function SignUpPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<SignUpFormState>(InitialSignUpForm);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // MARK: 폼 필드 업데이트
    const updateField = (field: keyof SignUpFormState, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setError(null);
    };

    // MARK: 스텝별 유효성 검사
    const validateStep = (): boolean => {
        if (currentStep === 1) {
            if (!formData.userName.trim()) {
                setError('이름을 입력해주세요.');
                return false;
            }
            if (!formData.phoneNumber.trim()) {
                setError('휴대폰 번호를 입력해주세요.');
                return false;
            }
        }
        if (currentStep === 2) {
            if (!formData.userId.trim()) {
                setError('아이디를 입력해주세요.');
                return false;
            }
        }
        if (currentStep === 3) {
            if (!formData.password) {
                setError('비밀번호를 입력해주세요.');
                return false;
            }
            if (formData.password !== formData.passwordConfirm) {
                setError('비밀번호가 일치하지 않습니다.');
                return false;
            }
        }
        return true;
    };

    // MARK: 다음 스텝
    const handleNext = () => {
        if (!validateStep()) return;
        setError(null);
        if (currentStep < TOTAL_STEPS) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    // MARK: 회원가입 완료
    const handleComplete = async () => {
        if (!validateStep()) return;
        setIsLoading(true);
        setError(null);

        try {
            await register({
                userId: formData.userId.trim(),
                password: formData.password,
                userName: formData.userName.trim(),
                phoneNumber: formData.phoneNumber.trim() || null,
            });

            // 회원가입 후 자동 로그인
            await login({
                userId: formData.userId.trim(),
                password: formData.password,
            });

            // 최초 로그인 페이지로 이동 (정보 입력)
            router.push('/first-login');
        } catch (err: any) {
            console.error('회원가입 실패:', err);

            if (err.response?.status === 400) {
                setError('이미 사용 중인 아이디입니다.');
            } else {
                setError('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // MARK: 스텝별 콘텐츠
    const { title, subtitle } = useMemo(() => {
        const map: Record<number, { title: string; subtitle: string }> = {
            1: { title: '회원가입을 위해', subtitle: '본인인증이 필요해요' },
            2: { title: '로그인에 사용할', subtitle: '아이디를 입력해주세요' },
            3: { title: '개인정보 보호를 위해', subtitle: '비밀번호를 설정해주세요' },
        };
        return map[currentStep];
    }, [currentStep]);
    const isLastStep = currentStep === TOTAL_STEPS;

    return (
        <div className="min-h-screen flex flex-col bg-white px-4 pt-6 pb-6 full-bleed">
            {/* 헤더 */}
            <AuthHeader title="회원가입" className="px-2" />

            {/* 인디케이터 */}
            <div className="flex self-center justify-center mt-4 space-x-2">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            currentStep === i + 1 ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>

            {/* 메인 콘텐츠 */}
            <div className="flex-1 flex flex-col mt-6">
                {/* 타이틀 */}
                <h1 className="text-lg font-semibold text-gray-900 mb-1">{title}</h1>
                <p className="text-lg font-semibold text-gray-900 mb-5">{subtitle}</p>

                {/* Step 1: 본인인증 */}
                {currentStep === 1 && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">이름</label>
                            <InputBox
                                name="userName"
                                placeholder="이름 입력"
                                value={formData.userName}
                                onChange={(e) => updateField('userName', e.target.value)}
                                className="py-3"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">휴대폰 번호</label>
                            <InputBox
                                name="phoneNumber"
                                placeholder="휴대폰 번호 입력('-' 제외)"
                                value={formData.phoneNumber}
                                onChange={(e) => updateField('phoneNumber', e.target.value)}
                                className="py-3"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: 아이디 입력 */}
                {currentStep === 2 && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">아이디</label>
                            <InputBox
                                name="userId"
                                placeholder="아이디 입력"
                                value={formData.userId}
                                onChange={(e) => updateField('userId', e.target.value)}
                                className="py-3"
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: 비밀번호 설정 */}
                {currentStep === 3 && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">비밀번호</label>
                            <InputBox
                                name="password"
                                type="password"
                                placeholder="비밀번호 입력"
                                value={formData.password}
                                onChange={(e) => updateField('password', e.target.value)}
                                className="py-3"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">비밀번호 확인</label>
                            <InputBox
                                name="passwordConfirm"
                                type="password"
                                placeholder="비밀번호 확인"
                                value={formData.passwordConfirm}
                                onChange={(e) => updateField('passwordConfirm', e.target.value)}
                                className="py-3"
                            />
                        </div>
                    </div>
                )}

                {/* 에러 메시지 */}
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>

            {/* 하단 버튼 */}
            <div className="mt-8">
                <Button
                    status="default"
                    className="py-[12px] rounded-[12px]"
                    onClick={isLastStep ? handleComplete : handleNext}
                    disabled={isLoading}
                >
                    {isLoading ? '처리 중...' : isLastStep ? '회원가입 완료' : '다음으로'}
                </Button>
            </div>
        </div>
    );
}

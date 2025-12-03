
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { FirstLoginFormState, InitialFirstLogin } from '@/features/auth/login/types';
import { gender, age, features } from '@/types';
import { mapGenderToBackend, mapAgeToBackend, mapFeaturesToBackend } from '@/features/auth/utils/mapper';
import { updateMe } from '@/features/auth/api/auth-api';

export default function FirstLoginPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FirstLoginFormState>(InitialFirstLogin);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const ageRanges: { label: string; value: age }[] = [
        { label: '10대', value: '10' },
        { label: '20대', value: '20' },
        { label: '30대', value: '30' },
        { label: '40대', value: '40' },
        { label: '50대', value: '50' },
        { label: '60대 이상', value: '60+' },
    ];

    const genderRanges: { label: string; value: gender }[] = [
        { label: '남자', value: 'MALE' },
        { label: '여자', value: 'FEMALE' },
    ];

    const themes: { title: features; icon: string; desc: string }[] = [
        { title: '기억력 향상', icon: '🧠', desc: '순서 기억, 단어 기억 등' },
        { title: '집중력 훈련', icon: '🎯', desc: '집중 유지, 방해 요소 차단' },
        { title: '언어 능력', icon: '💬', desc: '어휘력·표현력 강화' },
        { title: '수리 능력', icon: '🔢', desc: '연산·논리적 사고' },
    ];

    // 페이지 핸들러
    const handleNext = () => {
        // Step 2에서 유효성 검사
        if (currentStep === 2) {
            if (!formData.gender) {
                setError('성별을 선택해주세요.');
                return;
            }
            if (!formData.age) {
                setError('나이를 선택해주세요.');
                return;
            }
        }

        setError(null);
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const toggleTheme = (title: features) => {
        setFormData((prev) => {
            const features = prev.features.includes(title)
                ? prev.features.filter((f) => f !== title)
                : [...prev.features, title];
            return { ...prev, features };
        });
    };

    // MARK: 최초 로그인 정보 저장
    const handleComplete = async () => {
        // Step 3 유효성 검사 (관심 영역만)
        if (formData.features.length === 0) {
            setError('관심 영역을 최소 1개 이상 선택해주세요.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // 프론트 → 백엔드 타입 변환
            const gender = mapGenderToBackend(formData.gender);
            const age = mapAgeToBackend(formData.age);
            const interests = mapFeaturesToBackend(formData.features);

            await updateMe({
                gender,
                age,
                interests,
            });

            router.push('/home');
        } catch (err: any) {
            console.error('프로필 저장 실패:', err);
            setError('프로필 저장에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // MARK: 전체 컨테이너
        <div className="min-h-screen flex flex-col bg-white">
            {/* MARK: 인디게이터 */}
            <div className="flex self-center justify-center mt-4 mb-14 space-x-2">
                <div className={`w-2 h-2 rounded-full ${currentStep === 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <div className={`w-2 h-2 rounded-full ${currentStep === 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <div className={`w-2 h-2 rounded-full ${currentStep === 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            </div>

            {/* MARK: 환영 메시지 */}
            {currentStep === 1 && (
                <section id='welcom-01' className='relative flex-1 flex flex-col items-center justify-center'>
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-5xl mb-6">📝</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">만나서 반가워요!</h1>
                        <p className="text-center text-gray-500 text-base leading-relaxed whitespace-pre">
                            {"맞춤형 서비스를 위해\n간단한 정보를 입력해 주세요"}
                        </p>
                    </div>
                    <Button status="default" className="absolute bottom-5 py-[12px] mt-[30px]" onClick={handleNext}>
                        다음으로
                    </Button>
                </section>
            )}

            {/* MARK : 성별과 나이 */}
            {currentStep === 2 && (
                <section id='welcom-02' className='relative flex-1'>
                    <div className="flex-1 flex flex-col justify-center mb-2">
                        <h1 className="text-xl font-bold text-gray-900 mb-3">성별과 나이를 알려주세요</h1>
                        <p className="text-gray-500 text-base leading-relaxed">
                            맞춤형 활동 추천을 위해 활용돼요
                        </p>
                    </div>

                    <div className="w-full">
                        {/* MARK: 성별 선택 */}
                        <h1 className="text-base font-bold text-gray-900 mt-6 mb-3">성별</h1>
                        <div className="mt-2 flex gap-3">
                            {genderRanges.map(({ label, value }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, gender: value }))}
                                    className={`
                                        transition-colors
                                        aspect-[171/64]
                                        ${formData.gender === value
                                            ? 'flex-1 rounded-xl bg-[#3E56F6] py-3 text-center text-sm font-semibold text-white'
                                            : 'flex-1 rounded-xl bg-gray-200 py-3 text-center text-sm font-medium text-gray-500'}`
                                    }
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        
                        {/* MARK: 나이 선택 */}
                        <h1 className="text-base font-bold text-gray-900 mt-[30px] mb-3">나이</h1>
                        <div className="mt-4 grid grid-cols-3 gap-3">
                            {ageRanges.map(({ label, value }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, age: value }))}
                                    className={`
                                        aspect-[108/57] transition-colors
                                        ${formData.age === value
                                            ? 'flex-1 rounded-xl bg-[#3E56F6] py-3 text-center text-sm font-semibold text-white'
                                            : 'flex-1 rounded-xl bg-gray-200 py-3 text-center text-sm font-medium text-gray-500'}`
                                    }
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                    

                    <Button status="default" className="absolute bottom-5 py-[12px]" onClick={handleNext}>
                        다음으로
                    </Button>
                </section>
            )}

            {/* MARK : 관심 영역 선택 */}
            {currentStep === 3 && (
                <section id='welcome-03' className='relative flex-1'>
                    <div className="flex flex-col justify-center mt-10 mb-2">
                        <h1 className="text-xl font-bold text-gray-900 mb-3">관심 있는 영역을 모두 선택해주세요</h1>
                        <p className="text-gray-500 text-base leading-relaxed mb-5">나만의 맞춤형 테마를 추천해드릴게요</p>
                    </div>

                    {/* FIXME: jutify-between 안되는 오류 찾기 */}
                    <div className="flex-1 flex flex-col gap-4">
                        {themes.map(({ title, icon, desc }) => (
                            <button
                                key={title}
                                type="button"
                                onClick={() => toggleTheme(title)}
                                className={`aspect-[358/100] w-full rounded-2xl px-4 py-5 text-left flex items-center gap-3 border-2 transition-all
                                    ${formData.features.includes(title)
                                        ? 'border-[#3E56F6] bg-[#3769F114]'
                                        : 'border-transparent bg-gray-100'}
                                `}
                            >
                                <p className="text-4xl leading-snug">{icon}</p>
                                <div className="flex flex-col text-left">
                                    <p className="text-base font-semibold text-gray-900">{title}</p>
                                    <p className="text-sm text-gray-500 mt-1">{desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <Button
                        status="default"
                        className="absolute bottom-5 py-[12px]"
                        onClick={handleComplete}
                        disabled={isLoading}
                    >
                        {isLoading ? '저장 중...' : '완료'}
                    </Button>
                </section>
            )}
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { InputBox } from '@/shared/ui/input-box';
import { HeaderWithBefore } from '@/features/auth/ui/auth-header';
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';
import { getMe, updateMe } from '@/features/auth/api/auth-api';
import {
    mapGenderToFrontend,
    mapAgeToFrontend,
    mapInterestsToFrontend,
    mapGenderToBackend,
    mapAgeToBackend,
    mapFeaturesToBackend
} from '@/features/auth/utils/mapper';
import { gender, age, features } from '@/types';

// MARK: 프로필 폼 상태 타입
interface ProfileFormState {
    userName: string;
    gender: gender | null;
    age: age | null;
    features: features[];
    profileImageUrl: string | null;
}

const initialFormState: ProfileFormState = {
    userName: '',
    gender: null,
    age: null,
    features: [],
    profileImageUrl: null,
};

export default function ProfileEditPage() {
    const router = useRouter();
    const { isChecking } = useAuthGuard();
    const [formData, setFormData] = useState<ProfileFormState>(initialFormState);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const genderOptions: { label: string; value: gender }[] = [
        { label: '남자', value: 'MALE' },
        { label: '여자', value: 'FEMALE' },
    ];

    const ageOptions: { label: string; value: age }[] = [
        { label: '10대', value: '10' },
        { label: '20대', value: '20' },
        { label: '30대', value: '30' },
        { label: '40대', value: '40' },
        { label: '50대', value: '50' },
        { label: '60대 이상', value: '60+' },
    ];

    const featureOptions: { title: features; icon: string }[] = [
        { title: '기억력 향상', icon: '🧠' },
        { title: '집중력 훈련', icon: '🎯' },
        { title: '언어 능력', icon: '💬' },
        { title: '수리 능력', icon: '🔢' },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getMe();
                setFormData({
                    userName: user.userName || '',
                    gender: mapGenderToFrontend(user.gender),
                    age: mapAgeToFrontend(user.age),
                    features: mapInterestsToFrontend(user.interests),
                    profileImageUrl: user.profileImageUrl,
                });
            } catch (err) {
                console.error('사용자 정보 조회 실패:', err);
                setError('사용자 정보를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };
        if (!isChecking) fetchUserData();
    }, [isChecking]);

    const toggleFeature = (feature: features) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature],
        }));
    };

    const handleSave = async () => {
        if (!formData.userName.trim()) {
            setError('이름을 입력해주세요.');
            return;
        }
        setIsSaving(true);
        setError(null);
        try {
            await updateMe({
                userName: formData.userName,
                gender: mapGenderToBackend(formData.gender),
                age: mapAgeToBackend(formData.age),
                interests: mapFeaturesToBackend(formData.features),
            });
            router.back();
        } catch (err) {
            console.error('프로필 수정 실패:', err);
            setError('프로필 수정에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isChecking || isLoading) return <AuthLoading />;

    return (
        <div className="min-h-screen full-bleed bg-white px-5 pt-12 pb-10">
            <HeaderWithBefore title="내정보 수정" fallbackPath="/profile" />

            {/* MARK: 프로필 이미지 */}
            <section className="mt-6 flex flex-col items-center">
                <div className="relative">
                    <img
                        src={formData.profileImageUrl?.trim() || '/taekJun.jpg'}
                        alt="프로필 이미지"
                        className="h-32 w-32 rounded-2xl object-cover shadow-sm"
                    />
                    <button
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white shadow grid place-items-center border border-gray-200"
                        aria-label="프로필 사진 변경"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z" />
                            <circle cx="12" cy="13" r="4" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* MARK: 폼 영역 */}
            <section className="mt-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    <InputBox
                        value={formData.userName}
                        onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                        placeholder="이름을 입력해주세요"
                        className="py-3"
                    />
                </div>

                <div>
                    <label className="block text-base font-bold text-gray-900 mb-3">성별</label>
                    <div className="flex gap-3">
                        {genderOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, gender: option.value }))}
                                className={`flex-1 aspect-[171/64] rounded-xl transition-colors text-sm font-semibold ${
                                    formData.gender === option.value
                                        ? 'bg-[#3E56F6] text-white'
                                        : 'bg-gray-200 text-gray-500'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-base font-bold text-gray-900 mb-3">연령대</label>
                    <div className="grid grid-cols-3 gap-3">
                        {ageOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, age: option.value }))}
                                className={`aspect-[108/57] rounded-xl transition-colors text-sm font-semibold ${
                                    formData.age === option.value
                                        ? 'bg-[#3E56F6] text-white'
                                        : 'bg-gray-200 text-gray-500'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-base font-bold text-gray-900 mb-3">관심 영역</label>
                    <div className="flex flex-col gap-3">
                        {featureOptions.map((option) => (
                            <button
                                key={option.title}
                                type="button"
                                onClick={() => toggleFeature(option.title)}
                                className={`w-full aspect-[358/72] rounded-2xl px-4 text-left flex items-center gap-3 border-2 transition-all ${
                                    formData.features.includes(option.title)
                                        ? 'border-[#3E56F6] bg-[#3769F114]'
                                        : 'border-transparent bg-gray-100'
                                }`}
                            >
                                <span className="text-3xl">{option.icon}</span>
                                <span className="text-base font-semibold text-gray-900">{option.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {error && <p className="mt-4 text-center text-red-500 text-sm">{error}</p>}

            <div className="mt-8">
                <Button onClick={handleSave} disabled={isSaving} className="py-4 rounded-xl">
                    {isSaving ? '저장 중...' : '저장하기'}
                </Button>
            </div>
        </div>
    );
}


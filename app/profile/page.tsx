'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BottomNavigation } from '@/shared/ui/bottom-nav';
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';
import { getMe, updateMe } from '@/features/auth/api/auth-api';
import { getMyActivities } from '@/features/activity/api/activity-api';

// MARK: 카메라 아이콘
function CameraIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    );
}

// MARK: 설정 아이콘
function SettingsIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    );
}

// MARK: 프로필 데이터 타입
interface ProfileData {
    userName: string;
    profileImageUrl: string | null;
    createdAt: string;
}

// MARK: 함께한 날 계산
function calculateDaysTogether(createdAt: string): number {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// MARK: 숫자 카운트업 + 슬라이드업 + 페이드인 + 블러 애니메이션 Hook
function useCountUp(target: number, duration: number = 1000) {
    const [count, setCount] = useState(0);
    const [style, setStyle] = useState<React.CSSProperties>({
        opacity: 0,
        transform: 'translateY(12px)',
        filter: 'blur(2px)',
        transition: 'none'
    });

    useEffect(() => {
        if (target === 0) {
            setCount(0);
            setStyle({ opacity: 1, transform: 'translateY(0)', filter: 'none' });
            return;
        }

        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easeOutCubic - 부드럽게 감속
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easeOut);

            setCount(currentValue);

            // 슬라이드업 + 페이드인 + 블러 해제 (모두 동일한 easing)
            const opacity = easeOut;
            const translateY = 12 * (1 - easeOut);
            const blur = 2 * (1 - easeOut);

            setStyle({
                opacity,
                transform: `translateY(${translateY}px)`,
                filter: blur > 0.1 ? `blur(${blur}px)` : 'none'
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setStyle({ opacity: 1, transform: 'translateY(0)', filter: 'none' });
            }
        };

        requestAnimationFrame(animate);
    }, [target, duration]);

    return { count, style };
}

export default function ProfilePage() {
    const router = useRouter();
    const { isChecking } = useAuthGuard();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [totalCards, setTotalCards] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // MARK: 카운트업 애니메이션 적용
    const daysTogether = profileData?.createdAt
        ? calculateDaysTogether(profileData.createdAt)
        : 0;
    const { count: animatedCards, style: cardsStyle } = useCountUp(totalCards, 1000);
    const { count: animatedDays, style: daysStyle } = useCountUp(daysTogether, 1000);

    // MARK: 이미지 파일 처리
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 파일 크기 체크 (5MB 제한)
        if (file.size > 5 * 1024 * 1024) {
            setError('이미지 크기는 5MB 이하여야 합니다.');
            return;
        }

        // 이미지 미리보기 (Base64)
        const reader = new FileReader();
        reader.onload = async (event) => {
            const imageDataUrl = event.target?.result as string;

            // 로컬 상태 업데이트 (미리보기)
            setProfileData(prev => prev ? { ...prev, profileImageUrl: imageDataUrl } : null);

            // TODO: 백엔드에 이미지 업로드 API가 있다면 여기서 호출
            // 현재는 profileImageUrl을 직접 저장 (Base64 또는 외부 URL)
            try {
                await updateMe({ profileImageUrl: imageDataUrl });
            } catch (err) {
                console.error('프로필 이미지 업데이트 실패:', err);
                setError('이미지 업로드에 실패했습니다.');
            }
        };
        reader.readAsDataURL(file);
    };

    // MARK: 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [user, activities] = await Promise.all([
                    getMe(),
                    getMyActivities({ limit: 1 }) // total 값만 필요
                ]);

                setProfileData({
                    userName: user.userName || '사용자',
                    profileImageUrl: user.profileImageUrl,
                    createdAt: user.createdAt,
                });
                setTotalCards(activities.total);
            } catch (err) {
                console.error('프로필 데이터 조회 실패:', err);
                setError('프로필 정보를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        if (!isChecking) fetchData();
    }, [isChecking]);

    if (isChecking || isLoading) return <AuthLoading />;

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#EDEDED] full-bleed pb-[88px]">
            <div className="w-full max-w-[430px] flex flex-col flex-1">
                {/* MARK: 헤더 */}
                <header className="px-2 pt-12 pb-4 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900">내 정보</span>
                </header>

                {/* MARK: 프로필 카드 */}
                <div className="px-2">
                <div className="flex flex-col items-center gap-4">
                    {/* 이미지 업로드 영역 */}
                    <div className="relative">
                        <img
                            src={profileData?.profileImageUrl?.trim() || '/taekJun.jpg'}
                            alt="프로필 이미지"
                            className="h-20 w-20 rounded-2xl object-cover"
                        />
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-white shadow grid place-items-center border border-gray-200"
                            aria-label="프로필 사진 변경"
                        >
                            <CameraIcon className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900">
                        {profileData?.userName}
                    </h2>
                    <button
                        onClick={() => router.push('/profile/edit')}
                        className="text-sm bg-[#3E56F6] text-white rounded-[99px] px-4 py-2 font-medium flex items-center justify-center"
                    >
                        내 정보 수정
                    </button>
                </div>
            </div>

            {/* MARK: 통계 영역 */}
            <div className="px-2 mt-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-center">
                        {/* 총 학습한 카드 */}
                        <div className="flex-1 text-center">
                            <div className="text-sm text-gray-500">총 학습한 카드</div>
                            <div className="text-2xl font-bold text-[#3E56F6] mt-1">
                                <span style={cardsStyle} className="inline-block">{animatedCards}</span>
                            </div>
                        </div>
                        {/* 구분선 */}
                        <div className="h-10 w-[1px] bg-gray-200" />
                        {/* 함께한 날 */}
                        <div className="flex-1 text-center">
                            <div className="text-sm text-gray-500">함께한 날</div>
                            <div className="text-2xl font-bold text-[#3E56F6] mt-1">
                                <span style={daysStyle} className="inline-block">{animatedDays}</span>일 째
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MARK: 서비스 준비중 카드 */}
            <div className="px-2 mt-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center gap-2">
                    <span className="text-2xl">🚧</span>
                    <p className="text-gray-500 text-sm">서비스 준비중입니다</p>
                </div>
            </div>

                {/* MARK: 에러 메시지 */}
                {error && (
                    <div className="px-2 mt-4">
                        <p className="text-center text-red-500 text-sm">{error}</p>
                    </div>
                )}
            </div>
            <BottomNavigation />
        </div>
    );
}


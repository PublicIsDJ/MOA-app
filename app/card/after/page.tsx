'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { AuthHeader } from '@/features/auth/ui/auth-header';
import Image from 'next/image';
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';

const context = [
    { icon: '✅', text: '완성한 카드', value: '5' },
    { icon: '⏰', text: '소요시간', value: '8분 30초' },
    { icon: '🔥', text: '연속 활동', value: '4일째' },
];

const shareOptions = [
    { key: 'share-kakao', iconSrc: '/ic_kakao.svg', label: '카카오톡 공유', helper: '친구와 함께 공유해보세요' },
    { key: 'share-link', fallbackIcon: '🔗', label: '링크 복사', helper: '링크를 복사해서 전달' },
];

export default function AfterCard() {
    const { isChecking } = useAuthGuard();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    if (isChecking) return <AuthLoading />;

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-between bg-white px-6 py-10">
            <AuthHeader title="완료" className="mt-5" />

            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-5xl mb-6">🎉</div>
                <h1 className="text-center text-2xl font-bold text-gray-900 mb-3">활동 완료</h1>
                <p className="text-center text-gray-500 text-base leading-relaxed whitespace-pre">
                    {'대단해요! 멋지게 해냈네요'}
                </p>
            </div>

            <div className="space-y-3 w-full mb-10">
                {context.map(({ icon, text, value }) => (
                    <div
                        key={text}
                        className="flex items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3"
                    >
                        <span className="text-lg">{icon}</span>
                        <p className="text-sm font-medium text-gray-800">{text}</p>
                        <p className="text-sm font-medium text-left self-start text-[#1C306F] ml-auto">
                            {value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="w-full flex flex-row gap-3">
                <Button
                    status="inactive"
                    className="py-[12px] mt-[30px]"
                    onClick={() => setIsShareModalOpen(true)}
                >
                    공유하기
                </Button>
                <Button status="default" className="py-[12px] mt-[30px]">
                    다음으로
                </Button>
            </div>

            {isShareModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
                        onClick={() => setIsShareModalOpen(false)}
                    />

                    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-6">
                        <div className="relative w-full max-w-sm rounded-3xl bg-white px-6 pt-10 pb-8 text-center shadow-xl">
                            <button
                                type="button"
                                className="absolute right-4 top-4 text-gray-400"
                                onClick={() => setIsShareModalOpen(false)}
                            >
                                ✕
                            </button>

                            <div className="mb-6 flex flex-col items-center gap-3">
                                <div className="text-3xl">📝</div>
                                <p className="text-base font-semibold text-gray-900">
                                    지금 나의 활동을 공유해보세요
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {shareOptions.map(({ key, iconSrc, fallbackIcon = '💬', label }) => (
                                    <button
                                        key={key}
                                        type="button"
                                        className="flex flex-col items-center gap-2 rounded-2xl bg-gray-100 px-4 py-5"
                                        onClick={() => setIsShareModalOpen(false)}
                                    >
                                        {iconSrc ? (
                                            <Image src={iconSrc} alt={label} width={44} height={44} />
                                        ) : (
                                            <span className="text-3xl">{fallbackIcon}</span>
                                        )}
                                        <span className="text-sm font-medium text-gray-900">{label}</span>
                                    </button>
                                ))}
                            </div>

                            <Button
                                status="inactive"
                                className="w-full py-[12px] mt-6"
                                onClick={() => setIsShareModalOpen(false)}
                            >
                                닫기
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
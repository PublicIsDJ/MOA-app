'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BottomNavigation } from '@/shared/ui/bottom-nav';
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';

// MARK: 배너 데이터
const banners = [
    { id: 1, title: 'MOA와 함께\n소중한 기억을 기록해요', icon: PencilIcon, bgColor: 'bg-[#4E73FF]' },
    { id: 2, title: '매일 15분,\n뇌 건강을 지켜요', icon: BrainIcon, bgColor: 'bg-[#6B4EFF]' },
    { id: 3, title: '카드로 시작하는\n재미있는 기억 훈련', image: '/cards-me/birth.svg', bgColor: 'bg-[#4E8FFF]' },
];

const quickActions = [
    { id: 'start', title: '카드 시작', subtitle: '새로운 기록을 남겨요', href: '/card', icon: TargetIcon },
    { id: 'qr', title: 'QR 인식', subtitle: '카드 인증하기', href: '/qr', icon: QrIcon },
    { id: 'archive', title: '내 보관함', subtitle: '완성한 카드 모아보기', href: '/archive', icon: ArchiveIcon },
    { id: 'profile', title: '내 정보', subtitle: '계정 및 설정', href: '/profile', icon: UserIcon },
];

const headerIcons = [
    { id: 'qr', label: 'QR 인식', icon: QrIcon, href: '/qr' },
    { id: 'profile', label: '내 정보', icon: UserIcon, href: '/profile' },
];

export default function HomePage() {
    const { isChecking } = useAuthGuard();

    if (isChecking) return <AuthLoading />;

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#EDEDED] full-bleed pb-[88px]">
            <div className="w-full max-w-[430px] flex flex-col flex-1">
                <Header/>
                <main className="flex-1 w-full pb-8 px-2 space-y-5">
                  <div className='border-t border-[#9C9C9C]/20 rounded-[12px]'/>
                    <BannerCarousel />
                    <MissionCard />
                    <QuickActions />
                </main>
            </div>
            <BottomNavigation className="max-w-[430px] mx-auto w-full" />
        </div>
    );
}

function Header({ className }: { className?: string }) {
    return (
        <header className={`px-2 pt-6 pb-4 flex items-center justify-between ${className ?? ''}`}>
            <span className="text-xl font-bold  text-[#4D57FE]">MOA</span>
            <div className="flex items-center gap-4 text-[#9E9E9E]">
                {headerIcons.map(({ id, label, icon: Icon, href }) => (
                    <Link
                        key={id}
                        href={href}
                        aria-label={label}
                        className="h-8 w-8 flex items-center justify-center hover:text-[#4D57FE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4D57FE]"
                    >
                        <Icon className="h-5 w-5" />
                    </Link>
                ))}
            </div>
        </header>
    );
}

// MARK: 배너 캐러셀 컴포넌트 (무한 루프)
function BannerCarousel() {
    const [currentIndex, setCurrentIndex] = useState(1); // 1부터 시작 (0은 복제된 마지막 배너)
    const [isTransitioning, setIsTransitioning] = useState(true);

    // 무한 루프: [마지막 복제, ...원본, 첫번째 복제]
    const extendedBanners = [banners[banners.length - 1], ...banners, banners[0]];

    // 자동 슬라이드 (5초마다)
    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // 끝에 도달하면 순간이동
    useEffect(() => {
        // 마지막 복제 배너(인덱스 = banners.length + 1)에 도달
        if (currentIndex === banners.length + 1) {
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(1);
            }, 500);
            return () => clearTimeout(timeout);
        }
        // 첫 번째 복제 배너(인덱스 = 0)에 도달 (인디케이터 역방향 클릭 시)
        if (currentIndex === 0) {
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(banners.length);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex]);

    // 실제 표시할 인덱스 (0 ~ banners.length - 1)
    const displayIndex = currentIndex === 0
        ? banners.length - 1
        : currentIndex === banners.length + 1
            ? 0
            : currentIndex - 1;

    const handleIndicatorClick = (index: number) => {
        setIsTransitioning(true);
        setCurrentIndex(index + 1);
    };

    return (
        <section className="relative">
            <div className="overflow-hidden rounded-[20px]">
                <div
                    className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {extendedBanners.map((banner, index) => {
                        const Icon = banner.icon;
                        return (
                            <div
                                key={`${banner.id}-${index}`}
                                className={`${banner.bgColor} min-w-full px-4 py-8 text-white`}
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold leading-snug whitespace-pre-line">
                                        {banner.title}
                                    </h2>
                                    {Icon ? (
                                        <Icon className="w-12 h-12 text-white/90" />
                                    ) : banner.image ? (
                                        <Image src={banner.image} alt="" width={48} height={48} className="w-12 h-12" />
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* 인디케이터 */}
            <div className="flex justify-center gap-2 mt-3">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleIndicatorClick(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            index === displayIndex ? 'bg-[#4E73FF]' : 'bg-gray-300'
                        }`}
                        aria-label={`배너 ${index + 1}로 이동`}
                    />
                ))}
            </div>
        </section>
    );
}

// MARK: 서비스 준비중 플레이스홀더
function MissionCard() {
    return (
        <section className="bg-white rounded-[22px] px-2 py-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
                <ConstructionIcon className="w-10 h-10 text-[#F59E0B] mb-3" />
                <h3 className="text-base font-semibold text-gray-900">서비스 준비중</h3>
                <p className="mt-2 text-sm text-gray-500">
                    더 나은 서비스로 곧 찾아뵙겠습니다
                </p>
            </div>
        </section>
    );
}

function QuickActions() {
    return (
        <section className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900">자주 사용하는 기능</h4>
            <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Link
                            key={action.id}
                            href={action.href}
                            className="rounded-[22px] bg-white px-4 py-4 shadow-sm hover:shadow transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4E73FF]"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F5FF]">
                                <Icon className="w-5 h-5 text-[#4E73FF]" />
                            </div>
                            <p className="mt-3 text-base font-semibold text-gray-900">{action.title}</p>
                            <p className="mt-1 text-sm text-gray-500">{action.subtitle}</p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

// MARK: 아이콘 컴포넌트
type IconProps = { className?: string };

function SearchIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
            <circle cx="11" cy="11" r="7" />
            <path d="M16 16L21 21" />
        </svg>
    );
}

function QrIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
            <path d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5z" />
            <path d="M15 15h2v2h-2zM19 15h2v6h-6v-2h4z" />
        </svg>
    );
}

function UserIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
            <circle cx="12" cy="9" r="4" />
            <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" />
        </svg>
    );
}

function PencilIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
    );
}

function BrainIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
        </svg>
    );
}

function CardIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
        </svg>
    );
}

function TargetIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}

function ArchiveIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M21 8v13H3V8" />
            <path d="M1 3h22v5H1z" />
            <path d="M10 12h4" />
        </svg>
    );
}

function ConstructionIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="2" y="6" width="20" height="8" rx="1" />
            <path d="M17 14v7" />
            <path d="M7 14v7" />
            <path d="M17 3v3" />
            <path d="M7 3v3" />
            <path d="M10 14L7 21" />
            <path d="M14 14l3 7" />
        </svg>
    );
}



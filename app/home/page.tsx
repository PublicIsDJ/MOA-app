'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/shared/ui/container';
import { BottomNavigation } from '@/shared/ui/bottom-nav';

const hero = {
    date: '2025-05-25',
    title: '김모아님의 최근 기록',
    actionLabel: '확인하기',
    image: '/cards-time/season.svg',
};

const mission = {
    badge: '오늘의 미션',
    title: '기억력 향상을 위한 카드',
    subtitle: '예상 소요시간 15분',
    actionLabel: '카드 열기',
};

const quickActions = [
    { id: 'start', title: '카드 시작', subtitle: '새로운 기록을 남겨요', href: '/card-page/before', icon: '🎯' },
    { id: 'qr', title: 'QR 인식', subtitle: '카드 인증하기', href: '/qr', icon: '📱' },
    { id: 'archive', title: '내 보관함', subtitle: '완성한 카드 모아보기', href: '/archive', icon: '🗂️' },
    { id: 'profile', title: '내 정보', subtitle: '계정 및 설정', href: '/profile', icon: '👤' },
];

const headerIcons = [
    { id: 'search', label: '검색', icon: SearchIcon, href: '/search' },
    { id: 'qr', label: 'QR 인식', icon: QrIcon, href: '/qr' },
    { id: 'profile', label: '내 정보', icon: UserIcon, href: '/profile' },
];

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-[#EDEDED] full-bleed pb-[88px]">
            <div className="w-full max-w-[430px] flex flex-col flex-1">
                <Header />
                <main className="flex-1 pb-8">
                    <Container className="space-y-5">
                        <HeroCard />
                        <MissionCard />
                        <QuickActions />
                    </Container>
                </main>
            </div>
            <BottomNavigation className="max-w-[430px] mx-auto w-full" />
        </div>
    );
}

function Header() {
    return (
        <header className="px-5 pt-6 pb-4 flex items-center justify-between">
            <span className="text-xl font-bold tracking-[0.18em] text-[#4D57FE]">MOA</span>
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

function HeroCard() {
    return (
        <section className="relative rounded-[28px] bg-[#4E73FF] text-white px-6 py-6 shadow-[0_14px_40px_rgba(77,87,254,0.35)] overflow-hidden">
            <div className="relative z-10 space-y-3">
                <p className="text-sm opacity-80">{hero.date}</p>
                <h2 className="text-2xl font-semibold leading-snug">{hero.title}</h2>
                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                    {hero.actionLabel}
                    <ArrowIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="absolute bottom-4 right-4 w-24 h-24 rotate-6">
                <Image src={hero.image} alt="최근 기록 카드" width={96} height={96} className="h-full w-full object-contain" priority />
            </div>
            <div className="absolute inset-0 rounded-[28px] border border-white/10 pointer-events-none" />
        </section>
    );
}

function MissionCard() {
    return (
        <section className="bg-white rounded-[22px] px-6 py-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <span className="inline-flex items-center rounded-full bg-[#E6EBFF] px-3 py-1 text-xs font-semibold text-[#4E73FF]">
                        {mission.badge}
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-gray-900">{mission.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{mission.subtitle}</p>
                </div>
                <Link href="/card-page/before" className="text-sm font-semibold text-[#4E73FF] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4E73FF]">
                    {mission.actionLabel}
                </Link>
            </div>
        </section>
    );
}

function QuickActions() {
    return (
        <section className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900">자주 사용하는 기능</h4>
            <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action) => (
                    <Link
                        key={action.id}
                        href={action.href}
                        className="rounded-[22px] bg-white px-4 py-4 shadow-sm hover:shadow transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4E73FF]"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F5FF] text-xl">{action.icon}</div>
                        <p className="mt-3 text-base font-semibold text-gray-900">{action.title}</p>
                        <p className="mt-1 text-sm text-gray-500">{action.subtitle}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

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

function ArrowIcon({ className }: IconProps) {
    return (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M4 8h8" />
            <path d="M8 4l4 4-4 4" />
        </svg>
    );
}

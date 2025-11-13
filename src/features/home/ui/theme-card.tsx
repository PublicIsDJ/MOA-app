'use client';

import { CardThems } from '@/types';
import { useRouter } from 'next/navigation';

// MARK: 테마 데이터
const themes: CardThems[] = [
    { theme:'나', description: '들여다보기', icon: '👤'},
    { theme:'시간', description: '시간을 되돌아보기', icon: '⏰'},
    { theme:'공간', description: '장소마다 담긴 기억', icon: '🏠'},
    { theme:'소통', description: '마음을 전하고 나누기', icon: '💬'}
];

// MARK: 비활성화된 테마 목록
const disabledThemes = ['소통'];

interface Props {
    theme: CardThems;
    onClick?: () => void;
    disabled?: boolean;
    delay?: number;
}

// MARK: 테마 카드 컴포넌트
export function ThemeCard({ theme, onClick, disabled = false, delay = 0 }: Props) {
    return (
        <button
            type="button"
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className='relative w-full aspect-square bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-in-up'
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className='flex flex-col items-start h-full'>
                <h2 className='text-xl font-bold text-gray-900'>{theme.theme}</h2>
                <p className='text-sm text-gray-500 mt-1'>{theme.description}</p>
                <p className='text-4xl mt-auto ml-auto'>{theme.icon}</p>
            </div>

            {/* MARK: 비활성화 오버레이 */}
            {disabled && (
                <div className='absolute inset-0 bg-[#F5F5F5]/70 rounded-2xl' />
            )}
        </button>
    );
}

// MARK: 테마 카드 그리드
export function ThemeCardGrid() {
    const router = useRouter();

    // MARK: 테마별 라우터 매핑
    const themeRoutes: Record<string, string> = {
        '나': '/me',
        '시간': '/time',
        '공간': '/space',
        '소통': '/com',
    };

    const handleThemeClick = (themeName: string) => {
        const route = themeRoutes[themeName];
        if (route) {
            router.push(route);
        }
    };

    return (
        <div className='grid grid-cols-2 gap-4'>
            {themes.map((theme, index) => (
                <ThemeCard
                    key={theme.theme}
                    theme={theme}
                    onClick={() => handleThemeClick(theme.theme)}
                    disabled={disabledThemes.includes(theme.theme)}
                    delay={index * 100}
                />
            ))}
        </div>
    );
}
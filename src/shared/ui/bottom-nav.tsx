'use client';

import { useRouter, usePathname } from 'next/navigation';

interface Props {
    className?: string;
}

type NavItem = 'home' | 'card' | 'archive' | 'profile';

export function BottomNavigation({className = ''}: Props) {
    const router = useRouter();
    const pathname = usePathname();

    // MARK: 현재 경로에 따라 활성 탭 결정
    const getActiveTab = (): NavItem => {
        if (pathname === '/home') return 'home';
        if (pathname === '/card') return 'card'; 
        if (pathname === '/archive') return 'archive';
        if (pathname === '/profile') return 'profile';
        return 'home';
    };

    const activeTab = getActiveTab();

    // MARK: 네비게이션 아이템 데이터
    const navItems: { id: NavItem; label: string; icon: (isActive: boolean) => React.ReactNode; path: string }[] = [
        {
            id: 'home',
            label: '홈',
            icon: (isActive: boolean) => (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22.1835 11.8358L12.5296 2.18895C12.4601 2.1193 12.3776 2.06404 12.2867 2.02634C12.1958 1.98864 12.0984 1.96924 12 1.96924C11.9016 1.96924 11.8041 1.98864 11.7132 2.02634C11.6223 2.06404 11.5398 2.1193 11.4703 2.18895L1.81636 11.8358C1.53511 12.1171 1.37573 12.4991 1.37573 12.8975C1.37573 13.7249 2.04839 14.3975 2.87573 14.3975H3.89292V21.2811C3.89292 21.696 4.22808 22.0311 4.64292 22.0311H10.5V16.7811H13.125V22.0311H19.357C19.7718 22.0311 20.107 21.696 20.107 21.2811V14.3975H21.1242C21.5226 14.3975 21.9046 14.2405 22.1859 13.9569C22.7695 13.371 22.7695 12.4218 22.1835 11.8358Z" fill={isActive ? '#3E56F6' : '#9C9C9C'}/>
                </svg>
            ),
            path: '/home'
        },
        {
            id: 'card',
            label: '카드',
            icon: (isActive: boolean) => (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.75 1.25H3.25V22.75H20.75V1.25ZM15.901 12L12 6.148L8.099 12L12 17.852L15.901 12ZM6 6V4H8V6H6ZM16 18V20H18V18H16Z" fill={isActive ? '#3E56F6' : '#9C9C9C'}/>
                </svg>
            ),
            path: '/card'
        },
        {
            id: 'archive',
            label: '보관함',
            icon: (isActive: boolean) => (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12.414 5H21C21.2652 5 21.5196 5.10536 21.7071 5.29289C21.8946 5.48043 22 5.73478 22 6V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H10.414L12.414 5Z" fill={isActive ? '#3E56F6' : '#9C9C9C'}/>
                </svg>
            ),
            path: '/archive'
        },
        {
            id: 'profile',
            label: '프로필',
            icon: (isActive: boolean) => (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.9999 22.2453C17.5949 22.2453 22.2453 17.5948 22.2453 11.9998C22.2453 6.39497 17.5846 1.75439 11.9896 1.75439C6.38517 1.75439 1.75488 6.39497 1.75488 11.9998C1.75488 17.5948 6.39503 22.2453 11.9999 22.2453ZM12.0003 11.4375C10.604 11.4273 9.49917 10.262 9.49917 8.70539C9.49917 7.24868 10.604 6.03325 12.0003 6.03325C13.3863 6.03325 14.4912 7.24868 14.4912 8.70539C14.4912 10.262 13.3863 11.4573 12.0003 11.4375ZM7.55003 17.0321C7.15831 17.0321 6.96717 16.7707 6.96717 16.4193C6.96717 15.3448 8.5846 12.5823 11.9999 12.5823C15.4152 12.5823 17.0223 15.3448 17.0223 16.4193C17.0223 16.7707 16.8312 17.0321 16.4497 17.0321H7.55003Z" fill={isActive ? '#3E56F6' : '#9C9C9C'}/>
                </svg>
            ),
            path: '/profile'
        },
    ];

    // MARK: 탭 클릭 핸들러
    const handleTabClick = (path: string) => {
        router.push(path);
    };

    // MARK: 전체 컨테이너 (Safe Area 적용 + 모바일 규격)
    return (
        <div
            className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] ${className}`}
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <div className="flex items-center justify-around py-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => handleTabClick(item.path)}
                        className="flex flex-col items-center gap-0.5 transition-colors py-1"
                    >
                        {typeof item.icon === 'function' ? item.icon(activeTab === item.id) : item.icon}
                        <span
                            className={`text-[10px] font-medium transition-colors ${
                                activeTab === item.id
                                    ? 'text-[#3E56F6]'
                                    : 'text-gray-400'
                            }`}
                        >
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}
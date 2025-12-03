'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '../utils/token';

/**
 * 인증 가드 훅
 * - 로그인되지 않은 경우 스플래시(/)로 리다이렉션
 * - 로딩 상태 반환
 */
export function useAuthGuard() {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!isLoggedIn()) {
            router.replace('/');
            return;
        }
        setIsChecking(false);
    }, [router]);

    return { isChecking };
}


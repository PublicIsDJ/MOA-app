'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '../utils/token';

// MARK: - 인증 가드 훅
export function useAuthGuard() {
    const router = useRouter();
    // SSR: true (로딩), CSR: 토큰 없으면 true, 있으면 false
    const [isChecking, setIsChecking] = useState(() => {
        if (typeof window === 'undefined') return true;
        return !isLoggedIn();
    });

    useEffect(() => {
        if (!isLoggedIn()) {
            router.replace('/');
            return;
        }
        setIsChecking(false);
    }, [router]);

    return { isChecking };
}


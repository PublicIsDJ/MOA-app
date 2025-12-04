'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AuthLoading } from '@/shared/ui/auth-loading';

// MARK: 카드 ID → 실제 라우트 매핑
const CARD_ROUTES: Record<string, string> = {
    // 나 테마 (CD-001 ~ CD-005)
    'CD-001': '/me/cd-001',
    'CD-002': '/me/cd-002',
    'CD-003': '/me/cd-003',
    'CD-004': '/me/cd-004',
    'CD-005': '/me/cd-005',
    // 시간 테마 (CD-006 ~ CD-010)
    'CD-006': '/time/cd-006',
    'CD-007': '/time/cd-007',
    'CD-008': '/time/cd-008',
    'CD-009': '/time/cd-009',
    'CD-010': '/time/cd-010',
    // 공간 테마 (CD-011 ~ CD-015)
    'CD-011': '/place/cd-011',
    'CD-012': '/place/cd-012',
    'CD-013': '/place/cd-013',
    'CD-014': '/place/cd-014',
    'CD-015': '/place/cd-015',
};

// MARK: QR 스캔 URL 처리 페이지
// URL: /cards/CD-001?v=1 → /me/cd-001 로 리다이렉트
export default function CardRedirectPage() {
    const router = useRouter();
    const params = useParams();
    const cardId = params.cardId as string;

    useEffect(() => {
        if (!cardId) {
            router.replace('/home');
            return;
        }

        // 대소문자 정규화 (cd-001 → CD-001)
        const normalizedId = cardId.toUpperCase();
        const targetRoute = CARD_ROUTES[normalizedId];

        if (targetRoute) {
            // 해당 카드 페이지로 리다이렉트
            router.replace(targetRoute);
        } else {
            // 매핑되지 않은 카드 → 홈으로
            console.error('알 수 없는 카드 ID:', cardId);
            router.replace('/home');
        }
    }, [cardId, router]);

    // 리다이렉트 중 로딩 표시
    return <AuthLoading />;
}


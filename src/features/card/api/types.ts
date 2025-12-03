// MARK: 카드 API 타입 정의

// 카드 응답 타입
export interface CardResponse {
    id: string;
    qrCode: string;
    title: string;
    description: string | null;
    activityType: string;
    activityData: Record<string, unknown>;
    thumbnailUrl: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// 카드 목록 응답 타입
export interface CardListResponse {
    id: string;
    title: string;
    activityType: string;
    thumbnailUrl: string | null;
    isActive: boolean;
    createdAt: string;
}

// 페이지네이션 응답
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}


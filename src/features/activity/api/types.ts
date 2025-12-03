// MARK: Activity API 타입 정의

// 활동 기록 생성 요청
export interface ActivityCreate<T = Record<string, unknown>> {
    cardId: string;
    activityResult: T;
}

// 활동 기록 응답
export interface ActivityResponse {
    id: string;
    userId: string;
    cardId: string;
    activityResult: Record<string, unknown>;
    completedAt: string;
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


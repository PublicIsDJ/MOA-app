// MARK: 카드 관련 API 호출
import { apiClient } from '@/shared/api/client';
import type { CardResponse, CardListResponse, PaginatedResponse } from './types';

// MARK: QR 코드로 카드 조회
export async function scanQrCode(qrCode: string): Promise<CardResponse> {
    const response = await apiClient.post<CardResponse>('/api/cards/scan', null, {
        params: { qrCode },
    });
    return response.data;
}

// MARK: 카드 목록 조회
export async function getCards(params?: {
    skip?: number;
    limit?: number;
    activityType?: string;
}): Promise<PaginatedResponse<CardListResponse>> {
    const response = await apiClient.get<PaginatedResponse<CardListResponse>>('/api/cards', {
        params,
    });
    return response.data;
}

// MARK: 카드 상세 조회
export async function getCard(cardId: string): Promise<CardResponse> {
    const response = await apiClient.get<CardResponse>(`/api/cards/${cardId}`);
    return response.data;
}


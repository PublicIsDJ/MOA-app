// MARK: Activity 관련 API 호출
import { apiClient } from '@/shared/api/client';
import type { ActivityCreate, ActivityResponse, PaginatedResponse } from './types';

// MARK: 활동 기록 생성
export async function createActivity<T>(data: ActivityCreate<T>): Promise<ActivityResponse> {
    const response = await apiClient.post<ActivityResponse>('/api/activities', data);
    return response.data;
}

// MARK: 내 활동 목록 조회
export async function getMyActivities(params?: {
    skip?: number;
    limit?: number;
}): Promise<PaginatedResponse<ActivityResponse>> {
    const response = await apiClient.get<PaginatedResponse<ActivityResponse>>('/api/activities/me', {
        params,
    });
    return response.data;
}

// MARK: 활동 상세 조회
export async function getActivity(activityId: string): Promise<ActivityResponse> {
    const response = await apiClient.get<ActivityResponse>(`/api/activities/${activityId}`);
    return response.data;
}


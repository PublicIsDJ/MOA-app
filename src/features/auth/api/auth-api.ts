// MARK: 인증 관련 API 호출
import { apiClient } from '@/shared/api/client';
import { saveTokens, clearTokens, getRefreshToken } from '../utils/token';

// 로그인 요청 타입
interface LoginRequest {
    userId: string;
    password: string;
}

// 토큰 응답 타입
interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}

// 회원가입 요청 타입
interface RegisterRequest {
    userId: string;
    password: string;
    userName: string;
    gender?: 'male' | 'female' | 'other' | null;
    age?: '10' | '20' | '30' | '40' | '50' | '60+' | null;
    interests?: ('memory_improvement' | 'concentration_training' | 'language_ability' | 'math_ability')[] | null;
    phoneNumber?: string | null;
}

// 사용자 정보 수정 요청 타입
interface UserUpdateRequest {
    userName?: string;
    gender?: 'male' | 'female' | 'other' | null;
    age?: '10' | '20' | '30' | '40' | '50' | '60+' | null;
    interests?: ('memory_improvement' | 'concentration_training' | 'language_ability' | 'math_ability')[] | null;
    phoneNumber?: string | null;
    profileImageUrl?: string | null;
}

// 사용자 응답 타입
interface UserResponse {
    id: string;
    userId: string;
    userName: string;
    gender: 'male' | 'female' | 'other' | null;
    age: '10' | '20' | '30' | '40' | '50' | '60+' | null;
    interests: ('memory_improvement' | 'concentration_training' | 'language_ability' | 'math_ability')[] | null;
    phoneNumber: string | null;
    profileImageUrl: string | null;
    isActive: boolean;
    lastLoginAt: string | null;
    createdAt: string;
}

// MARK: 로그인
export async function login(data: LoginRequest): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/api/auth/login', data);
    const { accessToken, refreshToken } = response.data;
    
    // 토큰 저장
    saveTokens(accessToken, refreshToken);
    
    return response.data;
}

// MARK: 회원가입
export async function register(data: RegisterRequest): Promise<UserResponse> {
    const response = await apiClient.post<UserResponse>('/api/auth/register', data);
    return response.data;
}

// MARK: 토큰 갱신
export async function refreshToken(): Promise<TokenResponse> {
    const currentRefreshToken = getRefreshToken();
    if (!currentRefreshToken) {
        throw new Error('리프레시 토큰이 없습니다.');
    }
    
    const response = await apiClient.post<TokenResponse>('/api/auth/refresh', {
        refreshToken: currentRefreshToken,
    });
    
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    saveTokens(accessToken, newRefreshToken);
    
    return response.data;
}

// MARK: 로그아웃
export async function logout(): Promise<void> {
    const currentRefreshToken = getRefreshToken();
    if (currentRefreshToken) {
        try {
            await apiClient.post('/api/auth/logout', {
                refreshToken: currentRefreshToken,
            });
        } catch (error) {
            console.error('로그아웃 API 호출 실패:', error);
        }
    }
    clearTokens();
}

// MARK: 내 정보 조회
export async function getMe(): Promise<UserResponse> {
    const response = await apiClient.get<UserResponse>('/api/users/me');
    return response.data;
}

// MARK: 내 정보 수정
export async function updateMe(data: UserUpdateRequest): Promise<UserResponse> {
    const response = await apiClient.patch<UserResponse>('/api/users/me', data);
    return response.data;
}

// MARK: 최초 로그인 여부 확인 (gender, age, interests가 모두 없으면 최초 로그인)
export function isFirstLogin(user: UserResponse): boolean {
    return !user.gender || !user.age || !user.interests || user.interests.length === 0;
}


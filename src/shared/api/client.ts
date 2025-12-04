import axios from 'axios';
import { getAccessToken, clearTokens } from '@/features/auth/utils/token';

// MARK: API 기본 설정
// TODO: 환경 변수 등록 필요
const API_BASE_URL = '';

// MARK: Axios 인스턴스 생성
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// MARK: 요청 인터셉터 - 토큰 자동 추가
apiClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// MARK: 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // 401 Unauthorized - 토큰 만료 등
        if (error.response?.status === 401) {
            clearTokens();

            if (typeof window !== 'undefined') {
                const LOGIN_PATH = '/login';
                const currentPath = window.location.pathname;

                if (currentPath !== LOGIN_PATH) {
                    // 세션 만료 정보를 쿼리로 전달 (선택)
                    const url = new URL(LOGIN_PATH, window.location.origin);
                    url.searchParams.set('session', 'expired');
                    window.location.href = url.toString();
                }
            }
        }
        return Promise.reject(error);
    }
);

// MARK: 카카오 로그인 관련 API
import { apiClient } from '@/shared/api/client';
import { saveTokens } from '../utils/token';

// 환경 변수
const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT || 
  (typeof window !== 'undefined' ? `${window.location.origin}/kakao/callback` : '');

// 카카오 인가 URL 생성
export function getKakaoAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: KAKAO_REST_API_KEY || '',
    redirect_uri: KAKAO_REDIRECT_URI,
    response_type: 'code',
  });
  
  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}

// 카카오 로그인 리다이렉트
export function redirectToKakaoLogin(): void {
  const authUrl = getKakaoAuthUrl();
  window.location.href = authUrl;
}

// 카카오 로그인 응답 타입
interface KakaoLoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  isNewUser?: boolean; // 신규 가입 여부
}

// MARK: 카카오 인가 코드로 로그인 요청
// 백엔드에서 인가 코드를 받아 카카오 토큰 교환 후 JWT 발급
export async function loginWithKakao(code: string): Promise<KakaoLoginResponse> {
  const response = await apiClient.post<KakaoLoginResponse>('/api/auth/kakao/callback', {
    code,
    redirectUri: KAKAO_REDIRECT_URI,
  });
  
  const { accessToken, refreshToken } = response.data;
  
  // 토큰 저장
  saveTokens(accessToken, refreshToken);
  
  return response.data;
}


// MARK: 토큰 관리 유틸리티

// 토큰 저장
export function saveTokens(accessToken: string, refreshToken: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }
}

// 액세스 토큰 가져오기
export function getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}

// 리프레시 토큰 가져오기
export function getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('refreshToken');
    }
    return null;
}

// 토큰 삭제 (로그아웃)
export function clearTokens() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}

// 로그인 여부 확인
export function isLoggedIn(): boolean {
    const token = getAccessToken();
    // null, undefined, '', 'null', 'undefined' 모두 false 처리
    return !!token && token !== 'null' && token !== 'undefined';
}


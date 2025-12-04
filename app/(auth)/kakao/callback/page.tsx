'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginWithKakao } from '@/features/auth/api/kakao-auth';
import { getMe, isFirstLogin } from '@/features/auth/api/auth-api';

function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // 사용자가 로그인 취소한 경우
    if (errorParam) {
      console.error('카카오 로그인 취소:', errorDescription);
      router.replace('/login');
      return;
    }

    // 인가 코드가 없는 경우
    if (!code) {
      setError('인가 코드가 없습니다.');
      return;
    }

    // 카카오 로그인 처리
    handleKakaoLogin(code);
  }, [searchParams, router]);

  const handleKakaoLogin = async (code: string) => {
    try {
      const response = await loginWithKakao(code);

      // 신규 사용자인 경우 추가 정보 입력 페이지로
      if (response.isNewUser) {
        router.replace('/first-login');
        return;
      }

      // 기존 사용자 - 최초 로그인 여부 확인
      const user = await getMe();

      if (isFirstLogin(user)) {
        router.replace('/first-login');
      } else {
        router.replace('/home');
      }
    } catch (err: any) {
      console.error('카카오 로그인 실패:', err);

      if (err.response?.status === 400) {
        setError('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
      } else {
        setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  // 에러 발생 시
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-2">
        <p className="text-red-500 text-center mb-4">{error}</p>
        <button
          type="button"
          onClick={() => router.replace('/login')}
          className="text-primary underline"
        >
          로그인 페이지로 돌아가기
        </button>
      </div>
    );
  }

  // 로딩 중
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-600">카카오 로그인 처리 중...</p>
    </div>
  );
}

// 로딩 fallback UI
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-600">로딩 중...</p>
    </div>
  );
}

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <KakaoCallbackContent />
    </Suspense>
  );
}


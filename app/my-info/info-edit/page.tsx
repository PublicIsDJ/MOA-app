'use client'

import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { CloseButton } from '@/shared/ui/close-button';
import { InputBox } from '@/shared/ui/input-box';
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';

export default function InfoEditPage() {
    const { isChecking } = useAuthGuard();

    if (isChecking) return <AuthLoading />;

    return(
        <div className="min-h-screen bg-white">
            <div className="h-6"></div>
            <div className= "w-full grid grid-cols-3 item-center justify-center">
                <h1 className="col-start-2 justify-self-center text-xl font-bold text-gray-900 py-1">내정보 수정</h1>
                <CloseButton children = "닫기" status="default" size={32} className="col-start-3 justify-self-end"/>
            </div>

        <section className="mt-4 flex flex-col items-center">
            <div className="relative">
                <Image src='/taekJun.jpg' alt='프로필 이미지' 
                className='h-32 w-32 rounded-2xl object-cover shadow-sm' width={100} height={24} priority />

                <button
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white shadow grid place-items-center border border-gray-200" aria-label="프로필 사진 변경"
                    >
          {/* 카메라 아이콘 */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="gray-300" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                </svg>
                </button>
            </div>
        </section>
            
        </div>

    )

}
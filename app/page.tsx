'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter();

  // MARK: 타임아웃
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login')}, 2000)
      return () => clearTimeout(timer) // 언마운트 시, 누수 관리
    }, [router]);

  
  return (
    <>
      <div className="bg-[#3E56F6] h-full flex flex-col items-center justify-center gap-3 full-bleed">
        <h1 className="text-white text-[48px] font-[700px]">MOA</h1>
        <p className="whitespace-pre text-center text-white text-[20px] font-[500px]">{'카드로 시작하는\n재미있는 뇌 건강 습관'}</p>
      </div>
    </>
  );
};

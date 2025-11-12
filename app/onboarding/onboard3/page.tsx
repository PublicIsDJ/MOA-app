'use client';


import { Button } from '@/shared/ui/button';

export default function onBoard1() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white px-6 py-10">
      <div className="flex justify-center mt-4 space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">

        <div className="text-5xl mb-6">💫</div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          함께 만드는
          <br />
          건강한 내일을 위해
        </h1>
        
        <p className="text-center text-gray-500 text-base leading-relaxed">
          매일 조금씩 활동하며
          <br />
          더 건강한 습관을 만들어볼까요?
        </p>
      </div>

      {/* 하단 버튼 */}
      <Button status="default" className="py-[12px] mt-[30px]"> 회원가입 </Button> 
      <p className="mt-4 text-xs font-bold text-gray-300 mb-3">
        이미 계정이 있으신가요?<span className="text-gray-900"> 로그인</span>
      </p>
    </div>
  );
}

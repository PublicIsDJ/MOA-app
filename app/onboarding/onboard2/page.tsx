'use client';


import { Button } from '@/shared/ui/button';

export default function onBoard1() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white px-6 py-10">
      <div className="flex justify-center mt-4 space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">

        <div className="text-5xl mb-6">🙌</div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          <span className="text-[#3E56F6]">MOA</span>가
          <br />
          늘 곁에서 도와드릴게요
        </h1>
        
        <p className="text-center text-gray-500 text-base leading-relaxed">
          맞춤형 추천부터 상세한 분석까지
          <br />
          체계적으로 관리해드릴게요
        </p>
      </div>

      {/* 하단 버튼 */}
      <Button status="default" className="py-[12px] mt-[30px]"> 다음으로 </Button> 
    </div>
  );
}

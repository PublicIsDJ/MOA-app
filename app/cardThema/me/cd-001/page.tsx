'use client';


import { Button } from '@/shared/ui/button';

export default function ThemaMe() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white px-6 py-10">
      <h1 className="text-[20px] font-bold text-gray-900 mb-3">나</h1>
      <div className="flex-1 flex flex-col items-center justify-center">

        <div className="text-5xl mb-6">📝</div>

        {/* 제목 */}
        <h1 className="text-xl font-bold text-gray-900 mb-3">만나서 반가워요!</h1>

        {/* 설명 */}
        <p className="text-center text-gray-500 text-base leading-relaxed">
          맞춤형 서비스를 위해
          <br />
          간단한 정보를 입력해 주세요
        </p>
      </div>

      {/* 하단 버튼 */}
      <Button
        status="default"
        className="py-[12px] mt-[30px]"
      >
        다음으로
      </Button> 
    </div>
  );
}

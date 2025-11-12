'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';

export default function FirstLoginPage() {
  const ageRanges = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];
  const genderRanges = ['남자', '여자'];
  const [gender, setGender] = useState<string| null>(null);
  const [age, setAge] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-start justify-between bg-white px-0 py-10">

      <div className="flex self-center justify-center mt-4 space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      <div className="flex-1 max-h-10 flex flex-col justify-center mb-2">
        <h1 className="text-xl font-bold text-gray-900 mb-3">성별과 나이를 알려주세요</h1>

        <p className="text-gray-500 text-base leading-relaxed">
          맞춤형 활동 추천을 위해 활용돼요
        </p>
      </div>

      <div className="w-full ">
        <h1 className="text-base font-bold text-gray-900 mt-6 mb-3">성별</h1>
        <div className="mt-2 flex gap-3">
          {genderRanges.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setGender(label)}
              className={
                gender === label
                  ? 'flex-1 rounded-xl bg-[#3E56F6] py-3 text-center text-sm font-semibold text-white'
                  : 'flex-1 rounded-xl bg-gray-200 py-3 text-center text-sm font-medium text-gray-500 w-32, h-16'
              }
            >
              {label}
            </button>
          ))}
        </div>

        <h1 className="text-base font-bold text-gray-900 mt-6 mb-3">나이</h1>


        <div className="mt-4 grid grid-cols-3 gap-3">
          {ageRanges.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setAge(label)}
              className={
                age === label
                ? 'flex-1 rounded-xl bg-[#3E56F6] py-3 text-center text-sm font-semibold text-white'
                : 'flex-1 rounded-xl bg-gray-200 py-3 text-center text-sm font-medium text-gray-500 w-24, h-12'
              }
                >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <Button status="default" className="py-[12px] mt-[30px]"> 다음으로 </Button>
    </div>
  );
}

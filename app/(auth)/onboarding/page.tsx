"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { redirectToKakaoLogin } from '@/features/auth/api/kakao-auth';
import Image from 'next/image';

// 온보딩 스텝 데이터
const steps = [
  {
    id: "introduction",
    emoji: "🧠",
    title: (
      <>
        <span className="text-[#3E56F6]">MOA</span>와<br />
        시작하는 뇌 건강
      </>
    ),
    description: "매일의 작은 기억들을 모아\n건강한 뇌를 만들어가요",
  },
  {
    id: "support",
    emoji: "🙌",
    title: (
      <>
        <span className="text-[#3E56F6]">MOA</span>가<br />늘 곁에서
        도와드릴게요
      </>
    ),
    description: "맞춤형 추천부터 상세한 분석까지\n체계적으로 관리해드릴게요",
  },
  {
    id: "habits",
    emoji: "💫",
    title: (
      <>
        함께 만드는
        <br />
        건강한 내일을 위해
      </>
    ),
    description: "매일 조금씩 활동하며\n더 건강한 습관을 만들어볼까요?",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  const handleNext = () => {
    if (isLastStep) {
      router.push("/sign-up");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-dvh flex flex-col bg-white px-5 pt-8 pb-8">
      {/* 인디케이터 */}
      <div className="flex justify-center space-x-2">
        {steps.map((stepItem, index) => (
          <div
            key={stepItem.id}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentStep === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-1 flex-col items-center">
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
          <div className="text-5xl mb-6 md:mb-8">{step.emoji}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3 md:text-[28px] md:leading-9">
            {step.title}
          </h1>
          <p className="text-center text-gray-500 text-sm leading-relaxed whitespace-pre-line md:text-base">
            {step.description}
          </p>
        </div>

        {/* 하단 버튼 */}
        <div className="w-full flex flex-col items-center gap-3 mt-8 pb-[env(safe-area-inset-bottom)]">
          <Button
            status="default"
            className="py-[12px] rounded-[12px] max-w-[320px]"
            onClick={handleNext}
          >
            {isLastStep ? "회원가입" : "다음으로"}
          </Button>
          {isLastStep && (
            <div className="w-full flex flex-col items-center gap-3  pb-[env(safe-area-inset-bottom)]">
            <button
                type='button'
                onClick={redirectToKakaoLogin}
                className='w-full max-w-[320px] rounded-[12px] py-[12px] flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#FDD800] transition-colors'
            >
                <div className='relative w-6 h-6'>
                    <Image
                        src='/ic_kakao.svg'
                        alt='카카오 로고'
                        fill
                        className='object-contain'
                    />
                </div>
                <p className='text-[#000000de] font-medium'>카카오로 로그인하기</p>
            </button>
            </div>
          )
          }

          {isLastStep && (
            <button
              type="button"
              onClick={handleLogin}
              className="text-xs font-semibold text-gray-400"
            >
              이미 계정이 있으신가요?
              <span className="text-gray-900 ml-1">로그인</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

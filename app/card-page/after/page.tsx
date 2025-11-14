'use client';


import { Button } from '@/shared/ui/button';
import { AuthHeader } from '@/features/auth/ui/auth-header';

const context = [
    { icon: '✅', text: '완성한 카드', value: '5' },
    { icon: '⏰', text: '소요시간', value: '8분 30초' },
    { icon: '🔥', text: '연속 활동', value: '4일째' },
];

export default function AfterCard() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-white px-6 py-10">

            <AuthHeader title="완료" className="mt-5" />

            <div className="flex-1 flex flex-col items-center justify-center">

                <div className="text-5xl mb-6">🎉</div>

                <h1 className="text-center text-2xl font-bold text-gray-900 mb-3">활동 완료</h1>

                <p className="text-center text-gray-500 text-base leading-relaxed whitespace-pre">
                    {"대단해요! 멋지게 해냈네요"}
                </p>

            </div>
            <div className="space-y-3 w-full mb-10">
                {context.map(({ icon, text, value }) => (
                    <div key={text} className="flex items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3">
                        <span className="text-lg">{icon}</span>
                        <p className="text-sm font-medium text-gray-800">{text}</p>
                        <p className="text-sm font-medium text-left self-start text-[#1C306F] ml-auto">{value}</p>

                    </div>
                ))}
            </div>

            {/* 하단 버튼 */}
            <div className="w-full flex flex-row gap-3">
                <Button
                    status="inactive"
                    className="py-[12px] mt-[30px]"
                    children="공유하기"
                >
                </Button>
                <Button
                    status="default"
                    className="py-[12px] mt-[30px]"
                >
                    다음으로
                </Button>

            </div>

        </div>
    );
}

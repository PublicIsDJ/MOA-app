'use client';

import { Button } from '@/shared/ui/button';
import { BeforeButton } from '@/shared/ui/before-button';
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';

const context = [
    { icon: '📝', text: '편안하게 나의 이야기를 적어주세요' },
    { icon: '🏃‍♂️', text: '기억나지 않는 부분은 건너뛰어도 괜찮아요' },
    { icon: '🐌', text: '내 속도에 맞춰서 자유롭게 적어주세요' },
];

export default function BeforeGuidePage() {
    const { isChecking } = useAuthGuard();

    if (isChecking) return <AuthLoading />;

    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-white px-2 py-10">

            <div className="w-full grid grid-cols-3 flex items-center justify-center">
                <BeforeButton status="default" size={28} className='py-10' />
                <h1 className="text-center text-[20px] font-bold text-gray-900">카드 활동 가이드</h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">

                <div className="text-5xl mb-6">🙌</div>

                <h1 className="text-center text-2xl font-bold text-gray-900 mb-3">
                    <span className="text-[#3E56F6]">MOA</span>와 함께
                    <br />
                    소중한 기억을 기록해볼까요?
                </h1>

            </div>
            <div className="space-y-3 w-full mb-10">
                {context.map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3">
                        <span className="text-lg">{icon}</span>
                        <p className="text-sm font-medium text-gray-800">{text}</p>
                    </div>
                ))}
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

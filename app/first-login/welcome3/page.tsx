'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';

export default function FirstLoginPage() {
    const themes = [
        { title: '기억력 향상', icon: '🧠', desc: '순서 기억, 단어 기억 등' },
        { title: '집중력 훈련', icon: '🎯', desc: '집중 유지, 방해 요소 차단' },
        { title: '언어 능력', icon: '💬', desc: '어휘력·표현력 강화' },
        { title: '수리 능력', icon: '🔢', desc: '연산·논리적 사고' },
    ];


    const [selected, setSelected] = useState(new Set<string>());

    const toggleTheme = (title: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(title) ? next.delete(title) : next.add(title);
            return next;
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-start justify-between bg-white px-0 py-10">

            <div className="flex self-center justify-center mt-4 space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center mt-10 mb-2">
                <h1 className="text-xl font-bold text-gray-900 mb-3">관심 있는 영역을 모두 선택해주세요</h1>
                <p className="text-gray-500 text-base leading-relaxed mb-5">나만의 맞춤형 테마를 추천해드릴게요</p>
            </div>

            <div className="w-full flex flex-col gap-4">
                {themes.map(({ title, icon, desc }) => (
                    <button
                        key={title}
                        type="button"
                        onClick={() => toggleTheme(title)}
                        className={`w-full rounded-2xl px-4 py-5 text-left flex items-start gap-3 border-2 transition-all
                            ${selected.has(title)
                                ? 'border-[#3E56F6] bg-[#3769F114]'
                                : 'border-transparent bg-gray-100'}
                        `}
                    >
                        <p className="text-4xl leading-snug">{icon}</p>
                        <div className="flex flex-col text-left">
                            <p className="text-base font-semibold text-gray-900">{title}</p>
                            <p className="text-sm text-gray-500 mt-1">{desc}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* 하단 버튼 */}
            <Button status="default" className="py-[12px] mt-[30px]"> 다음으로 </Button>
        </div >
    );
}

'use client';

import Link from 'next/link';

const scanTips = [
    'QR코드가 스캔 영역에 정확히 들어오게 해주세요',
    '충분한 조명이 있는 곳에서 스캔해주세요',
    '카메라가 흔들리지 않도록 주의해주세요',
];

export default function QrPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
            <div className="w-full max-w-[430px] flex flex-col flex-1 px-5 pt-6 pb-12">
                <header className="flex items-center justify-between mb-6">
                    <Link href="/home" aria-label="뒤로가기" className="text-[28px] text-gray-700">
                        ‹
                    </Link>
                    <h1 className="text-lg font-semibold">QR인식</h1>
                    <span className="w-6" />
                </header>

                <main className="space-y-8 flex-1">
                    <section className="rounded-[28px] bg-[#F7F7F8] px-6 py-7 shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex flex-col items-center gap-4">
                        <div className="w-full rounded-[24px] bg-white border border-[#EFEFEF] aspect-square grid place-items-center text-[#C8CBD8] text-sm tracking-tight">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-[#C8CBD8] grid place-items-center text-xl">▢</div>
                                <span>QR코드 스캔하기</span>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div>
                            <p className="text-sm font-semibold flex items-center gap-2">
                                <span role="img" aria-label="camera">
                                    📷
                                </span>
                                QR코드 스캔하는 방법
                            </p>
                            <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm text-gray-500">
                                {scanTips.map((tip) => (
                                    <li key={tip}>{tip}</li>
                                ))}
                            </ol>
                        </div>
                        <Link href="/support" className="text-center text-sm text-[#9EA0A8]">
                            QR이 인식되지 않나요?
                        </Link>
                    </section>
                </main>
            </div>
        </div>
    );
}

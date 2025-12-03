'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { InputBox } from '@/shared/ui/input-box';
import { scanQrCode } from '@/features/card/api/card-api';
import type { CardResponse } from '@/features/card/api/types';
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';

const scanTips = [
    '카드의 텍스트가 잘 보이게 촬영해주세요',
    '충분한 조명이 있는 곳에서 촬영해주세요',
    '카메라가 흔들리지 않도록 주의해주세요',
];

export default function QrPage() {
    const { isChecking } = useAuthGuard();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isChecking) return <AuthLoading />;
    const [qrCode, setQrCode] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // MARK: 카메라/갤러리에서 이미지 선택
    const handleImageCapture = () => {
        fileInputRef.current?.click();
    };

    // MARK: 이미지 파일 처리
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        // 이미지 미리보기
        const reader = new FileReader();
        reader.onload = (event) => {
            setCapturedImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);

        // OCR 처리
        await processImageWithOCR(file);
    };

    // MARK: OpenAI Vision API로 OCR 처리
    const processImageWithOCR = async (file: File) => {
        setIsProcessing(true);
        try {
            // 이미지를 base64로 변환
            const base64 = await fileToBase64(file);

            // TODO: OpenAI Vision API 호출해서 QR 코드 추출
            // const response = await fetch('/api/ocr', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ image: base64 }),
            // });
            // const { qrCode } = await response.json();

            // 임시: 2초 후 처리 완료 시뮬레이션
            await new Promise(resolve => setTimeout(resolve, 2000));

            // TODO: OCR로 추출된 QR 코드로 카드 조회
            // await handleCardScan(qrCode);

            console.log('OCR 처리 완료 - base64 길이:', base64.length);

        } catch (err) {
            console.error('OCR 처리 실패:', err);
            setError('이미지 인식에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsProcessing(false);
        }
    };

    // MARK: 파일을 base64로 변환
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    };

    // MARK: QR 스캔 URL에서 cardId 추출
    // "https://publicis-dj-moa.netlify.app/cards/CD-001?v=1" → "CD-001"
    const extractCardIdFromUrl = (qrUrl: string): string => {
        try {
            const url = new URL(qrUrl);
            const pathParts = url.pathname.split('/');
            return pathParts[pathParts.length - 1]; // "CD-001"
        } catch {
            // URL이 아닌 경우 그대로 반환 (직접 입력된 cardId)
            return qrUrl;
        }
    };

    // MARK: QR 코드로 카드 조회 및 라우팅
    const handleCardScan = async (code: string) => {
        setIsProcessing(true);
        setError(null);

        try {
            const card = await scanQrCode(code);
            console.log('카드 조회 성공:', card);

            // 카드 정보를 기반으로 해당 페이지로 이동
            navigateToCard(card);

        } catch (err) {
            console.error('카드 조회 실패:', err);
            setError('카드를 찾을 수 없습니다. 번호를 확인해주세요.');
        } finally {
            setIsProcessing(false);
        }
    };

    // MARK: 카드 정보를 기반으로 해당 페이지로 이동
    const navigateToCard = (card: CardResponse) => {
        // activityType 또는 activityData를 기반으로 라우팅
        // TODO: 실제 API 응답 구조에 맞게 수정 필요
        const { activityType, activityData } = card;

        console.log('카드 라우팅:', { activityType, activityData });

        // 예시: activityType이 "me", "time", "place" 등일 경우
        // activityData에 cardId나 route 정보가 있다고 가정
        const route = (activityData as { route?: string })?.route;

        if (route) {
            router.push(route);
        } else {
            // 기본 라우팅: /{activityType}/cd-001 형태
            router.push(`/${activityType}/cd-001`);
        }
    };

    // MARK: QR 코드 직접 입력 제출
    const handleSubmit = async () => {
        if (!qrCode.trim()) return;

        setIsModalOpen(false);
        // URL 형태든 cardId만 입력하든 모두 처리
        const cardId = extractCardIdFromUrl(qrCode.trim());
        await handleCardScan(cardId);
        setQrCode('');
    };

    // MARK: 다시 촬영
    const handleRetake = () => {
        setCapturedImage(null);
        setError(null);
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
            <div className="w-full max-w-[430px] flex flex-col flex-1 px-5 pt-6 pb-12">
                <header className="flex items-center justify-between mb-6">
                    <Link href="/home" aria-label="뒤로가기" className="text-[28px] text-gray-700">
                        ‹
                    </Link>
                    <h1 className="text-lg font-semibold">카드 스캔</h1>
                    <span className="w-6" />
                </header>

                <main className="flex flex-col gap-8 flex-1">
                    {/* MARK: 카메라/이미지 영역 */}
                    <section className="rounded-[28px] bg-[#F7F7F8] px-6 py-7 shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex flex-col items-center gap-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {capturedImage ? (
                            // 촬영된 이미지 표시
                            <div className="w-full rounded-[24px] overflow-hidden relative aspect-square">
                                <Image
                                    src={capturedImage}
                                    alt="촬영된 카드"
                                    fill
                                    className="object-cover"
                                />
                                {isProcessing && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                            <p className="text-sm">텍스트 인식 중...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // 촬영 버튼
                            <button
                                type="button"
                                onClick={handleImageCapture}
                                className="w-full rounded-[24px] bg-white border border-[#EFEFEF] aspect-square grid place-items-center text-[#C8CBD8] text-sm tracking-tight hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <CameraIcon className="w-16 h-16 text-[#C8CBD8]" />
                                    <span>카드 촬영하기</span>
                                </div>
                            </button>
                        )}

                        {/* 에러 메시지 */}
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        {/* 다시 촬영 버튼 */}
                        {capturedImage && !isProcessing && (
                            <Button
                                status="inactive"
                                onClick={handleRetake}
                                className="py-3 rounded-xl"
                            >
                                다시 촬영
                            </Button>
                        )}
                    </section>

                    <section className="flex-1 flex flex-col justify-between">
                        <div>
                            <p className="text-sm font-semibold flex items-center gap-2">
                                <CameraIcon className="w-4 h-4" />
                                카드 스캔하는 방법
                            </p>
                            <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm text-gray-500">
                                {scanTips.map((tip) => (
                                    <li key={tip}>{tip}</li>
                                ))}
                            </ol>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="text-center text-sm text-[#9EA0A8] underline underline-offset-2"
                        >
                            카드가 인식되지 않나요?
                        </button>
                    </section>
                </main>
            </div>

            {/* MARK: QR 번호 입력 바텀시트 */}
            {isModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 pb-10 animate-slide-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">카드 번호 직접 입력</h2>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 text-2xl"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            카드 하단에 있는 번호를 입력해주세요
                        </p>
                        <InputBox
                            value={qrCode}
                            onChange={(e) => setQrCode(e.target.value)}
                            placeholder="예: CD-001"
                            className="py-4 mb-6"
                        />
                        <Button
                            status={qrCode.trim() ? 'default' : 'inactive'}
                            onClick={handleSubmit}
                            className="py-4"
                        >
                            확인
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

// MARK: 카메라 아이콘
function CameraIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    );
}

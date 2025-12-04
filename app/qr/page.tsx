'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { InputBox } from '@/shared/ui/input-box';
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';

// MARK: 카드 ID → 실제 라우트 매핑
const CARD_ROUTES: Record<string, string> = {
    'CD-001': '/me/cd-001',
    'CD-002': '/me/cd-002',
    'CD-003': '/me/cd-003',
    'CD-004': '/me/cd-004',
    'CD-005': '/me/cd-005',
    'CD-006': '/time/cd-006',
    'CD-007': '/time/cd-007',
    'CD-008': '/time/cd-008',
    'CD-009': '/time/cd-009',
    'CD-010': '/time/cd-010',
    'CD-011': '/place/cd-011',
    'CD-012': '/place/cd-012',
    'CD-013': '/place/cd-013',
    'CD-014': '/place/cd-014',
    'CD-015': '/place/cd-015',
};

export default function QrPage() {
    const { isChecking } = useAuthGuard();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [scanResult, setScanResult] = useState<string | null>(null);
    const scannerRef = useRef<HTMLDivElement>(null);
    const html5QrCodeRef = useRef<any>(null);

    // MARK: QR 스캔 URL에서 cardId 추출
    const extractCardIdFromUrl = (qrUrl: string): string => {
        try {
            const url = new URL(qrUrl);
            const pathParts = url.pathname.split('/');
            return pathParts[pathParts.length - 1].toUpperCase();
        } catch {
            return qrUrl.toUpperCase();
        }
    };

    // MARK: 카드 페이지로 이동
    const navigateToCard = (cardId: string) => {
        const route = CARD_ROUTES[cardId];
        if (route) {
            setIsNavigating(true);
            router.push(route);
        } else {
            setIsNavigating(false);
            setScanResult(null);
            setError(`알 수 없는 카드: ${cardId}`);
            // 에러 시 스캐너 다시 시작
            startScanner();
        }
    };

    // MARK: QR 스캔 성공 처리
    const onScanSuccess = async (decodedText: string) => {
        // 중복 스캔 방지
        if (scanResult || isNavigating) return;

        setScanResult(decodedText);
        setIsNavigating(true);
        setError(null);

        // 스캐너 정지
        if (html5QrCodeRef.current) {
            try {
                await html5QrCodeRef.current.stop();
                setIsScanning(false);
            } catch (e) {
                console.log('Scanner already stopped');
            }
        }

        // 카드 ID 추출 후 이동
        const cardId = extractCardIdFromUrl(decodedText);
        navigateToCard(cardId);
    };

    // MARK: QR 스캐너 시작
    const startScanner = async () => {
        if (!scannerRef.current || isNavigating) return;

        try {
            const { Html5Qrcode } = await import('html5-qrcode');

            // 기존 스캐너 정리
            if (html5QrCodeRef.current) {
                try {
                    await html5QrCodeRef.current.stop();
                } catch (e) {}
            }

            html5QrCodeRef.current = new Html5Qrcode('qr-reader', { verbose: false });

            await html5QrCodeRef.current.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: undefined }, // qrbox 제거 - 전체 화면 스캔
                onScanSuccess,
                () => {}
            );

            setIsScanning(true);
            setError(null);
        } catch (err: any) {
            console.error('카메라 시작 실패:', err);
            setError('카메라를 사용할 수 없습니다. 카메라 권한을 확인해주세요.');
        }
    };

    // MARK: QR 스캐너 정지
    const stopScanner = async () => {
        if (html5QrCodeRef.current) {
            try {
                await html5QrCodeRef.current.stop();
            } catch (e) {}
        }
        setIsScanning(false);
    };

    // MARK: 컴포넌트 마운트 시 자동 시작
    useEffect(() => {
        if (!isChecking && !isNavigating) {
            startScanner();
        }
        return () => {
            stopScanner();
        };
    }, [isChecking]);

    // MARK: 직접 입력 제출
    const handleSubmit = () => {
        if (!qrCode.trim()) return;
        setIsModalOpen(false);
        setIsNavigating(true);
        const cardId = extractCardIdFromUrl(qrCode.trim());
        navigateToCard(cardId);
        setQrCode('');
    };

    if (isChecking) return <AuthLoading />;

    return (
        <div className="fixed inset-0 bg-black text-white full-bleed">
            {/* MARK: 카메라 영역 (전체 화면) */}
            <div
                id="qr-reader"
                ref={scannerRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* MARK: 로딩 오버레이 (QR 인식 후) */}
            {isNavigating && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />
                    <p className="text-white text-lg font-medium">카드 페이지로 이동 중...</p>
                </div>
            )}

            {/* MARK: 헤더 */}
            <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 py-4 pt-12 z-20 bg-gradient-to-b from-black/60 to-transparent">
                <Link href="/home" aria-label="뒤로가기" className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white text-2xl">
                    ‹
                </Link>
                <h1 className="text-lg font-semibold">QR 스캔</h1>
                <span className="w-10" />
            </header>

            {/* MARK: 스캔 가이드 (중앙) */}
            {isScanning && !isNavigating && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    {/* 어두운 배경 마스크 */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* 투명한 스캔 영역 */}
                    <div className="relative w-64 h-64">
                        {/* 스캔 영역 (투명하게 뚫림) */}
                        <div className="absolute inset-0 bg-black/50" style={{
                            boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                        }} />
                        <div className="absolute inset-0 bg-transparent border-2 border-white/30 rounded-2xl" />

                        {/* 코너 강조 */}
                        <div className="absolute -top-0.5 -left-0.5 w-10 h-10 border-t-4 border-l-4 border-[#4E73FF] rounded-tl-2xl" />
                        <div className="absolute -top-0.5 -right-0.5 w-10 h-10 border-t-4 border-r-4 border-[#4E73FF] rounded-tr-2xl" />
                        <div className="absolute -bottom-0.5 -left-0.5 w-10 h-10 border-b-4 border-l-4 border-[#4E73FF] rounded-bl-2xl" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-10 h-10 border-b-4 border-r-4 border-[#4E73FF] rounded-br-2xl" />
                    </div>
                </div>
            )}

            {/* MARK: 하단 안내 */}
            {!isNavigating && (
                <div className="absolute bottom-0 left-0 right-0 px-2 pb-10 pt-16 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                    {error ? (
                        <p className="text-red-400 text-center mb-4">{error}</p>
                    ) : (
                        <p className="text-center text-white/80 mb-4">
                            {isScanning ? 'QR 코드를 프레임 안에 맞춰주세요' : '카메라를 시작하는 중...'}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3 text-center text-sm text-white/60 underline underline-offset-2"
                    >
                        QR 코드가 인식되지 않나요? 직접 입력
                    </button>
                </div>
            )}

            {/* MARK: QR 번호 입력 바텀시트 */}
            {isModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-3xl z-50 p-6 pb-10 animate-slide-up">
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

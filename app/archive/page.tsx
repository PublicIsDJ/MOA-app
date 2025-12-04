'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { BottomNavigation } from "@/shared/ui/bottom-nav";
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { AuthLoading } from '@/shared/ui/auth-loading';
import { getMyActivities, type ActivityResponse } from '@/features/activity';
import { getCard, type CardResponse } from '@/features/card';
import { FAVORITE_PLACE } from '@/features/cardThema/place/constants/favorite';
import { MY_TRAVEL } from '@/features/cardThema/place/constants/travle';
import { ISLAND } from '@/features/cardThema/place/constants/island';
import { MY_LAST } from '@/features/cardThema/place/constants/my-last';
import { TIME_SEASON } from '@/features/cardThema/time/constant/season';
import { TIME_FRIEND_WITH } from '@/features/cardThema/time/constant/friend';
import { TIME_STAGE } from '@/features/cardThema/time/constant/stage';
import { MY_FEATURES as ME_SOUND_FEATURES } from '@/features/cardThema/me/constants/sound';

// MARK: 활동 + 카드 정보 타입
interface ActivityWithCard extends ActivityResponse {
    card: CardResponse | undefined;
}

// MARK: 라벨 포맷팅 (camelCase → 한글)
const LABEL_MAP: Record<string, string> = {
    // 공통
    name: '이름',
    title: '제목',
    content: '내용',
    description: '설명',
    memo: '메모',
    date: '날짜',
    time: '시간',
    place: '장소',

    // cd-001: 내가 태어난 날
    birthday: '생일',
    birthYear: '태어난 해',
    birthSeason: '태어난 계절',
    babyDream: '나의 태몽',
   zodiac: '나의 띠',

    // cd-002: 나의 이름
    nameMeaning: '이름의 의미',
    nameGiver: '이름을 지어준 사람',
    nickname: '별명',
    nicknameGiver: '별명을 지어준 사람',

    // cd-003: 나의 기질
    nature: '자연',
    personal: '동물',
    color: '색상',
    object: '일상소품',

    // cd-004: 나의 입맛
    yesterdayFood: '어제 먹은 음식',
    tomorrowFood: '내일 먹을 음식',

    // cd-005: 나의 소리
    voice: '목소리 톤',
    general: '일상의 소리',

    // cd-011: 내가 좋아하는 공간
    home: '집에서 좋아하는 장소',
    outside: '밖에서 좋아하는 장소',
    myPlace: '나만의 장소',
    reason: '좋아하는 이유',

    // cd-012: 나의 여행지
    travelStyle: '여행 스타일',
    bestTrip: '최고의 여행지',
    worstTrip: '최악의 여행지',

    // cd-013: 나만의 영화관
    lifeMovies: '인생 영화 세 편',
    cryMovie: '가장 많이 울었던 영화',
    ownMovie: '소장하고 싶은 영화',
    musicMovie: '음악이 좋았던 영화',
    bestScene: '최고의 명장면',

    // cd-014: 무인도에 간다면
    withWho: '함께 있고 싶은 존재',
    mostMiss: '가장 그리울 것',

    // cd-015: 나의 마지막
    lastMeal: '마지막 식사',
    lastPlace: '마지막으로 있고 싶은 곳',
    lastPerson: '마지막을 함께할 사람',
    funeral: '장례 방식',
    funeralCustom: '장례식 메모',
    organDonation: '장기 기증 여부',

    // cd-006: 좋아하는 계절
    season: '좋아하는 계절',
    taste: '좋아하는 계절의 맛',

    // cd-007: 나의 몸
    scar: '나의 흉터',
    scarStory: '흉터에 담긴 이야기',

    // cd-008: 나의 리듬
    bigChange: '가장 큰 변화가 있던 시기',
    bigChangeSub: '그때의 이야기',
    strongEcho: '가장 강한 울림이 있던 시기',
    strongEchoSub: '그때의 기억',

    // cd-009: 나의 지인
    oldest: '가장 오래된 지인',
    recent: '가장 최근에 만난 지인',
    petOwner: '반려동물을 키우는 지인',
    liveAlone: '혼자 살고 있는 지인',
    boughtMeFood: '나에게 밥을 사준 지인',
    iBoughtFood: '내가 밥을 사준 지인',
    wantToDo: '지인과 하고 싶은 것',
    doWith: '지인과 하고 싶은 것',

    // cd-010: 나의 무대
    myTalent: '나의 재능',
    wantNow: '지금 하고 싶은 것',
};

const mapOptions = <T extends { icon: string }>(
    options: T[],
    getName: (item: T) => string,
): { icon: string; name: string }[] =>
    options.map((item) => ({
        icon: item.icon,
        name: getName(item),
    }));

// MARK: 인덱스 → 실제 값 변환 (선택형 필드용)
const GLOBAL_INDEX_VALUE_MAP: Record<string, { icon: string; name: string }[]> = {
    // cd-003: 나의 기질 (fallback)
    nature: [
        { icon: '🔥', name: '불 (열정적, 급함)' },
        { icon: '💧', name: '물 (유연함, 온화함)' },
        { icon: '🍃', name: '바람 (자유로움, 변덕스러움)' },
        { icon: '🪨', name: '돌 (묵직함, 신중함)' },
    ],
    personal: [
        { icon: '🐇', name: '토끼 (수줍음, 민감함)' },
        { icon: '🐅', name: '호랑이 (용감, 리더십)' },
        { icon: '🐢', name: '거북이 (느긋함, 신중함)' },
        { icon: '🦜', name: '새 (자유로움, 호기심)' },
    ],
    color: [
        { icon: '🔴', name: '빨강 (강렬, 활발)' },
        { icon: '🔵', name: '파랑 (차분, 이성)' },
        { icon: '🟡', name: '노랑 (명랑, 유쾌)' },
        { icon: '🟢', name: '초록 (평화, 조화)' },
    ],
    object: [
        { icon: '📚', name: '책 (사색형)' },
        { icon: '👟', name: '신발 (활동형)' },
        { icon: '🕯', name: '촛불 (따뜻함, 감성)' },
        { icon: '⏰️', name: '시계 (계획적, 철저함)' },
    ],
    // cd-005: 나의 소리 (fallback)
    voice: mapOptions(ME_SOUND_FEATURES.voice, (item) => item.name),
    general: mapOptions(ME_SOUND_FEATURES.general, (item) => item.name),
    // place 테마
    home: mapOptions(FAVORITE_PLACE.home, (item) => item.title),
    outside: mapOptions(FAVORITE_PLACE.outside, (item) => item.title),
    travelStyle: mapOptions(MY_TRAVEL, (item) => item.name),
    withWho: mapOptions(ISLAND.withWho, (item) => item.name),
    mostMiss: mapOptions(ISLAND.mostMiss, (item) => item.name),
    funeral: mapOptions(MY_LAST.funeral, (item) => item.name),
    organDonation: mapOptions(MY_LAST.organDonatino, (item) => item.name),
    // time 테마
    season: mapOptions(TIME_SEASON.season, (item) => item.title),
    taste: mapOptions(TIME_SEASON.taste, (item) => item.title),
    wantToDo: mapOptions(TIME_FRIEND_WITH, (item) => item.title),
    doWith: mapOptions(TIME_FRIEND_WITH, (item) => item.title),
    myTalent: mapOptions(TIME_STAGE.talent, (item) => item.name),
    wantNow: mapOptions(TIME_STAGE.talent, (item) => item.name),
};

const CARD_INDEX_VALUE_MAP: Record<string, Record<string, { icon: string; name: string }[]>> = {
    'CD-003': {
        nature: GLOBAL_INDEX_VALUE_MAP.nature,
        personal: GLOBAL_INDEX_VALUE_MAP.personal,
        color: GLOBAL_INDEX_VALUE_MAP.color,
        object: GLOBAL_INDEX_VALUE_MAP.object,
    },
    'CD-005': {
        voice: GLOBAL_INDEX_VALUE_MAP.voice,
        nature: mapOptions(ME_SOUND_FEATURES.nature, (item) => item.name),
        general: GLOBAL_INDEX_VALUE_MAP.general,
    },
    'CD-011': {
        home: GLOBAL_INDEX_VALUE_MAP.home,
        outside: GLOBAL_INDEX_VALUE_MAP.outside,
    },
    'CD-012': {
        travelStyle: GLOBAL_INDEX_VALUE_MAP.travelStyle,
    },
    'CD-014': {
        object: mapOptions(ISLAND.object, (item) =>
            item.description ? `${item.name} (${item.description})` : item.name
        ),
        withWho: GLOBAL_INDEX_VALUE_MAP.withWho,
        mostMiss: GLOBAL_INDEX_VALUE_MAP.mostMiss,
    },
    'CD-015': {
        funeral: GLOBAL_INDEX_VALUE_MAP.funeral,
        organDonation: GLOBAL_INDEX_VALUE_MAP.organDonation,
    },
    'CD-006': {
        season: GLOBAL_INDEX_VALUE_MAP.season,
        taste: GLOBAL_INDEX_VALUE_MAP.taste,
    },
    'CD-009': {
        wantToDo: GLOBAL_INDEX_VALUE_MAP.wantToDo,
        doWith: GLOBAL_INDEX_VALUE_MAP.doWith,
    },
    'CD-010': {
        myTalent: GLOBAL_INDEX_VALUE_MAP.myTalent,
        wantNow: GLOBAL_INDEX_VALUE_MAP.wantNow,
    },
};

const CARD_LABEL_OVERRIDE_MAP: Record<string, Record<string, string>> = {
    'CD-005': {
        nature: '자연의 소리',
        general: '일상의 소리',
    },
    'CD-014': {
        object: '가져갈 물건',
    },
};

function formatLabel(key: string, cardCode?: string): string {
    if (cardCode && CARD_LABEL_OVERRIDE_MAP[cardCode]?.[key]) {
        return CARD_LABEL_OVERRIDE_MAP[cardCode][key];
    }
    if (LABEL_MAP[key]) return LABEL_MAP[key];
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}

function formatValue(key: string, value: unknown, cardCode?: string): string {
    // null 또는 undefined
    if (value === null || value === undefined) return '-';

    const cardOptions = cardCode ? CARD_INDEX_VALUE_MAP[cardCode]?.[key] : undefined;
    const options = cardOptions ?? GLOBAL_INDEX_VALUE_MAP[key];

    if (Array.isArray(value)) {
        if (value.length === 0) return '-';
        if (options) {
            const mapped = value
                .map((index) => (typeof index === 'number' ? options[index] : undefined))
                .filter((item): item is { icon: string; name: string } => Boolean(item))
                .map((item) => `${item.icon} ${item.name}`);
            if (mapped.length > 0) return mapped.join(', ');
        }
        return value.map((item) => String(item)).join(', ');
    }

    // 숫자(인덱스)인 경우 매핑 확인
    if (typeof value === 'number') {
        if (options) {
            const item = options[value];
            if (item) return `${item.icon} ${item.name}`;
        }
        return String(value);
    }

    if (typeof value === 'string') {
        return value.trim() === '' ? '-' : value;
    }

    return String(value);
}

export default function ArchivePage() {
    const { isChecking } = useAuthGuard();
    const [activities, setActivities] = useState<ActivityWithCard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    // 터치 스와이프
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await getMyActivities({ limit: 100 });
                const activitiesWithCards: ActivityWithCard[] = await Promise.all(
                    response.items.map(async (activity): Promise<ActivityWithCard> => {
                        try {
                            const card = await getCard(activity.cardId);
                            return { ...activity, card };
                        } catch {
                            return { ...activity, card: undefined };
                        }
                    })
                );
                setActivities(activitiesWithCards);
            } catch (error) {
                console.error('활동 조회 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchActivities();
    }, []);

    const goTo = (index: number) => {
        if (isAnimating || index === currentIndex) return;
        setIsFlipped(false); // 카드 전환 시 플립 초기화
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 600);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        goTo(currentIndex === 0 ? activities.length - 1 : currentIndex - 1);
    };

    const handleNext = () => {
        if (isAnimating) return;
        goTo(currentIndex === activities.length - 1 ? 0 : currentIndex + 1);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;

        // 스와이프: 50px 이상 이동
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext();
            else handlePrev();
        }
    };

    // 카드 위치 계산 (3D 스택 효과)
    const getCardStyle = (index: number) => {
        const diff = index - currentIndex;
        const absDiff = Math.abs(diff);

        if (absDiff > 2) {
            return { opacity: 0, transform: 'scale(0.8) translateX(0)', zIndex: 0 };
        }

        const baseTranslate = diff * 60;
        const scale = 1 - absDiff * 0.12;
        const opacity = 1 - absDiff * 0.4;
        const rotateY = diff * -8;
        const translateZ = -absDiff * 50;

        return {
            opacity,
            transform: `perspective(1000px) translateX(${baseTranslate}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
            zIndex: 10 - absDiff,
        };
    };

    if (isChecking) return <AuthLoading />;

    return (
        <div className="min-h-screen flex flex-col bg-[#EDEDED] full-bleed pb-[88px]">
            <div className="w-full max-w-[430px] mx-auto flex flex-col flex-1">
                <header className="px-2 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">나의 활동 기록</h1>
                    <p className="text-gray-500 mt-1">완료한 카드 미션을 확인해보세요</p>
                </header>

                <main className="flex-1 px-2">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4E73FF]" />
                        </div>
                    ) : activities.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-6xl mb-4">📭</p>
                            <p className="text-gray-500">아직 완료한 활동이 없어요</p>
                            <p className="text-gray-400 text-sm mt-1">카드 미션을 시작해보세요!</p>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* MARK: 3D 카드 스택 */}
                            <div
                                className="relative h-[380px] flex items-center justify-center overflow-visible"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                {activities.map((activity, index) => {
                                    const style = getCardStyle(index);
                                    const isCurrent = index === currentIndex;
                                    const shouldFlip = isCurrent && isFlipped;

                                    return (
                                        <div
                                            key={activity.id}
                                            className="absolute transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
                                            style={{
                                                ...style,
                                                transitionDuration: '600ms',
                                                perspective: '1000px',
                                            }}
                                            onClick={() => isCurrent ? setIsFlipped(!isFlipped) : goTo(index)}
                                        >
                                            {/* 플립 컨테이너 */}
                                            <div
                                                className="relative transition-transform duration-700 ease-out"
                                                style={{
                                                    transformStyle: 'preserve-3d',
                                                    transform: shouldFlip ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                }}
                                            >
                                                {/* 앞면: 카드 이미지 */}
                                                <div
                                                    className="relative"
                                                    style={{ backfaceVisibility: 'hidden' }}
                                                >
                                                    <div className="relative bg-white rounded-2xl p-3 shadow-xl">
                                                        {activity.card?.thumbnailUrl ? (
                                                            <Image
                                                                src={activity.card.thumbnailUrl}
                                                                alt={activity.card.title || '카드'}
                                                                width={160}
                                                                height={220}
                                                                className="rounded-xl"
                                                            />
                                                        ) : (
                                                            <div className="w-[160px] h-[220px] rounded-xl bg-gradient-to-br from-[#4E73FF]/10 via-[#6B4EFF]/5 to-[#4E8FFF]/10 flex items-center justify-center text-5xl">
                                                                📄
                                                            </div>
                                                        )}
                                                        {/* 탭 힌트 */}
                                                        {isCurrent && !isFlipped && (
                                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 bg-white/80 px-1.5 py-[2px] rounded-full">
                                                                탭하여 내용 보기
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* 뒷면: 활동 내용 */}
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        backfaceVisibility: 'hidden',
                                                        transform: 'rotateY(180deg)',
                                                    }}
                                                >
                                                    <div className="w-[186px] h-[246px] bg-gradient-to-br from-[#4E73FF] to-[#6B4EFF] rounded-2xl p-4 shadow-xl overflow-hidden">
                                                        <div className="h-full flex flex-col">
                                                            <h5 className="text-white font-bold text-sm mb-3 truncate">
                                                                {activity.card?.title || '활동 내용'}
                                                            </h5>
                                                            <div className="flex-1 overflow-y-auto space-y-2 text-xs scrollbar-hide">
                                                                {activity.activityResult && typeof activity.activityResult === 'object' ? (
                                                                    Object.entries(activity.activityResult).map(([key, value]) => (
                                                                        <div key={key} className="bg-white/20 rounded-lg p-2">
                                                                            <p className="text-white/70 text-[10px] uppercase tracking-wide">
                                                                                {formatLabel(key, activity.card?.qrCode)}
                                                                            </p>
                                                                            <p className="text-white font-medium mt-0.5 break-words">
                                                                                {formatValue(key, value, activity.card?.qrCode)}
                                                                            </p>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <p className="text-white/80">내용이 없습니다</p>
                                                                )}
                                                            </div>
                                                            <p className="text-white/60 text-[9px] mt-2 text-center">
                                                                탭하여 돌아가기
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* MARK: 카드 정보 (페이드 인) */}
                            <div className="text-center mt-4 h-[80px]">
                                {activities.map((activity, index) => (
                                    <div
                                        key={`info-${activity.id}`}
                                        className={`absolute left-0 right-0 transition-all duration-500 ${
                                            index === currentIndex
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-0 translate-y-4 pointer-events-none'
                                        }`}
                                    >
                                        <h4 className="font-bold text-xl text-gray-900">
                                            {activity.card?.title || '카드 제목'}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(activity.completedAt).toLocaleDateString('ko-KR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* MARK: 네비게이션 */}
                            {activities.length > 1 && (
                                <div className="flex items-center justify-center gap-6 mt-6">
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 hover:bg-[#4E73FF] group"
                                    >
                                        <ChevronIcon className="w-5 h-5 text-gray-600 rotate-90 group-hover:text-white transition-colors" />
                                    </button>

                                    {/* 인디케이터 */}
                                    <div className="flex gap-2">
                                        {activities.map((activity, index) => (
                                            <button
                                                type="button"
                                                key={activity.id}
                                                onClick={() => goTo(index)}
                                                className={`rounded-full transition-all duration-500 ${
                                                    index === currentIndex
                                                        ? 'bg-[#4E73FF] w-8 h-3'
                                                        : 'bg-gray-300 w-3 h-3 hover:bg-[#4E73FF]/50'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 hover:bg-[#4E73FF] group"
                                    >
                                        <ChevronIcon className="w-5 h-5 text-gray-600 -rotate-90 group-hover:text-white transition-colors" />
                                    </button>
                                </div>
                            )}

                            {/* 카운트 */}
                            <p className="text-center text-sm text-gray-400 mt-4">
                                {currentIndex + 1} / {activities.length}
                            </p>
                        </div>
                    )}
                </main>
            </div>
            <BottomNavigation className="max-w-[430px] mx-auto w-full" />
        </div>
    );
}

function ChevronIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );
}

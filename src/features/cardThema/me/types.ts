// MARK: Me 테마 카드별 데이터 타입 정의

// cd-001: 내가 태어난 날
export interface BirthData {
    [key: string]: string;      // 인덱스 시그니처
    birthday: string;           // 생일
    birthYear: string;          // 태어난 해 (그 해의 사건)
    birthSeason: string;        // 태어난 계절
    babyDream: string;          // 나의 태몽
    zodiac: string;             // 나의 띠
}

// cd-002: 나의 이름
export interface NameData {
    [key: string]: string;      // 인덱스 시그니처
    name: string;               // 나의 이름
    nameMeaning: string;        // 이름이 가진 의미
    nameGiver: string;          // 이름을 지어준 사람
    nickname: string;           // 내가 좋아하는 별명
    nicknameGiver: string;      // 별명을 지어준 사람
}

// cd-003: 나의 기질
export interface FeatureData {
    nature: number | null;      // 자연 (0-3)
    personal: number | null;    // 동물 (0-3)
    color: number | null;       // 색상 (0-3)
    object: number | null;      // 일상소품 (0-3)
}

// cd-004: 나의 입맛
export interface TasteData {
    yesterdayFood: string;      // 어제 먹었던 음식
    tomorrowFood: string;       // 내일 먹을 음식
}

// cd-005: 나의 소리
export interface SoundData {
    voice: number | null;       // 목소리 톤 (0-3)
    nature: number | null;      // 자연의 소리 (0-8)
    general: number | null;     // 일상의 소리 (0-2)
}

// Me 테마 전체 데이터 통합
export interface MeThemeData {
    birth?: BirthData;
    name?: NameData;
    feature?: FeatureData;
    taste?: TasteData;
    sound?: SoundData;
}

// 초기값 정의
export const initialBirthData: BirthData = {
    birthday: '',
    birthYear: '',
    birthSeason: '',
    babyDream: '',
    zodiac: '',
};

export const initialNameData: NameData = {
    name: '',
    nameMeaning: '',
    nameGiver: '',
    nickname: '',
    nicknameGiver: '',
};

export const initialFeatureData: FeatureData = {
    nature: null,
    personal: null,
    color: null,
    object: null,
};

export const initialTasteData: TasteData = {
    yesterdayFood: '',
    tomorrowFood: '',
};

export const initialSoundData: SoundData = {
    voice: null,
    nature: null,
    general: null,
};


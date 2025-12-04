// MARK: Time 테마 카드별 데이터 타입 정의

// cd-006: 좋아하는 계절
export interface SeasonData {
    season: number | null;      // 계절 (0-3)
    taste: number | null;       // 맛 (0-14)
}

// cd-007: 나의 몸
export interface BodyData {
    [key: string]: string;
    scar: string;               // 흉터, 수술자국
    scarStory: string;          // 흉터 이야기
}

// cd-008: 나의 리듬
export interface RythmData {
    [key: string]: string;
    bigChange: string;          // 가장 큰 변화 시기
    bigChangeSub: string;       // 변화 상세
    strongEcho: string;         // 가장 강한 울림
    strongEchoSub: string;      // 울림 상세
}

// cd-009: 나의 지인
export interface FriendData {
    [key: string]: string | number | null;
    oldest: string;             // 가장 오래된 사람
    recent: string;             // 가장 최근에 만난 사람
    petOwner: string;           // 반려동물을 키우는 지인
    liveAlone: string;          // 혼자 사는 지인
    boughtMeFood: string;       // 밥을 사준 사람
    iBoughtFood: string;        // 내가 밥을 사준 사람
    doWith: number | null;      // 함께하고 싶은 것 (0-11)
}

// cd-010: 나의 무대
export interface StageData {
    myTalent: number | null;    // 나의 재능 (0-6)
    wantNow: number | null;     // 지금 하고 싶은 것 (0-6)
}

// Time 테마 전체 데이터 통합
export interface TimeThemeData {
    season?: SeasonData;
    body?: BodyData;
    rythm?: RythmData;
    friend?: FriendData;
    stage?: StageData;
}

// 초기값 정의
export const initialSeasonData: SeasonData = {
    season: null,
    taste: null,
};

export const initialBodyData: BodyData = {
    scar: '',
    scarStory: '',
};

export const initialRythmData: RythmData = {
    bigChange: '',
    bigChangeSub: '',
    strongEcho: '',
    strongEchoSub: '',
};

export const initialFriendData: FriendData = {
    oldest: '',
    recent: '',
    petOwner: '',
    liveAlone: '',
    boughtMeFood: '',
    iBoughtFood: '',
    doWith: null,
};

export const initialStageData: StageData = {
    myTalent: null,
    wantNow: null,
};


// MARK: Place 테마 카드별 데이터 타입 정의

// cd-011: 내가 좋아하는 공간
export interface FavoriteData {
    [key: string]: string | number | null;
    home: number | null;        // 집에서 좋아하는 장소 (0-3)
    outside: number | null;     // 밖에서 좋아하는 장소 (0-4)
    myPlace: string;            // 좋아하는 나만의 장소
    reason: string;             // 그 이유
}

// cd-012: 나의 여행지
export interface TravelData {
    [key: string]: string | number[];
    travelStyle: number[];      // 여행 스타일 (다중선택)
    bestTrip: string;           // 최고의 여행지
    worstTrip: string;          // 최악의 여행지
}

// cd-013: 나만의 영화관
export interface MovieData {
    [key: string]: string;
    lifeMovies: string;         // 인생 영화 세 편
    cryMovie: string;           // 가장 많이 울었던 영화
    ownMovie: string;           // 소장하고 싶은 영화
    musicMovie: string;         // 음악이 좋았던 영화
    bestScene: string;          // 최고의 명장면
}

// cd-014: 무인도에 간다면
export interface IslandData {
    object: number | null;      // 가져갈 물건 (0-2)
    withWho: number | null;     // 함께할 사람 (0-3)
    mostMiss: number | null;    // 가장 그리울 것 (0-2)
}

// cd-015: 나의 마지막
export interface MyLastData {
    [key: string]: string | number | null;
    lastPlace: string;          // 마지막 날 있고 싶은 곳
    lastPerson: string;         // 마지막을 함께할 사람
    reborn: string;             // 다시 태어난다면
    funeral: number | null;     // 장례 방식 (0-2)
    organDonation: number | null; // 장기 기증 (0-1)
}

// Place 테마 전체 데이터 통합
export interface PlaceThemeData {
    favorite?: FavoriteData;
    travel?: TravelData;
    movie?: MovieData;
    island?: IslandData;
    myLast?: MyLastData;
}

// 초기값 정의
export const initialFavoriteData: FavoriteData = {
    home: null,
    outside: null,
    myPlace: '',
    reason: '',
};

export const initialTravelData: TravelData = {
    travelStyle: [],
    bestTrip: '',
    worstTrip: '',
};

export const initialMovieData: MovieData = {
    lifeMovies: '',
    cryMovie: '',
    ownMovie: '',
    musicMovie: '',
    bestScene: '',
};

export const initialIslandData: IslandData = {
    object: null,
    withWho: null,
    mostMiss: null,
};

export const initialMyLastData: MyLastData = {
    lastPlace: '',
    lastPerson: '',
    reborn: '',
    funeral: null,
    organDonation: null,
};


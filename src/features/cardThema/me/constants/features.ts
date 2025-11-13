const MY_FEATURES_NATURE = [
    { icon: '🔥', title: '불', description: '열정적, 급함' },
    { icon: '💧', title: '물', description: '유연함, 온화함' },
    { icon: '🍃', title: '바람', description: '자유로움, 변덕스러움' },
    { icon: '🪨', title: '돌', description: '묵직함, 신중함' },
];

const MY_FEATURES_PERSONAL = [
    { icon: '🐇', title: '토끼', description: '수줍음, 민감함' },
    { icon: '🐅', title: '호랑이', description: '용감, 리더십' },
    { icon: '🐢', title: '거북이', description: '느긋함, 신중함' },
    { icon: '🦜', title: '새', description: '자유로움, 호기심' },
];

const MY_FEATURES_COLOR = [
    { icon: '🔴', title: '빨강', description: '강렬, 활발' },
    { icon: '🔵', title: '파랑', description: '차분, 이성' },
    { icon: '🟡', title: '노랑', description: '명랑, 유쾌' },
    { icon: '🟢', title: '초록', description: '평화, 조화' },
];

const MY_FEATURES_OBJECT = [
    { icon: '📚', title: '책', description: '사색형' },
    { icon: '👟', title: '신발', description: '활동형' },
    { icon: '🕯', title: '촛불', description: '따뜻함, 감성' },
    { icon: '⏰️', title: '시계', description: '계획적, 철저함' },
];

// MARK: 통합 export
export const MY_FEATURES = {
    nature: MY_FEATURES_NATURE,
    personal: MY_FEATURES_PERSONAL,
    color: MY_FEATURES_COLOR,
    object: MY_FEATURES_OBJECT,
};

// MARK: 개별 export (하위 호환성)
export { MY_FEATURES_NATURE, MY_FEATURES_PERSONAL, MY_FEATURES_COLOR, MY_FEATURES_OBJECT };
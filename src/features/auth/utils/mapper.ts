// MARK: 프론트엔드 ↔ 백엔드 타입 변환

import { gender, age, features } from '@/types';
import { GenderType, AgeType, InterestType } from '../api/types';

// MARK: 성별 변환 (프론트 → 백엔드)
export function mapGenderToBackend(gender: gender | null): GenderType | undefined {
    if (!gender) return undefined;

    const mapping: Record<gender, GenderType> = {
        'MALE': 'male',
        'FEMALE': 'female',
    };

    return mapping[gender];
}

// MARK: 연령대 변환 (프론트 → 백엔드)
export function mapAgeToBackend(age: age | null): AgeType | undefined {
    if (!age) return undefined;
    return age as AgeType; // 동일한 값 사용
}

// MARK: 관심사 변환 (프론트 → 백엔드) - 배열
export function mapFeaturesToBackend(features: features[]): InterestType[] {
    if (features.length === 0) return [];

    const mapping: Record<features, InterestType> = {
        '기억력 향상': 'memory_improvement',
        '집중력 훈련': 'concentration_training',
        '언어 능력': 'language_ability',
        '수리 능력': 'math_ability',
    };

    return features.map(f => mapping[f]);
}

// MARK: 성별 변환 (백엔드 → 프론트)
export function mapGenderToFrontend(gender?: GenderType | null): gender | null {
    if (!gender) return null;

    const mapping: Record<GenderType, gender | null> = {
        'male': 'MALE',
        'female': 'FEMALE',
        'other': null,
    };

    return mapping[gender];
}

// MARK: 연령대 변환 (백엔드 → 프론트)
export function mapAgeToFrontend(age?: AgeType | null): age | null {
    if (!age) return null;
    return age as age; // 동일한 값 사용
}

// MARK: 관심사 변환 (백엔드 → 프론트) - 배열
export function mapInterestsToFrontend(interests?: InterestType[] | null): features[] {
    if (!interests || interests.length === 0) return [];

    const mapping: Record<InterestType, features> = {
        'memory_improvement': '기억력 향상',
        'concentration_training': '집중력 훈련',
        'language_ability': '언어 능력',
        'math_ability': '수리 능력',
    };

    return interests.map(i => mapping[i]);
}


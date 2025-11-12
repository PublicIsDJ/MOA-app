// MARK: 프론트엔드 ↔ 백엔드 타입 변환

import { gender, features } from '@/types';
import { GenderType, InterestType } from '../api/types';

// MARK: 성별 변환 (프론트 → 백엔드)
export function mapGenderToBackend(gender: gender | null): GenderType | undefined {
    if (!gender) return undefined;
    
    const mapping: Record<gender, GenderType> = {
        'MALE': 'male',
        'FEMALE': 'female',
    };
    
    return mapping[gender];
}

// MARK: 관심사 변환 (프론트 → 백엔드)
export function mapFeaturesToBackend(features: features[]): InterestType | undefined {
    if (features.length === 0) return undefined;
    
    // 첫 번째 선택한 관심사만 전송 (백엔드는 단일 값만 받음)
    const firstFeature = features[0];
    
    const mapping: Record<features, InterestType> = {
        '기억력 향상': 'memory_improvement',
        '집중력 훈련': 'concentration_training',
        '언어 능력': 'language_ability',
        '수리 능력': 'math_ability',
    };
    
    return mapping[firstFeature];
}

// MARK: 성별 변환 (백엔드 → 프론트)
export function mapGenderToFrontend(gender?: GenderType): gender | null {
    if (!gender) return null;
    
    const mapping: Record<GenderType, gender | null> = {
        'male': 'MALE',
        'female': 'FEMALE',
        'other': null,
    };
    
    return mapping[gender];
}

// MARK: 관심사 변환 (백엔드 → 프론트)
export function mapInterestToFrontend(interest?: InterestType): features[] {
    if (!interest) return [];
    
    const mapping: Record<InterestType, features> = {
        'memory_improvement': '기억력 향상',
        'concentration_training': '집중력 훈련',
        'language_ability': '언어 능력',
        'math_ability': '수리 능력',
    };
    
    return [mapping[interest]];
}


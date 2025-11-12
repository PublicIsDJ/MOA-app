import { gender, age, features } from '@/types';

// MARK: 로그인 폼
export interface LoginFormState {
    userId: string;
    password: string;
}

// MARK: 첫 로그인 폼
export interface FirstLoginFormState {
    gender: gender | null;
    age: age | null;
    features: features[];
}

// MARK:  로그인 폼 초기화
export const InitialLoginForm: LoginFormState =  {
    userId: '',
    password: '',
}

// MARK:  최초 로그인 폼 초기화
export const InitialFirstLogin: FirstLoginFormState = {
    gender: null,
    age: null,
    features: [],
}

// TODO: api 필드 변환 및 역변환
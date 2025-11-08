export interface LoginFormState {
    userId: string;
    password: string;
}

export const InitialLoginForm: LoginFormState =  {
    userId: '',
    password: '',
}

// TODO: api 필드 변환 및 역변환
export interface SignUpFormState {
    userName: string;
    userId: string;
    phoneNumber: string;
    password: string;
    passwordConfirm: string;
}

export const InitialSignUpForm: SignUpFormState = {
    userName: '',
    userId: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: ''
}
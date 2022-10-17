export interface IUserReg {
    email: string;
    password: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUser {
    email: string;
    id: number;
    is_active: boolean;
    registration_date: string;
    subscribe: boolean;
    sub_expiration: string;
    role: string;
}

export interface UserState {
    access_token: string;
    refresh_token: string;
    user: IUser;
}

export interface IValidation {
    isEmpty?: boolean;
    minLenght?: number;
    maxLenght?: number;
    isEmail?: boolean;
    isPassword?: boolean;
    confirmPassword?: string;
}
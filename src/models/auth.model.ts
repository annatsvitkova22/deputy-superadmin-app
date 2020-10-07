import { Information } from './appeal.model';

export interface CreateDeputyModel {
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    role?: string;
    password?: string;
    fullName?: string;
    rating?: number;
    party?: Information;
    district?: Information;
}

export interface AuthUser {
    userId?: string;
    role: string;
    name?: string;
    email: string;
    imageUrl: string;
    shortName: string;
}

export interface AuthState {
    isAuth: boolean;
    user: AuthUser;
}

export interface CreateUser {
    email: string;
    password: string;
    name: string;
}

export interface ResultModel {
    status: boolean;
    message?: string;
}

export interface ChangeEmail {
    userId: string;
    oldUserEmail: string;
    newUserEmail: string;
}

export interface UserAvatal {
    imageUrl: string;
    shortName: string;
}

export interface User {
    id?: string;
    name: string;
    surname?: string;
    patronymic?: string;
    password?: string;
    email: string;
    role: string;
    isDesabled?: boolean;
    fullName?: string;
    district?: string;
    party?: string;
}

export interface ChangePassword {
    oldPassword: string;
    password: string;
    repeatPassword: string;
}

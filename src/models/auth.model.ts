export interface CreateDeputyModel {
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    role?: string;
    password?: string;
    fullName?: string;
    rating?: number;
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

export interface UserAvatal {
    imageUrl: string;
    shortName: string;
}
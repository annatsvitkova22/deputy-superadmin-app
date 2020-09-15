export interface CreateDeputyModel {
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    role?: string;
    password?: string;
    fullName?: string;
}

export interface AuthUser {
    userId: string;
    role: string;
    email: string;
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

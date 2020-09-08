export interface CreateDeputyModel {
    name: string;
    email: string;
    role: string;
    password: string;
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

enum Role {
    DIRECTOR,
    ADMIN,
    MANAGER,
    USER,
}

export interface User {
    id: number;
    username: string;
    password?: string;
    email: string;
    role: Role;
    refresh_token?: string;
    createdAt?: string;
}

export interface registerForm {
    username: string;
    password: string;
    email: string;
    role: Role;
}

export interface loginForm {
    username: string;
    password: string;
}

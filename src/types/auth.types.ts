// ¿Qué enviamos al backend para hacer login?
export interface LoginRequest {
    email: string;
    password: string;
}

// ¿Qué nos responde el backend cuando el login es exitoso?
export interface LoginResponse {
    access_token: string;
}

// ¿Qué enviamos al backend para registrar un usuario?
export interface RegisterRequest {
    name: string;
    lastname: string;
    dni: string;
    email: string;
    password: string;
    direction: string;
}

export interface RegisterResponse {
    user: User;
}

// ¿Cómo representamos al usuario en el frontend?
export interface User {
    _id: string;
    name: string;
    lastname: string;
    dni: string;
    email: string;
    direction: string;
    account_type: 'normal' | 'premium' | 'admin';
}

export interface habit {
    _id: string;
    name: string;
    description: string;
    frequency: "daily" | "weekly";
    objective: string;
    category: string;
}
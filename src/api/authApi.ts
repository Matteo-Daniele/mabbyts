import type { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth.types";

const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // ↑ Le decimos al backend que el body es JSON.
            //   Sin esto, el backend no puede leer los datos.
        },
        body: JSON.stringify(credentials),
        // ↑ Convertimos el objeto JS a string JSON.
        //   fetch NO acepta objetos directamente en el body.
    });
    // Si el backend respondió con un error (4xx o 5xx)
    if (!response.ok) {
        // Intentamos leer el mensaje de error del backend
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Error al iniciar sesión');
        // ↑ Lanzamos un error que el componente de login puede capturar
    }
    // Si todo salió bien, parseamos la respuesta JSON
    return response.json();
    // ↑ Retorna: { access_token: "eyJhbGci..." }
}

export async function registerUser(userData: RegisterRequest): Promise<void> {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Error al registrarse');
    }
}

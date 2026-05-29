import type { User } from "../types/auth.types";
import { fetchAuth } from "./fetchAuth";

const API_URL = import.meta.env.VITE_API_URL;

export async function getActiveUser(token: string | null): Promise<User> {
    const response = await fetchAuth(`${API_URL}/users/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener el perfil del usuario');
    }

    return response.json();
}
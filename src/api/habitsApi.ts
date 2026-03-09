import type { habit } from "../types/auth.types";

const API_URL = import.meta.env.VITE_API_URL

export async function getHabits() {
    const response = await fetch(`${API_URL}/habits`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener los habitos');
    }

    return response.json();
}

export async function postHabits(habit: habit) {
    const response = await fetch(`${API_URL}/habits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(habit),
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Error al crear habito');
    }
    return response.json()
}

export async function updateHabit(habit: Partial<habit>) {
    const response = await fetch(`${API_URL}/habits/${habit._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(habit),
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Error al actualizar habito');
    }
    return response.json()
}
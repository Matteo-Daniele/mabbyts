import type { habitHistory } from "../types/auth.types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTodayHistory(): Promise<habitHistory[]> {
    const savedToken = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/habit-history/today`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${savedToken}`
        },
    })

    if (!response.ok) {
        throw new Error("Error al traer el historial del día");
    }
    return response.json();
}

export async function toggleHabitHistory(
    habitId: string,
    isCompleted: boolean
): Promise<habitHistory> {

    const savedToken = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/habit-history/today/${habitId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${savedToken}`
        },
        body: JSON.stringify({ isCompleted }),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el habito")
    }

    return response.json();
}
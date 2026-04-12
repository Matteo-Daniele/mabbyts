import type { habitHistory } from "../types/auth.types";
import { getActiveUser } from "./userApi";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTodayHistory(): Promise<habitHistory[]> {
    const savedToken = localStorage.getItem("token");
    const activeUser = await getActiveUser(savedToken);
    const userId = activeUser._id;

    const response = await fetch(`${API_URL}/habit-history/today/${userId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
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
    const activeUser = await getActiveUser(savedToken);
    const userId = activeUser._id;

    const response = await fetch(`${API_URL}/habit-history`, {
        method: "PATH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitId, userId, isCompleted }),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el habito")
    }

    return response.json();
}
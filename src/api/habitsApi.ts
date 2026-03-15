import type { habit } from "../types/auth.types";
import { getActiveUser } from "./userApi";

const API_URL = import.meta.env.VITE_API_URL

export async function getHabits() {
    const savedToken = localStorage.getItem('token');
    const activeUser = await getActiveUser(savedToken);
    const userId = activeUser._id;
    const response = await fetch(`${API_URL}/habits/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener los habitos');
    }
    return response.json()
}



export async function postHabits(habit: any) {
    const savedToken = localStorage.getItem('token');
    const activeUser = await getActiveUser(savedToken);
    const userId = activeUser._id;
    const habitSended = {
        ...habit, userId
    }
    console.log(habitSended);
    const response = await fetch(`${API_URL}/habits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitSended),
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
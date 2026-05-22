import { useEffect, useState } from "react";
import ShowHabits from "../components/ShowHabits";
import Sidebar from "../components/Sidebar";
import type { habit } from "../types/auth.types";
import { Plus, X } from "lucide-react";
import { deleteHabit, getHabits, postHabits, updateHabit } from "../api/habitsApi";
import { useAuth } from "../context/AuthContext";
import { useHabits } from "../context/HabitContext";

const INITIAL_HABIT_STATE = {
    name: "",
    description: "Ej: Meditar todas las mañanas",
    frequency: "daily" as "daily" | "weekly",
    objective: "",
    category: "Salud",
};

export default function HabitPage() {

    const { createHabit } = useHabits();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newHabit, setNewHabit] = useState(INITIAL_HABIT_STATE);

    const handleCreate = async () => {
        await createHabit(newHabit);
        setIsModalOpen(false);
        setNewHabit(INITIAL_HABIT_STATE);
    };
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 ml-48 p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-mabbyts-dark">Tus Hábitos</h1>
                    <button
                        onClick={() => { setIsModalOpen(true); setNewHabit(INITIAL_HABIT_STATE); }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-mabbyts-brown to-mabbyts-dark text-white font-medium rounded-xl shadow-lg shadow-mabbyts-brown/30 hover:scale-105 active:scale-95 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Hábito
                    </button>
                </div>
                <ShowHabits />  {/* Sin props — usa el contexto */}
            </main>
            {/* El modal de crear queda igual que antes... */}
        </div>
    );
}
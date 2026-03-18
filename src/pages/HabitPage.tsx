import { useEffect, useState } from "react";
import ShowHabits from "../components/ShowHabits";
import Sidebar from "../components/Sidebar";
import type { habit } from "../types/auth.types";
import { Plus, X } from "lucide-react";
import { deleteHabit, getHabits, postHabits, updateHabit } from "../api/habitsApi";
import { useAuth } from "../context/AuthContext";

const INITIAL_HABIT_STATE = {
    name: "",
    description: "Ej: Meditar todas las mañanas",
    frequency: "daily" as "daily" | "weekly",
    objective: "",
    category: "Salud",
};

export default function HabitPage() {

    const { token } = useAuth()

    const [habits, setHabits] = useState<habit[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newHabit, setNewHabit] = useState(INITIAL_HABIT_STATE);


    const createHabit = async () => {
        const tempId = Date.now().toString();
        const habitToAdd: habit = {
            _id: tempId,
            ...newHabit
        };
        setHabits((prev) => [...prev, habitToAdd]);
        setIsModalOpen(false);
        setNewHabit(INITIAL_HABIT_STATE);

        try {
            const habitReal = await postHabits(newHabit);
            setHabits((prev) => prev.map((h) => (h._id) == tempId ? habitReal : h));
        } catch (error) {
            setHabits((prev) => prev.filter((h) => h._id !== tempId));
            console.error("error al crear el habito", error)
        }
    }

    const getAllHabits = async () => {
        try {
            const allHabits = await getHabits();
            setHabits(allHabits)
        } catch (error) {
            console.error("error al traer los habitos", error);
        }
    }

    const onDelete = (habito: habit) => {
        setHabits(habits?.filter((h) => h._id !== habito._id));
        deleteHabit(habito._id)
    }

    const onEdit = async (updated: habit) => {
        const previous = habits;
        setHabits((prev) => prev.map((h) => h._id === updated._id ? updated : h));
        try {
            await updateHabit(updated);
        } catch (error) {
            setHabits(previous);
            console.error("error al editar el habito", error);
        }
    }

    useEffect(() => {
        getAllHabits();
    }, [token])

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 ml-48 p-8 overflow-y-auto">
                {/* Header with button */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-mabbyts-dark">Tus Hábitos</h1>
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                            setNewHabit(INITIAL_HABIT_STATE);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-mabbyts-brown to-mabbyts-dark text-white font-medium rounded-xl shadow-lg shadow-mabbyts-brown/30 hover:scale-105 active:scale-95 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Hábito
                    </button>
                </div>

                <ShowHabits habitList={habits} onDelete={onDelete} onEdit={onEdit} />
            </main>

            {/* Create Habit Modal (UI Only) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mabbyts-dark/40 backdrop-blur-sm transition-opacity">
                    <div className="bg-white/95 backdrop-blur-md w-full max-w-md rounded-2xl shadow-2xl border border-mabbyts-cream overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-mabbyts-cream bg-mabbyts-cream/20">
                            <h2 className="text-xl font-bold text-mabbyts-dark">Crear Nuevo Hábito</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-mabbyts-brown hover:text-mabbyts-dark hover:bg-mabbyts-cream/50 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-mabbyts-dark">Nombre del hábito</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Meditar"
                                    onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-mabbyts-dark">Descripción</label>
                                <textarea
                                    placeholder={newHabit.description}
                                    rows={2}
                                    onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-mabbyts-dark">Frecuencia</label>
                                    <select
                                        value={newHabit.frequency}
                                        onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value as "daily" | "weekly" })}
                                        className="w-full px-4 py-2.5 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel appearance-none">
                                        <option value="daily">Diario</option>
                                        <option value="weekly">Semanal</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-mabbyts-dark">Tipo / Categoría</label>
                                    <select
                                        value={newHabit.category}
                                        onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel appearance-none">
                                        <option value="salud">Salud</option>
                                        <option value="productividad">Productividad</option>
                                        <option value="deporte">Deporte</option>
                                        <option value="aprendizaje">Aprendizaje</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-mabbyts-dark">Objetivo (Opcional)</label>
                                <input
                                    value={newHabit.objective}
                                    onChange={(e) => setNewHabit({ ...newHabit, objective: e.target.value })}
                                    type="text"
                                    placeholder="Ej: 10 minutos al día"
                                    className="w-full px-4 py-2.5 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-mabbyts-cream bg-gray-50/50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2.5 text-mabbyts-brown font-medium hover:bg-mabbyts-cream/50 rounded-xl transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={createHabit}
                                className="px-5 py-2.5 bg-mabbyts-caramel hover:bg-mabbyts-brown text-white font-medium rounded-xl shadow-md transition-colors"
                            >
                                Guardar Hábito
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
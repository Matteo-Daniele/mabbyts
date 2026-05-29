import {
    Target,
    CheckCircle2,
    Circle,
    Pencil,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { habit } from "../types/auth.types";
import { EditHabit } from "./EditHabit";
import { useHabits } from "../context/HabitContext";
import ProgressBar from "./ProgressBar";

export default function ShowHabits() {

    const { habits, completados, toggleHabito, onDelete, onEdit } = useHabits()

    const [editingHabit, setEditingHabit] = useState<habit | null>(null);
    const location = useLocation();
    const isHabitsPage = location.pathname === "/habits";

    const handleSave = (updated: habit) => {
        if (onEdit) onEdit(updated);
        setEditingHabit(null);
    }

    const dailyHabits = habits.filter((h) => h.frequency === "daily") || [];
    const weeklyHabits = habits.filter((h) => h.frequency === "weekly") || [];

    const renderHabits = (habit: habit) => {
        const completado = completados.includes(habit._id);
        return (
            <div
                key={habit._id}
                className="flex flex-col"
            >
                {editingHabit?._id === habit._id && (
                    <EditHabit habit={habit} onClose={() => setEditingHabit(null)} onSave={handleSave} />
                )}
                <div
                    onClick={() => toggleHabito(habit._id)}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border border-paper-dark bg-white shadow-xs hover:shadow-sm hover:border-forest/20 transition-all duration-200 cursor-pointer text-left group"
                >
                    {/* Checkbox circular */}
                    <div className="shrink-0 transition-all duration-200">
                        {completado ? (
                            <div className="w-6 h-6 rounded-full bg-forest flex items-center justify-center text-white scale-110 shadow-sm shadow-forest/10">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        ) : (
                            <div className="w-6 h-6 rounded-full border border-charcoal/20 group-hover:border-charcoal/40 transition-colors" />
                        )}
                    </div>

                    {/* Info del hábito */}
                    <div className="flex-1 min-w-0">
                        <p
                            className={`font-bold text-sm md:text-base transition-all ${completado ? "opacity-50 line-through text-charcoal" : "text-charcoal"
                                }`}
                        >
                            {habit.name}
                        </p>
                        {habit.objective && (
                            <p
                                className={`text-xs mt-1 font-medium transition-all ${completado ? "opacity-40 text-charcoal-light" : "text-charcoal-light"
                                    }`}
                            >
                                {habit.objective}
                            </p>
                        )}
                        {habit.description && (
                            <p
                                className={`text-xs mt-1 transition-all ${completado ? "opacity-30 text-charcoal-light" : "text-charcoal-light/75"
                                    }`}
                            >
                                {habit.description}
                            </p>
                        )}
                    </div>

                    {/* Badge de completado */}
                    {completado && (
                        <span className="text-xs font-semibold text-forest bg-forest/10 px-3 py-1 rounded-full shrink-0">
                            ¡Hecho!
                        </span>
                    )}

                    {isHabitsPage && (
                        <div className="flex items-center gap-1 shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setEditingHabit(habit)}
                                className="p-2 text-charcoal-light/50 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => onDelete(habit)}
                                className="p-2 text-charcoal-light/50 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            {/* ── Barra de progreso del día ── */}
            <ProgressBar />
            <div className="mb-8">

                {dailyHabits.length > 0 && (
                    <h3 className="text-xl font-bold font-serif text-forest-dark mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-forest" />
                        Hábitos del día
                    </h3>
                )}

                <div className="space-y-3">
                    {dailyHabits.map(renderHabits)}
                </div>

                {weeklyHabits.length > 0 && (
                    <h3 className="text-xl font-bold font-serif text-forest-dark mb-4 mt-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-forest" />
                        Hábitos de la semana
                    </h3>
                )}

                <div className="space-y-3">
                    {weeklyHabits.map(renderHabits)}
                </div>

                {/* Mensaje amigable si no hay ningún hábito creado */}
                {(!habits || habits.length === 0) && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-paper-dark">
                        <p className="text-charcoal-light/70 font-medium">No tenés hábitos creados aún.</p>
                        <p className="text-charcoal-light/40 text-sm mt-1">¡Hacé clic en "Nuevo Hábito" para empezar!</p>
                    </div>
                )}
            </div>
        </>
    );
}
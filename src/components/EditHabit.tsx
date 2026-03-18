import { useState } from "react";
import { X } from "lucide-react";
import type { habit } from "../types/auth.types";

interface EditHabitProps {
    habit: habit;
    onClose: () => void;
    onSave: (updated: habit) => void;
}

export function EditHabit({ habit, onClose, onSave }: EditHabitProps) {
    const [editedHabit, setEditedHabit] = useState<habit>({ ...habit });

    const handleChange = (field: keyof Omit<habit, "_id">, value: string) => {
        setEditedHabit((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSave(editedHabit);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mabbyts-dark/40 backdrop-blur-sm transition-opacity">
            <div className="bg-white/95 backdrop-blur-md w-full max-w-md rounded-2xl shadow-2xl border border-mabbyts-cream overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-mabbyts-cream bg-mabbyts-cream/20">
                    <h2 className="text-xl font-bold text-mabbyts-dark">Editar Hábito</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-mabbyts-brown cursor-pointer hover:text-mabbyts-dark hover:bg-mabbyts-cream/50 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label htmlFor="edit-habit-name" className="block text-sm font-medium text-mabbyts-dark">Nombre del hábito</label>
                        <input
                            id="edit-habit-name"
                            type="text"
                            value={editedHabit.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Ej: Meditar"
                            className="w-full px-4 py-2.5 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="edit-habit-description" className="block text-sm font-medium text-mabbyts-dark">Descripción</label>
                        <textarea
                            id="edit-habit-description"
                            value={editedHabit.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Ej: Meditar todas las mañanas"
                            rows={2}
                            className="w-full px-4 py-2.5 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label htmlFor="edit-habit-frequency" className="block text-sm font-medium text-mabbyts-dark">Frecuencia</label>
                            <select
                                id="edit-habit-frequency"
                                value={editedHabit.frequency}
                                onChange={(e) => handleChange("frequency", e.target.value)}
                                className="w-full px-4 py-2.5 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel appearance-none"
                            >
                                <option value="daily">Diario</option>
                                <option value="weekly">Semanal</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="edit-habit-category" className="block text-sm font-medium text-mabbyts-dark">Tipo / Categoría</label>
                            <select
                                id="edit-habit-category"
                                value={editedHabit.category}
                                onChange={(e) => handleChange("category", e.target.value)}
                                className="w-full px-4 py-2.5 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel appearance-none"
                            >
                                <option value="salud">Salud</option>
                                <option value="productividad">Productividad</option>
                                <option value="deporte">Deporte</option>
                                <option value="aprendizaje">Aprendizaje</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="edit-habit-objective" className="block text-sm font-medium text-mabbyts-dark">Objetivo (Opcional)</label>
                        <input
                            id="edit-habit-objective"
                            type="text"
                            value={editedHabit.objective}
                            onChange={(e) => handleChange("objective", e.target.value)}
                            placeholder="Ej: 10 minutos al día"
                            className="w-full px-4 py-2.5 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel"
                        />
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-mabbyts-cream bg-gray-50/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-mabbyts-brown font-medium cursor-pointer hover:bg-mabbyts-cream/50 rounded-xl transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2.5 bg-mabbyts-caramel hover:bg-mabbyts-brown text-white font-medium rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}
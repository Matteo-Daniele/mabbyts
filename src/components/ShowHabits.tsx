import {
    Target,
    Sun,
    Dumbbell,
    BookOpen,
    Droplets,
    PenLine,
    CheckCircle2,
    Circle,
    TrendingUp,
} from "lucide-react";
import { useState } from "react";
import type { habit } from "../types/auth.types";

const HABITOS_DEL_DIA = [
    { id: 1, nombre: "Meditar 10 minutos", icono: Sun, categoria: "Bienestar" },
    { id: 2, nombre: "Ejercicio 30 minutos", icono: Dumbbell, categoria: "Salud" },
    { id: 3, nombre: "Leer 20 páginas", icono: BookOpen, categoria: "Aprendizaje" },
    { id: 4, nombre: "Tomar 2L de agua", icono: Droplets, categoria: "Salud" },
    { id: 5, nombre: "Escribir en el diario", icono: PenLine, categoria: "Bienestar" },
];

export default function ShowHabits({ habitList }: { habitList?: habit[] }) {
    const [completados, setCompletados] = useState<string[]>([]);

    const habitos = habitList;

    const toggleHabito = (id: string) => {
        setCompletados((prev) =>
            prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
        );
    };

    const progreso = habitos?.length ? Math.round((completados.length / habitos.length) * 100) : 0;

    return (
        <>
            {/* ── Barra de progreso del día ── */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-mabbyts-tan/20 p-6 mb-8 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-mabbyts-caramel" />
                        <span className="text-sm font-semibold text-mabbyts-dark">
                            Progreso del día
                        </span>
                    </div>
                    <span className="text-sm font-bold text-mabbyts-caramel">
                        {completados.length}/{habitos?.length} completados
                    </span>
                </div>
                <div className="w-full h-3 bg-mabbyts-cream rounded-full overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-mabbyts-caramel to-mabbyts-tan rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progreso}%` }}
                    />
                </div>
            </div>
            <div className="mb-8">
                <h3 className="text-lg font-bold text-mabbyts-dark mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-mabbyts-caramel" />
                    Hábitos del día
                </h3>

                <div className="space-y-3">
                    {habitos?.map((habito) => {
                        const completado = completados.includes(habito._id);
                        return (
                            <button
                                key={habito._id}
                                onClick={() => toggleHabito(habito._id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${completado
                                    ? "bg-mabbyts-cream/60 border-mabbyts-tan/30 shadow-none"
                                    : "bg-white/80 border-mabbyts-tan/20 shadow-sm hover:shadow-md hover:border-mabbyts-tan/40"
                                    }`}
                            >
                                {/* Ícono del check */}
                                <div
                                    className={`shrink-0 transition-all duration-300 ${completado ? "text-mabbyts-caramel scale-110" : "text-mabbyts-tan/40"
                                        }`}
                                >
                                    {completado ? (
                                        <CheckCircle2 className="w-6 h-6" />
                                    ) : (
                                        <Circle className="w-6 h-6" />
                                    )}
                                </div>

                                {/* Info del hábito */}
                                <div className="flex-1 min-w-0">
                                    <p
                                        className={`font-medium transition-all duration-300 ${completado
                                            ? "text-mabbyts-brown/40 line-through"
                                            : "text-mabbyts-dark"
                                            }`}
                                    >
                                        {habito.name}
                                    </p>
                                    <p
                                        className={`text-xs mt-0.5 transition-all duration-300 ${completado
                                            ? "text-mabbyts-brown/25"
                                            : "text-mabbyts-brown/50"
                                            }`}
                                    >
                                        {habito.description}
                                    </p>
                                </div>

                                {/* Badge de completado */}
                                {completado && (
                                    <span className="text-xs font-semibold text-mabbyts-caramel bg-mabbyts-caramel/10 px-3 py-1 rounded-full">
                                        ¡Hecho!
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

        </>
    )
}
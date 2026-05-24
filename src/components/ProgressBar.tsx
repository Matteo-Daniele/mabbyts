import { useHabits } from "../context/HabitContext"
import { TrendingUp } from "lucide-react";

export default function ProgressBar() {
    const { completados, progreso, habits } = useHabits();

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-mabbyts-tan/20 p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-mabbyts-caramel" />
                    <span className="text-sm font-semibold text-mabbyts-dark">
                        Progreso del día
                    </span>
                </div>
                <span className="text-sm font-bold text-mabbyts-caramel">
                    {completados.length}/{habits?.length} completados
                </span>
            </div>
            <div className="w-full h-3 bg-mabbyts-cream rounded-full overflow-hidden">
                <div
                    className="h-full bg-linear-to-r from-mabbyts-caramel to-mabbyts-tan rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progreso}%` }}
                />
            </div>
        </div>
    )
}
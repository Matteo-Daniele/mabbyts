import { useHabits } from "../context/HabitContext"
import {
    Flame
} from "lucide-react"

function CircularProgress({ value }: { value: number }) {
    const r = 40;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - value / 100);
    return (
        <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
            {/* Track */}
            <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
            {/* Progress arc */}
            <circle
                cx="50" cy="50" r={r}
                fill="none"
                stroke="#E07A5F"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)' }}
            />
            {/* Texto del porcentaje */}
            <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
                fill="white" fontSize="18" fontWeight="700" className="font-serif">
                {value}%
            </text>
        </svg>
    );
}

export default function ProgressBar() {
    const { completados, progreso, habits } = useHabits();
    return (
        <div className="bg-forest rounded-3xl p-6 md:p-7 relative overflow-hidden shadow-lg shadow-forest/10">
            {/* Círculos decorativos */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative flex items-center justify-between gap-4">
                <div className="flex-1">
                    <h2 className="text-white text-xl md:text-2xl font-bold leading-tight font-serif">Tu progreso de hoy</h2>
                    <p className="text-white/60 text-sm mt-1">
                        Has completado <span className="text-white font-semibold">{completados.length}</span> de <span className="text-white font-semibold">{habits.length}</span> hábitos
                    </p>
                    {/* Badge racha */}
                    <div className="mt-4 inline-flex items-center gap-1.5 bg-forest-dark/30 rounded-full px-3.5 py-1.5 border border-white/10">
                        <Flame className="w-3.5 h-3.5 text-coral fill-coral" />
                        <span className="text-white text-xs font-semibold">12 días de racha</span>
                    </div>
                </div>
                <CircularProgress value={progreso} />
            </div>
        </div>
    )
}
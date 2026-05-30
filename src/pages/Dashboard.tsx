import { useState, useEffect, useRef } from "react";
import {
    Flame, Trophy, Target, Calendar,
    Heart, Dumbbell, BookOpen, Briefcase, Sparkles, Droplets, Footprints, PenLine,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useHabits } from "../context/HabitContext";
import type { habit } from "../types/auth.types";
import ShowHabits from "../components/ShowHabits";

// ── Mapa categoría → icono ──────────────────────────────────────────
const CATEGORY_ICONS: Record<string, React.ElementType> = {
    'Salud': Heart,
    'Deporte': Dumbbell,
    'Aprendizaje': BookOpen,
    'Productividad': Briefcase,
    'Hidratación': Droplets,
    'Pasos': Footprints,
    'Diario': PenLine,
};

const getIcon = (habit: habit): React.ElementType =>
    CATEGORY_ICONS[habit.category] ?? Sparkles;

// ── Días de la semana para el gráfico ──────────────────────────────
const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const PLACEHOLDER_BARS = [65, 80, 55, 90, 40, 70, 50];

// ── Progreso circular SVG ───────────────────────────────────────────




// ═══════════════════════════════════════════════════════════════════
export function Dashboard() {

    // ── Splash transition ──────────────────────────────────────────
    const justLoggedIn = useRef(sessionStorage.getItem('justLoggedIn') === 'true');
    const [showSplash, setShowSplash] = useState(justLoggedIn.current);
    const [splashRevealing, setSplashRevealing] = useState(false);

    useEffect(() => {
        if (!justLoggedIn.current) return;
        sessionStorage.removeItem('justLoggedIn');
        const revealTimer = setTimeout(() => setSplashRevealing(true), 1000);
        const removeTimer = setTimeout(() => setShowSplash(false), 2200);
        return () => { clearTimeout(revealTimer); clearTimeout(removeTimer); };
    }, []);

    const { habits, completados, progreso, streak } = useHabits();
    const recentDone = habits.filter(h => completados.includes(h._id)).slice(0, 4);

    // Día actual para resaltar en el gráfico (0=Dom → convertimos a Lun-first)
    const today = new Date().getDay();
    const todayIdx = today === 0 ? 6 : today - 1;

    return (
        <>
            {/* ══ SPLASH ══════════════════════════════════════════════ */}
            {showSplash && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #FAF8F4 0%, #FDFBF7 30%, #EEF4F0 60%, #FAF8F4 100%)',
                        clipPath: splashRevealing ? 'circle(0% at 50% 50%)' : 'circle(100% at 50% 50%)',
                        transition: splashRevealing ? 'clip-path 1.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                    }}
                >
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="absolute rounded-full" style={{
                            width: `${6 + (i % 3) * 4}px`, height: `${6 + (i % 3) * 4}px`,
                            background: `rgba(45, 90, 61, ${0.2 + (i % 4) * 0.1})`,
                            left: `${12 + i * 11}%`, top: `${30 + (i % 3) * 20}%`,
                            animation: `splash-particle-float ${2 + (i % 3) * 0.5}s ease-in-out ${i * 0.2}s infinite`,
                        }} />
                    ))}
                    <div className="relative flex flex-col items-center">
                        <div className="absolute w-72 h-72 rounded-full border border-forest/20"
                            style={{ top: '50%', left: '50%', animation: 'splash-ring-spin 8s linear infinite' }}>
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-forest/40" />
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-forest-light/50" />
                        </div>
                        <div className="absolute w-56 h-56 rounded-full border border-dashed border-forest/15"
                            style={{ top: '50%', left: '50%', animation: 'splash-ring-spin-reverse 6s linear infinite' }}>
                            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-forest/50" />
                        </div>
                        <div className="absolute w-44 h-44 rounded-full" style={{
                            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            background: 'radial-gradient(circle, rgba(45, 90, 61, 0.15) 0%, transparent 70%)',
                            animation: 'splash-glow-pulse 2s ease-in-out infinite',
                        }} />
                        <div className="relative overflow-hidden rounded-3xl" style={{ animation: 'splash-logo-float 2s ease-in-out infinite' }}>
                            <div className="absolute inset-0 z-20" style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                animation: 'splash-shimmer 2s ease-in-out infinite',
                            }} />
                        </div>
                        <p className="text-charcoal-light text-sm font-semibold uppercase tracking-widest"
                            style={{ animation: 'splash-text-reveal 0.8s ease-out 0.3s both' }}>
                            Cargando...
                        </p>
                    </div>
                </div>
            )}

            {/* ══ LAYOUT PRINCIPAL ════════════════════════════════════ */}
            <div className="flex min-h-screen bg-background">
                <Sidebar />

                <main className="flex-1 p-4 md:p-8 pt-20 pb-24 md:pt-10 md:pb-10 overflow-y-auto">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">

                        {/* ── COLUMNA IZQUIERDA ──────────────────────── */}
                        <div className="space-y-5">
                            <ShowHabits></ShowHabits>
                        </div>

                        {/* ── COLUMNA DERECHA ────────────────────────── */}
                        <div className="space-y-5">

                            {/* Gráfico de actividad semanal */}
                            <div className="bg-white rounded-2xl p-5 border border-paper-dark shadow-sm">
                                <h3 className="text-forest-dark font-serif text-lg font-bold mb-4">Actividad de la semana</h3>
                                <div className="flex items-end justify-between gap-1.5 h-28">
                                    {DAYS.map((day, i) => (
                                        <div key={day} className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end">
                                            <div
                                                className={`w-8 rounded-t-xl transition-all duration-500 ${i === todayIdx ? 'bg-forest' : 'bg-[#A3C1AD]'
                                                    }`}
                                                style={{ height: `${PLACEHOLDER_BARS[i]}%` }}
                                            />
                                            <span className={`text-[10px] font-semibold mt-1 ${i === todayIdx ? 'text-forest font-bold' : 'text-charcoal-light/60'
                                                }`}>
                                                {day}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats 2×2 */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Racha actual */}
                                <div className="bg-white rounded-2xl p-4 border border-paper-dark shadow-sm">
                                    <div className="w-9 h-9 rounded-full bg-[#FDF0EC] flex items-center justify-center mb-2.5">
                                        <Flame className="w-5 h-5 text-coral fill-coral/10" />
                                    </div>
                                    <p className="text-2xl font-bold font-serif text-forest-dark leading-none mt-1">
                                        {streak} {streak === 1 ? 'día' : 'días'}
                                    </p>
                                    <p className="text-charcoal-light/80 text-xs font-semibold mt-1">Racha actual</p>
                                </div>
                                {/* Mejor racha */}
                                <div className="bg-white rounded-2xl p-4 border border-paper-dark shadow-sm">
                                    <div className="w-9 h-9 rounded-full bg-[#FEF3C7] flex items-center justify-center mb-2.5">
                                        <Trophy className="w-5 h-5 text-amber-500 fill-amber-500/10" />
                                    </div>
                                    <p className="text-2xl font-bold font-serif text-forest-dark leading-none mt-1">24 días</p>
                                    <p className="text-charcoal-light/80 text-xs font-semibold mt-1">Mejor racha</p>
                                </div>
                                {/* Tasa completado */}
                                <div className="bg-white rounded-2xl p-4 border border-paper-dark shadow-sm">
                                    <div className="w-9 h-9 rounded-full bg-[#EEF4F0] flex items-center justify-center mb-2.5">
                                        <Target className="w-5 h-5 text-forest fill-forest/10" />
                                    </div>
                                    <p className="text-2xl font-bold font-serif text-forest-dark leading-none mt-1">{progreso}%</p>
                                    <p className="text-charcoal-light/80 text-xs font-semibold mt-1">Tasa completado</p>
                                </div>
                                {/* Total este mes */}
                                <div className="bg-white rounded-2xl p-4 border border-paper-dark shadow-sm">
                                    <div className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-2.5">
                                        <Calendar className="w-5 h-5 text-blue-500 fill-blue-500/10" />
                                    </div>
                                    <p className="text-2xl font-bold font-serif text-forest-dark leading-none mt-1">148</p>
                                    <p className="text-charcoal-light/80 text-xs font-semibold mt-1">Total este mes</p>
                                </div>
                            </div>

                            {/* Completados recientemente */}
                            {recentDone.length > 0 && (
                                <div className="bg-white rounded-2xl p-5 border border-paper-dark shadow-sm">
                                    <h3 className="text-forest-dark font-serif text-lg font-bold mb-5">Completados recientemente</h3>
                                    <div className="relative pl-6 space-y-4">
                                        {/* Línea vertical de la línea de tiempo */}
                                        <div className="absolute left-[10px] top-3 bottom-3 w-[1.5px] bg-paper-dark" />

                                        {recentDone.map((h, i) => (
                                            <div key={h._id} className="relative flex items-center">
                                                {/* Icono de la línea de tiempo */}
                                                <div className="absolute -left-[19px] w-[10px] h-[10px] rounded-full bg-forest border-2 border-white shadow-xs shrink-0" />

                                                {/* Tarjeta del hábito completado */}
                                                <div className="flex-1 bg-paper-light border border-paper-dark/60 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-xs">
                                                    <p className="text-sm font-semibold text-charcoal truncate">{h.name}</p>
                                                    <span className="text-[11px] font-semibold text-charcoal-light/50 shrink-0">Hace {(i + 1) * 2}h</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
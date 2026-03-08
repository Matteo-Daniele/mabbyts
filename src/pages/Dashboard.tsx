import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    LayoutDashboard,
    Target,
    BarChart3,
    Settings,
    LogOut,
    User,
    Sun,
    Dumbbell,
    BookOpen,
    Droplets,
    PenLine,
    ChevronRight,
    Flame,
    CheckCircle2,
    Circle,
    TrendingUp,
} from "lucide-react";

// ── Hábitos hardcodeados ─────────────────────────────────────────
const HABITOS_DEL_DIA = [
    { id: 1, nombre: "Meditar 10 minutos", icono: Sun, categoria: "Bienestar" },
    { id: 2, nombre: "Ejercicio 30 minutos", icono: Dumbbell, categoria: "Salud" },
    { id: 3, nombre: "Leer 20 páginas", icono: BookOpen, categoria: "Aprendizaje" },
    { id: 4, nombre: "Tomar 2L de agua", icono: Droplets, categoria: "Salud" },
    { id: 5, nombre: "Escribir en el diario", icono: PenLine, categoria: "Bienestar" },
];

// ── Navegación del sidebar ───────────────────────────────────────
const NAV_ITEMS = [
    { nombre: "Dashboard", icono: LayoutDashboard, activo: true },
    { nombre: "Hábitos", icono: Target, activo: false },
    { nombre: "Estadísticas", icono: BarChart3, activo: false },
    { nombre: "Configuración", icono: Settings, activo: false },
];

export function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [completados, setCompletados] = useState<number[]>([]);

    // ── Splash transition ────────────────────────────────────────
    const justLoggedIn = useRef(sessionStorage.getItem('justLoggedIn') === 'true');
    const [showSplash, setShowSplash] = useState(justLoggedIn.current);
    const [splashRevealing, setSplashRevealing] = useState(false);

    useEffect(() => {
        if (!justLoggedIn.current) return;
        sessionStorage.removeItem('justLoggedIn');
        // Después de 1s mostrando el logo, empezar la apertura circular
        const revealTimer = setTimeout(() => setSplashRevealing(true), 1000);
        // Después de 2s total, quitar el splash del DOM
        const removeTimer = setTimeout(() => setShowSplash(false), 2200);
        return () => {
            clearTimeout(revealTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const toggleHabito = (id: number) => {
        setCompletados((prev) =>
            prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
        );
    };

    const progreso = Math.round((completados.length / HABITOS_DEL_DIA.length) * 100);

    return (
        <>
            {/* ══════════════════════════════════════════════════════
                SPLASH TRANSITION
            ══════════════════════════════════════════════════════ */}
            {showSplash && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #FDF6E9 0%, #FFFDF8 30%, #F5ECD7 60%, #FDF6E9 100%)',
                        clipPath: splashRevealing
                            ? 'circle(0% at 50% 50%)'
                            : 'circle(100% at 50% 50%)',
                        transition: splashRevealing
                            ? 'clip-path 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                            : 'none',
                    }}
                >
                    {/* Fondo con partículas flotantes */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: `${6 + (i % 3) * 4}px`,
                                height: `${6 + (i % 3) * 4}px`,
                                background: `rgba(201, 168, 108, ${0.2 + (i % 4) * 0.1})`,
                                left: `${12 + i * 11}%`,
                                top: `${30 + (i % 3) * 20}%`,
                                animation: `splash-particle-float ${2 + (i % 3) * 0.5}s ease-in-out ${i * 0.2}s infinite`,
                            }}
                        />
                    ))}

                    {/* Contenedor del logo con anillos */}
                    <div className="relative flex flex-col items-center">
                        {/* Anillo orbital exterior */}
                        <div
                            className="absolute w-72 h-72 rounded-full border border-mabbyts-tan/20"
                            style={{
                                top: '50%',
                                left: '50%',
                                animation: 'splash-ring-spin 8s linear infinite',
                            }}
                        >
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-mabbyts-caramel/40" />
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-mabbyts-tan/50" />
                        </div>

                        {/* Anillo orbital interior (dirección opuesta) */}
                        <div
                            className="absolute w-56 h-56 rounded-full border border-dashed border-mabbyts-caramel/15"
                            style={{
                                top: '50%',
                                left: '50%',
                                animation: 'splash-ring-spin-reverse 6s linear infinite',
                            }}
                        >
                            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-mabbyts-caramel/50" />
                        </div>

                        {/* Glow detrás del logo */}
                        <div
                            className="absolute w-44 h-44 rounded-full"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: 'radial-gradient(circle, rgba(201, 168, 108, 0.15) 0%, transparent 70%)',
                                animation: 'splash-glow-pulse 2s ease-in-out infinite',
                            }}
                        />

                        {/* Logo con shimmer */}
                        <div className="relative overflow-hidden rounded-3xl" style={{ animation: 'splash-logo-float 2s ease-in-out infinite' }}>
                            {/* Shimmer sweep */}
                            <div
                                className="absolute inset-0 z-20"
                                style={{
                                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                    animation: 'splash-shimmer 2s ease-in-out infinite',
                                }}
                            />
                        </div>

                        {/* Texto animado */}
                        <p
                            className="mt-8 text-mabbyts-brown/70 text-sm font-semibold uppercase tracking-widest"
                            style={{
                                animation: 'splash-text-reveal 0.8s ease-out 0.3s both',
                            }}
                        >
                            Cargando...
                        </p>

                        {/* Barra de progreso decorativa */}
                        <div className="mt-4 w-48 h-1 bg-mabbyts-tan/15 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-mabbyts-tan via-mabbyts-caramel to-mabbyts-tan"
                                style={{
                                    animation: 'splash-shimmer 1.5s ease-in-out infinite',
                                    width: '60%',
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="flex min-h-screen bg-background">
                {/* ══════════════════════════════════════════════════════
                SIDEBAR
            ══════════════════════════════════════════════════════ */}
                <aside className="w-48 bg-mabbyts-dark flex flex-col h-screen fixed top-0 left-0 shadow-xl">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mabbyts-caramel to-mabbyts-tan flex items-center justify-center shadow-lg">
                                <Flame className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-lg tracking-tight">Mabbyts</h1>
                                <p className="text-white/40 text-xs">Habit Tracker</p>
                            </div>
                        </div>
                    </div>

                    {/* Navegación */}
                    <nav className="flex-1 p-4 space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.nombre}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${item.activo
                                    ? "bg-white/10 text-white shadow-lg shadow-black/10"
                                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                                    }`}
                            >
                                <item.icono className="w-5 h-5" />
                                <span>{item.nombre}</span>
                                {item.activo && (
                                    <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Perfil + Logout (abajo del sidebar) */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3 px-2 py-2 mb-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-mabbyts-tan to-mabbyts-caramel flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">Usuario</p>
                                <p className="text-white/40 text-xs truncate">usuario@email.com</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 text-sm font-medium cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Cerrar sesión</span>
                        </button>
                    </div>
                </aside>

                {/* ══════════════════════════════════════════════════════
                CONTENIDO PRINCIPAL
            ══════════════════════════════════════════════════════ */}
                <main className="flex-1 ml-48 p-8 overflow-y-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-mabbyts-dark">
                            ¡Buen día! 👋
                        </h2>
                        <p className="text-mabbyts-brown/60 mt-1">
                            Acá están tus hábitos para hoy. ¡Vamos con todo!
                        </p>
                    </div>

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
                                {completados.length}/{HABITOS_DEL_DIA.length} completados
                            </span>
                        </div>
                        <div className="w-full h-3 bg-mabbyts-cream rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-mabbyts-caramel to-mabbyts-tan rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progreso}%` }}
                            />
                        </div>
                    </div>

                    {/* ── Hábitos del día ── */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-mabbyts-dark mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-mabbyts-caramel" />
                            Hábitos del día
                        </h3>

                        <div className="space-y-3">
                            {HABITOS_DEL_DIA.map((habito) => {
                                const completado = completados.includes(habito.id);
                                return (
                                    <button
                                        key={habito.id}
                                        onClick={() => toggleHabito(habito.id)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${completado
                                            ? "bg-mabbyts-cream/60 border-mabbyts-tan/30 shadow-none"
                                            : "bg-white/80 border-mabbyts-tan/20 shadow-sm hover:shadow-md hover:border-mabbyts-tan/40"
                                            }`}
                                    >
                                        {/* Ícono del check */}
                                        <div
                                            className={`flex-shrink-0 transition-all duration-300 ${completado ? "text-mabbyts-caramel scale-110" : "text-mabbyts-tan/40"
                                                }`}
                                        >
                                            {completado ? (
                                                <CheckCircle2 className="w-6 h-6" />
                                            ) : (
                                                <Circle className="w-6 h-6" />
                                            )}
                                        </div>

                                        {/* Ícono del hábito */}
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${completado
                                                ? "bg-mabbyts-caramel/15 text-mabbyts-caramel"
                                                : "bg-mabbyts-cream text-mabbyts-tan"
                                                }`}
                                        >
                                            <habito.icono className="w-5 h-5" />
                                        </div>

                                        {/* Info del hábito */}
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`font-medium transition-all duration-300 ${completado
                                                    ? "text-mabbyts-brown/40 line-through"
                                                    : "text-mabbyts-dark"
                                                    }`}
                                            >
                                                {habito.nombre}
                                            </p>
                                            <p
                                                className={`text-xs mt-0.5 transition-all duration-300 ${completado
                                                    ? "text-mabbyts-brown/25"
                                                    : "text-mabbyts-brown/50"
                                                    }`}
                                            >
                                                {habito.categoria}
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

                    {/* ══════════════════════════════════════════════════
                    ESTADÍSTICAS SEMANALES (placeholder)
                ══════════════════════════════════════════════════ */}
                    <div>
                        <h3 className="text-lg font-bold text-mabbyts-dark mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-mabbyts-caramel" />
                            Estadísticas semanales
                        </h3>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-dashed border-mabbyts-tan/30 p-12 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-mabbyts-cream flex items-center justify-center mb-4">
                                <BarChart3 className="w-8 h-8 text-mabbyts-tan/60" />
                            </div>
                            <p className="text-mabbyts-brown/50 font-medium">
                                Próximamente...
                            </p>
                            <p className="text-mabbyts-brown/30 text-sm mt-1">
                                Acá van a ir tus estadísticas semanales
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
import { useState, useEffect, useRef } from "react";
import {
    BarChart3,
    TrendingUp,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import ShowHabits from "../components/ShowHabits";

// ── Hábitos hardcodeados ────────────────────────────────────────

export function Dashboard() {

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
                                className="h-full rounded-full bg-linear-to-r from-mabbyts-tan via-mabbyts-caramel to-mabbyts-tan"
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
                <Sidebar></Sidebar>
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

                    {/* ── Hábitos del día ── */}

                    <ShowHabits />

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
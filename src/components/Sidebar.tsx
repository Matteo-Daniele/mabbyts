// ── Navegación del sidebar ───────────────────────────────────────
import {
    LayoutDashboard,
    Target,
    BarChart3,
    Settings,
    LogOut,
    User as UserIcon,
    ChevronRight,
    Menu,
    X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
    { nombre: "Dashboard", urlName: "dashboard", icono: LayoutDashboard, activo: true },
    { nombre: "Hábitos", urlName: "habits", icono: Target, activo: false },
    { nombre: "Estadísticas", urlName: "stats", icono: BarChart3, activo: false },
    { nombre: "Configuración", urlName: "config", icono: Settings, activo: false },
];

export default function Sidebar() {
    const { logout, activeUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        NAV_ITEMS.map((it) => {
            if (location.pathname == `/${it.urlName}`) {
                it.activo = true;
            } else {
                it.activo = false;
            }
        })
    }, [])

    const handleNavegation = (item: any) => {
        NAV_ITEMS.map((it) => {
            if (it.nombre == item.nombre) {
                it.activo = true;
            } else {
                it.activo = false;
            }
        })
        setIsOpen(false);
        // Esperamos que termine la animación de cierre (300ms) antes de navegar
        setTimeout(() => {
            navigate(`/${item.urlName}`, { replace: true })
        }, 300);
    }

    return (
        <>
            {/* ── Botón hamburguesa Desktop (flotante, siempre visible) ── */}
            <button
                onClick={() => setIsOpen(true)}
                className={`hidden md:flex fixed top-4 left-4 z-50 items-center justify-center w-10 h-10 rounded-xl bg-forest text-white shadow-lg hover:bg-forest-light transition-all duration-200 cursor-pointer ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                aria-label="Abrir menú"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* ── Backdrop (cierra al hacer click fuera) ── */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/45 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* ── Sidebar Drawer (Desktop + Mobile) ── */}
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-forest flex flex-col z-50 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Header del drawer */}
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shadow-md">
                            <img src="/icon-logon.png" alt="logo" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-base tracking-tight">Mabbyts</h1>
                            <p className="text-white/40 text-xs">Habit Tracker</p>
                        </div>
                    </div>
                    {/* Botón cerrar */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        aria-label="Cerrar menú"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Navegación */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.nombre}
                            onClick={() => handleNavegation(item)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${item.activo
                                ? "bg-white/15 text-white shadow-sm"
                                : "text-white/60 hover:text-white hover:bg-white/8"
                                }`}
                        >
                            <item.icono className="w-5 h-5 shrink-0" />
                            <span>{item.nombre}</span>
                            {item.activo && (
                                <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Perfil + Logout */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-2 py-2 mb-3">
                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <UserIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{activeUser?.name} {activeUser?.lastname}</p>
                            <p className="text-white/40 text-xs truncate">{activeUser?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/15 hover:text-red-200 transition-all duration-200 text-sm font-medium cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>

            {/* ── Top Bar Mobile ── */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-forest z-40 flex items-center justify-between px-4 shadow-md">
                <div className="flex items-center gap-3">
                    {/* Hamburguesa mobile */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Abrir menú"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <img src="/icon-logon.png" alt="logo" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <h1 className="text-white font-bold text-base tracking-tight">Mabbyts</h1>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 border border-white/10">
                    <UserIcon className="w-4 h-4 text-white" />
                </div>
            </div>

            {/* ── Bottom Nav Mobile ── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-forest z-40 flex items-center justify-around px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.15)] pb-safe">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.nombre}
                        onClick={() => handleNavegation(item)}
                        className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${item.activo ? "text-white" : "text-white/50 hover:text-white/80"}`}
                    >
                        <item.icono className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-medium leading-none">{item.nombre}</span>
                    </button>
                ))}
            </nav>
        </>
    )
}
// ── Navegación del sidebar ───────────────────────────────────────
import {
    LayoutDashboard,
    Target,
    BarChart3,
    Settings,
    LogOut,
    User as UserIcon,
    ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
        navigate(`/${item.urlName}`, { replace: true })
        NAV_ITEMS.map((it) => {
            if (it.nombre == item.nombre) {
                it.activo = true;
            } else {
                it.activo = false;
            }
        })
    }
    return (
        <>
            {/* ── Sidebar Desktop ── */}
            <aside className="hidden md:flex w-48 bg-mabbyts-dark flex-col h-screen fixed top-0 left-0 shadow-xl z-40">
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-mabbyts-caramel to-mabbyts-tan flex items-center justify-center shadow-lg">
                            <img src="/icon-logon.png" alt="logo" className="w-full h-full object-cover rounded-xl" />
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
                            onClick={() => {
                                handleNavegation(item)
                            }}
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
                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-mabbyts-tan to-mabbyts-caramel flex items-center justify-center shrink-0">
                            <UserIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{activeUser?.name} {activeUser?.lastname}</p>
                            <p className="text-white/40 text-xs truncate">{activeUser?.email}</p>
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

            {/* ── Top Bar Mobile ── */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-mabbyts-dark z-40 flex items-center justify-between px-4 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-mabbyts-caramel to-mabbyts-tan flex items-center justify-center shadow-md">
                        <img src="/icon-logon.png" alt="logo" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <h1 className="text-white font-bold text-base tracking-tight">Mabbyts</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-mabbyts-tan to-mabbyts-caramel flex items-center justify-center shrink-0 shadow-sm border border-white/10">
                        <UserIcon className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>

            {/* ── Bottom Nav Mobile ── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-mabbyts-dark z-40 flex items-center justify-around px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe">
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
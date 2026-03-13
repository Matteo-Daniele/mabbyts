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
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
    { nombre: "Dashboard", urlName: "dashboard", icono: LayoutDashboard, activo: true },
    { nombre: "Hábitos", urlName: "habits", icono: Target, activo: false },
    { nombre: "Estadísticas", urlName: "dashboard", icono: BarChart3, activo: false },
    { nombre: "Configuración", urlName: "dashboard", icono: Settings, activo: false },
];

export default function Sidebar() {
    const { logout, activeUser } = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

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
        <aside className="w-48 bg-mabbyts-dark flex flex-col h-screen fixed top-0 left-0 shadow-xl">
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
    )
}
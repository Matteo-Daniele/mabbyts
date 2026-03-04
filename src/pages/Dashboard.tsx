import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
                <p className="text-gray-400 mb-6">¡Bienvenido! Estás autenticado.</p>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg
                               transition-colors duration-200 cursor-pointer"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )
}
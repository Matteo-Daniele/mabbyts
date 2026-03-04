import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LoginRequest } from "../types/auth.types";
import { loginUser } from "../api/authApi";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Estado: el token JWT
    const [token, setToken] = useState<string | null>(null);
    // Estado: loading (mientras revisamos si hay token en localStorage)
    const [loading, setLoading] = useState(true);
    // ─── Al montar el componente, revisar si hay un token guardado ───
    useEffect(() => {
        // useEffect se ejecuta UNA VEZ cuando el componente se monta.
        // Acá revisamos si el usuario ya se había logueado antes
        // (su token está guardado en localStorage).
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
        setLoading(false);
        // ↑ Ya terminamos de verificar, dejamos de mostrar "cargando..."
    }, []);
    // ↑ [] = array vacío de dependencias = se ejecuta solo al montar
    // ─── Función de login ───

    const login = async (credentials: LoginRequest) => {
        // 1. Llamamos al backend
        const response = await loginUser(credentials);
        // ↑ Si falla (credenciales incorrectas), loginUser lanza un Error
        //   que el componente LoginPage puede capturar con try/catch
        if (response) {
            // 2. Guardamos el token en el estado de React
            setToken(response.access_token);
            // 3. Guardamos el token en localStorage (para que persista al refrescar)
            localStorage.setItem('token', response.access_token);
        }
    }

    const logout = () => {
        // 1. Limpiamos el estado
        setToken(null);
        // 2. Borramos el token de localStorage
        localStorage.removeItem('token');
    }

    // ─── Proveemos los datos a toda la app ───

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: token !== null,
                // ↑ Si hay token, está autenticado. Simple.
                login,
                logout,
                loading,
            }}
        >
            {children}
            {/* ↑ children = todos los componentes hijos (toda la app) */}
        </AuthContext.Provider>
    )
}

// --------------------------------------------------
// 4. HOOK PERSONALIZADO PARA USAR EL CONTEXTO
// --------------------------------------------------
// En vez de escribir useContext(AuthContext) en cada componente,
// creamos un hook useAuth() que:
// 1. Llama a useContext por vos
// 2. Verifica que estés dentro del Provider (si no, lanza un error claro)

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider')
        // ↑ Esto pasa si alguien usa useAuth() sin haber envuelto
        //   la app con <AuthProvider>. Es un error del desarrollador.
    }
    return context;
}




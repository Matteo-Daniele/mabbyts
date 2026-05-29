import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { LoginRequest, RegisterRequest, User } from "../types/auth.types";
import { loginUser, registerUser } from "../api/authApi";
import { getActiveUser } from "../api/userApi";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (credentials: RegisterRequest) => Promise<void>;
    activeUser: User | null;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── JWT helper: decode exp claim (no library needed) ─────────────────────────
function getTokenExpiry(token: string): number | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp ? payload.exp * 1000 : null; // exp is in seconds → ms
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeUser, setActiveUser] = useState<User | null>(null);

    // Ref to hold the expiry timer so we can cancel it from anywhere
    const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ─── Logout ──────────────────────────────────────────────────────────────
    const logout = () => {
        if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
        setToken(null);
        setActiveUser(null);
        localStorage.removeItem('token');
    };

    // ─── Schedule auto-logout at the exact moment the JWT expires ────────────
    const scheduleExpiry = (tkn: string) => {
        if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);

        const expiry = getTokenExpiry(tkn);
        if (!expiry) return;

        const ms = expiry - Date.now();
        if (ms <= 0) { logout(); return; }

        console.log(`Sesión activa. Token expira en ${Math.round(ms / 1000)}s.`);
        expiryTimerRef.current = setTimeout(() => {
            console.log('Token expirado — cerrando sesión automáticamente.');
            logout();
        }, ms);
    };

    // ─── Single mount effect ──────────────────────────────────────────────────
    useEffect(() => {
        // 1. Listen for 401/403 from any API call (dispatched by fetchAuth)
        const handleUnauthorized = () => {
            console.log('Respuesta 401/403 — cerrando sesión automáticamente.');
            logout();
        };
        window.addEventListener('auth:unauthorized', handleUnauthorized);

        // 2. Restore existing session from localStorage
        const init = async () => {
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                const expiry = getTokenExpiry(savedToken);
                if (expiry && expiry <= Date.now()) {
                    // Already expired: discard silently
                    localStorage.removeItem('token');
                } else {
                    setToken(savedToken);
                    scheduleExpiry(savedToken);
                    try {
                        const userProfile = await getActiveUser(savedToken);
                        setActiveUser(userProfile);
                    } catch {
                        logout();
                    }
                }
            }
            setLoading(false);
        };

        init();

        // Cleanup: remove listener and cancel any pending timer
        return () => {
            window.removeEventListener('auth:unauthorized', handleUnauthorized);
            if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
        };
    }, []);

    // ─── Login ────────────────────────────────────────────────────────────────
    const login = async (credentials: LoginRequest) => {
        const response = await loginUser(credentials);
        if (response) {
            setToken(response.access_token);
            localStorage.setItem('token', response.access_token);
            scheduleExpiry(response.access_token);
            try {
                const userProfile = await getActiveUser(response.access_token);
                setActiveUser(userProfile);
            } catch (error) {
                console.error("Error al obtener perfil tras login:", error);
            }
        }
    };

    // ─── Register ─────────────────────────────────────────────────────────────
    const register = async (credentials: RegisterRequest) => {
        const response = await registerUser(credentials);
        if (!response) {
            throw new Error('Error al registrar el usuario');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: token !== null,
                login,
                register,
                activeUser,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}

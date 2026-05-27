import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import type { habit, habitHistory } from "../types/auth.types";
import {
    deleteHabit,
    getHabits,
    postHabits,
    updateHabit,
} from "../api/habitsApi";
import {
    getTodayHistory,
    toggleHabitHistory,
} from "../api/habitHistoryApi";
import { useAuth } from "./AuthContext";

// ─── Qué expone el contexto ───────────────────────────────────────
interface HabitContextType {
    habits: habit[];
    todayHistory: habitHistory[];
    completados: string[];      // IDs de hábitos completados hoy
    progreso: number;           // 0-100
    loadingHabits: boolean;
    toggleHabito: (habitId: string) => void;
    createHabit: (data: Omit<habit, "_id">) => Promise<void>;
    onDelete: (habito: habit) => void;
    onEdit: (updated: habit) => Promise<void>;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────
export function HabitProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth();

    const [habits, setHabits] = useState<habit[]>([]);
    const [todayHistory, setTodayHistory] = useState<habitHistory[]>([]);
    const [loadingHabits, setLoadingHabits] = useState(true);

    // IDs de los hábitos que están completados hoy
    // Los sacamos del historial filtrando isCompleted === true
    const completados = todayHistory
        .filter((h) => h.isCompleted)
        .map((h) => h.habitId);

    // Progreso del día 0-100
    const progreso = habits.length
        ? Math.round((completados.length / habits.length) * 100)
        : 0;

    const lastLoadedDateRef = useRef<string>(new Date().toDateString());

    const midnightTimeoutId = useRef<number>(0);

    const loadData = async () => {
        setLoadingHabits(true);
        try {
            const [allHabits, history] = await Promise.all([
                getHabits(),
                getTodayHistory(),
            ]);
            setHabits(allHabits);
            setTodayHistory(history);

            lastLoadedDateRef.current = new Date().toDateString();
        } catch (error) {
            console.error("Error al cargar datos:", error);
        } finally {
            setLoadingHabits(false);
        }
    };

    // ─── Cargar hábitos e historial al iniciar ────────────────
    useEffect(() => {
        if (!token) return;

        loadData();

        const scheduleNextMidnigth = () => {
            const now = new Date();
            const nextMidnigth = new Date(now);
            nextMidnigth.setHours(24, 0, 0, 0);

            const msUntilMidnight = nextMidnigth.getTime() - now.getTime();

            console.log(`Próxima actualización en: ${Math.round(msUntilMidnight / 1000)} segundos`);

            midnightTimeoutId.current = setTimeout(() => {
                console.log("¡Es medianoche exacta (00:00:00)! Reiniciando barra de progreso y hábitos...");

                loadData()

                scheduleNextMidnigth()
            }, msUntilMidnight);
        }

        scheduleNextMidnigth();

        const checkDayChange = () => {

            if (document.visibilityState === "hidden") return
            const todayStr = new Date().toDateString();
            if (todayStr !== lastLoadedDateRef.current) {
                console.log("Se detectó cambio de día al recuperar el foco. Sincronizando...");
                loadData();
            }
        }

        window.addEventListener("focus", checkDayChange);

        document.addEventListener("visibilitychange", checkDayChange);

        return () => {
            clearTimeout(midnightTimeoutId)
            window.removeEventListener("focus", checkDayChange);
            document.removeEventListener("visibilitychange", checkDayChange);
        }

    }, [token]);

    // ─── Toggle: marcar/desmarcar un hábito ──────────────────
    const toggleHabito = async (habitId: string) => {
        const estaCompletado = completados.includes(habitId);
        const nuevoEstado = !estaCompletado;

        // Optimistic update: actualizamos la UI antes de que responda el backend
        setTodayHistory((prev) => {
            const existente = prev.find((h) => h.habitId === habitId);
            if (existente) {
                // Ya existe: lo actualizamos
                return prev.map((h) =>
                    h.habitId === habitId ? { ...h, isCompleted: nuevoEstado } : h
                );
            } else {
                // No existe aún: lo agregamos temporalmente
                return [
                    ...prev,
                    {
                        _id: "temp",
                        habitId,
                        userId: "",
                        isCompleted: nuevoEstado,
                        dateTime: new Date(),
                    },
                ];
            }
        });

        try {
            const habitHistoryReal = await toggleHabitHistory(habitId, nuevoEstado);
            // Reemplazamos el registro temporal con el real del backend
            setTodayHistory((prev) =>
                prev.map((h) =>
                    h.habitId === habitId ? habitHistoryReal : h
                )
            );
        } catch (error) {
            // Si falla, revertimos
            console.error("Error al actualizar hábito:", error);
            setTodayHistory((prev) =>
                prev.map((h) =>
                    h.habitId === habitId ? { ...h, isCompleted: estaCompletado } : h
                )
            );
        }
    };

    // ─── Crear hábito ─────────────────────────────────────────
    const createHabit = async (data: Omit<habit, "_id">) => {
        const tempId = Date.now().toString();
        const habitToAdd: habit = { _id: tempId, ...data };
        setHabits((prev) => [...prev, habitToAdd]);

        try {
            const habitReal = await postHabits(data);
            setHabits((prev) =>
                prev.map((h) => (h._id === tempId ? habitReal : h))
            );
        } catch (error) {
            setHabits((prev) => prev.filter((h) => h._id !== tempId));
            console.error("Error al crear hábito:", error);
        }
    };

    // ─── Borrar hábito ────────────────────────────────────────
    const onDelete = (habito: habit) => {
        setHabits((prev) => prev.filter((h) => h._id !== habito._id));
        deleteHabit(habito._id);
    };

    // ─── Editar hábito ────────────────────────────────────────
    const onEdit = async (updated: habit) => {
        const previous = habits;
        setHabits((prev) =>
            prev.map((h) => (h._id === updated._id ? updated : h))
        );
        try {
            await updateHabit(updated);
        } catch (error) {
            setHabits(previous);
            console.error("Error al editar hábito:", error);
        }
    };

    return (
        <HabitContext.Provider
            value={{
                habits,
                todayHistory,
                completados,
                progreso,
                loadingHabits,
                toggleHabito,
                createHabit,
                onDelete,
                onEdit,
            }}
        >
            {children}
        </HabitContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────
export function useHabits(): HabitContextType {
    const context = useContext(HabitContext);
    if (!context) {
        throw new Error("useHabits debe usarse dentro de HabitProvider");
    }
    return context;
}

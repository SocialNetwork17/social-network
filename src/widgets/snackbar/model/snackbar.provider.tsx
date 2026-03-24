import {useState, useEffect, useRef} from "react";
import { SnackbarContext } from "./snackbar.context";
import {SnackbarState} from "@/widgets/snackbar/model/snackbar.types";
import {SnackbarWrapper} from "@/widgets/snackbar/ui/SnackbarWrapper";

// Новый тип с id
interface SnackbarWithId {
    id: string;
    data: SnackbarState;
}

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [stack, setStack] = useState<SnackbarWithId[]>([]);
    const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

    // Генератор уникального ID
    const generateId = (): string => {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    };

    // Установка таймаута для удаления snackbar
    const setupRemovalTimeout = (id: string): void => {
        // Очищаем предыдущий таймаут если есть
        if (timeoutsRef.current.has(id)) {
            const existingTimeout = timeoutsRef.current.get(id);
            if (existingTimeout) {
                clearTimeout(existingTimeout);
            }
        }

        const timeoutId = setTimeout(() => {
            removeSnackbarById(id);
            timeoutsRef.current.delete(id);
        }, 5000);

        timeoutsRef.current.set(id, timeoutId);
    };

    // Очистка всех таймаутов при размонтировании
    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(timeout => {
                if (timeout) {
                    clearTimeout(timeout);
                }
            });
            timeoutsRef.current.clear();
        };
    }, []);

    const addSnackbar = (snackbar: SnackbarState): void => {
        const id = generateId();
        const snackbarWithId: SnackbarWithId = {
            id,
            data: snackbar
        };

        setStack(prev => [...prev, snackbarWithId]);
        setupRemovalTimeout(id);
    };

    const removeSnackbar = (): void => {
        setStack(prev => {
            if (prev.length === 0) return prev;

            const lastSnackbar = prev[prev.length - 1];
            if (!lastSnackbar) return prev;

            // Очищаем таймаут для удаляемого snackbar
            if (timeoutsRef.current.has(lastSnackbar.id)) {
                const timeout = timeoutsRef.current.get(lastSnackbar.id);
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeoutsRef.current.delete(lastSnackbar.id);
            }

            return prev.slice(0, -1);
        });
    };

    const removeSnackbarById = (id: string): void => {
        // Очищаем таймаут
        if (timeoutsRef.current.has(id)) {
            const timeout = timeoutsRef.current.get(id);
            if (timeout) {
                clearTimeout(timeout);
            }
            timeoutsRef.current.delete(id);
        }

        setStack(prev => prev.filter(snackbar => snackbar.id !== id));
    };

    const clearSnackbars = (): void => {
        // Очищаем все таймауты
        timeoutsRef.current.forEach(timeout => {
            if (timeout) {
                clearTimeout(timeout);
            }
        });
        timeoutsRef.current.clear();
        setStack([]);
    };

    const successSnackbar = (message: string): void => {

        addSnackbar({
            type: 'SUCCESS_SNACKBAR',
            payload: {message}
        });
    };

    const errorSnackbar = (message: string): void => {
        addSnackbar({
            type: 'ERROR_SNACKBAR',
            payload: {message}
        });
    };


    return (
        <SnackbarContext.Provider
            value={{
                stack,
                addSnackbar,
                removeSnackbar,
                removeSnackbarById,
                clearSnackbars,
                successSnackbar,
                errorSnackbar,
            }}
        >
            {children}
            <SnackbarWrapper/>
        </SnackbarContext.Provider>
    );
};
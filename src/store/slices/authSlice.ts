import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definición de tipos
interface AuthSignInDetails {
    authFlowType?: string;
    loginId?: string;
}

interface AuthUser {
    username: string;
    userId: string;
    signInDetails?: AuthSignInDetails;
}

interface AuthState {
    user: AuthUser | null;
    isLoading: boolean; // Propiedad de carga
}

const initialState: AuthState = {
    user: null,
    isLoading: false, // Estado inicial de carga
};

// Creación de slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Acción para establecer el usuario
        setUser(state, action: PayloadAction<AuthUser>) {
            state.user = action.payload;
            state.isLoading = false; // Finalizar la carga
        },
        // Acción para limpiar el usuario
        clearUser(state) {
            state.user = null;
            state.isLoading = false; // Finalizar la carga
        },
        // Acción para establecer el estado de carga
        setLoading(state) {
            state.isLoading = true; // Iniciar carga
        },

    },
});

// Exportación de acciones
export const { setUser, clearUser, setLoading } = authSlice.actions;

// Exportación del reducer
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    loading: boolean;
    zoneOwner: any | null;
    permissions: any | null;
    routeNames: any;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    zoneOwner: null,
    permissions: [],
    routeNames: {}
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        setZoneOwner(state, action: PayloadAction<any>) {
            state.zoneOwner = action.payload;
        },
        setPermissions(state, action: PayloadAction<any>) {
            state.permissions = action.payload;
        },
        setRouteNames(state, action: PayloadAction<any>) {
            state.routeNames = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const { setUser, setLoading, setZoneOwner, setPermissions, setRouteNames } = authSlice.actions;

export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface ZonesState {
    zones: any;
    selectedZone: any;
    loading: boolean;

}

const initialState: ZonesState = {
    zones: [],
    selectedZone: null,
    loading: false,
};

const zonesSlice = createSlice({
    name: "zones",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setZones(state, action: PayloadAction<any>) {
            state.zones = action.payload;
        },
        setSelectedZone(state, action: PayloadAction<any>) {
            state.selectedZone = action.payload;
        },
        cleanSelectedZone(state) {
            state.selectedZone = null;
        },
    },
});

export const {
    setLoading,
    setZones,
    setSelectedZone,
    cleanSelectedZone
} = zonesSlice.actions;

export default zonesSlice.reducer;


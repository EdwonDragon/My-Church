import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface ModulesState {
    modules: any;
    selectedModule: any;
    loading: boolean;

}

const initialState: ModulesState = {
    modules: [],
    selectedModule: null,
    loading: false,
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setModules(state, action: PayloadAction<any>) {
            state.modules = action.payload;
        },
        setSelectedModule(state, action: PayloadAction<any>) {
            state.selectedModule = action.payload;
        },
        cleanSelectedModule(state) {
            state.selectedModule = null;
        },
    },
});

export const {
    setLoading,
    setModules,
    setSelectedModule,
    cleanSelectedModule
} = modulesSlice.actions;

export default modulesSlice.reducer;


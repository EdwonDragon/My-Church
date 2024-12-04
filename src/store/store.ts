// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice/authSlice';
import messageSlice from './slices/messageSlice/messageSilce';
import zonesSlice from './slices/zonesSlice/zonesSlice';
import modulesSlice from './slices/modulesSlice/modulesSlice';
import usersSlice from './slices/usersSilce/usersSlice';


const store = configureStore({
    reducer: {
        user: authSlice,
        message: messageSlice,
        zones: zonesSlice,
        modules: modulesSlice,
        users: usersSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false // Desactiva la comprobación de serialización
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

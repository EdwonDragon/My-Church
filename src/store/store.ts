// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice/authSlice';
import messageSlice from './slices/messageSlice/messageSilce';
import zonesSlice from './slices/zonesSlice/zonesSlice';


const store = configureStore({
    reducer: {
        user: authSlice,
        message: messageSlice,
        zones: zonesSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false // Desactiva la comprobación de serialización
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import messageSlice from './slices/messageSilce';


const store = configureStore({
    reducer: {
        user: authSlice,
        message: messageSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

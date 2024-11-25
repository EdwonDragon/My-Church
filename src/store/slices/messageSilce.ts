import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Message {
    message?: string;
    type?: string;
}

const initialState: Message = {
    message: "",
    type: "info",
};

// Creación de slice
const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {

        setMessage(state, action: PayloadAction<Message>) {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },


    },
});

// Exportación de acciones
export const { setMessage } = messageSlice.actions;

// Exportación del reducer
export default messageSlice.reducer;

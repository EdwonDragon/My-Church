import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SweetAlertIcon } from "sweetalert2";


interface Message {
    title?: string;
    message?: string;
    type?: SweetAlertIcon;
}

const initialState: Message = {
    title: "",
    message: "",
    type: "info",
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {

        setMessage(state, action: PayloadAction<Message>) {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.title = action.payload.title;
        },
        clearMessage() {
            return initialState;
        },

    },
});


export const { setMessage, clearMessage } = messageSlice.actions;


export default messageSlice.reducer;

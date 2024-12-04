import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
    users: any;
    selectedUser: any;
    loading: boolean;

}

const initialState: UsersState = {
    users: [],
    selectedUser: null,
    loading: false,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setUsers(state, action: PayloadAction<any>) {
            state.users = action.payload;
        },
        setSelectedUser(state, action: PayloadAction<any>) {
            state.selectedUser = action.payload;
        },
        cleanSelectedUser(state) {
            state.selectedUser = null;
        },
    },
});

export const {
    setLoading,
    setUsers,
    setSelectedUser,
    cleanSelectedUser
} = usersSlice.actions;

export default usersSlice.reducer;


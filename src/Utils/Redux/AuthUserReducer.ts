import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logInUser from "./API/logInUser.ts";
import User from "./User.ts";

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logInUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(logInUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export { AuthState }
export const { logout } = authSlice.actions;
export default authSlice.reducer;

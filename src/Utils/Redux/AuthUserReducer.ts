import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logInUser from "./API/logInUser.ts";
import getUser from "./API/getUser.ts";
import logoutUser from "./API/logoutUser.ts";
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
    reducers: {},
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
            .addCase(logInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })

            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
});

export { AuthState };
export default authSlice.reducer;

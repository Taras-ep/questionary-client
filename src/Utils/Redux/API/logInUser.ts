import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserLogInValidator } from "../../inputValidation/userValidation.ts";
import HttpError from "../../../errors/HttpError.ts";
import { API_URL } from "./config.ts";

const logInUser = createAsyncThunk(
    "auth/fetchUser",
    async ({ emailOrPhone, password }: { emailOrPhone: string; password: string }, thunkAPI) => {
        try {
            if (UserLogInValidator(emailOrPhone, password)) {
                let response = await fetch(`${API_URL}/users/logInUser`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({emailOrPhone, password}),
                    credentials: 'include'
                })
                if (!response.ok) {
                    console.log(response)
                    throw new HttpError(await response.json());
                }
                return await response.json();
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "auth error");
        }
    }
);

export default logInUser




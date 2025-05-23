import { createAsyncThunk } from "@reduxjs/toolkit";
import HttpError from "../../../errors/HttpError.ts";
import { API_URL } from "./config.ts";

const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, thunkAPI) => {
        try {
            let response = await fetch(`${API_URL}/users/getUser`, {
                method: 'get',
                credentials: 'include'
            })
            if (!response.ok) {
                throw new HttpError(await response.json());
            }
            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "auth error");
        }
    }
);

export default getUser
import { createAsyncThunk } from "@reduxjs/toolkit";
import HttpError from "../../../errors/HttpError.ts";

const getUser = createAsyncThunk(
    "auth/fetchUser",
    async (thunkAPI) => {
        try {
                let response = await fetch('http://localhost:2323/api/users/getUser', {
                    method: 'get',
                    credentials: 'include'
                })
                if (!response.ok) {
                    console.log(response)
                    throw new HttpError(await response.json());
                }
                return await response.json();
        } catch (error: any) {
            return 
        }
    }
);

export default getUser
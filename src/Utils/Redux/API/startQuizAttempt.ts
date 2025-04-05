import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { API_URL } from "./config.ts";

const startQuizAttempt = createAsyncThunk(
    "quiz/startQuizAttempt", 
    async(quizId: string, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/quizAttempt/startQuizAttempt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quizId
                }),
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error('Failed to start quiz attempt');
            }
            const data = response.json()
            return data
        } catch(e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export default startQuizAttempt
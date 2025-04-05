import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "./config.ts";
import { RootState } from "../../../models/RootState.ts";

const finishQuizAttempt = createAsyncThunk(
    'quiz/finishQuizAttempt',
    async (quizId: string, thunkAPI) => {

        const rootState = thunkAPI.getState() as RootState        

        try {
            const response = await fetch(`${API_URL}/quizAttempt/finishQuizAttempt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    attemptId: rootState.quizAttempt.attemptId,
                    quizId,
                    answers: rootState.quizAttempt.answers
                }),
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error('Failed to finsih quiz attempt');
            }
            const data = response.json()
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export default finishQuizAttempt
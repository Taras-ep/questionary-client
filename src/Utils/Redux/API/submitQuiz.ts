import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../models/RootState.ts";
import { API_URL } from "./config.ts";

const submitQuizAttempt = createAsyncThunk(
    'quiz/submitQuiz',
    async (quizId: string, thunkAPI) => {
        try {
            const rootState = thunkAPI.getState() as RootState
            const response = await fetch(`${API_URL}/submitQuizAttempt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quizId,
                    answers: rootState.quizAttempt.answers
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit quiz');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export default submitQuizAttempt
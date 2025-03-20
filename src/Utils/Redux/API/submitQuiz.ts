import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../models/RootState.ts";

const submitQuiz = createAsyncThunk(
    'quiz/submitQuiz',
    async (quizId: string, thunkAPI) => {
        try {
            const rootState = thunkAPI.getState() as RootState
            const response = await fetch('/api/submitQuiz', {
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

export default submitQuiz
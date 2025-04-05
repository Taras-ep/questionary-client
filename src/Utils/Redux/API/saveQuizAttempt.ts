import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../models/RootState.ts";
import { API_URL } from "./config.ts";

const saveQuizAttempt = createAsyncThunk(
    'quiz/saveQuizAttempt',
    async (quizId: string, thunkAPI) => {
        try {
            const rootState = thunkAPI.getState() as RootState

            const attemptId = rootState.quizAttempt.attemptId

            if (attemptId !== undefined) {
                const response = await fetch(`${API_URL}/quizAttempt/saveQuizAttempt`, {
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
                    throw new Error('Failed to submit quiz');
                }

                const data = await response.json();
                return data;
            }
            throw new Error("The attempt did not start")
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export default saveQuizAttempt
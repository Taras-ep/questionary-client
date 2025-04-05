import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "./config.ts";
import { QuizQuestion } from "../../../models/QuizQuestionState.ts";

const saveQuizById = createAsyncThunk(
    'quiz/saveQuizById',
    async (arg: {id: string, name: string, description: string, questions: QuizQuestion[]}, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arg),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error('Failed to save quiz');
            }

            const data = await response.json();
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export default saveQuizById;

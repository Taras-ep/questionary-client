import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "./config.ts";

const loadQuizzes = createAsyncThunk(
    'quiz/loadQuizzes',
    async (quizzesLoadOptions: { quizCountPerPage: number; pageIndex: number }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/loadQuizzes?quizCountPerPage=${quizzesLoadOptions.quizCountPerPage}&pageIndex=${quizzesLoadOptions.pageIndex}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to load quizzes');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export default loadQuizzes;
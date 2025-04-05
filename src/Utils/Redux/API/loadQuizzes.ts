import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "./config.ts";
import { QuizWithQuestions } from "../../../models/QuizState.ts";
import { addQuizQuestion } from "../QuizQuestionReducer.ts";

const loadQuizzes = createAsyncThunk(
    'quiz/loadQuizzes',
    async (quizzesLoadOptions: { quizCountPerPage: number; pageIndex: number }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/quiz?quizCountPerPage=${quizzesLoadOptions.quizCountPerPage}&pageIndex=${quizzesLoadOptions.pageIndex}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to load quizzes');
            }

            const data = await response.json();
            const totalQuizCount: number = data.totalQuizCount
            const quizzes: QuizWithQuestions[] = data.quizzes

            quizzes.forEach(quiz => {
                quiz.questionIds = quiz.questions.map(question => question.id)
                quiz.questions.forEach(question => {
                    thunkAPI.dispatch(addQuizQuestion(question))
                })
            })

            return {
                totalQuizCount,
                quizzes
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export default loadQuizzes;
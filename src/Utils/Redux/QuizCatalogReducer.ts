import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import QuizQuestion from "../../models/QuizQuestion.ts";

interface Quiz {
    quizQuestionsList: QuizQuestion[];
}

const initialQuizState: Quiz = {
    quizQuestionsList: []
};

const quizQuestionSlice = createSlice({
    name: "quizQuestion",
    initialState: initialQuizState,
    reducers: {
        addQuizQuestion: (state, action: PayloadAction<QuizQuestion>) => {
            state.quizQuestionsList.push(action.payload);
        },
        updateQuizQuestion: (state, action: PayloadAction<QuizQuestion>) => {
            const index = state.quizQuestionsList.findIndex(question => question.id === action.payload.id);
            if (index !== -1) {
                state.quizQuestionsList[index] = action.payload;
            }
        },
        removeQuizQuestion: (state, action) => {
            state.quizQuestionsList = state.quizQuestionsList.filter(question => question.id != action.payload)
        }
    }
});

export {Quiz}
export const {  addQuizQuestion,  updateQuizQuestion, removeQuizQuestion } = quizQuestionSlice.actions;
export default quizQuestionSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {QuizQuestion, QuestionsState} from "../../models/QuizQuestionState.ts";

const initialQuestionsState: QuestionsState = {
    byId: {},
    allIds: []
};

const quizQuestionSlice = createSlice({
    name: "quizQuestion",
    initialState: initialQuestionsState,
    reducers: {
        addQuizQuestion: (state, action: PayloadAction<QuizQuestion>) => {
            const { id } = action.payload;
            state.byId[id] = action.payload;
            state.allIds.push(id);
        },
        updateQuizQuestion: (state, action: PayloadAction<{oldQuestionId: string, question:QuizQuestion}>) => {
            const { oldQuestionId, question} = action.payload;
            if (state.byId[oldQuestionId]) {
                state.byId[question.id] = question;
                state.allIds.push(question.id)
            }
        },
        removeQuizQuestion: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.byId[id]) {
                delete state.byId[id];
                state.allIds = state.allIds.filter(qId => qId !== id);
            }
        },
        editQuestionInQuiz: (state, action: PayloadAction<{questionId: string; isEdit: boolean }>) => {
            const {questionId, isEdit } = action.payload;
            if (state.byId[questionId]) {
                state.byId[questionId].isEdit = isEdit
            }
         }
    }
});

export const { addQuizQuestion, updateQuizQuestion, removeQuizQuestion, editQuestionInQuiz} = quizQuestionSlice.actions;
export default quizQuestionSlice.reducer;

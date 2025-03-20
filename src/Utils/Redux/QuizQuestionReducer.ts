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
        updateQuizQuestion: (state, action: PayloadAction<QuizQuestion>) => {
            const { id } = action.payload;
            if (state.byId[id]) {
                state.byId[id] = action.payload;
            }
        },
        removeQuizQuestion: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.byId[id]) {
                delete state.byId[id];
                state.allIds = state.allIds.filter(qId => qId !== id);
            }
        }
    }
});

export const { addQuizQuestion, updateQuizQuestion, removeQuizQuestion } = quizQuestionSlice.actions;
export default quizQuestionSlice.reducer;

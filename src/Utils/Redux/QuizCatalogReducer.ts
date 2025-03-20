import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, QuizzesState } from "../../models/Quiz.ts";

const initialState: QuizzesState = {
  byId: {},
  allIds: []
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<{ id: string; name: string; description: string }>) => {
      const { id, name, description } = action.payload;
      state.byId[id] = { id, name, description, isEdit: false, questions: [] };
      state.allIds.push(id);
    },
    editQuiz: (state, action: PayloadAction<{ id: string; name: string; description: string }>) => {
      const { id, name, description } = action.payload;
      if (state.byId[id]) {
        state.byId[id].name = name;
        state.byId[id].description = description;
      }
    },
    deleteQuiz: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (state.byId[id]) {
        const newById = { ...state.byId };
        delete newById[id];
        state.byId = newById;
        state.allIds = state.allIds.filter(qId => qId !== id);
      }
    },
    addQuestionToQuiz: (state, action: PayloadAction<{ quizId: string; questionId: string }>) => {
      const { quizId, questionId } = action.payload;
      if (state.byId[quizId] && !state.byId[quizId].questions.includes(questionId)) {
        state.byId[quizId].questions.push(questionId);
      }
    },
    removeQuestionFromQuiz: (state, action: PayloadAction<{ quizId: string; questionId: string }>) => {
      const { quizId, questionId } = action.payload;
      if (state.byId[quizId] && state.byId[quizId].questions.length > 0) {
        state.byId[quizId].questions = state.byId[quizId].questions.filter(qId => qId !== questionId);
      }
    }
  }
});


export const { addQuiz, editQuiz, deleteQuiz, addQuestionToQuiz, removeQuestionFromQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
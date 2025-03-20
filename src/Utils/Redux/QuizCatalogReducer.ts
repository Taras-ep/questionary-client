import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, QuizzesState } from "../../models/QuizState.ts";

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
      state.byId[id] = { id, name, description, isHidden: false, questions: [] };
      state.allIds.push(id);
    },
    editQuiz: (state, action: PayloadAction<{ id: string; newId: string, name: string; description: string }>) => {
      const { id, newId, name, description } = action.payload;
      if (state.byId[id]) {
        const oldQuiz = state.byId[id]
        state.byId[newId] = { id: newId, name, description, isHidden: false, questions: oldQuiz.questions };
        state.allIds.push(newId)
      }
    },
    deleteQuiz: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (state.byId[id]) {
        state.byId[id].isHidden = true
      }
    },
    addQuestionToQuiz: (state, action: PayloadAction<{ quizId: string; questionId: string }>) => {
      const { quizId, questionId } = action.payload;
      if (state.byId[quizId] && !state.byId[quizId].questions.includes(questionId)) {
        state.byId[quizId].questions.push(questionId);
      }
    },
    replaceQuestionInQuiz:  (state, action: PayloadAction<{ quizId: string; oldQuestionId: string, newQuestionId }>) => {
      const { quizId, oldQuestionId, newQuestionId } = action.payload;
      if (state.byId[quizId] && state.byId[quizId].questions.includes(oldQuestionId)) {
        const oldQuestionIndex = state.byId[quizId].questions.indexOf(oldQuestionId)
        state.byId[quizId].questions[oldQuestionIndex] = newQuestionId;
      }

    },removeQuestionFromQuiz: (state, action: PayloadAction<{ quizId: string; questionId: string }>) => {
      const { quizId, questionId } = action.payload;
      if (state.byId[quizId] && state.byId[quizId].questions.length > 0) {
        state.byId[quizId].questions = state.byId[quizId].questions.filter(qId => qId !== questionId);
      }
    }
  }
});


export const { addQuiz, editQuiz, deleteQuiz, addQuestionToQuiz, removeQuestionFromQuiz, replaceQuestionInQuiz} = quizzesSlice.actions;
export default quizzesSlice.reducer;
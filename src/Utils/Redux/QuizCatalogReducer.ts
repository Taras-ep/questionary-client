import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, QuizzesState } from "../../models/QuizState.ts";
import { QuizQuestion } from "../../models/QuizQuestionState.ts";
import loadQuizzes from "./API/loadQuizzes.ts";
import saveQuizById from "./API/saveQuizById.ts";

const initialState: QuizzesState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
  totalQuizCount: null
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<{ id: string; name: string; description: string }>) => {
      const { id, name, description } = action.payload;
      state.byId[id] = { id, name, description, isHidden: true, questionIds: [] };
      state.allIds.push(id);
    },
    editQuiz: (state, action: PayloadAction<{ id: string; newId: string, name: string; description: string }>) => {
      const { id, newId, name, description } = action.payload;
      if (state.byId[id]) {
        const oldQuiz = state.byId[id]
        state.byId[newId] = { oldQuizVersionId: id, id: newId, name, description, isHidden: true, questionIds: oldQuiz.questionIds };
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
      if (state.byId[quizId] && !state.byId[quizId].questionIds.includes(questionId)) {
        state.byId[quizId].questionIds.push(questionId);
      }
    },
    replaceQuestionInQuiz:  (state, action: PayloadAction<{ quizId: string; oldQuestionId: string, newQuestionId }>) => {
      const { quizId, oldQuestionId, newQuestionId } = action.payload;
      if (state.byId[quizId] && state.byId[quizId].questionIds.includes(oldQuestionId)) {
        const oldQuestionIndex = state.byId[quizId].questionIds.indexOf(oldQuestionId)
        state.byId[quizId].questionIds[oldQuestionIndex] = newQuestionId;
      }
    },
    removeQuestionFromQuiz: (state, action: PayloadAction<{ quizId: string; questionId: string }>) => {
      const { quizId, questionId } = action.payload;
      if (state.byId[quizId] && state.byId[quizId].questionIds.length > 0) {
        state.byId[quizId].questionIds = state.byId[quizId].questionIds.filter(qId => qId !== questionId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loadQuizzes.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loadQuizzes.fulfilled, (state, action) => {
      state.loading = false;
      state.totalQuizCount = action.payload.totalQuizCount
      action.payload.quizzes.forEach((quiz: Quiz) => {
        state.byId[quiz.id] = quiz;
        if (!state.allIds.includes(quiz.id)) {
          state.allIds.push(quiz.id);
        }
      });
    })
    .addCase(loadQuizzes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(saveQuizById.pending, (state) => {
      state.loading = true;
    })
    .addCase(saveQuizById.fulfilled, (state, action) => {
      state.loading = false;
      const { id, originalId, question: QuizQuestion } = action.payload;
      state.byId[originalId].isHidden = false;

      const oldQuizId = state.byId[originalId].oldQuizVersionId
      if (oldQuizId !== undefined) {
        state.byId[oldQuizId].isHidden = false;
      }

      // replace uuids with ids from backend db
      if (!state.allIds.includes(id)) {
        state.allIds.push(id);
      }

      if (state.allIds.includes(originalId)) {
        state.allIds = state.allIds.filter(id => id != originalId)
      }

      state.byId[id] = state.byId[originalId]
      delete state.byId[originalId]
    })
    .addCase(saveQuizById.rejected, (state, action) => {
      // TODO: remove hidden quiz from redux store, and remove its questions from the store
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { addQuiz, editQuiz, deleteQuiz, addQuestionToQuiz, removeQuestionFromQuiz, replaceQuestionInQuiz} = quizzesSlice.actions;
export default quizzesSlice.reducer;

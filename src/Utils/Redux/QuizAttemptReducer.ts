import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import saveQuizAttempt from './API/saveQuizAttempt.ts';
import { QuizAttemptState } from '../../models/QuizAttemptState.ts';
import startQuizAttempt from "./API/startQuizAttempt.ts";
import finishQuizAttempt from './API/finishQuizAttempt.ts';


const initialState: QuizAttemptState = {
  attemptId: null,
  answers: [],
  status: 'idle',
  error: null,
  byId: {},
  isFinished: false
};

const quizAttemptSlice = createSlice({
  name: 'quizAttempt',
  initialState,
  reducers: {
    clearAnswers: (state, action: PayloadAction) => {
      state.answers = []
    },
    setUserAnswer: (state, action: PayloadAction<{ questionId: string, questionIndex: number, answer: string | number[] }>) => {
      if(state)
      state.answers[action.payload.questionIndex] = {answer: action.payload.answer, questionId: action.payload.questionId}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveQuizAttempt.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveQuizAttempt.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(saveQuizAttempt.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(startQuizAttempt.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(startQuizAttempt.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attemptId = action.payload
      })
      .addCase(startQuizAttempt.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(finishQuizAttempt.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(finishQuizAttempt.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isFinished = action.payload
      })
      .addCase(finishQuizAttempt.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearAnswers, setUserAnswer } = quizAttemptSlice.actions;
export default quizAttemptSlice.reducer;

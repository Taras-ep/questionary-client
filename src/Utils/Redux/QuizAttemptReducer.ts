import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import submitQuizAttempt from './API/submitQuiz.ts';
import { QuizAttemptState } from '../../models/QuizAttemptState.ts';


const initialState: QuizAttemptState = {
  answers: [],
  status: 'idle',
  error: null,
  byId: {},
};

const quizAttemptSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    clearAnswers: (state, action: PayloadAction) => {
      state.answers = []
    },
    setUserAnswer: (state, action: PayloadAction<{ questionId: string, questionIndex: number, answer: string | number[] }>) => {
      state.answers[action.payload.questionIndex] =  {answer: action.payload.answer, quiestionId: action.payload.questionId}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuizAttempt.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitQuizAttempt.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Quiz submitted successfully:', action.payload);
      })
      .addCase(submitQuizAttempt.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearAnswers, setUserAnswer } = quizAttemptSlice.actions;
export default quizAttemptSlice.reducer;

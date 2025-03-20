import { configureStore } from "@reduxjs/toolkit";
import quizCatalogReducer from './QuizCatalogReducer.ts';
import quizQuestionReducer from './QuizQuestionReducer.ts';
import quizAttemptReducer from './QuizAttemptReducer.ts';
import getUserReducer from './AuthUserReducer.ts';

const store = configureStore({
  reducer: {
    quizzes: quizCatalogReducer,
    questions: quizQuestionReducer,
    quizAttempt: quizAttemptReducer,
    authState: getUserReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
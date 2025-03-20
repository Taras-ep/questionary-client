// Store.ts

import { configureStore } from "@reduxjs/toolkit";
import quizCatalogReducer from './QuizCatalogReducer.ts';
import quizQuestionReducer from './QuizQuestionReducer.ts';
import getUserReducer from './AuthUserReducer.ts'

import { QuizzesState } from "../../models/Quiz.ts";

const store = configureStore({
  reducer: {
    quizzes: quizCatalogReducer,
    questions: quizQuestionReducer,
    authState: getUserReducer
  }
})

export default store;

export type AppDispatch = typeof store.dispatch;

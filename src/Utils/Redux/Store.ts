import { configureStore } from "@reduxjs/toolkit";
import quizQuestionReducer, { Quiz } from './QuizQuestionReducer.ts';
import getUserReducer, { AuthState } from './AuthUserReducer.ts'

interface QuizStore {
    quizCatalog: Quiz
} 

interface UserAuth {
    authState: AuthState
}

const Store = configureStore({
    reducer: {
        quizCatalog: quizQuestionReducer,
        authState: getUserReducer
    }
})

export { QuizStore }
export { UserAuth }
export type AppDispatch = typeof Store.dispatch;
export default Store;
